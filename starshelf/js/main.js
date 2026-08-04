(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  // Sticky header glass effect
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  if (toggle && header) {
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    document.addEventListener("click", (e) => {
      if (!header.classList.contains("open")) return;
      if (!header.contains(e.target)) {
        header.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // Scroll-reveal
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  // Screenshot gallery
  const mainImg = document.querySelector("[data-shot-main]");
  const caption = document.querySelector("[data-shot-caption]");
  const thumbs = document.querySelectorAll("[data-shot-thumb]");

  if (mainImg && thumbs.length) {
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const src = thumb.getAttribute("data-src");
        const alt = thumb.getAttribute("data-alt") || "";
        const label = thumb.getAttribute("data-caption") || alt;

        if (src) {
          mainImg.src = src;
          mainImg.alt = alt;
        }
        if (caption) caption.textContent = label;

        thumbs.forEach((t) => {
          t.classList.toggle("active", t === thumb);
          t.setAttribute("aria-pressed", t === thumb ? "true" : "false");
        });
      });
    });
  }

  // Current year in footer
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
