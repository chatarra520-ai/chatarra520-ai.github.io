/* ============================================================
   DESTACADOS — 2 carruseles INDEPENDIENTES en index.html:
   "Almohadas" y "Bases cama". Cada uno hace scroll por separado,
   con sus propias flechas — no comparten posición ni catálogo.

   ⚠️ Los productos de abajo (ALMOHADAS y BASECAMAS) son PLACEHOLDER
   de ejemplo — reemplázalos por los reales cuando los tengas. Mismo
   formato que carrusel-ofertas.js: es código JavaScript (sin comillas
   alrededor de todo el array, a diferencia de un data-* en HTML).
   Si un producto no tiene oferta, deja su "old" en null (no se
   muestra el tachado ni el pill de descuento para ese, igual que en
   el resto del sitio).

   Requiere en el HTML:
     <div class="oferta-carousel" id="almohadasGrid"></div>
     <button id="amPrev">...</button>  <button id="amNext">...</button>
     <div class="oferta-carousel" id="basecamasGrid"></div>
     <button id="bcPrev">...</button>  <button id="bcNext">...</button>
   Requiere en el ámbito global (cargar ANTES que este archivo):
     - window.addToCart(id)   → carrito.js
   Expone: se suma a window.products (igual que combos.js), para que
   detalle.html y el carrito encuentren estos productos por id.
   ============================================================ */

window.products = window.products || [];

const ALMOHADAS = [
  { id: 'almohada-01', name: 'Viscoelástica · Soporte cuello', tag: 'Viscoelástica · Soporte cuello', desc: 'Almohada viscoelástica con soporte especial para la zona cervical.', old: 189000, now: 94500, img: 'img/almohadas/almohada-01.png' }, /*Necesito minimo cinco imagenes en el detalle.  Necesito que tenga dedidas*/

];

const BASECAMAS = [
  { id: 'basecamaSencilla', name: 'Base cama Sencilla', tag: 'Madera · Multi-medidas', desc: 'En madera de pino nueva,  textura agradable y fácil limpieza, patas metálicas de 10 cm', old: 590000, now: 349000, img: 'img/basecama/basecama-sencilla-02.png' }, /*Necesito minimo cinco imagenes en el detalle.  Necesito que tenga dedidas*/

  { id: 'basecama-tapizada', name: 'Base cama Semidoble', tag: 'Tapizada · Antideslizante', desc: 'En madera de pino nueva,  textura agradable y fácil limpieza, patas metálicas de 10 cm', old: 790000, now: 495000, img: 'img/basecama/basecama-semidoble-02.png' }, /*Necesito minimo cinco imagenes en el detalle.  Necesito que tenga dedidas*/

  { id: 'basecama-dividida', name: 'Base cama Doble dividida', tag: 'Dividida · Multi-medidas', desc: 'En madera de pino nueva,  textura agradable y fácil limpieza, patas metálicas de 10 cm', old: null, now: 420000, img: 'img/basecama/basecama-doble-02.png' }, /*Necesito minimo cinco imagenes en el detalle.  Necesito que tenga dedidas*/
];

(function () {

  function money(n) {
    return window.money ? window.money(n) : ('$' + n.toLocaleString('es-CO'));
  }

  function buildCard(p) {
    const off = p.old ? Math.round((1 - p.now / p.old) * 100) : 0;
    const card = document.createElement('div');
    card.className = 'pcard';
    card.innerHTML = `
      <div class="img-wrap">
        ${p.old ? `<span class="discount-pill">-${off}%</span>` : ''}
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="body">
        <h3>${p.name}</h3>
        <p class="tag">${p.tag}</p>
        <div class="prices">
          ${p.old ? `<span class="old">${money(p.old)}</span>` : ''}
          <span class="now">${money(p.now)}</span>
        </div>
        <a class="ver-detalle" href="detalle.html?id=${encodeURIComponent(p.id)}">Ver especificaciones</a>
        <button class="add-btn" data-id="${p.id}">Agregar al carrito</button>
      </div>`;
    return card;
  }

  // Arma UN carrusel independiente: pinta las cards, conecta el botón
  // "Agregar al carrito", y devuelve una función para mover el scroll
  // con las flechas de ESE carrusel en particular (no afecta al otro).
  function initCarousel(products, gridId, prevId, nextId) {
    const grid = document.getElementById(gridId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    if (!grid) {
      console.warn(`[destacados] Falta #${gridId} en el HTML.`);
      return;
    }

    products.forEach(p => grid.appendChild(buildCard(p)));

    grid.addEventListener('click', e => {
      const btn = e.target.closest('.add-btn');
      if (!btn) return;
      if (typeof window.addToCart === 'function') {
        window.addToCart(btn.dataset.id);
      } else {
        console.warn('[destacados] window.addToCart no está definido.');
      }
      btn.textContent = 'Agregado ✓';
      btn.classList.add('added');
      setTimeout(() => { btn.textContent = 'Agregar al carrito'; btn.classList.remove('added'); }, 1400);
    });

    function move(dir) {
      const card = grid.querySelector('.pcard');
      const step = card ? card.getBoundingClientRect().width + 20 : 290;
      grid.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
    }

    function updateArrows() {
      if (!prevBtn || !nextBtn) return;
      prevBtn.disabled = grid.scrollLeft <= 4;
      nextBtn.disabled = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 4;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => move(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => move(1));
    grid.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    setTimeout(updateArrows, 200);
  }

  function initDestacados() {
    // Se suman al catálogo global para que detalle.html y el carrito
    // los encuentren por id, igual que combos.js.
    window.products = window.products.concat(ALMOHADAS, BASECAMAS);

    initCarousel(ALMOHADAS, 'almohadasGrid', 'amPrev', 'amNext');
    initCarousel(BASECAMAS, 'basecamasGrid', 'bcPrev', 'bcNext');
  }

  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDestacados);
    } else {
      initDestacados();
    }
  } catch (err) {
    console.warn('[destacados] No se pudo inicializar:', err);
  }

})();
