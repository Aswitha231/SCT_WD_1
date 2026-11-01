const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const links = [...document.querySelectorAll(".nav-link:not(.nav-cta)")];
const sections = [...document.querySelectorAll("main section[id]")];

// Change the fixed navigation's appearance as the page scrolls.
function updateNavigation() {
  navbar.classList.toggle("scrolled", window.scrollY > 24);

  let activeId = "home";
  const marker = window.scrollY + 160;

  sections.forEach((section) => {
    if (section.offsetTop <= marker) activeId = section.id;
  });

  links.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

window.addEventListener("scroll", updateNavigation, { passive: true });
window.addEventListener("resize", updateNavigation);
updateNavigation();

// Accessible mobile navigation toggle.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

function closeMobileMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

links.forEach((link) => link.addEventListener("click", closeMobileMenu));
document.querySelector(".nav-cta").addEventListener("click", closeMobileMenu);

// Reveal content gently as it enters the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
