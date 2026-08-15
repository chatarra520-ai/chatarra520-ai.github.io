/* ============================================================
   DETALLE DE PRODUCTO — pinta detalle.html según el ?id= de la URL.
   Requiere en el HTML: <div id="detailRoot"></div>, <span id="crumbName">
   Requiere en el ámbito global (cargar DESPUÉS de carrusel-ofertas.js y
   combos.js, que arman window.products completo, y ANTES de que el usuario
   pueda hacer click en "Agregar al carrito"):
     - window.products, window.money   → carrusel-ofertas.js / combos.js
     - window.addToCart(id, qty)        → carrito.js
     - window.categoriaCatalogoReady    → categoria-catalogo.js (opcional;
       si está presente, se espera antes de buscar el producto, para que
       los colchones de firme/medio/suave también se encuentren aquí)
   ============================================================ */
(function () {

  const TRUST_ITEMS = [
    'Garantía de fábrica de 5 años',
    'Habla con nuestro asesor y conoce nuestras zonas de entrega.',
    'Pago con PSE o contraentrega'
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
    const isPlaceholder = /\[PLACEHOLDER\]|\[Completar/.test(p.name + p.tag);
    const hasSizes = Array.isArray(p.sizes) && p.sizes.length > 0;

    document.title = `${p.name} — Colchones Orión`;
    const crumb = document.getElementById('crumbName');
    if (crumb) crumb.textContent = p.name;

    let selectedSize = hasSizes
      ? (p.sizes.find(s => s.label === 'Semidoble') || p.sizes[0])
      : null;

    function currentPricing() {
      if (hasSizes) return { now: selectedSize.now, old: selectedSize.old };
      return { now: p.now, old: p.old };
    }

    function offPercent(pricing) {
      if (!pricing.old) return 0;
      return Math.round((1 - pricing.now / pricing.old) * 100);
    }

    const hasGallery = Array.isArray(p.gallery) && p.gallery.length > 0;
    const initialImg = hasGallery ? p.gallery[0] : p.img;

    root.innerHTML = `
      <div class="detail-grid">
        <div class="detail-image-col">
          <div class="detail-image">
            <span class="discount-pill" id="detailPill" style="display:none;"></span>
            <img src="${initialImg}" alt="${p.name}" id="detailImg">
          </div>

          ${hasGallery ? `
          <div class="detail-gallery" id="detailGallery">
            <button type="button" class="gallery-arrow gallery-prev" id="galleryPrev" aria-label="Ver miniaturas anteriores">‹</button>
            <div class="gallery-track" id="galleryTrack">
              ${p.gallery.map((src, i) => `
                <button type="button" class="gallery-thumb${i === 0 ? ' active' : ''}" data-src="${src}">
                  <img src="${src}" alt="${p.name} — foto ${i + 1}" loading="lazy">
                </button>`).join('')}
            </div>
            <button type="button" class="gallery-arrow gallery-next" id="galleryNext" aria-label="Ver más miniaturas">›</button>
          </div>` : ''}
        </div>
        <div class="detail-body">
          ${isPlaceholder ? `<p class="tag" style="color:var(--clay-deep);font-weight:800;">⚠️ Contenido de ejemplo — reemplazar antes de publicar</p>` : ''}
          <p class="tag">${p.tag}</p>
          <h1>${p.name}</h1>
          <div class="detail-prices" id="detailPrices"></div>

          <p class="detail-desc">${p.desc || p.tag}</p>

          ${hasSizes ? `
          <div class="size-selector" id="sizeSelector">
            ${p.sizes.map(s => `<button type="button" class="size-btn" data-size="${s.label}">${s.label}</button>`).join('')}
          </div>
          <div class="size-measures" id="sizeMeasures"></div>` : ''}

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

    const pricesEl = document.getElementById('detailPrices');
    const pillEl = document.getElementById('detailPill');

    function renderPricing() {
      const pricing = currentPricing();
      const off = offPercent(pricing);

      pricesEl.innerHTML = pricing.old
        ? `<span class="old">${money(pricing.old)}</span><span class="now">${money(pricing.now)}</span><span class="detail-off">-${off}%</span>`
        : `<span class="now">${money(pricing.now)}</span>`;

      if (pricing.old) {
        pillEl.textContent = `-${off}%`;
        pillEl.style.display = '';
      } else {
        pillEl.style.display = 'none';
      }
    }

    const MEASURE_ORDER = [
      { key: 'ancho', label: 'Ancho' },
      { key: 'largo', label: 'Largo' },
      { key: 'alto', label: 'Alto' }
    ];

    function renderMeasures() {
      const measuresEl = document.getElementById('sizeMeasures');
      if (!measuresEl) return;

      const medidas = selectedSize && selectedSize.medidas;
      const parts = medidas
        ? MEASURE_ORDER.filter(m => medidas[m.key]).map(m => `${m.label}: ${medidas[m.key]}`)
        : [];

      measuresEl.innerHTML = parts.length
        ? `<h3 class="measures-title">Confirma el tamaño de tu colchón.</h3><p class="measures-text">${selectedSize.label} — ${parts.join(' · ')}</p>`
        : '';
    }

    renderPricing();
    if (hasSizes) renderMeasures();

    if (hasSizes) {
      const selector = document.getElementById('sizeSelector');
      function updateActiveBtn() {
        selector.querySelectorAll('.size-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.size === selectedSize.label);
        });
      }
      updateActiveBtn();

      selector.addEventListener('click', e => {
        const btn = e.target.closest('.size-btn');
        if (!btn) return;
        const size = p.sizes.find(s => s.label === btn.dataset.size);
        if (!size) return;
        selectedSize = size;
        updateActiveBtn();
        renderPricing();
        renderMeasures();
      });
    }

    if (hasGallery) {
      const track = document.getElementById('galleryTrack');
      const mainImg = document.getElementById('detailImg');
      const prevBtn = document.getElementById('galleryPrev');
      const nextBtn = document.getElementById('galleryNext');

      track.addEventListener('click', e => {
        const thumb = e.target.closest('.gallery-thumb');
        if (!thumb) return;
        mainImg.src = thumb.dataset.src;
        track.querySelectorAll('.gallery-thumb').forEach(t => t.classList.toggle('active', t === thumb));
      });

      function scrollGallery(dir) {
        const firstThumb = track.querySelector('.gallery-thumb');
        const step = firstThumb ? firstThumb.getBoundingClientRect().width + 12 : 100;
        track.scrollBy({ left: dir * step * 3, behavior: 'smooth' });
      }
      prevBtn.addEventListener('click', () => scrollGallery(-1));
      nextBtn.addEventListener('click', () => scrollGallery(1));

      function updateGalleryArrows() {
        prevBtn.disabled = track.scrollLeft <= 4;
        nextBtn.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
      }
      track.addEventListener('scroll', updateGalleryArrows);
      window.addEventListener('resize', updateGalleryArrows);
      setTimeout(updateGalleryArrows, 200);
    }

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
        window.addToCart(p.id, qty, hasSizes ? selectedSize.label : null);
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

    const configEl = document.getElementById('destacadosConfig');
    const idsRaw = configEl ? (configEl.dataset.ids || '') : '';
    const ids = [...new Set(idsRaw.split(',').map(s => s.trim()).filter(Boolean))];

    const related = ids
      .map(id => products.find(p => p.id === id))
      .filter(p => p && p.id !== current.id);

    const missing = ids.filter(id => !products.find(p => p.id === id));
    if (missing.length) {
      console.warn('[detalle] Estos ids de #destacadosConfig no existen en el catálogo:', missing);
    }

    if (related.length === 0) return;

    const wrap = document.createElement('div');
    wrap.className = 'suggested-wrap';
    wrap.innerHTML = `
      <h2 class="detail-subhead">También te puede interesar</h2>
      <div class="suggested-grid">
        ${related.map(p => `
          <a class="suggested-card" href="detalle.html?id=${encodeURIComponent(p.id)}">
            <div class="suggested-img-wrap">
              <img src="${p.img}" alt="${p.name}" loading="lazy">
            </div>
            <div class="suggested-body">
              <h4>${p.name}</h4>
              <span class="suggested-now">${money(p.now)}</span>
            </div>
          </a>`).join('')}
      </div>`;
    root.appendChild(wrap);
  }













  function init() {
    const root = document.getElementById('detailRoot');
    if (!root) return;

    const ready = window.categoriaCatalogoReady || Promise.resolve();

    ready.finally(() => {
      const id = getIdFromUrl();
      const products = window.products || [];
      const p = products.find(pp => pp.id === id);

      if (!p) {
        renderNotFound(root);
        return;
      }
      renderProduct(root, p);
      renderRelated(root, p);
    });
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