const GH_USER = "officialmail2hari-hash";

const projects = [
  {
    title: "HELIXVAULT",
    description: "A DNA Based Cold Data Archival System that uses DNA sequences to encode and store digital data.",
    tags: ["Python", "Data Storage", "Bioinformatics"],
    repo: "HeliXVault",
    demo: "",
  },
  {
    title: "MYZONE-SFRC360",
    description: "An AI-powered campus management platform integrating student services, academic information, and campus operations.",
    tags: ["Python", "AI", "Campus Tech"],
    repo: "MyZone-360",
    demo: "",
  },
  {
    title: "MONLYTICX",
    description: "An Expense Tracker Web Application that allows users to track their expenses and manage their finances effectively.",
    tags: ["Python", "Web", "Finance"],
    repo: "Expenses",
    demo: "",
  },
  {
    title: "PRAGYA AI",
    description: "An AI-powered chatbot that provides personalized responses and assistance to users based on their queries and preferences.",
    tags: ["AI", "Chatbot", "HTML"],
    repo: "Pragya",
    demo: "",
  },
];

const roles = ["Data Science Student", "Data Analyst", "Problem Solver", "Lifelong Learner"];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = matchMedia("(hover: hover)").matches;

/* canvas state (declared early because setTheme uses it) */
let W, H, dots = [], mouse = { x: -999, y: -999 }, dotColor = "124,140,255";

/* ---------- Theme toggle (button or press T) ---------- */
const root = document.documentElement;
const toggle = $("#themeToggle");
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || "dark");

function setTheme(t) {
  root.setAttribute("data-theme", t);
  toggle.textContent = t === "dark" ? "🌙" : "☀️";
  try { localStorage.setItem("theme", t); } catch (e) {}
  readColors();
}
const flipTheme = () => setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
toggle.addEventListener("click", flipTheme);
addEventListener("keydown", e => {
  if (e.key.toLowerCase() !== "t" || e.ctrlKey || e.metaKey || e.altKey) return;
  if (/input|textarea/i.test(document.activeElement.tagName)) return;
  flipTheme();
});

/* ---------- Typing animation ---------- */
const typed = $("#typed");
let r = 0, c = 0, deleting = false;
(function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 1400); }
  if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; }
  c += deleting ? -1 : 1;
  setTimeout(type, deleting ? 40 : 85);
})();

/* ---------- Projects: filter + search + modal ---------- */
const grid = $("#grid");
const filtersEl = $("#filters");
const searchEl = $("#search");
const emptyEl = $("#empty");
let activeTag = "All";

const repoUrl = p => p.repo ? `https://github.com/${GH_USER}/${p.repo}` : `https://github.com/${GH_USER}?tab=repositories`;

const allTags = ["All", ...new Set(projects.flatMap(p => p.tags))];
allTags.forEach(tag => {
  const b = document.createElement("button");
  b.className = "chip" + (tag === "All" ? " active" : "");
  b.textContent = tag;
  b.addEventListener("click", () => {
    activeTag = tag;
    $$(".chip", filtersEl).forEach(x => x.classList.toggle("active", x === b));
    render();
  });
  filtersEl.appendChild(b);
});
searchEl.addEventListener("input", render);

function link(text, href) {
  const a = document.createElement("a");
  a.textContent = text; a.href = href; a.target = "_blank"; a.rel = "noopener";
  return a;
}

function render() {
  const q = searchEl.value.trim().toLowerCase();
  const list = projects.filter(p =>
    (activeTag === "All" || p.tags.includes(activeTag)) &&
    (p.title + " " + p.description + " " + p.tags.join(" ")).toLowerCase().includes(q)
  );
  grid.innerHTML = "";
  list.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "card";
    card.style.setProperty("--i", i);
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", "Open details for " + p.title);
    const h = document.createElement("h4"); h.textContent = p.title;
    const d = document.createElement("p"); d.textContent = p.description;
    const tags = document.createElement("div"); tags.className = "tags";
    p.tags.forEach(t => { const s = document.createElement("span"); s.textContent = t; tags.appendChild(s); });
    const links = document.createElement("div"); links.className = "links";
    if (p.demo) links.appendChild(link("Live demo ↗", p.demo));
    links.appendChild(link("Code ↗", repoUrl(p)));
    const hint = document.createElement("span"); hint.className = "hint"; hint.textContent = "Click for details";
    card.append(h, d, tags, links, hint);
    if (p.stars != null) {
      const bd = document.createElement("span"); bd.className = "badge"; bd.textContent = `★ ${p.stars}`;
      card.insertBefore(bd, d);
    }
    card.addEventListener("click", e => { if (!e.target.closest("a")) openModal(p); });
    card.addEventListener("keydown", e => {
      if ((e.key === "Enter" || e.key === " ") && e.target === card) { e.preventDefault(); openModal(p); }
    });
    if (canHover && !reduceMotion) tilt(card, 7);
    grid.appendChild(card);
  });
  emptyEl.hidden = list.length > 0;
}
$("#statProjects").dataset.count = projects.length;
render();

