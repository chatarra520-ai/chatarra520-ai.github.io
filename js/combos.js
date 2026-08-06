/* ============================================================
   COMBOS — carrusel de combos (colchón + base + accesorios).
   Requiere en el HTML:
     <div class="oferta-carousel" id="combosGrid"></div>
     <button id="ccPrev" onclick="ccMove(-1)">...</button>
     <button id="ccNext" onclick="ccMove(1)">...</button>
   Requiere en el ámbito global (cargar DESPUÉS de carrusel-ofertas.js,
   que crea window.products, y ANTES de carrito.js):
     - window.products, window.money   → carrusel-ofertas.js
   Este archivo agrega los combos a window.products, para que el
   carrito (carrito.js) pueda encontrarlos por id igual que cualquier
   otro producto.
   Expone globalmente: window.ccMove(dir)
   ============================================================ */
(function () {

  window.ccMove = function () { }; // no-op por defecto

  const combos = [
    {
      id: 'ColchonNube+BaseCama',
      name: 'Super Combo Orion Nube',
      tag: 'Colchon Nube firmeza suabe + basecama multimedidad',
      desc: 'Multi medidas',
      old: 2409995, now: 1982990,
      img: 'img/combos/cbc-01.png',
      sizes: [
        { label: "Sencillo", now: 1916990, old: 2317995, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1982990, old: 2409995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 2257990, old: 2719995, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 2990990, old: 3175995, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 4120995, old: 3750990, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonNube+RopaCama',
      name: 'Combo Estreno',
      tag: 'Colchón Orion Nube firmeza suave + almohada siliconada y protector siliconado',
      desc: 'Multi medidas',
      old: 2043770, now: 1809990,
      img: 'img/combos/crc-01.png',
      sizes: [
        { label: "Sencillo", now: 1764990, old: 1993770, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1809990, old: 2043770, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 2097990, old: null, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 2643990, old: 2983040, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 3414990, old: null, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },

    {
      id: 'ColchonVenus+BaseCama',
      name: 'Combo Astral',
      tag: 'Colchón Orion Venuz, firmeza media + Basecama',
      desc: 'Multi medidas',
      old: 1559995, now: 1316990,
      img: 'img/combos/cbc-02.png',
      sizes: [
        { label: "Sencillo", now: 1696990, old: 1417995, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1316990, old: 1559995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1469990, old: 1719995, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1741990, old: 1755995, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 2331990, old: null, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },

    {
      id: 'ColchonVenus+RopaCama',
      name: 'Combo Nova',
      tag: 'Colchón Orion Venuz, firmeza media + Ropa de cama',
      desc: 'Multi medidas',
      old: 1193770, now: 1143990,
      img: 'img/combos/crc-02.png',
      sizes: [
        { label: "Sencillo", now: 1044990, old: 1093770, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1143990, old: 1193770, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1309990, old: 1373520, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1493990, old: 1563040, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 1994990, old: 2072500, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },

  ];

  function initCombos() {
    const grid = document.getElementById('combosGrid');
    const prevBtn = document.getElementById('ccPrev');
    const nextBtn = document.getElementById('ccNext');

    // El catálogo global se completa SIEMPRE, incluso en páginas (como
    // detalle.html) que no tienen el carrusel visual de combos — si no,
    // esas páginas nunca encuentran el producto por id.
    if (Array.isArray(window.products)) {
      window.products = window.products.concat(combos);
    } else {
      window.products = combos.slice();
    }

    if (!grid) {
      console.warn('[combos] Falta #combosGrid en el HTML. Se omite el carrusel visual, pero el catálogo ya quedó completo.');
      return;
    }

    const money = window.money || (n => '$' + n);

    combos.forEach(p => {
      const off = Math.round((1 - p.now / p.old) * 100);
      const card = document.createElement('div');
      card.className = 'pcard';
      card.innerHTML = `
        <div class="img-wrap">
          <span class="discount-pill">-${off}%</span>
          <img src="${p.img}" alt="${p.name}" loading="lazy">
        </div>
        <div class="body">
          <h3>${p.name}</h3>
          <p class="tag">${p.tag}</p>
          <div class="prices">
            <span class="old">${money(p.old)}</span>
            <span class="now">${money(p.now)}</span>
          </div>
          <a class="ver-detalle" href="detalle.html?id=${encodeURIComponent(p.id)}">Ver especificaciones</a>
          <button class="add-btn" data-id="${p.id}">Agregar al carrito</button>
        </div>`;
      grid.appendChild(card);
    });

    grid.addEventListener('click', e => {
      const btn = e.target.closest('.add-btn');
      if (!btn) return;
      if (typeof window.addToCart === 'function') {
        window.addToCart(btn.dataset.id);
      } else {
        console.warn('[combos] window.addToCart no está definido.');
      }
      btn.textContent = 'Agregado ✓';
      btn.classList.add('added');
      setTimeout(() => { btn.textContent = 'Agregar al carrito'; btn.classList.remove('added'); }, 1400);
    });

    // ---- scroll / navegación (mismo patrón que el carrusel de ofertas) ----
    function ccMoveInternal(dir) {
      const card = grid.querySelector('.pcard');
      const step = card ? card.getBoundingClientRect().width + 20 : 290;
      grid.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
    }

    function updateCcArrows() {
      if (!prevBtn || !nextBtn) return;
      prevBtn.disabled = grid.scrollLeft <= 4;
      nextBtn.disabled = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 4;
    }

    window.ccMove = ccMoveInternal;

    grid.addEventListener('scroll', updateCcArrows);
    window.addEventListener('resize', updateCcArrows);
    setTimeout(updateCcArrows, 200);
  }

  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCombos);
    } else {
      initCombos();
    }
  } catch (err) {
    console.warn('[combos] No se pudo inicializar:', err);
  }

})();
