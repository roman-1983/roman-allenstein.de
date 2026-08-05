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

// Click a screenshot to see it full size. Uses a native <dialog>, so Escape and
// focus handling come for free. Without JS the images simply stay inline.
(function () {
  var shots = document.querySelectorAll(".shot img");
  if (!shots.length || !window.HTMLDialogElement) return;

  var dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Close">&times;</button>' +
    '<div class="lightbox__figure">' +
    '<img class="lightbox__img" alt="" />' +
    '<span class="lightbox__badge" hidden>Demo data</span>' +
    '</div>' +
    '<p class="lightbox__caption"></p>';
  document.body.appendChild(dialog);

  var img = dialog.querySelector(".lightbox__img");
  var caption = dialog.querySelector(".lightbox__caption");
  var badge = dialog.querySelector(".lightbox__badge");

  function open(source) {
    var figure = source.closest("figure");
    img.src = source.currentSrc || source.src;
    img.alt = source.alt || "";
    var figcaption = figure && figure.querySelector("figcaption");
    caption.textContent = figcaption ? figcaption.textContent : "";
    // Carry the demo-data marker over, so the badge is visible at full size too.
    badge.hidden = !(figure && figure.classList.contains("shot--demo"));
    dialog.showModal();
  }

  shots.forEach(function (source) {
    source.tabIndex = 0;
    source.setAttribute("role", "button");
    source.addEventListener("click", function () { open(source); });
    source.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(source);
      }
    });
  });

  dialog.querySelector(".lightbox__close").addEventListener("click", function () { dialog.close(); });
  // Clicking the backdrop closes too: the dialog itself is the only child that
  // fills the viewport, so a click landing on it is a click outside the image.
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", function () { img.removeAttribute("src"); });
})();
