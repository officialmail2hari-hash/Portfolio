"use strict";
/* =====================================================================
   HARISHMA M — 3D cube + game world portfolio  |  world.js
   ---------------------------------------------------------------------
   Everything on the site is built from the DATA block right below.
   Edit the text there; you should not need to touch anything else.
   ===================================================================== */

/* ============================== DATA =============================== */
const GITHUB   = "https://github.com/officialmail2hari-hash";
const LINKEDIN = "https://linkedin.com/in/harishma-m";
// Free key from https://web3forms.com (type your email, the key arrives in your inbox). Paste it between the quotes:
const FORM_KEY = "";
const EMAIL    = "officialmail2hari@gmail.com";
const RESUME   = "Harishma_M.pdf";

const ABOUT = {
  roles: ["Data Science Student", "Data Analyst", "Problem Solver", "Lifelong Learner"],
  text: "I’m a Data Science student who loves turning ideas into intelligent, real-world solutions. From data analytics to AI-powered applications, I enjoy experimenting with technology, solving problems, and building things that make a difference. Always learning, always building, and always looking for the next challenge.",
  facts: [
    ["📍", "Rajapalayam, Viruthunagar District, TN"],
    ["🎓", "B.Sc in Data Science — The Standard Fireworks College for Women"],
    ["💼", "Open to internships & full-time roles"],
    ["🌱", "Currently learning: Cloud Computing, Power BI"],
  ],
};

const SKILLS = [   // [emoji, name, one-line description shown when hovered]
  { g: "Data & AI", items: [["🐍", "Python", "Scripting, analysis & automation"], ["📊", "Data Analysis", "Data handling, cleaning & reporting"],
    ["🤖", "Machine Learning", "Building and testing models"], ["🗄️", "SQL", "Querying and managing databases"]] },
  { g: "Tools", items: [["🐙", "Git & GitHub", "Version control & collaboration"], ["🎨", "Canva", "Design & visuals"]] },
  { g: "Learning now", learning: true, items: [["☁️", "Cloud Computing", "Learning now"], ["📈", "Power BI", "Learning now · dashboards & reporting"]] },
];

/* repo = exact repository name on GitHub. demo = live link ("" if none). */
const PROJECTS = [
  { title: "PRAGYA AI", repo: "Pragya", demo: "", tags: ["AI", "Chatbot", "HTML"],
    desc: "An AI-powered chatbot that provides personalized responses and assistance to users based on their queries and preferences." },
  { title: "MONLYTICX", repo: "Expenses", demo: "", status: "🚧 In development", tags: ["Python", "Web", "Finance"],
    desc: "An Expense Tracker Web Application that allows users to track their expenses and manage their finances effectively." },
  { title: "MYZONE-SFRC360", repo: "MyZone-360", demo: "", tags: ["Python", "AI", "Campus Tech"],
    desc: "An AI-powered campus management platform integrating student services, academic information, and campus operations." },
  { title: "HELIXVAULT", repo: "HeliXVault", demo: "", tags: ["Python", "Data Storage", "Bioinformatics"],
    desc: "A DNA Based Cold Data Archival System that uses DNA sequences to encode and store digital data." },
  { title: "FEMGUARD", repo: "", demo: "", status: "🔒 Hardware · no public code", tags: ["IoT", "GSM", "Safety"],
    desc: "A standalone GSM-based wearable security device for women's safety, also published as a conference paper." },
  { title: "SMART AGRICULTURAL ASSISTANT", repo: "Agri_Assist", demo: "", tags: ["Python", "Streamlit", "Mini Project", "Agriculture"],
    desc: "A bilingual (English + Tamil) farmer chatbot with voice, leaf-disease checks, fertilizer dosage and crop recommendations." },
  { title: "CIVICFIX", repo: "CivicFix", demo: "", tags: ["React", "FastAPI", "AI", "NLP"],
    desc: "An AI-powered campus complaint and maintenance system with complaint classification, duplicate detection, smart staff assignment, SLA monitoring and hotspot analytics." },
  { title: "BUDDYTRON", repo: "", demo: "", status: "🔒 Code not public", tags: ["AI", "Assistant"],
    desc: "An interactive buddy-style assistant project." },
];

/* ===== EDIT ME: replace these two placeholders with your real papers =====
   scope must be "International" or "National". Delete / add entries freely. */
const PAPERS = [
  { title: "FemGuard: A Standalone GSM-Based Wearable Security Device for Women's Safety",
    venue: "National Conference", place: "", year: "", scope: "National", role: "Second author", status: "Presented",
    isbn: "978-93-32-2982-0", pages: "23", award: "", link: "", authors: "",
    summary: "" },
  { title: "The Dark Side of AI Communication: Ethical Concerns of Deepfakes and Data Misuse",
    venue: "ICISDE 2026", place: "", year: "2026", scope: "International", role: "Second author", status: "Published",
    isbn: "978-59-642637-5-3", pages: "18", award: "", link: "", authors: "",
    summary: "" },
];

const EDU = [
  { d: "2024 – Present", t: "B.Sc in Data Science", s: "The Standard Fireworks College for Women · CGPA 8.9", icon: "🎓", cgpa: 8.9,
    role: "Studying Data Science with a focus on Python, data analysis and AI. Alongside coursework I build full projects, from chatbots to campus tools, and publish research.",
    ach: ["CGPA 8.9", "Co-authored 2 published conference papers", "Built 8 projects across AI, web and IoT"] },
  { d: "Apr – Aug 2025", t: "Operations Intern — Spellzee Edutech Solutions Pvt. Ltd.", s: "Data Handling and Reporting", icon: "📊",
    role: "Worked on data handling and reporting in an operations role at an edtech company.", ach: [] },
  { d: "Apr 2026", t: "Intern — Anjana Infotech", s: "Learned basics in AI/ML", icon: "🤖",
    role: "Learned the basics of AI and machine learning during an internship.", ach: [] },
  { d: "2019 – 2020", t: "Higher Secondary", s: "AKD Dharmaraja Girls Higher Secondary School · State Board · Percentage 92%", icon: "🏫", cgpa: 9.2,
    role: "Completed higher secondary education under the State Board.", ach: [] },
];

/* =========================== HELPERS =============================== */
const $ = (s, r = document) => r.querySelector(s);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, k) => a + (b - a) * k;
const D = Math.PI / 180;
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const body = document.body, root = document.documentElement;

function h(tag, props, ...kids) {
  const e = document.createElement(tag);
  if (props) for (const k in props) {
    const v = props[k];
    if (k === "class") e.className = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  }
  kids.flat().forEach(c => { if (c != null) e.append(c.nodeType ? c : document.createTextNode(c)); });
  return e;
}
const ext = (label, href) => h("a", { href, target: "_blank", rel: "noopener" }, label);

