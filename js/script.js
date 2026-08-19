document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
navToggle?.addEventListener("click", () => nav.classList.toggle("is-open"));
nav?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => nav.classList.remove("is-open"))
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

function encodeFormData(form) {
  return new URLSearchParams(new FormData(form)).toString();
}

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeFormData(leadForm),
  })
    .then(() => {
      leadForm.hidden = true;
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: "smooth", block: "start" });
    })
    .catch(() => {
      alert("Não foi possível enviar agora. Tente novamente em alguns instantes.");
    });
});
