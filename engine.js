/*
 * Craftworth engine — deterministic handmade/craft pricing model.
 * Dependency-free. Runs identically in the browser and in Node (for tests).
 * No network, no AI. Pure functions over plain numbers.
 *
 * The headline insight: given what you charge today, what are you REALLY
 * earning per hour of making — after materials, overhead, packaging and
 * marketplace fees? Most sellers never compute this and work for far below
 * minimum wage. Craftworth makes that number impossible to ignore.
 */

// --- marketplace fee models (2026 public rates; payment = processing) ---
const FEE_MODELS = {
  etsy:    { label: 'Etsy',            pct: 0.065, fixed: 0.20, payPct: 0.03,  payFixed: 0.25 },
  shopify: { label: 'Shopify',         pct: 0,     fixed: 0,    payPct: 0.029, payFixed: 0.30 },
  amazon:  { label: 'Amazon Handmade', pct: 0.15,  fixed: 0,    payPct: 0,     payFixed: 0    },
  faire:   { label: 'Faire',           pct: 0.15,  fixed: 0,    payPct: 0,     payFixed: 0    },
  own:     { label: 'Own website',     pct: 0,     fixed: 0,    payPct: 0.029, payFixed: 0.30 },
  none:    { label: 'In person / none',pct: 0,     fixed: 0,    payPct: 0,     payFixed: 0    }
};

// skill-based labor wage presets (per hour) — guidance, user overrides
const WAGE_PRESETS = { beginner: 18, intermediate: 30, experienced: 50, master: 75 };

const round2 = (n) => {
  if (!Number.isFinite(n)) return 0;                                   // guard NaN/Infinity
  return Math.sign(n) * Math.round((Math.abs(n) + Number.EPSILON) * 100) / 100; // sign-symmetric
};
const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : 0; };

// --- cost components ---
function materialsTotal(materials) {
  if (!Array.isArray(materials)) return 0;
  return round2(materials.reduce((s, m) => {
    const cost = Math.max(0, num(m && m.cost));                  // no negative costs
    const qty = (m && m.qty != null) ? Math.max(0, num(m.qty)) : 1; // explicit 0 stays 0
    return s + cost * qty;
  }, 0));
}
function laborCost(hours, wage) { return round2(Math.max(0, num(hours)) * Math.max(0, num(wage))); }
function overheadPerUnit(monthly, unitsPerMonth) {
  const u = num(unitsPerMonth);
  if (u <= 0) return 0;
  return round2(Math.max(0, num(monthly)) / u);
}

// full per-unit cost (includes paying yourself for labor)
function trueUnitCost(input) {
  const mats = materialsTotal(input.materials);
  const labor = laborCost(input.laborHours, input.hourlyWage);
  const oh = overheadPerUnit(input.overheadMonthly, input.unitsPerMonth);
  const pack = Math.max(0, num(input.packaging));
  return {
    materials: mats, labor, overhead: oh, packaging: pack,
    trueCost: round2(mats + labor + oh + pack),
    // cost of everything EXCEPT your own labor (used for real-wage calc)
    nonLaborCost: round2(mats + oh + pack)
  };
}

// marketplace + payment fee charged on a given sale price
function platformFee(price, modelKey) {
  const m = FEE_MODELS[modelKey] || FEE_MODELS.none;
  const p = num(price);
  if (p <= 0) return 0;                          // no sale -> no fee (not even fixed)
  return round2(p * m.pct + m.fixed + p * m.payPct + m.payFixed);
}

function netProfit(price, input) {
  const { trueCost } = trueUnitCost(input);
  return round2(num(price) - trueCost - platformFee(price, input.platform));
}
function marginPct(price, input) {
  const p = num(price);
  if (p <= 0) return 0;
  return round2(netProfit(price, input) / p * 100);
}
function markupX(price, input) {
  const { trueCost } = trueUnitCost(input);
  if (trueCost <= 0) return 0;
  return round2(num(price) / trueCost);
}

// THE headline number: what you actually earn per hour of making,
// after materials/overhead/packaging and fees (your labor is the residual).
function realHourlyWage(price, input) {
  const hours = num(input.laborHours);
  const p = num(price);
  if (hours <= 0 || p <= 0) return null;
  const { nonLaborCost } = trueUnitCost(input);
  const fee = platformFee(p, input.platform);
  return round2((p - nonLaborCost - fee) / hours);
}

