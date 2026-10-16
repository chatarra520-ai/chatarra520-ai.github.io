/* ============================================================
   DESTACADOS — UN solo carrusel en index.html, con filtros arriba
   (Almohadas / Bases cama / lo que agregues) que se generan SOLOS
   según qué categorías tengan productos — no se editan a mano en el
   HTML. Sin hacer clic en nada, se ve TODO el carrusel completo.
   Al hacer clic en una categoría, filtra solo esos productos (si son
   pocos, quedan centrados en vez de pegados a la izquierda). El botón
   "Ver todo" vuelve a mostrar todo.

   Mismo comportamiento que el carrusel de ofertas: cards de ancho fijo,
   scroll horizontal con flechas.

   ⚠️ Para agregar productos: los metes en el array PRODUCTOS de abajo,
   con su "category" (el texto exacto que quieres que aparezca como
   filtro, ej. "Almohadas", "Bases cama", "Ropa de cama"). Si agregas
   una categoría nueva que no existe todavía, el filtro para esa
   categoría aparece solo, no hay que tocar nada más.
   Formato igual a carrusel-ofertas.js (JavaScript, sin comillas
   alrededor del array). Si un producto no tiene oferta, deja su "old"
   en null.

   Requiere en el HTML:
     <div class="destacados-filtros" id="destacadosFiltros"></div>
     <div class="oferta-carousel" id="destacadosGrid"></div>
     <button id="destPrev">...</button>  <button id="destNext">...</button>
   Requiere en el ámbito global (cargar ANTES que este archivo):
     - window.addToCart(id)   → carrito.js
   Expone: se suma a window.products (igual que combos.js), para que
   detalle.html y el carrito encuentren estos productos por id.
   ============================================================ */

window.products = window.products || [];

