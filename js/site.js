(function () {
  const root = document.documentElement;
  const config = window.PORTFOLIO_CONFIG;
  if (!config) return;

  const arrow = '<span class="arrow" aria-hidden="true">↗</span>';

  const searchIcon =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';

  const sunIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  const moonIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 0 1 11.2 3a6.8 6.8 0 1 0 9.8 9.8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';

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

  function renderLinks(links, primaryFirst) {
    if (!links?.length) return "";
    return `<div class="inline-links">${links
      .map((l, idx) => {
        const ext = l.external ? ' target="_blank" rel="noreferrer"' : "";
        const cls = primaryFirst && idx === 0 ? "btn-pop" : "btn-ghost";
        return `<a class="${cls}" href="${escapeHTML(l.href)}"${ext}>${escapeHTML(l.label)} ${arrow}</a>`;
      })
      .join("")}</div>`;
  }

  function renderParagraphs(paragraphs) {
    return `<div class="prose">${(paragraphs || [])
      .map((p) => `<p>${richText(p)}</p>`)
      .join("")}</div>`;
  }

  function renderPageIntro(page, pills) {
    const pillHtml = pills?.length
      ? `<div class="intro-pills">${pills
          .map((p) => `<span class="meta-pill meta-pill--${p.tone}">${escapeHTML(p.label)}</span>`)
          .join("")}</div>`
      : "";
    return `
      <header class="page-intro">
        <p class="overline">${escapeHTML(page.overline)}</p>
        <h1>${escapeHTML(page.title)}</h1>
        <p class="page-intro-desc">${escapeHTML(page.description)}</p>
        ${pillHtml}
      </header>`;
  }

  function stagePillTone(id) {
    if (id === "stage-1") return "green";
    if (id === "stage-2") return "sand";
    return "violet";
  }

  function renderWorkCards(items, includeDiagram) {
    const lang = getLang();
    return items
      .map((work) => {
        const loc = work[lang] || work.en || work;
        const tags = (work.tags || [])
          .map((t) => `<span class="tag-badge">${escapeHTML(t)}</span>`)
          .join("");
        const mechLabel = lang === "vi" ? "Cơ chế cốt lõi" : "Core Mechanism";
        const dossierLabel = lang === "vi" ? "Hồ sơ hệ thống" : "System Dossier";
        const codeLabel = lang === "vi" ? "Mã nguồn" : "Source Code";
        const diagramHtml =
          includeDiagram && window.PORTFOLIO_DIAGRAMS
            ? window.PORTFOLIO_DIAGRAMS.renderStage(work.id, lang, { step: 1, compact: true })
            : "";

        return `
          <article class="work-card" data-category="${escapeHTML(work.category)}">
            <div class="work-meta">
              <span class="meta-pill meta-pill--${stagePillTone(work.id)}">${escapeHTML(loc.stage)} · ${escapeHTML(loc.status)}</span>
              <span class="work-domain">${escapeHTML(work.domain)}</span>
            </div>
            <h3 class="work-title">
              <a href="dossier.html?id=${encodeURIComponent(work.id)}">${escapeHTML(loc.title)}</a>
            </h3>
            <p class="work-abstract">${escapeHTML(loc.abstract)}</p>
            ${diagramHtml}
            ${
              loc.mechanism
                ? `<div class="mechanism-box">
                    <div class="mechanism-box__head">
                      <span class="mechanism-box__icon" aria-hidden="true">✦</span>
                      <span>${escapeHTML(mechLabel)}</span>
                    </div>
                    <p>${escapeHTML(loc.mechanism)}</p>
                  </div>`
                : ""
            }
            <div class="work-footer">
              <div class="tag-list">${tags}</div>
              <div class="work-actions">
                <a class="btn-pop" href="dossier.html?id=${encodeURIComponent(work.id)}">${escapeHTML(dossierLabel)} ${arrow}</a>
                <a class="btn-ghost" href="${escapeHTML(work.codeUrl)}" target="_blank" rel="noreferrer">${escapeHTML(codeLabel)} ${arrow}</a>
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
        (item) => `
        <div class="now-tile">
          <time>${escapeHTML(item.label)}</time>
          <p>${richText(item.text)}</p>
        </div>`
      )
      .join("");

    const heroPills =
      lang === "vi"
        ? [
            { label: "BABOK · Đặc tả", tone: "green" },
            { label: "FinTech · IPN", tone: "violet" },
            { label: "SQL · Đối soát", tone: "sand" }
          ]
        : [
            { label: "BABOK · Specs", tone: "green" },
            { label: "FinTech · IPN", tone: "violet" },
            { label: "SQL · Recon", tone: "sand" }
          ];

    return `
      <section class="intro-sheet">
        <div>
          <p class="overline">${escapeHTML(page.overline)}</p>
          <h1>${escapeHTML(site.name)}</h1>
          <p class="role">${escapeHTML(pick(site.role, lang))}</p>
          <div class="intro-pills">
            ${heroPills.map((p) => `<span class="meta-pill meta-pill--${p.tone}">${escapeHTML(p.label)}</span>`).join("")}
          </div>
        </div>
        <div class="avatar-frame">
          <img class="avatar" src="${escapeHTML(site.profileImage)}" width="104" height="104" alt="${escapeHTML(site.name)}">
        </div>
      </section>

      <section class="paper-sheet">
        <div class="section-head">
          <h2>${escapeHTML(page.greeting)}</h2>
          <span class="section-count">01 · ${lang === "vi" ? "Hồ sơ" : "Profile"}</span>
        </div>
        ${renderParagraphs(page.introduction)}
        ${renderLinks(page.introductionLinks, true)}
      </section>

      <section class="paper-sheet">
        <div class="section-head">
          <h2>${escapeHTML(page.nowTitle)}</h2>
          <span class="section-count">${(page.now || []).length} ${lang === "vi" ? "trọng tâm" : "tracks"}</span>
        </div>
        <div class="now-grid">${nowRows}</div>
      </section>

      <div class="about-split">
        <section class="paper-sheet">
          <div class="section-head">
            <h2>${escapeHTML(page.exploreTitle)}</h2>
            <span class="section-count">⌘K</span>
          </div>
          <p class="prose">${richText(page.explore)}</p>
        </section>
        <section class="paper-sheet">
          <div class="section-head">
            <h2>${escapeHTML(page.reachTitle)}</h2>
            <span class="section-count">${lang === "vi" ? "Trực tiếp" : "Direct"}</span>
          </div>
          ${renderLinks(page.reachLinks, true)}
        </section>
      </div>
      <div data-site-footer></div>`;
  }

  function renderPractice() {
    const lang = getLang();
    const page = config.pages.practice[lang] || config.pages.practice.en;
    document.title = page.metaTitle;

    const directions = (page.directions || [])
      .map(
        (d) => `
        <article class="direction-card">
          <div class="direction-badge">
            <span class="direction-num">${escapeHTML(d.number)}</span>
            <small>${escapeHTML(d.title)}</small>
          </div>
          <h3>${escapeHTML(d.question)}</h3>
          <p>${escapeHTML(d.detail)}</p>
        </article>`
      )
      .join("");

    const pills =
      lang === "vi"
        ? [
            { label: "3 trụ cột", tone: "green" },
            { label: "BABOK → SQL", tone: "violet" }
          ]
        : [
            { label: "3 pillars", tone: "green" },
            { label: "BABOK → SQL", tone: "violet" }
          ];

    return `
      ${renderPageIntro(page, pills)}
      <section class="paper-sheet">
        <div class="section-head">
          <h2>${escapeHTML(page.listTitle)}</h2>
          <span class="section-count">I – III</span>
        </div>
        <div class="directions-grid">${directions}</div>
      </section>
      <section class="paper-sheet">
        <div class="section-head">
          <h2>${escapeHTML(page.worksTitle)}</h2>
          <span class="section-count">${config.works.length} ${lang === "vi" ? "giai đoạn" : "stages"}</span>
        </div>
        <div class="works-stack">${renderWorkCards(config.works, true)}</div>
      </section>
      <section class="paper-sheet">
        <div class="section-head">
          <h2>${escapeHTML(page.methodTitle)}</h2>
        </div>
        ${renderParagraphs(page.method)}
        ${renderLinks(page.methodLinks, true)}
      </section>
      <div data-site-footer></div>`;
  }

  function renderWorks() {
    const lang = getLang();
    const page = config.pages.works[lang] || config.pages.works.en;
    const f = page.filters || {};
    document.title = page.metaTitle;

    const pills =
      lang === "vi"
        ? [
            { label: "3 Giai đoạn", tone: "green" },
            { label: "Sơ đồ tương tác", tone: "violet" },
            { label: "Hệ thống Ví điện tử", tone: "sand" }
          ]
        : [
            { label: "3 Stages", tone: "green" },
            { label: "Interactive Diagrams", tone: "violet" },
            { label: "E-Wallet Suite", tone: "sand" }
          ];

    return `
      ${renderPageIntro(page, pills)}
      <section>
        <div class="filter-bar" role="tablist" aria-label="Filter system works">
          <button class="filter-pill is-active" data-filter="all" type="button" role="tab" aria-selected="true">${escapeHTML(f.all || "All Stages")}</button>
          <button class="filter-pill" data-filter="architecture" type="button" role="tab" aria-selected="false">${escapeHTML(f.architecture || "Architecture & Spec")}</button>
          <button class="filter-pill" data-filter="ux-uat" type="button" role="tab" aria-selected="false">${escapeHTML(f["ux-uat"] || "Checkout UX & UAT")}</button>
          <button class="filter-pill" data-filter="analytics" type="button" role="tab" aria-selected="false">${escapeHTML(f.analytics || "SQL & Risk BI")}</button>
        </div>
        <div class="works-stack" id="worksMount">${renderWorkCards(config.works, true)}</div>
      </section>
      <div data-site-footer></div>`;
  }

  function renderNotes() {
    const lang = getLang();
    const page = config.pages.notes[lang] || config.pages.notes.en;
    document.title = page.metaTitle;

    const list = (config.notes || [])
      .map((n) => {
        const localized = n[lang] || n.en;
        return `
          <article class="note-card">
            <span class="note-num">${escapeHTML(n.number)}</span>
            <div>
              <small>${escapeHTML(pick(n.category, lang))}</small>
              <a href="note.html?id=${encodeURIComponent(n.id)}">
                <h3>${escapeHTML(localized.title)}</h3>
              </a>
              <p>${escapeHTML(localized.summary)}</p>
              <a class="btn-ghost" href="note.html?id=${encodeURIComponent(n.id)}">
                ${lang === "vi" ? "Đọc bài viết" : "Read note"} ${arrow}
              </a>
            </div>
          </article>`;
      })
      .join("");

    const pills =
      lang === "vi"
        ? [
            { label: `${config.notes.length} bài viết`, tone: "violet" },
            { label: "Song ngữ EN / VI", tone: "mint" }
          ]
        : [
            { label: `${config.notes.length} essays`, tone: "violet" },
            { label: "Bilingual EN / VI", tone: "mint" }
          ];

    return `
      ${renderPageIntro(page, pills)}
      <section class="paper-sheet">
        <div class="section-head">
          <h2>${escapeHTML(page.archiveTitle || (lang === "vi" ? "Danh mục bài viết" : "Archive"))}</h2>
          <span class="section-count">01 – 0${config.notes.length}</span>
        </div>
        <div class="notes-grid">${list}</div>
      </section>
      <div data-site-footer></div>`;
  }

  function renderStack() {
    const lang = getLang();
    const page = config.pages.stack[lang] || config.pages.stack.en;
    document.title = page.metaTitle;

    const totalTools = (page.categories || []).reduce((acc, c) => acc + (c.items?.length || 0), 0);
    const rows = (page.categories || [])
      .map((cat) => {
        const badges = (cat.items || [])
          .map((item) => `<span class="tag-badge">${escapeHTML(item)}</span>`)
          .join("");
        return `
          <article class="stack-card">
            <span class="stack-code">${escapeHTML(cat.code)}</span>
            <h3>${escapeHTML(cat.title)}</h3>
            <p>${escapeHTML(cat.description)}</p>
            <div class="tag-list">${badges}</div>
          </article>`;
      })
      .join("");

    const pills =
      lang === "vi"
        ? [
            { label: `${(page.categories || []).length} nhóm năng lực`, tone: "green" },
            { label: `${totalTools} công cụ & chuẩn`, tone: "sand" }
          ]
        : [
            { label: `${(page.categories || []).length} domains`, tone: "green" },
            { label: `${totalTools} tools & standards`, tone: "sand" }
          ];

    return `
      ${renderPageIntro(page, pills)}
      <section class="paper-sheet">
        <div class="section-head">
          <h2>${escapeHTML(page.sectionTitle || "Domains & Tooling")}</h2>
          <span class="section-count">${totalTools} items</span>
        </div>
        <div class="stack-grid">${rows}</div>
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

    const diagramHtml = window.PORTFOLIO_DIAGRAMS
      ? window.PORTFOLIO_DIAGRAMS.renderStage(id, lang, { step: 0, compact: false })
      : "";

    const sectionsHtml = (doc.sections || [])
      .map((sec) => {
        const paras = (sec.paragraphs || [])
          .map((p) => `<p>${escapeHTML(p)}</p>`)
          .join("");
        const bullets = sec.bullets?.length
          ? `<ul>${sec.bullets.map((b) => `<li>${escapeHTML(b)}</li>`).join("")}</ul>`
          : "";
        const callout = sec.callout
          ? `<div class="callout">
              <div class="callout-header">
                <span class="callout-badge" aria-hidden="true">✦</span>
                <span>${escapeHTML(sec.callout.title)}</span>
              </div>
              <p>${escapeHTML(sec.callout.text)}</p>
            </div>`
          : "";
        const codeBlock = sec.code
          ? `<div class="code-window">
              <div class="code-window-bar">
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
      <div class="article-toolbar">
        <a class="btn-ghost" href="works.html">← ${lang === "vi" ? "Quay lại dự án" : "Back to works"}</a>
        <a class="btn-pop" href="${escapeHTML(entry.codeUrl)}" target="_blank" rel="noreferrer">GitHub Repository ${arrow}</a>
      </div>
      <article class="article-sheet">
        <header class="article-header">
          <p class="overline">${escapeHTML(doc.overline)}</p>
          <h1>${escapeHTML(doc.title)}</h1>
          <p class="article-lead">${escapeHTML(doc.lead)}</p>
          <div class="article-meta">
            <span class="article-meta-label">${escapeHTML(doc.meta)}</span>
            <span class="meta-pill meta-pill--${stagePillTone(id)}">${id.toUpperCase()}</span>
          </div>
        </header>
        ${diagramHtml}
        <div class="article-body">${sectionsHtml}</div>
        <nav class="article-neighbors" aria-label="Stage navigation">
          ${
            prevDoc
              ? `<a class="neighbor-card" href="dossier.html?id=${encodeURIComponent(prevKey)}"><small>← ${lang === "vi" ? "Giai đoạn trước" : "Previous Stage"}</small><strong>${escapeHTML(prevDoc.title)}</strong></a>`
              : `<div></div>`
          }
          ${
            nextDoc
              ? `<a class="neighbor-card neighbor-card--next" href="dossier.html?id=${encodeURIComponent(nextKey)}"><small>${lang === "vi" ? "Giai đoạn tiếp theo" : "Next Stage"} →</small><strong>${escapeHTML(nextDoc.title)}</strong></a>`
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
      <div class="article-toolbar">
        <a class="btn-ghost" href="notes.html">← ${lang === "vi" ? "Quay lại ghi chép" : "Back to notes"}</a>
        <span class="meta-pill meta-pill--violet">#${escapeHTML(note.number)}</span>
      </div>
      <article class="article-sheet">
        <header class="article-header">
          <p class="overline">${escapeHTML(pick(note.category, lang))}</p>
          <h1>${escapeHTML(doc.title)}</h1>
          <p class="article-lead">${escapeHTML(doc.summary)}</p>
          <div class="article-meta">
            <span class="article-meta-label">${escapeHTML(doc.meta)}</span>
            <span class="article-meta-label">${escapeHTML(config.site.name)}</span>
          </div>
        </header>
        <div class="article-body">
          ${(doc.paragraphs || []).map((p) => `<p>${escapeHTML(p)}</p>`).join("")}
        </div>
        <nav class="article-neighbors" aria-label="Note navigation">
          ${
            prev
              ? `<a class="neighbor-card" href="note.html?id=${encodeURIComponent(prev.id)}"><small>← ${lang === "vi" ? "Bài trước" : "Previous"}</small><strong>${escapeHTML((prev[lang] || prev.en).title)}</strong></a>`
              : `<div></div>`
          }
          ${
            next
              ? `<a class="neighbor-card neighbor-card--next" href="note.html?id=${encodeURIComponent(next.id)}"><small>${lang === "vi" ? "Bài tiếp theo" : "Next"} →</small><strong>${escapeHTML((next[lang] || next.en).title)}</strong></a>`
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

    const searchLabel = lang === "vi" ? "Tìm dự án & ghi chép…" : "Search works & notes…";

    return `
      <header class="site-header" id="siteHeader">
        <div class="header-inner">
          <a class="brand" href="index.html">${escapeHTML(config.site.shortName)}</a>
          <nav class="main-nav" id="main-nav" aria-label="Main navigation">${links}</nav>
          <div class="header-tools">
            <button class="search-trigger" type="button" data-open-search aria-label="${escapeHTML(searchLabel)}">
              ${searchIcon}
              <span class="search-trigger-label">${escapeHTML(searchLabel)}</span>
              <kbd>⌘K</kbd>
            </button>
            <div class="lang-toggle" role="group" aria-label="Language switch">
              <button type="button" data-set-lang="en" aria-pressed="${lang === "en"}">EN</button>
              <button type="button" data-set-lang="vi" aria-pressed="${lang === "vi"}">VI</button>
            </div>
            <button class="icon-btn theme-toggle" type="button" aria-label="Toggle color theme"></button>
            <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-controls="main-nav" aria-expanded="false">
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
          <div>
            <span>${escapeHTML(pick(p.label, lang))}</span>
            <strong>${escapeHTML(p.value)}</strong>
          </div>
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
            <a class="btn-ghost" href="mailto:${escapeHTML(site.email)}">${escapeHTML(site.email)} ${arrow}</a>
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
    const dark = root.dataset.theme === "dark";
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute("content", dark ? "#211e1a" : "#f4ebe0");
    if (!btn) return;
    btn.innerHTML = dark ? sunIcon : moonIcon;
    btn.title = dark ? "Switch to light paper theme" : "Switch to dark espresso theme";
  }

  /* ============================
     ⌘K Command Palette
     ============================ */
  let searchState = { open: false, selectedIndex: 0, flatItems: [] };

  function buildSearchItems(lang) {
    const groups = [];
    const navItems = (config.navigation || []).map((n) => ({
      title: pick(n.label, lang),
      sub: n.href,
      tag: lang === "vi" ? "Trang" : "Page",
      href: n.href,
      haystack: `${n.label.en} ${n.label.vi} ${n.href}`.toLowerCase()
    }));
    groups.push({ label: lang === "vi" ? "Điều hướng" : "Pages", items: navItems });

    const workItems = (config.works || []).map((w) => {
      const loc = w[lang] || w.en;
      return {
        title: loc.title,
        sub: `${loc.stage} · ${loc.status}`,
        tag: w.id.toUpperCase(),
        href: `dossier.html?id=${encodeURIComponent(w.id)}`,
        haystack: `${loc.title} ${loc.abstract} ${loc.mechanism} ${(w.tags || []).join(" ")} ${w.domain}`.toLowerCase()
      };
    });
    groups.push({ label: lang === "vi" ? "Hồ sơ hệ thống" : "System Dossiers", items: workItems });

    const noteItems = (config.notes || []).map((n) => {
      const loc = n[lang] || n.en;
      const bodyText = `${(n.en?.paragraphs || []).join(" ")} ${(n.vi?.paragraphs || []).join(" ")}`;
      return {
        title: loc.title,
        sub: pick(n.category, lang),
        tag: `#${n.number}`,
        href: `note.html?id=${encodeURIComponent(n.id)}`,
        haystack: `${n.en?.title || ""} ${n.vi?.title || ""} ${loc.summary} ${pick(n.category, lang)} ${bodyText}`.toLowerCase()
      };
    });
    groups.push({ label: lang === "vi" ? "Ghi chép chuyên môn" : "Field Notes", items: noteItems });

    const stackPage = config.pages.stack[lang] || config.pages.stack.en;
    const stackItems = (stackPage.categories || []).map((c) => ({
      title: c.title,
      sub: (c.items || []).slice(0, 5).join(" · "),
      tag: c.code,
      href: "stack.html",
      haystack: `${c.code} ${c.title} ${c.description} ${(c.items || []).join(" ")}`.toLowerCase()
    }));
    groups.push({ label: lang === "vi" ? "Công cụ & Năng lực" : "Stack & Tooling", items: stackItems });

    return groups;
  }

  function ensureSearchModal() {
    let modal = document.getElementById("sxModal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "sxModal";
    modal.className = "sx-backdrop";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Search portfolio");
    modal.innerHTML = `
      <div class="sx-dialog">
        <div class="sx-head">
          ${searchIcon}
          <input class="sx-input" id="sxInput" type="search" autocomplete="off" spellcheck="false" />
          <button class="sx-esc" type="button" data-close-search>esc</button>
        </div>
        <div class="sx-list" id="sxList"></div>
        <div class="sx-foot">
          <div class="sx-hints">
            <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
            <span><kbd>↵</kbd> open</span>
            <span><kbd>esc</kbd> close</span>
          </div>
          <span id="sxStats"></span>
        </div>
      </div>`;
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.closest("[data-close-search]")) {
        closeSearchModal();
      }
    });

    const input = modal.querySelector("#sxInput");
    input.addEventListener("input", () => {
      searchState.selectedIndex = 0;
      renderSearchList(input.value);
    });

    return modal;
  }

  function renderSearchList(query) {
    const lang = getLang();
    const listEl = document.getElementById("sxList");
    const statsEl = document.getElementById("sxStats");
    const input = document.getElementById("sxInput");
    if (!listEl) return;

    if (input) {
      input.placeholder =
        lang === "vi"
          ? "Tìm dự án, khái niệm (BABOK, IPN, SQL, Gherkin)…"
          : "Search dossiers, notes, concepts (BABOK, IPN, SQL)…";
    }

    const q = String(query || "").trim().toLowerCase();
    const groups = buildSearchItems(lang);
    const flat = [];
    let html = "";

    groups.forEach((group) => {
      const matched = q ? group.items.filter((i) => i.haystack.includes(q)) : group.items;
      if (!matched.length) return;
      html += `<div class="sx-group-label">${escapeHTML(group.label)}</div>`;
      matched.forEach((item) => {
        const idx = flat.length;
        flat.push(item);
        const sel = idx === searchState.selectedIndex ? " is-selected" : "";
        html += `
          <a class="sx-item${sel}" href="${escapeHTML(item.href)}" data-sx-idx="${idx}">
            <div>
              <span class="sx-item-title">${escapeHTML(item.title)}</span>
              <span class="sx-item-sub">${escapeHTML(item.sub)}</span>
            </div>
            <span class="sx-item-tag">${escapeHTML(item.tag)}</span>
          </a>`;
      });
    });

    searchState.flatItems = flat;
    if (!flat.length) {
      html = `<div class="sx-empty">${
        lang === "vi" ? "Không tìm thấy mục phù hợp." : "No matching pages, dossiers, or notes."
      }</div>`;
    }
    listEl.innerHTML = html;

    if (statsEl) {
      statsEl.textContent =
        lang === "vi"
          ? `${config.works.length} giai đoạn · ${config.notes.length} ghi chép · 4 nhóm công cụ`
          : `${config.works.length} stages · ${config.notes.length} notes · 4 domains`;
    }
  }

  function openSearchModal() {
    const modal = ensureSearchModal();
    const input = modal.querySelector("#sxInput");
    searchState.open = true;
    searchState.selectedIndex = 0;
    input.value = "";
    renderSearchList("");
    modal.classList.add("is-open");
    requestAnimationFrame(() => input.focus());
  }

  function closeSearchModal() {
    const modal = document.getElementById("sxModal");
    if (!modal) return;
    searchState.open = false;
    modal.classList.remove("is-open");
  }

  function moveSearchSelection(delta) {
    const total = searchState.flatItems.length;
    if (!total) return;
    searchState.selectedIndex = (searchState.selectedIndex + delta + total) % total;
    const items = document.querySelectorAll("#sxList .sx-item");
    items.forEach((el, idx) => {
      const active = idx === searchState.selectedIndex;
      el.classList.toggle("is-selected", active);
      if (active) el.scrollIntoView({ block: "nearest" });
    });
  }

  function bindDynamicPageControls() {
    if (window.PORTFOLIO_DIAGRAMS) {
      window.PORTFOLIO_DIAGRAMS.bind(document, getLang);
    }

    document.querySelectorAll(".filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".filter-pill").forEach((b) => {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        pill.classList.add("is-active");
        pill.setAttribute("aria-selected", "true");
        const filter = pill.dataset.filter;
        const filtered =
          filter === "all" ? config.works : config.works.filter((w) => w.category === filter);
        const mount = document.getElementById("worksMount");
        if (mount) {
          mount.innerHTML = renderWorkCards(filtered, true);
          if (window.PORTFOLIO_DIAGRAMS) {
            window.PORTFOLIO_DIAGRAMS.bind(mount, getLang);
          }
        }
      });
    });

    document.querySelectorAll(".code-copy-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const code = btn.closest(".code-window")?.querySelector("code")?.textContent || "";
        try {
          await navigator.clipboard.writeText(code);
          const original = btn.textContent;
          btn.textContent = getLang() === "vi" ? "Đã chép ✓" : "Copied ✓";
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

    document.querySelector("[data-open-search]")?.addEventListener("click", openSearchModal);

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
  }

  function setupChromeExtras() {
    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    document.body.prepend(progress);

    const backTop = document.createElement("button");
    backTop.className = "back-top";
    backTop.type = "button";
    backTop.setAttribute("aria-label", "Back to top");
    backTop.innerHTML =
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
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
            document.getElementById("siteHeader")?.classList.toggle("is-scrolled", y > 14);
            backTop.classList.toggle("is-shown", y > 320);
            scrollTick = false;
          });
          scrollTick = true;
        }
      },
      { passive: true }
    );
  }

  function bindGlobalNavigation() {
    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (searchState.open) closeSearchModal();
        else openSearchModal();
        return;
      }

      if (searchState.open) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeSearchModal();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          moveSearchSelection(1);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          moveSearchSelection(-1);
        } else if (e.key === "Enter") {
          const item = searchState.flatItems[searchState.selectedIndex];
          if (item?.href) {
            e.preventDefault();
            closeSearchModal();
            window.location.href = item.href;
          }
        }
        return;
      }

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
    });
  }

  function init() {
    root.lang = getLang();
    renderHeader();
    mountCurrentPage();
    setupChromeExtras();
    bindGlobalNavigation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
