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

categories.forEach((cat, i) => {
  const panel = document.createElement('div');
  panel.className = 'menu-panel' + (i===0 ? ' active' : '');
  panel.id = 'panel-'+i;
  const noteHtml = `<div class="menu-cat-note">${MENU[cat].note}</div>`;
  const itemsHtml = MENU[cat].items.map((it, idx) => {
    const id = cat+'|'+it.n;
    return `<div class="menu-item">
      <div style="flex:1;">
        <span class="menu-item-name">${it.n}</span>
        ${it.note ? `<span class="menu-item-note">${it.note}</span>` : ''}
      </div>
      <span class="menu-item-leader"></span>
      <span class="menu-item-price">Rs ${it.p.toFixed(2)}</span>
      <button class="menu-item-add" data-id="${id}" data-name="${it.n}" data-price="${it.p}" aria-label="Add ${it.n} to order">+</button>
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

/* ============ BILLING / ORDER TICKET ============ */
let order = {}; // id -> {name, price, qty}
let currentSubtotal = 0;

const ticketBody = document.getElementById('ticketBody');
const ticketSummary = document.getElementById('ticketSummary');
const ticketCustomer = document.getElementById('ticketCustomer');
const sumCount = document.getElementById('sumCount');
const sumSubtotal = document.getElementById('sumSubtotal');
const sumTotal = document.getElementById('sumTotal');
const custName = document.getElementById('custName');
const custPhone = document.getElementById('custPhone');
const custError = document.getElementById('custError');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');

const CAFE_WHATSAPP_NUMBER = '9779744412883'; // La Semilla's WhatsApp number (with country code, no +)

function fmt(n){ return 'Rs ' + n.toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2}); }

function showToast(msg){
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=>toast.classList.remove('show'), 1800);
}

function addItem(id, name, price){
  if(order[id]){ order[id].qty += 1; }
  else{ order[id] = {name, price, qty:1}; }
  renderTicket();
  const btn = document.querySelector(`.menu-item-add[data-id="${CSS.escape(id)}"]`);
  if(btn){ btn.classList.add('added'); setTimeout(()=>btn.classList.remove('added'), 500); }
  showToast(name + ' added to ticket');
}

function changeQty(id, delta){
  if(!order[id]) return;
  order[id].qty += delta;
  if(order[id].qty <= 0) delete order[id];
  renderTicket();
}

function removeItem(id){
  delete order[id];
  renderTicket();
}

function renderTicket(){
  const ids = Object.keys(order);
  if(ids.length === 0){
    ticketBody.innerHTML = `<div class="ticket-empty">Your ticket is empty — add something from the menu.</div>`;
    ticketSummary.style.display = 'none';
    ticketCustomer.style.display = 'none';
    currentSubtotal = 0;
    return;
  }
  let subtotal = 0, count = 0;
  const rows = ids.map(id=>{
    const it = order[id];
    const lineTotal = it.price * it.qty;
    subtotal += lineTotal;
    count += it.qty;
    return `<div class="ticket-item">
      <div class="qty-ctrl">
        <button onclick="changeQty('${id.replace(/'/g,"\\'")}',-1)" aria-label="Decrease quantity">−</button>
        <span>${it.qty}</span>
        <button onclick="changeQty('${id.replace(/'/g,"\\'")}',1)" aria-label="Increase quantity">+</button>
      </div>
      <div class="name"><b>${it.name}</b><span>${fmt(it.price)} each</span></div>
      <div class="line-total">${fmt(lineTotal)}</div>
      <button class="rm" onclick="removeItem('${id.replace(/'/g,"\\'")}')" aria-label="Remove item">✕</button>
    </div>`;
  }).join('');
  ticketBody.innerHTML = `<div class="ticket-items">${rows}</div>`;
  ticketSummary.style.display = 'block';
  ticketCustomer.style.display = 'flex';
  sumCount.textContent = count;
  sumSubtotal.textContent = fmt(subtotal);
  sumTotal.textContent = fmt(subtotal);
  currentSubtotal = subtotal;
}

document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.menu-item-add');
  if(btn){
    addItem(btn.dataset.id, btn.dataset.name, parseFloat(btn.dataset.price));
  }
});

document.getElementById('btnClear').addEventListener('click', ()=>{
  order = {};
  custName.value = '';
  custPhone.value = '';
  custError.textContent = '';
  renderTicket();
  showToast('Ticket cleared');
});

/* ---- Send order ----
   1. Always builds the WhatsApp message and opens it — this is the part
      that must never silently fail, so it does not depend on the
      Supabase save succeeding.
   2. Best-effort saves the order to /api/orders first; if that fails
      (API not deployed yet, missing env vars, offline, etc.) we log a
      warning and still open WhatsApp, so the button never feels "dead".
*/
async function handleSendOrder(e){
  if(e && e.preventDefault) e.preventDefault();
  custError.textContent = '';

  const ids = Object.keys(order);
  if(ids.length === 0){
    custError.textContent = 'Add at least one item to your ticket first.';
    document.getElementById('menu').scrollIntoView({behavior:'smooth'});
    return;
  }

  const name = (custName.value || '').trim();
  const phone = (custPhone.value || '').trim();

  if(!name){
    custError.textContent = 'Please enter your name.';
    custName.focus();
    return;
  }
  if(!phone || !/^[0-9+\-()\s]{6,20}$/.test(phone)){
    custError.textContent = 'Please enter a valid phone number.';
    custPhone.focus();
    return;
  }

  const items = ids.map(id => ({
    name: order[id].name,
    price: order[id].price,
    qty: order[id].qty,
  }));

  // Build the WhatsApp message text up front.
  const lines = items.map(it => `${it.qty} x ${it.name} - ${fmt(it.price*it.qty)}`).join('\n');
  const messageText =
    `Hi La Semilla, I'd like to order:\n${lines}\n\n` +
    `Total: ${fmt(currentSubtotal)}\n\n` +
    `Name: ${name}\nPhone: ${phone}`;
  const whatsappUrl = `https://wa.me/${CAFE_WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;

  const sendBtn = document.getElementById('btnSend');
  const originalLabel = sendBtn ? sendBtn.textContent : '';
  if(sendBtn){ sendBtn.disabled = true; sendBtn.textContent = 'Sending…'; }

  try{
    console.log('[La Semilla] Saving order to /api/orders', { name, phone, items, totalPrice: currentSubtotal });

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, items, totalPrice: currentSubtotal }),
    });

    if(res.ok){
      const data = await res.json().catch(()=>({}));
      console.log('[La Semilla] Order saved:', data);
      showToast('Order saved — opening WhatsApp…');
    } else {
      const data = await res.json().catch(()=>({}));
      console.warn('[La Semilla] Order NOT saved to database:', res.status, data);
      showToast('Opening WhatsApp (order not saved to database)');
    }
  } catch(err){
    // Network failure, /api/orders not deployed, offline, etc.
    // We deliberately do NOT re-throw — the WhatsApp handoff below
    // must still happen regardless of this failing.
    console.warn('[La Semilla] Could not reach /api/orders:', err);
    showToast('Opening WhatsApp (order not saved to database)');
  }

  // This always runs, whether or not the save above succeeded.
  window.open(whatsappUrl, '_blank', 'noopener');

  if(sendBtn){ sendBtn.disabled = false; sendBtn.textContent = originalLabel; }
}

const btnSendEl = document.getElementById('btnSend');
if(btnSendEl){
  btnSendEl.addEventListener('click', handleSendOrder);
} else {
  console.error('[La Semilla] #btnSend not found in the DOM — check the button id in index.html.');
}

// Redundant safety net: exposed globally so the inline onclick on the
// button in index.html still works even if, for any reason, the
// addEventListener call above never ran (e.g. an unrelated script error
// earlier in the page stopped this file's execution before reaching it).
window.sendOrderFallback = handleSendOrder;

/* ticket header meta */
(function(){
  const d = new Date();
  document.getElementById('ticketDate').textContent = d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
  document.getElementById('ticketId').textContent = '#LS-' + (1000 + Math.floor(Math.random()*900));
})();

renderTicket();

/* mobile nav simple anchor smooth handled by CSS scroll-behavior */
