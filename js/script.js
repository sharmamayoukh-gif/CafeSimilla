/* ============ MENU DATA ============ */
const MENU = {
  "Hot Beverages": {note:"Espresso-based, poured to order.", items:[
    {n:"Espresso", p:90},
    {n:"Doppio", p:160},
    {n:"Affogato", p:170, note:"Espresso with ice-cream"},
    {n:"Americano (Single/Double)", p:80},
    {n:"Cappuccino", p:180},
    {n:"Flavoured Cappuccino", p:220},
    {n:"Café Latte", p:190},
    {n:"Honey/Caramel Latte", p:230},
    {n:"Café Mocha", p:230},
    {n:"Mocha Madness", p:250},
    {n:"Hot Chocolate", p:220},
  ]},
  "Coffee Alternatives": {note:"For the non-espresso mornings.", items:[
    {n:"Black Tea", p:70},
    {n:"Masala Milk Tea", p:100},
    {n:"Green Tea", p:110},
    {n:"Green Tea Pot", p:250},
    {n:"Hot Lemon Honey/Ginger", p:150},
    {n:"Hot Lemon", p:80},
  ]},
  "Mock Tail": {note:"Alcohol-free, full flavour.", items:[
    {n:"Mint Mojito", p:260},
    {n:"Watermelon Mojito", p:260},
    {n:"Blue Angel", p:250},
  ]},
  "Iced Coffee": {note:"Over ice, same espresso.", items:[
    {n:"Iced Americano", p:180},
    {n:"Iced Latte/Cappuccino", p:230},
    {n:"Iced Mocha", p:250},
    {n:"Iced Mocha Madness", p:260},
    {n:"Iced Caramel Macchiato", p:250},
  ]},
  "Refresher": {note:"Bright, citrus-forward pours.", items:[
    {n:"Homemade Lemonade", p:180},
    {n:"Fresh Mint Lemonade", p:200},
    {n:"Raspberry Lemonade", p:230},
    {n:"Fresh Lime Soda", p:170},
  ]},
  "Frappe": {note:"Blended and heavy on the ice.", items:[
    {n:"Vanilla / Strawberry / Chocolate Frappe", p:300},
    {n:"Mocha Frappe", p:320},
    {n:"Hazelnut Frappe", p:320},
    {n:"Oreo Frappe", p:350},
  ]},
  "Iced Tea": {note:"Chilled, lightly sweetened.", items:[
    {n:"Peach / Lemon / Apple Iced Tea", p:180},
  ]},
  "Smoothies & Lassi": {note:"Fruit and yoghurt, blended fresh.", items:[
    {n:"Plain / Sweet Lassi", p:180},
    {n:"Fresh Fruit Lassi", p:220},
    {n:"Seasonal Smoothies", p:290},
    {n:"Mix Smoothies", p:300},
    {n:"Blueberry Smoothies", p:300},
  ]},
  "Milk Shake": {note:"Thick, classic, and Oreo.", items:[
    {n:"Strawberry / Hazelnut / Caramel / Vanilla / Chocolate Milk Shake", p:290},
    {n:"Oreo Milk Shake", p:320},
  ]},
  "Juice": {note:"Fresh-pressed or straight from the bottle.", items:[
    {n:"Seasonal Fresh Juice", p:220},
    {n:"Coke / Fanta / Sprite", p:100},
  ]},
  "Dessert": {note:"To close things out.", items:[
    {n:"Ice-Cream (Single/Double)", p:60},
    {n:"Fruit Sundaes", p:280},
  ]},
};

const OTHERS = ["Brownies","Croissant","Donuts","Cookies","Pasta","Momo","Pizza","Bread","Nachos","Kimbap","Burger","Virgin Mojito","Oreo Shakes","French Fries","Japanese Sushi","Smoothies"];

