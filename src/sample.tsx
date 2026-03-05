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
  name: "Robotic Arm Simulator",
  tag: "Robotics / Simulation",
  year: "2024",
  role: "AI & Robotics Intern",
  duration: "2 months",
  stack: ["Python", "PyGame", "NumPy", "Raspberry Pi", "Servo Motors"],
  description:
    "Developed a robotic arm simulation system capable of visualizing and controlling a multi-joint robotic arm. The simulator calculates joint angles using inverse kinematics and allows users to move the arm to target coordinates while synchronizing movements with a physical robotic arm controlled by Raspberry Pi.",
  highlights: [
    "Implemented inverse kinematics to compute joint angles for target coordinates",
    "Built an interactive GUI simulator using PyGame for real-time arm visualization",
    "Integrated simulator output with Raspberry Pi to control servo motors of the physical robotic arm",
    "Designed modular architecture using multiple Python classes for joints, arms, and motion control",
  ],
  color: "#c8473a",
  github: "https://github.com/yourname/robotic-arm-simulator",
  media: [
    {
      type: "image",
      src: "/projects/robotic-arm-simulator/simulator-ui.png",
      caption: "Graphical simulator showing robotic arm movement and joint positions",
    },
    {
      type: "image",
      src: "/projects/robotic-arm-simulator/hardware-arm.png",
      caption: "Physical robotic arm controlled through Raspberry Pi and servo motors",
    },
  ],
},
  {
  name: "Robotic Car",
  tag: "Robotics / Embedded Systems",
  year: "2024",
  role: "Developer",
  duration: "1 month",
  stack: ["Arduino Uno", "IR Sensors", "Ultrasonic Sensor", "Motor Driver", "Python"],
  description:
    "Developed an autonomous robotic car capable of following a predefined path using IR sensors while simultaneously detecting and avoiding obstacles using an ultrasonic sensor. The system processes real-time sensor data to control motor movement and navigation decisions.",
  highlights: [
    "Implemented line-following algorithm using multiple IR sensors for accurate path tracking",
    "Integrated ultrasonic sensor for real-time obstacle detection and avoidance",
    "Programmed motor control logic using Arduino and motor driver module",
    "Designed a compact robotic system capable of autonomous navigation",
  ],
  color: "#2a6496",
  github: "https://github.com/yourname/line-follower-obstacle-avoidance-car",
  media: [
    {
      type: "image",
      src: "/projects/line-follower/robot-car.png",
      caption: "Autonomous robotic car prototype with sensors and motor driver",
    },
    {
      type: "video",
      src: "/projects/line-follower/robot-demo.mp4",
      caption: "Line following and obstacle avoidance demonstration",
    },
  ],
},
  // {
  //   name: "Muse Creative",
  //   tag: "Branding",
  //   year: "2023",
  //   role: "Creative Director",
  //   duration: "3 months",
  //   stack: ["Figma", "Adobe Illustrator", "After Effects"],
  //   description:
  //     "Full visual identity for a boutique creative agency — logo system, typography scale, colour palette, brand guidelines, and motion language.",
  //   highlights: [
  //     "Identity system spanning 200+ brand touchpoints",
  //     "Motion guidelines adopted across all social channels",
  //     "Featured in Brand New Awards 2023",
  //   ],
  //   color: "#7b4f9e",
  //   media: [
  //     {
  //       type: "image",
  //       src: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1200&q=80",
  //       caption: "Brand identity system overview",
  //     },
  //   ],
  // },
  {
  name: "Hand Gesture Creation & Detection System",
  tag: "Computer Vision / AI",
  year: "2025",
  role: "Developer",
  duration: "2 months",
  stack: ["Python", "OpenCV", "MediaPipe", "NumPy"],
  description:
    "Developed a computer vision system capable of detecting and recording custom hand gestures using a webcam. The system tracks hand landmarks using MediaPipe and processes them with OpenCV to recognize gestures and store them for later detection, enabling gesture-based human-computer interaction.",
  highlights: [
    "Implemented real-time hand landmark tracking using MediaPipe",
    "Developed a gesture recording system to create custom gesture datasets",
    "Built gesture recognition logic using landmark coordinate analysis",
    "Enabled real-time gesture detection for interactive computer control",
  ],
  color: "#4a8c57",
  github: "https://github.com/yourname/gesture-detection-opencv-mediapipe",
  media: [
    {
      type: "image",
      src: "/projects/gesture-detection/hand-landmark-detection.png",
      caption: "Real-time hand landmark tracking using MediaPipe",
    },
    {
      type: "video",
      src: "/projects/gesture-detection/gesture-demo.mp4",
      caption: "Gesture recording and real-time detection demo",
    },
  ],
},
  // {
  //   name: "Echo Dashboard",
  //   tag: "Web Dev",
  //   year: "2023",
  //   role: "Full-Stack Developer",
  //   duration: "5 months",
  //   stack: ["Vue 3", "Node.js", "PostgreSQL", "Chart.js"],
  //   description:
  //     "Analytics dashboard for a SaaS platform, aggregating data from 10+ sources into a single, customisable view for non-technical stakeholders.",
  //   highlights: [
  //     "Reduced reporting time from hours to minutes",
  //     "Custom drag-and-drop widget system",
  //     "Real-time updates via WebSockets",
  //   ],
  //   color: "#c07b2a",
  //   github: "https://github.com/yourname/echo-dashboard",
  // },
  // {
  //   name: "Prism Brand",
  //   tag: "Branding",
  //   year: "2022",
  //   role: "Brand Designer",
  //   duration: "2 months",
  //   stack: ["Figma", "Adobe Suite"],
  //   description:
  //     "Brand identity for an AR startup. The visual language needed to communicate cutting-edge technology while remaining warm and approachable.",
  //   highlights: [
  //     "Logo system works across physical and digital surfaces",
  //     "Pitch deck helped secure $4M seed round",
  //     "Brand guidelines published as public Figma file",
  //   ],
  //   color: "#d84e9f",
  //   media: [
  //     {
  //       type: "image",
  //       src: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=1200&q=80",
  //       caption: "Logo system variations",
  //     },
  //   ],
  // },
  // {
  //   name: "Orbit Mobile",
  //   tag: "Product Design",
  //   year: "2022",
  //   role: "Product Designer",
  //   duration: "7 months",
  //   stack: ["Figma", "React Native", "Expo"],
  //   description:
  //     "Habit tracking app with a focus on long-term behaviour change rather than streaks. Won Product Hunt #1 Product of the Day.",
  //   highlights: [
  //     "#1 Product Hunt on launch day",
  //     "4.8 ★ rating with 2k+ reviews",
  //     "Featured in Apple App Store editorial",
  //   ],
  //   color: "#1a7a6e",
  //   github: "https://github.com/yourname/orbit-mobile",
  //   media: [
  //     {
  //       type: "image",
  //       src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
  //       caption: "App home screen — habit grid",
  //     },
  //     {
  //       type: "video",
  //       src: "https://www.w3schools.com/html/mov_bbb.mp4",
  //       caption: "Onboarding animation walkthrough",
  //     },
  //   ],
  // },
];

