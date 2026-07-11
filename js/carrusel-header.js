/* ============================================================
   CARRUSEL SUPERIOR (header) — abre y cierra, autocontenido
   Requiere en el HTML:
     <div class="header-carousel" id="headerCarousel">
       <button class="hc-arrow prev" onclick="hcMove(-1)">...</button>
       <button class="hc-arrow next" onclick="hcMove(1)">...</button>
       <div class="hc-dots" id="hcDots"></div>
     </div>
   Expone globalmente: window.hcMove(dir)
   ============================================================ */
(function () {

  // no-op por defecto: si el HTML no existe, los onclick="hcMove(...)"
  // del markup no truenan aunque este carrusel no se haya montado.
  window.hcMove = function () { };

  const hcSlidesData = [
    {
      img: 'img/carrusel/07.png?v=1772594318&width=1400',
      eyebrow: 'Línea Paraíso Gold',
      title: 'El descanso que tu espalda pide hace meses',
      text: 'Maxi top, garantía de 7 años y hasta 50% de descuento por lanzamiento de temporada.',
      cta: 'Ver oferta', target: '#ofertas'
    },
    {
      img: 'img/carrusel/08.png?v=1767815535&width=1400',
      eyebrow: 'Resortado Futura',
      title: 'Firmeza media para parejas que duermen distinto',
      text: 'Resortes Bonnell independientes y doble cara antiácaros, desde $695.000.',
      cta: 'Comprar ahora', target: '#ofertas'
    },
    {
      img: 'img/carrusel/09.png?v=1766436427&width=1400',
      eyebrow: 'Encuentra tu firmeza',
      title: 'No adivines: hazte el test de firmeza ideal',
      text: 'Blando, medio o firme — te mostramos por qué funciona antes de comprar.',
      cta: 'Hacer el test', target: '#firmeza'
    }
  ];

  function initHeaderCarousel() {
    const hcEl = document.getElementById('headerCarousel');
    const hcDotsEl = document.getElementById('hcDots');

    if (!hcEl || !hcDotsEl) {
      console.warn('[carrusel-header] Faltan #headerCarousel o #hcDots en el HTML. Se omite su inicialización.');
      return;
    }

    let hcIndex = 0;
    let hcTimer = null;

    // slides
    hcSlidesData.forEach((s, i) => {
      const slide = document.createElement('div');
      slide.className = 'hc-slide' + (i === 0 ? ' active' : '');
      slide.dataset.i = i;
      slide.innerHTML = `
        <img src="${s.img}" alt="${s.title}">
        <div class="hc-text">
          <div class="hc-text-box">
            <p class="eyebrow">${s.eyebrow}</p>
            <h2>${s.title}</h2>
            <p>${s.text}</p>
            <a href="${s.target}" class="btn-primary" style="width:fit-content;">${s.cta}</a>
          </div>
        </div>`;
      hcEl.insertBefore(slide, hcEl.firstChild);
    });

    // dots
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

    // expone la función real hacia afuera (reemplaza el no-op)
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