/* ============ REVIEW DATA ============ */
const REVIEWS = [
  {name:"Simran Shakya", lg:"Local Guide · 59 reviews · 102 photos", when:"4 months ago", visit:"Brunch · Rs 1,000–1,500",
   quote:"A 10/10 experience. The food is awesome and so are the desserts and the drinks. It's a very clean place with a great ambience and I always enjoy dropping in.",
   food:5, service:4, atmos:5},
  {name:"Sugandhi", lg:"7 reviews · 9 photos", when:"2 months ago", visit:"Lunch · Rs 1,000–1,500",
   quote:"Good ambience and good food. Love the vibe — cosy and peaceful. Best for a hangout or getting work done.",
   food:null, service:null, atmos:null},
  {name:"TheycallmeMalika", lg:"Local Guide · 15 reviews · 30 photos", when:"a year ago", visit:null,
   quote:"The coffee was decent, but the pastries are worth trying. Pleasant if you're working or catching up with friends — the savoury dishes just didn't match the bakery items for me.",
   food:3, service:5, atmos:4},
  {name:"bleuu", lg:"Local Guide · 50 reviews · 138 photos", when:"7 months ago", visit:null,
   quote:"Nice ambience and good food. Had to wait a little, but the setting made it easy not to mind. Price was reasonable too.",
   food:3, service:3, atmos:5},
  {name:"Zuber Lepcha", lg:"Local Guide · 14 reviews · 33 photos", when:"11 months ago", visit:"Lunch · Rs 500–1,000",
   quote:"Coffee: good. Food: good. Atmosphere: good. A reliable quiet spot to work or unwind with friends.",
   food:4, service:4, atmos:4},
];

/* ============ RENDER MENU ============ */
const chipRow = document.getElementById('chipRow');
const panelsWrap = document.getElementById('menuPanels');
const categories = Object.keys(MENU);

categories.forEach((cat, i) => {
  const chip = document.createElement('button');
  chip.className = 'chip' + (i===0 ? ' active' : '');
  chip.textContent = cat;
  chip.dataset.target = 'panel-'+i;
  chip.addEventListener('click', () => activatePanel(i));
  chipRow.appendChild(chip);
});
const othersChip = document.createElement('button');
othersChip.className = 'chip';
othersChip.textContent = 'Also on the Menu';
othersChip.dataset.target = 'panel-others';
othersChip.addEventListener('click', () => activatePanel('others'));
chipRow.appendChild(othersChip);

// "Billing" isn't a menu panel — it opens the bill modal instead.
const billingChip = document.createElement('button');
billingChip.className = 'chip chip-billing';
billingChip.textContent = '🧾 Billing';
billingChip.addEventListener('click', () => openBillingModal());
chipRow.appendChild(billingChip);

categories.forEach((cat, i) => {
  const panel = document.createElement('div');
  panel.className = 'menu-panel' + (i===0 ? ' active' : '');
  panel.id = 'panel-'+i;
  const noteHtml = `<div class="menu-cat-note">${MENU[cat].note}</div>`;
  const itemsHtml = MENU[cat].items.map((it) => {
    const id = cat+'|'+it.n;
    return `<div class="menu-item">
      <div style="flex:1;">
        <span class="menu-item-name">${it.n}</span>
        ${it.note ? `<span class="menu-item-note">${it.note}</span>` : ''}
      </div>
      <span class="menu-item-leader"></span>
      <span class="menu-item-price">Rs ${it.p.toFixed(2)}</span>
      <button class="menu-item-add" data-id="${id}" data-name="${it.n}" data-price="${it.p}" aria-label="Add ${it.n} to your bill">+</button>
    </div>`;
  }).join('');
  panel.innerHTML = noteHtml + `<div class="menu-list">${itemsHtml}</div>`;
  panelsWrap.appendChild(panel);
});

const othersPanel = document.createElement('div');
othersPanel.className = 'menu-panel';
othersPanel.id = 'panel-others';
othersPanel.innerHTML = `<div class="menu-cat-note">Rotating bakery case &amp; kitchen extras — ask the counter for today's price.</div>
  <div class="others-tags">${OTHERS.map(o=>`<span class="others-tag">${o}</span>`).join('')}</div>
  <div class="others-note">These change daily with what's baked or in season, so pricing lives on the counter board rather than here.</div>`;
panelsWrap.appendChild(othersPanel);

