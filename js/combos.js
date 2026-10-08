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
      name: 'Combo Colchón Orion Nube + base cama',
      tag: 'Colchón Orion Nube, multimedidas, firmeza suabe + base cama',
      desc: 'Colchón Orion Nube, multimedidas, firmeza suabe + base cama',
      old: 2409995, now: 1982990,
      img: 'img/combos/BaseColchon-Nube.png',
      gallery: ['img/combos/BaseColchon-Nube.png', 'img/combos/BaseColchon-Nube-02.png', 'img/m-normal.png', 'img/combos/BC01.png', 'img/combos/BC02.png'],
      sizes: [
        { label: "Sencillo", now: 1916990, old: 2317995, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1982990, old: 2409995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 2257990, old: 2719995, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 2990990, old: 3175995, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 4120995, old: 3750990, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonNube+RopaCama',
      name: 'Combo Colchón Orion Nube + ropa de cama',
      tag: 'Colchón Orion Nube, multimedidas, firmeza suave + almohada siliconada y protector siliconado',
      desc: 'Colchón Orion Nube, multimedidas, firmeza suave + almohada siliconada y protector siliconado',
      old: 2043770, now: 1809990,
      img: 'img/combos/RopaColchon-Nube.png',
      gallery: ['img/combos/RopaColchon-Nube.png', 'img/combos/RopaColchon-Nube-02.png', 'img/m-normal.png', 'img/combos/RopaColchon-Nube-03.png', 'img/combos/RopaColchon-Nube-04.png'],
      sizes: [
        { label: "Sencillo", now: 1764990, old: 1993770, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1809990, old: 2043770, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 2097990, old: null, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 2643990, old: 2983040, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 3414990, old: null, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonVenus+BaseCama',
      name: 'Combo Colchón Orion Venus + base cama',
      tag: 'Colchón Orion Venus,  multimedidas, firmeza suabe + base cama',
      desc: 'Colchón Orion Venus,  multimedidas, firmeza suabe + base cama',
      old: 1559995, now: 1316990,
      img: 'img/combos/BaseColchon-Venus.png',
      gallery: ['img/combos/BaseColchon-Venus.png', 'img/combos/BaseColchon-Venus-02.png', 'img/m-normal.png', 'img/combos/BaseColchon-Venus-05.png', 'img/combos/BC01.png', 'img/combos/BC02.png'],
      sizes: [
        { label: "Sencillo", now: 1196990, old: 1417995, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1316990, old: 1559995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1469990, old: 1719995, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1741990, old: 1755995, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 2331990, old: 2350995, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonVenus+RopaCama',
      name: 'Combo Colchón Orion Venus + ropa de cama',
      tag: 'Colchón Orion Venus, multimedidas, firmeza media + almohada siliconada y protector siliconado',
      desc: 'Colchón Orion Venus, multimedidas, firmeza media + almohada siliconada y protector siliconado',
      old: 1193770, now: 1143900,
      img: 'img/combos/RopaCama-Venus.png',
      gallery: ['img/combos/RopaCama-Venus.png', 'img/combos/BaseColchon-Venus-02.png', 'img/m-normal.png', 'img/combos/RopaCama-Venus-03.png', 'img/combos/RopaCama-Venus-04.png'],
      sizes: [
        { label: "Sencillo", now: 1044990, old: 1093770, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1143990, old: 1193770, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1309990, old: 1373520, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1493990, old: 1563040, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 1994990, old: 2072560, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonGalaxy+BaseCama',
      name: 'Combo Colchón Orion Galaxy + base cama',
      tag: 'Colchón Orion Galaxy,  multimedidas, firmeza suabe + base cama',
      desc: 'Colchón Orion Galaxy,  multimedidas, firmeza suabe + base cama',
      old: 1669995, now: 1455990,
      img: 'img/combos/galaxiBc01.png',
      gallery: ['img/combos/galaxiBc05.png', 'img/combos/galaxiBc02.png', 'img/m-normal.png', 'img/combos/galaxiBc03.png', 'img/combos/BC01.png', 'img/combos/BC02.png'],
      sizes: [
        { label: "Sencillo", now: 1295990, old: 1517995, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1455990, old: 1669995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1567990, old: 1919995, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1859990, old: 1875990, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 2548990, old: 2570995, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    {
      id: 'ColchonGalaxy+RopaCama',
      name: 'Combo Colchón Orion Galaxy + ropa de cama',
      tag: 'Colchón Orion Galaxy,  multimedidas, firmeza suabe +  + almohada siliconada y protector siliconado',
      desc: 'Colchón Orion Galaxy,  multimedidas, firmeza suabe +  + almohada siliconada y protector siliconado',
      old: 1669995, now: 1455990,
      img: 'img/combos/galaxiRp01.png',
      gallery: ['img/combos/galaxiRp01.png', 'img/combos/galaxiRp02.png', 'img/m-normal.png', 'img/combos/galaxiRp03.png', 'img/combos/galaxiRp04.png', 'img/combos/galaxiRp05.png',],
      sizes: [
        { label: "Sencillo", now: 1295990, old: 1517995, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1455990, old: 1669995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1567990, old: 1919995, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1859990, old: 1875990, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 2548990, old: 2570995, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },
    // SuperFlexFoam
    {
      id: 'ColchonSuperFlexFoam+BaseCama',
      name: 'Combo Colchón Super Flex Foam + base cama',
      tag: 'Colchón Colchón Super Flex Foam,  multimedidas, firmeza suabe + base cama',
      desc: 'Colchón Colchón Super Flex Foam,  multimedidas, firmeza suabe + base cama',
      old: 1259995, now: 1019990,
      img: 'img/combos/flexfoamBC01.png',
      gallery: ['img/combos/flexfoamBC02.png', 'img/combos/flexfoamBC01.png', 'img/combos/flexfoamBC03.png', 'img/combos/flexfoamBC04.png', 'img/m-normal.png', 'img/combos/BC01.png', 'img/combos/BC02.png',],
      sizes: [
        { label: "Sencillo", now: 899990, old: 1117995, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 1019990, old: 1259995, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 1077990, old: 1319995, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1463990, old: null, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 1707990, old: 1720995, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },

    {
      id: 'ColchonSuperFlexFoam+ropadecama',
      name: 'Combo Colchón Super Flex Foam + ropa de cama',
      tag: 'Colchón Colchón Super Flex Foam,  multimedidas, firmeza suabe +  + almohada siliconada y protector siliconado',
      desc: 'Colchón Colchón Super Flex Foam,  multimedidas, firmeza suabe +  + almohada siliconada y protector siliconado',
      old: 893770, now: 846990,
      img: 'img/combos/flexfoamRC01.png',
      gallery: ['img/combos/flexfoamRC02.png', 'img/combos/flexfoamRC01.png', 'img/combos/flexfoamBC04.png', 'img/combos/flexfoamBC03.png', 'img/combos/flexfoamRC03.png', 'img/m-normal.png',],
      sizes: [
        { label: "Sencillo", now: 747990, old: 793770, medidas: { ancho: "100 cm", largo: "190 cm", alto: null } },
        { label: "Semidoble", now: 846990, old: 893770, medidas: { ancho: "120 cm", largo: "190 cm", alto: null } },
        { label: "Doble", now: 913990, old: 973520, medidas: { ancho: "140 cm", largo: "190 cm", alto: null } },
        { label: "Queen", now: 1067990, old: 1133040, medidas: { ancho: "160 cm", largo: "190 cm", alto: null } },
        { label: "King", now: 1370990, old: 1442560, medidas: { ancho: "200 cm", largo: "200 cm", alto: null } }]
    },

    // SuperFlexFoam
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
