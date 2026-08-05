/* ============================================================
   FIRMEZA FINDER — elemento interactivo de firmeza (Blando/Medio/Firme).
   Requiere en el HTML:
     <div id="firmOptions"></div>
     <div id="layersHolder"></div>
     <p id="crossCaption"></p>
   Autocontenido, no depende de otros scripts.
   ============================================================ */
(function () {

  const firmness = {
    suave: {
      label: 'Suave', desc: 'Se amoldan al cuerpo. Perfectos para quienes duermen de lado y buscan aliviar la presión en hombros y caderas',
      layers: [
        { h: 70, c: '#D9C79A' }, { h: 34, c: '#C9A967' }, { h: 18, c: '#8F672A' }
      ],
      caption: 'Se amoldan al cuerpo. Perfectos para quienes duermen de lado y buscan aliviar la presión en hombros y caderas'
    },
    medio: {
      label: 'Medio', desc: 'Se adaptan al cuerpo sin perder firmeza, distribuyendo bien el peso en distintas posiciones de descanso una opción versátil',
      layers: [
        { h: 44, c: '#D9C79A' }, { h: 40, c: '#C9A967' }, { h: 34, c: '#8F672A' }
      ],
      caption: 'Se adaptan al cuerpo sin perder firmeza, distribuyendo bien el peso en distintas posiciones de descanso una opción versátil'
    },
    firme: {
      label: 'Firme', desc: 'Mayor soporte y respaldo durante el descanso, Da una superficie más firme que no se hunda bajo el peso del cuerpo',
      layers: [
        { h: 22, c: '#D9C79A' }, { h: 30, c: '#C9A967' }, { h: 56, c: '#8F672A' }
      ],
      caption: 'Mayor soporte y respaldo durante el descanso, Da una superficie más firme que no se hunda bajo el peso del cuerpo'
    }
  };

  function initFirmeza() {
    const firmOptionsEl = document.getElementById('firmOptions');
    const layersHolder = document.getElementById('layersHolder');
    const crossCaption = document.getElementById('crossCaption');

    if (!firmOptionsEl || !layersHolder || !crossCaption) {
      console.warn('[firmeza] Faltan elementos del buscador de firmeza en el HTML.');
      return;
    }

    let currentFirm = 'medio';

    function renderFirmOptions() {
      firmOptionsEl.innerHTML = Object.entries(firmness).map(([key, f]) => `
        <button class="firm-opt ${key === currentFirm ? 'active' : ''}" data-key="${key}">
          <div class="name">${f.label}</div>
          <div class="desc">${f.desc}</div>
        </button>
      `).join('');
    }

    function renderLayers() {
      const f = firmness[currentFirm];
      layersHolder.innerHTML = f.layers.map(l => `<div class="layer" style="height:${l.h}px;background:${l.c};"></div>`).join('<div style="height:4px;"></div>');
      crossCaption.textContent = f.caption;
    }

    firmOptionsEl.addEventListener('click', e => {
      const btn = e.target.closest('.firm-opt');
      if (!btn) return;
      currentFirm = btn.dataset.key;
      renderFirmOptions();
      renderLayers();
    });

    renderFirmOptions();
    renderLayers();
  }

  try {
    initFirmeza();
  } catch (err) {
    console.warn('[firmeza] No se pudo inicializar:', err);
  }

})();
