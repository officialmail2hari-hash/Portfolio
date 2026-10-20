"use strict";
/* =====================================================================
   HARISHMA M — all portfolio content. Edit here; cube, game and classic pages all read this file.
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
  { d: "2019 – 2020", t: "Higher Secondary", s: "AKD Dharmaraja Girls Higher Secondary School · State Board", icon: "🏫",
    role: "Completed higher secondary education under the State Board.", ach: [] },
];

/* ========================== ACHIEVEMENTS =========================== */
const ACH = [
  { id: "launch",   e: "🚀", n: "First Launch",              d: "Take off in Game mode" },
  { id: "explorer", e: "🧭", n: "Explorer",                  d: "Open all 6 sections" },
  { id: "spinner",  e: "🌀", n: "Cube Spinner",              d: "Spin the cube a full turn" },
  { id: "papers",   e: "📜", n: "Paper Chaser",              d: "Open the Papers section" },
  { id: "terminal", e: "👾", n: "Found the hidden terminal", d: "Hint: it hides far from the planets…" },
  { id: "hired",    e: "🎉", n: "Hired!",                    d: "Hint: try a very polite command with sudo" },
];