/* ============================ SOUND ================================ */
/* Everything is synthesised live with the Web Audio API: no files. */
const Snd = (() => {
  let ctx, master, noise, thrGain, ready = false, on = false;
  function ensure() {
    if (ready) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    try { ctx = new AC(); } catch (e) { return false; }
    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    const len = ctx.sampleRate * 2;
    noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noise.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    // ambient pad: slow, detuned low drone with a breathing filter
    const pad = ctx.createGain(); pad.gain.value = .17;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 380; lp.Q.value = .7;
    [[55, "triangle", .5], [82.41, "sine", .35], [110, "triangle", .24], [164.81, "sine", .12]].forEach(([f, type, v], i) => {
      const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = (i - 1.5) * 7;
      const g = ctx.createGain(); g.gain.value = v; o.connect(g); g.connect(lp); o.start();
    });
    const lfo = ctx.createOscillator(); lfo.frequency.value = .07;
    const lg = ctx.createGain(); lg.gain.value = 170; lfo.connect(lg); lg.connect(lp.frequency); lfo.start();
    lp.connect(pad); pad.connect(master);
    // soft "air"
    const air = ctx.createBufferSource(); air.buffer = noise; air.loop = true;
    const af = ctx.createBiquadFilter(); af.type = "lowpass"; af.frequency.value = 260;
    const ag = ctx.createGain(); ag.gain.value = .05; air.connect(af); af.connect(ag); ag.connect(master); air.start();
    // thruster (silent until the rocket moves)
    const th = ctx.createBufferSource(); th.buffer = noise; th.loop = true;
    const tf = ctx.createBiquadFilter(); tf.type = "bandpass"; tf.frequency.value = 520; tf.Q.value = .5;
    thrGain = ctx.createGain(); thrGain.gain.value = 0; th.connect(tf); tf.connect(thrGain); thrGain.connect(master); th.start();
    ready = true; return true;
  }
  const now = () => ctx.currentTime;
  function tone(f, dur = .12, type = "sine", vol = .18, to = 0, at = 0) {
    if (!on || !ready) return;
    const o = ctx.createOscillator(), g = ctx.createGain(), t = now() + at;
    o.type = type; o.frequency.setValueAtTime(f, t); if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .008); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + .05);
  }
  return {
    get on() { return on; },
    set(v) {
      on = v;
      if (v) { if (!ensure()) { on = false; return; } ctx.resume(); }
      if (ready) master.gain.setTargetAtTime(v ? .85 : 0, now(), .5);
    },
    click() { tone(920, .06, "square", .05); },
    tick() { tone(1500, .03, "sine", .03); },
    dock() { tone(330, .18, "triangle", .2, 660); },
    whoosh() {
      if (!on || !ready) return;
      const s = ctx.createBufferSource(); s.buffer = noise;
      const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.Q.value = .8;
      const g = ctx.createGain(), t = now();
      f.frequency.setValueAtTime(180, t); f.frequency.exponentialRampToValueAtTime(2600, t + .55);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.5, t + .12); g.gain.exponentialRampToValueAtTime(.001, t + .7);
      s.connect(f); f.connect(g); g.connect(master); s.start(t, Math.random()); s.stop(t + .8);
    },
    chime() { [660, 880, 1320].forEach((f, i) => tone(f, .35, "sine", .16, 0, i * .09)); },
    blip() { tone(200, .25, "sawtooth", .08, 90); },
    thrust(v) { if (ready) thrGain.gain.setTargetAtTime(on ? clamp(v, 0, 1) * .13 : 0, now(), .08); },
    pause(p) { if (!ready) return; if (p) ctx.suspend(); else if (on) ctx.resume(); },
  };
})();
document.addEventListener("visibilitychange", () => Snd.pause(document.hidden));

/* ========================== ACHIEVEMENTS =========================== */
const ACH = [
  { id: "launch",   e: "🚀", n: "First Launch",              d: "Take off in Game mode" },
  { id: "explorer", e: "🧭", n: "Explorer",                  d: "Open all 6 sections" },
  { id: "spinner",  e: "🌀", n: "Cube Spinner",              d: "Spin the cube a full turn" },
  { id: "papers",   e: "📜", n: "Paper Chaser",              d: "Open the Papers section" },
  { id: "terminal", e: "👾", n: "Found the hidden terminal", d: "Hint: it hides far from the planets…" },
  { id: "hired",    e: "🎉", n: "Hired!",                    d: "Hint: try a very polite command with sudo" },
];
let got = new Set();
try { got = new Set(JSON.parse(localStorage.getItem("hm-ach") || "[]")); } catch (e) {}
const achEl = $("#ach"), toastEl = $("#toast");
let toastTimer;
function unlock(id) {
  if (got.has(id)) return;
  got.add(id);
  try { localStorage.setItem("hm-ach", JSON.stringify([...got])); } catch (e) {}
  const a = ACH.find(x => x.id === id);
  toastEl.replaceChildren(h("span", { class: "e" }, a.e), h("div", null, h("b", null, "Achievement unlocked"), h("span", { class: "n" }, a.n)));
  toastEl.classList.add("show"); Snd.chime();
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3400);
  renderAch();
}
function renderAch() {
  $("#achCount").textContent = got.size + "/" + ACH.length;
  achEl.replaceChildren(h("h4", null, "Achievements " + got.size + "/" + ACH.length),
    ...ACH.map(a => h("div", { class: "ai" + (got.has(a.id) ? "" : " lock") }, h("span", { class: "e" }, got.has(a.id) ? a.e : "🔒"),
      h("div", null, a.n, h("small", null, got.has(a.id) ? "Unlocked" : a.d)))));
}

/* ============================ SECTIONS ============================= */
const SECTIONS = [
  { id: "about",     icon: "👩‍💻", title: "About",    tease: "Who I am & what I build",   acc: "#4da3ff", build: buildAbout },
  { id: "skills",    icon: "⚡",  title: "Skills",   tease: "The tools in my kit",       acc: "#b583ff", build: buildSkills,
    peek: () => SKILLS[0].items.map(i => i[1]) },
  { id: "projects",  icon: "🚀",  title: "Projects", tease: "Things I have built",       acc: "#ffb454", build: buildProjects,
    peek: () => PROJECTS.map(p => p.title) },
  { id: "papers",    icon: "📜",  title: "Papers",   tease: "Conference publications",   acc: "#22d3ee", build: buildPapers,
    peek: () => ["International & national", "Abstracts · BibTeX"] },
  { id: "education", icon: "🎓",  title: "Journey",  tease: "Education & internships",   acc: "#4ade80", build: buildEdu,
    peek: () => ["B.Sc Data Science", "2 internships"] },
  { id: "contact",   icon: "✉️",  title: "Contact",  tease: "Let’s build something",     acc: "#ff6b9a", build: buildContact,
    peek: () => ["GitHub", "LinkedIn", "Email"] },
];
const SEC = Object.fromEntries(SECTIONS.map(s => [s.id, s]));
const FACE = {  // n = outward normal (CSS axes), r = [rotateX, rotateY] that brings it to the front
  about: { n: [0, 0, 1], r: [0, 0] }, skills: { n: [1, 0, 0], r: [0, -90] }, projects: { n: [0, 0, -1], r: [0, 180] },
  papers: { n: [-1, 0, 0], r: [0, 90] }, education: { n: [0, -1, 0], r: [-90, 0] }, contact: { n: [0, 1, 0], r: [90, 0] },
};

