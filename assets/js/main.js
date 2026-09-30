/* Portfolio renderer — reads window.PORTFOLIO (assets/js/data.js). */
$(function () {
  "use strict";
  const D = window.PORTFOLIO;
  const P = D.profile;

  /* ---------------- helpers ---------------- */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (tech, extra = "") => `<i class="${esc(D.techIcons[tech] || "fa-solid fa-code")} ${extra}" aria-hidden="true"></i>`;
  const chip = (tech, cls = "", attrs = "") => `<span class="chip ${cls}" ${attrs}>${icon(tech)}${esc(tech)}</span>`;
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const toDate = (ym) => (!ym || /present/i.test(ym) ? new Date() : new Date(+ym.slice(0, 4), +ym.slice(5, 7) - 1, 1));
  const fmt = (ym) => (/present/i.test(ym) ? "Present" : `${MONTHS[+ym.slice(5, 7) - 1]} ${ym.slice(0, 4)}`);
  const months = (a, b) => { const s = toDate(a), e = toDate(b); return Math.max(1, (e.getFullYear() - s.getFullYear()) * 12 + e.getMonth() - s.getMonth() + 1); };
  const dur = (m) => { const y = Math.floor(m / 12), r = m % 12; return [y && `${y} yr${y > 1 ? "s" : ""}`, r && `${r} mo${r > 1 ? "s" : ""}`].filter(Boolean).join(" ") || "1 mo"; };
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const GRADS = [["#6366f1", "#06b6d4"], ["#f43f5e", "#f59e0b"], ["#10b981", "#0ea5e9"], ["#8b5cf6", "#ec4899"], ["#0ea5e9", "#6366f1"], ["#f59e0b", "#ef4444"]];
  const grad = (i) => `linear-gradient(135deg, ${GRADS[i % GRADS.length][0]}, ${GRADS[i % GRADS.length][1]})`;
  const initials = (e) => { const s = e.short || e.company; return ((s.match(/[A-Z]/g) || [s[0]]).slice(0, 2).join("")).toUpperCase(); };

  const careerMonths = months(P.careerStart || D.experience[D.experience.length - 1].start, "Present");
  const careerYears = Math.floor(careerMonths / 12);

  // Years of hands-on use per technology, derived from experience tech stacks.
  const ALIAS = { "Spring": ["Spring Boot"], "TypeScript": ["Angular"], "JavaScript": ["Angular"], "HTML5": ["Angular"], "CSS3": ["Angular"] };
  const techMonths = {};
  D.experience.forEach((e) => { const m = months(e.start, e.end); e.tech.forEach((t) => (techMonths[t] = (techMonths[t] || 0) + m)); });
  const skillMonths = (s) => Math.min(careerMonths, techMonths[s] || Math.max(0, ...(ALIAS[s] || []).map((a) => techMonths[a] || 0)) || 0);

  /* ---------------- basics ---------------- */
  document.title = `${P.name} | ${P.headline}`;
  $("#hero-name").text(P.name);
  $("#nav-name").text(P.name.split(" ")[0]);
  $("#nav-initials").text(P.initials);
  $("#footer-name").text(`${P.name} · ${P.headline}`);
  $("#hero-tagline").text(P.tagline);
  $("#hero-location").text(P.location);
  $("#hero-timezone").text(P.relocation);
  $("#float-exp").text(`${careerYears}+ yrs`);
  $("#year").text(new Date().getFullYear());
  if (P.resumeUrl) $("#hero-resume, #nav-resume").attr("href", P.resumeUrl);
  else $("#hero-resume, #nav-resume").remove();
  const socials = P.socials.map((s) => `<a class="social-btn" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}" title="${esc(s.label)}"><i class="${esc(s.icon)}"></i></a>`).join("");
  $("#hero-socials, #footer-socials").html(socials);
  $("#avatar").html(P.avatar ? `<img src="${esc(P.avatar)}" alt="${esc(P.name)}" class="w-full h-full object-cover">` : `<span class="avatar-initials gradient-text">${esc(P.initials)}</span>`);

  // Orbiting tech icons around the avatar
  const orbitTech = ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Docker", "AWS", "Angular", "NestJS"].filter((t) => D.techIcons[t]);
  $("#orbit").html(orbitTech.map((t, i) => {
    const a = (i / orbitTech.length) * 2 * Math.PI;
    return `<div class="planet" style="left:${50 + 50 * Math.cos(a)}%;top:${50 + 50 * Math.sin(a)}%" title="${esc(t)}">${icon(t)}</div>`;
  }).join(""));

  // Typing effect
  (function type() {
    const el = $("#typed"); let r = 0, c = 0, del = false;
    (function tick() {
      const word = P.roles[r];
      el.text(word.slice(0, c));
      if (!del && c === word.length) { del = true; return setTimeout(tick, 1800); }
      if (del && c === 0) { del = false; r = (r + 1) % P.roles.length; }
      c += del ? -1 : 1;
      setTimeout(tick, del ? 35 : 75);
    })();
  })();

  /* ---------------- open-to-work banner ---------------- */
  const O = D.openToWork;
  if (O && O.enabled) {
    $("#otw-title").text("Open to Work");
    $("#hero-status").text(O.headline);
    const items = [`<span><i class="fa-solid fa-earth-americas"></i><b>${esc(O.headline)}</b></span>`,
      `<span><i class="fa-solid fa-briefcase"></i>${O.roles.map(esc).join(" · ")}</span>`,
      `<span><i class="fa-solid fa-location-dot"></i>${O.regions.map(esc).join(" · ")}</span>`,
      `<span><i class="fa-solid fa-house-laptop"></i>${O.workModes.map(esc).join(" · ")}</span>`,
      O.workAuthorization && `<span><i class="fa-solid fa-passport"></i>${esc(O.workAuthorization)}</span>`].filter(Boolean).join("");
    $("#otw-track").html(items + items);
    try { if (sessionStorage.getItem("otw-closed")) $("#otw-banner").hide(); } catch (e) {}
    $("#otw-close").on("click", () => { $("#otw-banner").slideUp(250); try { sessionStorage.setItem("otw-closed", "1"); } catch (e) {} });
  } else { $("#otw-banner").remove(); }

  /* ---------------- about ---------------- */
  $("#about-summary").html(P.summary.map((p) => `<p>${esc(p)}</p>`).join(""));
  $("#about-highlights").html(P.highlights.map((h) => `<li class="flex items-start gap-3 p-3 rounded-xl bg-brand-500/5 border border-brand-500/10"><i class="fa-solid fa-circle-check text-emerald-500 mt-1"></i><span class="text-sm">${esc(h)}</span></li>`).join(""));
  $("#about-interests").html((D.interests || []).map((i) => `<span class="chip"><i class="fa-solid fa-heart"></i>${esc(i)}</span>`).join(""));
  const current = D.experience[0];
  const facts = [
    ["fa-solid fa-user-tie", "Current role", `${current.role} @ ${current.short || current.company}`],
    ["fa-solid fa-location-dot", "Based in", P.location],
    ["fa-solid fa-plane-departure", "Relocation", P.relocation],
    O && O.workAuthorization && ["fa-solid fa-passport", "Work authorization", O.workAuthorization],
    O && O.noticePeriod && ["fa-solid fa-hourglass-half", "Notice period", O.noticePeriod],
    ["fa-solid fa-graduation-cap", "Education", D.education[0] && D.education[0].degree.replace("Bachelor of Technology", "B.Tech")],
    ["fa-solid fa-language", "Languages", (D.languages || []).map((l) => `${l.name} (${l.level})`).join(", ")],
    ["fa-solid fa-envelope", "Email", `<a class="hover:text-brand-500" href="mailto:${esc(P.email)}">${esc(P.email)}</a>`, true]
  ].filter((f) => f && f[2]);
  $("#about-facts").html(facts.map(([ic, k, v, raw]) => `<div class="fact flex gap-3"><i class="${ic} text-brand-500 w-5 mt-1"></i><div><dt>${k}</dt><dd>${raw ? v : esc(v)}</dd></div></div>`).join(""));

  const allTech = new Set(D.skills.flatMap((s) => s.items));
  const stats = [
    { v: careerYears, s: "+", l: "Years Experience", i: "fa-solid fa-calendar-check" },
    { v: new Set(D.experience.map((e) => e.company)).size, s: "", l: "Companies", i: "fa-solid fa-building" },
    { v: D.projects.length, s: "", l: "Key Products Built", i: "fa-solid fa-rocket" },
    { v: allTech.size, s: "+", l: "Technologies & Practices", i: "fa-solid fa-microchip" }
  ];
  $("#stats").html(stats.map((s, i) => `<div class="reveal zoom card stat" style="transition-delay:${i * 90}ms"><i class="${s.i} text-2xl text-brand-500"></i><div class="num gradient-text" data-count="${s.v}" data-suffix="${s.s}">0</div><div class="text-sm text-slate-500 dark:text-slate-400">${s.l}</div></div>`).join(""));

  /* ---------------- skills ---------------- */
  const cats = ["All", ...D.skills.map((s) => s.category)];
  $("#skill-tabs").html(cats.map((c, i) => {
    const sk = D.skills.find((s) => s.category === c);
    return `<button class="chip btn ${i === 0 ? "active" : ""}" data-cat="${esc(c)}"><i class="${sk ? esc(sk.icon) : "fa-solid fa-border-all"}"></i>${esc(c)}</button>`;
  }).join(""));
  function renderSkills(cat) {
    const list = D.skills.filter((s) => cat === "All" || s.category === cat).flatMap((s) => s.items.map((n) => ({ n, c: s.category })));
    $("#skill-grid").html(list.map((s, i) => {
      const m = skillMonths(s.n);
      const pct = m ? Math.min(100, Math.round((m / careerMonths) * 100)) : 0;
      const meta = m ? `<div class="mt-3 bar"><span data-w="${Math.max(pct, 12)}"></span></div><div class="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">${dur(m)} hands-on</div>`
        : `<div class="mt-3 text-[11px] font-medium text-emerald-600 dark:text-emerald-400"><i class="fa-solid fa-check mr-1"></i>Hands-on</div>`;
      return `<div class="card skill-card pop-in" style="animation-delay:${i * 30}ms" title="${esc(s.c)}"><div class="icon">${icon(s.n)}</div><div class="mt-2 text-sm font-semibold text-slate-900 dark:text-white leading-tight">${esc(s.n)}</div>${meta}</div>`;
    }).join(""));
    requestAnimationFrame(() => setTimeout(() => $("#skill-grid .bar span").each(function () { this.style.width = this.dataset.w + "%"; }), 80));
  }
  let skillsShown = false;
  $("#skill-tabs").on("click", ".chip", function () {
    $("#skill-tabs .chip").removeClass("active"); $(this).addClass("active"); renderSkills($(this).data("cat"));
  });
  const marq = [...allTech].filter((t) => D.techIcons[t] && D.techIcons[t].startsWith("devicon")).map((t) => `<i class="${esc(D.techIcons[t])}" title="${esc(t)}"></i>`).join("");
  $("#tech-marquee").html(marq + marq);

  /* ---------------- experience ---------------- */
  const logoHtml = (e, i) => {
    const fallback = `<span class="company-logo" style="background:${grad(i)}">${esc(initials(e))}</span>`;
    const src = e.logo || (e.domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(e.domain)}&sz=128` : "");
    return src ? `<span class="company-logo" style="background:#fff"><img src="${esc(src)}" alt="${esc(e.company)} logo" loading="lazy" data-fallback="${esc(fallback)}"></span>` : fallback;
  };
  const bindLogoFallbacks = (root) => $(root).find("img[data-fallback]").each(function () {
    const img = this; const swap = () => $(img).parent().replaceWith(img.dataset.fallback);
    if (img.complete && img.naturalWidth === 0) swap(); else img.onerror = swap;
  });

  $("#timeline").html(D.experience.map((e, i) => {
    const m = months(e.start, e.end), isCur = /present/i.test(e.end);
    const linked = (e.projects || []).map((id) => D.projects.find((p) => p.id === id)).filter(Boolean);
    return `<div class="tl-item ${isCur ? "current" : ""}" id="${esc(e.id)}" data-tech='${esc(JSON.stringify(e.tech))}'>
      <div class="tl-dot">${logoHtml(e, i)}</div>
      <article class="reveal ${i % 2 ? "from-right" : "from-left"} card exp-card p-6">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 class="font-display text-xl font-bold text-slate-900 dark:text-white">${esc(e.role)}</h3>
            <div class="mt-1 font-medium text-brand-600 dark:text-brand-400"><i class="fa-regular fa-building mr-1.5"></i>${esc(e.company)}</div>
          </div>
          ${isCur ? `<span class="chip !bg-emerald-500/15 !text-emerald-600 dark:!text-emerald-300"><span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>Current</span>` : ""}
          ${e.type ? `<span class="chip !bg-amber-500/15 !text-amber-600 dark:!text-amber-300"><i class="fa-solid fa-user-graduate"></i>${esc(e.type)}</span>` : ""}
        </div>
        <div class="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
          <span><i class="fa-regular fa-calendar mr-1.5"></i>${e.dates ? esc(e.dates) : `${fmt(e.start)} – ${fmt(e.end)}`}</span>
          <span><i class="fa-regular fa-clock mr-1.5"></i>${dur(m)}</span>
          <span><i class="fa-solid fa-location-dot mr-1.5"></i>${esc(e.location)}</span>
        </div>
        <p class="mt-4 leading-relaxed">${esc(e.summary)}</p>
        ${e.achievements.length ? `<ul class="ach mt-4 space-y-2 text-sm">${e.achievements.map((a, j) => `<li class="${j > 2 ? "ach-more" : ""}">${esc(a)}</li>`).join("")}</ul>` : ""}
        ${e.achievements.length > 3 ? `<button class="toggle-ach mt-3 text-sm font-semibold text-brand-500 hover:underline"><span>Show ${e.achievements.length - 3} more</span> <i class="fa-solid fa-chevron-down text-xs transition"></i></button>` : ""}
        ${e.tech.length ? `<div class="mt-5"><div class="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-2">Tech stack</div>
          <div class="flex flex-wrap gap-2">${e.tech.map((t) => chip(t, "btn exp-chip", `data-tech="${esc(t)}"`)).join("")}</div></div>` : ""}
        ${linked.length ? `<div class="mt-5 pt-4 border-t border-slate-200/70 dark:border-white/5 flex flex-wrap items-center gap-2"><span class="text-xs uppercase tracking-wider font-semibold text-slate-500 mr-1"><i class="fa-solid fa-link mr-1"></i>Linked projects</span>
          ${linked.map((p) => `<button class="open-project btn-ghost !py-1.5 !px-3 text-sm" data-id="${esc(p.id)}"><i class="${esc(p.icon)}"></i>${esc(p.title)}</button>`).join("")}</div>` : ""}
      </article></div>`;
  }).join(""));
  bindLogoFallbacks("#timeline");

  $("#timeline").on("click", ".toggle-ach", function () {
    const card = $(this).closest(".exp-card").toggleClass("expanded"), open = card.hasClass("expanded");
    const n = card.find(".ach-more").length;
    $(this).find("span").text(open ? "Show less" : `Show ${n} more`);
    $(this).find("i").css("transform", open ? "rotate(180deg)" : "");
  });

  // Experience filter
  const countBy = (arr) => arr.reduce((m, t) => ((m[t] = (m[t] || 0) + 1), m), {});
  const expCounts = countBy(D.experience.flatMap((e) => e.tech));
  const expTechs = Object.keys(expCounts).sort((a, b) => expCounts[b] - expCounts[a] || a.localeCompare(b));
  $("#exp-filters").html(expTechs.map((t) => `<button class="chip btn" data-tech="${esc(t)}">${icon(t)}${esc(t)}<span class="count">${expCounts[t]}</span></button>`).join(""));
  const expSel = new Set();
  function applyExp() {
    let shown = 0;
    $(".tl-item").each(function () {
      const tech = JSON.parse(this.dataset.tech);
      const ok = !expSel.size || tech.some((t) => expSel.has(t));
      $(this).toggleClass("hide", !ok); if (ok) shown++;
      $(this).find(".exp-chip").each(function () { $(this).toggleClass("match", expSel.has(this.dataset.tech)); });
    });
    $("#exp-filters .chip").each(function () { $(this).toggleClass("active", expSel.has(this.dataset.tech)); });
    $("#exp-count").text(expSel.size ? `${shown} of ${D.experience.length} roles` : `${D.experience.length} roles · ${dur(careerMonths)}`);
    $("#exp-clear").toggleClass("hidden", !expSel.size);
    $("#exp-empty").toggleClass("hidden", shown > 0);
    $(".tl-item:not(.hide) .reveal").addClass("in");
  }
  const toggleExp = (t) => { expSel.has(t) ? expSel.delete(t) : expSel.add(t); applyExp(); };
  $("#exp-filters").on("click", ".chip", function () { toggleExp(this.dataset.tech); });
  $("#timeline").on("click", ".exp-chip", function () { toggleExp(this.dataset.tech); document.getElementById("exp-filters").scrollIntoView({ behavior: "smooth", block: "center" }); });
  $("#exp-clear").on("click", () => { expSel.clear(); applyExp(); });
  applyExp();

  /* ---------------- projects ---------------- */
  const projIndex = (p) => D.projects.indexOf(p);
  const projDates = (p) => `${fmt(p.start)} – ${fmt(p.end)} · ${dur(months(p.start, p.end))}`;
  const PROJ_LIMIT = 6;
  const catCounts = countBy(D.projects.map((p) => p.category));
  $("#proj-cats").html(["All", ...Object.keys(catCounts)].map((c, i) => `<button class="chip btn ${i === 0 ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}<span class="count">${c === "All" ? D.projects.length : catCounts[c]}</span></button>`).join(""));
  const projTechCounts = countBy(D.projects.flatMap((p) => p.tech));
  $("#proj-techs").html(Object.keys(projTechCounts).sort((a, b) => projTechCounts[b] - projTechCounts[a] || a.localeCompare(b))
    .map((t) => `<button class="chip btn" data-tech="${esc(t)}">${icon(t)}${esc(t)}<span class="count">${projTechCounts[t]}</span></button>`).join(""));

  $("#proj-grid").html(D.projects.map((p) => {
    const i = projIndex(p), extra = p.tech.length - 6;
    return `<article class="reveal zoom card proj-card" data-id="${esc(p.id)}" style="transition-delay:${(i % 3) * 90}ms">
      <div class="proj-cover" style="background:${grad(i)}">
        <span class="shape" style="width:160px;height:160px;right:-40px;top:-60px"></span><span class="shape" style="width:90px;height:90px;left:-20px;bottom:-30px"></span>
        <i class="${esc(p.icon)} main"></i>
        ${p.featured ? `<span class="absolute top-3 left-3 chip !bg-white/90 !text-slate-900"><i class="fa-solid fa-star text-amber-500"></i>Featured</span>` : ""}
        <span class="absolute top-3 right-3 chip !bg-black/25 !text-white">${esc(p.category)}</span>
      </div>
      <div class="p-6 flex flex-col flex-1">
        <h3 class="font-display text-lg font-bold text-slate-900 dark:text-white">${esc(p.title)}</h3>
        <div class="mt-1 text-sm text-brand-600 dark:text-brand-400"><i class="fa-solid fa-user-gear mr-1"></i>${esc(p.role)} · ${esc(p.company)}</div>
        ${p.start ? `<div class="mt-1.5 text-xs text-slate-500 dark:text-slate-400"><i class="fa-regular fa-calendar mr-1"></i>${projDates(p)}</div>` : ""}
        <p class="mt-3 text-sm leading-relaxed flex-1">${esc(p.description)}</p>
        <div class="mt-4 flex flex-wrap gap-1.5">${p.tech.slice(0, 6).map((t) => chip(t, "btn proj-chip", `data-tech="${esc(t)}"`)).join("")}${extra > 0 ? `<span class="chip">+${extra}</span>` : ""}</div>
        <div class="mt-5 flex flex-wrap gap-2">
          <button class="open-project btn-primary !py-2 !px-4 text-sm" data-id="${esc(p.id)}"><i class="fa-solid fa-expand"></i>Details</button>
          ${p.experienceId ? `<a href="#${esc(p.experienceId)}" class="btn-ghost !py-2 !px-4 text-sm"><i class="fa-solid fa-briefcase"></i>Role</a>` : ""}
          ${p.links.live ? `<a href="${esc(p.links.live)}" target="_blank" rel="noopener" class="icon-btn" title="Live demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ""}
          ${p.links.github ? `<a href="${esc(p.links.github)}" target="_blank" rel="noopener" class="icon-btn" title="Source code"><i class="fa-brands fa-github"></i></a>` : ""}
        </div>
      </div></article>`;
  }).join(""));

  const pf = { cat: "All", techs: new Set(), q: "", all: false };
  function applyProj() {
    const filtered = pf.cat !== "All" || pf.techs.size || pf.q;
    let matches = 0, shown = 0;
    D.projects.forEach((p) => {
      const hay = [p.title, p.company, p.role, p.description, p.category, ...p.tech, ...(p.highlights || [])].join(" ").toLowerCase();
      const ok = (pf.cat === "All" || p.category === pf.cat) && (!pf.techs.size || p.tech.some((t) => pf.techs.has(t))) && (!pf.q || hay.includes(pf.q));
      // Without filters, only the first PROJ_LIMIT show until "Show all" is clicked.
      const visible = ok && (filtered || pf.all || matches < PROJ_LIMIT);
      if (ok) matches++;
      const card = $(`.proj-card[data-id="${p.id}"]`);
      if (visible) { shown++; if (card.hasClass("hide")) card.removeClass("hide").addClass("in").css("opacity", 0).animate({ opacity: 1 }, 300); }
      else card.addClass("hide");
      card.find(".proj-chip").each(function () { $(this).toggleClass("match", pf.techs.has(this.dataset.tech)); });
    });
    $("#proj-cats .chip").each(function () { $(this).toggleClass("active", this.dataset.cat === pf.cat); });
    $("#proj-techs .chip").each(function () { $(this).toggleClass("active", pf.techs.has(this.dataset.tech)); });
    $("#proj-count").text(`Showing ${shown} of ${D.projects.length}`);
    $("#proj-clear").toggleClass("hidden", !filtered);
    $("#proj-empty").toggleClass("hidden", shown > 0);
    const hidden = matches - shown;
    $("#proj-more-wrap").toggleClass("hidden", filtered || D.projects.length <= PROJ_LIMIT);
    $("#proj-more").html(hidden > 0 ? `<i class="fa-solid fa-chevron-down"></i>Show all projects (${hidden} more)` : `<i class="fa-solid fa-chevron-up"></i>Show fewer`);
  }
  $("#proj-more").on("click", () => {
    pf.all = !pf.all; applyProj();
    if (!pf.all) document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  });
  $("#proj-cats").on("click", ".chip", function () { pf.cat = this.dataset.cat; applyProj(); });
  const toggleProjTech = (t) => { pf.techs.has(t) ? pf.techs.delete(t) : pf.techs.add(t); applyProj(); };
  $("#proj-techs").on("click", ".chip", function () { toggleProjTech(this.dataset.tech); });
  $("#proj-grid").on("click", ".proj-chip", function () { toggleProjTech(this.dataset.tech); });
  let qTimer; $("#proj-search").on("input", function () { clearTimeout(qTimer); qTimer = setTimeout(() => { pf.q = this.value.trim().toLowerCase(); applyProj(); }, 150); });
  $("#proj-clear").on("click", () => { pf.cat = "All"; pf.techs.clear(); pf.q = ""; $("#proj-search").val(""); applyProj(); });
  applyProj();

  /* ---------------- project modal ---------------- */
  let lastFocus = null;
  function openProject(id) {
    const p = D.projects.find((x) => x.id === id); if (!p) return;
    const exp = D.experience.find((e) => e.id === p.experienceId);
    $("#modal-body").html(`
      <div class="proj-cover !h-44" style="background:${grad(projIndex(p))}">
        <span class="shape" style="width:220px;height:220px;right:-60px;top:-90px"></span><i class="${esc(p.icon)} main"></i>
        <button class="modal-close absolute top-4 right-4 icon-btn !bg-white/90 !text-slate-900" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="p-6 sm:p-8">
        <span class="chip">${esc(p.category)}</span>
        <h3 id="modal-title" class="mt-3 font-display text-2xl font-bold text-slate-900 dark:text-white">${esc(p.title)}</h3>
        <div class="mt-1 text-brand-600 dark:text-brand-400 font-medium">${esc(p.role)} · ${esc(p.company)}</div>
        ${p.start ? `<div class="mt-1 text-sm text-slate-500 dark:text-slate-400"><i class="fa-regular fa-calendar mr-1.5"></i>${projDates(p)}</div>` : ""}
        <p class="mt-4 leading-relaxed">${esc(p.description)}</p>
        ${(p.highlights || []).length ? `<h4 class="mt-6 font-semibold text-slate-900 dark:text-white">Highlights</h4>
        <ul class="mt-2 space-y-2 text-sm">${p.highlights.map((h) => `<li class="flex gap-2"><i class="fa-solid fa-circle-check text-emerald-500 mt-0.5"></i>${esc(h)}</li>`).join("")}</ul>` : ""}
        <h4 class="mt-6 font-semibold text-slate-900 dark:text-white">Tech stack</h4>
        <div class="mt-2 flex flex-wrap gap-2">${p.tech.map((t) => chip(t)).join("")}</div>
        <div class="mt-7 flex flex-wrap gap-3">
          ${exp ? `<a href="#${esc(exp.id)}" class="btn-primary modal-close-link"><i class="fa-solid fa-briefcase"></i>View role at ${esc(exp.short || exp.company)}</a>` : ""}
          ${p.links.live ? `<a href="${esc(p.links.live)}" target="_blank" rel="noopener" class="btn-ghost"><i class="fa-solid fa-arrow-up-right-from-square"></i>Live</a>` : ""}
          ${p.links.github ? `<a href="${esc(p.links.github)}" target="_blank" rel="noopener" class="btn-ghost"><i class="fa-brands fa-github"></i>Code</a>` : ""}
          <a href="#contact" class="btn-ghost modal-close-link"><i class="fa-solid fa-comments"></i>Discuss this project</a>
        </div>
      </div>`);
    lastFocus = document.activeElement;
    $("#modal").removeClass("hidden").addClass("open"); $("body").addClass("modal-open");
    $("#modal .modal-close").trigger("focus");
  }
  function closeModal() { $("#modal").addClass("hidden").removeClass("open"); $("body").removeClass("modal-open"); if (lastFocus) lastFocus.focus(); }
  $(document).on("click", ".open-project", function () { openProject(this.dataset.id); });
  $("#modal").on("click", ".modal-backdrop, .modal-close, .modal-close-link", closeModal);
  $("#modal").on("click", function (e) { if (e.target === this.children[1]) closeModal(); });
  $(document).on("keydown", (e) => { if (e.key === "Escape" && !$("#modal").hasClass("hidden")) closeModal(); });

  /* ---------------- education ---------------- */
  $("#edu-list").html(D.education.map((ed, i) => `
    <div class="reveal ${i % 2 ? "from-right" : "from-left"} card exp-card p-6 flex gap-5 ${D.education.length === 1 ? "md:col-span-2 max-w-3xl mx-auto w-full" : ""}">
      <div class="shrink-0 w-14 h-14 rounded-2xl grid place-items-center text-2xl text-white" style="background:${grad(i)}"><i class="${esc(ed.icon)}"></i></div>
      <div>
        <h3 class="font-display text-lg font-bold text-slate-900 dark:text-white">${esc(ed.degree)}</h3>
        <div class="mt-1 text-brand-600 dark:text-brand-400 font-medium">${esc(ed.school)}</div>
        <div class="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
          <span><i class="fa-regular fa-calendar mr-1.5"></i>${esc(ed.start)} – ${esc(ed.end)}</span>
          <span><i class="fa-solid fa-location-dot mr-1.5"></i>${esc(ed.location)}</span>
          ${ed.grade ? `<span><i class="fa-solid fa-star mr-1.5"></i>${esc(ed.grade)}</span>` : ""}
        </div>
        ${ed.details.length ? `<ul class="mt-3 text-sm space-y-1 list-disc pl-5">${ed.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
      </div>
    </div>`).join(""));

  /* ---------------- certifications / achievements / languages ---------------- */
  const certs = D.certifications || [], achs = D.achievements || [];
  $("#cert-list").html(certs.map((c, i) => `
    <a ${c.url ? `href="${esc(c.url)}" target="_blank" rel="noopener"` : ""} class="reveal from-left card exp-card p-5 flex items-center gap-4" style="transition-delay:${i * 80}ms">
      <div class="shrink-0 w-12 h-12 rounded-xl grid place-items-center text-xl text-white" style="background:${grad(i)}"><i class="${esc(c.icon)}"></i></div>
      <div class="flex-1"><div class="font-semibold text-slate-900 dark:text-white">${esc(c.name)}</div><div class="text-sm text-slate-500">${esc(c.issuer)}</div><div class="text-xs text-slate-400 mt-0.5"><i class="fa-regular fa-calendar mr-1"></i>${esc(c.validity || c.year)}</div></div>
      ${c.url ? `<i class="fa-solid fa-arrow-up-right-from-square text-slate-400"></i>` : ""}</a>`).join(""));
  $("#ach-list").html(achs.map((a, i) => `
    <div class="reveal from-right card exp-card p-5 flex items-center gap-4" style="transition-delay:${i * 80}ms">
      <div class="shrink-0 w-12 h-12 rounded-xl grid place-items-center text-xl text-white bg-gradient-to-br from-amber-400 to-orange-500"><i class="${esc(a.icon)}"></i></div>
      <div><div class="font-semibold text-slate-900 dark:text-white">${esc(a.title)}</div><div class="text-sm text-slate-500">${esc(a.org)} · ${esc(a.year)}</div></div></div>`).join(""));
  $("#lang-list").html((D.languages || []).map((l) => `<span class="chip !py-2 !px-4"><i class="fa-solid fa-comment-dots"></i>${esc(l.name)} · <b>${esc(l.level)}</b></span>`).join(""));
  if (!certs.length) $("#cert-list").parent().remove();
  if (!achs.length) $("#ach-list").prevAll("h3").first().remove(), $("#ach-list").remove();
  if (!certs.length && !achs.length) $("#certifications").remove();

  /* ---------------- testimonials ---------------- */
  const T = D.testimonials || [];
  if (!T.length) $("#testimonials").remove();
  else {
    let ti = 0, tTimer;
    $("#testi-dots").html(T.map((_, i) => `<button class="dot-btn" data-i="${i}" aria-label="Recommendation ${i + 1}"></button>`).join(""));
    const showT = (i) => {
      ti = (i + T.length) % T.length; const t = T[ti];
      $("#testi-slide").css("opacity", 0);
      setTimeout(() => {
        $("#testi-slide").html(`<p class="text-lg sm:text-xl leading-relaxed italic text-slate-700 dark:text-slate-200">“${esc(t.quote)}”</p>
          <div class="mt-6 font-semibold text-slate-900 dark:text-white">${esc(t.name)}</div><div class="text-sm text-slate-500">${esc(t.title)}</div>`).css("opacity", 1);
      }, 250);
      $("#testi-dots .dot-btn").removeClass("active").eq(ti).addClass("active");
      clearTimeout(tTimer); tTimer = setTimeout(() => showT(ti + 1), 7000);
    };
    $("#testi-dots").on("click", ".dot-btn", function () { showT(+this.dataset.i); });
    showT(0);
  }

  /* ---------------- nav: numbering, links, mobile ---------------- */
  $("main > section[id]:not(#home)").each(function (i) {
    const eb = $(this).find(".eyebrow").first(); eb.text(eb.text().replace(/^\d+/, String(i + 1).padStart(2, "0")));
  });
  $("#nav-links a").each(function () { if (!$($(this).attr("href")).length) $(this).parent().remove(); });
  $("#mobile-menu ul").html($("#nav-links").html());
  $("#mobile-menu .nav-link").addClass("block");
  $("#menu-toggle").on("click", () => $("#mobile-menu").slideToggle(200));
  $("#mobile-menu").on("click", "a", () => $("#mobile-menu").slideUp(200));

  $("#theme-toggle").on("click", () => {
    const dark = document.documentElement.classList.toggle("dark");
    store.set("theme", dark ? "dark" : "light");
  });

  /* ---------------- contact ---------------- */
  const cInfo = [
    { i: "fa-solid fa-envelope", k: "Email", v: P.email, href: `mailto:${P.email}`, copy: P.email },
    P.phone && { i: "fa-solid fa-phone", k: "Phone / WhatsApp", v: P.phone, href: `tel:${P.phone.replace(/\s/g, "")}`, copy: P.phone },
    ...P.socials.filter((s) => !/^mailto:/.test(s.url)).map((s) => ({ i: s.icon, k: s.label, v: s.url.replace(/^https?:\/\/(www\.)?/, ""), href: s.url })),
    { i: "fa-solid fa-location-dot", k: "Location", v: `${P.location} · ${P.relocation}` }
  ].filter(Boolean);
  $("#contact-info").html(cInfo.map((c) => `
    <div class="card exp-card p-4 flex items-center gap-4">
      <div class="shrink-0 w-12 h-12 rounded-xl grid place-items-center text-lg text-white" style="background:${grad(0)}"><i class="${esc(c.i)}"></i></div>
      <div class="min-w-0 flex-1"><div class="text-xs uppercase tracking-wider text-slate-500 font-semibold">${esc(c.k)}</div>
        ${c.href ? `<a href="${esc(c.href)}" ${/^http/.test(c.href) ? 'target="_blank" rel="noopener"' : ""} class="block truncate font-medium text-slate-900 dark:text-white hover:text-brand-500">${esc(c.v)}</a>` : `<div class="font-medium text-slate-900 dark:text-white">${esc(c.v)}</div>`}</div>
      ${c.copy ? `<button class="icon-btn copy-btn" data-copy="${esc(c.copy)}" title="Copy"><i class="fa-regular fa-copy"></i></button>` : ""}
    </div>`).join("") + (O && O.enabled ? `
    <div class="card p-5 border-emerald-500/30">
      <div class="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400"><span class="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>${esc(O.headline)}</div>
      <div class="mt-3 flex flex-wrap gap-2">${O.regions.map((r) => `<span class="chip"><i class="fa-solid fa-location-dot"></i>${esc(r)}</span>`).join("")}</div>
      <div class="mt-3 text-sm text-slate-500 dark:text-slate-400"><i class="fa-solid fa-briefcase mr-1.5"></i>${O.roles.map(esc).join(" · ")}</div>
    </div>` : ""));
  $(document).on("click", ".copy-btn", function () {
    const txt = this.dataset.copy;
    (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast("Copied to clipboard", "success"), () => toast(txt, "info"));
  });

  function toast(msg, type = "success") {
    const bg = { success: "bg-emerald-600", error: "bg-rose-600", info: "bg-slate-800" }[type];
    const ic = { success: "fa-circle-check", error: "fa-circle-exclamation", info: "fa-circle-info" }[type];
    $("#toast").html(`<div class="toast-inner ${bg}"><i class="fa-solid ${ic}"></i>${esc(msg)}</div>`).removeClass("hidden");
    clearTimeout(toast.t); toast.t = setTimeout(() => $("#toast").addClass("hidden"), 4000);
  }

  const $form = $("#contact-form");
  $form.find("[name=job_description]").on("input", function () { $("#jd-count").text(this.value.length); });
  $form.on("input change", ".input", function () { $(this).removeClass("invalid"); });
  const formData = () => Object.fromEntries(new FormData($form[0]).entries());
  const LABELS = { name: "Recruiter name", email: "Email", company: "Company", phone: "Phone", linkedin: "LinkedIn", job_title: "Job title", job_location: "Job location", work_mode: "Work mode", employment_type: "Employment type", salary: "Salary / budget", jd_link: "JD link", job_description: "Job description", message: "Message" };

  function validate() {
    let ok = true;
    $form.find("[required]").each(function () { if (!this.value.trim()) { $(this).addClass("invalid"); ok = false; } });
    const em = $form.find("[name=email]");
    if (em.val() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.val())) { em.addClass("invalid"); ok = false; }
    $form.find("input[type=url]").each(function () { if (this.value && !/^https?:\/\/\S+$/i.test(this.value)) { $(this).addClass("invalid"); ok = false; } });
    if (!ok) { toast("Please fill in the highlighted fields", "error"); $form.find(".invalid").first().trigger("focus"); }
    return ok;
  }
  function status(html, cls) { $("#form-status").removeClass("hidden text-emerald-600 text-rose-600 dark:text-emerald-400 dark:text-rose-400").addClass(cls).html(html); }
  function mailtoHref(d) {
    let body = Object.keys(LABELS).filter((k) => d[k]).map((k) => `${LABELS[k]}: ${d[k]}`).join("\n");
    if (body.length > 1800) body = body.slice(0, 1800) + "\n…(truncated)";
    return `mailto:${P.email}?subject=${encodeURIComponent(`${D.contact.subjectPrefix}: ${d.job_title || "Job opportunity"} at ${d.company || ""}`)}&body=${encodeURIComponent(body)}`;
  }
  $("#mailto-btn").on("click", () => { window.location.href = mailtoHref(formData()); });

  $form.on("submit", function (e) {
    e.preventDefault();
    const d = formData();
    if (d._honey) return; // bot
    if (!validate()) return;
    const btn = $("#submit-btn").prop("disabled", true);
    btn.find("span").text("Sending…"); btn.find("i").attr("class", "fa-solid fa-spinner fa-spin");
    const payload = { _subject: `${D.contact.subjectPrefix}: ${d.job_title} at ${d.company}`, _template: "table", _replyto: d.email, _captcha: "false" };
    Object.keys(LABELS).forEach((k) => { if (d[k]) payload[LABELS[k]] = d[k]; });
    $.ajax({ url: D.contact.formEndpoint, method: "POST", contentType: "application/json", dataType: "json", data: JSON.stringify(payload), timeout: 20000 })
      .done((res) => {
        if (res && (res.success === true || res.success === "true")) {
          toast("Thanks! Your message has been sent.", "success");
          status(`<i class="fa-solid fa-circle-check mr-1"></i>Thank you, ${esc(d.name)}! I've received the details for <b>${esc(d.job_title)}</b> and will get back to you at ${esc(d.email)} soon.`, "text-emerald-600 dark:text-emerald-400");
          $form[0].reset(); $("#jd-count").text(0);
        } else fail(res && res.message);
      })
      .fail((xhr) => fail(xhr.responseJSON && xhr.responseJSON.message))
      .always(() => { btn.prop("disabled", false); btn.find("span").text("Send Opportunity"); btn.find("i").attr("class", "fa-solid fa-paper-plane"); });
    function fail(msg) {
      toast("Couldn't send the form", "error");
      status(`<i class="fa-solid fa-triangle-exclamation mr-1"></i>${esc(msg || "Something went wrong.")} Please <a class="underline font-semibold" href="${esc(mailtoHref(d))}">send it via your email app</a> or write to <a class="underline" href="mailto:${esc(P.email)}">${esc(P.email)}</a>.`, "text-rose-600 dark:text-rose-400");
    }
  });

  /* ---------------- scroll effects ---------------- */
  const $win = $(window);
  $win.on("scroll", () => {
    const y = $win.scrollTop(), h = $(document).height() - $win.height();
    $("#progress").css("width", `${h > 0 ? (y / h) * 100 : 0}%`);
    $("#navbar").toggleClass("scrolled", y > 10);
    $("#to-top").toggleClass("show", y > 600);
  }).trigger("scroll");
  $("#to-top").on("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  function countUp(el) {
    const target = +el.dataset.count, suf = el.dataset.suffix || "", t0 = performance.now(), D_ = 1400;
    (function step(t) { const p = Math.min(1, (t - t0) / D_), v = Math.round(target * (1 - Math.pow(1 - p, 3))); el.textContent = v + suf; if (p < 1) requestAnimationFrame(step); })(t0);
  }
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      $(en.target).find("[data-count]").addBack("[data-count]").each(function () { countUp(this); });
      io.unobserve(en.target);
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    $("#stats .stat").each(function () { io.observe(this); });

    const skillIO = new IntersectionObserver((en) => { if (en[0].isIntersecting && !skillsShown) { skillsShown = true; renderSkills("All"); skillIO.disconnect(); } }, { threshold: 0.1 });
    skillIO.observe(document.getElementById("skill-grid"));

    const navIO = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) $(".nav-link").removeClass("active").filter(`[href="#${en.target.id}"]`).addClass("active");
    }), { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main > section[id]").forEach((s) => navIO.observe(s));
  } else {
    $(".reveal").addClass("in"); $("[data-count]").each(function () { countUp(this); }); renderSkills("All");
  }

  /* ---------------- SEO: structured data ---------------- */
  const ld = { "@context": "https://schema.org", "@type": "Person", name: P.name, jobTitle: P.headline, email: `mailto:${P.email}`,
    address: { "@type": "PostalAddress", addressLocality: P.location }, sameAs: P.socials.filter((s) => /^http/.test(s.url)).map((s) => s.url),
    knowsAbout: [...allTech], alumniOf: D.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
    worksFor: { "@type": "Organization", name: current.company } };
  $("<script type='application/ld+json'>").text(JSON.stringify(ld)).appendTo("head");
});

// Content is rendered after load, so re-apply any #hash deep link.
$(window).on("load", function () {
  const t = location.hash && document.getElementById(location.hash.slice(1));
  if (t) setTimeout(() => t.scrollIntoView(), 50);
});
