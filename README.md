# Craftworth

**A pricing calculator for handmade & craft sellers — that shows the one number most makers never check: what you're really earning per hour.**

🔗 **Live: https://cw-1d5.pages.dev**

Most handmade sellers price too low and quietly end up working for less than minimum wage. Craftworth flips your **current** price into a real hourly wage — after materials, overhead, packaging and marketplace fees — so the gap between "I love making this" and "I'm earning $4/hr" is impossible to ignore. Then it gives you a retail and wholesale price that actually pays you.

It's not "yet another pricing calculator." It's a mirror.

## What it does

- **Reverse hourly lens** — your headline number: *"At your $20 Etsy price, your real hourly wage is $15.30/hr."* Color-coded against minimum wage and the wage you set for yourself.
- **True cost breakdown** — materials (itemized) + your labor + overhead per unit + packaging.
- **Profitable prices** — recommended retail (hits your target margin *and* a 2× floor) and a wholesale price.
- **Real marketplace fees** — Etsy, Shopify, Amazon Handmade, Faire, your own site, or in-person. Fees are solved into the suggested price, not bolted on after.
- **Live** — every number updates as you type. No "calculate" button.
- **Private** — 100% in your browser. No upload, no account, no tracking.
- **Trilingual** — English / 中文 / Українська. Multi-currency symbols.

## How the math works

```
true cost   = materials + (hours × your wage) + monthly overhead/units sold + packaging
real wage   = (price − materials − overhead − packaging − platform fees) ÷ hours
price for m = (true cost + fixed fees) ÷ (1 − fee% − payment% − target margin)
```

The engine is pure, dependency-free JavaScript and runs identically in the browser and in Node. Marketplace fee tables are the only "domain knowledge" baked in.

## Project structure

```
index.html   UI, styling, trilingual scaffold
engine.js    Deterministic pricing engine (no deps; browser + Node)
app.js       i18n, live calculator, rendering, export
test.mjs     58 assertions
test_codex.mjs  15 adversarial edge-case assertions
```

## Run the tests

```bash
node test.mjs
node test_codex.mjs
```

## Run locally

Static — any server works:

```bash
python -m http.server 8032
# open http://localhost:8032
```

## Note on fees

Marketplace fees change. The rates encoded here reflect public 2026 figures for a simplified, common-case model (single listing, standard payment processing) and are estimates — always confirm against your own seller dashboard before committing to a price.

## License

MIT — see [LICENSE](LICENSE).
