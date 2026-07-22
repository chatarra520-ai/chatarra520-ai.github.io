/* ============================================================
   DETALLE DE PRODUCTO — pinta detalle.html según el ?id= de la URL.
   Requiere en el HTML: <div id="detailRoot"></div>, <span id="crumbName">
   Requiere en el ámbito global (cargar DESPUÉS de carrusel-ofertas.js y
   combos.js, que arman window.products completo, y ANTES de que el usuario
   pueda hacer click en "Agregar al carrito"):
     - window.products, window.money   → carrusel-ofertas.js / combos.js
     - window.addToCart(id, qty)        → carrito.js
   ============================================================ */
(function () {

  // Textos de garantía reales del sitio (sección "Por qué elegirnos"),
  // reutilizados acá porque son datos ciertos ya publicados; no se inventan
  // especificaciones técnicas (materiales, densidades, etc.) que no están
  // confirmadas — eso hay que completarlo con la info real de cada producto.
  const TRUST_ITEMS = [
    'Garantía de fábrica de 7 años en toda la línea Paraíso',
    'Despacho a nivel nacional, con seguimiento del pedido',
    'Pago 100% seguro: tarjetas, PSE, contraentrega y cuotas',
    'Cambio por inconformidad dentro de los primeros 30 días'
  ];

  const checkSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`;

  function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  function renderNotFound(root) {
    root.innerHTML = `
      <div class="detail-notfound">
        <h1>No encontramos este producto</h1>
        <p>Puede que el enlace esté mal escrito o el producto ya no esté disponible.</p>
        <a href="index.html#ofertas" class="btn-primary">Ver todas las ofertas</a>
      </div>`;
  }

  function renderProduct(root, p) {
    const money = window.money || (n => '$' + n);
    const off = Math.round((1 - p.now / p.old) * 100);
    const isPlaceholder = /\[PLACEHOLDER\]|\[Completar/.test(p.name + p.tag);

    document.title = `${p.name} — Colchones Orión`;
    const crumb = document.getElementById('crumbName');
    if (crumb) crumb.textContent = p.name;

    root.innerHTML = `
      <div class="detail-grid">
        <div class="detail-image">
          <span class="discount-pill">-${off}%</span>
          <img src="${p.img}" alt="${p.name}">
        </div>
        <div class="detail-body">
          ${isPlaceholder ? `<p class="tag" style="color:var(--clay-deep);font-weight:800;">⚠️ Contenido de ejemplo — reemplazar antes de publicar</p>` : ''}
          <p class="tag">${p.tag}</p>
          <h1>${p.name}</h1>
          <div class="detail-prices">
            <span class="old">${money(p.old)}</span>
            <span class="now">${money(p.now)}</span>
            <span class="detail-off">-${off}%</span>
          </div>

          <p class="detail-desc">${p.desc || p.tag}</p>

          <div class="qty-selector">
            <button type="button" id="qtyMinus" aria-label="Restar">–</button>
            <span id="qtyValue">1</span>
            <button type="button" id="qtyPlus" aria-label="Sumar">+</button>
          </div>

          <div class="detail-actions">
            <button class="add-btn" id="detailAddBtn">Agregar al carrito</button>
          </div>

          <a class="detail-wa" target="_blank" rel="noopener"
             href="https://wa.me/573002853282?text=${encodeURIComponent('Hola, quiero consultar por: ' + p.name)}">
            Consultar por WhatsApp
          </a>

          <h2 class="detail-subhead">Incluye con tu compra</h2>
          <ul class="detail-specs">
            ${TRUST_ITEMS.map(t => `<li>${checkSvg}${t}</li>`).join('')}
          </ul>
        </div>
      </div>`;

    let qty = 1;
    const qtyValue = document.getElementById('qtyValue');
    document.getElementById('qtyMinus').addEventListener('click', () => {
      qty = Math.max(1, qty - 1);
      qtyValue.textContent = qty;
    });
    document.getElementById('qtyPlus').addEventListener('click', () => {
      qty = qty + 1;
      qtyValue.textContent = qty;
    });

    const addBtn = document.getElementById('detailAddBtn');
    addBtn.addEventListener('click', () => {
      if (typeof window.addToCart === 'function') {
        window.addToCart(p.id, qty);
      } else {
        console.warn('[detalle] window.addToCart no está definido.');
      }
      addBtn.textContent = 'Agregado ✓';
      addBtn.classList.add('added');
      setTimeout(() => { addBtn.textContent = 'Agregar al carrito'; addBtn.classList.remove('added'); }, 1400);
    });
  }

  function renderRelated(root, current) {
    const products = window.products || [];
    const money = window.money || (n => '$' + n);
    const related = products.filter(pp => pp.id !== current.id).slice(0, 3);
    if (related.length === 0) return;

    const wrap = document.createElement('div');
    wrap.className = 'related-wrap';
    wrap.innerHTML = `
      <h2 class="detail-subhead">También te puede interesar</h2>
      <div class="related-grid">
        ${related.map(p => `
          <a class="related-card" href="detalle.html?id=${encodeURIComponent(p.id)}">
            <img src="${p.img}" alt="${p.name}" loading="lazy">
            <div class="related-body">
              <h4>${p.name}</h4>
              <span class="related-now">${money(p.now)}</span>
            </div>
          </a>`).join('')}
      </div>`;
    root.appendChild(wrap);
  }

  function init() {
    const root = document.getElementById('detailRoot');
    if (!root) return;

    const id = getIdFromUrl();
    const products = window.products || [];
    const p = products.find(pp => pp.id === id);

    if (!p) {
      renderNotFound(root);
      return;
    }
    renderProduct(root, p);
    renderRelated(root, p);
  }

  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  } catch (err) {
    console.warn('[detalle] No se pudo inicializar:', err);
  }

})();
