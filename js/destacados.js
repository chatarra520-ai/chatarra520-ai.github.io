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
    id: 'almohada-01', name: 'Viscoelástica · Soporte cuello', tag: 'Viscoelástica · Soporte cuello', desc: 'Almohada viscoelástica con soporte especial para la zona cervical.', old: 189000, now: 94500, img: 'img/almohadas/almohada-01.png', category: 'Almohadas',
    gallery: ['img/almohadas/almohada-01.png', 'img/almohadas/almohada-02.png'],
    sizes: [
      { label: "Estándar", now: 94500, old: 189000, medidas: { ancho: "55 cm", largo: "35 cm", alto: null } }
    ]
  },

  {
    id: 'basecamaSencilla', name: 'Base cama Sencilla', tag: 'Madera · Multi-medidas', desc: 'En madera de pino nueva,  textura agradable y fácil limpieza, patas metálicas de 10 cm', old: 590000, now: 349000, img: 'img/basecama/basecama-sencilla-02.png', category: 'Bases cama',
    gallery: ['img/basecama/basecama-sencilla-02.png', 'img/basecama/basecama-sencilla.png', 'img/basecama/detalle.png', 'img/m-altura.png'],
    sizes: [
      { label: "Estándar", now: 94500, old: 189000, medidas: { ancho: "100 cm", largo: "190 cm", alto: "32 cm" } }
    ]
  },

  {
    id: 'basecama-tapizada', name: 'Base cama Semidoble', tag: 'Tapizada · Antideslizante', desc: 'En madera de pino nueva,  textura agradable y fácil limpieza, patas metálicas de 10 cm', old: 790000, now: 495000, img: 'img/basecama/basecama-semidoble-02.png', category: 'Bases cama',
    gallery: ['img/basecama/basecama-semidoble-02.png', 'img/basecama/basecama-semidoble.png', 'img/basecama/detalle.png', 'img/m-altura.png'],
    sizes: [
      { label: "Estándar", now: 94500, old: 189000, medidas: { ancho: "120 cm", largo: "190 cm", alto: "32 cm" } }
    ]
  },

  {
    id: 'basecama-dividida', name: 'Base cama Doble dividida', tag: 'Dividida · Multi-medidas', desc: 'En madera de pino nueva,  textura agradable y fácil limpieza, patas metálicas de 10 cm', old: null, now: 420000, img: 'img/basecama/basecama-doble-02.png', category: 'Bases cama',
    gallery: ['img/basecama/basecama-doble-02.png', 'img/basecama/basecama-doble.png', 'img/basecama/detalle.png', 'img/m-altura.png'],
    sizes: [
      { label: "Estándar", now: 94500, old: 189000, medidas: { ancho: "140 cm", largo: "190 cm", alto: "32 cm" } }
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
