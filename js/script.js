document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
navToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  })
);

// Pre-select the unit dropdown when a card's CTA is clicked.
const unidadeSelect = document.getElementById("unidade");
document.querySelectorAll("[data-unit]").forEach((link) => {
  link.addEventListener("click", () => {
    if (unidadeSelect) unidadeSelect.value = link.dataset.unit;
  });
});

// Netlify Forms: intercept submit for AJAX-style success without leaving the page.
const leadForm = document.getElementById("leadForm");
const formSuccess = document.getElementById("formSuccess");
const formError = document.getElementById("formError");
const submitBtn = document.getElementById("submitBtn");

function encodeFormData(form) {
  return new URLSearchParams(new FormData(form)).toString();
}

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.hidden = true;
  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando…";
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeFormData(leadForm),
  })
    .then(() => {
      leadForm.hidden = true;
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
    })
    .catch(() => {
      formError.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar e agendar conversa";
    });
});