// const skills = [
//   { name: "React / TypeScript",  pct: 92 },
//   { name: "UI / UX Design",      pct: 88 },
//   { name: "Motion Design",       pct: 75 },
//   { name: "Node / Backend",      pct: 70 },
//   { name: "Creative Direction",  pct: 85 },
//   { name: "Figma / Prototyping", pct: 90 },
//   { name: "CSS / Animation",     pct: 87 },
// ];
const skills = [
  { name: "Python",                   pct: 92 },
  { name: "Machine Learning",         pct: 85 },
  { name: "Computer Vision",          pct: 78 },
  { name: "FastAPI / Backend",        pct: 43 },
  { name: "Next.js / React",          pct: 58 },
  { name: "Robotics Systems",         pct: 80 },
  { name: "OpenCV / MediaPipe",       pct: 66 },
  { name: "Figma / Prototyping",      pct: 72 },
  { name: "Creative Direction",       pct: 85 },
];
const contacts = [
  { platform: "Email",    label: "himanshudubey666@gmail.com",    href: "mailto:himanshudubey666@gmail.com" },
  { platform: "GitHub",   label: "github.com/MerakiElysian",   href: "https://github.com/MerakiElysian" },
  { platform: "LinkedIn", label: "in/himanshu-dubey-hd/",           href: "https://www.linkedin.com/in/himanshu-dubey-hd/" },
  { platform: "Leetcode", label: "u/himanshudubey666/",          href: "https://leetcode.com/u/himanshudubey666/" },
  { platform: "Twitter",  label: "@HimanshuDubey_1",             href: "https://x.com/HimanshuDubey_1" },
];