/* 3D tilt + cursor glow inside a card */
function tilt(el, max) {
  el.addEventListener("mousemove", e => {
    const b = el.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
    el.style.setProperty("--ry", ((x - .5) * max * 2).toFixed(2) + "deg");
    el.style.setProperty("--rx", ((.5 - y) * max * 2).toFixed(2) + "deg");
    el.style.setProperty("--mx", (x * 100) + "%");
    el.style.setProperty("--my", (y * 100) + "%");
  });
  el.addEventListener("mouseleave", () => {
    el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg");
  });
}

/* Modal */
const modal = $("#modal");
function openModal(p) {
  $("#mTitle").textContent = p.title;
  $("#mDesc").textContent = p.description;
  const t = $("#mTags"); t.innerHTML = "";
  p.tags.forEach(x => { const s = document.createElement("span"); s.textContent = x; t.appendChild(s); });
  const meta = [];
  if (p.language) meta.push(p.language);
  if (p.stars != null) meta.push(`★ ${p.stars}`);
  if (p.updated) meta.push("Updated " + new Date(p.updated).toLocaleDateString(undefined, { month: "short", year: "numeric" }));
  $("#mMeta").textContent = meta.join("  ·  ");
  $("#mMeta").hidden = !meta.length;
  const l = $("#mLinks"); l.innerHTML = "";
  if (p.demo) l.appendChild(link("Live demo ↗", p.demo));
  l.appendChild(link("View on GitHub ↗", repoUrl(p)));
  if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
}
$("#mClose").addEventListener("click", () => modal.close());
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

async function loadGitHub() {
  let repos = null;
  const key = "gh-repos-" + GH_USER;
  try {
    const cached = JSON.parse(sessionStorage.getItem(key) || "null");
    if (cached && Date.now() - cached.t < 36e5) repos = cached.data;
  } catch (e) {}
  if (!repos) {
    try {
      const res = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`);
      if (!res.ok) return;
      repos = await res.json();
      try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), data: repos })); } catch (e) {}
    } catch (e) { return; }
  }
  if (!Array.isArray(repos)) return;

  const used = new Set();
  projects.forEach(p => {
    const m = repos.find(x => x.name.toLowerCase() === (p.repo || "").toLowerCase());
    if (!m) return;
    used.add(m.name.toLowerCase());
    p.repo = m.name;
    p.stars = m.stargazers_count;
    p.language = m.language;
    p.updated = m.pushed_at;
    if (!p.demo && m.homepage) p.demo = m.homepage;
  });
  render();

  const rest = repos.filter(x => !x.fork && x.language && !used.has(x.name.toLowerCase()) && x.name.toLowerCase() !== GH_USER.toLowerCase());
  if (rest.length) {
    const list = $("#moreList"); list.innerHTML = "";
    rest.slice(0, 6).forEach(x => {
      const a = link("", x.html_url);
      const b = document.createElement("b"); b.textContent = x.name;
      const s = document.createElement("small"); s.textContent = [x.language, x.description].filter(Boolean).join(" · ");
      a.append(b, s); list.appendChild(a);
    });
    $("#more").hidden = false;
  }
}
loadGitHub();

const skillCards = $$(".skill-card");
skillCards.forEach(card => {
  if (canHover && !reduceMotion) tilt(card, 9);
});
$$("#skillTabs .chip").forEach(btn => btn.addEventListener("click", () => {
  $$("#skillTabs .chip").forEach(x => x.classList.toggle("active", x === btn));
  let n = 0;
  skillCards.forEach(card => {
    const show = btn.dataset.cat === "all" || card.dataset.cat === btn.dataset.cat;
    card.classList.toggle("hide", !show);
    card.classList.remove("pop-in");
    if (show) { void card.offsetWidth; card.style.setProperty("--i", n++); card.classList.add("pop-in"); }
  });
}));


function countUp(el) {
  const end = parseFloat(el.dataset.count), dec = +el.dataset.decimals || 0;
  if (reduceMotion) { el.textContent = end.toFixed(dec); return; }
  const t0 = performance.now(), dur = 1400;
  (function step(t) {
    const k = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - k, 3);
    el.textContent = (end * eased).toFixed(dec);
    if (k < 1) requestAnimationFrame(step);
  })(t0);
}
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("visible");
    $$(".skill-card", e.target).forEach((s, i) => { s.style.setProperty("--i", i); s.classList.add("pop-in"); });
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
$$(".reveal").forEach(el => io.observe(el));

const statIO = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { countUp(e.target); statIO.unobserve(e.target); } });
}, { threshold: 0.6 });
$$("[data-count]").forEach(el => statIO.observe(el));


const navLinks = $$(".nav nav a");
const secIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach(s => secIO.observe(s));


const bar = $("#progress"), toTop = $("#toTop");
let ticking = false;
addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    toTop.hidden = scrollY < 600;
    ticking = false;
  });
}, { passive: true });
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));


const glow = $("#glow");
if (canHover && !reduceMotion) {
  addEventListener("mousemove", e => { glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`; }, { passive: true });
}

