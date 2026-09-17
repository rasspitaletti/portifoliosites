/* Raul Spitaletti — home. Os dados ficam em assets/js/config.js. */
(() => {
  "use strict";
  const R = window.RS;
  const { $, $$, esc, filled, list, isReady, caseHref, icon } = R;

  R.initChrome();
  R.setContacts();

  const featuredProject = R.projects.find((p) => p.featured) || R.projects[0];
  /* O destaque também aparece na grade de projetos e trabalhos */
  const gridProjects = R.projects.slice();

  /* ---------- Projeto em destaque ---------- */
  const featuredEl = $("#featured");
  if (featuredEl && featuredProject) {
    const p = featuredProject;
    const ready = filled(p.name);
    const name = ready ? p.name : "Case em destaque";
    const cat = filled(p.category) ? p.category : "Em preparação";
    const desc = filled(p.description)
      ? p.description
      : "Aqui entra o principal case do portfólio: o problema da clínica, as decisões de projeto, a demonstração no celular e os resultados medidos.";
    const facts = [
      p.location && ["Local", p.location],
      p.duration && ["Prazo", p.duration],
      list(p.pages).length && ["Páginas", String(list(p.pages).length)],
    ].filter(Boolean);
    const caseBtn = isReady(p)
      ? `<a class="btn btn--primary" href="${caseHref(p)}" data-track="open_case" data-track-label="${esc(p.slug)}">Ler o case ${icon.arrow}</a>`
      : `<span class="btn btn--primary is-disabled" aria-disabled="true">Case em breve</span>`;
    const liveBtn = filled(p.url)
      ? `<a class="btn btn--outline" href="${esc(p.url)}" target="_blank" rel="noopener" data-track="view_live_site" data-track-label="${esc(p.slug)}">Site ao vivo ${icon.arrowUp}</a>`
      : "";
    const video = filled(p.video)
      ? `<video src="${esc(p.video)}" ${filled(p.image) ? `poster="${esc(p.image)}"` : ""} muted loop playsinline controls preload="metadata" aria-label="Demonstração em vídeo de ${esc(name)}"></video>`
      : filled(p.imageMobile)
        ? `<img src="${esc(p.imageMobile)}" alt="Site ${esc(name)} no celular" loading="lazy">`
        : `<div class="phone__empty">${icon.play}<span>Demo no celular<br>em breve</span></div>`;

    featuredEl.classList.toggle("is-empty", !ready);
    featuredEl.innerHTML = `
      <div class="case__visual" data-video-host>
        ${R.browser(p, name, "frame--xl")}
        ${ready && !filled(p.video) && !filled(p.imageMobile) ? "" : `<div class="phone"><div class="phone__screen">${video}</div></div>`}
      </div>
      <div class="case__info">
        <div class="case__tags"><p class="eyebrow">${esc(cat)}</p>${R.conceptBadge(p)}</div>
        <h3 class="case__title">${esc(name)}</h3>
        <p class="case__desc">${esc(desc)}</p>
        ${facts.length ? `<dl class="facts">${facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
        ${R.techList(p.tech)}
        <div class="case__actions">${caseBtn}${liveBtn}</div>
      </div>`;
  }

  /* ---------- Grid + filtro ---------- */
  const grid = $("#projects-grid");
  let emptyCount = 0;
  const card = (p) => {
    const ready = filled(p.name);
    const slot = String(ready ? 0 : ++emptyCount).padStart(2, "0");
    const name = ready ? p.name : "Novo case";
    const cat = filled(p.category) ? p.category : `${R.TYPES[p.type] || "Projeto"} · espaço ${slot}`;
    const desc = filled(p.description) ? p.description : "Em breve, um novo projeto publicado aparecerá aqui.";
    const href = isReady(p) ? caseHref(p) : filled(p.url) ? p.url : "";
    const external = !isReady(p) && filled(p.url);
    const ext = external ? ` target="_blank" rel="noopener"` : "";
    const cta = isReady(p)
      ? `<a class="project__link" href="${href}" data-track="open_case" data-track-label="${esc(p.slug)}">Ver case ${icon.arrow}<span class="sr-only"> ${esc(name)}</span></a>`
      : external
        ? `<a class="project__link" href="${esc(href)}"${ext} data-track="view_live_site">Ver projeto ${icon.arrowUp}<span class="sr-only"> ${esc(name)} (abre em nova aba)</span></a>`
        : `<span class="project__link is-disabled" aria-disabled="true">Em breve</span>`;
    return `
      <article class="project ${ready ? "" : "is-empty"}" data-type="${esc(p.type || "outros")}" data-concept="${p.isConcept ? "1" : "0"}" data-reveal data-video-host>
        ${href ? `<a class="project__cover" href="${esc(href)}"${ext} tabindex="-1" aria-hidden="true">` : `<div class="project__cover">`}
          ${R.browser(p, name)}
        ${href ? "</a>" : "</div>"}
        <div class="project__body">
          <div class="project__meta"><p class="project__cat">${esc(cat)}</p>${R.conceptBadge(p)}</div>
          <h3 class="project__name">${esc(name)}</h3>
          <p class="project__desc">${esc(desc)}</p>
          ${R.techList(p.tech)}
          ${cta}
        </div>
      </article>`;
  };

  if (grid) {
    grid.innerHTML = gridProjects.map(card).join("");
    grid.classList.toggle("projects--2", gridProjects.length % 3 === 1 || gridProjects.length === 2);
    R.wireVideos(grid);
    R.wireVideos(featuredEl || document);

    const filters = $("#project-filters");
    if (filters) {
      const types = [...new Set(gridProjects.map((p) => p.type || "outros"))];
      const hasConcept = gridProjects.some((p) => p.isConcept);
      const opts = [["all", "Todos"], ...types.map((t) => [t, R.TYPES[t] || t])];
      if (hasConcept) opts.push(["concept", "Conceito"]);
      if (opts.length > 2) {
        filters.innerHTML = opts
          .map(([k, v], i) => `<button type="button" class="chip" data-filter="${esc(k)}" aria-pressed="${i === 0}">${esc(v)}</button>`)
          .join("");
        filters.hidden = false;
        filters.addEventListener("click", (e) => {
          const b = e.target.closest("[data-filter]");
          if (!b) return;
          $$("[data-filter]", filters).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
          const f = b.dataset.filter;
          let shown = 0;
          $$(".project", grid).forEach((c) => {
            const ok = f === "all" || (f === "concept" ? c.dataset.concept === "1" : c.dataset.type === f);
            c.hidden = !ok;
            if (ok) { shown++; c.classList.add("is-in"); }
          });
          const empty = $("#projects-empty");
          if (empty) empty.hidden = shown > 0;
        });
      }
    }
  }

  /* ---------- Depoimentos (só aparecem se existirem) ---------- */
  const tSection = $("#depoimentos");
  const tList = R.testimonials.filter((t) => t && filled(t.quote) && filled(t.name));
  if (tSection && tList.length) {
    $("#testimonials-list").innerHTML = tList.slice(0, 3).map((t) => {
      const linked = t.caseSlug && R.projects.find((p) => p.slug === t.caseSlug && isReady(p));
      return `
      <figure class="quote" data-reveal>
        ${filled(t.video) ? `<video class="quote__video" src="${esc(t.video)}" controls playsinline preload="metadata" aria-label="Depoimento em vídeo de ${esc(t.name)}"></video>` : ""}
        <blockquote><p>“${esc(t.quote)}”</p></blockquote>
        <figcaption>
          ${filled(t.photo) ? `<img src="${esc(t.photo)}" alt="" width="48" height="48" loading="lazy">` : `<span class="quote__initial" aria-hidden="true">${esc(t.name.trim()[0])}</span>`}
          <span><strong>${esc(t.name)}</strong><small>${esc([t.role, t.clinic, t.city].filter(Boolean).join(" · "))}</small></span>
        </figcaption>
        ${linked ? `<a class="text-link" href="${caseHref(linked)}">Ver o case ${icon.arrow}</a>` : ""}
      </figure>`;
    }).join("");
    tSection.hidden = false;
    $$('[href="#depoimentos"]').forEach((a) => (a.closest("li") || a).hidden = false);
  }

  /* ---------- FAQ: investimento ---------- */
  const price = $("#faq-price");
  if (price) {
    price.textContent = filled(R.cfg.priceFrom)
      ? `Os projetos partem de ${R.cfg.priceFrom}. O valor final depende do número de páginas e das integrações. Envio a proposta por escrito antes de começar.`
      : "Cada orçamento é feito sob medida, conforme o número de páginas e as integrações necessárias. Envio a proposta por escrito antes de começar, sem compromisso.";
  }

  /* ---------- Parallax discreto da faixa de imagem ---------- */
  const bandImg = $(".band__img");
  if (bandImg && !R.reduceMotion) {
    let ticking = false;
    const move = () => {
      const r = bandImg.parentElement.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        const k = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        bandImg.style.setProperty("--parallax", `${(k * -40).toFixed(1)}px`);
      }
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(move); } }, { passive: true });
    move();
  }

  R.spy($$('.nav a[href^="#"]'));
  R.initReveal();
})();
