// Preencher com o número oficial (somente dígitos, com DDI). Vazio = botão de WhatsApp fica oculto.
const WHATSAPP_NUMBER = "";
const WHATSAPP_MSG = "Olá! Vi a página do circuito infantil e quero receber os números sob NDA.";

document.getElementById("year").textContent = new Date().getFullYear();

const wa = document.getElementById("waLink");
if (wa && WHATSAPP_NUMBER) {
  wa.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MSG);
  wa.hidden = false;
  wa.addEventListener("click", () => track("click_whatsapp"));
}

function track(name, params) {
  try { if (window.gtag) window.gtag("event", name, Object.assign({ page: "circuito" }, params || {})); } catch (e) {}
}

document.querySelectorAll("[data-cta]").forEach((el) =>
  el.addEventListener("click", () => track("click_cta", { cta: el.dataset.cta }))
);

const form = document.getElementById("leadForm");
const ok = document.getElementById("formOk");
const err = document.getElementById("formErr");
const btn = document.getElementById("submitBtn");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  err.hidden = true;
  btn.disabled = true;
  btn.textContent = "Enviando...";
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(new FormData(form)).toString(),
  })
    .then((r) => { if (!r.ok) throw new Error(r.status); })
    .then(() => {
      track("generate_lead", { form: "circuito-triagem" });
      form.hidden = true;
      ok.hidden = false;
      ok.scrollIntoView({ behavior: "smooth", block: "center" });
    })
    .catch(() => {
      err.hidden = false;
      btn.disabled = false;
      btn.textContent = "Quero receber os números";
    });
});
