// script.js

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");
  const OFFSET = 80; // Adjust if you have a fixed header

  // Smooth scroll with focus for accessibility
  navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => targetSection.focus({ preventScroll: true }), 600);
        history.replaceState(null, null, `#${targetId}`);
      }
    });
  });

  // Improved scroll handler (debounced)
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        let currentSectionId = "";
        let minDistance = Number.POSITIVE_INFINITY;
        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top - OFFSET);
          if (rect.top - OFFSET <= 0 && distance < minDistance) {
            minDistance = distance;
            currentSectionId = section.id;
          }
        });
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSectionId}`
          );
          // For accessibility
          link.setAttribute(
            "aria-current",
            link.getAttribute("href") === `#${currentSectionId}` ? "page" : null
          );
        });
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Optional: Reveal sections on scroll (IntersectionObserver)
  const revealSections = document.querySelectorAll("section[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );
    revealSections.forEach(section => observer.observe(section));
  }
});
