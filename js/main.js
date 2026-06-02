/* =========================================================
   Alex Creates — интерактив
   ========================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Год в подвале ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Док-навигация: лёгкое уплотнение при скролле ---------- */
  const dock = document.getElementById("dock");
  if (dock) {
    const onScroll = () => dock.classList.toggle("is-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Мобильное меню ---------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const closeMenu = () => {
    nav.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- Активный пункт навигации ---------- */
  const navLinks = Array.from(document.querySelectorAll(".dock__item"));
  const sectionsForNav = navLinks
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sectionsForNav.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = "#" + entry.target.id;
            navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === id));
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sectionsForNav.forEach((s) => navObserver.observe(s));
  }

  /* ---------- Reveal при скролле ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(() => entry.target.classList.add("is-visible"), Number(delay));
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Счётчики цифр ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const runCounter = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1500;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window && !prefersReduced) {
    const countObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { runCounter(entry.target); obs.unobserve(entry.target); }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => countObserver.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count + (c.dataset.suffix || "")));
  }

  /* ---------- Заполнение шкал навыков ---------- */
  const bars = document.querySelectorAll(".skills__bar");
  if ("IntersectionObserver" in window) {
    const barObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add("is-filled"); obs.unobserve(entry.target); }
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach((b) => barObserver.observe(b));
  } else {
    bars.forEach((b) => b.classList.add("is-filled"));
  }

  /* ---------- Подсветка карточек за курсором ---------- */
  if (finePointer) {
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---------- Кастомный курсор ---------- */
  if (finePointer && !prefersReduced) {
    const cursor = document.getElementById("cursor");
    const dot = document.getElementById("cursorDot");
    document.body.classList.add("cursor-ready");

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    let visible = false;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      if (!visible) { visible = true; cursor.style.opacity = "1"; dot.style.opacity = "1"; }
    });
    window.addEventListener("mouseout", (e) => {
      if (!e.relatedTarget) { cursor.style.opacity = "0"; dot.style.opacity = "0"; visible = false; }
    });

    const render = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(render);
    };
    render();

    const setState = (state) => {
      cursor.classList.toggle("is-link", state === "link");
      cursor.classList.toggle("is-media", state === "media");
    };
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      const state = el.dataset.cursor === "media" ? "media" : "link";
      el.addEventListener("mouseenter", () => setState(state));
      el.addEventListener("mouseleave", () => setState(null));
    });
  }

  /* ---------- Обработка формы (демо, через mailto) ---------- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const contact = (data.get("email") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      if (!name || !contact || !message) {
        showNote("Пожалуйста, заполни все поля 🙏", false);
        return;
      }

      // ⚠️ Замени адрес на свой. Можно подключить Formspree/Getform вместо mailto.
      const to = "hello@alexcreates.com";
      const subject = encodeURIComponent(`Заявка с сайта от ${name}`);
      const body = encodeURIComponent(`Имя: ${name}\nКонтакт: ${contact}\n\n${message}`);
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

      showNote("Открываю почтовый клиент… Если не открылся — напиши мне напрямую 💚", true);
      form.reset();
    });
  }
  function showNote(text, ok) {
    if (!note) return;
    note.textContent = text;
    note.hidden = false;
    note.classList.toggle("is-ok", ok);
    note.classList.toggle("is-err", !ok);
  }

  /* ---------- Плавный скролл с учётом высоты шапки ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
    });
  });
})();
