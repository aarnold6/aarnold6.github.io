/* =================================================================
   SHARED JAVASCRIPT — Jacquelynn Arnold · Craniosacral Fascial Therapy
   All pages load this file. It handles:
     - Dynamic copyright year
     - Sticky nav shadow on scroll
     - Hamburger menu (mobile)
     - Active nav link detection (automatically highlights current page)
     - Scroll-reveal animations
   Page-specific JS (tabs, carousel, FAQ accordion) stays inline.
   ================================================================= */


// ── Dynamic copyright year ────────────────────────────────────────
// Works with both id="footerYear" (index) and id="yr" (subpages)
['footerYear', 'yr'].forEach(function(id) {
  var el = document.getElementById(id);
  if (el) el.textContent = new Date().getFullYear();
});


// ── Sticky nav: adds shadow after scrolling 40px ──────────────────
var navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}


// ── Hamburger menu toggle (mobile only) ───────────────────────────
var navToggle = document.getElementById('nav-toggle');
var navLinks  = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', function() {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
  // Close the menu when any nav link is clicked
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });
}


// ── Active nav link: highlights the current page in the nav ───────
// How it works: looks at the URL to find the current filename,
// then adds the "active" class to the matching nav link.
(function setActiveNavLink() {
  var path     = window.location.pathname;
  var filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(function(link) {
    // Skip the Contact CTA button — it shouldn't get an active state
    if (link.classList.contains('nav-cta')) return;

    var href         = link.getAttribute('href') || '';
    var hrefFilename = href.split('/').pop();

    if (filename === 'index.html' || filename === '') {
      // On the homepage: mark the "Home" link active
      if (href === '#home') link.classList.add('active');
    } else {
      // On any subpage: match by filename (e.g. "bio.html")
      if (hrefFilename === filename) link.classList.add('active');
    }
  });
})();


// ── Scroll-reveal: fades elements up as they enter the viewport ───
// Any element with class="reveal" animates when it becomes visible.
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry, i) {
    if (entry.isIntersecting) {
      // Slight stagger so grouped elements don't all pop at once
      setTimeout(function() {
        entry.target.classList.add('visible');
      }, i * 55);
      revealObserver.unobserve(entry.target); // only animate once
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function(el) {
  revealObserver.observe(el);
});
