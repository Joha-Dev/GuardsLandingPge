const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu_toggle");
const navList = document.querySelector(".nav_list");
const navItems = Array.from(document.querySelectorAll(".nav_item"));
const sections = Array.from(document.querySelectorAll("section[id], footer[id]"));

const getHeaderOffset = () => header?.offsetHeight ?? 0;

const closeMenu = () => {
  if (!navList) return;

  navList.classList.remove("active");

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
  }
};

if (menuToggle && navList) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!navList.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 991) {
      closeMenu();
    }
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    closeMenu();
  });
});

document
  .querySelectorAll('a[href^="#"]:not([href="#"])')
  .forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const selector = anchor.getAttribute("href");
      const target = document.querySelector(selector);

      if (!target) return;

      event.preventDefault();

      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - getHeaderOffset() + 1;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: "smooth",
      });
    });
  });

const updateActiveNavigation = () => {
  if (!navItems.length || !sections.length) return;

  const scrollPosition = window.scrollY + getHeaderOffset() + 120;
  let currentSection = sections[0].id;

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentSection = section.id;
    }
  });

  navItems.forEach((item) => {
    const isActive = item.getAttribute("href").slice(1) === currentSection;
    item.classList.toggle("active", isActive);
  });
};

window.addEventListener("scroll", updateActiveNavigation, { passive: true });
window.addEventListener("load", updateActiveNavigation);
