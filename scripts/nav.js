(function () {
  function init() {
    var burger = document.querySelector('.nav-burger');
    var menu = document.querySelector('.nav-menu');
    if (!burger || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    burger.addEventListener('click', function () {
      setOpen(!menu.classList.contains('is-open'));
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
