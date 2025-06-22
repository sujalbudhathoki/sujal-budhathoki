// script.js

// Smooth scroll behavior (optional, already handled by CSS scroll-behavior)

// Scroll reveal animations or interactivity can be added here

// Example: highlight menu item based on scroll position (advanced) document.addEventListener("DOMContentLoaded", function () { const sections = document.querySelectorAll("section"); const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => { let current = "";

sections.forEach((section) => {
  const sectionTop = section.offsetTop;
  if (pageYOffset >= sectionTop - 60) {
    current = section.getAttribute("id");
  }
});

navLinks.forEach((link) => {
  link.classList.remove("active");
  if (link.getAttribute("href") === `#${current}`) {
    link.classList.add("active");
  }
});

}); });

