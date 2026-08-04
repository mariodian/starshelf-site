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

  // Copy-to-clipboard for brew / install commands
  const COPY_FEEDBACK_MS = 1600;

  const resolveCopyText = (btn) => {
    const targetSel = btn.getAttribute("data-copy-target");
    if (targetSel) {
      const target = document.querySelector(targetSel);
      if (target) return { text: target.textContent.trim(), target };
    }

    const copyAttr = btn.getAttribute("data-copy");
    if (copyAttr) {
      if (copyAttr.startsWith("#") || copyAttr.startsWith(".")) {
        const target = document.querySelector(copyAttr);
        if (target) return { text: target.textContent.trim(), target };
      }
      return { text: copyAttr, target: null };
    }

    return { text: "", target: null };
  };

  const selectElementText = (el) => {
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    if (!sel) return;
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const flashCopied = (btn) => {
    const originalLabel = btn.getAttribute("aria-label") || "";
    const originalText = btn.textContent;

    btn.classList.add("copied");
    btn.setAttribute("aria-label", "Copied");
    if (originalText.trim()) btn.textContent = "Copied";

    window.setTimeout(() => {
      btn.classList.remove("copied");
      if (originalLabel) btn.setAttribute("aria-label", originalLabel);
      else btn.removeAttribute("aria-label");
      if (originalText.trim()) btn.textContent = originalText;
    }, COPY_FEEDBACK_MS);
  };

  const copyButtons = document.querySelectorAll(
    "[data-copy-target], [data-copy]"
  );

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const { text, target } = resolveCopyText(btn);
      if (!text) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          flashCopied(btn);
          return;
        }
        throw new Error("Clipboard API unavailable");
      } catch {
        // Fallback: select the source pre/code so the user can copy manually
        selectElementText(target);
      }
    });
  });
})();
