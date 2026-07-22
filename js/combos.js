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
      id: 'combo-uno',
      name: 'Colchom + Base Cama',
      tag: 'Colchón Ortholife Foam + Base cama + 2 almohadas',
      desc: 'Combo para amoblar el dormitorio completo: colchón Ortholife Foam junto con base cama y 2 almohadas, despachados juntos.',
      old: 1450000, now: 850000,
      img: 'img/combos/10.png'
    },
    {
      id: 'combo-dos',
      name: 'Colchon + Plumon',
      tag: 'Colchón Paraíso Gold + Base cama + Protector antifluidos',
      desc: 'Combo con el colchón Paraíso Gold, base cama y protector antifluidos, para cuidar el colchón desde el primer día.',
      old: 1950000, now: 1050000,
      img: 'img/combos/11.png'
    },
    {
      id: 'combo-tres',
      name: 'Combo Tres',
      tag: 'Colchón Paraíso Premium Gold + Base tapizada + Sábanas + 2 almohadas',
      desc: 'El combo más completo de la línea: colchón Paraíso Premium Gold, base tapizada, sábanas y 2 almohadas.',
      old: 2350000, now: 1250000,
      img: 'img/combos/10.png'
    },
    // ⚠️ PLACEHOLDER — combo de relleno para completar los 5 del carrusel,
    // pedido por el cliente ("crea una y yo hago lo demás"). Nombre, precios
    // e imagen son de ejemplo: hay que reemplazarlos por datos reales antes
    // de publicar. Falta un 5º combo, que el cliente agrega directamente.
    {
      id: 'combo-cuatro',
      name: '[PLACEHOLDER] Combo Cuatro',
      tag: '[Completar: colchón + base + accesorios de este combo]',
      desc: '[Completar: descripción real de este combo antes de publicar]',
      old: 1690000, now: 890000,
      img: 'img/combos/11.png'
    }
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