function buildAbout() {
  return h("div", null,
    h("p", { class: "lead" }, ABOUT.text),
    h("ul", { class: "facts" }, ABOUT.facts.map(f => h("li", null, f[0] + "  " + f[1]))),
    h("span", { class: "badge" }, "● Open to internships & full-time roles"),
    h("div", { class: "row" },
      h("a", { class: "pbtn solid", href: RESUME, download: "" }, "⬇ Download résumé"),
      h("button", { class: "pbtn", type: "button", onclick: () => { closePanel(); setTimeout(() => openSection("projects"), 500); } }, "See my projects ▸")));
}
function buildSkills() {
  const cap = h("p", { class: "orbit-cap" }, "Hover or tap a planet to explore");
  const orbit = h("div", { class: "orbit" }, h("div", { class: "core" }, h("b", null, "HM.")));
  const rings = [{ k: .50, dur: 34, rev: 0 }, { k: .72, dur: 46, rev: 1 }, { k: .94, dur: 62, rev: 0 }];
  SKILLS.forEach((g, ri) => {
    const rg = rings[ri];
    const ring = h("div", { class: "ring" + (g.learning ? " learning" : ""), style: `--k:${rg.k};--dur:${rg.dur}s;--rdir:${rg.rev ? "reverse" : "normal"};--odir:${rg.rev ? "normal" : "reverse"}` });
    const n = g.items.length;
    g.items.forEach((it, i) => {
      const orb = h("button", { class: "orb", type: "button", "aria-label": it[1] + ". " + (it[2] || "") }, h("span", { class: "e" }, it[0]));
      const show = () => { cap.replaceChildren(h("b", null, it[0] + "  " + it[1]), h("span", null, " — " + (it[2] || g.g))); };
      orb.addEventListener("mouseenter", () => { show(); Snd.tick(); });
      orb.addEventListener("focus", show);
      orb.addEventListener("click", () => { show(); orb.classList.remove("zap"); void orb.offsetWidth; orb.classList.add("zap"); Snd.click(); });
      ring.append(h("div", { class: "slot", style: `--a:${i * 360 / n + ri * 40}deg` }, h("div", { class: "cancel" }, orb)));
    });
    orbit.append(ring);
  });
  const wrap = h("div", { class: "orbit-wrap" }, orbit);
  wrap.addEventListener("pointermove", e => {            // the whole system leans toward the cursor
    const r = wrap.getBoundingClientRect();
    orbit.style.setProperty("--ry", (((e.clientX - r.left) / r.width - .5) * 22).toFixed(1) + "deg");
    orbit.style.setProperty("--rx", ((.5 - (e.clientY - r.top) / r.height) * 22).toFixed(1) + "deg");
  });
  wrap.addEventListener("pointerleave", () => { orbit.style.setProperty("--rx", "0deg"); orbit.style.setProperty("--ry", "0deg"); });
  return h("div", null, wrap, cap,
    h("div", { class: "legend" }, SKILLS.map(g => h("div", { class: "lg" }, h("h3", null, g.g),
      h("div", { class: "tags big" }, g.items.map(it => h("span", null, it[0] + " " + it[1])))))));
}
function buildProjects() {
  const tags = ["All", ...new Set(PROJECTS.flatMap(p => p.tags))];
  const q = h("input", { class: "search", type: "search", placeholder: "Search projects…", "aria-label": "Search projects" });
  const chips = h("div", { class: "chips" }), grid = h("div", { class: "cards" });
  let tag = "All";
  tags.forEach(t => chips.append(h("button", { class: "chip" + (t === "All" ? " on" : ""), type: "button", onclick: ev => {
    tag = t; [...chips.children].forEach(c => c.classList.toggle("on", c === ev.currentTarget)); paint(); Snd.click();
  } }, t)));
  const card = p => h("article", { class: "pcard" }, h("h3", null, p.title), h("p", null, p.desc),
    h("div", { class: "tags" }, p.tags.map(t => h("span", null, t))),
    p.status ? h("p", { class: "pstatus" }, p.status) : null,
    h("div", { class: "links" }, p.demo ? ext("Live demo ↗", p.demo) : null, p.repo ? ext("Code ↗", GITHUB + "/" + p.repo) : null));
  function paint() {
    const s = q.value.trim().toLowerCase();
    const list = PROJECTS.filter(p => (tag === "All" || p.tags.includes(tag)) && (p.title + " " + p.desc + " " + p.tags.join(" ")).toLowerCase().includes(s));
    grid.replaceChildren(...(list.length ? list.map(card) : [h("p", { class: "muted" }, "No projects match your search.")]));
  }
  q.addEventListener("input", paint); paint();
  return h("div", null, h("div", { class: "controls" }, q, chips), grid);
}
function bibtex(p, i) {
  const f = [["author", p.authors || "Harishma M and others"], ["title", p.title], ["booktitle", p.venue], ["address", p.place], ["year", p.year], ["pages", p.pages], ["isbn", p.isbn]]
    .filter(x => x[1]).map(x => `  ${x[0].padEnd(9)} = {${x[1]}}`).join(",\n");
  return `@inproceedings{harishma${p.year || "paper"}_${i + 1},\n${f}\n}`;
}
function buildPapers() {
  const chips = h("div", { class: "chips" }), grid = h("div", { class: "cards" });
  let scope = "All";
  ["All", "International", "National"].forEach(t => chips.append(h("button", { class: "chip" + (t === "All" ? " on" : ""), type: "button", onclick: ev => {
    scope = t; [...chips.children].forEach(c => c.classList.toggle("on", c === ev.currentTarget)); paint(); Snd.click();
  } }, t)));
  const card = (p, i) => {
    const wrap = h("div", { class: "flipwrap paper", tabindex: "0", role: "button", "aria-label": "Flip to read the abstract: " + p.title });
    const flip = () => { wrap.classList.toggle("flip"); Snd.tick(); };
    wrap.addEventListener("click", e => { if (!e.target.closest("a,button")) flip(); });
    wrap.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
    wrap.append(h("div", { class: "flipper" },
      h("div", { class: "front" }, h("span", { class: "badge scope" }, p.scope), h("h3", null, p.title),
        h("p", { class: "meta" }, p.venue, [p.place, (p.venue.includes(p.year) ? "" : p.year)].filter(Boolean).length ? [h("br"), [p.place, (p.venue.includes(p.year) ? "" : p.year)].filter(Boolean).join(" · ")] : null,
          h("br"), [p.role, p.status].filter(Boolean).join(" · "), (p.isbn || p.pages) ? [h("br"), [p.isbn && "ISBN " + p.isbn, p.pages && "Page " + p.pages].filter(Boolean).join(" · ")] : null),
        p.award ? h("p", { class: "award" }, "🏆 " + p.award) : null, h("span", { class: "tip" }, "tap to read the abstract ↻")),
      h("div", { class: "back" }, h("h3", null, "Abstract"), h("p", { class: "meta" }, p.summary || "Abstract coming soon."),
        h("div", { class: "links" }, p.link ? ext("Read paper ↗", p.link) : null,
          h("a", { href: "#", onclick: e => { e.preventDefault(); e.stopPropagation(); const t = bibtex(p, i);
            (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => e.target.textContent = "Copied ✓", () => e.target.textContent = "Copy failed"); } }, "Copy BibTeX")),
        h("span", { class: "tip" }, "tap to flip back ↻"))));
    return wrap;
  };
  function paint() { grid.replaceChildren(...PAPERS.map((p, i) => [p, i]).filter(([p]) => scope === "All" || p.scope === scope).map(([p, i]) => card(p, i))); }
  paint();
  return h("div", null, h("div", { class: "controls" }, h("span", { class: "muted" }, PAPERS.length + " publications"), chips), grid);
}
function openEduCard(e) {
  closeEduCard();
  const close = () => closeEduCard();
  const body = h("div", { class: "dcard", role: "dialog", "aria-label": e.t },
    h("button", { class: "x", type: "button", "aria-label": "Close details", onclick: close }, "✕"),
    h("div", { class: "dhead" },
      e.cgpa ? h("div", { class: "ring", style: "--p:" + (e.cgpa / 10 * 100) + "%" }, h("b", null, e.cgpa)) : h("div", { class: "dico" }, e.icon),
      h("div", null, h("span", { class: "d" }, e.d), h("h3", null, e.t), h("p", { class: "muted" }, e.s))),
    h("h4", null, "Role summary"), h("p", { class: "lead" }, e.role),
    e.ach && e.ach.length ? [h("h4", null, "Achievements"), h("ul", { class: "alist" }, e.ach.map(a => h("li", null, a)))] : null);
  const back = h("div", { class: "dback", onclick: ev => { if (ev.target === back) close(); } }, body);
  panel.append(back); Snd.chime && Snd.chime(); requestAnimationFrame(() => back.classList.add("on")); body.querySelector(".x").focus();
}
function closeEduCard() { const b = $(".dback", panel); if (b) b.remove(); }
document.addEventListener("keydown", ev => { if (ev.key === "Escape" && $(".dback", panel)) { ev.stopImmediatePropagation(); closeEduCard(); } }, true);
function buildEdu() {
  return h("div", { class: "tl" }, EDU.map((e, i) => h("button", { class: "it clickable", type: "button", style: "--i:" + i, onclick: () => { Snd.click(); openEduCard(e); } },
    h("span", { class: "d" }, e.d), h("h3", null, e.t), h("p", null, e.s), h("span", { class: "more" }, "View details ▸"))));
}
function buildContact() {
  const f = h("form", { class: "form" },
    h("input", { name: "name", placeholder: "Your name", required: "", autocomplete: "name" }),
    h("input", { name: "email", type: "email", placeholder: "Your email", required: "", autocomplete: "email" }),
    h("textarea", { name: "message", rows: "4", placeholder: "Your message", required: "" }),
    h("button", { class: "pbtn solid", type: "submit" }, "Send message ▸"));
  const btn = f.querySelector("button");
  f.addEventListener("submit", async e => {
    e.preventDefault(); const d = new FormData(f);
    const fallback = () => { location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio message from " + d.get("name"))}&body=${encodeURIComponent(d.get("message") + "\n\n— " + d.get("name") + " (" + d.get("email") + ")")}`; };
    if (!FORM_KEY) return fallback();
    btn.disabled = true; btn.textContent = "Sending…";
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: FORM_KEY, subject: "Portfolio message from " + d.get("name"), name: d.get("name"), email: d.get("email"), message: d.get("message") }) });
      const j = await r.json();
      if (!j.success) throw new Error(j.message);
      f.reset(); btn.textContent = "Sent ✓ Thank you!";
    } catch (err) { btn.textContent = "Couldn't send. Opening your email app…"; setTimeout(fallback, 900); }
    setTimeout(() => { btn.disabled = false; btn.textContent = "Send message ▸"; }, 4000);
  });
  return h("div", null, h("p", { class: "lead" }, "I’m open to full-time jobs and internships. Say hello!"),
    h("div", { class: "row" }, h("a", { class: "pbtn solid", href: "mailto:" + EMAIL }, "✉ Email"), ext("GitHub ↗", GITHUB), ext("LinkedIn ↗", LINKEDIN),
      h("a", { class: "pbtn", href: RESUME, download: "" }, "⬇ Résumé")), f);
}

