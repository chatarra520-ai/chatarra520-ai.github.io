/* ============================================================
   CARRUSEL INFERIOR (ofertas) — abre y cierra, autocontenido.
   Este archivo es la ÚNICA fuente del catálogo (window.products) y
   del formateador de precios (window.money) — el HTML ya no tiene JS
   propio para esto. El carrito (definido en el <script> del HTML)
   los usa a través de window.products / window.money, así que este
   archivo debe cargarse ANTES de que el usuario pueda interactuar
   con el carrito (con <script src> al final del <body> ya se cumple).

   Requiere en el HTML:
     <div class="oferta-carousel" id="productGrid"></div>
     <button id="ocPrev" onclick="ocMove(-1)">...</button>
     <button id="ocNext" onclick="ocMove(1)">...</button>
   Requiere en el ámbito global: window.addToCart(id), definido en el
   <script> del HTML (para el carrito).
   Expone globalmente: window.ocMove(dir), window.products, window.money
   ============================================================ */

window.products = [
  { id: 'ortholife-foam', name: 'Colchón Ortholife Foam', tag: 'Espuma alta densidad · Multi-medidas', old: 1258000, now: 629000, img: 'img/02.png?v=1766081598&width=600' },
  { id: 'futura', name: 'Colchón Resortado Futura', tag: 'Resortes Bonnell · Firmeza media', old: 1390000, now: 695000, img: 'img/02.png?v=1767815535&width=600' },
  { id: 'ortholife-firm', name: 'Colchón Ortholife Firm', tag: 'Soporte firme · Zona lumbar', old: 1398000, now: 699000, img: 'img/03.png?v=1766081671&width=600' },
  { id: 'relaxoflex', name: 'Colchón Relaxoflex', tag: 'Doble cara · Antiácaros', old: 1490000, now: 745000, img: 'img/04.png?v=1769433827&width=600' },
  { id: 'paradise-200', name: 'Colchón Paradise Serie I 200', tag: 'Comprimido · Fácil transporte', old: 1599800, now: 799900, img: 'img/05.png?v=1767021618&width=600' },
  { id: 'paraiso-gold', name: 'Colchón Paraíso Gold', tag: 'Maxi Top · Garantía 7 años', old: 1639000, now: 819500, img: 'img/04.png?v=1772594318&width=600' },
  { id: 'emotion-life', name: 'Colchón Emotion Life Maxi Top', tag: 'Pillow top · Multizona', old: 1790000, now: 895000, img: 'img/03.png?v=1766436427&width=600' },
  { id: 'paraiso-premium', name: 'Colchón Paraíso Premium Gold', tag: 'Línea premium · Garantía 7 años', old: 1837000, now: 918500, img: 'img/02.png?v=1770383626&width=600' },
  { id: 'emotion-firm', name: 'Colchón Emotion Firm Maxi Top', tag: 'Firme · Multizonas', old: 1990000, now: 995000, img: 'img/06.png?v=1766435242&width=600' },
];

window.money = function (n) { return '$' + n.toLocaleString('es-CO'); };

(function () {

  window.ocMove = function () { }; // no-op por defecto

  function initOfertasCarousel() {
    const grid = document.getElementById('productGrid');
    const prevBtn = document.getElementById('ocPrev');
    const nextBtn = document.getElementById('ocNext');

    if (!grid) {
      console.warn('[carrusel-ofertas] Falta #productGrid en el HTML. Se omite su inicialización.');
      return;
    }

    // ---- pintar tarjetas del catálogo ----
    products.forEach(p => {
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
          <button class="add-btn" data-id="${p.id}">Agregar al carrito</button>
        </div>`;
      grid.appendChild(card);
    });

    grid.addEventListener('click', e => {
      const btn = e.target.closest('.add-btn');
      if (!btn) return;
      if (typeof addToCart === 'function') {
        addToCart(btn.dataset.id);
      } else {
        console.warn('[carrusel-ofertas] addToCart() no está definido en el ámbito global.');
      }
      btn.textContent = 'Agregado ✓';
      btn.classList.add('added');
      setTimeout(() => { btn.textContent = 'Agregar al carrito'; btn.classList.remove('added'); }, 1400);
    });

    // ---- scroll / navegación ----
    function ocMoveInternal(dir) {
      const card = grid.querySelector('.pcard');
      const step = card ? card.getBoundingClientRect().width + 20 : 290;
      grid.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
    }

    function updateOcArrows() {
      if (!prevBtn || !nextBtn) return;
      prevBtn.disabled = grid.scrollLeft <= 4;
      nextBtn.disabled = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 4;
    }

    window.ocMove = ocMoveInternal;

    grid.addEventListener('scroll', updateOcArrows);
    window.addEventListener('resize', updateOcArrows);
    setTimeout(updateOcArrows, 200);
  }

  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initOfertasCarousel);
    } else {
      initOfertasCarousel();
    }
  } catch (err) {
    console.warn('[carrusel-ofertas] No se pudo inicializar:', err);
  }

})();
