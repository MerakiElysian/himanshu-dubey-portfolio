import { useState, useRef, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────── */
interface ProjectMedia {
  type: "image" | "video";
  src: string;
  caption?: string;
}

interface Project {
  name: string;
  tag: string;
  year: string;
  role: string;
  duration: string;
  stack: string[];
  description: string;
  highlights: string[];
  color: string;
  github?: string;
  media?: ProjectMedia[];
}

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const projects: Project[] = [
  {
    name: "Horizon App",
    tag: "Product Design",
    year: "2024",
    role: "Lead Designer & Developer",
    duration: "4 months",
    stack: ["React", "TypeScript", "Figma", "Framer Motion"],
    description:
      "A productivity platform built for remote-first teams. Designed the end-to-end experience from initial wireframes through high-fidelity prototypes, then led front-end implementation.",
    highlights: [
      "Reduced onboarding time by 40% through progressive disclosure",
      "Shipped design system with 60+ reusable components",
      "0 → 12k users in first quarter post-launch",
    ],
    color: "#c8473a",
    github: "https://github.com/yourname/horizon-app",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
        caption: "Dashboard overview — light mode",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
        caption: "Onboarding flow wireframes",
      },
    ],
  },
  {
    name: "Vault Finance",
    tag: "Web Dev",
    year: "2024",
    role: "Front-End Engineer",
    duration: "6 months",
    stack: ["Next.js", "TypeScript", "Tailwind", "D3.js"],
    description:
      "Personal finance dashboard helping users visualise spending, investments, and net worth in real-time. Focused on data density without cognitive overload.",
    highlights: [
      "Built interactive charts rendering 100k+ data points at 60fps",
      "Achieved Lighthouse score of 98 across all metrics",
      "End-to-end encryption with zero-knowledge architecture",
    ],
    color: "#2a6496",
    github: "https://github.com/yourname/vault-finance",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
        caption: "Portfolio performance chart",
      },
      {
        type: "video",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        caption: "Real-time data update demo",
      },
    ],
  },
  {
    name: "Muse Creative",
    tag: "Branding",
    year: "2023",
    role: "Creative Director",
    duration: "3 months",
    stack: ["Figma", "Adobe Illustrator", "After Effects"],
    description:
      "Full visual identity for a boutique creative agency — logo system, typography scale, colour palette, brand guidelines, and motion language.",
    highlights: [
      "Identity system spanning 200+ brand touchpoints",
      "Motion guidelines adopted across all social channels",
      "Featured in Brand New Awards 2023",
    ],
    color: "#7b4f9e",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1200&q=80",
        caption: "Brand identity system overview",
      },
    ],
  },
  {
    name: "Strata UI Kit",
    tag: "Design System",
    year: "2023",
    role: "Design Systems Lead",
    duration: "8 months",
    stack: ["Figma", "React", "Storybook", "CSS Variables"],
    description:
      "Open-source design system used by 30+ product teams. Covers foundations, components, patterns, and accessibility guidelines baked in from day one.",
    highlights: [
      "3.2k GitHub stars in first six months",
      "WCAG 2.1 AA compliant across all components",
      "Adopted by 3 Fortune 500 companies",
    ],
    color: "#2e7d32",
    github: "https://github.com/yourname/strata-ui",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80",
        caption: "Component library overview",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80",
        caption: "Token documentation page",
      },
    ],
  },
  {
    name: "Echo Dashboard",
    tag: "Web Dev",
    year: "2023",
    role: "Full-Stack Developer",
    duration: "5 months",
    stack: ["Vue 3", "Node.js", "PostgreSQL", "Chart.js"],
    description:
      "Analytics dashboard for a SaaS platform, aggregating data from 10+ sources into a single, customisable view for non-technical stakeholders.",
    highlights: [
      "Reduced reporting time from hours to minutes",
      "Custom drag-and-drop widget system",
      "Real-time updates via WebSockets",
    ],
    color: "#c07b2a",
    github: "https://github.com/yourname/echo-dashboard",
  },
  {
    name: "Prism Brand",
    tag: "Branding",
    year: "2022",
    role: "Brand Designer",
    duration: "2 months",
    stack: ["Figma", "Adobe Suite"],
    description:
      "Brand identity for an AR startup. The visual language needed to communicate cutting-edge technology while remaining warm and approachable.",
    highlights: [
      "Logo system works across physical and digital surfaces",
      "Pitch deck helped secure $4M seed round",
      "Brand guidelines published as public Figma file",
    ],
    color: "#d84e9f",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=1200&q=80",
        caption: "Logo system variations",
      },
    ],
  },
  {
    name: "Orbit Mobile",
    tag: "Product Design",
    year: "2022",
    role: "Product Designer",
    duration: "7 months",
    stack: ["Figma", "React Native", "Expo"],
    description:
      "Habit tracking app with a focus on long-term behaviour change rather than streaks. Won Product Hunt #1 Product of the Day.",
    highlights: [
      "#1 Product Hunt on launch day",
      "4.8 ★ rating with 2k+ reviews",
      "Featured in Apple App Store editorial",
    ],
    color: "#1a7a6e",
    github: "https://github.com/yourname/orbit-mobile",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
        caption: "App home screen — habit grid",
      },
      {
        type: "video",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        caption: "Onboarding animation walkthrough",
      },
    ],
  },
];

