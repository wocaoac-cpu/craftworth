// Additional Codex edge-case tests for Craftworth engine.
// Run: node test_codex.mjs
import { CraftEngine as E } from './engine.js';

let pass = 0;
let fail = 0;
const fails = [];

function ok(condition, message) {
  if (condition) pass++;
  else {
    fail++;
    fails.push(message);
  }
}

function eq(actual, expected, message) {
  ok(Object.is(actual, expected), `${message} - got ${JSON.stringify(actual)}, want ${JSON.stringify(expected)}`);
}

const base = {
  materials: [{ name: 'base', cost: 10, qty: 1 }],
  laborHours: 1,
  hourlyWage: 20,
  overheadMonthly: 100,
  unitsPerMonth: 10,
  packaging: 2,
  platform: 'etsy',
  minWage: 15,
  targetMarginPct: 40,
};

// Guards that should already be green.
eq(E.suggestedPriceForMargin(base, 90.5), null, 'etsy fees plus 90.5% margin is unreachable');
eq(E.suggestedPriceForMargin(base, 101), null, 'margin above 100% is unreachable');
eq(E.overheadPerUnit(100, -5), 0, 'negative units do not divide overhead');
eq(E.marginPct(0, base), 0, 'zero price margin avoids division by zero');
eq(E.markupX(10, { ...base, materials: [], laborHours: 0, hourlyWage: 0, overheadMonthly: 0, packaging: 0 }), 0, 'zero true cost markup avoids division by zero');
eq(E.realHourlyWage(10, { ...base, laborHours: 0 }), null, 'zero labor hours return null real wage');

// Assertions below describe safer expected behavior and expose current bugs.
eq(E.platformFee(0, 'shopify'), 0, 'zero-price Shopify transaction has no payment fee');
eq(E.platformFee(0, 'own'), 0, 'zero-price own-site transaction has no payment fee');
eq(E.materialsTotal([{ cost: 5, qty: 0 }]), 0, 'explicit zero material quantity costs zero');
ok(E.trueUnitCost({ materials: [{ cost: -5, qty: 1 }], laborHours: 0, hourlyWage: 0, overheadMonthly: 0, unitsPerMonth: 1, packaging: 0 }).trueCost >= 0, 'negative material cost cannot make true cost negative');
ok(E.suggestedPriceForMargin({ materials: [{ cost: -100, qty: 1 }], laborHours: 0, hourlyWage: 0, overheadMonthly: 0, unitsPerMonth: 1, packaging: 0, platform: 'none' }, 40) >= 0, 'negative material cost cannot create negative suggested price');
eq(E.round2(-1.005), -1.01, 'negative half-cent values round symmetrically');
ok(E.wageVerdict(NaN, 30, 15) !== 'healthy', 'NaN wage is not healthy');
ok(E.wageVerdict(Infinity, 30, 15) !== 'healthy', 'infinite wage is not healthy');
ok(Number.isFinite(E.materialsTotal([{ cost: 1e308, qty: 1e308 }])), 'overflowed material totals do not return Infinity');

console.log(`\nCodex edge tests: ${pass} passed, ${fail} failed (total ${pass + fail})`);
if (fail) {
  console.log('\nFAILURES:');
  fails.forEach((f) => console.log(`  FAIL ${f}`));
  process.exit(1);
}
console.log('ALL GREEN');
