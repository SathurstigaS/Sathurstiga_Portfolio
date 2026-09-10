const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector("#contact-form");

const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 20);
const updateScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
};
window.addEventListener("scroll", () => {
  updateHeader();
  updateScrollProgress();
}, { passive: true });
updateHeader();
updateScrollProgress();

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const sectionLinks = [...navLinks.querySelectorAll('a[href^="#"]')];
const sections = [...document.querySelectorAll("main section[id]")];
const activeSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-30% 0px -55% 0px" });
sections.forEach((section) => activeSectionObserver.observe(section));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelectorAll(".skill-card, .project-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--my", `${event.clientY - bounds.top}px`);
  });
});

document.querySelectorAll(".project-visual, .mini-visual").forEach((visual) => {
  visual.addEventListener("pointermove", (event) => {
    const bounds = visual.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
    visual.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.02)`;
  });
  visual.addEventListener("pointerleave", () => {
    visual.style.transform = "";
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = contactForm.querySelector(".form-status");
  status.textContent = "Thanks — your message is ready to send.";
  contactForm.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();
