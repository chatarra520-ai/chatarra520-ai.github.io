/* ============================================================
   NEWSLETTER — manejo del formulario de suscripción.
   Requiere en el HTML: <form onsubmit="return subscribe(event)">...</form>
   Requiere en el ámbito global (cargar ANTES que este archivo):
     - window.showToast(msg)  → toast.js
   Expone globalmente: window.subscribe(e)
   ============================================================ */
(function(){

  window.subscribe = function(e){
    e.preventDefault();
    if(window.showToast){
      window.showToast('¡Listo! Te avisaremos de nuestras próximas ofertas.');
    }
    e.target.reset();
    return false;
  };

})();
