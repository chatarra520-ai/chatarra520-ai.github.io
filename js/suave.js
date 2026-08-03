/* ============================================================
   CATÁLOGO — COLCHONES SUAVES (suave.html)
   Archivo propio de esta página (no se comparte con firme.js/medio.js).

   ⚠️ ESTE ARCHIVO NO SE EDITA para agregar/quitar/cambiar productos.
   Toda la información de cada colchón (nombre, precio, imagen, tamaños)
   vive directamente en firme.html, como atributos data-* sobre un
   <div class="card" data-product ...></div>. Este script solo LEE esos
   atributos, arma la card visual (mismo estilo que index.html) y la
   conecta con detalle.html y el carrito.

   Para agregar un producto nuevo: copiar un bloque
   <div class="card" data-product ...></div> dentro de
   <div class="fila-productos" id="suaveGrid">...</div> en suave.html
   y llenar sus atributos. Soporta cualquier cantidad (3, 4, 10...).

   Atributos que lee cada <div data-product>:
     data-id      → identificador corto (ej. "ortholife-firm"). Este
                    script le pega automáticamente el prefijo "firme-"
                    para que nunca choque con un id usado en medio.html,
                    suave.html o el carrusel de la página principal,
                    aunque distintas personas llenen cada página sin
                    coordinarse entre sí.
     data-name    → nombre del colchón
     data-tag     → frase corta bajo el nombre
     data-desc    → descripción (se usa en detalle.html)
     data-img     → ruta de la imagen
     data-now     → precio actual "base" (se muestra en la card)
     data-old     → (opcional) precio tachado "base". Si el producto NO
                    tiene oferta, se omite este atributo por completo.
     data-sizes   → (opcional) JSON con los 5 tamaños y su precio propio,
                    para el selector de detalle.html. Formato:
                    '[{"label":"Sencillo","now":573000,"old":1146000},
                      {"label":"Semidoble","now":699000,"old":null}, ...]'
                    Si un tamaño no tiene oferta, su "old" va en null.
                    Si el producto no maneja tamaños, se omite data-sizes.

   Requiere en el ámbito global, cargado ANTES que este archivo:
     - window.products, window.money   → carrusel-ofertas.js / combos.js
     - window.addToCart(id)            → carrito.js
   ============================================================ */
(function () {

  const CATEGORY_PREFIX = 'suave';

  function initSuaveGrid() {
    const grid = document.getElementById('suaveGrid');
    if (!grid) {
      console.warn('[suave] Falta #suaveGrid en el HTML.');
      return;
    }

    const nodes = grid.querySelectorAll('[data-product]');
    const money = window.money || (n => '$' + n);
    const registered = [];

    nodes.forEach(node => {
      const rawId = (node.dataset.id || '').trim();
      if (!rawId) {
        console.warn('[suave] Un producto no tiene data-id, se omite:', node);
        return;
      }

      const id = `${CATEGORY_PREFIX}-${rawId}`;
      const now = Number(node.dataset.now) || 0;
      const old = node.dataset.old ? Number(node.dataset.old) : null;

      let sizes = [];
      if (node.dataset.sizes) {
        try {
          sizes = JSON.parse(node.dataset.sizes);
        } catch (err) {
          console.warn(`[suave] data-sizes inválido en "${rawId}" (revisa que sea JSON válido):`, err);
        }
      }

      const p = {
        id,
        name: node.dataset.name || 'Colchón sin nombre',
        tag: node.dataset.tag || '',
        desc: node.dataset.desc || '',
        img: node.dataset.img || '',
        now,
        old,
        sizes
      };
      registered.push(p);

      const off = p.old ? Math.round((1 - p.now / p.old) * 100) : 0;

      node.className = 'card';
      node.innerHTML = `
        <div class="pcard">
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
            <a class="ver-detalle" href="detalle.html?id=${encodeURIComponent(id)}">Ver especificaciones</a>
            <button class="add-btn" data-id="${id}">Agregar al carrito</button>
          </div>
        </div>`;
    });

    if (registered.length === 0) {
      grid.innerHTML = '<p>No hay colchones suaves cargados todavía.</p>';
      return;
    }

    // Se suman al catálogo global para que detalle.html y el carrito los
    // encuentren por id, igual que hace combos.js con los combos.
    if (Array.isArray(window.products)) {
      window.products = window.products.concat(registered);
    } else {
      window.products = registered.slice();
    }

    grid.addEventListener('click', e => {
      const btn = e.target.closest('.add-btn');
      if (!btn) return;
      if (typeof window.addToCart === 'function') {
        window.addToCart(btn.dataset.id);
      } else {
        console.warn('[suave] window.addToCart no está definido.');
      }
      btn.textContent = 'Agregado ✓';
      btn.classList.add('added');
      setTimeout(() => { btn.textContent = 'Agregar al carrito'; btn.classList.remove('added'); }, 1400);
    });
  }

  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSuaveGrid);
    } else {
      initSuaveGrid();
    }
  } catch (err) {
    console.warn('[suave] No se pudo inicializar:', err);
  }

})();