// solve for the price that yields a target NET margin after % fees
function suggestedPriceForMargin(input, targetMarginPct) {
  const { trueCost } = trueUnitCost(input);
  const m = FEE_MODELS[input.platform] || FEE_MODELS.none;
  const target = num(targetMarginPct) / 100;
  const denom = 1 - m.pct - m.payPct - target;
  if (denom <= 0) return null; // target unreachable with these fees
  return round2((trueCost + m.fixed + m.payFixed) / denom);
}
function suggestedPriceForMarkup(input, multiplier) {
  const { trueCost } = trueUnitCost(input);
  return round2(trueCost * Math.max(0, num(multiplier)));
}

function wageVerdict(real, targetWage, minWage) {
  if (real == null || !Number.isFinite(real)) return 'no_labor';
  const tw = num(targetWage) || num(minWage) || 15;
  const mw = num(minWage) || 15;
  if (real < 0) return 'losing_money';
  if (real < mw) return 'below_minimum';
  if (real < tw) return 'underpaid';
  return 'healthy';
}

// one call -> full dashboard model
function analyze(input) {
  const cur = input.currency || '$';
  const costs = trueUnitCost(input);
  const minWage = num(input.minWage) || 15;
  const targetWage = num(input.hourlyWage) || minWage;

  const byMargin = suggestedPriceForMargin(input, input.targetMarginPct != null ? input.targetMarginPct : 40);
  const suggested = {
    x2: suggestedPriceForMarkup(input, 2),
    x25: suggestedPriceForMarkup(input, 2.5),
    targetMargin: byMargin,
    targetMarginPct: input.targetMarginPct != null ? num(input.targetMarginPct) : 40
  };
  // recommended retail = the higher of (target-margin price, 2x markup) so you never go below cost-plus
  const recommended = round2(Math.max(byMargin || 0, suggested.x2 || 0));
  const wholesale = round2(recommended / 2);

  let atCurrent = null;
  if (input.currentPrice != null && num(input.currentPrice) > 0) {
    const price = num(input.currentPrice);
    const real = realHourlyWage(price, input);
    atCurrent = {
      price: round2(price),
      fee: platformFee(price, input.platform),
      net: netProfit(price, input),
      marginPct: marginPct(price, input),
      markupX: markupX(price, input),
      realHourlyWage: real,
      verdict: wageVerdict(real, targetWage, minWage)
    };
  }

  // fee + profit breakdown at the recommended price
  const recFee = platformFee(recommended, input.platform);
  const recNet = round2(recommended - costs.trueCost - recFee);

  return {
    currency: cur,
    costs,
    suggested,
    recommended,
    wholesale,
    atRecommended: {
      price: recommended, fee: recFee, net: recNet,
      marginPct: recommended > 0 ? round2(recNet / recommended * 100) : 0,
      realHourlyWage: realHourlyWage(recommended, input)
    },
    atCurrent,
    targetWage,
    minWage,
    platform: (FEE_MODELS[input.platform] || FEE_MODELS.none).label
  };
}

function toJSON(a) { return JSON.stringify(a, null, 2); }
function toCSV(a) {
  const L = ['section,label,value'];
  L.push(`cost,materials,${a.costs.materials}`);
  L.push(`cost,labor,${a.costs.labor}`);
  L.push(`cost,overhead,${a.costs.overhead}`);
  L.push(`cost,packaging,${a.costs.packaging}`);
  L.push(`cost,true_unit_cost,${a.costs.trueCost}`);
  L.push(`price,recommended_retail,${a.recommended}`);
  L.push(`price,wholesale,${a.wholesale}`);
  L.push(`price,target_margin_price,${a.suggested.targetMargin ?? ''}`);
  if (a.atCurrent) {
    L.push(`current,price,${a.atCurrent.price}`);
    L.push(`current,net_profit,${a.atCurrent.net}`);
    L.push(`current,margin_pct,${a.atCurrent.marginPct}`);
    L.push(`current,real_hourly_wage,${a.atCurrent.realHourlyWage ?? ''}`);
    L.push(`current,verdict,${a.atCurrent.verdict}`);
  }
  return L.join('\n');
}

const CraftEngine = {
  FEE_MODELS, WAGE_PRESETS,
  materialsTotal, laborCost, overheadPerUnit, trueUnitCost,
  platformFee, netProfit, marginPct, markupX, realHourlyWage,
  suggestedPriceForMargin, suggestedPriceForMarkup, wageVerdict,
  analyze, toJSON, toCSV, round2
};

export { CraftEngine };
export default CraftEngine;
if (typeof window !== 'undefined') window.CraftEngine = CraftEngine;
