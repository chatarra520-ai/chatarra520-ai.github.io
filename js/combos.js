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
      id: 'Almohada siliconada',
      name: 'Almohada Sox 70',
      tag: 'Interior en fibra siliconada brinda una sensación de soporte. Material 100% hecho en microfibra para una postura adecuada y descansada',
      desc: 'Una unidad',
      old: 49800, now: 24900,
      img: 'img/combos/Al-sox70.png',

    },
    {
      id: 'Protector acolchado',
      name: 'Protector acolchado',
      tag: 'Protector de colchón fuelle completo en tela y resorte en todo el contorno asegura el máximo ajuste al colchón',
      desc: 'Multi medidas',
      old: 49900, now: 99800,
      img: 'img/combos/Protector-acolchado.png',
      sizes: [
        { label: "Sencillo", now: 44900, old: 89800 },
        { label: "Semidoble", now: 49900, old: 99800 },
        { label: "Doble", now: 119800, old: 59900 },
        { label: "Queen", now: 64900, old: 129800 },
        { label: "King", now: 74900, old: 149800 }]
    },

    {
      id: 'Base-Cama',
      name: 'Base Cama Royal',
      tag: 'Una opción práctica para el dormitorio es crear un espacio cómodo y funcional que favorezca el descanso.',
      desc: 'Multi medidas',
      old: 858000, now: 429000,
      img: 'img/combos/Protector-acolchado.png',
      sizes: [
        { label: "Sencillo", now: 858000, old: 422900 },
        { label: "Semidoble", now: 429000, old: 858000 },
        { label: "Doble", now: 479000, old: 958000 },
        { label: "Queen", now: 319000, old: 638000 },
        { label: "King", now: 329000, old: 658000 }]
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
