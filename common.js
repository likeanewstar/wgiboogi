(function () {
  "use strict";

  var page = document.querySelector(".wg-page");
  if (!page) return;

  function setupReveals() {
    var items = page.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.04, rootMargin: "0px 0px -72px 0px" }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function setupDrawHighlights() {
    var items = page.querySelectorAll("[data-draw-highlight]");
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("is-drawn");
      });
      return;
    }

    var queued = false;

    function updateDrawHighlights() {
      items.forEach(function (item) {
        if (item.classList.contains("is-drawn")) return;
        var rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.82) {
          item.classList.add("is-drawn");
        }
      });
      queued = false;
    }

    function onScroll() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(updateDrawHighlights);
    }

    updateDrawHighlights();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  function setupChecklistButtons() {
    var items = page.querySelectorAll(".wgi-post-check");
    if (!items.length) return;

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        var pressed = item.getAttribute("aria-pressed") === "true";
        item.setAttribute("aria-pressed", String(!pressed));
      });
    });
  }


  function init() {
    setupReveals();
    setupDrawHighlights();
    setupChecklistButtons();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
