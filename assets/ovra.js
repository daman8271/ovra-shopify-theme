document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("SiteHeader");
  const loader = document.getElementById("pageLoader");
  const mobileMenu = document.getElementById("MobileMenu");
  const cartDrawer = document.getElementById("CartDrawer");
  const cartOverlay = document.getElementById("cartDrawerOverlay");
  const cartCountBadges = document.querySelectorAll("[data-cart-count]");
  const mobileMenuToggles = document.querySelectorAll("[data-mobile-menu-toggle]");
  const cartToggles = document.querySelectorAll("[data-cart-toggle]");
  const newsletterForms = document.querySelectorAll(".js-newsletter-form");

  const toggleHeaderState = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 50);
  };

  const setMenuOpen = (isOpen) => {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle("is-open", isOpen);
    mobileMenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
    mobileMenuToggles.forEach((button) => {
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    body.classList.toggle("menu-open", isOpen);
  };

  const setCartOpen = (isOpen) => {
    if (!cartDrawer || !cartOverlay) return;
    cartDrawer.classList.toggle("is-open", isOpen);
    cartDrawer.setAttribute("aria-hidden", isOpen ? "false" : "true");
    cartOverlay.classList.toggle("is-visible", isOpen);
    cartToggles.forEach((button) => {
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    body.classList.toggle("cart-open", isOpen);
  };

  const updateCartCount = (nextCount) => {
    cartCountBadges.forEach((badge) => {
      badge.textContent = String(nextCount);
    });
  };

  const currentCount = Number(cartCountBadges[0]?.textContent || 0);
  let simulatedCartCount = Number.isNaN(currentCount) ? 0 : currentCount;

  setMenuOpen(false);
  setCartOpen(false);
  toggleHeaderState();
  window.addEventListener("scroll", toggleHeaderState, { passive: true });

  mobileMenuToggles.forEach((button) => {
    button.addEventListener("click", () => {
      const shouldOpen = !mobileMenu?.classList.contains("is-open");
      setMenuOpen(Boolean(shouldOpen));
    });
  });

  cartToggles.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      setCartOpen(true);
    });
  });

  document.querySelectorAll("[data-cart-close]").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (button.tagName === "BUTTON") {
        event.preventDefault();
      }
      setCartOpen(false);
    });
  });

  cartOverlay?.addEventListener("click", () => setCartOpen(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
      setCartOpen(false);
    }
  });

  document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      simulatedCartCount += 1;
      updateCartCount(simulatedCartCount);
      setCartOpen(true);
    });
  });

  document.querySelectorAll("[data-product-image]").forEach((image) => {
    const primary = image.getAttribute("data-primary");
    const secondary = image.getAttribute("data-secondary");
    const card = image.closest("[data-product-card]");

    if (!primary || !secondary || !card) return;

    card.addEventListener("mouseenter", () => {
      image.setAttribute("src", secondary);
    });

    card.addEventListener("mouseleave", () => {
      image.setAttribute("src", primary);
    });
  });

  document.querySelectorAll("[data-product-wishlist]").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("is-active");
      button.setAttribute(
        "aria-pressed",
        button.classList.contains("is-active") ? "true" : "false"
      );
    });
  });

  const parallaxNodes = Array.from(document.querySelectorAll("[data-parallax]"));

  const updateParallax = () => {
    parallaxNodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const speed = Number(node.getAttribute("data-parallax-speed") || 0.15);
      const offset = rect.top * speed;
      node.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
    });
  };

  if (parallaxNodes.length) {
    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
  }

  newsletterForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const feedback = form.querySelector("[data-newsletter-feedback]");
      const emailField = form.querySelector('input[type="email"]');
      if (feedback) {
        feedback.textContent = "You’re in. Expect early access to the next drop.";
      }
      form.classList.add("is-success");
      if (emailField) {
        emailField.value = "";
      }
    });
  });

  document.querySelectorAll('a[href*="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href) return;

      const url = new URL(href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    });
  });

  window.setTimeout(() => {
    loader?.classList.add("is-hidden");
  }, 450);
});
