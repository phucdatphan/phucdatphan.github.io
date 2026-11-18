(function () {
  const root = document.documentElement;
  const config = window.PORTFOLIO_CONFIG;
  if (!config) return;

  const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
  const sunIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  const moonIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 0 1 11.2 3a6.8 6.8 0 1 0 9.8 9.8Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';

  function escapeHTML(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function richText(str) {
    let out = escapeHTML(str);
    out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    return out;
  }

  function getLang() {
    try {
      return localStorage.getItem("portfolio-lang") === "vi" ? "vi" : "en";
    } catch (_) {
      return "en";
    }
  }

  function setLang(lang) {
    const normalized = lang === "vi" ? "vi" : "en";
    root.lang = normalized;
    try {
      localStorage.setItem("portfolio-lang", normalized);
    } catch (_) {}
  }

  function pick(val, lang) {
    if (val && typeof val === "object" && !Array.isArray(val)) {
      return val[lang] ?? val.en ?? "";
    }
    return val ?? "";
  }

  function renderLinks(links) {
    if (!links?.length) return "";
    return `<div class="inline-links">${links
      .map((l) => {
        const ext = l.external ? ' target="_blank" rel="noreferrer"' : "";
        return `<a href="${escapeHTML(l.href)}"${ext}>${escapeHTML(l.label)} ${arrow}</a>`;
      })
      .join("")}</div>`;
  }

  function renderParagraphs(paragraphs) {
    return `<div class="prose">${(paragraphs || [])
      .map((p) => `<p>${richText(p)}</p>`)
      .join("")}</div>`;
  }

  function renderPageIntro(page) {
    return `<header class="page-intro reveal"><p class="overline">${escapeHTML(
      page.overline
    )}</p><h1>${escapeHTML(page.title)}</h1><p>${escapeHTML(
      page.description
    )}</p></header>`;
  }

  function renderWorkCards(items) {
    const lang = getLang();
    return items
      .map((work, idx) => {
        const loc = work[lang] || work.en || work;
        const tags = (work.tags || [])
          .map((t) => `<span class="tag-badge">${escapeHTML(t)}</span>`)
          .join("");
        const mechLabel = lang === "vi" ? "Cơ chế cốt lõi" : "Core Mechanism";
        const dossierLabel = lang === "vi" ? "Hồ sơ hệ thống" : "System Dossier";
        const codeLabel = lang === "vi" ? "Mã nguồn" : "Source Code";
        return `
          <article class="research-work-card reveal" style="--d:${idx * 60}ms" data-category="${escapeHTML(work.category)}">
            <div class="research-work-meta">
              <span class="research-status">${escapeHTML(loc.stage)} · ${escapeHTML(loc.status)}</span>
              <span class="research-period">${escapeHTML(work.domain)}</span>
            </div>
            <h3 class="research-work-title">
              <a class="research-title-link" href="dossier.html?id=${encodeURIComponent(work.id)}">${escapeHTML(loc.title)}</a>
            </h3>
            <p class="research-work-abstract">${escapeHTML(loc.abstract)}</p>
            ${
              loc.mechanism
                ? `<div class="research-explanation"><strong>${escapeHTML(mechLabel)}</strong><p>${escapeHTML(loc.mechanism)}</p></div>`
                : ""
            }
            <div class="research-work-footer">
              <div class="research-tags">${tags}</div>
              <div class="research-links">
                <a class="research-link-btn" href="dossier.html?id=${encodeURIComponent(work.id)}">${escapeHTML(dossierLabel)} ${arrow}</a>
                <a class="research-link-btn" href="${escapeHTML(work.codeUrl)}" target="_blank" rel="noreferrer">${escapeHTML(codeLabel)} ${arrow}</a>
              </div>
            </div>
          </article>`;
      })
      .join("");
  }

  function renderAbout() {
    const lang = getLang();
    const page = config.pages.about[lang] || config.pages.about.en;
    const site = config.site;
    document.title = page.metaTitle;
    const nowRows = (page.now || [])
      .map(
        (item) =>
          `<div><time>${escapeHTML(item.label)}</time><p>${richText(item.text)}</p></div>`
      )
      .join("");

    return `
      <section class="intro reveal">
        <div>
          <p class="overline">${escapeHTML(page.overline)}</p>
          <h1>${escapeHTML(site.name)}</h1>
          <p class="role">${escapeHTML(pick(site.role, lang))}</p>
        </div>
        <img class="avatar" src="${escapeHTML(site.profileImage)}" width="104" height="104" alt="${escapeHTML(site.name)}">
      </section>
      <section class="section reveal" style="--d:60ms">
        <h2>${escapeHTML(page.greeting)}</h2>
        ${renderParagraphs(page.introduction)}
        ${renderLinks(page.introductionLinks)}
      </section>
      <section class="section reveal" style="--d:110ms">
        <h2>${escapeHTML(page.nowTitle)}</h2>
        <div class="year-list">${nowRows}</div>
      </section>
      <section class="section reveal" style="--d:150ms">
        <h2>${escapeHTML(page.exploreTitle)}</h2>
        <p class="prose">${richText(page.explore)}</p>
      </section>
      <section class="section reach reveal" style="--d:190ms">
        <h2>${escapeHTML(page.reachTitle)}</h2>
        ${renderLinks(page.reachLinks)}
      </section>
      <div data-site-footer></div>`;
  }

  function renderPractice() {
    const lang = getLang();
    const page = config.pages.practice[lang] || config.pages.practice.en;
    document.title = page.metaTitle;
    const directions = (page.directions || [])
      .map(
        (d, idx) => `
        <article class="reveal" style="--d:${idx * 55}ms">
          <span>${escapeHTML(d.number)}</span>
          <div>
            <small>${escapeHTML(d.title)}</small>
            <h3>${escapeHTML(d.question)}</h3>
            <p>${escapeHTML(d.detail)}</p>
          </div>
        </article>`
      )
      .join("");

    return `
      ${renderPageIntro(page)}
      <section class="section reveal">
        <h2>${escapeHTML(page.listTitle)}</h2>
        <div class="research-list">${directions}</div>
      </section>
      <section class="section reveal">
        <h2>${escapeHTML(page.worksTitle)}</h2>
        <div class="research-works-list">${renderWorkCards(config.works)}</div>
      </section>
      <section class="section reach reveal">
        <h2>${escapeHTML(page.methodTitle)}</h2>
        ${renderParagraphs(page.method)}
        ${renderLinks(page.methodLinks)}
      </section>
      <div data-site-footer></div>`;
  }

  function renderWorks() {
    const lang = getLang();
    const page = config.pages.works[lang] || config.pages.works.en;
    const f = page.filters || {};
    document.title = page.metaTitle;
    return `
      ${renderPageIntro(page)}
      <section class="section reveal">
        <div class="filter-bar" role="tablist" aria-label="Filter system works">
          <button class="filter-pill is-active" data-filter="all" type="button">${escapeHTML(f.all || "All Stages")}</button>
          <button class="filter-pill" data-filter="architecture" type="button">${escapeHTML(f.architecture || "Architecture & Spec")}</button>
          <button class="filter-pill" data-filter="ux-uat" type="button">${escapeHTML(f["ux-uat"] || "Checkout UX & UAT")}</button>
          <button class="filter-pill" data-filter="analytics" type="button">${escapeHTML(f.analytics || "SQL & Risk BI")}</button>
        </div>
        <div class="research-works-list" id="worksMount">${renderWorkCards(config.works)}</div>
      </section>
      <div data-site-footer></div>`;
  }

  function renderNotes() {
    const lang = getLang();
    const page = config.pages.notes[lang] || config.pages.notes.en;
    document.title = page.metaTitle;

    const list = (config.notes || [])
      .map((n, idx) => {
        const localized = n[lang] || n.en;
        return `
          <article class="reveal" style="--d:${idx * 60}ms">
            <span>${escapeHTML(n.number)}</span>
            <div>
              <small>${escapeHTML(pick(n.category, lang))}</small>
              <a href="note.html?id=${encodeURIComponent(n.id)}">
                <h3>${escapeHTML(localized.title)}</h3>
              </a>
              <p>${escapeHTML(localized.summary)}</p>
              <a class="writing-read-link" href="note.html?id=${encodeURIComponent(n.id)}">
                ${lang === "vi" ? "Đọc bài viết" : "Read note"} ${arrow}
              </a>
            </div>
          </article>`;
      })
      .join("");

    return `
      ${renderPageIntro(page)}
      <section class="section reveal">
        <h2>${escapeHTML(page.archiveTitle || (lang === "vi" ? "Danh mục bài viết" : "Archive"))}</h2>
        <div class="writing-list">${list}</div>
      </section>
      <div data-site-footer></div>`;
  }

  function renderStack() {
    const lang = getLang();
    const page = config.pages.stack[lang] || config.pages.stack.en;
    document.title = page.metaTitle;
    const rows = (page.categories || [])
      .map((cat, idx) => {
        const badges = (cat.items || [])
          .map((item) => `<span class="tag-badge">${escapeHTML(item)}</span>`)
          .join("");
        return `
          <div class="reveal" style="--d:${idx * 55}ms">
            <span>${escapeHTML(cat.code)}</span>
            <div>
              <h3>${escapeHTML(cat.title)}</h3>
              <p>${escapeHTML(cat.description)}</p>
              <div class="research-tags">${badges}</div>
            </div>
          </div>`;
      })
      .join("");

    return `
      ${renderPageIntro(page)}
      <section class="section reach reveal">
        <h2>${escapeHTML(page.sectionTitle || "Domains & Tooling")}</h2>
        <div class="library-list">${rows}</div>
      </section>
      <div data-site-footer></div>`;
  }

  function renderDossier() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "stage-1";
    const entry = config.dossiers[id] || config.dossiers["stage-1"];
    const lang = getLang();
    const doc = entry[lang] || entry.en;
    document.title = `${doc.title} — ${config.site.name}`;

    const keys = Object.keys(config.dossiers);
    const idx = Math.max(keys.indexOf(id), 0);
    const prevKey = keys[idx - 1] || null;
    const nextKey = keys[idx + 1] || null;

    const sectionsHtml = (doc.sections || [])
      .map((sec) => {
        const paras = (sec.paragraphs || [])
          .map((p) => `<p>${escapeHTML(p)}</p>`)
          .join("");
        const bullets = sec.bullets?.length
          ? `<ul>${sec.bullets.map((b) => `<li>${escapeHTML(b)}</li>`).join("")}</ul>`
          : "";
        const callout = sec.callout
          ? `<div class="callout"><div class="callout-header">${escapeHTML(
              sec.callout.title
            )}</div><p>${escapeHTML(sec.callout.text)}</p></div>`
          : "";
        const codeBlock = sec.code
          ? `<div class="code-window">
              <div class="code-window-bar">
                <div class="code-dots"><span class="code-dot red"></span><span class="code-dot yellow"></span><span class="code-dot green"></span></div>
                <span class="code-lang">${escapeHTML(sec.codeLang || "code")}</span>
                <button class="code-copy-btn" type="button">${lang === "vi" ? "Sao chép" : "Copy"}</button>
              </div>
              <pre><code>${escapeHTML(sec.code)}</code></pre>
            </div>`
          : "";
        return `<h2>${escapeHTML(sec.heading)}</h2>${paras}${callout}${bullets}${codeBlock}`;
      })
      .join("");

    const prevDoc = prevKey ? config.dossiers[prevKey][lang] : null;
    const nextDoc = nextKey ? config.dossiers[nextKey][lang] : null;

    return `
      <article class="writing-article">
        <div class="writing-article-toolbar">
          <a class="writing-back" href="works.html">← ${lang === "vi" ? "Quay lại danh mục dự án" : "Back to system works"}</a>
        </div>
        <header class="writing-article-header">
          <p class="overline">${escapeHTML(doc.overline)}</p>
          <h1>${escapeHTML(doc.title)}</h1>
          <p class="writing-lead">${escapeHTML(doc.lead)}</p>
          <div class="writing-meta">
            <span>${escapeHTML(doc.meta)}</span>
            <a href="${escapeHTML(entry.codeUrl)}" target="_blank" rel="noreferrer" style="color:var(--accent);font-weight:600;">GitHub Repository ${arrow}</a>
          </div>
        </header>
        <div class="writing-body">${sectionsHtml}</div>
        <nav class="writing-neighbors" aria-label="Stage navigation">
          ${
            prevDoc
              ? `<a href="dossier.html?id=${encodeURIComponent(prevKey)}"><small>← ${lang === "vi" ? "Giai đoạn trước" : "Previous Stage"}</small><strong>${escapeHTML(prevDoc.title)}</strong></a>`
              : `<div></div>`
          }
          ${
            nextDoc
              ? `<a href="dossier.html?id=${encodeURIComponent(nextKey)}"><small>${lang === "vi" ? "Giai đoạn tiếp theo" : "Next Stage"} →</small><strong>${escapeHTML(nextDoc.title)}</strong></a>`
              : `<div></div>`
          }
        </nav>
      </article>
      <div data-site-footer></div>`;
  }

  function renderNote() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || config.notes[0].id;
    const notes = config.notes || [];
    const idx = Math.max(notes.findIndex((n) => n.id === id), 0);
    const note = notes[idx];
    const lang = getLang();
    const doc = note[lang] || note.en;
    document.title = `${doc.title} — ${config.site.name}`;

    const prev = notes[idx - 1] || null;
    const next = notes[idx + 1] || null;

    return `
      <article class="writing-article">
        <div class="writing-article-toolbar">
          <a class="writing-back" href="notes.html">← ${lang === "vi" ? "Quay lại ghi chép" : "Back to field notes"}</a>
        </div>
        <header class="writing-article-header">
          <p class="overline">${escapeHTML(pick(note.category, lang))}</p>
          <h1>${escapeHTML(doc.title)}</h1>
          <p class="writing-lead">${escapeHTML(doc.summary)}</p>
          <div class="writing-meta">
            <span>${escapeHTML(doc.meta)}</span>
            <span>${escapeHTML(config.site.name)}</span>
          </div>
        </header>
        <div class="writing-body">
          ${(doc.paragraphs || []).map((p) => `<p>${escapeHTML(p)}</p>`).join("")}
        </div>
        <nav class="writing-neighbors" aria-label="Note navigation">
          ${
            prev
              ? `<a href="note.html?id=${encodeURIComponent(prev.id)}"><small>← ${lang === "vi" ? "Bài trước" : "Previous"}</small><strong>${escapeHTML((prev[lang] || prev.en).title)}</strong></a>`
              : `<div></div>`
          }
          ${
            next
              ? `<a href="note.html?id=${encodeURIComponent(next.id)}"><small>${lang === "vi" ? "Bài tiếp theo" : "Next"} →</small><strong>${escapeHTML((next[lang] || next.en).title)}</strong></a>`
              : `<div></div>`
          }
        </nav>
      </article>
      <div data-site-footer></div>`;
  }

  function buildHeaderHTML() {
    const lang = getLang();
    const activePage = document.body.dataset.page || "about";
    const activeMap = { dossier: "works", note: "notes" };
    const effectiveKey = activeMap[activePage] || activePage;

    const links = (config.navigation || [])
      .map((item) => {
        const current = item.key === effectiveKey ? ' aria-current="page"' : "";
        return `<a href="${escapeHTML(item.href)}"${current}>${escapeHTML(pick(item.label, lang))}</a>`;
      })
      .join("");

    return `
      <header class="site-header" id="siteHeader">
        <div class="header-inner">
          <a class="brand" href="index.html">${escapeHTML(config.site.shortName)}</a>
          <nav class="main-nav" id="main-nav" aria-label="Main navigation">${links}</nav>
          <div class="header-tools">
            <div class="lang-toggle" role="group" aria-label="Language switch">
              <button type="button" data-set-lang="en" aria-pressed="${lang === "en"}">EN</button>
              <button type="button" data-set-lang="vi" aria-pressed="${lang === "vi"}">VI</button>
            </div>
            <button class="theme-toggle" type="button" aria-label="Toggle color theme"></button>
            <button class="menu-toggle" type="button" aria-label="Open menu" aria-controls="main-nav" aria-expanded="false">
              <span class="menu-icon"><span></span></span>
            </button>
          </div>
        </div>
      </header>`;
  }

  function renderHeader() {
    const mount = document.querySelector("[data-site-header]") || document.getElementById("siteHeader");
    if (!mount) return;
    mount.outerHTML = buildHeaderHTML();
    updateThemeButton();
    bindHeaderControls();
  }

  function renderFooter() {
    const mount = document.querySelector("[data-site-footer]");
    if (!mount) return;
    const lang = getLang();
    const site = config.site;
    const profiles = (config.profiles || [])
      .map(
        (p) => `
        <a href="${escapeHTML(p.href)}" target="_blank" rel="me noreferrer">
          <span>${escapeHTML(pick(p.label, lang))}</span>
          <strong>${escapeHTML(p.value)}</strong>
          ${arrow}
        </a>`
      )
      .join("");

    const contactLabel = lang === "vi" ? "Liên hệ" : "Contact";
    const tagline =
      lang === "vi" ? "Đặc tả · Kiến trúc · Dữ liệu" : "Specification · Architecture · Data";

    mount.outerHTML = `
      <footer class="site-footer">
        <div class="footer-main">
          <div class="footer-identity">
            <strong>${escapeHTML(site.name)}</strong>
            <span>${escapeHTML(pick(site.footerRole, lang))}</span>
          </div>
          <div class="footer-contact">
            <span>${escapeHTML(contactLabel)}</span>
            <a href="mailto:${escapeHTML(site.email)}">${escapeHTML(site.email)} ${arrow}</a>
          </div>
        </div>
        <nav class="footer-links" aria-label="Professional profiles">${profiles}</nav>
        <div class="footer-bottom">
          <span>© ${escapeHTML(site.copyrightYear)} ${escapeHTML(site.name)} · ${escapeHTML(pick(site.location, lang))}</span>
          <span>${escapeHTML(tagline)}</span>
        </div>
      </footer>`;
  }

  function updateThemeButton() {
    const btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    const dark = root.dataset.theme === "dark";
    btn.innerHTML = dark ? moonIcon : sunIcon;
    btn.title = dark ? "Switch to light mode" : "Switch to dark mode";
  }

  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    items.forEach((el) => obs.observe(el));
  }

  function bindDynamicPageControls() {
    // Filter pills on Works page
    document.querySelectorAll(".filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".filter-pill").forEach((b) => b.classList.remove("is-active"));
        pill.classList.add("is-active");
        const filter = pill.dataset.filter;
        const filtered =
          filter === "all"
            ? config.works
            : config.works.filter((w) => w.category === filter);
        const mount = document.getElementById("worksMount");
        if (mount) {
          mount.innerHTML = renderWorkCards(filtered);
          initReveal();
        }
      });
    });

    // Code Copy button
    document.querySelectorAll(".code-copy-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const code = btn.closest(".code-window")?.querySelector("code")?.textContent || "";
        try {
          await navigator.clipboard.writeText(code);
          const original = btn.textContent;
          btn.textContent = getLang() === "vi" ? "Đã chép" : "Copied";
          btn.classList.add("is-copied");
          setTimeout(() => {
            btn.textContent = original;
            btn.classList.remove("is-copied");
          }, 1600);
        } catch (_) {}
      });
    });
  }

  function bindHeaderControls() {
    const themeBtn = document.querySelector(".theme-toggle");
    const menuBtn = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");

    themeBtn?.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("portfolio-theme", root.dataset.theme);
      } catch (_) {}
      updateThemeButton();
    });

    menuBtn?.addEventListener("click", () => {
      const open = menuBtn.getAttribute("aria-expanded") !== "true";
      menuBtn.setAttribute("aria-expanded", String(open));
      nav?.classList.toggle("is-open", open);
    });

    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nextLang = btn.dataset.setLang;
        if (nextLang === getLang()) return;
        setLang(nextLang);
        renderHeader();
        mountCurrentPage();
      });
    });
  }

  function mountCurrentPage() {
    const mount = document.querySelector("[data-page-content]");
    if (!mount) return;
    const pageKey = document.body.dataset.page || "about";
    const renderers = {
      about: renderAbout,
      practice: renderPractice,
      works: renderWorks,
      notes: renderNotes,
      stack: renderStack,
      dossier: renderDossier,
      note: renderNote
    };
    const fn = renderers[pageKey] || renderAbout;
    mount.innerHTML = fn();
    renderFooter();
    bindDynamicPageControls();
    initReveal();
  }

  function setupChromeExtras() {
    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    document.body.prepend(progress);

    const aura = document.createElement("div");
    aura.className = "cursor-aura";
    aura.setAttribute("aria-hidden", "true");
    document.body.prepend(aura);

    const backTop = document.createElement("button");
    backTop.className = "back-top";
    backTop.type = "button";
    backTop.setAttribute("aria-label", "Back to top");
    backTop.innerHTML =
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
    document.body.appendChild(backTop);
    backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    let scrollTick = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!scrollTick) {
          requestAnimationFrame(() => {
            const y = window.scrollY;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.transform = `scaleX(${max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0})`;
            document.getElementById("siteHeader")?.classList.toggle("is-scrolled", y > 18);
            backTop.classList.toggle("is-shown", y > 320);
            scrollTick = false;
          });
          scrollTick = true;
        }
      },
      { passive: true }
    );

    let ptrTick = false;
    window.addEventListener(
      "pointermove",
      (e) => {
        if (!ptrTick) {
          requestAnimationFrame(() => {
            aura.style.transform = `translate3d(${e.clientX - 240}px, ${e.clientY - 240}px, 0)`;
            ptrTick = false;
          });
          ptrTick = true;
        }
      },
      { passive: true }
    );

    let seenLoader = false;
    try {
      seenLoader = sessionStorage.getItem("pdp-editorial-loaded") === "1";
    } catch (_) {}

    const loader = document.getElementById("siteLoader");
    if (loader) {
      if (seenLoader) {
        loader.remove();
      } else {
        const fill = loader.querySelector(".loader-fill");
        requestAnimationFrame(() => {
          if (fill) fill.style.width = "100%";
        });
        setTimeout(() => {
          loader.classList.add("is-hidden");
          try {
            sessionStorage.setItem("pdp-editorial-loaded", "1");
          } catch (_) {}
          setTimeout(() => loader.remove(), 450);
        }, 480);
      }
    }
  }

  function bindGlobalNavigation() {
    document.addEventListener("keydown", (e) => {
      const nav = document.querySelector(".main-nav");
      const menuBtn = document.querySelector(".menu-toggle");
      if (e.key === "Escape" && nav?.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menuBtn?.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("click", (e) => {
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;
      const nav = document.querySelector(".main-nav");
      const menuBtn = document.querySelector(".menu-toggle");
      if (nav?.classList.contains("is-open") && !target.closest(".site-header")) {
        nav.classList.remove("is-open");
        menuBtn?.setAttribute("aria-expanded", "false");
      }

      const link = target.closest("a");
      if (
        !link ||
        link.target === "_blank" ||
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      const dest = new URL(link.href, window.location.href);
      if (dest.origin !== window.location.origin || !dest.pathname.endsWith(".html")) return;
      if (dest.href === window.location.href) return;

      e.preventDefault();
      document.body.classList.add("is-leaving");
      window.setTimeout(() => {
        window.location.href = dest.href;
      }, 140);
    });
  }

  function init() {
    root.lang = getLang();
    renderHeader();
    mountCurrentPage();
    setupChromeExtras();
    bindGlobalNavigation();
    requestAnimationFrame(() => document.body.classList.add("is-ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
