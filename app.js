import { CraftEngine as E } from './engine.js';

/* ============================ i18n ============================ */
const I18N = {
  en: {
    lock: '100% local · nothing uploaded',
    kicker: 'HANDMADE PRICING · 100% IN YOUR BROWSER',
    h1: ["You're pricing your handmade work ", 'below minimum wage', " — and you don't even know it."],
    lede: 'Enter your materials, time, overhead and platform fees. <b>Craftworth instantly shows your real hourly wage</b> and what you should actually charge. 100% browser-local — nothing leaves your device.',
    in_title: 'Your product', sample: 'Try an example', out_title: "What it's really worth",
    f_materials: 'Materials (per item)', add_mat: '+ Add material', mat_name: 'Material', mat_cost: 'Cost',
    f_labor: 'Your time', l_hours: 'Hours per item', l_wage: 'Your hourly wage',
    f_overhead: 'Overhead & packaging', l_ohm: 'Monthly overhead', l_units: 'Items sold / month', l_pack: 'Packaging / item', l_min: 'Min wage (your area)',
    f_sell: 'Where & how you sell', l_platform: 'Marketplace', l_currency: 'Currency', l_current: 'Your current price', l_margin: 'Target profit margin',
    f1: 'Project 0032 · built by Claude on the Opportunity Radar',
    disc: 'Estimates use public 2026 marketplace fees and your inputs. Everything runs in your browser — your numbers never leave this page.',
    // results
    real_wage_at: 'At {price} on {platform}, your real hourly wage is',
    real_wage_rec: 'At the recommended price, your hourly wage would be',
    v_losing: "You're losing money on every sale.",
    v_below: "That's below minimum wage. You're subsidising every order.",
    v_under: 'Below the wage you set for yourself — you can charge more.',
    v_healthy: "You're paying yourself fairly. Nice.",
    v_nolabor: 'Add your hours per item to see your real wage.',
    s_truecost: 'True cost / item', s_retail: 'Recommended retail', s_wholesale: 'Wholesale', s_net_now: 'Profit @ current price',
    rec_explain: 'To earn your {wage}/hr and a {margin}% margin, charge about {price}.',
    bd_title: 'Cost breakdown', bd_materials: 'Materials', bd_labor: 'Your labor', bd_overhead: 'Overhead', bd_packaging: 'Packaging', bd_true: 'True cost',
    fee_at: 'Fees @ {price} ({platform})', fee_net: 'Net profit', fee_margin: 'margin',
    e_csv: 'Export CSV', e_json: 'Export JSON', e_copy: 'Copy summary', e_copied: 'Copied ✓',
    none_label: 'In person / none', perhr: '/hr'
  },
  zh: {
    lock: '100% 本地 · 零上传',
    kicker: '手工定价 · 100% 浏览器本地运行',
    h1: ['你正在为手工作品，开出', '低于最低工资', '的价钱。'],
    lede: '输入材料、工时、管销和平台抽成，<b>Craftworth 一秒算出你的真实时薪</b>和该卖多少钱。所有计算都在浏览器本地跑，不上传任何数据。',
    in_title: '你的产品', sample: '用示例试试', out_title: '它到底值多少',
    f_materials: '材料成本（每件）', add_mat: '+ 加一项材料', mat_name: '材料名', mat_cost: '成本',
    f_labor: '你的工时', l_hours: '每件耗时（小时）', l_wage: '你的目标时薪',
    f_overhead: '管销与包装', l_ohm: '每月固定开销', l_units: '每月卖出件数', l_pack: '每件包装费', l_min: '当地最低时薪',
    f_sell: '在哪卖、怎么卖', l_platform: '销售平台', l_currency: '货币', l_current: '你现在的售价', l_margin: '目标利润率',
    f1: '项目 0032 · 机会雷达上由 Claude 建造',
    disc: '估算基于 2026 公开的平台费率和你的输入。全程在你浏览器本地运行——你的数字不离开本页面。',
    real_wage_at: '按你在 {platform} 上 {price} 的定价，你的真实时薪是',
    real_wage_rec: '按建议价，你的时薪会是',
    v_losing: '你每卖一件都在亏钱。',
    v_below: '这低于最低工资。你在倒贴钱做每一单。',
    v_under: '低于你给自己定的时薪——你可以收更高。',
    v_healthy: '你给自己付了合理的工钱，很好。',
    v_nolabor: '填上每件耗时，就能看到你的真实时薪。',
    s_truecost: '真实成本/件', s_retail: '建议零售价', s_wholesale: '批发价', s_net_now: '当前价净利润',
    rec_explain: '想拿到 {wage}/小时 的工钱 + {margin}% 利润率，大约该卖 {price}。',
    bd_title: '成本拆解', bd_materials: '材料', bd_labor: '你的工时', bd_overhead: '管销分摊', bd_packaging: '包装', bd_true: '真实成本',
    fee_at: '{price} 时的平台费（{platform}）', fee_net: '净利润', fee_margin: '利润率',
    e_csv: '导出 CSV', e_json: '导出 JSON', e_copy: '复制摘要', e_copied: '已复制 ✓',
    none_label: '线下 / 不收费', perhr: '/小时'
  },
  uk: {
    lock: '100% локально · нічого не завантажується',
    kicker: 'ЦІНОУТВОРЕННЯ HANDMADE · 100% У ВАШОМУ БРАУЗЕРІ',
    h1: ['Ви продаєте handmade за ціною ', 'нижчою за мінімалку', ' — і не здогадуєтесь.'],
    lede: 'Введіть матеріали, час, накладні витрати та збори платформи. <b>Craftworth миттєво покаже вашу реальну погодинну ставку</b> і правильну ціну. Усе працює локально у браузері — без жодних завантажень.',
    in_title: 'Ваш виріб', sample: 'Спробувати приклад', out_title: 'Скільки це справді коштує',
    f_materials: 'Матеріали (на виріб)', add_mat: '+ Додати матеріал', mat_name: 'Матеріал', mat_cost: 'Вартість',
    f_labor: 'Ваш час', l_hours: 'Годин на виріб', l_wage: 'Бажана ставка/год',
    f_overhead: 'Накладні та пакування', l_ohm: 'Місячні накладні', l_units: 'Продажів / місяць', l_pack: 'Пакування / виріб', l_min: 'Мін. ставка (ваш регіон)',
    f_sell: 'Де і як продаєте', l_platform: 'Маркетплейс', l_currency: 'Валюта', l_current: 'Ваша поточна ціна', l_margin: 'Цільова маржа',
    f1: 'Проєкт 0032 · створено Claude на Radar можливостей',
    disc: 'Оцінки базуються на публічних зборах маркетплейсів 2026 та ваших даних. Усе працює у браузері — ваші цифри не залишають цю сторінку.',
    real_wage_at: 'За ціною {price} на {platform} ваша реальна ставка —',
    real_wage_rec: 'За рекомендованою ціною ваша ставка була б',
    v_losing: 'Ви втрачаєте гроші на кожному продажі.',
    v_below: 'Це нижче мінімальної зарплати. Ви доплачуєте за кожне замовлення.',
    v_under: 'Нижче ставки, яку ви собі призначили — можна брати більше.',
    v_healthy: 'Ви платите собі справедливо. Чудово.',
    v_nolabor: 'Додайте години на виріб, щоб побачити реальну ставку.',
    s_truecost: 'Собівартість/шт', s_retail: 'Рекоменд. роздріб', s_wholesale: 'Опт', s_net_now: 'Прибуток @ поточна',
    rec_explain: 'Щоб заробляти {wage}/год і маржу {margin}%, продавайте приблизно за {price}.',
    bd_title: 'Розклад витрат', bd_materials: 'Матеріали', bd_labor: 'Ваша праця', bd_overhead: 'Накладні', bd_packaging: 'Пакування', bd_true: 'Собівартість',
    fee_at: 'Збори @ {price} ({platform})', fee_net: 'Чистий прибуток', fee_margin: 'маржа',
    e_csv: 'Експорт CSV', e_json: 'Експорт JSON', e_copy: 'Копіювати', e_copied: 'Скопійовано ✓',
    none_label: 'Особисто / без зборів', perhr: '/год'
  }
};

