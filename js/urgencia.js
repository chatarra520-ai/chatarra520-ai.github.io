/* ============================================================
   URGENCY TICKER — texto deslizante debajo del carrusel de ofertas.
   Requiere en el HTML: <div id="urgencyTrack"></div>
   Autocontenido, no depende de otros scripts.
   ============================================================ */
(function(){

  const urgencyMsgs = [
    'Hasta <em>50% OFF</em> por lanzamiento',
    'Garantía de <em>7 años</em> en línea Paraíso',
    'Envíos a <em>todo el país</em>',
    'Paga fácil y seguro: tarjetas, PSE y contraentrega',
  ];

  function initUrgencyTicker(){
    const track = document.getElementById('urgencyTrack');
    if(!track){
      console.warn('[urgencia] Falta #urgencyTrack en el HTML.');
      return;
    }
    track.innerHTML = urgencyMsgs.concat(urgencyMsgs).map(m => `<span>${m}</span>`).join('');
  }

  try{
    initUrgencyTicker();
  }catch(err){
    console.warn('[urgencia] No se pudo inicializar:', err);
  }

})();
