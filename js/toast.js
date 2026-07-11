/* ============================================================
   TOAST — notificación flotante reutilizable.
   Requiere en el HTML: <div class="toast" id="toast"></div>
   Expone globalmente: window.showToast(msg)
   Debe cargarse ANTES que carrito.js y newsletter.js, que lo usan.
   ============================================================ */
(function(){
  let toastTimer;
  window.showToast = function(msg){
    const t = document.getElementById('toast');
    if(!t){
      console.warn('[toast] Falta #toast en el HTML.');
      return;
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  };
})();