function activatePanel(target){
  document.querySelectorAll('.menu-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  const id = typeof target==='number' ? 'panel-'+target : 'panel-'+target;
  document.getElementById(id).classList.add('active');
  document.querySelector(`.chip[data-target="${id}"]`).classList.add('active');
}

/* ============ RENDER REVIEWS ============ */
const revGrid = document.getElementById('revGrid');
REVIEWS.forEach(r=>{
  const bars = (r.food!==null) ? `<div class="rev-bars">
      <span>Food <b>${r.food}/5</b></span>
      <span>Service <b>${r.service}/5</b></span>
      <span>Atmosphere <b>${r.atmos}/5</b></span>
    </div>` : '';
  const visit = r.visit ? `<div class="rev-visit">${r.visit}</div>` : '';
  const card = document.createElement('div');
  card.className = 'rev-card';
  card.innerHTML = `
    <div class="rev-top">
      <div class="rev-name">${r.name}<span class="lg">${r.lg}</span></div>
      <div class="rev-when">${r.when}</div>
    </div>
    ${visit}
    <div class="rev-quote">"${r.quote}"</div>
    ${bars}
  `;
  revGrid.appendChild(card);
});

/* mobile nav simple anchor smooth handled by CSS scroll-behavior */

/* ============================================================
   BILLING SYSTEM (new)
   A floating "🧾" button + modal invoice, reachable from the nav,
   hero, menu chip, and footer — instead of a fixed page section.
   Shows: customer name, the order (items + qty), price per item,
   and the total price. Saves to Supabase via /api/orders, then
   always opens WhatsApp with the bill, whether or not the save
   succeeded (so the button never feels "dead").
   ============================================================ */

let order = {}; // id -> { name, price, qty }
let currentTotal = 0;

const CAFE_WHATSAPP_NUMBER = '9779744412883'; // with country code, no +

const billingOverlay = document.getElementById('billingOverlay');
const billingFab = document.getElementById('billingFab');
const billingFabBadge = document.getElementById('billingFabBadge');
const billingModalClose = document.getElementById('billingModalClose');
const bmTbody = document.getElementById('bmTbody');
const bmTotalPrice = document.getElementById('bmTotalPrice');
const bmCustName = document.getElementById('bmCustName');
const bmCustPhone = document.getElementById('bmCustPhone');
const bmError = document.getElementById('bmError');
const bmSubmit = document.getElementById('bmSubmit');
const bmClear = document.getElementById('bmClear');
const bmBillId = document.getElementById('bmBillId');

function fmt(n){ return 'Rs ' + n.toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2}); }

function cartCount(){
  return Object.values(order).reduce((sum, it) => sum + it.qty, 0);
}

function updateFabBadge(){
  const count = cartCount();
  if(count > 0){
    billingFabBadge.textContent = count;
    billingFabBadge.style.display = 'flex';
  } else {
    billingFabBadge.style.display = 'none';
  }
}

function addItem(id, name, price){
  if(order[id]){ order[id].qty += 1; }
  else{ order[id] = {name, price, qty:1}; }
  updateFabBadge();
  renderBillModal();
  const btn = document.querySelector(`.menu-item-add[data-id="${CSS.escape(id)}"]`);
  if(btn){ btn.classList.add('added'); setTimeout(()=>btn.classList.remove('added'), 500); }
}

function changeQty(id, delta){
  if(!order[id]) return;
  order[id].qty += delta;
  if(order[id].qty <= 0) delete order[id];
  updateFabBadge();
  renderBillModal();
}

function removeItem(id){
  delete order[id];
  updateFabBadge();
  renderBillModal();
}

function renderBillModal(){
  const ids = Object.keys(order);

  if(ids.length === 0){
    bmTbody.innerHTML = `<tr class="bm-empty-row"><td colspan="5">No items yet — add something from the menu.</td></tr>`;
    bmTotalPrice.textContent = fmt(0);
    currentTotal = 0;
    return;
  }

  let total = 0;
  const rows = ids.map(id => {
    const it = order[id];
    const lineTotal = it.price * it.qty;
    total += lineTotal;
    return `<tr>
      <td class="bm-item-name">${it.name}</td>
      <td>
        <div class="bm-qty-ctrl">
          <button type="button" onclick="changeQty('${id.replace(/'/g,"\\'")}',-1)" aria-label="Decrease quantity">−</button>
          <span>${it.qty}</span>
          <button type="button" onclick="changeQty('${id.replace(/'/g,"\\'")}',1)" aria-label="Increase quantity">+</button>
        </div>
      </td>
      <td class="bm-num-cell">${fmt(it.price)}</td>
      <td class="bm-num-cell">${fmt(lineTotal)}</td>
      <td><button type="button" class="bm-rm-btn" onclick="removeItem('${id.replace(/'/g,"\\'")}')" aria-label="Remove item">✕</button></td>
    </tr>`;
  }).join('');

  bmTbody.innerHTML = rows;
  bmTotalPrice.textContent = fmt(total);
  currentTotal = total;
}

