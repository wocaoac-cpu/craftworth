// Craftworth engine tests — deterministic, hand-computed expectations.
// Run: node test.mjs  (exit 0 = all green)
import { CraftEngine as E } from './engine.js';

let pass = 0, fail = 0; const fails = [];
function ok(c, m) { if (c) pass++; else { fail++; fails.push(m); } }
function eq(a, b, m) { ok(a === b, `${m} — got ${JSON.stringify(a)}, want ${JSON.stringify(b)}`); }
function near(a, b, m, t = 0.01) { ok(Math.abs(a - b) <= t, `${m} — got ${a}, want ~${b}`); }

// ---- sample: a handmade candle on Etsy, underpriced at $20 ----
const candle = {
  materials: [{ name: 'wax', cost: 3.50 }, { name: 'wick', cost: 0.30 }, { name: 'fragrance', cost: 1.20 }, { name: 'jar', cost: 2.00 }],
  laborHours: 0.5, hourlyWage: 30,
  overheadMonthly: 200, unitsPerMonth: 100,
  packaging: 1.00,
  platform: 'etsy',
  currentPrice: 20,
  targetMarginPct: 40,
  minWage: 15,
  currency: '$'
};

// ---- cost components ----
eq(E.materialsTotal(candle.materials), 7, 'materials total');
eq(E.laborCost(0.5, 30), 15, 'labor cost');
eq(E.overheadPerUnit(200, 100), 2, 'overhead per unit');
eq(E.overheadPerUnit(200, 0), 0, 'overhead div-by-zero guard');
const c = E.trueUnitCost(candle);
eq(c.trueCost, 25, 'true unit cost');
eq(c.nonLaborCost, 10, 'non-labor cost');
eq(c.materials, 7, 'cost breakdown materials');
eq(c.labor, 15, 'cost breakdown labor');

// ---- fees ----
near(E.platformFee(20, 'etsy'), 2.35, 'etsy fee @20');       // 20*.065+.20+20*.03+.25
near(E.platformFee(50, 'shopify'), 1.75, 'shopify fee @50'); // 50*.029+.30
near(E.platformFee(50, 'amazon'), 7.5, 'amazon fee @50');    // 50*.15
eq(E.platformFee(50, 'none'), 0, 'no fee for in-person');
eq(E.platformFee(50, 'bogus'), 0, 'unknown model -> no fee');

// ---- profit / margin / markup at current (underpriced) price ----
near(E.netProfit(20, candle), -7.35, 'net profit @20 (losing money)');
near(E.marginPct(20, candle), -36.75, 'margin pct @20');
near(E.markupX(20, candle), 0.8, 'markup x @20');

// ---- THE headline: real hourly wage ----
near(E.realHourlyWage(20, candle), 15.3, 'real hourly wage @20'); // (20-10-2.35)/0.5
ok(E.realHourlyWage(50.40, candle) > 30, 'real wage healthy at recommended');
eq(E.realHourlyWage(20, { ...candle, laborHours: 0 }), null, 'no labor -> null wage');

// ---- suggested pricing ----
near(E.suggestedPriceForMargin(candle, 40), 50.40, 'price for 40% margin');
eq(E.suggestedPriceForMargin(candle, 95), null, 'unreachable margin -> null');
eq(E.suggestedPriceForMarkup(candle, 2), 50, 'price at 2x markup');
eq(E.suggestedPriceForMarkup(candle, 2.5), 62.5, 'price at 2.5x markup');

// verify the 40%-margin price actually yields 40% net margin
near(E.marginPct(50.40, candle), 40, 'margin price round-trips to 40%', 0.2);

// ---- verdicts ----
eq(E.wageVerdict(-5, 30, 15), 'losing_money', 'verdict losing');
eq(E.wageVerdict(11.68, 30, 15), 'below_minimum', 'verdict below min');
eq(E.wageVerdict(20, 30, 15), 'underpaid', 'verdict underpaid');
eq(E.wageVerdict(40, 30, 15), 'healthy', 'verdict healthy');
eq(E.wageVerdict(null, 30, 15), 'no_labor', 'verdict no labor');

// ---- analyze (full model) ----
const a = E.analyze(candle);
eq(a.costs.trueCost, 25, 'analyze true cost');
near(a.recommended, 50.40, 'analyze recommended retail');
near(a.wholesale, 25.20, 'analyze wholesale');
eq(a.atCurrent.price, 20, 'analyze current price echoed');
ok(a.atCurrent.net < 0, 'analyze current net negative');
eq(a.atCurrent.verdict, 'underpaid', 'analyze current verdict (15.3 < target 30)');
ok(a.atRecommended.marginPct >= 39 && a.atRecommended.marginPct <= 41, 'analyze recommended ~40% margin');
eq(a.platform, 'Etsy', 'analyze platform label');
eq(a.currency, '$', 'analyze currency');

// below-minimum scenario via analyze
const a2 = E.analyze({ ...candle, currentPrice: 18 });
eq(a2.atCurrent.verdict, 'below_minimum', 'analyze @18 below minimum'); // real 11.68

// no current price -> atCurrent null
const a3 = E.analyze({ ...candle, currentPrice: 0 });
eq(a3.atCurrent, null, 'no current price -> null');

// ---- robustness ----
eq(E.materialsTotal([{ cost: NaN }, { cost: 5 }]), 5, 'NaN material cost ignored');
eq(E.materialsTotal('bad'), 0, 'non-array materials -> 0');
eq(E.trueUnitCost({}).trueCost, 0, 'empty input -> 0 cost');
eq(E.materialsTotal([{ cost: 2, qty: 3 }]), 6, 'material qty multiplies');

// ---- exports ----
const csv = E.toCSV(a);
ok(csv.includes('cost,true_unit_cost,25'), 'csv has true cost');
ok(csv.includes('price,recommended_retail,50.4'), 'csv has recommended');
ok(JSON.parse(E.toJSON(a)).recommended === 50.4, 'json parseable');

// ---- robustness (hardening from Codex audit) ----
eq(E.wageVerdict(NaN, 30, 15), 'no_labor', 'NaN wage not treated as healthy');
eq(E.wageVerdict(Infinity, 30, 15), 'no_labor', 'Infinity wage rejected');
eq(E.platformFee(0, 'etsy'), 0, 'no fee at price 0 (no sale)');
eq(E.platformFee(-5, 'shopify'), 0, 'no fee at negative price');
eq(E.materialsTotal([{ cost: 5, qty: 0 }]), 0, 'explicit qty 0 prices as 0');
eq(E.materialsTotal([{ cost: -3 }]), 0, 'negative material cost clamped');
eq(E.realHourlyWage(0, candle), null, 'zero price -> null wage');
eq(E.realHourlyWage(-10, candle), null, 'negative price -> null wage');
eq(E.round2(Infinity), 0, 'round2 guards Infinity');
near(E.round2(-7.35), -7.35, 'round2 negative symmetric');
eq(E.materialsTotal([{ cost: 1e308, qty: 1e308 }]), 0, 'overflow -> 0 not Infinity');

// ---- report ----
console.log(`\nCraftworth engine tests: ${pass} passed, ${fail} failed (total ${pass + fail})`);
if (fail) { console.log('\nFAILURES:'); fails.forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
else console.log('ALL GREEN ✓');
