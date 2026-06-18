const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const testimonials = Array.from(document.querySelectorAll("[data-testimonial]"));

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll('.nav-links a, .footer-links a, .brand, .btn-secondary').forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

let heroIndex = 0;
let testimonialIndex = 0;

function rotateHeroSlides() {
  if (heroSlides.length < 2) return;
  heroSlides[heroIndex].classList.remove("is-active");
  heroIndex = (heroIndex + 1) % heroSlides.length;
  heroSlides[heroIndex].classList.add("is-active");
}

function rotateTestimonials() {
  if (testimonials.length < 2) return;
  testimonials[testimonialIndex].classList.remove("is-active");
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  testimonials[testimonialIndex].classList.add("is-active");
}

if (heroSlides.length > 1) setInterval(rotateHeroSlides, 4500);
if (testimonials.length > 1) setInterval(rotateTestimonials, 5000);
