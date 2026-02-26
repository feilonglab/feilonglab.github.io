// Category filtering for the news timeline.
//
// The chips are built from the rendered entries rather than a hand-kept list,
// so news.yml stays the only place a category is ever declared: add an item
// with a new category and its chip appears, with the right count.
//
// Filtering goes through the List.js instance Quarto creates for the listing
// (window["quarto-listings"]) instead of toggling display directly, so the two
// never fight over the same elements. Every chip is a plain on/off toggle;
// selecting several is an OR.
(function () {
  var LISTING_ID = 'listing-news';

  // Chip labels. Must track CATEGORIES in news.ejs.md; an unknown category
  // still gets a chip, just labelled with its raw id.
  var LABELS = {
    people:    'People',
    paper:     'Papers',
    award:     'Awards',
    talk:      'Talks',
    media:     'In the news',
    milestone: 'Milestones',
  };

  var selected = new Set();

  function getList() {
    var reg = window['quarto-listings'];
    return reg && reg[LISTING_ID];
  }

  function items() {
    return document.querySelectorAll('#' + LISTING_ID + ' .news-item');
  }

  // Two things have to be recomputed after every filter.
  //
  // Years: each marker is rendered inside the entry that opens its year, so it
  // disappears when that entry is filtered out, leaving the rest of the year
  // unlabelled. The label has to move to whichever entry now leads.
  //
  // Rail: it runs from each dot down to the next one, so it has to be cut on
  // the last visible entry of a year (a year marker interrupts the timeline)
  // and on the last visible entry overall, where it would trail off into
  // blank page.
  function reflow() {
    var visible = [];
    items().forEach(function (item) {
      if (item.style.display === 'none') {
        // leave nothing stale behind on a filtered-out entry
        item.classList.remove('news-tail');
        var lbl = item.querySelector('.news-year');
        if (lbl) lbl.hidden = true;
      } else {
        visible.push(item);
      }
    });

    var seen = {};
    visible.forEach(function (item, i) {
      var year = item.dataset.year;
      var label = item.querySelector('.news-year');
      if (label) label.hidden = !!seen[year];
      seen[year] = true;

      var next = visible[i + 1];
      item.classList.toggle('news-tail', !next || next.dataset.year !== year);
    });
  }

  function paintChips() {
    document.querySelectorAll('#news-chips .pub-chip').forEach(function (b) {
      var on = selected.has(b.dataset.id);
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.title = on ? 'Showing ' + b.dataset.label + ' — click to clear'
                   : 'Show only ' + b.dataset.label;
    });
    var reset = document.getElementById('news-reset');
    if (reset) reset.hidden = selected.size === 0;
  }

  function apply() {
    var list = getList();
    if (!list) return;
    if (selected.size === 0) {
      list.filter();
    } else {
      list.filter(function (item) {
        return selected.has(item.values()['listing-category']);
      });
    }
    paintChips();
    reflow();
  }

  function build() {
    var host = document.getElementById('news-chips');
    if (!host) return;

    var counts = {};
    items().forEach(function (item) {
      var c = item.dataset.category;
      counts[c] = (counts[c] || 0) + 1;
    });

    // busiest category first, alphabetical within a tie, so the order is
    // stable as items are added
    Object.keys(counts).sort(function (a, b) {
      return counts[b] - counts[a] || a.localeCompare(b);
    }).forEach(function (c) {
      var label = LABELS[c] || c;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pub-chip';
      b.dataset.id = c;
      b.dataset.label = label;
      b.setAttribute('aria-pressed', 'false');
      b.innerHTML = '<span class="pub-chip-label"></span>'
        + ' <span class="pub-chip-n">' + counts[c] + '</span>';
      b.firstChild.textContent = label;
      b.addEventListener('click', function () {
        if (selected.has(c)) selected.delete(c); else selected.add(c);
        apply();
      });
      host.appendChild(b);
    });

    var reset = document.getElementById('news-reset');
    if (reset) {
      reset.addEventListener('click', function () {
        selected.clear();
        apply();
      });
    }
  }

  function start(attempt) {
    var list = getList();
    if (!list) {
      // Quarto registers the listing after its own bundle runs; poll briefly.
      if (attempt < 100) return setTimeout(function () { start(attempt + 1); }, 50);
      return;
    }
    build();
    list.on('updated', reflow);
    apply();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { start(0); });
  } else {
    start(0);
  }
})();
