/* ============================================================
   HERO — card destacada de la portada (index.html), autocontenida.
   Archivo propio, aparte de detalle.js (esta sección solo existe en
   index.html, no tiene nada que ver con la página de detalle).

   Requiere en el HTML:
     <div class="badge-off" id="heroBadge" style="display:none;"></div>
     <div class="mattress-card" data-hero-product="ID-DEL-PRODUCTO">
       <img id="heroImg" alt="">
       <p class="cap" id="heroCap"></p>
       <div class="price-tag-hero" id="heroPrices"></div>
       <a class="ver-detalle" id="heroDetalleLink">Ver especificaciones</a>
       <button class="add-btn" id="heroAddBtn">Agregar al carrito</button>
     </div>

   Requiere en el ámbito global, cargado ANTES que este archivo:
     - window.products, window.money   → carrusel-ofertas.js / combos.js
       (y categoria-catalogo.js si el producto destacado fuera de
       firme/medio/suave)
     - window.addToCart(id)            → carrito.js

   ⚠️ Para cambiar el producto destacado del hero: edita SOLO el
   atributo "data-hero-product" en index.html, con el id real del
   producto (el mismo que usas en detalle.html?id=...). NO se toca
   este archivo para eso.

   Nombre, imagen, precio, % de descuento y el link de detalle se
   calculan siempre a partir del catálogo real — igual que en el
   carrusel de ofertas — así nunca quedan desincronizados si el precio
   real cambia. Si el producto no tiene oferta (sin "old"), el precio
   tachado y el badge de "-X% hoy" se omiten solos, no se fuerza nada.
   ============================================================ */
(function () {

  function initHero() {
    const card = document.querySelector('.mattress-card[data-hero-product]');
    if (!card) return;

    const id = card.dataset.heroProduct;
    const products = window.products || [];
    const money = window.money || (n => '$' + n);
    const p = products.find(pp => pp.id === id);

    if (!p) {
      console.warn(`[hero] No se encontró el producto "${id}" en el catálogo. Revisa el data-hero-product en index.html.`);
      return;
    }

    const img = document.getElementById('heroImg');
    const cap = document.getElementById('heroCap');
    const pricesEl = document.getElementById('heroPrices');
    const badge = document.getElementById('heroBadge');
    const link = document.getElementById('heroDetalleLink');
    const addBtn = document.getElementById('heroAddBtn');

    if (img) { img.src = p.img; img.alt = p.name; }
    if (cap) cap.textContent = p.tag || p.name;
    if (link) link.href = `detalle.html?id=${encodeURIComponent(p.id)}`;

    const off = p.old ? Math.round((1 - p.now / p.old) * 100) : 0;

    if (pricesEl) {
      pricesEl.innerHTML = p.old
        ? `<span class="old">${money(p.old)}</span><span class="now">${money(p.now)}</span>`
        : `<span class="now">${money(p.now)}</span>`;
    }

    if (badge) {
      if (p.old) {
        badge.textContent = `-${off}% hoy`;
        badge.style.display = '';
      } else {
        badge.style.display = 'none';
      }
    }

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        if (typeof window.addToCart === 'function') {
          window.addToCart(p.id);
        } else {
          console.warn('[hero] window.addToCart no está definido.');
        }
        addBtn.textContent = 'Agregado ✓';
        addBtn.classList.add('added');
        setTimeout(() => { addBtn.textContent = 'Agregar al carrito'; addBtn.classList.remove('added'); }, 1400);
      });
    }
  }

  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initHero);
    } else {
      initHero();
    }
  } catch (err) {
    console.warn('[hero] No se pudo inicializar:', err);
  }

})();