const sections = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

/* ─────────────────────────────────────────────────────────
   SECTION 5 DATA — LIFE
───────────────────────────────────────────────────────── */
const hobbies = [
  { icon: "✦", label: "Photography",    note: "Plants, Flowers and Insects" },
  { icon: "◈", label: "Art",  note: "Painting & Sketching" },
  { icon: "◉", label: "Crafts",      note: "Building from scraps" },
  { icon: "▲", label: "Reading",        note: "Sci-fi & design theory" },
  { icon: "◎", label: "Running",        note: "Trice a Week" },
  { icon: "✧", label: "Coffee",         note: "Pour-over obsessive" },
];

const certifications = [
  { name: "Oracle JAVA Associate Certificate",      issuer: "Oracle",  year: "2024" },
//   { name: "Google UX Design Certificate", issuer: "Google",  year: "2023" },
//   { name: "Figma Config Speaker",         issuer: "Figma",   year: "2023" },
  { name: "Meta Frontend Developer",      issuer: "Meta",    year: "2024" },
//   { name: "Accessibility Specialist",     issuer: "IAAP",    year: "2022" },
];

const currentlyBuilding = [
  {
    name: "LLM from Scratch",
    desc: "Learning and understanding the basic fundamentals and pipelines of LLMs, and there working principle.",
    status: "Learning",
    color: "#c8473a",
  },
  {
    name: "Basic RAG ",
    desc: "Finding a good resource for learning and working on a basic RAG project with the help of YouTube.",
    status: "Research",
    color: "#2a6496",
  },
  {
    name: "Attention is all you need",
    desc: "Going through the very popular research paper in the field of AI by understanding the pre-requisites in depth.",
    status: "Reading",
    color: "#7b4f9e",
  },
];

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
  .track { display: flex; height: 100vh; width: 500vw; will-change: transform; }

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
  .sec-label-5 {
    position: absolute; top: 20px; left: 24px;
    font-family: 'DM Mono', monospace; font-size: 10px;
    font-weight: 300; letter-spacing: 0.15em; color: var(--accent); z-index: 10;
  }
  @media (min-width: 768px) { .sec-label-5 { top: 40px; left: 52px; font-size: 11px; } }

  .sec-bg-num {
    position: absolute; bottom: -0.1em; right: -0.05em;
    font-family: 'Playfair Display', serif;
    font-size: clamp(120px, 22vw, 380px); font-weight: 700;
    color: transparent; -webkit-text-stroke: 1px var(--line);
    line-height: 1; pointer-events: none; user-select: none; z-index: 0;
  }

  /* ════════ HERO ════════ */
  .s0-inner { position: relative; z-index: 2; padding: 0 24px; max-width: 900px; width: 100%;margin-top: -120px; transition: height 0.4s ease, opacity 0.4s ease; }
  @media (min-width: 768px) { .s0-inner { padding: 0 52px;  } }
  .s0-eyebrow { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.2em; color:var(--accent); text-transform:uppercase; margin-bottom:20px; }
  @media(min-width:768px){.s0-eyebrow{font-size:11px;margin-bottom:28px;}}
  .s0-name { font-family:'Playfair Display',serif; font-size:clamp(44px,10vw,110px); font-weight:700; color:var(--ink); line-height:.95; margin-bottom:24px; }
  @media(min-width:768px){.s0-name{margin-bottom:32px;}}
  .s0-name em { font-style:italic; color:var(--accent); }
  .s0-sub { font-family:'DM Mono',monospace; font-size:13px; font-weight:300; color:var(--muted); letter-spacing:.05em; line-height:1.8; max-width:460px; margin-bottom:40px; }
  @media(min-width:768px){.s0-sub{font-size:14px;margin-bottom:52px;}}
  .s0-scroll-hint { display:flex; align-items:center; gap:16px; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.15em; color:var(--muted); }
  .s0-scroll-hint .arrow-track { width:48px; height:1px; background:var(--line); position:relative; overflow:hidden; }
  .s0-scroll-hint .arrow-fill { position:absolute; top:0; left:-100%; width:100%; height:100%; background:var(--accent); animation:slide-right 1.6s ease-in-out infinite; }
  @keyframes slide-right { 0%{left:-100%} 50%{left:0%} 100%{left:100%} }
  .s0-rule { position:absolute; top:0; right:120px; width:1px; height:100%; background:var(--line); transform:rotate(12deg); transform-origin:top center; display:none; }
  @media(min-width:768px){.s0-rule{display:block;}}

  .s0-portrait {
  position: absolute;
  right: 2vw; bottom: 0;
  height: 82vh;
  width: auto;
  object-fit: contain;
  object-position: bottom right;
  pointer-events: none;
  user-select: none;
  z-index: 1;
  mix-blend-mode: multiply;   /* blacks disappear into any bg */
  opacity: 0.18;              /* ghostly, stays behind text */
  filter: sepia(0.15) contrast(1.1);
  transition: height 0.4s ease, opacity 0.4s ease;
}
@media(max-width: 767px) {
  .s0-portrait {
    height: 45vh;
    opacity: 0.10;
  }
}

  /* ════════ WORK ════════ */
  .s1-inner { position:relative; z-index:2; width:100%; height:100%; display:flex; flex-direction:column; padding:72px 24px 64px; gap:20px; overflow:hidden; }
  @media(min-width:768px){ .s1-inner { display:grid; grid-template-columns:1fr 1fr; padding:80px 52px 52px; gap:48px; } }
  .s1-left { display:flex; flex-direction:column; justify-content:flex-start; flex-shrink:0; }
  @media(min-width:768px){.s1-left{justify-content:center;}}
  .s1-section-title { font-family:'Playfair Display',serif; font-size:clamp(34px,8vw,80px); font-weight:700; color:var(--ink); line-height:1; margin-bottom:14px; }
  @media(min-width:768px){.s1-section-title{margin-bottom:24px;}}
  .s1-desc { font-family:'DM Mono',monospace; font-size:12px; font-weight:300; color:var(--muted); line-height:1.9; max-width:420px; }
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

  /* ════════════════════════════════════════
     SECTION 5 — LIFE
  ════════════════════════════════════════ */

  .section-life {
    background: #0a0908;
    border-right-color: rgba(255,255,255,0.06);
  }
  /* Ghost number — positioned on the section element directly so it doesn't scroll */
  .section-life .sec-bg-num {
    -webkit-text-stroke-color: rgba(255,255,255,0.05);
  }
  /* Section label brightness on dark bg */
  .section-life .sec-label {
    color: rgba(255,255,255,0.55);
    letter-spacing: 0.18em;
  }

  /* ── Scrollable wrapper ── */
  .s4-inner {
    position: relative; z-index: 2;
    width: 100%; height: 100%;
    overflow-y: auto; overflow-x: hidden;
    scrollbar-width: none;
  }
  .s4-inner::-webkit-scrollbar { display: none; }

  /* ════ DESKTOP: bento grid ════ */
  .s4-bento {
    display: none; /* hidden on mobile */
  }
  @media(min-width: 768px) {
    .s4-bento {
      display: grid;
      width: 100%; min-height: 100vh;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: repeat(10, 1fr);
      gap: 1px;
      background: rgba(255,255,255,0.07);
    }
    .s4-c-hero    { grid-column: 1 / 6;  grid-row: 1 / 5;  }
    .s4-c-now     { grid-column: 6 / 9;  grid-row: 1 / 4;  }
    .s4-c-build   { grid-column: 9 / 13; grid-row: 1 / 6;  }
    .s4-c-hobbies { grid-column: 1 / 6;  grid-row: 5 / 11; }
    .s4-c-certs   { grid-column: 6 / 9;  grid-row: 4 / 11; }
    .s4-c-quote   { grid-column: 9 / 13; grid-row: 6 / 11; }
  }

  .s4-cell {
    background: #0a0908;
    padding: 32px 36px;
    position: relative; overflow: hidden;
  }

  /* ── Hero cell ── */
  .s4-hero-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 20px;
  }
  .s4-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 4.5vw, 60px);
    font-weight: 700; color: #f5f0e8;
    line-height: 0.95; margin-bottom: 22px;
  }
  .s4-hero-title em { font-style: italic; color: var(--accent); }
  .s4-hero-desc {
    font-family: 'DM Mono', monospace;
    font-size: 12px; font-weight: 300;
    color: rgba(245,240,232,0.55); line-height: 1.9;
    max-width: 340px;
  }

  /* ── Cell label (section heading) ── */
  .s4-cell-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(245,240,232,0.4); margin-bottom: 20px;
    display: flex; align-items: center; gap: 10px;
  }
  .s4-cell-label::after {
    content: ''; flex: 1; height: 1px;
    background: rgba(255,255,255,0.1);
  }

  /* ── Right Now ── */
  .s4-now-item {
    display: flex; gap: 14px; align-items: baseline;
    padding: 11px 0; border-bottom: 1px solid rgba(145, 113, 113, 0.08);
  }
  .s4-now-item:last-child { border-bottom: none; }
  .s4-now-key {
    font-family: 'DM Mono', monospace; font-size: 11px;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(247, 214, 160, 0.5); min-width: 68px; flex-shrink: 0;
  }
  .s4-now-val {
    font-family: 'DM Mono', monospace; font-size: 12px;
    color: rgba(245,240,232,0.85); line-height: 1.5;
  }

  /* ── Currently Building ── */
  .s4-build-item {
    padding: 15px 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .s4-build-item:last-child { border-bottom: none; }
  .s4-build-top {
    display: flex; align-items: center;
    justify-content: space-between; margin-bottom: 6px;
  }
  .s4-build-name {
    font-family: 'Playfair Display', serif;
    font-size: 16px; color: #f5f0e8;
  }
  .s4-build-pill {
    font-family: 'DM Mono', monospace; font-size: 8px;
    letter-spacing: 0.12em; text-transform: uppercase;
    padding: 3px 9px;
    border: 1px solid var(--pill-color, var(--accent));
    color: var(--pill-color, var(--accent));
    border-radius: 99px; white-space: nowrap;
  }
  .s4-build-desc {
    font-family: 'DM Mono', monospace; font-size: 12px;
    font-weight: 300; color: rgba(247, 214, 160, 0.5); line-height: 1.7;
  }

  /* ── Hobbies ── */
  .s4-hobbies-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  @media(min-width: 1100px){ .s4-hobbies-grid { grid-template-columns: repeat(3, 1fr); } }

  .s4-hobby {
    padding: 14px;
    border: 1px solid rgba(255,255,255,0.09);
    transition: border-color 0.25s, background 0.25s;
  }
  .s4-hobby:hover {
    border-color: rgba(200,71,58,0.6);
    background: rgba(200,71,58,0.07);
  }
  .s4-hobby-icon { font-size: 18px; margin-bottom: 8px; display: block; }
  .s4-hobby-label {
    font-family: 'DM Mono', monospace; font-size: 11px;
    color: rgba(245,240,232,0.9);
    display: block; margin-bottom: 3px;
  }
  .s4-hobby-note {
    font-family: 'DM Mono', monospace; font-size: 9px;
    color: rgba(247, 214, 160, 0.5); display: block;
  }

  /* ── Certifications ── */
  .s4-cert-item {
    display: flex; align-items: flex-start;
    gap: 12px; padding: 13px 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .s4-cert-item:last-child { border-bottom: none; }
  .s4-cert-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: var(--accent); margin-top: 7px; flex-shrink: 0;
  }
  .s4-cert-name {
    font-family: 'DM Mono', monospace; font-size: 12px;
    color: rgba(245,240,232,0.85); line-height: 1.5; margin-bottom: 2px;
  }
  .s4-cert-meta {
    font-family: 'DM Mono', monospace; font-size: 9px;
    color: rgba(247, 214, 160, 0.5); letter-spacing: 0.08em;
  }

  /* ── Quote cell ── */
  .s4-quote-cell {
    display: flex; flex-direction: column; justify-content: flex-end;
    background: color-mix(in srgb, var(--accent) 10%, #0a0908);
    border-top: 1px solid rgba(200,71,58,0.25);height:fit-content;
  }
  .s4-quote-mark {
    font-family: 'Playfair Display', serif;
    font-size: 100px; line-height: 1; color: var(--accent);
    opacity: 0.2; margin-bottom: -20px;
  }
  .s4-quote-text {
    font-family: 'Playfair Display', serif;
    font-size: clamp(15px, 1.8vw, 21px); font-style: italic;
    color: rgba(245,240,232,0.8); line-height: 1.55; margin-bottom: 18px;
  }
  .s4-quote-attr {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(247, 214, 160, 0.5);
  }

  /* ════ MOBILE: accordion ════ */
  .s4-mobile {
    display: flex; flex-direction: column;
    padding: 64px 0 80px;
  }
  @media(min-width: 768px) { .s4-mobile { display: none; } }

  .s4-acc-item {
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .s4-acc-item:first-child { border-top: 1px solid rgba(255,255,255,0.1); }

  .s4-acc-trigger {
    width: 100%; display: flex; align-items: center;
    justify-content: space-between;
    padding: 18px 24px;
    background: none; border: none;
    cursor: pointer; text-align: left;
  }
  .s4-acc-trigger-left {
    display: flex; align-items: center; gap: 14px;
  }
  .s4-acc-icon {
    font-family: 'DM Mono', monospace; font-size: 14px;
    color: var(--accent); width: 20px; text-align: center;
  }
  .s4-acc-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px; color: #f5f0e8;
  }
  .s4-acc-chevron {
    font-family: 'DM Mono', monospace; font-size: 12px;
    color: rgba(245,240,232,0.35);
    transition: transform 0.3s;
  }
  .s4-acc-chevron.open { transform: rotate(45deg); }

  .s4-acc-body {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1),
                opacity 0.3s;
    opacity: 0;
  }
  .s4-acc-body.open {
    max-height: 600px;
    opacity: 1;
  }
  .s4-acc-content {
    padding: 4px 24px 24px;
  }

  /* ── Nav dots ── */
  /* ── Nav dots ── */
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
  const [openAcc, setOpenAcc] = useState<string | null>(null);
  const toggleAcc = (id: string) => setOpenAcc(prev => prev === id ? null : id);
  const [panelOpen, setPanelOpen]         = useState(false);
  const [lightbox, setLightbox]           = useState<LightboxState>({
    open: false, src: "", type: "image",
  });

  const ringRef      = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number>(0);
  const projectsRef  = useRef<HTMLDivElement>(null);
  const skillsRef    = useRef<HTMLDivElement>(null);
  const contactsRef  = useRef<HTMLDivElement>(null);
  const lifeRef      = useRef<HTMLDivElement>(null);
  const panelBodyRef = useRef<HTMLDivElement>(null);
  const hoveringList   = useRef<"projects" | "skills" | "contacts" | "life" | null>(null);
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
    const listMap = { projects: projectsRef, skills: skillsRef, contacts: contactsRef, life: lifeRef } as const;
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
      // Route scroll to list/section-5 if hovering one, else navigate sections
      const key = hoveringList.current;
      if (key) {
        const el = listMap[key].current;
        if (el) {
          const atTop    = el.scrollTop <= 0;
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
          if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
            // fall through to section navigation
          } else {
            el.scrollTop += e.deltaY;
            return;
          }
        }
      }
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
              {/* <p className="s0-eyebrow fade-up fade-up-1">Portfolio — 2026</p> */}
              <p className="s0-eyebrow fade-up fade-up-1">AI • Robotics • Intelligent Systems</p>
              <h1 className="s0-name fade-up fade-up-2">
                I'm<br /><em> &nbsp;Himanshu<br /> &nbsp; Dubey</em><br />
              </h1>
              <p className="s0-sub fade-up fade-up-3">
                AI and ML engineer building intelligent systems and
                robotics applications..
              </p>
              {/* <p className="s0-sub fade-up fade-up-3">
                Designer &amp; developer crafting<br />thoughtful digital experiences.
              </p> */}
              <div className="s0-scroll-hint fade-up fade-up-4">
                <div className="arrow-track"><div className="arrow-fill" /></div>
                scroll or swipe
              </div>
            </div>
            <div className="sec-bg-num">01</div>
            <img
            className="s0-portrait"
            src="../src/assets/me-Photoroom.png"
            alt=""
            aria-hidden="true"
            />
          </section>

          {/* ═══ WORK ═══ */}
          <section className="section">
            <span className="sec-label">02 / WORK</span>
            <div className="s1-inner">
              <div className="s1-left">
                <h2 className="s1-section-title">Selected<br />Projects.</h2>
                <p className="s1-desc">
                  A collection of AI, robotics, and full-stack systems I have designed and built.
                 <br/>-: Click a project to explore the architecture, technologies, and results.
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
                <h2 className="s2-section-title">About Me.<br/></h2>
                <p className="s2-bio">
                I am an M.Tech Computer Science student at <strong>NIT Hamirpur</strong> with a strong interest in 
