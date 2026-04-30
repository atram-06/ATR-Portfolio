const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const year = document.querySelector("#year");
const revealElements = document.querySelectorAll(".reveal");

year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

document.documentElement.setAttribute("data-theme", initialTheme);
themeIcon.textContent = initialTheme === "dark" ? "Light" : "Dark";

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
  themeIcon.textContent = nextTheme === "dark" ? "Light" : "Dark";
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16
  }
);

revealElements.forEach((element) => revealObserver.observe(element));
