// Reveal elements as they scroll into view. Purely additive: the head script
// only adds .reveal-anim when motion is welcome, so without JS (or with
// reduced motion) everything simply stays visible.
(function () {
  if (!document.documentElement.classList.contains("reveal-anim")) return;
  if (!("IntersectionObserver" in window)) {
    document.documentElement.classList.remove("reveal-anim");
    return;
  }
  // Tells the head-script safety net that the observer took over.
  document.documentElement.dataset.revealReady = "1";

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    });
    // Positive bottom margin: start the reveal just before an element enters
    // the viewport, so fast scrolling never lands on an empty section.
  }, { rootMargin: "0px 0px 20% 0px", threshold: 0 });

  document.querySelectorAll(".r").forEach(function (el, i) {
    el.style.transitionDelay = Math.min(i, 3) * 40 + "ms";
    io.observe(el);
  });
})();
