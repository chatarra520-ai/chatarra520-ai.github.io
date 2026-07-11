/* ============================================================
   COMBOS — 3 tarjetas de combos (colchón + base + accesorios).
   Requiere en el HTML: <div id="combosGrid"></div>
   Requiere en el ámbito global (cargar DESPUÉS de carrusel-ofertas.js,
   que crea window.products, y ANTES de carrito.js):
     - window.products, window.money   → carrusel-ofertas.js
   Este archivo agrega los 3 combos a window.products, para que el
   carrito (carrito.js) pueda encontrarlos por id igual que cualquier
   otro producto.
   Expone globalmente: nada nuevo (usa window.addToCart en tiempo de clic)
   ============================================================ */
(function () {

  const combos = [
    {
      id: 'combo-uno',
      name: 'Colchom + Base Cama',
      tag: 'Colchón Ortholife Foam + Base cama + 2 almohadas',
      old: 1450000, now: 850000,
      img: 'img/combos/10.png'
    },
    {
      id: 'combo-dos',
      name: 'Colchon + Plumon',
      tag: 'Colchón Paraíso Gold + Base cama + Protector antifluidos',
      old: 1950000, now: 1050000,
      img: 'img/combos/11.png'
    },
    {
      id: 'combo-tres',
      name: 'Combo Tres',
      tag: 'Colchón Paraíso Premium Gold + Base tapizada + Sábanas + 2 almohadas',
      old: 2350000, now: 1250000,
      img: 'img/combos/10.png'
    }
  ];

  function initCombos() {
    const grid = document.getElementById('combosGrid');
    if (!grid) {
      console.warn('[combos] Falta #combosGrid en el HTML.');
      return;
    }

    // agrega los combos al catálogo global para que el carrito los reconozca
    if (Array.isArray(window.products)) {
      window.products = window.products.concat(combos);
    } else {
      window.products = combos.slice();
    }

    const money = window.money || (n => '$' + n);

    combos.forEach(p => {
      const off = Math.round((1 - p.now / p.old) * 100);
      const card = document.createElement('div');
      card.className = 'pcard';
      card.innerHTML = `
        <div class="combos">
         
          <img src="${p.img}" alt="${p.name}" loading="lazy">
        </div>
        <div class="body">
          <h3>${p.name}</h3>
          <p class="tag">${p.tag}</p>
          <div class="prices">
            <span class="old">${money(p.old)}</span>
            <span class="now">${money(p.now)}</span>
          </div>
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
  }

  try {
    initCombos();
  } catch (err) {
    console.warn('[combos] No se pudo inicializar:', err);
  }

})();
