document.addEventListener("DOMContentLoaded", function () {
  // set year
  document
    .querySelectorAll("#ano, #ano2, #ano3, #ano4, #ano5")
    .forEach((el) => {
      if (el) el.textContent = new Date().getFullYear();
    });

  // hamburger
  const btnHamb = document.getElementById("btn-hamburger");
  const nav = document.getElementById("nav");
  if (btnHamb && nav) {
    btnHamb.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      btnHamb.setAttribute("aria-expanded", open);
      btnHamb.classList.toggle("is-open");
    });
  }

  // theme
  const btnTheme = document.getElementById("btn-theme");

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const stored = localStorage.getItem("theme");

  if (stored === "dark" || (!stored && prefersDark))
    document.documentElement.classList.add("dark");
  if (btnTheme) {
    btnTheme.addEventListener("click", function () {
      document.documentElement.classList.toggle("dark");
      localStorage.setItem(
        "theme",
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
    });
  }

  // reveal
  const revealEls = document.querySelectorAll(
    ".card, .stat, .project, .team-grid figure, .testimonials blockquote, .cta-card"
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));

  // carousel
  const carousel = document.getElementById("carousel");
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  if (carousel) {
    next &&
      next.addEventListener("click", () =>
        carousel.scrollBy({ left: 300, behavior: "smooth" })
      );
    prev &&
      prev.addEventListener("click", () =>
        carousel.scrollBy({ left: -300, behavior: "smooth" })
      );
  }

  // counters
  const counters = document.querySelectorAll(".count");
  const countObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.dataset.target;
          let current = 0;
          const step = Math.max(1, Math.floor(target / 120));
          const t = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = target.toLocaleString();
              clearInterval(t);
            } else el.textContent = current.toLocaleString();
          }, 12);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.25 }
  );
  counters.forEach((c) => countObserver.observe(c));

  // back to top
  const back = document.getElementById("backToTop");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      back.style.transform = "translateY(0)";
      back.style.opacity = "1";
    } else {
      back.style.transform = "translateY(80px)";
      back.style.opacity = "0";
    }
  });
  back &&
    back.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );

  // masks and validation
  function onlyDigits(str) {
    return str.replace(/\D/g, "");
  }
  const cpfEl = document.getElementById("cpf");
  if (cpfEl) {
    cpfEl.addEventListener("input", function () {
      let v = onlyDigits(this.value).slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
      v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
      this.value = v;
    });
  }
  const telEl = document.getElementById("telefone");
  if (telEl) {
    telEl.addEventListener("input", function () {
      let v = onlyDigits(this.value).slice(0, 11);
      if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      else v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
      this.value = v;
    });
  }
  const cepEl = document.getElementById("cep");
  if (cepEl) {
    cepEl.addEventListener("input", function () {
      let v = onlyDigits(this.value).slice(0, 8);
      v = v.replace(/(\d{5})(\d{1,3})/, "$1-$2");
      this.value = v;
    });
  }

  // form
  const form = document.getElementById("cadastroForm");
  if (form) {
    const msg = document.getElementById("mensagem");
    form.addEventListener("input", function () {
      if (form.checkValidity()) msg.textContent = "";
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        msg.textContent = "Corrija os campos e tente novamente.";
        msg.style.color = "crimson";
        return;
      }
      msg.textContent =
        "Cadastro enviado com sucesso! Obrigado pelo interesse.";
      msg.style.color = "green";
      form.reset();
    });
  }
});