/* ============================== STATE ============================== */
const S = { mode: "cube", open: null, started: false, term: false, visited: new Set(), spin: 0, idle: 0 };
const cube = { rx: -35, ry: -340, vx: 0, vy: 0, tx: null, ty: null, drag: false };
let warp = 0, facingId = "about", lastFocus = null;
const cubeEl = $("#cube"), scene = $("#scene"), stage = $("#stage"), panel = $("#panel"), sheet = $("#sheet"),
  facenav = $("#facenav"), hint = $("#hint"), dockBtn = $("#dock");

function setAcc(hex) { root.style.setProperty("--acc", hex); }

/* ------------------------------ faces ------------------------------ */
const FCLS = ["f-front", "f-right", "f-back", "f-left", "f-top", "f-bottom"];
let roleEl;
SECTIONS.forEach((s, i) => {
  const f = h("div", { class: "face " + FCLS[i], "data-id": s.id, role: "button", tabindex: "0", "aria-label": "Open " + s.title, style: "--fa:" + s.acc });
  if (s.id === "about") {
    f.append(h("span", { class: "hi" }, "Hi, I’m"), h("div", { class: "name" }, "HARISHMA M"),
      h("div", { class: "role" }, h("span", { id: "roleTxt" }), h("i", null, "▌")),
      h("p", { class: "cta-hint" }, "Drag to spin the cube", h("br"), "Click any face to open it"),
      h("span", { class: "go" }, "Open About ▸"));
  } else {
    f.append(h("span", { class: "num" }, "0" + (i + 1) + " / 06"), h("span", { class: "ico" }, s.icon), h("h2", null, s.title), h("p", { class: "tease" }, s.tease),
      h("ul", { class: "peek" }, s.peek().slice(0, 4).map(t => h("li", null, t))), h("span", { class: "go" }, "Open ▸"));
  }
  f.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openSection(s.id); } });
  cubeEl.append(f);
  facenav.append(h("button", { type: "button", "data-id": s.id, "aria-label": s.title, onclick: () => { Snd.click(); if (facingId === s.id && !cube.drag) openSection(s.id); else snapTo(s.id); } },
    h("span", null, s.icon), h("span", { class: "t" }, s.title)));
});
roleEl = $("#roleTxt");
(function typeRole() {
  let r = 0, c = 0, del = false;
  (function step() {
    const w = ABOUT.roles[r]; roleEl.textContent = w.slice(0, c);
    if (RM) { roleEl.textContent = ABOUT.roles[0]; return; }
    if (!del && c === w.length) { del = true; return setTimeout(step, 1500); }
    if (del && c === 0) { del = false; r = (r + 1) % ABOUT.roles.length; }
    c += del ? -1 : 1; setTimeout(step, del ? 40 : 85);
  })();
})();

