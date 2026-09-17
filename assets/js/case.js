/* Raul Spitaletti — página de case (case.html?slug=...).
   Todo o conteúdo vem de assets/js/config.js. */
(() => {
  "use strict";
  const R = window.RS;
  const { $, $$, esc, filled, list, isReady, caseHref, icon } = R;

  R.initChrome();

  const slug = new URLSearchParams(location.search).get("slug") || "";
  const ready = R.projects.filter(isReady);
  const p = ready.find((x) => x.slug === slug);
  const root = $("#case-root");

  /* ---------- Case não encontrado / em preparação ---------- */
  if (!p) {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    document.title = "Case em preparação — Raul Spitaletti";
    R.setContacts();
    root.innerHTML = `
      <section class="container case-missing">
        <p class="eyebrow">Case</p>
        <h1 class="case-hero__title">Este case ainda está em preparação.</h1>
        <p class="section__lead">Os projetos são publicados aqui assim que ficam prontos e autorizados pelos clientes.</p>
        <div class="case__actions"><a class="btn btn--primary" href="index.html#cases">Ver todos os cases ${icon.arrow}</a></div>
        <div class="case-outline" aria-label="Estrutura de um case">
          <p class="case-outline__label">Cada case apresenta</p>
          <ol>
            <li>Contexto da clínica</li><li>Problemas do negócio</li><li>Decisões e soluções</li>
            <li>Antes e depois do site</li><li>Resultados medidos, com fonte</li><li>Depoimento do cliente</li><li>Ficha técnica</li>
          </ol>
        </div>
      </section>`;
    R.initReveal();
    return;
  }

  /* ---------- SEO básico da página ---------- */
  document.title = `${p.name} — Case | Raul Spitaletti`;
  const desc = filled(p.description) ? p.description : `Case de site: ${p.name}.`;
  $('meta[name="description"]')?.setAttribute("content", desc);
  const setMeta = (sel, v) => $(sel)?.setAttribute("content", v);
  setMeta('meta[property="og:title"]', `${p.name} — Case`);
  setMeta('meta[name="twitter:title"]', `${p.name} — Case`);
  setMeta('meta[property="og:description"]', desc);
  setMeta('meta[name="twitter:description"]', desc);
  if (filled(p.image)) {
    const abs = new URL(p.image, location.href).href;
    ["og:image", "og:image:secure_url"].forEach((k) => setMeta(`meta[property="${k}"]`, abs));
    setMeta('meta[name="twitter:image"]', abs);
  }

  R.setContacts(` (Vi o case "${p.name}")`);

  /* ---------- Blocos ---------- */
  const facts = [
    ["Tipo", R.TYPES[p.type] || ""],
    ["Local", p.location],
    ["Prazo", p.duration],
    ["Páginas", list(p.pages).length ? String(list(p.pages).length) : ""],
  ].filter(([, v]) => filled(v));

  const sections = [];
  const add = (id, label, html) => { if (html) sections.push({ id, label, html }); };

  add("contexto", "Contexto", filled(p.context) ? `<p class="case-lead">${esc(p.context)}</p>` : "");

  add("problemas", "Problemas", list(p.problems).length
    ? `<ul class="problem-list">${list(p.problems).map((t) => `<li><span aria-hidden="true">“</span>${esc(t)}</li>`).join("")}</ul>` : "");

  add("solucoes", "Soluções", list(p.solutions).filter((s) => filled(s.title)).length
    ? `<div class="solutions">${list(p.solutions).filter((s) => filled(s.title)).map((s, i) => `
        <article class="solution ${filled(s.image) ? "has-img" : ""}">
          <div class="solution__text">
            <span class="solution__n">${String(i + 1).padStart(2, "0")}</span>
            <h3>${esc(s.title)}</h3>
            ${filled(s.text) ? `<p>${esc(s.text)}</p>` : ""}
          </div>
          ${filled(s.image) ? `<button class="solution__img" type="button" data-zoom="${esc(s.image)}" data-caption="${esc(s.title)}" aria-label="Ampliar imagem: ${esc(s.title)}"><img src="${esc(s.image)}" alt="${esc(s.title)}" loading="lazy"></button>` : ""}
        </article>`).join("")}</div>` : "");

  const ba = p.beforeAfter;
  add("antes-depois", "Antes e depois", ba && filled(ba.before) && filled(ba.after) ? `
      <p class="case-note">Evolução do site: arraste para comparar a versão anterior com a nova.</p>
      <div class="compare" style="--pos:50%">
        <img src="${esc(ba.after)}" alt="Site novo" loading="lazy">
        <div class="compare__before"><img src="${esc(ba.before)}" alt="Site anterior" loading="lazy"></div>
        <span class="compare__tag compare__tag--l">Antes</span><span class="compare__tag compare__tag--r">Depois</span>
        <span class="compare__handle" aria-hidden="true"></span>
        <input class="compare__range" type="range" min="0" max="100" value="50" id="compare-range" aria-label="Comparar antes e depois">
      </div>` : "");

  const results = list(p.results).filter((r) => filled(String(r.value ?? "")) && filled(r.label));
  const lh = p.lighthouse;
  const scores = lh ? [["Performance", lh.performance], ["Acessibilidade", lh.accessibility], ["Boas práticas", lh.bestPractices], ["SEO", lh.seo]]
    .filter(([, v]) => Number.isFinite(v)) : [];
  const gauge = ([label, v]) => {
    const tone = v >= 90 ? "good" : v >= 50 ? "ok" : "bad";
    return `<div class="gauge gauge--${tone}" style="--v:${Math.max(0, Math.min(100, v))}">
      <svg viewBox="0 0 36 36" aria-hidden="true"><circle class="gauge__track" cx="18" cy="18" r="15.9"/><circle class="gauge__val" cx="18" cy="18" r="15.9" pathLength="100"/></svg>
      <strong>${v}</strong><span>${esc(label)}</span></div>`;
  };
  const psi = filled(p.url) ? `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(p.url)}` : "";
  add("resultados", "Resultados", results.length || scores.length ? `
      ${results.length ? `<div class="results">${results.map((r) => `
        <div class="result"><strong>${esc(r.value)}</strong><span>${esc(r.label)}</span>
          <small>${esc([r.source, r.period].filter(Boolean).join(" · "))}</small></div>`).join("")}</div>` : ""}
      ${scores.length ? `<div class="health">
        <div class="health__head"><h3>Saúde técnica do site</h3>
          <p>Lighthouse (modo mobile)${lh.date ? ` · teste de ${esc(new Date(lh.date + "T12:00:00").toLocaleDateString("pt-BR"))}` : ""}</p>
          ${psi ? `<a class="text-link" href="${psi}" target="_blank" rel="noopener">Refazer o teste agora ${icon.arrowUp}</a>` : ""}</div>
        <div class="gauges">${scores.map(gauge).join("")}</div></div>` : ""}` : "");

  const t = p.testimonial;
  add("depoimento", "Depoimento", t && filled(t.quote) && filled(t.name) ? `
      <figure class="quote quote--lg">
        ${filled(t.video) ? `<video class="quote__video" src="${esc(t.video)}" controls playsinline preload="metadata" aria-label="Depoimento em vídeo de ${esc(t.name)}"></video>` : ""}
        <blockquote><p>“${esc(t.quote)}”</p></blockquote>
        <figcaption>
          ${filled(t.photo) ? `<img src="${esc(t.photo)}" alt="" width="48" height="48" loading="lazy">` : `<span class="quote__initial" aria-hidden="true">${esc(t.name.trim()[0])}</span>`}
          <span><strong>${esc(t.name)}</strong><small>${esc([t.role, p.name].filter(Boolean).join(" · "))}</small></span>
        </figcaption>
      </figure>` : "");

  const gal = list(p.gallery).filter((g) => g && filled(g.src));
  add("galeria", "Galeria", gal.length ? `
      <p class="case-note">${gal.length} telas do site. Clique para ampliar e use as setas para navegar.</p>
      <div class="gallery">${gal.map((g) => `
        <button class="gallery__item" type="button" data-zoom="${esc(g.src)}" data-caption="${esc(g.caption || "")}" aria-label="Ampliar: ${esc(g.caption || p.name)}">
          <img src="${esc(g.src.replace(/\.webp$/, "-thumb.webp"))}" alt="${esc(g.caption || "Tela do site")}" loading="lazy" onerror="this.onerror=null;this.src='${esc(g.src)}'">
          ${g.caption ? `<span>${esc(g.caption)}</span>` : ""}
        </button>`).join("")}</div>` : "");

  const spec = [
    ["Projeto", p.name], ["Categoria", filled(p.category) ? p.category : ""], ["Local", p.location], ["Prazo", p.duration],
    ["Páginas", list(p.pages).join(", ")], ["Tecnologias", list(p.tech).join(", ")],
    ["Site", filled(p.url) ? `<a class="text-link" href="${esc(p.url)}" target="_blank" rel="noopener" data-track="view_live_site" data-track-label="${esc(p.slug)}">${esc(R.hostOf(p.url))}</a>` : ""],
  ].filter(([, v]) => filled(v));
  add("ficha", "Ficha técnica", `<dl class="spec">${spec.map(([k, v]) => `<div><dt>${k}</dt><dd>${k === "Site" ? v : esc(v)}</dd></div>`).join("")}</dl>`);

  const idx = ready.indexOf(p);
  const next = ready.length > 1 ? ready[(idx + 1) % ready.length] : null;

  const hasMobile = filled(p.imageMobile) || filled(p.video) || filled(p.url);

  root.innerHTML = `
    <header class="case-hero container">
      <a class="back-link" href="index.html#cases">← Todos os cases</a>
      <div class="case-hero__grid">
        <div>
          <div class="case__tags"><p class="eyebrow">${esc(filled(p.category) ? p.category : R.TYPES[p.type] || "Case")}</p>${R.conceptBadge(p)}</div>
          <h1 class="case-hero__title">${esc(p.name)}</h1>
        </div>
        <div class="case-hero__side">
          ${filled(p.description) ? `<p class="case-hero__desc">${esc(p.description)}</p>` : ""}
          <div class="case__actions">
            ${filled(p.url) ? `<a class="btn btn--primary" href="${esc(p.url)}" target="_blank" rel="noopener" data-track="view_live_site" data-track-label="${esc(p.slug)}">Abrir site ao vivo ${icon.arrowUp}</a>` : ""}
            ${hasMobile ? `<button class="btn btn--outline" type="button" id="open-phone">Ver no celular</button>` : ""}
          </div>
        </div>
      </div>
      ${facts.length ? `<dl class="facts facts--row">${facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
      ${p.isConcept ? `<p class="concept-note">Projeto conceito: marca fictícia criada para demonstrar soluções. Não representa um cliente real.</p>` : ""}
      <div class="case-hero__visual" data-video-host>
        ${filled(p.image) || filled(p.video)
          ? `<div class="zoomable" ${filled(p.image) && !filled(p.video) ? `role="button" tabindex="0" data-zoom="${esc(p.image)}" data-caption="${esc(p.name)}" aria-label="Ampliar tela do site"` : ""}>${R.browser(p, p.name, "frame--xl frame--tall")}</div>`
          : R.browser(p, p.name, "frame--xl frame--tall")}
      </div>
    </header>

    <div class="container case-body">
      <aside class="case-toc" aria-label="Neste case">
        <p class="case-toc__label">Neste case</p>
        <ol>${sections.map((s) => `<li><a href="#${s.id}">${esc(s.label)}</a></li>`).join("")}</ol>
      </aside>
      <div class="case-content">
        ${sections.map((s) => `
          <section class="case-section" id="${s.id}" aria-labelledby="${s.id}-t" data-reveal>
            <h2 class="case-section__title" id="${s.id}-t">${esc(s.label)}</h2>
            ${s.html}
          </section>`).join("")}
      </div>
    </div>

    ${next ? `
    <nav class="container next-case" aria-label="Próximo case">
      <a href="${caseHref(next)}" data-track="open_case" data-track-label="${esc(next.slug)}">
        <span class="next-case__label">Próximo case</span>
        <span class="next-case__name">${esc(next.name)} ${icon.arrow}</span>
      </a>
    </nav>` : ""}`;

  R.wireVideos(root);

  /* ---------- Índice lateral + progresso de leitura ---------- */
  R.spy($$(".case-toc a"));
  const bar = $("#read-progress");
  const content = $(".case-content");
  const onScroll = () => {
    if (!bar || !content) return;
    const r = content.getBoundingClientRect();
    const total = r.height - window.innerHeight * 0.5;
    const done = Math.min(1, Math.max(0, (window.innerHeight * 0.5 - r.top) / Math.max(1, total)));
    bar.style.transform = `scaleX(${done})`;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Antes e depois ---------- */
  const range = $("#compare-range");
  range?.addEventListener("input", () => range.closest(".compare").style.setProperty("--pos", `${range.value}%`));

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox");
  const zooms = $$("[data-zoom]");
  let cur = 0;
  const show = (i) => {
    cur = (i + zooms.length) % zooms.length;
    $("#lightbox-img").src = zooms[cur].dataset.zoom;
    $("#lightbox-img").alt = zooms[cur].dataset.caption || "";
    $("#lightbox-cap").textContent = zooms[cur].dataset.caption || "";
    lb.classList.toggle("is-single", zooms.length < 2);
  };
  zooms.forEach((z, i) => {
    const open = () => { show(i); lb.showModal(); };
    z.addEventListener("click", open);
    if (z.getAttribute("role") === "button") {
      z.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    }
  });
  lb?.addEventListener("click", (e) => {
    if (e.target === lb || e.target.closest("[data-close]")) lb.close();
    if (e.target.closest("[data-prev]")) show(cur - 1);
    if (e.target.closest("[data-next]")) show(cur + 1);
  });
  lb?.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });

  /* ---------- Ver no celular ---------- */
  const pd = $("#phone-dialog");
  $("#open-phone")?.addEventListener("click", () => {
    const screen = $("#phone-dialog-screen");
    const note = $("#phone-dialog-note");
    if (filled(p.video)) {
      screen.innerHTML = `<video src="${esc(p.video)}" autoplay muted loop playsinline controls aria-label="Demonstração no celular"></video>`;
      note.textContent = "Gravação real do site no celular.";
    } else if (filled(p.imageMobile)) {
      screen.innerHTML = `<div class="phone__scroll"><img src="${esc(p.imageMobile)}" alt="Site ${esc(p.name)} no celular"></div>`;
      note.textContent = "Role dentro do celular para ver a página inteira.";
    } else {
      screen.innerHTML = `<iframe src="${esc(p.url)}" title="Site ${esc(p.name)} no celular" loading="lazy"></iframe>`;
      note.innerHTML = `Site ao vivo. Se não carregar aqui, <a class="text-link" href="${esc(p.url)}" target="_blank" rel="noopener">abra em nova aba</a>.`;
    }
    pd.showModal();
  });
  pd?.addEventListener("click", (e) => {
    if (e.target === pd || e.target.closest("[data-close]")) pd.close();
  });
  pd?.addEventListener("close", () => { $("#phone-dialog-screen").innerHTML = ""; });

  R.initReveal();
})();
