/* ============================================================
   CATÁLOGO DE CATEGORÍAS — puente entre firme.html/medio.html/suave.html
   y el resto del sitio (detalle.html, carrito).

   Los productos de cada categoría viven SOLO en su propio HTML (como
   atributos data-* — ver comentario en firme.js/medio.js/suave.js).
   Esto es un problema para detalle.html: si alguien entra a
   detalle.html?id=firme-xxx sin haber visitado antes firme.html, el
   producto no existe todavía en window.products.

   Este archivo resuelve eso: usa fetch() para leer el HTML real de
   firme.html, medio.html y suave.html (tal cual está en ese momento,
   sin copias ni duplicados guardados en ningún .js), extrae sus
   data-product y los agrega a window.products con el mismo prefijo
   que usan firme.js/medio.js/suave.js (firme-, medio-, suave-).

   Incluir este script en: index.html, firme.html, medio.html,
   suave.html y detalle.html (después de carrusel-ofertas.js/combos.js,
   antes de carrito.js) para que el carrito muestre bien un producto de
   categoría sin importar en qué página esté el usuario.

   Expone: window.categoriaCatalogoReady → Promise que resuelve cuando
   ya se agregaron estos productos a window.products. detalle.js espera
   esta promesa antes de buscar el producto por id; carrito.js vuelve a
   pintar el carrito cuando resuelve, por si ya había items de categoría
   guardados en el carrito antes de que esto terminara de cargar.
   ============================================================ */
(function () {

  const CATEGORIES = [
    { file: 'firme.html', gridId: 'firmeGrid', prefix: 'firme' },
    { file: 'medio.html', gridId: 'medioGrid', prefix: 'medio' },
    { file: 'suave.html', gridId: 'suaveGrid', prefix: 'suave' }
  ];

  function parseCategory(html, gridId, prefix) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const grid = doc.getElementById(gridId);
    if (!grid) return [];

    const nodes = grid.querySelectorAll('[data-product]');
    const list = [];

    nodes.forEach(node => {
      const rawId = (node.dataset.id || '').trim();
      if (!rawId) return;

      const now = Number(node.dataset.now) || 0;
      const old = node.dataset.old ? Number(node.dataset.old) : null;

      let sizes = [];
      if (node.dataset.sizes) {
        try { sizes = JSON.parse(node.dataset.sizes); }
        catch (err) { console.warn(`[categoria-catalogo] data-sizes inválido en "${rawId}" (${prefix}):`, err); }
      }

      let gallery = [];
      if (node.dataset.gallery) {
        try { gallery = JSON.parse(node.dataset.gallery); }
        catch (err) { console.warn(`[categoria-catalogo] data-gallery inválido en "${rawId}" (${prefix}):`, err); }
      }

      list.push({
        id: `${prefix}-${rawId}`,
        name: node.dataset.name || 'Colchón sin nombre',
        tag: node.dataset.tag || '',
        desc: node.dataset.desc || '',
        img: node.dataset.img || '',
        now,
        old,
        sizes,
        gallery
      });
    });

    return list;
  }

  window.categoriaCatalogoReady = Promise.all(
    CATEGORIES.map(cat =>
      fetch(cat.file)
        .then(res => res.text())
        .then(html => parseCategory(html, cat.gridId, cat.prefix))
        .catch(err => {
          console.warn(`[categoria-catalogo] No se pudo cargar ${cat.file}:`, err);
          return [];
        })
    )
  ).then(results => {
    const all = results.flat();
    if (Array.isArray(window.products)) {
      window.products = window.products.concat(all);
    } else {
      window.products = all.slice();
    }
    return all;
  });

})();