/* ------------------------- cube maths + loop ----------------------- */
function facing() {
  const rx = cube.rx * D, ry = cube.ry * D; let best = "about", bz = -9;
  for (const s of SECTIONS) {
    const [x, y, z] = FACE[s.id].n;
    const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
    const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
    if (z2 > bz) { bz = z2; best = s.id; }
  }
  return best;
}
function snapTo(id) {
  const [rx, ry] = FACE[id].r;
  cube.tx = rx + 360 * Math.round((cube.rx - rx) / 360);
  cube.ty = ry + 360 * Math.round((cube.ry - ry) / 360);
  cube.vx = cube.vy = 0; S.idle = 0;
  if (!RM) warp = Math.max(warp, .35);
}
function stepFace(dir) {   // arrow keys on the cube
  const ring = ["about", "papers", "projects", "skills"];   // ArrowLeft order
  let id = facingId;
  if (dir === "L" || dir === "R") {
    const i = ring.indexOf(id);
    id = i < 0 ? "about" : ring[(i + (dir === "L" ? 1 : ring.length - 1)) % ring.length];
  } else if (dir === "U") id = id === "contact" ? "about" : "education";
  else id = id === "education" ? "about" : "contact";
  Snd.click(); snapTo(id);
}
function updateCube(dt, t) {
  const pry = cube.ry, prx = cube.rx;
  if (!cube.drag) {
    if (cube.tx != null) {
      const k = 1 - Math.exp(-dt * 6.5);
      cube.rx += (cube.tx - cube.rx) * k; cube.ry += (cube.ty - cube.ry) * k;
      if (Math.abs(cube.tx - cube.rx) < .05 && Math.abs(cube.ty - cube.ry) < .05) { cube.rx = cube.tx; cube.ry = cube.ty; cube.tx = cube.ty = null; }
    } else {
      cube.rx = clamp(cube.rx + cube.vx * dt, -100, 100); cube.ry += cube.vy * dt;
      const dmp = Math.exp(-dt * 2.8); cube.vx *= dmp; cube.vy *= dmp;
      if (Math.abs(cube.vy) > 30) S.spin += Math.abs(cube.vy * dt);
      S.idle += dt;
      if (S.idle > 5 && !S.open && S.started && !RM && S.mode === "cube") {   // gentle idle spin
        cube.ry += 7 * dt; cube.rx += (-12 - cube.rx) * (1 - Math.exp(-dt * 1.2));
      }
    }
  }
  if (S.spin >= 360) unlock("spinner");
  const fy = RM ? 0 : Math.sin(t * .0012) * 6;
  cubeEl.style.transform = `translate3d(0,${fy.toFixed(2)}px,0) rotateX(${cube.rx.toFixed(2)}deg) rotateY(${cube.ry.toFixed(2)}deg)`;
  const f = facing();
  if (f !== facingId) {
    facingId = f;
    if (!S.open) setAcc(SEC[f].acc);
    [...facenav.children].forEach(b => b.classList.toggle("on", b.dataset.id === f));
  }
  starVel.x = (cube.ry - pry); starVel.y = (cube.rx - prx);
}

/* --------------------------- drag + clicks ------------------------- */
let drag = null;
scene.addEventListener("pointerdown", e => {
  if (S.open || !S.started || S.mode !== "cube") return;
  drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), moved: 0, face: e.target.closest(".face") };
  cube.tx = cube.ty = null; cube.drag = true; cube.vx = cube.vy = 0; S.idle = 0;
  try { scene.setPointerCapture(e.pointerId); } catch (err) {}
});
scene.addEventListener("pointermove", e => {
  if (!drag) {                                   // mouse glare on faces
    const f = e.target.closest && e.target.closest(".face");
    if (f) { const r = f.getBoundingClientRect(); f.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%"); f.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%"); }
    return;
  }
  if (e.pointerId !== drag.id) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y, now = performance.now(), dtm = Math.max(1, now - drag.t), k = .45;
  drag.x = e.clientX; drag.y = e.clientY; drag.t = now; drag.moved += Math.abs(dx) + Math.abs(dy);
  cube.ry += dx * k; cube.rx = clamp(cube.rx - dy * k, -100, 100); S.spin += Math.abs(dx * k);
  cube.vy = clamp(lerp(cube.vy, dx * k / dtm * 1000, .5), -900, 900); cube.vx = clamp(lerp(cube.vx, -dy * k / dtm * 1000, .5), -900, 900);
});
function endDrag(e) {
  if (!drag || e.pointerId !== drag.id) return;
  const d = drag; drag = null; cube.drag = false;
  if (performance.now() - d.t > 90) cube.vx = cube.vy = 0;
  if (d.moved < 8) {
    let id = d.face ? d.face.dataset.id : null;
    if (!id) {   // fallback: a click inside the front-facing face always counts
      const r = $(`.face[data-id=${facingId}]`).getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) id = facingId;
    }
    if (id) { cube.vx = cube.vy = 0; openSection(id); }
  }
}
scene.addEventListener("pointerup", endDrag); scene.addEventListener("pointercancel", endDrag);

/* ============================== PANEL ============================== */
function openSection(id) {
  if (S.open || !S.started || !SEC[id]) return;
  const sec = SEC[id];
  S.open = id; lastFocus = document.activeElement; Snd.whoosh(); hideDock(); setAcc(sec.acc);
  if (!RM) warp = 1;
  S.visited.add(id);
  if (S.visited.size === SECTIONS.length) unlock("explorer");
  if (id === "papers") unlock("papers");
  if (S.mode === "cube") { snapTo(id); stage.classList.add("zoom"); }
  setTimeout(() => {
    if (S.open !== id) return;
    sheet.style.setProperty("--pa", sec.acc); panel.style.setProperty("--pa", sec.acc);
    sheet.replaceChildren(
      h("div", { class: "p-head" }, h("span", { class: "ico" }, sec.icon), h("h2", { id: "pTitle" }, h("small", null, "0" + (SECTIONS.indexOf(sec) + 1) + " / 06"), sec.title),
        h("button", { class: "x", type: "button", "aria-label": "Close", onclick: closePanel }, "✕")),
      sec.build());
    sheet.scrollTop = 0; panel.classList.add("open");
    const x = $(".x", sheet); if (x) x.focus({ preventScroll: true });
  }, S.mode === "cube" ? 560 : 260);
}
function closePanel() { closeEduCard();
  if (!S.open) return;
  panel.classList.remove("open"); stage.classList.remove("zoom"); S.open = null; S.idle = 0; Snd.whoosh();
  if (!RM) warp = .6;
  setAcc(S.mode === "cube" ? SEC[facingId].acc : (G.near ? SEC[G.near].acc : "#4da3ff"));
  if (lastFocus && lastFocus.focus) try { lastFocus.focus({ preventScroll: true }); } catch (e) {}
}
panel.addEventListener("click", e => { if (e.target === panel) closePanel(); });

/* ============================== STARS ============================== */
const cv = $("#space"), ctx = cv.getContext("2d");
let W = 0, H = 0;
const starVel = { x: 0, y: 0 }, soff = { x: 0, y: 0 };
const stars = Array.from({ length: 300 }, (_, i) => ({ x: Math.random(), y: Math.random(), z: .2 + Math.random() * .8, p: Math.random() * 6.28, c: i % 11 === 0 ? "#ffd166" : i % 7 === 0 ? "#7cc4ff" : "#ffffff" }));
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
addEventListener("resize", resize); resize();
function drawStars(t, dt, ox, oy) {
  const cx = W / 2, cy = H / 2;
  for (const s of stars) {
    const x = (((s.x * W + ox * s.z) % W) + W) % W, y = (((s.y * H + oy * s.z) % H) + H) % H;
    const a = .35 + .65 * (.5 + .5 * Math.sin(t * .0015 + s.p));
    ctx.globalAlpha = a * (.4 + s.z * .6); ctx.fillStyle = s.c;
    if (warp > .04) {
      ctx.strokeStyle = s.c; ctx.lineWidth = s.z * 1.4; ctx.beginPath(); ctx.moveTo(x, y);
      ctx.lineTo(x + (x - cx) * warp * .28 * s.z, y + (y - cy) * warp * .28 * s.z); ctx.stroke();
    } else ctx.fillRect(x, y, s.z * 2, s.z * 2);
  }
  ctx.globalAlpha = 1;
}

