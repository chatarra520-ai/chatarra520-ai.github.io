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
   Opcional: window.categoriaCatalogoReady → categoria-catalogo.js. Si
   está presente, el carrito se vuelve a pintar cuando resuelva, para
   mostrar bien los colchones de firme/medio/suave en cualquier página.
   Expone globalmente: window.addToCart, window.changeQty,
     window.removeItem, window.checkout, window.openCart, window.closeCart

   El carrito se guarda en localStorage bajo la clave "orion-cart" para que
   NO se pierda al navegar entre páginas del sitio (por ejemplo entre
   index.html y detalle.html) ni al refrescar. Antes vivía solo en memoria
   y se perdía con cualquier recarga.

   ⚠️ TAMAÑOS: los colchones tienen precio distinto por tamaño (ver
   "sizes" en carrusel-ofertas.js). Cada línea del carrito guarda
   { id, size, qty }: "size" es el label del tamaño elegido (ej.
   "Semidoble") o null si el producto no maneja tamaños (ej. combos).
   Dos líneas con el mismo id pero distinto size son líneas SEPARADAS
   (ej. el mismo colchón en Sencillo y en Queen a la vez), tal como se
   acordó. El precio de cada línea se resuelve SIEMPRE contra el
   catálogo (p.sizes / p.now), nunca se guarda un precio suelto en el
   carrito, para que si el catálogo cambia el carrito no quede desfasado.
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

  // Antes de limpiar el carrito de ids "fantasma" (que ya no existen en
  // el catálogo, ej. porque se renombró o eliminó un producto), hay que
  // estar seguros de que YA se cargó el catálogo completo — si no,
  // podríamos borrar por error un producto real de firme/medio/suave que
  // simplemente todavía no había llegado (llega vía fetch, es async).
  // catalogReady arranca en true si esta página no usa ese mecanismo.
  let catalogReady = !window.categoriaCatalogoReady;

  // Resuelve el precio "ahora" de una línea del carrito contra el
  // catálogo actual: si la línea tiene "size", busca ese tamaño dentro
  // de p.sizes; si no, usa el precio base del producto (combos y
  // cualquier producto sin tamaños).
  function resolvePrice(p, size){
    if (size && Array.isArray(p.sizes)) {
      const s = p.sizes.find(sz => sz.label === size);
      if (s) return s.now;
    }
    return p.now;
  }

  function lineLabel(p, size){
    return size ? `${p.name} · ${size}` : p.name;
  }

  function renderCart(){
    const countEl = document.getElementById('cartCount');
    const itemsEl = document.getElementById('drawerItems');
    const footEl = document.getElementById('drawerFoot');
    if(!countEl || !itemsEl || !footEl){
      console.warn('[carrito] Faltan elementos del carrito en el HTML.');
      return;
    }

    const products = window.products || [];
    const money = window.money || (n => '$' + n);

    // ⚠️ Limpieza de "fantasmas": si algún id guardado ya no existe en
    // el catálogo (producto renombrado/eliminado), se saca solo del
    // carrito guardado — así no se queda contando para siempre sin
    // poder quitarlo. Va ANTES de calcular el conteo, para que el
    // número que se muestra ya sea el correcto. Solo se hace una vez
    // que el catálogo ya cargó completo, para no borrar por error algo
    // que solo estaba tardando en llegar (categoria-catalogo.js).
    if (catalogReady) {
      const antes = cart.length;
      cart = cart.filter(ci => products.some(pp => pp.id === ci.id));
      if (cart.length !== antes) saveCart();
    }

    const count = cart.reduce((s,i) => s + i.qty, 0);
    countEl.textContent = count;

    if(cart.length === 0){
      itemsEl.innerHTML = `<div class="drawer-empty">Tu carrito está vacío.<br>Explora las ofertas y encuentra tu colchón ideal.</div>`;
      footEl.innerHTML = '';
      return;
    }

    itemsEl.innerHTML = cart.map(ci => {
      const p = products.find(pp => pp.id === ci.id);
      if(!p) return '';
      const price = resolvePrice(p, ci.size);
      const sizeAttr = ci.size ? `'${ci.size}'` : 'null';
      return `
      <div class="drawer-item">
        <img src="${p.img}" alt="${p.name}">
        <div class="info">
          <h4>${lineLabel(p, ci.size)}</h4>
          <div class="price">${money(price)}</div>
          <div class="qty-row">
            <button onclick="changeQty('${p.id}',-1,${sizeAttr})">–</button>
            <span>${ci.qty}</span>
            <button onclick="changeQty('${p.id}',1,${sizeAttr})">+</button>
            <button class="remove-item" onclick="removeItem('${p.id}',${sizeAttr})">Quitar</button>
          </div>
        </div>
      </div>`;
    }).join('');

    const subtotal = cart.reduce((s,ci) => {
      const p = products.find(pp => pp.id === ci.id);
      return s + (p ? resolvePrice(p, ci.size) * ci.qty : 0);
    }, 0);

    footEl.innerHTML = `
      <div class="subtotal-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
      <button class="checkout-btn" onclick="checkout()">Proceder al pago</button>
      <p class="drawer-note">Envío calculado en el siguiente paso · Pago 100% seguro</p>
    `;
  }

  // size es opcional (null/undefined para productos sin tamaños, como
  // los combos). Dos llamadas con el mismo id pero distinto size crean
  // dos líneas separadas en el carrito.
  window.addToCart = function(id, qty, size){
    qty = qty && qty > 0 ? qty : 1;
    size = size || null;
    const existing = cart.find(i => i.id === id && i.size === size);
    if(existing){ existing.qty += qty; }
    else { cart.push({ id, qty, size }); }
    saveCart();
    renderCart();
    if(window.showToast) window.showToast('Producto agregado al carrito');
  };

  window.changeQty = function(id, delta, size){
    size = size || null;
    const item = cart.find(i => i.id === id && i.size === size);
    if(!item) return;
    item.qty += delta;
    if(item.qty <= 0){ cart = cart.filter(i => !(i.id === id && i.size === size)); }
    saveCart();
    renderCart();
  };

  window.removeItem = function(id, size){
    size = size || null;
    cart = cart.filter(i => !(i.id === id && i.size === size));
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

  // Si esta página incluye js/categoria-catalogo.js (fetch de firme/medio/
  // suave.html), el carrito puede pintarse ANTES de que esos productos
  // terminen de llegar. Cuando lleguen, se vuelve a pintar para que se vean
  // bien nombre/imagen/precio de cualquier colchón de esas categorías.
  if (window.categoriaCatalogoReady) {
    window.categoriaCatalogoReady.then(() => { catalogReady = true; renderCart(); }).catch(() => { catalogReady = true; });
  }

})();

