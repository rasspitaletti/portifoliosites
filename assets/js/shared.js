/* Raul Spitaletti — funções compartilhadas (home + página de case).
   Normalmente não precisa ser editado. */
window.RS = (() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cfg = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
  const projects = typeof PROJECTS !== "undefined" ? PROJECTS : [];
  const testimonials = typeof TESTIMONIALS !== "undefined" ? TESTIMONIALS : [];

  /* ---------- utilidades ---------- */
  const filled = (v) => typeof v === "string" && v.trim() !== "" && !/^PROJECT_/.test(v.trim());
  const list = (v) => (Array.isArray(v) ? v.filter(Boolean) : []);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const hostOf = (url) => {
    try { return new URL(url).host.replace(/^www\./, ""); } catch { return url; }
  };
  const isReady = (p) => p && filled(p.name) && filled(p.slug);
  const caseHref = (p) => `case.html?slug=${encodeURIComponent(p.slug)}`;
  const TYPES = { estetica: "Estética", massoterapia: "Massoterapia", lojas: "Lojas e brechós", outros: "Outros negócios" };

  const icon = {
    arrowUp: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>`,
    arrow: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
    play: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`,
  };

  /* ---------- analytics (GA4, opcional) ---------- */
  const gaId = String(cfg.gaMeasurementId || "").trim();
  if (/^G-[A-Z0-9]+$/i.test(gaId)) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", gaId, { anonymize_ip: true });
  }
  const track = (name, params = {}) => {
    if (typeof window.gtag === "function") window.gtag("event", name, params);
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-track]");
    if (a) track(a.dataset.track, { label: a.dataset.trackLabel || "", page: location.pathname });
  });

  /* ---------- WhatsApp / e-mail ---------- */
  const setContacts = (extra = "") => {
    const digits = String(cfg.whatsappNumber || "").replace(/\D/g, "");
    const text = encodeURIComponent(`${cfg.whatsappMessage || ""}${extra}`);
    const href = digits ? `https://wa.me/${digits}?text=${text}` : `https://api.whatsapp.com/send?text=${text}`;
    if (!digits) console.warn("[portfólio] Defina SITE_CONFIG.whatsappNumber em assets/js/config.js");
    $$("[data-whatsapp]").forEach((a) => {
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener";
      a.dataset.track = "click_whatsapp";
    });
    if (cfg.email) {
      $$("[data-email]").forEach((a) => {
        a.href = `mailto:${cfg.email}?subject=${encodeURIComponent("Site para minha clínica")}`;
        a.dataset.track = "click_email";
      });
    }
  };

  /* ---------- blocos visuais ---------- */
  const skeleton = () => `
    <div class="skeleton" aria-hidden="true">
      <div class="skeleton__nav"><i></i><i></i><i></i><i></i></div>
      <div class="skeleton__hero"><i class="w70"></i><i class="w45"></i><b></b></div>
      <div class="skeleton__grid"><i></i><i></i><i></i></div>
    </div>`;

  const media = (p, label, { controls = false } = {}) => {
    if (filled(p.video)) {
      return `<video class="frame__media" src="${esc(p.video)}" ${filled(p.image) ? `poster="${esc(p.image)}"` : ""}
        muted loop playsinline preload="metadata" ${controls ? "controls" : ""} aria-label="Demonstração em vídeo de ${esc(label)}"></video>`;
    }
    if (filled(p.image)) {
      return `<img class="frame__media" src="${esc(p.image)}" alt="Tela do site ${esc(label)}" loading="lazy" decoding="async">`;
    }
    return skeleton();
  };

  const browser = (p, label, extraClass = "", opts) => `
    <div class="frame ${extraClass}">
      <div class="frame__bar" aria-hidden="true">
        <span class="frame__dots"><i></i><i></i><i></i></span>
        <span class="frame__url">${filled(p.url) ? esc(hostOf(p.url)) : filled(p.displayUrl) ? esc(p.displayUrl) : "suaclinica.com.br"}</span>
      </div>
      <div class="frame__screen">${media(p, label, opts)}</div>
    </div>`;

  const techList = (tech) =>
    list(tech).length ? `<ul class="tech" aria-label="Tecnologias">${list(tech).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : "";

  const conceptBadge = (p) =>
    p.isConcept ? `<span class="badge badge--concept" title="Marca fictícia criada para demonstrar o trabalho">Projeto conceito</span>` : "";

  /* Vídeos: tocam no hover (desktop) ou quando visíveis (toque) */
  const wireVideos = (scope = document) => {
    if (reduceMotion) return;
    const hoverable = window.matchMedia("(hover: hover)").matches;
    $$("video.frame__media", scope).forEach((v) => {
      const host = v.closest("[data-video-host]") || v.parentElement;
      if (hoverable) {
        host.addEventListener("mouseenter", () => v.play().catch(() => {}));
        host.addEventListener("mouseleave", () => v.pause());
      } else if ("IntersectionObserver" in window) {
        new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.6 }).observe(v);
      }
    });
  };

  /* ---------- header, menu, reveal ---------- */
  const initChrome = () => {
    const header = $(".site-header");
    const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = $(".nav-toggle");
    const menu = $("#mobile-menu");
    const setMenu = (open) => {
      if (!toggle || !menu) return;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      menu.hidden = !open;
      document.documentElement.classList.toggle("menu-open", open);
      if (open) requestAnimationFrame(() => menu.classList.add("is-open"));
      else menu.classList.remove("is-open");
      if (open) $("a", menu)?.focus({ preventScroll: true });
    };
    toggle?.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
    menu?.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle?.getAttribute("aria-expanded") === "true") { setMenu(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 60rem)").addEventListener?.("change", (m) => { if (m.matches) setMenu(false); });

    const y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  };

  const spy = (links, attr = "aria-current") => {
    const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.toggleAttribute(attr, a.getAttribute("href") === `#${e.target.id}`));
      }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
  };

  /* Só anima o que ainda está abaixo da dobra; o que já está visível nunca some. */
  const initReveal = () => {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    $$("[data-reveal]:not(.reveal):not(.is-in)").forEach((el, i) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;
      el.classList.add("reveal");
      el.style.setProperty("--d", `${(i % 3) * 60}ms`);
      io.observe(el);
    });
  };

  return {
    $, $$, cfg, projects, testimonials, reduceMotion, TYPES, icon,
    filled, list, esc, hostOf, isReady, caseHref,
    track, setContacts, skeleton, media, browser, techList, conceptBadge, wireVideos,
    initChrome, spy, initReveal,
  };
})();
