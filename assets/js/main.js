(function () {
  "use strict";

  /* ---------- sticky header state ---------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };
  if (header) {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- mobile nav toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- project filter ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var projectItems = document.querySelectorAll(".project-item");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      var filter = btn.getAttribute("data-filter");
      projectItems.forEach(function (item) {
        var match = filter === "all" || item.getAttribute("data-category") === filter;
        item.hidden = !match;
      });
    });
  });

  /* ---------- project lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxClose = document.getElementById("lightbox-close");
  var lightboxPrev = document.getElementById("lightbox-prev");
  var lightboxNext = document.getElementById("lightbox-next");
  var currentIndex = -1;

  function visibleItems() {
    return Array.prototype.filter.call(projectItems, function (item) {
      return !item.hidden;
    });
  }

  function showAt(index) {
    var items = visibleItems();
    if (!items.length) return;
    currentIndex = (index + items.length) % items.length;
    var item = items[currentIndex];
    var img = item.querySelector("img");
    var tag = item.querySelector(".project-tag");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = tag ? tag.textContent : "";
  }

  function openLightbox(item) {
    var items = visibleItems();
    var index = items.indexOf(item);
    showAt(index === -1 ? 0 : index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  projectItems.forEach(function (item) {
    item.addEventListener("click", function () {
      openLightbox(item);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", function () {
      showAt(currentIndex - 1);
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener("click", function () {
      showAt(currentIndex + 1);
    });
  }
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showAt(currentIndex - 1);
      if (e.key === "ArrowRight") showAt(currentIndex + 1);
    });
  }

  /* also re-point lightbox navigation when the active filter changes */
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });
  });

  /* ---------- testimonial carousel controls ---------- */
  var testiTrack = document.querySelector(".testi-track");
  var prevBtn = document.querySelector(".testi-prev");
  var nextBtn = document.querySelector(".testi-next");
  if (testiTrack && prevBtn && nextBtn) {
    var scrollByCard = function (dir) {
      var card = testiTrack.querySelector(".testi-card");
      var amount = card ? card.getBoundingClientRect().width + 22 : 320;
      testiTrack.scrollBy({ left: dir * amount, behavior: "smooth" });
    };
    prevBtn.addEventListener("click", function () {
      scrollByCard(-1);
    });
    nextBtn.addEventListener("click", function () {
      scrollByCard(1);
    });
  }

  /* ---------- current year in footer ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