/* ============================ GAME WORLD =========================== */
const G = {
  w: 2600, h: 1700, ship: { x: 1300, y: 900, vx: 0, vy: 0, a: -Math.PI / 2 }, cam: { x: 0, y: 0 }, target: null, near: null,
  keys: Object.create(null), parts: [], launched: false, sat: { x: 2470, y: 150 }, satCool: 0, thrust: false,
};
const SPOS = { about: [900, 700], skills: [1750, 520], projects: [2150, 1050], papers: [1500, 1400], education: [640, 1260], contact: [1250, 260] };
function rgb(hex) { const n = parseInt(hex.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
function mix(hex, to, f) { const a = rgb(hex), b = to === "w" ? [255, 255, 255] : [0, 0, 0]; return `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], f))).join(",")})`; }
function rgba(hex, al) { return `rgba(${rgb(hex).join(",")},${al})`; }
const camAxis = (p, view, world) => world <= view ? (world - view) / 2 : clamp(p - view / 2, 0, world - view);

function updateGame(dt) {
  const s = G.ship, k = G.keys, locked = S.open || S.term || !S.started;
  let ix = 0, iy = 0;
  if (!locked) { if (k.ArrowLeft || k.a) ix--; if (k.ArrowRight || k.d) ix++; if (k.ArrowUp || k.w) iy--; if (k.ArrowDown || k.s) iy++; }
  let thrust = false;
  if (ix || iy) { G.target = null; const m = Math.hypot(ix, iy); ix /= m; iy /= m; thrust = true; }
  else if (!locked && G.target) {
    const dx = G.target.x - s.x, dy = G.target.y - s.y, d = Math.hypot(dx, dy);
    if (d > 16) { const f = Math.min(1, d / 220); ix = dx / d * f; iy = dy / d * f; thrust = true; } else G.target = null;
  }
  s.vx += ix * 1000 * dt; s.vy += iy * 1000 * dt;
  const fr = Math.exp(-dt * (thrust ? 1.1 : 2.2)); s.vx *= fr; s.vy *= fr;
  const sp = Math.hypot(s.vx, s.vy); if (sp > 560) { s.vx *= 560 / sp; s.vy *= 560 / sp; }
  s.x += s.vx * dt; s.y += s.vy * dt;
  if (s.x < 30) { s.x = 30; s.vx = Math.abs(s.vx) * .4; } if (s.x > G.w - 30) { s.x = G.w - 30; s.vx = -Math.abs(s.vx) * .4; }
  if (s.y < 30) { s.y = 30; s.vy = Math.abs(s.vy) * .4; } if (s.y > G.h - 30) { s.y = G.h - 30; s.vy = -Math.abs(s.vy) * .4; }
  if (sp > 15) { const da = ((Math.atan2(s.vy, s.vx) - s.a + Math.PI * 3) % (Math.PI * 2)) - Math.PI; s.a += da * Math.min(1, dt * 8); }
  if (sp > 40 && !G.launched && !locked) { G.launched = true; unlock("launch"); }
  G.thrust = thrust;
  if (thrust) for (let i = 0; i < 2; i++) G.parts.push({ x: s.x - Math.cos(s.a) * 20, y: s.y - Math.sin(s.a) * 20, vx: -Math.cos(s.a) * 140 + (Math.random() - .5) * 60, vy: -Math.sin(s.a) * 140 + (Math.random() - .5) * 60, l: .55, m: .55 });
  for (let i = G.parts.length - 1; i >= 0; i--) { const p = G.parts[i]; p.x += p.vx * dt; p.y += p.vy * dt; p.l -= dt; if (p.l <= 0) G.parts.splice(i, 1); }
  Snd.thrust(thrust ? Math.min(1, sp / 380) + .15 : 0);
  // nearest planet
  let near = null, bd = 1e9;
  for (const sec of SECTIONS) { const [x, y] = SPOS[sec.id], d = Math.hypot(x - s.x, y - s.y); if (d < 190 && d < bd) { bd = d; near = sec.id; } }
  if (near !== G.near && !S.open) { G.near = near; near ? showDock(near) : hideDock(); setAcc(near ? SEC[near].acc : "#4da3ff"); if (near) Snd.dock(); }
  // hidden satellite
  G.satCool = Math.max(0, G.satCool - dt);
  if (!locked && G.satCool === 0 && Math.hypot(G.sat.x - s.x, G.sat.y - s.y) < 46) { G.satCool = 4; openTerm(true); }
}
function showDock(id) { dockBtn.textContent = "Dock at " + SEC[id].title + "  ▸  (E)"; dockBtn.hidden = false; }
function hideDock() { dockBtn.hidden = true; G.near = null; }
dockBtn.addEventListener("click", () => { if (G.near) openSection(G.near); });

function drawStation(sec, i, t) {
  const [x, y] = SPOS[sec.id], r = 62, near = G.near === sec.id, a = sec.acc;
  ctx.save(); ctx.translate(x, y);
  const gl = ctx.createRadialGradient(0, 0, r * .6, 0, 0, r * (near ? 3.2 : 2.4));
  gl.addColorStop(0, rgba(a, near ? .5 : .28)); gl.addColorStop(1, rgba(a, 0));
  ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(0, 0, r * 3.2, 0, 6.283); ctx.fill();
  const g = ctx.createRadialGradient(-r * .35, -r * .35, r * .1, 0, 0, r);
  g.addColorStop(0, mix(a, "w", .45)); g.addColorStop(.55, a); g.addColorStop(1, mix(a, "b", .65));
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); ctx.fill();
  ctx.strokeStyle = rgba(a, .65); ctx.lineWidth = 3; ctx.save(); ctx.rotate(-.35); ctx.scale(1, .26); ctx.beginPath(); ctx.arc(0, 0, r * 1.6, 0, 6.283); ctx.stroke(); ctx.restore();
  const ma = t * .0007 + i * 1.7; ctx.fillStyle = "#dfe6ff"; ctx.beginPath(); ctx.arc(Math.cos(ma) * (r + 34), Math.sin(ma) * (r + 34) * .6, 6, 0, 6.283); ctx.fill();
  ctx.font = "34px system-ui, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = "#fff"; ctx.fillText(sec.icon, 0, 2);
  if (near) { ctx.strokeStyle = rgba(a, .5 + .4 * Math.sin(t * .008)); ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.arc(0, 0, r + 22 + 3 * Math.sin(t * .006), 0, 6.283); ctx.stroke(); ctx.setLineDash([]); }
  ctx.font = "700 17px Inter, system-ui, sans-serif"; ctx.fillStyle = "#fff"; ctx.fillText(sec.title, 0, r + 62);
  ctx.font = "12px 'JetBrains Mono', monospace"; ctx.fillStyle = "rgba(200,210,240,.7)"; ctx.fillText(sec.tease, 0, r + 82);
  ctx.restore();
}
function drawShip(t) {
  const s = G.ship; ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.a + Math.PI / 2);
  if (G.thrust) { const f = 16 + Math.random() * 12; ctx.fillStyle = "#ffb454"; ctx.beginPath(); ctx.moveTo(-6, 16); ctx.lineTo(0, 16 + f); ctx.lineTo(6, 16); ctx.fill(); ctx.fillStyle = "#fff3c4"; ctx.beginPath(); ctx.moveTo(-3, 16); ctx.lineTo(0, 16 + f * .55); ctx.lineTo(3, 16); ctx.fill(); }
  ctx.fillStyle = "#ff6b9a"; ctx.beginPath(); ctx.moveTo(-10, 4); ctx.lineTo(-22, 22); ctx.lineTo(-10, 16); ctx.fill(); ctx.beginPath(); ctx.moveTo(10, 4); ctx.lineTo(22, 22); ctx.lineTo(10, 16); ctx.fill();
  ctx.fillStyle = "#eaf0ff"; ctx.beginPath(); ctx.moveTo(0, -28); ctx.quadraticCurveTo(15, -6, 10, 16); ctx.lineTo(-10, 16); ctx.quadraticCurveTo(-15, -6, 0, -28); ctx.fill();
  ctx.fillStyle = "#4da3ff"; ctx.beginPath(); ctx.arc(0, -6, 5.5, 0, 6.283); ctx.fill();
  ctx.restore();
}
function drawWorld(t) {
  const cam = G.cam; cam.x = camAxis(G.ship.x, W, G.w); cam.y = camAxis(G.ship.y, H, G.h);
  ctx.save(); ctx.translate(-cam.x, -cam.y);
  ctx.fillStyle = "rgba(140,170,255,.13)";
  for (let gx = Math.max(0, Math.floor(cam.x / 100) * 100); gx <= Math.min(G.w, cam.x + W); gx += 100)
    for (let gy = Math.max(0, Math.floor(cam.y / 100) * 100); gy <= Math.min(G.h, cam.y + H); gy += 100) ctx.fillRect(gx - 1, gy - 1, 2, 2);
  ctx.strokeStyle = "rgba(140,170,255,.28)"; ctx.lineWidth = 2; ctx.setLineDash([12, 12]); ctx.strokeRect(10, 10, G.w - 20, G.h - 20); ctx.setLineDash([]);
  SECTIONS.forEach((s, i) => drawStation(s, i, t));
  // hidden satellite: very faint blink
  const sa = .18 + .14 * Math.max(0, Math.sin(t * .003)); ctx.fillStyle = `rgba(74,222,128,${sa})`; ctx.font = "22px 'JetBrains Mono', monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("◈", G.sat.x, G.sat.y);
  for (const p of G.parts) { ctx.fillStyle = `rgba(255,${Math.round(150 + 100 * p.l / p.m)},90,${p.l / p.m * .8})`; ctx.beginPath(); ctx.arc(p.x, p.y, 3 + 4 * p.l / p.m, 0, 6.283); ctx.fill(); }
  if (G.target) { const pr = (t % 900) / 900; ctx.strokeStyle = `rgba(255,255,255,${.7 - pr * .6})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(G.target.x, G.target.y, 8 + pr * 22, 0, 6.283); ctx.stroke(); }
  drawShip(t);
  ctx.restore();
  // minimap
  const mw = Math.min(150, W * .3), mh = mw * G.h / G.w, mx = W - mw - 16, my = H - mh - 16 - (W < 700 ? 0 : 0);
  ctx.fillStyle = "rgba(6,9,20,.6)"; ctx.strokeStyle = "rgba(255,255,255,.22)"; ctx.lineWidth = 1; ctx.fillRect(mx, my, mw, mh); ctx.strokeRect(mx, my, mw, mh);
  for (const s of SECTIONS) { const [x, y] = SPOS[s.id]; ctx.fillStyle = s.acc; ctx.beginPath(); ctx.arc(mx + x / G.w * mw, my + y / G.h * mh, 3, 0, 6.283); ctx.fill(); }
  ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(mx + G.ship.x / G.w * mw, my + G.ship.y / G.h * mh, 3.5, 0, 6.283); ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.4)"; ctx.strokeRect(mx + cam.x / G.w * mw, my + cam.y / G.h * mh, Math.min(mw, W / G.w * mw), Math.min(mh, H / G.h * mh));
}
cv.addEventListener("pointerdown", e => {
  if (S.mode !== "game" || S.open || S.term || !S.started) return;
  const wx = e.clientX + G.cam.x, wy = e.clientY + G.cam.y;
  if (G.near) { const [x, y] = SPOS[G.near]; if (Math.hypot(wx - x, wy - y) < 90) { openSection(G.near); return; } }
  G.target = { x: wx, y: wy };
});

/* ========================== MODE SWITCHING ========================= */
const HINTS = {
  cube: TOUCH_HINT("Drag to spin the cube · tap a face to open it", "Drag to spin the cube · click a face to open it · arrow keys work too"),
  game: TOUCH_HINT("Tap anywhere to fly · tap a planet to dock · something is hidden out there…", "Arrow keys / WASD to fly · click to move · E to dock · something is hidden out there…"),
};
function TOUCH_HINT(t, d) { return matchMedia("(hover: none)").matches ? t : d; }
function setMode(m) {
  if (S.mode === m) return;
  if (S.open) closePanel();
  S.mode = m; Snd.whoosh(); if (!RM) warp = 1; hideDock(); Snd.thrust(0);
  body.classList.toggle("mode-cube", m === "cube"); body.classList.toggle("mode-game", m === "game");
  $("#bMode .ic").textContent = m === "cube" ? "🚀" : "🧊"; $("#bMode .lbl").textContent = m === "cube" ? "Game mode" : "Cube mode";
  hint.textContent = HINTS[m]; G.target = null;
  setAcc(m === "cube" ? SEC[facingId].acc : "#4da3ff");
}
$("#bMode").addEventListener("click", () => { Snd.click(); setMode(S.mode === "cube" ? "game" : "cube"); });
$("#bSound").addEventListener("click", () => { Snd.set(!Snd.on); syncSound(); Snd.click(); });
function syncSound() { $("#bSound .ic").textContent = Snd.on ? "🔊" : "🔇"; $("#bSound .lbl").textContent = Snd.on ? "Sound on" : "Sound off"; }
$("#bAch").addEventListener("click", () => { achEl.hidden = !achEl.hidden; Snd.click(); });
document.addEventListener("pointerdown", e => { if (!achEl.hidden && !e.target.closest("#ach,#bAch")) achEl.hidden = true; });

/* ============================== TERMINAL =========================== */
const term = $("#term"), tout = $("#tout"), tin = $("#tin"), hist = []; let hi = 0;
function say(text, cls) { const d = h("div", { class: cls || "" }); d.textContent = text; tout.append(d); tout.scrollTop = 1e9; }
function sayLink(label, href) { tout.append(h("div", null, ext(label, href))); tout.scrollTop = 1e9; }
function openTerm(found) {
  if (S.term) return;
  S.term = true; lastFocus = document.activeElement; term.classList.add("open"); term.setAttribute("aria-hidden", "false"); Snd.blip(); hideDock();
  if (found) unlock("terminal");
  if (!tout.children.length) { say("Welcome, explorer. You found the hidden terminal. 👾", ""); say("Type 'help' to see what I can do.", "dim"); }
  setTimeout(() => tin.focus(), 60);
}
function closeTerm() { if (!S.term) return; S.term = false; term.classList.remove("open"); term.setAttribute("aria-hidden", "true"); tin.blur(); }
$("#tClose").addEventListener("click", closeTerm);
function confetti() {
  const cols = ["#4da3ff", "#b583ff", "#ffb454", "#22d3ee", "#4ade80", "#ff6b9a"];
  for (let i = 0; i < 70; i++) {
    const c = h("div", { class: "confetti", style: `left:${Math.random() * 100}vw;background:${cols[i % 6]};animation-duration:${2 + Math.random() * 2}s;animation-delay:${Math.random() * .6}s` });
    document.body.append(c); setTimeout(() => c.remove(), 4800);
  }
}
const CMDS = {
  help() { say("about · skills · projects · papers · education · contact"); say("open <section> · resume · github · linkedin · achievements"); say("sound on|off · whoami · clear · exit"); say("…and maybe one secret command if you ask nicely.", "dim"); },
  whoami() { say("harishma — data science student · builder · lifelong learner"); },
  about() { say(ABOUT.text); },
  skills() { SKILLS.forEach(g => say(g.g + ": " + g.items.map(i => i[1]).join(", "))); },
  projects() { PROJECTS.forEach(p => { say("• " + p.title + " — " + p.desc); (p.repo ? sayLink("   " + GITHUB.replace("https://", "") + "/" + p.repo, GITHUB + "/" + p.repo) : say("   " + (p.status || ""))); }); },
  papers() { PAPERS.forEach(p => say("• " + p.title + " — " + [p.venue, p.place, p.year].filter(Boolean).join(", ") + " (" + p.scope + (p.status ? ", " + p.status.toLowerCase() : "") + ")")); },
  education() { EDU.forEach(e => say(e.d + "  " + e.t + " · " + e.s)); },
  contact() { say("Email: " + EMAIL); sayLink("GitHub: " + GITHUB, GITHUB); sayLink("LinkedIn: " + LINKEDIN, LINKEDIN); },
  resume() { say("Downloading résumé…"); const a = h("a", { href: RESUME, download: "" }); document.body.append(a); a.click(); a.remove(); },
  github() { say("Opening GitHub…"); window.open(GITHUB, "_blank", "noopener"); },
  linkedin() { say("Opening LinkedIn…"); window.open(LINKEDIN, "_blank", "noopener"); },
  achievements() { ACH.forEach(a => say((got.has(a.id) ? "✔ " : "✖ ") + a.n + (got.has(a.id) ? "" : "  (" + a.d + ")"), got.has(a.id) ? "" : "dim")); },
  sound(a) { const v = a[0] === "on"; if (a[0] !== "on" && a[0] !== "off") return say("usage: sound on|off", "err"); Snd.set(v); syncSound(); say("sound " + (v ? "on 🔊" : "off 🔇")); },
  clear() { tout.replaceChildren(); },
  exit() { closeTerm(); },
  open(a) { const id = a[0]; if (!SEC[id]) return say("usage: open " + SECTIONS.map(s => s.id).join("|"), "err"); say("opening " + id + "…"); closeTerm(); setTimeout(() => openSection(id), 350); },
};
function runCmd(line) {
  const raw = line.trim(); say("❯ " + raw, "cmd"); if (!raw) return;
  const low = raw.toLowerCase();
  if (/^sudo hire (harishma|me)$/.test(low)) {
    say("[sudo] permission granted ✔", ""); say("Compiling offer letter…  ██████████ 100%"); say("🎉 Excellent decision. Harishma will start immediately.");
    confetti(); Snd.chime(); unlock("hired"); return;
  }
  if (low.startsWith("sudo")) return say("Nice try. Be more polite. 😄", "err");
  const [c, ...a] = low.split(/\s+/);
  if (Object.prototype.hasOwnProperty.call(CMDS, c)) CMDS[c](a); else say("command not found: " + c + ". Type 'help'.", "err");
}
tin.addEventListener("keydown", e => {
  e.stopPropagation();
  if (e.key === "Enter") { const v = tin.value; if (v.trim()) { hist.push(v); hi = hist.length; } tin.value = ""; runCmd(v); }
  else if (e.key === "ArrowUp") { if (hi > 0) tin.value = hist[--hi]; e.preventDefault(); }
  else if (e.key === "ArrowDown") { tin.value = hi < hist.length - 1 ? hist[++hi] : ((hi = hist.length), ""); e.preventDefault(); }
  else if (e.key === "Escape") closeTerm();
});
// secret #2: click the name 5 times quickly (or press the ` key)
let brandClicks = [];
$("#brand").addEventListener("click", () => {
  const n = performance.now(); brandClicks = brandClicks.filter(t => n - t < 2500); brandClicks.push(n);
  if (brandClicks.length >= 5) { brandClicks = []; openTerm(true); }
});

/* ============================== KEYBOARD =========================== */
addEventListener("keydown", e => {
  const tag = (document.activeElement && document.activeElement.tagName) || "";
  if (/INPUT|TEXTAREA/.test(tag)) return;
  if (e.key === "`" || e.key === "~") { e.preventDefault(); S.term ? closeTerm() : (S.started && openTerm(true)); return; }
  if (e.key === "Escape") { if (S.term) closeTerm(); else if (S.open) closePanel(); else achEl.hidden = true; return; }
  if (!S.started || S.open || S.term) return;
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (S.mode === "game") {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(k)) e.preventDefault();
    G.keys[k] = true;
    if ((k === "e" || k === "Enter" || k === " ") && G.near) openSection(G.near);
  } else {
    S.idle = 0;
    if (k === "ArrowLeft") { e.preventDefault(); stepFace("L"); }
    else if (k === "ArrowRight") { e.preventDefault(); stepFace("R"); }
    else if (k === "ArrowUp") { e.preventDefault(); stepFace("U"); }
    else if (k === "ArrowDown") { e.preventDefault(); stepFace("D"); }
    else if ((k === "Enter" || k === " ") && !/BUTTON|A/.test(tag)) { e.preventDefault(); openSection(facingId); }
  }
});
addEventListener("keyup", e => { delete G.keys[e.key.length === 1 ? e.key.toLowerCase() : e.key]; });
addEventListener("blur", () => { for (const k in G.keys) delete G.keys[k]; });

