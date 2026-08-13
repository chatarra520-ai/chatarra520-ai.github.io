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

   ⚠️ Cada producto tiene un array "sizes" (Sencillo, Semidoble, Doble,
   Queen, King) con precio propio por tamaño, usado en detalle.html.
   Los valores de "sizes" son PLACEHOLDER (calculados con un multiplicador
   parejo a partir del precio base) — reemplázalos por los precios reales.
   Cuando un tamaño no tiene oferta, su "old" es null.
   ============================================================ */

window.products = [
  {
    id: 'suave-orion-nube',
    name: 'Colchón Orion Nube',
    tag: 'Doble cara · Multi-medidas  · Firmeza Suave',
    desc: 'Se amoldan al cuerpo. Perfectos para quienes duermen de lado y buscan aliviar la presión en hombros y caderas ',
    old: 3890000, now: 1945000,
    img: 'img/suave/suave-orion-nube.png',
    gallery: ['img/suave/suave-orion-nube.png', 'img/suave/suave-orion-nube-02.png', 'img/m-altura.png', 'img/suave/suave-orion-nube-03.png', 'img/suave/suave-orion-nube-04.png'],


    sizes: [
      { label: "Sencillo", now: 2692000, old: 5390000, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
      { label: "Semidoble", now: 3145000, old: 6290000, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
      { label: "Doble", now: 3645000, old: 7290000, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
      { label: "Queen", now: 4045000, old: 8090000, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
      { label: "King", now: 4845000, old: 9690000, medidas: { ancho: "200 cm", largo: "200 cm", alto: "32 cm" } }]
  },

  {
    id: 'medio-Orion-Venuz',
    name: 'Colchón Orion Venus',
    tag: 'Doble cara · Multi-medidas  · Firmeza Media',
    desc: 'Se adaptan al cuerpo sin perder firmeza, distribuyendo bien el peso en distintas posiciones de descanso una opción versátil',
    old: 2409000, now: 1204500,
    img: 'img/Medio/medio-Orion-Venus.png',
    gallery: ['img/Medio/medio-Orion-Venus.png', 'img/Medio/medio-Orion-Venus-02.png', 'img/m-normal.png'],
    sizes: [
      { label: "Sencillo", now: 1094500, old: 2189000, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
      { label: "Semidoble", now: 1204500, old: 2409000, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
      { label: "Doble", now: 1369500, old: 2739000, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
      { label: "Queen", now: 1567500, old: 3135500, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
      { label: "King", now: 2117500, old: 4235500, medidas: { ancho: "200 cm", largo: "200 cm", alto: "32 cm" } }]
  },
  {
    id: 'medio-orion-galaxi',
    name: 'Colchón Orion Galaxi',
    tag: 'Doble cara · Multi-medidas  · Firmeza Media',
    desc: 'Se adaptan al cuerpo sin perder firmeza, distribuyendo bien el peso en distintas posiciones de descanso una opción versátil', old: 2717000, now: 1358500,
    img: 'img/Medio/Medio-orion-galaxi.png',
    gallery: ['img/Medio/Medio-orion-galaxi.png', 'img/Medio/Medio-orion-galaxi-02.png', 'img/m-normal.png', 'img/Medio/Medio-orion-galaxi-03.png'],
    sizes: [
      { label: "Sencillo", now: 1204500, old: 2409000, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
      { label: "Semidoble", now: 1358500, old: 2717000, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
      { label: "Doble", now: 1479500, old: 2959000, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
      { label: "Queen", now: 1699500, old: 3399000, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
      { label: "King", now: 2359500, old: 4719000, medidas: { ancho: "200 cm", largo: "200 cm", alto: "32 cm" } }]
  },

  {
    id: 'firme-super-flex-foam',
    name: 'Colchón Super FlexFoam',
    tag: 'altura 32 cm · Multi-medidas  · Firmeza Firme',
    desc: 'Mayor soporte y respaldo durante el descanso, Da una superficie más firme que no se hunda bajo el peso del cuerpo',
    old: 2018000, now: 1009000,
    img: 'img/Firme/firme-super-flex-foam.png',
    gallery: ['img/Firme/firme-super-flex-foam.png', 'img/Firme/firme-super-flex-foam-02.png', 'img/m-altura.png', 'img/Firme/firme-super-flex-foam-03.png'],
    sizes: [
      { label: "Sencillo", now: 879000, old: 1758000, medidas: { ancho: "100 cm", largo: "190 cm", alto: "32 cm" } },
      { label: "Semidoble", now: 1009000, old: 2018000, medidas: { ancho: "120 cm", largo: "190 cm", alto: "32 cm" } },
      { label: "Doble", now: 1069000, old: 2138000, medidas: { ancho: "140 cm", largo: "190 cm", alto: "32 cm" } },
      { label: "Queen", now: 1259000, old: 2518000, medidas: { ancho: "160 cm", largo: "190 cm", alto: "32 cm" } },
      { label: "King", now: 1639000, old: 3278000, medidas: { ancho: "200 cm", largo: "200 cm", alto: "32 cm" } }]
  },

  {
    id: 'firme-super-flex-firm',
    name: 'Colchón Super FlexFirm',
    tag: 'altura 32 cm · Multi-medidas  · Firmeza Firme',
    desc: 'Mayor soporte y respaldo durante el descanso, Da una superficie más firme que no se hunda bajo el peso del cuerpo',
    old: 2138000, now: 1069000,
    img: 'img/Firme/firme-superflex-firm.png',
    gallery: ['img/Firme/firme-superflex-firm.png', 'img/Firme/firme-superflex-firm-02.png', 'img/m-altura.png', 'img/Firme/firme-superflex-firm-03.png'],
    sizes: [
      { label: "Sencillo", now: 949000, old: 1898000, medidas: { ancho: "100 cm", largo: "190 cm", alto: "32 cm" } },
      { label: "Semidoble", now: 1069000, old: 2138000, medidas: { ancho: "120 cm", largo: "190 cm", alto: "32 cm" } },
      { label: "Doble", now: 1199000, old: 2398000, medidas: { ancho: "140 cm", largo: "190 cm", alto: "32cm" } },
      { label: "Queen", now: 1399000, old: 2798000, medidas: { ancho: "160 cm", largo: "190 cm", alto: "32cm" } },
      { label: "King", now: 1899000, old: 3798000, medidas: { ancho: "200 cm", largo: "200 cm", alto: "32 cm" } }]
  },

  {
    id: 'firme-sensation-firm',
    name: 'Colchón Sensation Firm',
    tag: 'Una cara · Multi-medidas  · Firmeza Firme',
    desc: 'Mayor soporte y respaldo durante el descanso, Da una superficie más firme que no se hunda bajo el peso del cuerpo',
    old: 1690000, now: 845000,
    img: 'img/Firme/firme-sensacionFirm.png',
    gallery: ['img/Firme/firme-sensacionFirm.png', 'img/Firme/firme-sensacionFirm-02.png', 'img/m-normal.png', 'img/Firme/firme-sensacionFirm-03.png', 'img/Firme/firme-sensacionFirm-04.png'],
    sizes: [
      { label: "Sencillo", now: 745000, old: 1490000, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
      { label: "Semidoble", now: 845000, old: 1690000, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
      { label: "Doble", now: 945000, old: 1890000, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } }]
  },


  {
    id: 'medio-estelar',
    name: 'Colchón Estelar',
    tag: 'Doble cara · Multi-medidas  · Firmeza Media',
    desc: 'Se adaptan al cuerpo sin perder firmeza, distribuyendo bien el peso en distintas posiciones de descanso una opción versátil',
    old: 2490000, now: 1245000,
    img: 'img/Medio/Medio-Stelar.png',
    gallery: ['img/Medio/Medio-Stelar.png', 'img/Medio/Medio-Stelar-02.png', 'img/m-normal.png', 'img/Medio/Medio-Stelar-03.png', 'img/Medio/Medio-Stelar-04.png'],
    sizes: [
      { label: "Sencillo", now: 1095000, old: 2190000, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
      { label: "Semidoble", now: 1245000, old: 2490000, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
      { label: "Doble", now: 1395000, old: 2790000, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } }]
  },

  {
    id: 'medio-orion-cosmo',
    name: 'Colchón Orion Cosmo',
    tag: 'Doble cara · Multi-medidas  · Firmeza Media',
    desc: 'Se adaptan al cuerpo sin perder firmeza, distribuyendo bien el peso en distintas posiciones de descanso una opción versátil',
    old: 1445000, now: 1245000,
    img: 'img/Medio/medio-orion-cosmo.png',
    gallery: ['img/Medio/medio-orion-cosmo.png', 'img/Medio/medio-orion-cosmo-02.png', 'img/m-normal.png', 'img/Medio/medio-orion-cosmo-03.png', 'img/Medio/medio-orion-cosmo-04.png'],
    sizes: [
      { label: "Sencillo", now: 1195000, old: 2390000, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
      { label: "Semidoble", now: 1445000, old: 2490000, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
      { label: "Doble", now: 1845000, old: 3690000, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
      { label: "Queen", now: 1995000, old: 3990000, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
      { label: "King", now: 2445000, old: 4890000, medidas: { ancho: "200 cm", largo: "200 cm", alto: "32 cm" } }]
  },
  {
    id: 'Medio-orion-infinity',
    name: 'Colchón Orion infinity (Comprimido)',
    tag: 'Doble cara · Multi-medidas  · Firmeza Media',
    desc: 'Se adaptan al cuerpo sin perder firmeza, distribuyendo bien el peso en distintas posiciones de descanso una opción versátil',
    old: 899900, now: 1799800,
    img: 'img/Medio/Medio-orion-infinity.png',
    gallery: ['img/02.png', 'img/03.png', 'img/04.png'],
    sizes: [
      { label: "Sencillo", now: 799900, old: 1599800, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
      { label: "Semidoble", now: 899900, old: 1799800, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
      { label: "Doble", now: 999900, old: 1999800, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
      { label: "Queen", now: 1299900, old: 2599800, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
      { label: "King", now: 1899900, old: 3799800, medidas: { ancho: "200 cm", largo: "200 cm", alto: "32 cm" } }]
  },
  {
    id: 'firme-imperium',
    name: 'Colchón Imperium',
    tag: 'Doble cara · Multi-medidas  · Firmeza firme',
    desc: 'Mayor soporte y respaldo durante el descanso, Da una superficie más firme que no se hunda bajo el peso del cuerpo',
    old: 6290000, now: 3145000,
    img: 'img/Firme/firme-orion-imperium.png?',
    gallery: ['img/02.png', 'img/03.png', 'img/04.png'],
    sizes: [
      { label: "Sencillo", now: 5390000, old: 2692000, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
      { label: "Semidoble", now: 3145000, old: 6290000, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
      { label: "Doble", now: 3645000, old: 7290000, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
      { label: "Queen", now: 4045000, old: 8090000, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
      { label: "King", now: 4845000, old: 6990000, medidas: { ancho: "200 cm", largo: "200 cm", alto: "32 cm" } }]
  },
];

window.money = function (n) { return '$' + n.toLocaleString('es-CO'); };

// Copia propia e inmutable del catálogo de OFERTAS, tomada en el momento en
// que este script se ejecuta (antes de que combos.js u otro script le pegue
// más productos a window.products). El carrusel de ofertas siempre pinta
// esta copia, nunca window.products directamente — así nunca le aparecen
// combos ni ningún otro producto agregado después, sin importar el orden
// o el timing de carga de los demás scripts.
const ofertasCatalog = window.products.slice();

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

    // ---- pintar tarjetas del catálogo (solo ofertas, nunca combos) ----
    ofertasCatalog.forEach(p => {
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