/* ---------- Background: connected dots that react to the mouse ---------- */
const cv = $("#bg"), ctx = cv.getContext("2d");
function readColors() {
  const v = getComputedStyle(root).getPropertyValue("--accent").trim();
  const m = /^#([0-9a-f]{6})$/i.exec(v);
  if (m) { const n = parseInt(m[1], 16); dotColor = `${n >> 16},${(n >> 8) & 255},${n & 255}`; }
}
function sizeCanvas() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight;
  cv.width = W * dpr; cv.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const n = Math.min(70, Math.round(W * H / 22000));
  dots = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }));
}
if (!reduceMotion) {
  readColors(); sizeCanvas();
  addEventListener("resize", sizeCanvas);
  addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  (function frame() {
    ctx.clearRect(0, 0, W, H);
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
      const dx = d.x - mouse.x, dy = d.y - mouse.y, dist = Math.hypot(dx, dy);
      if (dist < 110 && dist > 0) { d.x += dx / dist * 1.2; d.y += dy / dist * 1.2; }
      ctx.fillStyle = `rgba(${dotColor},.8)`;
      ctx.beginPath(); ctx.arc(d.x, d.y, 1.6, 0, 6.283); ctx.fill();
    }
    for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) {
      const a = dots[i], b = dots[j], dd = Math.hypot(a.x - b.x, a.y - b.y);
      if (dd < 120) {
        ctx.strokeStyle = `rgba(${dotColor},${(1 - dd / 120) * .35})`;
        ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
    requestAnimationFrame(frame);
  })();
}


$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
  location.href = `mailto:officialmail2hari@gmail.com?subject=${encodeURIComponent("Portfolio message from " + f.get("name"))}&body=${encodeURIComponent(body)}`;
});

$("#year").textContent = new Date().getFullYear();



