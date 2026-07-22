/* ============================================================
   CARRITO DE COMPRAS — autocontenido.
   Requiere en el HTML:
     <span class="cart-count" id="cartCount">0</span>
     <div class="overlay" id="overlay"></div>
     <div class="drawer" id="drawer">
       <div class="drawer-items" id="drawerItems"></div>
       <div class="drawer-foot" id="drawerFoot"></div>
     </div>
     <div class="toast" id="toast"></div>
   Requiere en el ámbito global (cargar ANTES que este archivo):
     - window.products, window.money   → carrusel-ofertas.js
     - window.showToast(msg)            → toast.js
   Expone globalmente: window.addToCart, window.changeQty,
     window.removeItem, window.checkout, window.openCart, window.closeCart

   El carrito se guarda en localStorage bajo la clave "orion-cart" para que
   NO se pierda al navegar entre páginas del sitio (por ejemplo entre
   index.html y detalle.html) ni al refrescar. Antes vivía solo en memoria
   y se perdía con cualquier recarga.
   ============================================================ */
(function(){

  const STORAGE_KEY = 'orion-cart';

  function loadCart(){
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn('[carrito] No se pudo leer el carrito guardado:', err);
      return [];
    }
  }

  function saveCart(){
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.warn('[carrito] No se pudo guardar el carrito:', err);
    }
  }

  let cart = loadCart();

  function renderCart(){
    const countEl = document.getElementById('cartCount');
    const itemsEl = document.getElementById('drawerItems');
    const footEl = document.getElementById('drawerFoot');
    if(!countEl || !itemsEl || !footEl){
      console.warn('[carrito] Faltan elementos del carrito en el HTML.');
      return;
    }

    const count = cart.reduce((s,i) => s + i.qty, 0);
    countEl.textContent = count;

    if(cart.length === 0){
      itemsEl.innerHTML = `<div class="drawer-empty">Tu carrito está vacío.<br>Explora las ofertas y encuentra tu colchón ideal.</div>`;
      footEl.innerHTML = '';
      return;
    }

    const products = window.products || [];
    const money = window.money || (n => '$' + n);

    itemsEl.innerHTML = cart.map(ci => {
      const p = products.find(pp => pp.id === ci.id);
      if(!p) return '';
      return `
      <div class="drawer-item">
        <img src="${p.img}" alt="${p.name}">
        <div class="info">
          <h4>${p.name}</h4>
          <div class="price">${money(p.now)}</div>
          <div class="qty-row">
            <button onclick="changeQty('${p.id}',-1)">–</button>
            <span>${ci.qty}</span>
            <button onclick="changeQty('${p.id}',1)">+</button>
            <button class="remove-item" onclick="removeItem('${p.id}')">Quitar</button>
          </div>
        </div>
      </div>`;
    }).join('');

    const subtotal = cart.reduce((s,ci) => {
      const p = products.find(pp => pp.id === ci.id);
      return s + (p ? p.now * ci.qty : 0);
    }, 0);

    footEl.innerHTML = `
      <div class="subtotal-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
      <button class="checkout-btn" onclick="checkout()">Proceder al pago</button>
      <p class="drawer-note">Envío calculado en el siguiente paso · Pago 100% seguro</p>
    `;
  }

  window.addToCart = function(id, qty){
    qty = qty && qty > 0 ? qty : 1;
    const existing = cart.find(i => i.id === id);
    if(existing){ existing.qty += qty; }
    else { cart.push({ id, qty }); }
    saveCart();
    renderCart();
    if(window.showToast) window.showToast('Producto agregado al carrito');
  };

  window.changeQty = function(id, delta){
    const item = cart.find(i => i.id === id);
    if(!item) return;
    item.qty += delta;
    if(item.qty <= 0){ cart = cart.filter(i => i.id !== id); }
    saveCart();
    renderCart();
  };

  window.removeItem = function(id){
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
  };

  window.checkout = function(){
    if(window.showToast) window.showToast('Esta es una maqueta: aquí iría el flujo real de pago.');
  };

  window.openCart = function(){
    const overlay = document.getElementById('overlay');
    const drawer = document.getElementById('drawer');
    if(overlay) overlay.classList.add('show');
    if(drawer) drawer.classList.add('show');
  };

  window.closeCart = function(){
    const overlay = document.getElementById('overlay');
    const drawer = document.getElementById('drawer');
    if(overlay) overlay.classList.remove('show');
    if(drawer) drawer.classList.remove('show');
  };

  try{
    renderCart();
  }catch(err){
    console.warn('[carrito] No se pudo inicializar:', err);
  }

})();
