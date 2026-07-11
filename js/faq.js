/* ============================================================
   FAQ — acordeón de preguntas frecuentes.
   Requiere en el HTML: <div id="faqList"></div>
   Autocontenido, no depende de otros scripts.
   ============================================================ */
(function(){

  const faqs = [
    {q:'¿Cuánto tarda el envío?', a:'Depende de tu ciudad: entre 2 y 7 días hábiles según cobertura. Recibes número de guía para seguimiento apenas sale de fábrica.'},
    {q:'¿Qué pasa si la firmeza no es la que esperaba?', a:'Tienes 30 días para iniciar un proceso de cambio por inconformidad, siempre que el colchón conserve su empaque y condiciones originales.'},
    {q:'¿Qué cubre la garantía de 7 años?', a:'Cubre defectos de fabricación como hundimientos irregulares o fallas en los soportes. No cubre mal uso o desgaste normal.'},
    {q:'¿Qué medios de pago aceptan?', a:'Tarjetas de crédito y débito, PSE, y contraentrega en las ciudades habilitadas, con opción a cuotas según tu banco.'},
  ];

  function initFaq(){
    const faqList = document.getElementById('faqList');
    if(!faqList){
      console.warn('[faq] Falta #faqList en el HTML.');
      return;
    }

    faqList.innerHTML = faqs.map((f,i) => `
      <div class="faq-item" data-i="${i}">
        <div class="faq-q">${f.q}<span class="plus">+</span></div>
        <div class="faq-a">${f.a}</div>
      </div>
    `).join('');

    faqList.addEventListener('click', e => {
      const item = e.target.closest('.faq-item');
      if(!item) return;
      item.classList.toggle('open');
    });
  }

  try{
    initFaq();
  }catch(err){
    console.warn('[faq] No se pudo inicializar:', err);
  }

})();