(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover)").matches;

  // ticker: duplicate the items so the loop is seamless
  const track = document.querySelector(".marquee-track");
  if (track) track.innerHTML += track.innerHTML;

  if (reduce) return;

  // click ripple on buttons and chips
  document.addEventListener("click", e => {
    const t = e.target.closest(".btn, .chip");
    if (!t) return;
    const b = t.getBoundingClientRect(), s = Math.max(b.width, b.height);
    const dot = document.createElement("span");
    dot.className = "ripple";
    dot.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - b.left - s / 2}px;top:${e.clientY - b.top - s / 2}px`;
    t.appendChild(dot);
    setTimeout(() => dot.remove(), 650);
  });

  // magnetic buttons: they lean toward the cursor
  if (fine) document.querySelectorAll(".btn, #themeToggle").forEach(el => {
    el.addEventListener("mousemove", e => {
      const b = el.getBoundingClientRect();
      el.style.translate = `${(e.clientX - b.left - b.width / 2) * .25}px ${(e.clientY - b.top - b.height / 2) * .35}px`;
    });
    el.addEventListener("mouseleave", () => { el.style.translate = ""; });
  });

  // scroll position for the hero blob parallax
  addEventListener("scroll", () => {
    document.documentElement.style.setProperty("--sy", Math.min(scrollY, 1500));
  }, { passive: true });
})();

/* ===== NAME: 3D TILT + SPOTLIGHT (paste at the very end of script.js) ===== */
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!matchMedia("(hover: hover)").matches) return;      // mouse devices only
  const hero = document.querySelector(".hero");
  const h1 = document.querySelector(".hero h1");
  if (!hero || !h1) return;

  hero.addEventListener("mousemove", e => {
    const b = h1.getBoundingClientRect();
    // tilt toward the cursor (max about 10 degrees)
    const x = (e.clientX - (b.left + b.width / 2)) / innerWidth;
    const y = (e.clientY - (b.top + b.height / 2)) / innerHeight;
    h1.style.setProperty("--hy", (x * 14).toFixed(2) + "deg");
    h1.style.setProperty("--hx", (-y * 14).toFixed(2) + "deg");
    // spotlight position inside the name
    h1.style.setProperty("--nx", (e.clientX - b.left) + "px");
    h1.style.setProperty("--ny", (e.clientY - b.top) + "px");
  });
  hero.addEventListener("mouseleave", () => {
    h1.style.setProperty("--hx", "0deg");
    h1.style.setProperty("--hy", "0deg");
    h1.style.setProperty("--nx", "-300px");
    h1.style.setProperty("--ny", "-300px");
  });
})();

/* ===== SPLASH + COLOUR SHIFT ===== */
(() => {
  const html = document.documentElement;
  const splash = document.getElementById("splash");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let seen = false;
  try { seen = !!sessionStorage.getItem("splash"); } catch (e) {}

  /* --- Splash: plays once per visit; click, Enter, Esc or Skip to leave early --- */
  if (splash && (reduce || seen)) {
    splash.remove();
  } else if (splash) {
    html.classList.add("splashing");
    const pct = document.getElementById("spPct");
    const t0 = performance.now(), DUR = 2200;
    let done = false;

    function finish() {
      if (done) return;
      done = true;
      splash.classList.add("leave");
      try { sessionStorage.setItem("splash", "1"); } catch (e) {}
      setTimeout(() => {                         // hero starts animating as the curtain lifts
        html.classList.remove("splashing");
        document.querySelectorAll("[data-count]").forEach(el => countUp(el));
      }, 250);
      setTimeout(() => splash.remove(), 1000);
    }
    (function tick(t) {
      if (done) return;
      const n = Math.min(100, Math.round((t - t0) / DUR * 100));
      pct.textContent = n;
      if (n < 100) requestAnimationFrame(tick); else setTimeout(finish, 250);
    })(t0);

    splash.addEventListener("click", finish);
    addEventListener("keydown", e => { if (e.key === "Escape" || e.key === "Enter") finish(); });
  }

  /* --- Colour shift: tell the page which section you are in --- */
  const secIO2 = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      html.dataset.sec = e.target.id;
      setTimeout(readColors, 1300);              // let the background dots pick up the new colour
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach(s => secIO2.observe(s));
})();

/* ===== NAME DECODE EFFECT (paste at the very end of script.js) ===== */
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const h1 = document.querySelector(".hero h1");
  if (!h1) return;
  const finalText = h1.textContent.trim();
  h1.setAttribute("aria-label", finalText);          // screen readers read the real name
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}#%&*";
  let running = false;

  function scramble() {
    if (running) return;
    running = true;
    const total = 20;                                 // more frames = slower effect
    let frame = 0;
    const timer = setInterval(() => {
      const revealed = Math.floor(frame / total * finalText.length);
      h1.textContent = [...finalText].map((ch, i) =>
        ch === " " || i < revealed ? ch : glyphs[Math.floor(Math.random() * glyphs.length)]
      ).join("");
      if (++frame > total) { clearInterval(timer); h1.textContent = finalText; running = false; }
    }, 45);
  }

  setTimeout(scramble, 600);                          // plays once on load
  h1.addEventListener("mouseenter", scramble);        // and when you hover
  h1.addEventListener("click", scramble);             // or click / tap
})();