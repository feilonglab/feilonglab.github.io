// Hover cards for author names.
//
// Used by both the publications listing and the reference lists on research
// pages, so it loads site-wide and no-ops where there are no .au spans. It
// must run after refs-format.js, which injects those spans on research pages.
// ---------------------------------------------------------------------------
// Author hover cards.
//
// Each author span carries data-au-* attributes plus a plain `title=` holding
// the same text. On load we move the title into data-au-title and render a
// styled card instead; if this script never runs, the native tooltip still
// shows everything. Also opens on keyboard focus, which title= does not.
(function () {
  var tip, hideTimer;

  function build() {
    tip = document.createElement('div');
    tip.className = 'au-tip';
    tip.setAttribute('role', 'tooltip');
    tip.hidden = true;
    document.body.appendChild(tip);
  }

  function html(el) {
    var d = el.dataset;
    var rows = '';
    if (d.auRoles) rows += '<div class="au-tip-roles">' + esc(d.auRoles) + '</div>';
    if (d.auLab) rows += '<div class="au-tip-lab">' + esc(d.auLab) + ', Feilong Lab</div>';
    if (d.auAffil) rows += '<div class="au-tip-affil">' + esc(d.auAffil) + '</div>';
    if (d.auOrcid) {
      rows += '<div class="au-tip-orcid"><a href="https://orcid.org/' + esc(d.auOrcid) +
              '" target="_blank" rel="noopener">ORCID ' + esc(d.auOrcid) + '</a></div>';
    }
    return '<div class="au-tip-name">' + esc(d.auName || el.textContent) + '</div>' + rows;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function show(el) {
    clearTimeout(hideTimer);
    if (!el.dataset.auName) return;
    tip.innerHTML = html(el);
    tip.hidden = false;
    var r = el.getBoundingClientRect();
    var t = tip.getBoundingClientRect();
    var left = Math.min(Math.max(8, r.left + r.width / 2 - t.width / 2),
                        window.innerWidth - t.width - 8);
    var top = r.top - t.height - 8;
    var below = top < 4;
    if (below) top = r.bottom + 8;
    tip.classList.toggle('au-tip-below', below);
    tip.style.left = (left + window.scrollX) + 'px';
    tip.style.top = (top + window.scrollY) + 'px';
  }

  function hide() {
    hideTimer = setTimeout(function () { if (tip) tip.hidden = true; }, 120);
  }

  function init() {
    if (!document.querySelector('.pub-authors .au')) return;
    build();
    document.querySelectorAll('.pub-authors .au').forEach(function (el) {
      // keep the text in data-, drop title= so the two tooltips don't stack
      if (el.title) { el.dataset.auTitle = el.title; el.removeAttribute('title'); }
      el.addEventListener('mouseenter', function () { show(el); });
      el.addEventListener('mouseleave', hide);
      el.addEventListener('focus', function () { show(el); });
      el.addEventListener('blur', hide);
    });
    tip.addEventListener('mouseenter', function () { clearTimeout(hideTimer); });
    tip.addEventListener('mouseleave', hide);
    window.addEventListener('scroll', function () { if (tip) tip.hidden = true; }, { passive: true });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && tip) tip.hidden = true;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
