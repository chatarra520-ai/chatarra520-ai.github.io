document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('hamburgerBtn');
  var links = document.getElementById('navLinks');
  if (!btn || !links) return;

  function closeMenu() {
    links.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', function () {
    var isOpen = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // cerrar al elegir un link
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // cerrar si la pantalla vuelve a tamaño de escritorio
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeMenu();
  });
});