const CURRENCIES = ['$', '€', '£', '¥', '₴', '₹', 'A$', 'C$', 'R$', 'kr'];

let lang = 'en';
const t = (k) => (I18N[lang] && I18N[lang][k] != null) ? I18N[lang][k] : I18N.en[k];
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let CUR = '$';
const money = (n) => (n == null || !Number.isFinite(n)) ? '—' : CUR + (Math.round(n * 100) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fill = (str, map) => str.replace(/\{(\w+)\}/g, (_, k) => map[k] != null ? map[k] : '');

/* ============================ sample ============================ */
const SAMPLE = {
  materials: [['Soy wax', 3.5], ['Wick', 0.3], ['Fragrance oil', 1.2], ['Glass jar', 2.0]],
  laborHours: 0.5, hourlyWage: 30, overheadMonthly: 200, unitsPerMonth: 100,
  packaging: 1, minWage: 15, platform: 'etsy', currency: '$', currentPrice: 20, targetMarginPct: 40
};

/* ============================ build static selects/presets ============================ */
function populateControls() {
  const plat = $('#platform');
  plat.innerHTML = Object.keys(E.FEE_MODELS).map(k =>
    `<option value="${k}">${k === 'none' ? esc(t('none_label')) : esc(E.FEE_MODELS[k].label)}</option>`).join('');
  plat.value = 'etsy';
  const cur = $('#currency');
  cur.innerHTML = CURRENCIES.map(c => `<option value="${c}">${esc(c)}</option>`).join('');
  cur.value = '$';
  const wp = $('#wagePresets');
  wp.innerHTML = Object.entries(E.WAGE_PRESETS).map(([k, v]) =>
    `<button data-wage="${v}">${esc(k)} ${CUR}${v}</button>`).join('');
}

/* ============================ materials rows ============================ */
function addMatRow(name = '', cost = '') {
  const div = document.createElement('div');
  div.className = 'row matrow';
  div.innerHTML = `<input type="text" class="m-name" placeholder="${esc(t('mat_name'))}" value="${esc(name)}">
    <input type="number" class="m-cost mini" min="0" step="0.01" placeholder="${esc(t('mat_cost'))}" value="${cost}">
    <button class="x" title="remove">×</button>`;
  div.querySelector('.x').addEventListener('click', () => { div.remove(); recompute(); });
  div.querySelectorAll('input').forEach(i => i.addEventListener('input', recompute));
  $('#mats').appendChild(div);
}

/* ============================ gather + compute ============================ */
function gather() {
  const materials = $$('#mats .matrow').map(r => ({
    name: r.querySelector('.m-name').value,
    cost: parseFloat(r.querySelector('.m-cost').value) || 0
  }));
  const v = id => parseFloat($('#' + id).value) || 0;
  return {
    materials,
    laborHours: v('laborHours'), hourlyWage: v('hourlyWage'),
    overheadMonthly: v('overheadMonthly'), unitsPerMonth: v('unitsPerMonth'),
    packaging: v('packaging'), minWage: v('minWage'),
    platform: $('#platform').value, currency: $('#currency').value,
    currentPrice: v('currentPrice'), targetMarginPct: v('targetMarginPct')
  };
}

let last = null;
function recompute() {
  const input = gather();
  CUR = input.currency || '$';
  $$('#cur1,#cur2,#cur3,#cur4,#cur5').forEach(e => e.textContent = CUR);
  last = E.analyze(input);
  last._input = input;
  render(last);
}

/* ============================ render ============================ */
function render(a) {
  const R = $('#results');
  const inp = a._input;
  // verdict / headline number
  let big, unit, vclass, vtag, vmsg;
  if (a.atCurrent && a.atCurrent.realHourlyWage != null) {
    big = money(a.atCurrent.realHourlyWage); unit = t('perhr');
    vtag = fill(t('real_wage_at'), { price: money(a.atCurrent.price), platform: a.platform });
    const vd = a.atCurrent.verdict;
    vclass = vd === 'healthy' ? 'good' : (vd === 'underpaid' ? 'warn' : 'bad');
    vmsg = vd === 'losing_money' ? t('v_losing') : vd === 'below_minimum' ? t('v_below') : vd === 'underpaid' ? t('v_under') : t('v_healthy');
  } else if (a.atRecommended.realHourlyWage != null) {
    big = money(a.atRecommended.realHourlyWage); unit = t('perhr');
    vtag = t('real_wage_rec'); vclass = 'good'; vmsg = t('v_healthy');
  } else {
    big = '—'; unit = ''; vtag = ''; vclass = ''; vmsg = t('v_nolabor');
  }

  const verdict = `<div class="verdict ${vclass}">
    <div class="vtag">${esc(vtag)}</div>
    <div class="vnum">${esc(big)}<span class="vunit"> ${esc(unit)}</span></div>
    <div class="vmsg">${esc(vmsg)}</div>
    ${a.recommended ? `<div class="vsmall">${esc(fill(t('rec_explain'), { wage: money(a.targetWage), margin: a.suggested.targetMarginPct, price: money(a.recommended) }))}</div>` : ''}
  </div>`;

  // stat grid
  const netNow = a.atCurrent ? a.atCurrent.net : null;
  const stats = `<div class="statgrid">
    <div class="stat"><div class="sl">${esc(t('s_truecost'))}</div><div class="sv">${money(a.costs.trueCost)}</div></div>
    <div class="stat"><div class="sl">${esc(t('s_retail'))}</div><div class="sv clay">${money(a.recommended)}</div></div>
    <div class="stat"><div class="sl">${esc(t('s_wholesale'))}</div><div class="sv">${money(a.wholesale)}</div></div>
    <div class="stat"><div class="sl">${esc(t('s_net_now'))}</div><div class="sv ${netNow == null ? '' : netNow < 0 ? 'bad' : 'good'}">${netNow == null ? '—' : money(netNow)}</div>${a.atCurrent ? `<div class="sf">${a.atCurrent.marginPct}% ${esc(t('fee_margin'))}</div>` : ''}</div>
  </div>`;

  // cost breakdown bar
  const c = a.costs;
  const tot = c.trueCost || 1;
  const seg = (val, col) => `<span style="width:${Math.max(0, val / tot * 100)}%;background:${col}"></span>`;
  const bar = `<div class="barwrap">${seg(c.materials, 'var(--clay)')}${seg(c.labor, 'var(--gold)')}${seg(c.overhead, '#9c7bd0')}${seg(c.packaging, '#6aa9c9')}</div>
    <div class="barkey"><span><i style="background:var(--clay)"></i>${esc(t('bd_materials'))}</span><span><i style="background:var(--gold)"></i>${esc(t('bd_labor'))}</span><span><i style="background:#9c7bd0"></i>${esc(t('bd_overhead'))}</span><span><i style="background:#6aa9c9"></i>${esc(t('bd_packaging'))}</span></div>`;

  const breakdown = `<div class="breakdown">
    <div class="brow"><b>${esc(t('bd_materials'))}</b><span class="bv">${money(c.materials)}</span></div>
    <div class="brow"><b>${esc(t('bd_labor'))}</b><span class="bv">${money(c.labor)}</span></div>
    <div class="brow"><b>${esc(t('bd_overhead'))}</b><span class="bv">${money(c.overhead)}</span></div>
    <div class="brow"><b>${esc(t('bd_packaging'))}</b><span class="bv">${money(c.packaging)}</span></div>
    <div class="brow tot"><b>${esc(t('bd_true'))}</b><span class="bv">${money(c.trueCost)}</span></div>
    ${bar}
    <div class="brow" style="margin-top:12px"><b>${esc(fill(t('fee_at'), { price: money(a.atRecommended.price), platform: a.platform }))}</b><span class="bv">−${money(a.atRecommended.fee)}</span></div>
    <div class="brow tot"><b>${esc(t('fee_net'))}</b><span class="bv" style="color:var(--good)">${money(a.atRecommended.net)} · ${a.atRecommended.marginPct}%</span></div>
  </div>`;

  const toolbar = `<div class="toolbar">
    <button class="btn" id="exCsv">${esc(t('e_csv'))}</button>
    <button class="btn" id="exJson">${esc(t('e_json'))}</button>
    <button class="btn" id="exCopy">${esc(t('e_copy'))}</button>
  </div>`;

  R.innerHTML = verdict + stats + breakdown + toolbar;
  $('#exCsv').addEventListener('click', () => download('craftworth-pricing.csv', E.toCSV(a), 'text/csv'));
  $('#exJson').addEventListener('click', () => download('craftworth-pricing.json', E.toJSON(a), 'application/json'));
  $('#exCopy').addEventListener('click', (e) => copySummary(e.target));
}

/* ============================ export ============================ */
function download(name, content, type) {
  const blob = new Blob([content], { type }), url = URL.createObjectURL(blob);
  const el = document.createElement('a'); el.href = url; el.download = name; el.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function copySummary(btn) {
  const a = last;
  const L = [`Craftworth — ${a.platform}`,
    `${t('bd_true')}: ${money(a.costs.trueCost)}`,
    `${t('s_retail')}: ${money(a.recommended)}  |  ${t('s_wholesale')}: ${money(a.wholesale)}`];
  if (a.atCurrent) L.push(`${fill(t('real_wage_at'), { price: money(a.atCurrent.price), platform: a.platform })} ${money(a.atCurrent.realHourlyWage)}${t('perhr')} (${a.atCurrent.verdict})`);
  const txt = L.join('\n');
  try { await navigator.clipboard.writeText(txt); } catch (e) {
    const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e2) {} ta.remove();
  }
  const old = btn.textContent; btn.textContent = t('e_copied'); setTimeout(() => btn.textContent = old, 1500);
}

/* ============================ language ============================ */
function applyLang() {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
  $$('[data-i]').forEach(el => {
    const k = el.dataset.i;
    if (k === 'h1') { const a = t('h1'); el.innerHTML = `${esc(a[0])}<em>${esc(a[1])}</em>${esc(a[2])}`; return; }
    const v = t(k);
    if (k === 'lede') el.innerHTML = v; else el.textContent = v;
  });
  // refresh dynamic placeholders/options that carry text
  $$('#mats .matrow').forEach(r => {
    r.querySelector('.m-name').placeholder = t('mat_name');
    r.querySelector('.m-cost').placeholder = t('mat_cost');
  });
  const plat = $('#platform'); const pv = plat.value;
  const noneOpt = [...plat.options].find(o => o.value === 'none'); if (noneOpt) noneOpt.textContent = t('none_label');
  $$('.langs button').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
  try { localStorage.setItem('cw_lang', lang); } catch (e) {}
  if (last) render(last);
}

/* ============================ load sample / init ============================ */
function loadSample() {
  $('#mats').innerHTML = '';
  SAMPLE.materials.forEach(([n, c]) => addMatRow(n, c));
  $('#laborHours').value = SAMPLE.laborHours; $('#hourlyWage').value = SAMPLE.hourlyWage;
  $('#overheadMonthly').value = SAMPLE.overheadMonthly; $('#unitsPerMonth').value = SAMPLE.unitsPerMonth;
  $('#packaging').value = SAMPLE.packaging; $('#minWage').value = SAMPLE.minWage;
  $('#platform').value = SAMPLE.platform; $('#currency').value = SAMPLE.currency;
  $('#currentPrice').value = SAMPLE.currentPrice; $('#targetMarginPct').value = SAMPLE.targetMarginPct;
  recompute();
}

function init() {
  try {
    const saved = localStorage.getItem('cw_lang');
    if (saved && I18N[saved]) lang = saved;
    else { const n = (navigator.language || 'en').toLowerCase(); lang = n.startsWith('zh') ? 'zh' : n.startsWith('uk') ? 'uk' : 'en'; }
  } catch (e) {}

  populateControls();
  addMatRow(); // one empty row
  applyLang();

  $$('.langs button').forEach(b => b.addEventListener('click', () => { lang = b.dataset.lang; applyLang(); }));
  $('#addMat').addEventListener('click', () => addMatRow());
  $('#btnSample').addEventListener('click', loadSample);
  // live recompute on every static input
  $$('input, select', document).forEach(el => {
    if (el.closest('#mats')) return; // matrow handled per-row
    el.addEventListener('input', recompute); el.addEventListener('change', recompute);
  });
  // wage presets (delegated)
  $('#wagePresets').addEventListener('click', e => {
    const b = e.target.closest('[data-wage]'); if (!b) return;
    $('#hourlyWage').value = b.dataset.wage; recompute();
  });

  recompute(); // initial (empty) render
}

init();
