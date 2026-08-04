/* ═══════════════════════════════════════════════════════════════════════════
   RMMF site — ONE script for all three pages.

   Same reasoning as site.css: three inline copies of this logic is three
   chances for them to disagree, and the draft gate in particular MUST behave
   identically everywhere. A page where the gate silently failed would show a
   grower a list of the page's own unevidenced claims.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  // ── The draft gate ───────────────────────────────────────────────────────
  // Asset slots, owner notes, citation markers and the source list are on when
  // the owner is reviewing and off when a grower is reading. file:// and
  // localhost show them; a real host does not, unless ?draft=1 says otherwise.
  var q = new URLSearchParams(location.search);
  var mine = location.protocol === 'file:' ||
             /^(localhost|127\.|\[::1\])/.test(location.hostname);
  if (!(q.has('draft') || (mine && !q.has('clean')))) {
    document.body.classList.add('clean');
  }

  // ── Card attribution ─────────────────────────────────────────────────────
  // The printed QR carries ?src=card. Keep it across a hop to the survey page so
  // festival scans stay separable from web traffic in the form's source field.
  var src = q.get('src');
  if (src) {
    try { sessionStorage.setItem('rmmf_src', src); } catch (e) {}
  }
  var carried = src;
  if (!carried) {
    try { carried = sessionStorage.getItem('rmmf_src'); } catch (e) {}
  }
  if (carried) {
    document.querySelectorAll('a.btn[href^="survey"]').forEach(function (a) {
      if (a.href.indexOf('src=') === -1) {
        a.href += (a.href.indexOf('?') === -1 ? '?' : '&') +
                  'src=' + encodeURIComponent(carried);
      }
    });
  }

  // ── Reveal on scroll ─────────────────────────────────────────────────────
  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var faders = document.querySelectorAll('.fade');
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    faders.forEach(function (el) { io.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add('in'); });
  }
})();
