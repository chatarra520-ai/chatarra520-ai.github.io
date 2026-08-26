/* ============================================================
   CARRUSEL SUPERIOR (header) — abre y cierra, autocontenido
   Requiere en el HTML:
     <div class="header-carousel" id="headerCarousel">
       <button class="hc-arrow prev" onclick="hcMove(-1)">...</button>
       <button class="hc-arrow next" onclick="hcMove(1)">...</button>
       <div class="hc-dots" id="hcDots"></div>
     </div>
   Requiere en el ámbito global (cargar ANTES): window.addToCart(id),
   window.openCart() → carrito.js (solo si usas botones tipo "carrito").
   Expone globalmente: window.hcMove(dir)

   ⚠️ CADA SLIDE tiene "ctas": una lista de 1 o 2 botones (no un botón
   fijo). Cada botón es uno de estos 3 tipos:

   - type: 'firmeza'  → botón normal, "target" es un ancla de la misma
     página (ej. '#firmeza', '#ofertas').
   - type: 'detalle'  → lleva al detalle de un producto, "target" es el
     id real de ese producto (el mismo que usas en detalle.html?id=...).
   - type: 'carrito'  → agrega ESE producto al carrito y abre el cajón,
     "target" también es el id real del producto.

   Ejemplo con 1 botón (como el que ya tenías, va a una sección):
     ctas: [{ type: 'firmeza', label: 'Hacer el test', target: '#firmeza' }]

   Ejemplo con 2 botones (un producto específico destacado):
     ctas: [
       { type: 'detalle', label: 'Ver especificaciones', target: 'firme-ortholife-firm' },
       { type: 'carrito', label: 'Agregar al carrito', target: 'firme-ortholife-firm' }
     ]
   ============================================================ */
(function () {

  window.hcMove = function () { };

  const hcSlidesData = [
    {
      img: 'img/carrusel/07.png?v=1772594318&width=1400',
      imgMobile: 'img/carrusel/07-movil.png?v=1772594318&width=900',
      title: 'El descanso que se siente desde la primera noche.',
      ctas: [
        { type: 'detalle', label: 'Ver especificaciones', target: 'medio-orion-galaxi' },
        { type: 'carrito', label: 'Agregar al carrito', target: 'suave-orion-nube' }
      ],
      txt: 'Diseñado para disfrutar un descanso confortable y reparador.',
    },
    {
      img: 'img/carrusel/08.png?v=1767815535&width=1400',
      imgMobile: 'img/carrusel/08-movil.png?v=1767815535&width=900',
      title: ' ¿Qué firmeza necesitas? Descubre cuál se adapta mejor a tu forma de descansar. ',
      txt: '',
      ctas: [
        { type: 'firmeza', label: 'Hacer el test', target: '#firmeza' }
      ]
    },
    {
      img: 'img/carrusel/09.png?v=1766436427&width=1400',
      imgMobile: 'img/carrusel/09-movil.png?v=1766436427&width=900',
      title: 'Fabricamos colchones para tu descanso, con el confort y la calidad que mereces.',
      txt: '',
      ctas: [
        { type: 'firmeza', label: 'Conoce Orión', target: '#ofertas' }
      ]
    }
  ];

  // Arma el HTML de un botón según su "type". "detalle" y "carrito"
  // necesitan el id real de un producto en "target"; "firmeza" usa un
  // ancla tal cual.
  function buildCtaHtml(cta, i) {
    if (!cta || !cta.type) return '';

    if (cta.type === 'detalle') {
      return `<a href="detalle.html?id=${encodeURIComponent(cta.target)}" class="btn-ghost hc-cta-btn">${cta.label}</a>`;
    }

    if (cta.type === 'carrito') {
      return `<button type="button" class="btn-primary hc-cta-btn" data-hc-add-cart="${cta.target}">${cta.label}</button>`;
    }

    // 'firmeza' (o cualquier otro): ancla/link normal dentro del mismo sitio.
    return `<a href="${cta.target}" class="btn-primary hc-cta-btn">${cta.label}</a>`;
  }

  function initHeaderCarousel() {
    const hcEl = document.getElementById('headerCarousel');
    const hcDotsEl = document.getElementById('hcDots');

    if (!hcEl || !hcDotsEl) {
      console.warn('[carrusel-header] Faltan #headerCarousel o #hcDots en el HTML. Se omite su inicialización.');
      return;
    }

    let hcIndex = 0;
    let hcTimer = null;

    hcSlidesData.forEach((s, i) => {
      const slide = document.createElement('div');
      slide.className = 'hc-slide' + (i === 0 ? ' active' : '');
      slide.dataset.i = i;
      const ctasHtml = (s.ctas || []).map(buildCtaHtml).join('');
      slide.innerHTML = `
        <picture>
          <source media="(max-width: 700px)" srcset="${s.imgMobile}">
          <img src="${s.img}" alt="${s.title}">
        </picture>
        <div class="hc-text">
          <div class="hc-text-box">
            <h2>${s.title}</h2>
            ${s.txt ? `<p class="hc-txt">${s.txt}</p>` : ''}
            <div class="hc-ctas">${ctasHtml}</div>
          </div>
        </div>`;
      hcEl.insertBefore(slide, hcEl.firstChild);
    });

    // Un solo listener para todos los botones "Agregar al carrito" de
    // cualquier slide (delegación de eventos, funciona con slides que
    // se agregan dinámicamente).
    hcEl.addEventListener('click', e => {
      const btn = e.target.closest('[data-hc-add-cart]');
      if (!btn) return;
      const id = btn.dataset.hcAddCart;
      if (typeof window.addToCart === 'function') {
        window.addToCart(id);
      } else {
        console.warn('[carrusel-header] window.addToCart no está definido.');
      }
      if (typeof window.openCart === 'function') {
        window.openCart();
      }
    });

    hcSlidesData.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'hc-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Ir al slide ' + (i + 1));
      dot.onclick = () => hcGoTo(i);
      hcDotsEl.appendChild(dot);
    });

    function hcGoTo(i) {
      hcIndex = (i + hcSlidesData.length) % hcSlidesData.length;
      hcEl.querySelectorAll('.hc-slide').forEach(s => s.classList.toggle('active', +s.dataset.i === hcIndex));
      hcDotsEl.querySelectorAll('.hc-dot').forEach((d, di) => d.classList.toggle('active', di === hcIndex));
    }

    function resetHcTimer() {
      clearInterval(hcTimer);
      hcTimer = setInterval(() => hcMoveInternal(1), 5500);
    }

    function hcMoveInternal(dir) {
      hcGoTo(hcIndex + dir);
      resetHcTimer();
    }

    window.hcMove = hcMoveInternal;

    resetHcTimer();
  }

  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initHeaderCarousel);
    } else {
      initHeaderCarousel();
    }
  } catch (err) {
    console.warn('[carrusel-header] No se pudo inicializar:', err);
  }

})();

