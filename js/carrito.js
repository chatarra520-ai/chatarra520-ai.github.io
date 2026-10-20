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
   index.html y detalle.html) ni al refrescar.

   ️ TAMAÑOS Y COLORES: los productos pueden tener precio distinto por 
   tamaño (ver "sizes") y variantes por color. Cada línea del carrito guarda
   { id, size, color, qty }. Dos líneas con el mismo id pero distinto size 
   o color son líneas SEPARADAS. El precio se resuelve SIEMPRE contra el 
   catálogo (p.sizes / p.now).
   ============================================================ */
(function () {

  const STORAGE_KEY = 'orion-cart';

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn('[carrito] No se pudo leer el carrito guardado:', err);
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.warn('[carrito] No se pudo guardar el carrito:', err);
    }
  }

  let cart = loadCart();

  let catalogReady = !window.categoriaCatalogoReady;

  // Resuelve el precio "ahora" de una línea del carrito contra el
  // catálogo actual: si la línea tiene "size", busca ese tamaño dentro
  // de p.sizes; si no, usa el precio base del producto.
  function resolvePrice(p, size) {
    if (size && Array.isArray(p.sizes)) {
      const s = p.sizes.find(sz => sz.label === size);
      if (s) return s.now;
    }
    return p.now;
  }

  // --- MODIFICADO: Ahora incluye el color en la etiqueta ---
  function lineLabel(p, size, color) {
    let label = p.name;
    if (size) label += ` · ${size}`;
    if (color) label += ` · ${color}`;
    return label;
  }

  function renderCart() {
    const countEl = document.getElementById('cartCount');
    const itemsEl = document.getElementById('drawerItems');
    const footEl = document.getElementById('drawerFoot');
    if (!countEl || !itemsEl || !footEl) {
      console.warn('[carrito] Faltan elementos del carrito en el HTML.');
      return;
    }

    const products = window.products || [];
    const money = window.money || (n => '$' + n);

    if (catalogReady) {
      const antes = cart.length;
      cart = cart.filter(ci => products.some(pp => pp.id === ci.id));
      if (cart.length !== antes) saveCart();
    }

    const count = cart.reduce((s, i) => s + i.qty, 0);
    countEl.textContent = count;

    if (cart.length === 0) {
      itemsEl.innerHTML = `<div class="drawer-empty">Tu carrito está vacío.<br>Explora las ofertas y encuentra tu colchón ideal.</div>`;
      footEl.innerHTML = '';
      return;
    }

    itemsEl.innerHTML = cart.map(ci => {
      const p = products.find(pp => pp.id === ci.id);
      if (!p) return '';
      const price = resolvePrice(p, ci.size);

      // --- MODIFICADO: Preparar atributos para pasar color a las funciones ---
      const sizeAttr = ci.size ? `'${ci.size}'` : 'null';
      const colorAttr = ci.color ? `'${ci.color}'` : 'null';

      return `
      <div class="drawer-item">
        <img src="${p.img}" alt="${p.name}">
        <div class="info">
          <h4>${lineLabel(p, ci.size, ci.color)}</h4>
          <div class="price">${money(price)}</div>
          <div class="qty-row">
            <button onclick="changeQty('${p.id}',-1,${sizeAttr},${colorAttr})">–</button>
            <span>${ci.qty}</span>
            <button onclick="changeQty('${p.id}',1,${sizeAttr},${colorAttr})">+</button>
            <button class="remove-item" onclick="removeItem('${p.id}',${sizeAttr},${colorAttr})">Quitar</button>
          </div>
        </div>
      </div>`;
    }).join('');

    const subtotal = cart.reduce((s, ci) => {
      const p = products.find(pp => pp.id === ci.id);
      return s + (p ? resolvePrice(p, ci.size) * ci.qty : 0);
    }, 0);

    footEl.innerHTML = `
      <div class="subtotal-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
      <button class="checkout-btn" onclick="checkout()">Proceder al pago</button>
      <p class="drawer-note">Envío calculado en el siguiente paso · Pago 100% seguro</p>
    `;
  }

  // --- MODIFICADO: Se agregó el parámetro 'color' ---
  window.addToCart = function (id, qty, size, color) {
    qty = qty && qty > 0 ? qty : 1;
    size = size || null;
    color = color || null;

    // Buscar si ya existe con la misma combinación de id, tamaño y color
    const existing = cart.find(i => i.id === id && i.size === size && i.color === color);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id, qty, size, color });
    }
    saveCart();
    renderCart();
    if (window.showToast) window.showToast('Producto agregado al carrito');
  };

  // --- MODIFICADO: Se agregó el parámetro 'color' ---
  window.changeQty = function (id, delta, size, color) {
    size = size || null;
    color = color || null;

    const item = cart.find(i => i.id === id && i.size === size && i.color === color);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => !(i.id === id && i.size === size && i.color === color));
    }
    saveCart();
    renderCart();
  };

  // --- MODIFICADO: Se agregó el parámetro 'color' ---
  window.removeItem = function (id, size, color) {
    size = size || null;
    color = color || null;

    cart = cart.filter(i => !(i.id === id && i.size === size && i.color === color));
    saveCart();
    renderCart();
  };

  window.checkout = function () {
    if (window.showToast) window.showToast('Esta es una maqueta: aquí iría el flujo real de pago.');
  };

  window.openCart = function () {
    const overlay = document.getElementById('overlay');
    const drawer = document.getElementById('drawer');
    if (overlay) overlay.classList.add('show');
    if (drawer) drawer.classList.add('show');
  };

  window.closeCart = function () {
    const overlay = document.getElementById('overlay');
    const drawer = document.getElementById('drawer');
    if (overlay) overlay.classList.remove('show');
    if (drawer) drawer.classList.remove('show');
  };

  try {
    renderCart();
  } catch (err) {
    console.warn('[carrito] No se pudo inicializar:', err);
  }

  if (window.categoriaCatalogoReady) {
    window.categoriaCatalogoReady.then(() => { catalogReady = true; renderCart(); }).catch(() => { catalogReady = true; });
  }

})();