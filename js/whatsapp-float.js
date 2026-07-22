/* ============================================================
   BOTÓN FLOTANTE DE WHATSAPP — autocontenido.
   No requiere nada en el HTML: se inyecta solo al final del <body>.
   Así se agrega en cualquier página del sitio con un solo
   <script src="js/whatsapp-float.js"></script>, sin duplicar el
   marcado en cada archivo .html.

   Para cambiar el número o el mensaje, editar las constantes de abajo.
   ============================================================ */
(function () {
  const PHONE = '573115330695'; // +57 311 5330695, formato internacional sin '+' ni espacios
  const MESSAGE = 'Hola, quiero más información sobre los colchones Orión';

  function buildHref() {
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;
  }

  function injectButton() {
    if (document.getElementById('waFloat')) return; // evita duplicados

    const a = document.createElement('a');
    a.id = 'waFloat';
    a.className = 'wa-float';
    a.href = buildHref();
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'Escribir por WhatsApp');
    a.innerHTML = `
      <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
        <path d="M16.02 3C9.4 3 4 8.37 4 14.98c0 2.2.6 4.27 1.64 6.06L4 29l8.2-2.15a12.9 12.9 0 0 0 3.82.58h.01c6.61 0 12-5.37 12-11.98C28.03 8.37 22.64 3 16.02 3zm7.1 17.06c-.3.85-1.72 1.63-2.38 1.72-.6.09-1.37.13-2.2-.14-.51-.16-1.16-.38-2-.75-3.52-1.52-5.82-5.07-6-5.31-.18-.24-1.44-1.91-1.44-3.65 0-1.73.9-2.58 1.23-2.94.32-.35.7-.44.93-.44.24 0 .47.01.68.01.22 0 .51-.08.8.62.3.7 1 2.44 1.09 2.61.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.37.37-.16.72.21.36.93 1.53 2 2.48 1.37 1.22 2.53 1.6 2.89 1.78.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.33.12 2.06.97 2.41 1.15.36.18.6.27.68.42.09.15.09.85-.21 1.7z"/>
      </svg>`;
    document.body.appendChild(a);
  }

  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectButton);
    } else {
      injectButton();
    }
  } catch (err) {
    console.warn('[whatsapp-float] No se pudo inicializar:', err);
  }
})();
