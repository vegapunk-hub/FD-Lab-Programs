// =====================================================================
// GOOD DESIGN vs BAD DESIGN  -  script.js
// Only two small jobs, so it stays easy to explain:
//   1. Fade the page out before moving to another page (smooth switch)
//   2. Keyboard shortcuts for the teacher: G = Good, B = Bad, H = Home
// =====================================================================

// ---- 1. Smooth page transition ----
// Every link marked with data-transition fades the page out first.
var transitionLinks = document.querySelectorAll('a[data-transition]');

transitionLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    // Let Ctrl/Cmd/Shift-clicks open in a new tab as normal
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }

    event.preventDefault();                      // stop the instant jump
    var destination = link.getAttribute('href');

    document.body.classList.add('page-leaving'); // CSS fades the page out (0.25s)

    setTimeout(function () {
      window.location.href = destination;       // then go to the new page
    }, 250);
  });
});

// If the browser restores a page from its cache (Back button), show it again
window.addEventListener('pageshow', function (event) {
  if (event.persisted) {
    document.body.classList.remove('page-leaving');
  }
});

// ---- 2. Keyboard shortcuts (handy on a Smart Board with a keyboard) ----
document.addEventListener('keydown', function (event) {
  var key = event.key.toLowerCase();

  if (key === 'g') { window.location.href = 'good.html'; }
  if (key === 'b') { window.location.href = 'bad.html'; }
  if (key === 'h') { window.location.href = 'index.html'; }
});
