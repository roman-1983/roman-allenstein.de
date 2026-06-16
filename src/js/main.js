/* Gentle pointer parallax on the portrait + coral glow.
   Progressive enhancement only: the page is complete without JS. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var portrait = document.querySelector(".portrait__img");
  var glow = document.querySelector(".portrait__glow");
  if (reduce || !portrait || window.matchMedia("(max-width: 860px)").matches) return;

  var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;

  function onMove(e) {
    var nx = e.clientX / window.innerWidth - 0.5;
    var ny = e.clientY / window.innerHeight - 0.5;
    tx = nx * 18;          // portrait shifts subtly opposite the cursor
    ty = ny * 12;
    if (!raf) raf = requestAnimationFrame(loop);
  }

  function loop() {
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;
    portrait.style.transform = "scale(1.04) translate(" + (-cx) + "px," + (-cy) + "px)";
    if (glow) glow.style.transform = "translate(" + (cx * 1.6) + "px," + (cy * 1.6) + "px)";
    if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
      raf = requestAnimationFrame(loop);
    } else {
      raf = null;
    }
  }

  // wait for the intro animation to settle before taking over the transform
  window.addEventListener("pointermove", function start(e) {
    window.removeEventListener("pointermove", start);
    setTimeout(function () {
      window.addEventListener("pointermove", onMove, { passive: true });
    }, 1900);
  }, { passive: true });
})();
