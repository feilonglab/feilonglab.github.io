// Filtering for the publications listing.
//
// Quarto's own category filter is single-select and one-dimensional. This hooks
// the List.js instance Quarto exposes on window["quarto-listings"] and replaces
// its predicate with a composite one: OR within a group, AND across groups.
// The free-text box (filter-ui) still works, because List.js applies search()
// and filter() independently.
//
// Every control is a plain on/off toggle. Key papers are always highlighted in
// place; the Key papers chip only switches the filter on and off. A topic
// matches on either tier, but results are ordered by how many of the selected
// topics are *primary* for a paper, so the most on-topic work leads.
(function () {
  var LISTING_ID = 'listing-pubs';
  var selLab = new Set();
  var selTopic = new Set();
  var topicMode = 'all';      // 'all' = AND across topics, 'any' = OR
  var keyOnly = false;

  function tokens(v) {
    return (v || '').split(/\s+/).filter(Boolean);
  }

  function getList() {
    var reg = window['quarto-listings'];
    return reg && reg[LISTING_ID];
  }

  // How many of the selected topics are primary for this paper.
  function primaryHits(v) {
    if (!selTopic.size) return 0;
    var prim = tokens(v['listing-topic-ids-primary']);
    var n = 0;
    selTopic.forEach(function (x) { if (prim.indexOf(x) !== -1) n++; });
    return n;
  }

  function apply() {
    var list = getList();
    if (!list) return;

    if (selLab.size === 0 && selTopic.size === 0 && !keyOnly) {
      list.filter();
    } else {
      list.filter(function (item) {
        var v = item.values();
        var labs = tokens(v['listing-lab-ids']);
        var tops = tokens(v['listing-topic-ids']);
        var labOK = selLab.size === 0 || Array.from(selLab).some(function (x) {
          return labs.indexOf(x) !== -1;
        });
        // a topic matches on either tier; `any` is OR, `all` is AND
        var has = function (x) { return tops.indexOf(x) !== -1; };
        var topOK = selTopic.size === 0 || (topicMode === 'all'
          ? Array.from(selTopic).every(has)
          : Array.from(selTopic).some(has));
        // "key": a review, or a lab member holds a key role. When lab members
        // are selected, judge against those; otherwise against any lab member.
        var keyOK = true;
        if (keyOnly) {
          if (v['listing-is-review'] === 'true') {
            keyOK = true;
          } else {
            var keys = tokens(v['listing-key-ids']);
            keyOK = selLab.size === 0
              ? keys.length > 0
              : Array.from(selLab).some(function (x) { return keys.indexOf(x) !== -1; });
          }
        }
        return labOK && topOK && keyOK;
      });
    }
    sortList();
    syncChips();
    updateCount();
  }

  // Primary hits first, then newest first. With no topics selected every paper
  // scores 0, so this collapses to the plain date ordering.
  function sortList() {
    var list = getList();
    if (!list) return;
    list.sort('listing-ord', {
      order: 'asc',                 // ordering is fully encoded below
      sortFunction: function (a, b) {
        var d = primaryHits(b.values()) - primaryHits(a.values());
        if (d) return d;
        // listing-ord is the original date-descending position, zero-padded,
        // so a plain string compare restores the default order. The `date`
        // field cannot be used: Quarto renders it as "Aug 5, 2026".
        var oa = a.values()['listing-ord'] || '';
        var ob = b.values()['listing-ord'] || '';
        return oa < ob ? -1 : oa > ob ? 1 : 0;
      }
    });
  }

  function updateCount() {
    var list = getList();
    var el = document.getElementById('pub-count');
    if (!list || !el) return;
    var shown = list.matchingItems.length;
    var total = (window.PUBS_META && window.PUBS_META.total) || list.items.length;
    el.textContent = shown === total
      ? total + ' publications'
      : shown + ' of ' + total + ' publications';
    var reset = document.getElementById('pub-reset');
    if (reset) {
      reset.hidden = (selLab.size === 0 && selTopic.size === 0 && !keyOnly);
    }
  }

  function syncChips() {
    document.querySelectorAll('#pub-filter-lab .pub-chip').forEach(function (b) {
      b.classList.toggle('active', selLab.has(b.dataset.id));
      b.setAttribute('aria-pressed', selLab.has(b.dataset.id) ? 'true' : 'false');
    });
    document.querySelectorAll('#pub-filter-topic .pub-chip').forEach(function (b) {
      var on = selTopic.has(b.dataset.id);
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      var base = b.dataset.label || '';
      b.title = on ? base + ' \u2014 click to stop filtering'
                   : base + ' \u2014 click to show only these';
    });
    document.querySelectorAll('.pub-topic').forEach(function (b) {
      var id = labelToId[b.dataset.topicLabel];
      b.classList.toggle('active', !!id && selTopic.has(id));
    });
    var mode = document.getElementById('pub-topic-mode');
    if (mode) {
      mode.textContent = topicMode;
      mode.setAttribute('aria-pressed', topicMode === 'all' ? 'true' : 'false');
      mode.title = topicMode === 'all'
        ? 'Showing papers that carry every selected topic \u2014 click to match any'
        : 'Showing papers that carry any selected topic \u2014 click to require all';
      mode.hidden = selTopic.size < 2;      // meaningless with fewer than two
    }
    var k = document.getElementById('pub-key-chip');
    if (k) {
      k.classList.toggle('active', keyOnly);
      k.setAttribute('aria-pressed', keyOnly ? 'true' : 'false');
      k.title = keyOnly ? 'Showing only key papers \u2014 click to show all'
                        : 'Click to show only key papers';
    }
  }

  function toggleTopic(id) {
    if (selTopic.has(id)) selTopic.delete(id); else selTopic.add(id);
    apply();
  }

  var labelToId = {};

  function chip(id, label, n, sel, host) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'pub-chip';
    b.dataset.id = id;
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = '<span class="pub-chip-label"></span>'
      + ' <span class="pub-chip-n">' + n + '</span>';
    b.firstChild.textContent = label;
    b.title = label;                  // full label when it is truncated
    b.dataset.label = label;
    b.addEventListener('click', function () {
      if (sel) {
        if (sel.has(id)) sel.delete(id); else sel.add(id);
        apply();
      } else {
        toggleTopic(id);
      }
    });
    host.appendChild(b);
  }

  function build() {
    var meta = window.PUBS_META;
    if (!meta) return;
    var labHost = document.getElementById('pub-filter-lab');
    var topHost = document.getElementById('pub-filter-topic');
    if (labHost) {
      meta.labs.forEach(function (l) { chip(l.id, l.name, l.n, selLab, labHost); });
      if (!meta.labs.length) labHost.closest('.pub-filter-group').hidden = true;
    }
    if (topHost) {
      meta.topics.forEach(function (t) {
        labelToId[t.label] = t.id;
        chip(t.id, t.label, t.n, null, topHost);
      });
    }
    // topic buttons printed on each entry select that topic
    document.querySelectorAll('.pub-topic').forEach(function (b) {
      b.addEventListener('click', function () {
        var id = labelToId[b.dataset.topicLabel];
        if (!id) return;
        toggleTopic(id);
        var panel = document.getElementById('pub-filters');
        if (panel && typeof panel.scrollIntoView === 'function') {
          try { panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) { /* older browsers */ }
        }
      });
    });
    var modeBtn = document.getElementById('pub-topic-mode');
    if (modeBtn) {
      modeBtn.addEventListener('click', function () {
        topicMode = topicMode === 'any' ? 'all' : 'any';
        apply();
      });
    }
    var keyChip = document.getElementById('pub-key-chip');
    if (keyChip) {
      keyChip.addEventListener('click', function () {
        keyOnly = !keyOnly;
        apply();
      });
    }
    // key papers are always marked in place; the chip only filters
    var c = document.getElementById('listing-pubs');
    if (c) c.classList.add('highlight-key');
    var reset = document.getElementById('pub-reset');
    if (reset) {
      reset.hidden = true;
      reset.addEventListener('click', function () {
        selLab.clear();
        selTopic.clear();
        topicMode = 'all';
        keyOnly = false;
        apply();
      });
    }
  }

  function start(attempt) {
    var list = getList();
    if (!list) {
      if (attempt < 100) return setTimeout(function () { start(attempt + 1); }, 50);
      return;
    }
    build();
    list.on('updated', updateCount);
    apply();          // paint the initial state
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { start(0); });
  } else {
    start(0);
  }
})();
