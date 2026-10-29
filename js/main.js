(function () {
  const projects = window.PROJECTS || [];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const statusBadge = p => `<span class="status status-${esc(p.status)}">${esc(p.statusLabel || p.status)}</span>`;
  const tagList = tags => `<ul class="tags">${(tags || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;

  function links(p, opts = {}) {
    const out = [];
    if (p.caseStudy && !opts.noCase) out.push(`<a class="btn btn-primary btn-sm" href="project.html?id=${encodeURIComponent(p.id)}">Read case study</a>`);
    if (p.demo) out.push(`<a class="btn btn-ghost btn-sm" href="${esc(p.demo)}" target="_blank" rel="noopener">Live demo ↗</a>`);
    if (p.repo) out.push(`<a class="btn btn-ghost btn-sm" href="${esc(p.repo)}" target="_blank" rel="noopener">Code ↗</a>`);
    return out.length ? `<div class="card-links">${out.join('')}</div>` : '';
  }

  // Reusable project card. `featured` gives the wide layout with the screenshot.
  function projectCard(p, featured) {
    const media = p.cover
      ? `<a class="card-media" href="${p.caseStudy ? `project.html?id=${encodeURIComponent(p.id)}` : '#'}" tabindex="-1" aria-hidden="true">
           <img src="${esc(p.cover)}" alt="${esc(p.coverAlt || p.name)}" loading="${featured ? 'eager' : 'lazy'}" decoding="async">
         </a>`
      : `<div class="card-media card-media-empty" aria-hidden="true"><span>${esc(p.name.slice(0, 2))}</span><small>screenshots coming</small></div>`;
    return `
      <article class="card ${featured ? 'card-featured' : ''}">
        ${media}
        <div class="card-body">
          <div class="card-meta"><span class="area">${esc(p.area || '')}</span>${statusBadge(p)}</div>
          <h3>${esc(p.name)}</h3>
          ${p.tagline ? `<p class="tagline">${esc(p.tagline)}</p>` : ''}
          <p>${esc(p.summary)}</p>
          ${tagList(p.tags)}
          ${links(p)}
        </div>
      </article>`;
  }

  const featuredEl = document.getElementById('featured');
  const gridEl = document.getElementById('projectGrid');
  if (featuredEl && gridEl) {
    const withCase = projects.filter(p => p.caseStudy);
    const rest = projects.filter(p => !p.caseStudy);
    featuredEl.innerHTML = withCase.map(p => projectCard(p, true)).join('');
    gridEl.innerHTML = rest.map(p => projectCard(p, false)).join('');
  }

  // Case study template: every section is optional.
  const caseEl = document.querySelector('main.case');
  if (caseEl) {
    const id = new URLSearchParams(location.search).get('id');
    const p = projects.find(x => x.id === id);
    if (!p || !p.caseStudy) {
      caseEl.innerHTML = `<section class="section"><h1>Case study not found</h1><p><a href="index.html#projects">Back to projects</a></p></section>`;
      return;
    }
    document.title = `${p.name} · Case study · Gonzalo de Andrade`;
    const c = p.caseStudy;
    const sec = (title, body) => body ? `<section class="case-sec"><h2>${title}</h2>${body}</section>` : '';
    const para = t => t ? `<p>${esc(t)}</p>` : '';
    const list = arr => arr && arr.length ? `<ul class="bullets">${arr.map(i => `<li>${esc(i)}</li>`).join('')}</ul>` : '';
    const challenges = c.challenges && c.challenges.length
      ? `<div class="challenges">${c.challenges.map(ch => `<article><h3>${esc(ch.title)}</h3><p>${esc(ch.text)}</p></article>`).join('')}</div>` : '';
    const gallery = c.gallery && c.gallery.length
      ? `<div class="gallery">${c.gallery.map((g, i) => `
          <figure class="${i === 0 ? 'g-main' : ''}">
            <button type="button" class="g-open" data-src="${esc(g.src)}" data-cap="${esc(g.caption || '')}" aria-label="Enlarge screenshot: ${esc(g.alt)}">
              <img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async">
            </button>
            ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ''}
          </figure>`).join('')}</div>
        ${c.note ? `<p class="fine">${esc(c.note)}</p>` : ''}` : '';

    caseEl.innerHTML = `
      <header class="case-hero">
        <p class="kicker">Case study · ${esc(p.area || '')}</p>
        <h1>${esc(p.name)}</h1>
        ${p.tagline ? `<p class="headline">${esc(p.tagline)}</p>` : ''}
        <div class="case-meta">${statusBadge(p)}${links(p, { noCase: true })}</div>
      </header>
      ${gallery ? `<section class="case-sec case-gallery"><h2 class="sr-only">Screenshots</h2>${gallery}</section>` : ''}
      <div class="case-layout">
        <div class="case-main">
          ${sec('Overview', para(c.overview))}
          ${sec('The problem', para(c.problem))}
          ${sec('How it works', list(c.solution))}
          ${sec('Main features', list(c.features))}
          ${sec('Technical challenges', challenges)}
        </div>
        <aside class="case-side">
          <div class="side-box">
            <h2>Stack</h2>
            ${tagList(p.tags)}
          </div>
          ${c.contribution ? `<div class="side-box"><h2>My role</h2><p>${esc(c.contribution)}</p></div>` : ''}
        </aside>
      </div>`;

    const lb = document.getElementById('lightbox');
    const lbImg = lb.querySelector('img');
    const lbCap = lb.querySelector('.lightbox-cap');
    caseEl.addEventListener('click', e => {
      const b = e.target.closest('.g-open');
      if (!b) return;
      lbImg.src = b.dataset.src;
      lbImg.alt = b.querySelector('img').alt;
      lbCap.textContent = b.dataset.cap;
      lb.showModal();
    });
    lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lightbox-close')) lb.close(); });
  }
})();
