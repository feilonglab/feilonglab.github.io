// Re-render the citeproc bibliography on research pages so references match
// the Publications listing.
//
// Quarto emits <div id="ref-<citekey>"> entries in Chicago author-date form.
// publications/pubs-refs.js carries the same records the listing is built
// from, keyed by citation key, so each entry is swapped for the compact house
// style: author line with role markup, linked title, journal and venue.
// Topic chips and the Altmetric/Dimensions badges are deliberately omitted --
// these are references, not the catalogue.
//
// Progressive enhancement: with JS off, the citeproc list still renders.
(function () {
  var refs = window.PUBS_REFS;
  if (!refs) return;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function render(el, r) {
    // Title links out to the paper, as on the listing. The venue line then
    // carries both links: back to this paper's entry on the Publications page,
    // and out to the paper itself. Papers held back from the listing have no
    // entry, so they get the outward link only.
    var title = r.url
      ? '<a href="' + esc(r.url) + '" class="no-external">' + esc(r.title) + '</a>'
      : esc(r.title);
    var links = '';
    if (r.listed) {
      links += '<a class="pub-link" href="/publications/#pub-'
             + esc(encodeURIComponent(r.stem)) + '">Publications</a>';
    }
    if (r.url) {
      links += '<a class="pub-link" href="' + esc(r.url) + '">URL</a>';
    }
    el.innerHTML =
      '<div class="ref-title">' + title + '</div>' +
      '<div class="pub-authors">' + r.authors + '</div>' +
      '<div class="pub-venue">' + (r['cat-html'] || '') +
        (r.year ? '<span class="ref-year">' + esc(r.year) + '</span>, ' : '') +
        '<span class="pub-journal">' + esc(r.journal) + '</span>' +
      esc(r['venue-rest'] || '') + links + '</div>';
    el.classList.add('ref-entry');
  }

  document.querySelectorAll('#refs div[id^="ref-"]').forEach(function (el) {
    var r = refs[el.id.replace(/^ref-/, '')];
    if (r) render(el, r);
  });
})();