const PRODUCTOS_DESTACADOS = [
  {
    id: 'almohada-01', name: 'Almohada Soy 70', tag: 'Almohada siliconada · Soporte cuello', desc: 'Almohada Siliconadas con soporte especial para la zona cervical.', old: 49800, now: 24900, img: 'img/almohadas/almohada-01.png', category: 'Almohadas',
    gallery: ['img/almohadas/almohada-01.png', 'img/almohadas/almohada-02.png'],
    sizes: [
      { label: "Estándar", now: 24900, old: 49800, medidas: { ancho: "55 cm", largo: "35 cm", alto: null } }
    ]
  },


  ///////////////   sencilla     //////////////////////////////


  {
    id: 'basecama 100 x 190', name: 'Basecama Royal 100 x 190 cm', tag: 'En madera de pino nueva, textura agradable y fácil limpieza, tapizada en telas de alta resistencia, patas metálicas de 10 cm', desc: 'En madera de pino nueva, textura agradable y fácil limpieza, tapizada en telas de alta resistencia, patas metálicas de 10 cm', old: 858000, now: 429000, img: 'img/basecama/basecama01-por.png', category: 'Bases cama',
    gallery: ['img/basecama/basecama01-por.png',
      'img/basecama/basecama01-02.png',
      'img/basecama/detalle01.png',
      'img/basecama/detalle.png',
      'img/basecama/basecama.png',
      'img/m-altura.png'],
    sizes: [
      { label: "100 x 190", now: 429000, old: 858000, medidas: { ancho: "100 cm", largo: "190 cm", alto: "32 cm" } }
    ]
  },

  {
    id: 'basecama 100 x 200', name: 'Basecama Royal 100 x 200 cm', tag: 'En madera de pino nueva, textura agradable y fácil limpieza, tapizada en telas de alta resistencia, patas metálicas de 10 cm', desc: 'En madera de pino nueva, textura agradable y fácil limpieza, tapizada en telas de alta resistencia, patas metálicas de 10 cm', old: 858000, now: 429000, img: 'img/basecama/basecama01-por.png', category: 'Bases cama',
    gallery: ['img/basecama/basecama01-por.png',
      'img/basecama/basecama01-02.png',
      'img/basecama/detalle01.png',
      'img/basecama/detalle.png',
      'img/basecama/basecama.png',
      'img/m-altura.png'],
    sizes: [
      { label: "100 x 200", now: 429000, old: 858000, medidas: { ancho: "100 cm", largo: "200 cm", alto: "32 cm" } }
    ]
  },
  ///////////////   Doble     /////////////////////////
  {
    id: 'basecama 120 x 190', name: 'Basecama Royal 120 x 190 cm', tag: 'En madera de pino nueva, textura agradable y fácil limpieza, tapizada en telas de alta resistencia, patas metálicas de 10 cm', desc: 'En madera de pino nueva, textura agradable y fácil limpieza, tapizada en telas de alta resistencia, patas metálicas de 10 cm', old: 938000, now: 469000, img: 'img/basecama/baseCama02-port.png', category: 'Bases cama',
    gallery: [
      'img/basecama/baseCama02-port.png',
      'img/basecama/basecama02-02.png',
      'img/basecama/detalle.png',
      'img/basecama/detalle01.png',
      'img/basecama/basecama.png',
      'img/m-altura.png'],
    sizes: [
      { label: "120 x 190", now: 469000, old: 938000, medidas: { ancho: "120 cm", largo: "190 cm", alto: "32 cm" } }
    ]
  },
  {
    id: 'basecama 140 x 190', name: 'Basecama Royal 140 x 190 cm', tag: 'En madera de pino nueva, textura agradable y fácil limpieza, tapizada en telas de alta resistencia, patas metálicas de 10 cm', desc: 'En madera de pino nueva, textura agradable y fácil limpieza, tapizada en telas de alta resistencia, patas metálicas de 10 cm', old: 958000, now: 479000, img: 'img/basecama/baseCama02-port.png', category: 'Bases cama',
    gallery: ['img/basecama/baseCama02-port.png',
      'img/basecama/basecama02-02.png',
      'img/basecama/detalle01.png',
      'img/basecama/detalle.png',
      'img/basecama/basecama.png',
      'img/m-altura.png'],
    sizes: [
      { label: "120 x 190", now: 479000, old: 958000, medidas: { ancho: "140 cm", largo: "190 cm", alto: "32 cm" } }
    ]
  },
  ///////////////  Dividida    /////////////////////////
  {
    id: 'basecama 0.95 x 140', name: 'Base cama doble dividida', tag: 'Base cama doble dividida. En madera de pino nueva, textura agradable y fácil limpieza, tapizada en telas de alta resistencia, patas metálicas de 10 cm.  ', desc: 'Base cama doble dividida. En madera de pino nueva, textura agradable y fácil limpieza, tapizada en telas de alta resistencia, patas metálicas de 10 cm. <strong> Valor por segmento </strong>', old: 638000, now: 319000, img: 'img/basecama/basecama03-por.png', category: 'Bases cama',
    gallery: [
      'img/basecama/basecama03-por.png',
      'img/basecama/basecama03-02.png',
      'img/basecama/detalle02.png',
      'img/basecama/detalle.png',
      'img/basecama/basecama02.png',],
    sizes: [
      { label: "Estándar", now: 319000, old: 638000, medidas: { ancho: "0.95 cm", largo: "140 cm", alto: "32 cm" } }
    ]
  },
  {
    id: 'basecama 0.95 x 160', name: 'Base cama doble dividida', tag: 'Base cama doble dividida. En madera de pino nueva, textura agradable y fácil limpieza, tapizada en telas de alta resistencia, patas metálicas de 10 cm.', desc: 'Base cama doble dividida. En madera de pino nueva, textura agradable y fácil limpieza, tapizada en telas de alta resistencia, patas metálicas de 10 cm. <strong> Valor por segmento </strong>', old: 658000, now: 329000, img: 'img/basecama/basecama03-por.png', category: 'Bases cama',
    gallery: [
      'img/basecama/basecama03-por.png',
      'img/basecama/basecama03-02.png',
      'img/basecama/detalle02.png',
      'img/basecama/detalle.png',
      'img/basecama/basecama02.png',],
    sizes: [
      { label: "Estándar", now: 329000, old: 658000, medidas: { ancho: "0.95 cm", largo: "160 cm", alto: "32 cm" } }
    ]
  },


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

  function initDestacados() {
    // Se suman al catálogo global SIEMPRE, incluso en páginas (como
    // detalle.html) que no tienen el carrusel visual — igual que hace
    // combos.js. Si no se hace esto antes del "return" de abajo, el
    // detalle nunca encuentra estos productos.
    window.products = window.products.concat(PRODUCTOS_DESTACADOS);

    const grid = document.getElementById('destacadosGrid');
    const filtrosEl = document.getElementById('destacadosFiltros');
    const prevBtn = document.getElementById('destPrev');
    const nextBtn = document.getElementById('destNext');
    if (!grid) {
      console.warn('[destacados] Falta #destacadosGrid en el HTML (normal si esta página no tiene el carrusel).');
      return;
    }

    // Filtros generados SOLOS según las categorías presentes en los datos
    // (en el orden en que aparecen por primera vez), + "Ver todo".
    const categorias = [...new Set(PRODUCTOS_DESTACADOS.map(p => p.category).filter(Boolean))];

    function renderFiltros(activa) {
      if (!filtrosEl) return;
      const items = ['Ver todo', ...categorias];
      filtrosEl.innerHTML = items.map(cat =>
        `<button type="button" class="destacado-filtro${cat === activa ? ' active' : ''}" data-cat="${cat}">${cat}</button>`
      ).join('');
    }

    function renderGrid(categoria) {
      grid.innerHTML = '';
      const lista = (categoria === 'Ver todo')
        ? PRODUCTOS_DESTACADOS
        : PRODUCTOS_DESTACADOS.filter(p => p.category === categoria);

      lista.forEach(p => grid.appendChild(buildCard(p)));

      // Si los productos filtrados no llenan el ancho visible, se centran
      // en vez de quedar pegados a la izquierda (si llenan/desbordan el
      // ancho, se queda con scroll normal, igual que "ofertas").
      requestAnimationFrame(() => {
        const cabe = grid.scrollWidth <= grid.clientWidth + 4;
        grid.classList.toggle('is-centered', cabe);
        updateArrows();
      });
    }

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

    if (filtrosEl) {
      filtrosEl.addEventListener('click', e => {
        const btn = e.target.closest('.destacado-filtro');
        if (!btn) return;
        const cat = btn.dataset.cat;
        renderFiltros(cat);
        renderGrid(cat);
      });
    }

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

    // Estado inicial: sin filtro, se ve todo.
    renderFiltros('Ver todo');
    renderGrid('Ver todo');
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
