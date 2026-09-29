(function () {
  var STORAGE_KEY = 'site-lang';
  var DEFAULT_LANG = 'fr';
  var SUPPORTED = ['fr', 'en', 'es'];

  function getLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function applyTranslations(lang) {
    var dict = window.I18N_DICT || {};

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var entry = dict[key];
      if (entry && entry[lang] != null) {
        el.textContent = entry[lang];
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      var entry = dict[key];
      if (entry && entry[lang] != null) {
        el.innerHTML = entry[lang];
      }
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
        var parts = pair.split(':');
        var attr = parts[0];
        var key = parts[1];
        var entry = dict[key];
        if (entry && entry[lang] != null) {
          el.setAttribute(attr, entry[lang]);
        }
      });
    });

    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('.lang-switch [data-lang]').forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyTranslations(lang);
  }

  window.i18n = { setLang: setLang, getLang: getLang };

  document.addEventListener('DOMContentLoaded', function () {
    applyTranslations(getLang());
  });
})();