const skills = [
  { name: "React / TypeScript",  pct: 92 },
  { name: "UI / UX Design",      pct: 88 },
  { name: "Motion Design",       pct: 75 },
  { name: "Node / Backend",      pct: 70 },
  { name: "Creative Direction",  pct: 85 },
  { name: "Figma / Prototyping", pct: 90 },
  { name: "CSS / Animation",     pct: 87 },
];

const contacts = [
  { platform: "Email",    label: "hello@yourname.com",    href: "mailto:hello@yourname.com" },
  { platform: "GitHub",   label: "github.com/yourname",   href: "#" },
  { platform: "LinkedIn", label: "in/yourname",           href: "#" },
  { platform: "Dribbble", label: "dribbble.com/yourname", href: "#" },
  { platform: "Twitter",  label: "@yourname",             href: "#" },
];

const sections = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];

/* ─────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────── */
const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0e0d0b;
    --paper: #f5f0e8;
    --accent: #c8473a;
    --muted: #8a8070;
    --line: rgba(14,13,11,0.12);
  }

  html, body, #root { height: 100%; width: 100%; overflow: hidden; }

  .port-root {
    height: 100vh; width: 100vw;
    background: var(--paper);
    overflow: hidden; position: relative;
    cursor: none;
  }

  /* ── Custom cursor ── */
  @media (pointer: coarse) { .cursor { display: none; } .port-root { cursor: auto; } }
  .cursor { position: fixed; pointer-events: none; z-index: 99999; }

  .cursor-dot {
    width: 8px; height: 8px;
    background: var(--cursor-color, var(--accent));
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: background 0.3s;
  }

  .cursor-ring {
    width: 36px; height: 36px;
    border: 1.5px solid var(--cursor-color, var(--accent));
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.25s, height 0.25s, opacity 0.25s,
                border-color 0.25s, background 0.25s;
  }
  .cursor-ring.hovered  { width: 54px; height: 54px; opacity: 0.6; }
  .cursor-ring.on-project {
    width: 76px; height: 76px;
    border-color: var(--cursor-color, var(--accent));
    background: color-mix(in srgb, var(--cursor-color, var(--accent)) 15%, transparent);
    opacity: 1;
  }

  /* ── Track ── */
  .track { display: flex; height: 100vh; width: 400vw; will-change: transform; }

  /* ── Section base ── */
  .section {
    width: 100vw; height: 100vh; flex-shrink: 0;
    position: relative; display: flex;
    align-items: center; justify-content: center;
    overflow: hidden; border-right: 1px solid var(--line);
  }

  .sec-label {
    position: absolute; top: 20px; left: 24px;
    font-family: 'DM Mono', monospace; font-size: 10px;
    font-weight: 300; letter-spacing: 0.15em; color: var(--muted); z-index: 10;
  }
  @media (min-width: 768px) { .sec-label { top: 40px; left: 52px; font-size: 11px; } }

  .sec-bg-num {
    position: absolute; bottom: -0.1em; right: -0.05em;
    font-family: 'Playfair Display', serif;
    font-size: clamp(120px, 22vw, 380px); font-weight: 700;
    color: transparent; -webkit-text-stroke: 1px var(--line);
    line-height: 1; pointer-events: none; user-select: none; z-index: 0;
  }

  /* ════════ HERO ════════ */
  .s0-inner { position: relative; z-index: 2; padding: 0 24px; max-width: 900px; width: 100%; }
  @media (min-width: 768px) { .s0-inner { padding: 0 52px; } }
  .s0-eyebrow { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.2em; color:var(--accent); text-transform:uppercase; margin-bottom:20px; }
  @media(min-width:768px){.s0-eyebrow{font-size:11px;margin-bottom:28px;}}
  .s0-name { font-family:'Playfair Display',serif; font-size:clamp(44px,10vw,110px); font-weight:700; color:var(--ink); line-height:.95; margin-bottom:24px; }
  @media(min-width:768px){.s0-name{margin-bottom:32px;}}
  .s0-name em { font-style:italic; color:var(--accent); }
  .s0-sub { font-family:'DM Mono',monospace; font-size:13px; font-weight:300; color:var(--muted); letter-spacing:.05em; line-height:1.8; max-width:360px; margin-bottom:40px; }
  @media(min-width:768px){.s0-sub{font-size:14px;margin-bottom:52px;}}
  .s0-scroll-hint { display:flex; align-items:center; gap:16px; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.15em; color:var(--muted); }
  .s0-scroll-hint .arrow-track { width:48px; height:1px; background:var(--line); position:relative; overflow:hidden; }
  .s0-scroll-hint .arrow-fill { position:absolute; top:0; left:-100%; width:100%; height:100%; background:var(--accent); animation:slide-right 1.6s ease-in-out infinite; }
  @keyframes slide-right { 0%{left:-100%} 50%{left:0%} 100%{left:100%} }
  .s0-rule { position:absolute; top:0; right:120px; width:1px; height:100%; background:var(--line); transform:rotate(12deg); transform-origin:top center; display:none; }
  @media(min-width:768px){.s0-rule{display:block;}}

  /* ════════ WORK ════════ */
  .s1-inner { position:relative; z-index:2; width:100%; height:100%; display:flex; flex-direction:column; padding:72px 24px 64px; gap:20px; overflow:hidden; }
  @media(min-width:768px){ .s1-inner { display:grid; grid-template-columns:1fr 1fr; padding:80px 52px 52px; gap:48px; } }
  .s1-left { display:flex; flex-direction:column; justify-content:flex-start; flex-shrink:0; }
  @media(min-width:768px){.s1-left{justify-content:center;}}
  .s1-section-title { font-family:'Playfair Display',serif; font-size:clamp(34px,8vw,80px); font-weight:700; color:var(--ink); line-height:1; margin-bottom:14px; }
  @media(min-width:768px){.s1-section-title{margin-bottom:24px;}}
  .s1-desc { font-family:'DM Mono',monospace; font-size:12px; font-weight:300; color:var(--muted); line-height:1.9; max-width:320px; }
  @media(min-width:768px){.s1-desc{font-size:13px;}}
  .s1-right-wrap { flex:1; min-height:0; position:relative; display:flex; flex-direction:column; overflow:hidden; }
  .s1-right-wrap::after { content:''; position:absolute; bottom:0; left:0; right:0; height:48px; background:linear-gradient(to bottom,transparent,var(--paper)); pointer-events:none; z-index:3; }
  @media(min-width:768px){ .s1-right-wrap { flex:unset; align-self:center; width:100%; max-height:calc(100vh - 140px); } }
  .s1-right { flex:1; min-height:0; display:flex; flex-direction:column; overflow-y:auto; overscroll-behavior:contain; scrollbar-width:none; }
  .s1-right::-webkit-scrollbar { display:none; }
  @media(min-width:768px){ .s1-right { flex:unset; max-height:calc(100vh - 140px); } }

  .project-item {
    display:flex; align-items:center; justify-content:space-between;
    padding:16px 0; border-bottom:1px solid var(--line);
    cursor:none; position:relative; overflow:hidden;
    transition:padding-left 0.3s ease; flex-shrink:0;
  }
  .project-item:first-child { border-top:1px solid var(--line); }
  .project-item::before { content:''; position:absolute; left:0; top:0; width:0; height:100%; background:var(--ink); transition:width 0.35s ease; z-index:0; }
  .project-item > * { position:relative; z-index:1; }
  @media(hover:hover){
    .project-item:hover::before { width:100%; }
    .project-item:hover { padding-left:20px; }
    .project-item:hover .proj-name,
    .project-item:hover .proj-year,
    .project-item:hover .proj-tag { color:var(--paper); }
    .project-item:hover .proj-open { opacity:1; transform:translateX(0); }
  }
  .proj-name { font-family:'Playfair Display',serif; font-size:17px; color:var(--ink); transition:color 0.3s; }
  @media(min-width:768px){.proj-name{font-size:22px;}}
  .proj-meta { display:flex; gap:14px; align-items:center; }
  .proj-tag { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.12em; color:var(--muted); text-transform:uppercase; transition:color 0.3s; display:none; }
  @media(min-width:480px){.proj-tag{display:block;}}
  .proj-year { font-family:'DM Mono',monospace; font-size:11px; color:var(--muted); transition:color 0.3s; }
  .proj-open { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.1em; color:var(--paper); opacity:0; transform:translateX(-8px); transition:opacity 0.3s,transform 0.3s; white-space:nowrap; margin-left:16px; }
  @media(max-width:767px){.proj-open{display:none;}}

  /* ════════ ABOUT ════════ */
  .s2-inner { position:relative; z-index:2; width:100%; height:100%; display:flex; flex-direction:column; padding:72px 24px 64px; gap:20px; overflow:hidden; }
  @media(min-width:768px){ .s2-inner { display:grid; grid-template-columns:1fr 1fr; padding:0 52px; gap:0; align-items:center; } .s2-inner::after { content:''; position:absolute; left:50%; top:10%; height:80%; width:1px; background:var(--line); transform:translateX(-50%); } }
  .s2-left { flex-shrink:0; }
  @media(min-width:768px){.s2-left{padding-right:52px;}}
  .s2-section-title { font-family:'Playfair Display',serif; font-size:clamp(34px,8vw,80px); font-weight:700; color:var(--ink); line-height:1; margin-bottom:16px; }
  .s2-bio { font-family:'DM Mono',monospace; font-size:12px; font-weight:300; color:var(--ink); line-height:2; margin-bottom:12px; max-width:400px; }
  @media(min-width:768px){.s2-bio{font-size:13px;margin-bottom:20px;}}
  .s2-bio strong { font-weight:400; color:var(--accent); }
  .s2-right-wrap { flex:1; min-height:0; position:relative; display:flex; flex-direction:column; overflow:hidden; }
  .s2-right-wrap::after { content:''; position:absolute; bottom:0; left:0; right:0; height:48px; background:linear-gradient(to bottom,transparent,var(--paper)); pointer-events:none; z-index:3; }
  @media(min-width:768px){ .s2-right-wrap { flex:unset; align-self:center; width:100%; max-height:calc(100vh - 80px); } }
  .s2-right { flex:1; min-height:0; display:flex; flex-direction:column; overflow-y:auto; overscroll-behavior:contain; scrollbar-width:none; }
  .s2-right::-webkit-scrollbar { display:none; }
  @media(min-width:768px){ .s2-right { flex:unset; padding-left:52px; max-height:calc(100vh - 80px); } }
  .skill-row { display:flex; align-items:center; justify-content:space-between; padding:15px 0; border-bottom:1px solid var(--line); flex-shrink:0; }
  .skill-row:first-child { border-top:1px solid var(--line); }
  .skill-name { font-family:'DM Mono',monospace; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--ink); }
  @media(min-width:768px){.skill-name{font-size:12px;}}
  .skill-bar-wrap { width:80px; height:1px; background:var(--line); position:relative; }
  @media(min-width:768px){.skill-bar-wrap{width:160px;}}
  .skill-bar-fill { position:absolute; top:0; left:0; height:1px; background:var(--accent); transition:width 1s ease; }
  .skill-pct { font-family:'DM Mono',monospace; font-size:10px; color:var(--muted); min-width:32px; text-align:right; }

  /* ════════ CONTACT ════════ */
  .s3-inner { position:relative; z-index:2; width:100%; height:100%; display:flex; flex-direction:column; padding:72px 24px 64px; overflow:hidden; }
  @media(min-width:768px){ .s3-inner { height:auto; overflow:visible; justify-content:center; padding:0 52px; max-width:700px; margin:0 auto; } }
  .s3-eyebrow { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.2em; color:var(--accent); text-transform:uppercase; margin-bottom:18px; flex-shrink:0; }
  .s3-headline { font-family:'Playfair Display',serif; font-size:clamp(34px,7vw,80px); font-weight:700; color:var(--ink); line-height:1.05; margin-bottom:28px; flex-shrink:0; }
  @media(min-width:768px){.s3-headline{margin-bottom:48px;}}
  .s3-headline em { font-style:italic; }
  .contact-list-wrap { flex:1; min-height:0; position:relative; display:flex; flex-direction:column; overflow:hidden; }
  .contact-list-wrap::after { content:''; position:absolute; bottom:0; left:0; right:0; height:48px; background:linear-gradient(to bottom,transparent,var(--paper)); pointer-events:none; z-index:3; }
  @media(min-width:768px){ .contact-list-wrap { flex:unset; overflow:visible; } .contact-list-wrap::after{display:none;} }
  .contact-list { flex:1; min-height:0; display:flex; flex-direction:column; overflow-y:auto; overscroll-behavior:contain; scrollbar-width:none; }
  .contact-list::-webkit-scrollbar { display:none; }
  @media(min-width:768px){ .contact-list { flex:unset; overflow-y:visible; } }
  .contact-link { display:flex; align-items:center; justify-content:space-between; padding:17px 0; border-bottom:1px solid var(--line); text-decoration:none; cursor:none; transition:padding-left 0.3s; flex-shrink:0; }
  .contact-link:first-child { border-top:1px solid var(--line); }
  @media(hover:hover){ .contact-link:hover{padding-left:16px;} .contact-link:hover .cl-label{color:var(--accent);} .contact-link:hover .cl-arrow{transform:translateX(6px);color:var(--accent);} }
  .cl-platform { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.15em; text-transform:uppercase; color:var(--muted); min-width:70px; }
  @media(min-width:768px){.cl-platform{font-size:10px;min-width:90px;}}
  .cl-label { font-family:'Playfair Display',serif; font-size:17px; color:var(--ink); transition:color 0.3s; flex:1; padding-left:20px; }
  @media(min-width:768px){.cl-label{font-size:20px;padding-left:32px;}}
  .cl-arrow { font-size:16px; color:var(--muted); transition:transform 0.3s,color 0.3s; }
  .s3-footer { font-family:'DM Mono',monospace; font-size:10px; color:var(--muted); letter-spacing:.1em; margin-top:20px; flex-shrink:0; }

  /* ════════════════════════════════════════
     PROJECT DETAIL PANEL
  ════════════════════════════════════════ */
  .proj-panel {
    position: fixed; top: 0; right: 0;
    width: 100vw; height: 100vh;
    background: var(--ink); z-index: 500;
    display: flex; flex-direction: column;
    overflow: hidden;
    transform: translateX(100%);
    transition: transform 0.78s cubic-bezier(0.76, 0, 0.24, 1);
  }
  .proj-panel.open { transform: translateX(0); }
  @media(min-width: 900px) { .proj-panel { width: 64vw; } }

  .proj-panel-stripe {
    height: 3px; flex-shrink: 0;
    background: var(--proj-color, var(--accent));
    transition: background 0.4s;
  }

  .proj-panel-close {
    position: absolute; top: 22px; right: 24px;
    width: 38px; height: 38px;
    display: flex; align-items: center; justify-content: center;
    cursor: none; z-index: 10;
    border: 1px solid rgba(255,255,255,0.15); border-radius: 50%;
    transition: border-color 0.2s, background 0.2s;
  }
  .proj-panel-close:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.08); }
  .proj-panel-close svg { width: 15px; height: 15px; stroke: rgba(255,255,255,0.7); }

  .proj-panel-body {
    flex: 1; min-height: 0;
    overflow-y: auto; scrollbar-width: none;
    padding: 52px 32px 80px;
  }
  .proj-panel-body::-webkit-scrollbar { display: none; }
  @media(min-width:768px){ .proj-panel-body { padding: 60px 60px 80px; } }

  /* stagger fade-up */
  .ppc { opacity: 0; transform: translateY(18px); }
  .proj-panel.open .ppc { animation: ppFadeUp 0.5s ease forwards; }
  .proj-panel.open .ppc-1 { animation-delay: 0.32s; }
  .proj-panel.open .ppc-2 { animation-delay: 0.42s; }
  .proj-panel.open .ppc-3 { animation-delay: 0.52s; }
  .proj-panel.open .ppc-4 { animation-delay: 0.60s; }
  .proj-panel.open .ppc-5 { animation-delay: 0.68s; }
  .proj-panel.open .ppc-6 { animation-delay: 0.76s; }
  .proj-panel.open .ppc-7 { animation-delay: 0.84s; }
  .proj-panel.open .ppc-8 { animation-delay: 0.92s; }
  @keyframes ppFadeUp { to { opacity: 1; transform: translateY(0); } }

  .pp-eyebrow { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:var(--proj-color,var(--accent)); margin-bottom:14px; }
  .pp-title { font-family:'Playfair Display',serif; font-size:clamp(34px,5.5vw,68px); font-weight:700; color:#f5f0e8; line-height:1; margin-bottom:36px; }

  .pp-divider { width:100%; height:1px; background:rgba(255,255,255,0.08); margin:28px 0; }

  .pp-meta-row { display:flex; gap:36px; flex-wrap:wrap; }
  .pp-meta-label { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.15em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:6px; }
  .pp-meta-value { font-family:'DM Mono',monospace; font-size:13px; color:rgba(255,255,255,0.75); }

  .pp-section-label { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:12px; }
  .pp-description { font-family:'DM Mono',monospace; font-size:13px; font-weight:300; color:rgba(255,255,255,0.65); line-height:2; }

  .pp-highlights { display:flex; flex-direction:column; gap:12px; }
  .pp-highlight-item { display:flex; gap:14px; align-items:flex-start; }
  .pp-hi-dot { width:5px; height:5px; border-radius:50%; background:var(--proj-color,var(--accent)); margin-top:7px; flex-shrink:0; }
  .pp-hi-text { font-family:'DM Mono',monospace; font-size:12px; font-weight:300; color:rgba(255,255,255,0.65); line-height:1.8; }

  .pp-stack { display:flex; flex-wrap:wrap; gap:8px; }
  .pp-stack-tag { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.08em; color:rgba(255,255,255,0.55); border:1px solid rgba(255,255,255,0.12); padding:6px 14px; border-radius:2px; transition:border-color 0.2s,color 0.2s; }
  .pp-stack-tag:hover { border-color:var(--proj-color,var(--accent)); color:#f5f0e8; }

  /* ── GitHub link ── */
  .pp-github-link {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 11px 22px;
    border: 1px solid rgba(255,255,255,0.18);
    font-family: 'DM Mono', monospace; font-size: 11px;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(255,255,255,0.65); text-decoration: none;
    transition: border-color 0.25s, color 0.25s, background 0.25s;
    cursor: none;
  }
  .pp-github-link:hover {
    border-color: var(--proj-color, var(--accent));
    color: #f5f0e8;
    background: color-mix(in srgb, var(--proj-color, var(--accent)) 10%, transparent);
  }
  .pp-github-link svg { width: 14px; height: 14px; fill: currentColor; flex-shrink: 0; }

  /* ── Media grid ── */
  .pp-media-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }
  @media(min-width: 560px) {
    .pp-media-grid { grid-template-columns: repeat(2, 1fr); }
    /* if only one media item, span full width */
    .pp-media-grid .pp-media-item:only-child { grid-column: 1 / -1; }
  }

  .pp-media-item {
    position: relative; overflow: hidden;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 2px;
    cursor: none;
    transition: border-color 0.25s;
  }
  .pp-media-item:hover { border-color: var(--proj-color, var(--accent)); }

  .pp-media-img {
    width: 100%; display: block;
    aspect-ratio: 16/9; object-fit: cover;
    transition: transform 0.5s ease;
  }
  .pp-media-item:hover .pp-media-img { transform: scale(1.04); }

  .pp-media-video {
    width: 100%; display: block;
    aspect-ratio: 16/9; object-fit: cover;
    background: #000;
  }

  /* play badge overlaid on video thumbnails */
  .pp-media-play-badge {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 44px; height: 44px;
    background: rgba(0,0,0,0.6);
    border: 1.5px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    pointer-events: none;
    transition: background 0.2s, border-color 0.2s;
  }
  .pp-media-item:hover .pp-media-play-badge {
    background: color-mix(in srgb, var(--proj-color, var(--accent)) 80%, black);
    border-color: var(--proj-color, var(--accent));
  }
  .pp-media-play-badge svg { width: 12px; height: 12px; fill: #fff; margin-left: 3px; }

  .pp-media-caption {
    padding: 9px 14px;
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.05em;
    color: rgba(255,255,255,0.3);
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  /* ── Lightbox ── */
  .lightbox {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.94);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s;
    cursor: pointer;
  }
  .lightbox.open { opacity: 1; pointer-events: auto; }

  .lightbox-close {
    position: absolute; top: 24px; right: 28px;
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    transition: color 0.2s;
    pointer-events: none;
  }

  .lightbox img, .lightbox video {
    max-width: 90vw; max-height: 85vh;
    object-fit: contain; border-radius: 2px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.7);
    cursor: default;
  }

  .lightbox-caption {
    position: absolute; bottom: 28px; left: 50%;
    transform: translateX(-50%);
    font-family: 'DM Mono', monospace; font-size: 10px;
    color: rgba(255,255,255,0.3); letter-spacing: 0.08em;
    white-space: nowrap; pointer-events: none;
  }

  /* ── Backdrop ── */
  .proj-panel-backdrop { position:fixed; inset:0; background:rgba(0,0,0,0); z-index:499; pointer-events:none; transition:background 0.5s; }
  .proj-panel-backdrop.open { background:rgba(0,0,0,0.45); pointer-events:auto; }
  @media(min-width:900px){ .proj-panel-backdrop.open { cursor:pointer; } }

  /* ── Nav dots ── */
  .nav-dots { position:fixed; bottom:28px; left:50%; transform:translateX(-50%); display:flex; gap:10px; z-index:100; }
  @media(min-width:768px){.nav-dots{bottom:44px;gap:12px;}}
  .nav-dot { width:5px; height:5px; border-radius:50%; background:var(--line); border:1px solid var(--muted); cursor:pointer; transition:background 0.3s,transform 0.3s,border-color 0.3s; }
  .nav-dot.active { background:var(--accent); border-color:var(--accent); transform:scale(1.4); }

  /* ── Counter ── */
  .sec-counter { position:fixed; bottom:28px; right:24px; font-family:'DM Mono',monospace; font-size:10px; color:var(--muted); letter-spacing:.1em; z-index:100; }
  @media(min-width:768px){.sec-counter{bottom:44px;right:52px;font-size:11px;}}

  /* ── Progress bar ── */
  .progress-bar { position:fixed; top:0; left:0; height:2px; background:var(--accent); z-index:200; transition:width 0.1s linear; }

  /* ── Fade-up ── */
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  .fade-up { opacity:0; animation:fadeUp 0.7s ease forwards; }
  .fade-up-1{animation-delay:.1s;} .fade-up-2{animation-delay:.25s;}
  .fade-up-3{animation-delay:.4s;} .fade-up-4{animation-delay:.55s;}
`;

/* ─────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────── */
type CursorMode = "default" | "hovered" | "project";

interface LightboxState {
  open: boolean;
  src: string;
  type: "image" | "video";
  caption?: string;
}

export default function Portfolio() {
  const [current, setCurrent]         = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cursorPos, setCursorPos]     = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos]         = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode]   = useState<CursorMode>("default");
  const [cursorColor, setCursorColor] = useState("var(--accent)");

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [panelOpen, setPanelOpen]         = useState(false);
  const [lightbox, setLightbox]           = useState<LightboxState>({
    open: false, src: "", type: "image",
  });

  const ringRef      = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number>(0);
  const projectsRef  = useRef<HTMLDivElement>(null);
  const skillsRef    = useRef<HTMLDivElement>(null);
  const contactsRef  = useRef<HTMLDivElement>(null);
  const panelBodyRef = useRef<HTMLDivElement>(null);
  const hoveringList   = useRef<"projects" | "skills" | "contacts" | null>(null);
  const hoveringPanel  = useRef(false);

  const total = sections.length;

  const goTo = useCallback((idx: number) => {
    if (isAnimating || idx < 0 || idx >= total) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 900);
  }, [isAnimating, total]);

  const openProject = useCallback((p: Project) => {
    setActiveProject(p);
    setPanelOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
    setTimeout(() => setActiveProject(null), 800);
  }, []);

  const openLightbox = useCallback((m: ProjectMedia) => {
    setLightbox({ open: true, src: m.src, type: m.type, caption: m.caption });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(l => ({ ...l, open: false }));
  }, []);

  // Wheel
  useEffect(() => {
    const listMap = { projects: projectsRef, skills: skillsRef, contacts: contactsRef } as const;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (lightbox.open) return;
      // Panel is open — scroll panel body if cursor is over it, else ignore
      if (panelOpen) {
        if (hoveringPanel.current && panelBodyRef.current) {
          panelBodyRef.current.scrollTop += e.deltaY;
        }
        return;
      }
      // Normal section scrollable lists
      const key = hoveringList.current;
      if (key) { const el = listMap[key].current; if (el) { el.scrollTop += e.deltaY; return; } }
      if (Math.abs(e.deltaY) < 15 && Math.abs(e.deltaX) < 15) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta > 0) goTo(current + 1); else goTo(current - 1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [current, goTo, panelOpen, lightbox.open]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox.open) { if (e.key === "Escape") closeLightbox(); return; }
      if (panelOpen)     { if (e.key === "Escape") closePanel();    return; }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(current + 1);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   goTo(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo, panelOpen, closePanel, lightbox.open, closeLightbox]);

  // Touch
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (panelOpen) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    if (Math.abs(dx) > 60 && Math.abs(dx) > dy * 1.5) {
      dx > 0 ? goTo(current + 1) : goTo(current - 1);
    }
  };

  // Cursor position
  useEffect(() => {
    const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Laggy ring
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      ringRef.current = {
        x: lerp(ringRef.current.x, cursorPos.x, 0.12),
        y: lerp(ringRef.current.y, cursorPos.y, 0.12),
      };
      setRingPos({ ...ringRef.current });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [cursorPos]);

  const cursorVars = { "--cursor-color": cursorColor } as React.CSSProperties;

  return (
    <>
      <style>{style}</style>
      <div className="progress-bar" style={{ width: `${(current / (total - 1)) * 100}%` }} />

      {/* ── Cursor ── */}
      <div className="cursor cursor-dot" style={{ ...cursorVars, left: cursorPos.x, top: cursorPos.y }} />
      <div
        className={`cursor cursor-ring${cursorMode === "project" ? " on-project" : cursorMode === "hovered" ? " hovered" : ""}`}
        style={{ ...cursorVars, left: ringPos.x, top: ringPos.y }}
      />

      {/* ── Lightbox ── */}
      <div className={`lightbox${lightbox.open ? " open" : ""}`} onClick={closeLightbox}>
        <span className="lightbox-close">click anywhere to close</span>
        {lightbox.open && lightbox.type === "image" && (
          <img src={lightbox.src} alt={lightbox.caption} onClick={e => e.stopPropagation()} />
        )}
        {lightbox.open && lightbox.type === "video" && (
          <video src={lightbox.src} controls autoPlay onClick={e => e.stopPropagation()} />
        )}
        {lightbox.caption && <p className="lightbox-caption">{lightbox.caption}</p>}
      </div>

      {/* ── Panel backdrop ── */}
      <div className={`proj-panel-backdrop${panelOpen ? " open" : ""}`} onClick={closePanel} />

      {/* ══════════════════════════════════════
          PROJECT DETAIL PANEL
      ══════════════════════════════════════ */}
      <div
        className={`proj-panel${panelOpen ? " open" : ""}`}
        style={{ "--proj-color": activeProject?.color ?? "var(--accent)" } as React.CSSProperties}
      >
        <div className="proj-panel-stripe" />

        {/* Close */}
        <div
          className="proj-panel-close"
          onClick={closePanel}
          onMouseEnter={() => { setCursorMode("hovered"); setCursorColor("#f5f0e8"); }}
          onMouseLeave={() => { setCursorMode("default"); setCursorColor("var(--accent)"); }}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round">
            <line x1="18" y1="6"  x2="6"  y2="18" />
            <line x1="6"  y1="6"  x2="18" y2="18" />
          </svg>
        </div>

        {activeProject && (
          <div
            className="proj-panel-body"
            ref={panelBodyRef}
            onMouseEnter={() => { hoveringPanel.current = true; }}
            onMouseLeave={() => { hoveringPanel.current = false; }}
          >

            {/* Eyebrow + Title */}
            <p className="pp-eyebrow ppc ppc-1">{activeProject.tag} — {activeProject.year}</p>
            <h2 className="pp-title ppc ppc-2">{activeProject.name}</h2>

            {/* Meta */}
            <div className="pp-meta-row ppc ppc-3">
              <div>
                <p className="pp-meta-label">Role</p>
                <p className="pp-meta-value">{activeProject.role}</p>
              </div>
              <div>
                <p className="pp-meta-label">Duration</p>
                <p className="pp-meta-value">{activeProject.duration}</p>
              </div>
            </div>
            <div className="pp-divider ppc ppc-3" />

            {/* Overview */}
            <p className="pp-section-label ppc ppc-4">Overview</p>
            <p className="pp-description ppc ppc-4">{activeProject.description}</p>
            <div className="pp-divider ppc ppc-4" />

            {/* Highlights */}
            <p className="pp-section-label ppc ppc-5">Highlights</p>
            <div className="pp-highlights ppc ppc-5">
              {activeProject.highlights.map((h) => (
                <div key={h} className="pp-highlight-item">
                  <div className="pp-hi-dot" />
                  <p className="pp-hi-text">{h}</p>
                </div>
              ))}
            </div>
            <div className="pp-divider ppc ppc-5" />

            {/* Stack */}
            <p className="pp-section-label ppc ppc-6">Stack</p>
            <div className="pp-stack ppc ppc-6">
              {activeProject.stack.map((s) => (
                <span key={s} className="pp-stack-tag">{s}</span>
              ))}
            </div>

            {/* ── Media ── */}
            {activeProject.media && activeProject.media.length > 0 && (
              <>
                <div className="pp-divider ppc ppc-7" />
                <p className="pp-section-label ppc ppc-7">Media</p>
                <div className="pp-media-grid ppc ppc-7">
                  {activeProject.media.map((m, i) => (
                    <div
                      key={i}
                      className="pp-media-item"
                      onClick={() => openLightbox(m)}
                      onMouseEnter={() => {
                        setCursorMode("hovered");
                        setCursorColor(activeProject.color);
                      }}
                      onMouseLeave={() => {
                        setCursorMode("default");
                        setCursorColor("var(--accent)");
                      }}
                    >
                      {m.type === "image" ? (
                        <img
                          className="pp-media-img"
                          src={m.src}
                          alt={m.caption ?? activeProject.name}
                          loading="lazy"
                        />
                      ) : (
                        <>
                          {/* Show first frame as thumbnail; clicking opens lightbox */}
                          <video
                            className="pp-media-video"
                            src={`${m.src}#t=0.5`}
                            muted
                            playsInline
                            preload="metadata"
                          />
                          <div className="pp-media-play-badge">
                            <svg viewBox="0 0 12 12">
                              <polygon points="2,1 11,6 2,11" />
                            </svg>
                          </div>
                        </>
                      )}
                      {m.caption && <p className="pp-media-caption">{m.caption}</p>}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── GitHub link ── */}
            {activeProject.github && (
              <>
                <div className="pp-divider ppc ppc-8" />
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pp-github-link ppc ppc-8"
                  onMouseEnter={() => {
                    setCursorMode("hovered");
                    setCursorColor(activeProject.color);
                  }}
                  onMouseLeave={() => {
                    setCursorMode("default");
                    setCursorColor("var(--accent)");
                  }}
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              </>
            )}

          </div>
        )}
      </div>

      {/* ══════════════════════════════════════
          MAIN LAYOUT
      ══════════════════════════════════════ */}
      <div className="port-root" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div
          className="track"
          style={{
            transform: `translateX(${current * -100}vw)`,
            transition: "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        >
          {/* ═══ HERO ═══ */}
          <section className="section">
            <span className="sec-label">01 / INTRO</span>
            <div className="s0-rule" />
            <div className="s0-inner">
              <p className="s0-eyebrow fade-up fade-up-1">Portfolio — 2025</p>
              <h1 className="s0-name fade-up fade-up-2">
                Your<br /><em>Name</em><br />Here.
              </h1>
              <p className="s0-sub fade-up fade-up-3">
                Designer &amp; developer crafting<br />thoughtful digital experiences.
              </p>
              <div className="s0-scroll-hint fade-up fade-up-4">
                <div className="arrow-track"><div className="arrow-fill" /></div>
                scroll or swipe
              </div>
            </div>
            <div className="sec-bg-num">01</div>
          </section>

          {/* ═══ WORK ═══ */}
          <section className="section">
            <span className="sec-label">02 / WORK</span>
            <div className="s1-inner">
              <div className="s1-left">
                <h2 className="s1-section-title">Selected<br />Projects.</h2>
                <p className="s1-desc">
                  Click any project to see the full case study — role, stack, media, and outcomes.
                </p>
              </div>
              <div className="s1-right-wrap">
                <div
                  className="s1-right"
                  ref={projectsRef}
                  onMouseEnter={() => { hoveringList.current = "projects"; }}
                  onMouseLeave={() => {
                    hoveringList.current = null;
                    setCursorMode("default");
                    setCursorColor("var(--accent)");
                  }}
                >
                  {projects.map((p) => (
                    <div
                      key={p.name}
                      className="project-item"
                      onClick={() => openProject(p)}
                      onMouseEnter={() => {
                        setCursorMode("project");
                        setCursorColor(p.color);
                      }}
                      onMouseLeave={() => {
                        setCursorMode("default");
                        setCursorColor("var(--accent)");
                      }}
                    >
                      <span className="proj-name">{p.name}</span>
                      <div className="proj-meta">
                        <span className="proj-tag">{p.tag}</span>
                        <span className="proj-year">{p.year}</span>
                        <span className="proj-open">view →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="sec-bg-num">02</div>
          </section>

          {/* ═══ ABOUT ═══ */}
          <section className="section">
            <span className="sec-label">03 / ABOUT</span>
            <div className="s2-inner">
              <div className="s2-left">
                <h2 className="s2-section-title">About<br />Me.</h2>
                <p className="s2-bio">
                  Based in <strong>San Francisco</strong>. I build things that are{" "}
                  <strong>fast, accessible, and beautiful</strong> — in that order.
                </p>
                <p className="s2-bio">
                  5+ years turning complex problems into clean, purposeful interfaces.
                </p>
              </div>
              <div className="s2-right-wrap">
                <div
                  className="s2-right"
                  ref={skillsRef}
                  onMouseEnter={() => { hoveringList.current = "skills"; setCursorMode("hovered"); }}
                  onMouseLeave={() => {
                    hoveringList.current = null;
                    setCursorMode("default");
                    setCursorColor("var(--accent)");
                  }}
                >
                  {skills.map((s) => (
                    <div key={s.name} className="skill-row">
                      <span className="skill-name">{s.name}</span>
                      <div className="skill-bar-wrap">
                        <div className="skill-bar-fill" style={{ width: current === 2 ? `${s.pct}%` : "0%" }} />
                      </div>
                      <span className="skill-pct">{s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="sec-bg-num">03</div>
          </section>

          {/* ═══ CONTACT ═══ */}
          <section className="section">
            <span className="sec-label">04 / CONTACT</span>
            <div className="s3-inner">
              <p className="s3-eyebrow">Get in touch</p>
              <h2 className="s3-headline">
                Let's build<br />something <em>great.</em>
              </h2>
              <div className="contact-list-wrap">
                <div
                  className="contact-list"
                  ref={contactsRef}
                  onMouseEnter={() => { hoveringList.current = "contacts"; setCursorMode("hovered"); }}
                  onMouseLeave={() => {
                    hoveringList.current = null;
                    setCursorMode("default");
                    setCursorColor("var(--accent)");
                  }}
                >
                  {contacts.map((c) => (
                    <a key={c.platform} href={c.href} className="contact-link">
                      <span className="cl-platform">{c.platform}</span>
                      <span className="cl-label">{c.label}</span>
                      <span className="cl-arrow">→</span>
                    </a>
                  ))}
                </div>
              </div>
              <p className="s3-footer">© 2025 Your Name — All rights reserved</p>
            </div>
            <div className="sec-bg-num">04</div>
          </section>
        </div>

        {/* Nav dots */}
        <nav className="nav-dots">
          {sections.map((s) => (
            <div
              key={s.id}
              className={`nav-dot${current === s.id ? " active" : ""}`}
              onClick={() => goTo(s.id)}
            />
          ))}
        </nav>

        {/* Counter */}
        <div className="sec-counter">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>
    </>
  );
}