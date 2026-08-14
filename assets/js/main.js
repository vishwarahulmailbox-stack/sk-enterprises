(function () {
  "use strict";

  /* ---------- contact form endpoint ----------
     Paste your Google Apps Script Web App URL here after deploying it.
     See google-apps-script.gs and README.md for the 5-minute setup.
     Until this is filled in, the form will show an error instead of sending. */
  var CONTACT_FORM_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

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

  /* ---------- services carousel controls ---------- */
  var servicesTrack = document.querySelector(".services-track");
  var servicesPrev = document.querySelector(".services-prev");
  var servicesNext = document.querySelector(".services-next");
  if (servicesTrack && servicesPrev && servicesNext) {
    var scrollByService = function (dir) {
      var card = servicesTrack.querySelector(".service-card");
      var amount = card ? card.getBoundingClientRect().width + 18 : 320;
      servicesTrack.scrollBy({ left: dir * amount, behavior: "smooth" });
    };
    servicesPrev.addEventListener("click", function () {
      scrollByService(-1);
    });
    servicesNext.addEventListener("click", function () {
      scrollByService(1);
    });
  }

  /* ---------- current year in footer ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- contact form: send via Google Apps Script (Gmail) ---------- */
  var contactForm = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");
  var formSubmit = document.getElementById("form-submit");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var nameField = document.getElementById("cf-name");
      var emailField = document.getElementById("cf-email");

      if (!nameField.value.trim() || !emailField.value.trim()) {
        formStatus.textContent = "Please fill in your name and email.";
        return;
      }

      if (!CONTACT_FORM_ENDPOINT || CONTACT_FORM_ENDPOINT.indexOf("PASTE_YOUR") === 0) {
        formStatus.textContent = "Form isn't connected yet — see README.md to finish setup.";
        return;
      }

      var originalLabel = formSubmit.textContent;
      formSubmit.disabled = true;
      formSubmit.textContent = "Sending...";
      formStatus.textContent = "Sending your message...";

      var formData = new FormData(contactForm);

      fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      })
        .then(function () {
          window.location.href = "thank-you.html";
        })
        .catch(function () {
          formSubmit.disabled = false;
          formSubmit.textContent = originalLabel;
          formStatus.textContent = "Something went wrong — please email us directly at skbusiness576@gmail.com.";
        });
    });
  }
})();
