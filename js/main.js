// Main behaviors: theme, hamburger, reveal, carousel, counters, back-to-top, masks, form
document.addEventListener("DOMContentLoaded", function () {
  // ===== Set years =====
  document
    .querySelectorAll("#ano,#ano2,#ano3,#ano4,#ano5")
    .forEach(function (el) {
      if (el) el.textContent = new Date().getFullYear();
    });

  // ===== Helper =====
  function qs(id) {
    return document.getElementById(id);
  }

  // ===== Hamburger menu =====
  var btnHamb = qs("btn-hamburger"),
    nav = qs("nav");
  if (btnHamb && nav) {
    btnHamb.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btnHamb.setAttribute("aria-expanded", open);
      btnHamb.classList.toggle("is-open");
    });
  }

  // ===== Theme toggle =====
  var btnTheme = qs("btn-theme"),
    prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    stored = localStorage.getItem("theme");

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

  // ===== Reveal elements =====
  var revealEls = document.querySelectorAll(
    ".card, .stat, .project, .team-grid figure, .testimonials blockquote, .cta-card"
  );
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  // ===== Carousel =====
  var carousel = qs("carousel"),
    next = qs("next"),
    prev = qs("prev");
  if (carousel) {
    next &&
      next.addEventListener("click", function () {
        carousel.scrollBy({ left: 300, behavior: "smooth" });
      });
    prev &&
      prev.addEventListener("click", function () {
        carousel.scrollBy({ left: -300, behavior: "smooth" });
      });
  }

  // ===== Counters =====
  var counters = document.querySelectorAll(".count");
  var countObserver = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target,
            target = +el.dataset.target || 0,
            current = 0,
            step = Math.max(1, Math.floor(target / 120)),
            t = setInterval(function () {
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
  counters.forEach(function (c) {
    countObserver.observe(c);
  });

  // ===== Back to top =====
  var back = qs("backToTop");
  window.addEventListener("scroll", function () {
    if (back) {
      if (window.scrollY > 400) {
        back.style.transform = "translateY(0)";
        back.style.opacity = "1";
      } else {
        back.style.transform = "translateY(80px)";
        back.style.opacity = "0";
      }
    }
  });
  back &&
    back.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

  // ===== Input masks =====
  function onlyDigits(str) {
    return str.replace(/\D/g, "");
  }

  var cpfEl = qs("cpf");
  if (cpfEl) {
    cpfEl.addEventListener("input", function () {
      var v = onlyDigits(this.value).slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
      v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
      this.value = v;
    });
  }

  var telEl = qs("telefone");
  if (telEl) {
    telEl.addEventListener("input", function () {
      var v = onlyDigits(this.value).slice(0, 11);
      if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      else v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
      this.value = v;
    });
  }

  var cepEl = qs("cep");
  if (cepEl) {
    cepEl.addEventListener("input", function () {
      var v = onlyDigits(this.value).slice(0, 8);
      v = v.replace(/(\d{5})(\d{1,3})/, "$1-$2");
      this.value = v;
    });
  }

  // ===== Form validation =====
  var form = qs("cadastroForm");
  if (form) {
    var msg = qs("mensagem");
    form.addEventListener("input", function () {
      if (form.checkValidity()) msg.textContent = "";
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        msg.textContent = "Corrija os campos e tente novamente.";
        msg.style.color = "crimson";
        showToast("Por favor, corrija os campos e tente novamente.", "error");
        return;
      }
      msg.textContent =
        "Cadastro enviado com sucesso! Obrigado pelo interesse.";
      msg.style.color = "green";
      msg.style.padding = "10px";
      form.reset();
      showToast("Cadastro enviado com sucesso!");
    });
  }

  // ===== Toast feedback =====
  function showToast(text, type = "success") {
    var t = document.createElement("div");
    t.className = "toast " + (type === "error" ? "error" : "");
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(function () {
      t.classList.add("visible");
    }, 20);
    setTimeout(function () {
      t.classList.remove("visible");
      setTimeout(function () {
        document.body.removeChild(t);
      }, 300);
    }, 3200);
  }
});