/* ---- modal open/close ---- */
function openBillingModal(){
  renderBillModal();
  billingOverlay.classList.add('open');
  billingOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const idNum = 1000 + Math.floor(Math.random()*900);
  bmBillId.textContent = '#LS-' + idNum;
}
function closeBillingModal(){
  billingOverlay.classList.remove('open');
  billingOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  bmError.textContent = '';
}

document.querySelectorAll('.js-open-billing').forEach(el=>{
  el.addEventListener('click', (e)=>{ e.preventDefault(); openBillingModal(); });
});
billingModalClose.addEventListener('click', closeBillingModal);
billingOverlay.addEventListener('click', (e)=>{ if(e.target === billingOverlay) closeBillingModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && billingOverlay.classList.contains('open')) closeBillingModal(); });

/* ---- add-to-bill button clicks (event delegation) ---- */
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.menu-item-add');
  if(btn){
    addItem(btn.dataset.id, btn.dataset.name, parseFloat(btn.dataset.price));
  }
});

/* ---- clear bill ---- */
bmClear.addEventListener('click', ()=>{
  order = {};
  bmCustName.value = '';
  bmCustPhone.value = '';
  bmError.textContent = '';
  updateFabBadge();
  renderBillModal();
});

/* ---- submit / send bill ----
   1. Best-effort saves the order to /api/orders (Supabase).
   2. Always opens WhatsApp with the bill afterwards, whether or
      not the save succeeded — so the button always does something.
*/
bmSubmit.addEventListener('click', async ()=>{
  bmError.textContent = '';

  const ids = Object.keys(order);
  if(ids.length === 0){
    bmError.textContent = 'Add at least one item to your bill first.';
    return;
  }

  const name = (bmCustName.value || '').trim();
  const phone = (bmCustPhone.value || '').trim();

  if(!name){
    bmError.textContent = 'Please enter the customer name.';
    bmCustName.focus();
    return;
  }
  if(!phone || !/^[0-9+\-()\s]{6,20}$/.test(phone)){
    bmError.textContent = 'Please enter a valid phone number.';
    bmCustPhone.focus();
    return;
  }

  const items = ids.map(id => ({
    name: order[id].name,
    price: order[id].price,
    qty: order[id].qty,
  }));

  const lines = items.map(it => `${it.qty} x ${it.name} - ${fmt(it.price*it.qty)}`).join('\n');
  const messageText =
    `Hi La Semilla, I'd like to order:\n${lines}\n\n` +
    `Total: ${fmt(currentTotal)}\n\n` +
    `Name: ${name}\nPhone: ${phone}`;
  const whatsappUrl = `https://wa.me/${CAFE_WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;

  const originalLabel = bmSubmit.textContent;
  bmSubmit.disabled = true;
  bmSubmit.textContent = 'Sending…';

  try{
    console.log('[La Semilla] Saving bill to /api/orders', { name, phone, items, totalPrice: currentTotal });
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, items, totalPrice: currentTotal }),
    });
    if(res.ok){
      console.log('[La Semilla] Bill saved.');
    } else {
      const data = await res.json().catch(()=>({}));
      console.warn('[La Semilla] Bill NOT saved to database:', res.status, data);
    }
  } catch(err){
    console.warn('[La Semilla] Could not reach /api/orders:', err);
  }

  window.open(whatsappUrl, '_blank', 'noopener');

  bmSubmit.disabled = false;
  bmSubmit.textContent = originalLabel;

  // Treat the bill as sent: clear the cart and close the modal.
  order = {};
  bmCustPhone.value = '';
  updateFabBadge();
  renderBillModal();
  closeBillingModal();
});