/* ============================== MAIN LOOP ========================== */
let last = performance.now();
function frame(t) {
  const dt = Math.min(.05, (t - last) / 1000); last = t;
  if (!document.hidden) {
    ctx.clearRect(0, 0, W, H);
    warp = Math.max(0, warp - dt * 1.4);
    if (S.mode === "cube") {
      updateCube(dt, t);
      if (!RM) { soff.x -= starVel.x * 3 + dt * 8; soff.y += starVel.y * 3; }
      drawStars(t, dt, soff.x, soff.y);
    } else {
      updateGame(dt);
      drawStars(t, dt, -G.cam.x * .3, -G.cam.y * .3);
      drawWorld(t);
    }
  }
  requestAnimationFrame(frame);
}

/* =============================== START ============================= */
function enter(withSound) {
  if (S.started) return;
  S.started = true;
  Snd.set(withSound); syncSound();
  $("#gate").classList.add("off");
  hint.textContent = HINTS.cube;
  if (RM) { cube.rx = 0; cube.ry = 0; } else { scene.classList.add("intro"); warp = 1; Snd.whoosh(); snapTo("about"); }
  setAcc(SEC.about.acc); S.idle = -2;
}
$("#gSound").addEventListener("click", () => enter(true));
$("#gSilent").addEventListener("click", () => enter(false));
renderAch(); syncSound(); hint.textContent = HINTS.cube;
[...facenav.children].forEach(b => b.classList.toggle("on", b.dataset.id === "about"));
requestAnimationFrame(frame);