<strong> Artificial Intelligence, Robotics, and System Design</strong>.
                </p>
                <p className="s2-bio">
I enjoy building intelligent systems that connect software with real-world problems —
from robotic arm simulators and computer vision systems to scalable backend platforms.
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
              <p className="s3-eyebrow">Let's Connect</p>
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
                    <a key={c.platform} href={c.href} className="contact-link"  target="_blank" rel="noopener noreferrer">
                      <span className="cl-platform">{c.platform}</span>
                      <span className="cl-label">{c.label}</span>
                      <span className="cl-arrow">→</span>
                    </a>
                  ))}
                </div>
              </div>
              <p className="s3-footer">© 2026 Himanshu Dubey — All rights reserved</p>
            </div>
            <div className="sec-bg-num">04</div>
          </section>

          {/* ═══════ LIFE ═══════ */}
          <section className="section section-life">
            <span className="sec-label-5">05 / Beyond the resume</span>
            <div className="sec-bg-num">05</div>
            <div
              className="s4-inner"
              ref={lifeRef}
              onMouseEnter={() => { hoveringList.current = "life"; }}
              onMouseLeave={() => { hoveringList.current = null; }}
            >

              {/* ══ DESKTOP — bento grid ══ */}
              <div className="s4-bento">

                {/* Hero */}
                <div className="s4-cell s4-c-hero">
                  <p className="s4-hero-eyebrow "> &nbsp;</p>
                  <h2 className="s4-hero-title">
                    Life<br />beyond<br /><em>the screen.</em>
                  </h2>
                  <p className="s4-hero-desc">
                    The parts that don't fit a CV — what I'm obsessing over,
                    building for fun, and the certifications keeping me sharp.
                  </p>
                </div>

                {/* Right Now */}
                <div className="s4-cell s4-c-now">
                  <p className="s4-cell-label">Right Now</p>
                  {[
                    { k:"📍", label:"Location", v:"Hamirpur, India" },
                    { k:"🎧", label:"Listening", v:"7 years" },
                    { k:"📚", label:"Reading",   v:"The Diary of a CEO" },
                    { k:"🎮", label:"Playing",   v:"Valorant (sometimes)" },
                    { k:"🌱", label:"Learning",  v:"LLM + FAST API" },
                    { k:"🏸", label:"Sports",  v:"Badminton" },
                  ].map(item => (
                    <div key={item.label} className="s4-now-item">
                      <span className="s4-now-key">{item.k} {item.label}</span>
                      <span className="s4-now-val">{item.v}</span>
                    </div>
                  ))}
                </div>

                {/* Building */}
                <div className="s4-cell s4-c-build">
                  <p className="s4-cell-label">Building</p>
                  {currentlyBuilding.map(b => (
                    <div key={b.name} className="s4-build-item">
                      <div className="s4-build-top">
                        <span className="s4-build-name">{b.name}</span>
                        <span className="s4-build-pill" style={{"--pill-color":b.color} as React.CSSProperties}>{b.status}</span>
                      </div>
                      <p className="s4-build-desc">{b.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Hobbies */}
                <div className="s4-cell s4-c-hobbies">
                  <p className="s4-cell-label">Interests</p>
                  <div className="s4-hobbies-grid">
                    {hobbies.map(h => (
                      <div key={h.label} className="s4-hobby">
                        <span className="s4-hobby-icon">{h.icon}</span>
                        <span className="s4-hobby-label">{h.label}</span>
                        <span className="s4-hobby-note">{h.note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certs */}
                <div className="s4-cell s4-c-certs">
                  <p className="s4-cell-label">Certifications</p>
                  {certifications.map(c => (
                    <div key={c.name} className="s4-cert-item">
                      <div className="s4-cert-dot" />
                      <div>
                        <p className="s4-cert-name">{c.name}</p>
                        <p className="s4-cert-meta">{c.issuer} · {c.year}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div className="s4-cell s4-c-quote s4-quote-cell">
                  <div className="s4-quote-mark">"</div>
                  <p className="s4-quote-text">
                    Design is not just what it looks like and feels like.
                    Design is how it works.
                  </p>
                  <p className="s4-quote-attr">— Steve Jobs</p>
                </div>

              </div>

              {/* ══ MOBILE — accordion ══ */}
              <div className="s4-mobile">

                {/* About this section */}
                <div style={{padding:"0 24px 28px"}}>
                  <p style={{fontFamily:"'Playfair Display',serif",fontSize:"28px",fontWeight:700,color:"#f5f0e8",lineHeight:1,marginBottom:"10px"}}>
                    Life beyond <em style={{fontStyle:"italic",color:"var(--accent)"}}>the screen.</em>
                  </p>
                  <p style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",fontWeight:300,color:"rgba(245,240,232,0.5)",lineHeight:1.8}}>
                    Tap each section to explore.
                  </p>
                </div>

                {/* Accordion items */}
                {[
                  {
                    id: "now",
                    icon: "◉",
                    title: "Right Now",
                    content: (
                      <div>
                        {[
                            { k:"📍", label:"Location", v:"Hamirpur, India" },
                            { k:"🎧", label:"Listening", v:"7 years" },
                            { k:"📚", label:"Reading",   v:"The Diary of a CEO" },
                            { k:"🎮", label:"Playing",   v:"Valorant (sometimes)" },
                            { k:"🌱", label:"Learning",  v:"LLM + FAST API" },
                            { k:"🏸", label:"Sports",  v:"Badminton" },
                        ].map(item => (
                          <div key={item.label} className="s4-now-item">
                            <span className="s4-now-key">{item.k} {item.label}</span>
                            <span className="s4-now-val">{item.v}</span>
                          </div>
                        ))}
                      </div>
                    ),
                  },
                  {
                    id: "building",
                    icon: "▲",
                    title: "Currently Building",
                    content: (
                      <div>
                        {currentlyBuilding.map(b => (
                          <div key={b.name} className="s4-build-item">
                            <div className="s4-build-top">
                              <span className="s4-build-name">{b.name}</span>
                              <span className="s4-build-pill" style={{"--pill-color":b.color} as React.CSSProperties}>{b.status}</span>
                            </div>
                            <p className="s4-build-desc">{b.desc}</p>
                          </div>
                        ))}
                      </div>
                    ),
                  },
                  {
                    id: "interests",
                    icon: "✦",
                    title: "Interests",
                    content: (
                      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"10px"}}>
                        {hobbies.map(h => (
                          <div key={h.label} className="s4-hobby">
                            <span className="s4-hobby-icon">{h.icon}</span>
                            <span className="s4-hobby-label">{h.label}</span>
                            <span className="s4-hobby-note">{h.note}</span>
                          </div>
                        ))}
                      </div>
                    ),
                  },
                  {
                    id: "certs",
                    icon: "◈",
                    title: "Certifications",
                    content: (
                      <div>
                        {certifications.map(c => (
                          <div key={c.name} className="s4-cert-item">
                            <div className="s4-cert-dot" />
                            <div>
                              <p className="s4-cert-name">{c.name}</p>
                              <p className="s4-cert-meta">{c.issuer} · {c.year}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ),
                  },
                ].map(acc => (
                  <div key={acc.id} className="s4-acc-item">
                    <button className="s4-acc-trigger" onClick={() => toggleAcc(acc.id)}>
                      <div className="s4-acc-trigger-left">
                        <span className="s4-acc-icon">{acc.icon}</span>
                        <span className="s4-acc-title">{acc.title}</span>
                      </div>
                      <span className={`s4-acc-chevron${openAcc === acc.id ? " open" : ""}`}>+</span>
                    </button>
                    <div className={`s4-acc-body${openAcc === acc.id ? " open" : ""}`}>
                      <div className="s4-acc-content">{acc.content}</div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </section>        </div>

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