"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stamp from "./ui/Stamp";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --------------------------------------------------------
// EDIT YOUR PANELS HERE
// You can easily place ANY elements (images, videos, cards) 
// inside the 'content' property without breaking the animation!
// --------------------------------------------------------

const DeveloperPanelContent = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [displayedProject, setDisplayedProject] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      id: "01",
      title: "ALGORITHMIC TRADING BOT",
      tech: "PYTHON / PANDAS / AWS",
      objective: "Architected a high-frequency trading system to analyze market sentiment and execute trades autonomously.",
      how: "Built using Python and Pandas for data manipulation, integrated with Binance API, and deployed on AWS EC2 for 24/7 low-latency execution."
    },
    {
      id: "02",
      title: "FULL-STACK E-COMMERCE",
      tech: "NEXT.JS / POSTGRESQL / PRISMA",
      objective: "Developed a scalable, headless e-commerce architecture supporting 10k+ concurrent users.",
      how: "Leveraged Next.js App Router for SSR, implemented PostgreSQL with Prisma ORM for type-safe database queries, and integrated Stripe for payments."
    },
    {
      id: "03",
      title: "AI AGENT INTERFACE",
      tech: "REACT / WEBSOCKETS / OPENAI",
      objective: "Created a real-time, conversational interface for an autonomous AI agent to process complex tasks.",
      how: "Used WebSockets for bi-directional streaming, React for the dynamic UI, and OpenAI's API for natural language processing."
    }
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-transparent">
      <img
        src="/images/BLUE.jpg"
        alt="Developer Panel Background"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-100"
      />
      {/* Official Approval Seal stamp */}
      <Stamp className="absolute top-24 right-3 md:right-6 w-36 h-36 md:w-48 md:h-48 opacity-70 rotate-[15deg] z-20" color="#B22222" />

      {/* 12-Column Editorial Grid System */}
      <div className="absolute inset-0 z-10 w-full h-full p-6 md:p-12 lg:p-20 grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-8 overflow-y-auto md:overflow-hidden scrollbar-none">

        {/* Negative Space Top */}
        <div className="col-span-4 md:col-span-12 h-12 md:h-24 flex justify-between items-start border-b border-white/10 pb-2">
          <div className="text-white/40 text-[10px] font-mono tracking-widest uppercase mt-2">[ DEV_CORE: ACTIVE / PORTFOLIO_SYS ]</div>
          <div className="text-white/40 text-xs font-mono tracking-widest mt-2">[ SECT / 03 ]</div>
        </div>

        {/* Hero Typography (Left Side) */}
        <div className="col-span-4 md:col-span-5 flex flex-col justify-start pt-6 md:pt-12 relative">
          <span className="text-brand-yellow text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block md:hidden">capabilities & design</span>
          <h1
            className="text-[4.5rem] md:text-[10rem] lg:text-[14rem] leading-[0.65] font-black uppercase tracking-tighter text-black mix-blend-screen font-display -ml-1 md:-ml-2"
            style={{ textShadow: "-2px -2px 0 rgba(255,255,255,0.8), 2px -2px 0 rgba(255,255,255,0.8), -2px 2px 0 rgba(255,255,255,0.8), 2px 2px 0 rgba(255,255,255,0.8)" }}
          >
            DEV
          </h1>
          <h1 className="text-[2.2rem] md:text-[3.5rem] lg:text-[5rem] leading-[0.8] font-black uppercase tracking-tighter text-white font-display drop-shadow-2xl absolute top-16 md:top-32 lg:top-48 left-0">
            DEVELOPER
          </h1>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block col-span-1 border-r border-white/20 h-full relative">
          <div className="absolute top-1/2 -right-[5px] text-white/50 text-xs">+</div>
        </div>

        {/* Developer Projects Accordion (Right Side) */}
        <div className="col-span-4 md:col-span-6 flex flex-col justify-end pb-8 md:pl-24 lg:pl-36">
          <div className="mb-8 lg:mb-12">
            <p className="text-sm md:text-base text-brand-yellow font-mono tracking-widest mb-4">
              {"// ENGINEERING PORTFOLIO"}
            </p>
            <p className="text-lg md:text-2xl text-white/90 font-medium leading-relaxed max-w-xl">
              Then I discovered the magic of code. Architecture, logic, and systems that scale.
            </p>
          </div>

          <div className="w-full border-t border-white/20">
            {projects.map((project, idx) => {
              const isActive = activeProject === idx;
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    setDisplayedProject(idx);
                    setActiveProject(isActive ? null : idx);
                  }}
                  className="group cursor-pointer border-b border-white/20 overflow-hidden"
                >
                  <div className="flex items-center justify-between py-6 transition-colors duration-300 group-hover:bg-white/5 px-4 -mx-4">
                    <div className="flex items-center gap-4 md:gap-8">
                      <span className="text-xs font-mono text-white/40 tracking-widest">[{project.id}]</span>
                      <h3 className={`text-xl md:text-2xl lg:text-3xl font-display font-bold tracking-wide transition-colors duration-300 ${isActive ? 'text-brand-yellow' : 'text-white'}`}>
                        {project.title}
                      </h3>
                    </div>
                    <div className="text-white/50 transform transition-transform duration-500">
                      {isActive ? '—' : '+'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Animated Floating Modal Card (Rendered via Portal on top layer) */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-3xl min-h-[500px] bg-white/95 backdrop-blur-xl border border-black/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-700 ease-out transform ${activeProject !== null ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'} flex flex-col md:flex-row overflow-hidden`}
        >
          <button
            onClick={() => setActiveProject(null)}
            className="absolute top-6 right-6 text-black/50 hover:text-black text-xs font-mono tracking-widest transition-colors cursor-pointer z-10"
          >
            [ CLOSE ]
          </button>

          {/* Left Column: Identity & Actions */}
          <div className="w-full md:w-5/12 bg-black/[0.03] p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/10">
            <div>
              {/* Minimalist Code Bracket Icon */}
              <svg className="w-8 h-8 text-black mb-8 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>

              <span className="block text-xs font-mono text-black/40 tracking-widest mb-4">
                [{projects[displayedProject].id}]
              </span>
              <h2 className="text-3xl font-display font-bold text-black tracking-tight leading-tight">
                {projects[displayedProject].title}
              </h2>
            </div>

            <div className="mt-12 flex flex-col gap-4">
              <button className="w-full py-4 px-6 border border-black text-black text-xs font-mono tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-300">
                [ VIEW PROJECT ]
              </button>
              <button className="w-full py-4 px-6 border border-black/20 text-black/60 text-xs font-mono tracking-widest uppercase hover:border-black hover:text-black transition-colors duration-300 flex items-center justify-center gap-3">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                GITHUB LINK
              </button>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-between relative">
            <div className="flex flex-col gap-8 pr-8">
              <div>
                <span className="block text-xs md:text-sm font-mono text-luxury-gold tracking-widest mb-3">OBJECTIVE.</span>
                <p className="text-base md:text-lg text-black/80 leading-relaxed font-sans">{projects[displayedProject].objective}</p>
              </div>
              <div>
                <span className="block text-xs md:text-sm font-mono text-luxury-gold tracking-widest mb-3">EXECUTION.</span>
                <p className="text-base md:text-lg text-black/80 leading-relaxed font-sans">{projects[displayedProject].how}</p>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-black/10">
              <span className="block text-xs md:text-sm font-mono text-black/40 uppercase tracking-widest mb-2">TECH STACK:</span>
              <span className="text-sm md:text-base font-mono text-black uppercase tracking-widest">{projects[displayedProject].tech}</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
export const EXPERIMENT_PANELS = [
  {
    id: "panel-2",
    bgColor: "bg-transparent",
    content: <DeveloperPanelContent />,
  },
  {
    id: "panel-3",
    bgColor: "bg-transparent",
    content: (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="/images/BLUE.jpg"
          alt="Parallax 3 Background"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-100"
        />

        {/* 12-Column Editorial Grid System */}
        <div className="absolute inset-0 z-10 w-full h-full p-6 md:p-12 lg:p-20 grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-8 overflow-y-auto md:overflow-hidden scrollbar-none">

          {/* Row 1: Top Navigation / Micro details */}
          <div className="col-span-4 md:col-span-12 flex justify-between items-start h-fit">
            <div className="flex items-center gap-6">
              <span className="text-luxury-gold text-xs font-bold tracking-[0.4em] uppercase">Chapter 02</span>
              <div className="w-12 h-[2px] bg-brand-yellow"></div>
            </div>
            <div className="text-white/40 text-xs font-mono tracking-widest">[ FIG. 01 — 03 ]</div>
          </div>

          {/* Rotated Vertical Subheading framing the left */}
          <div className="hidden md:flex col-span-1 flex-col justify-end items-center h-full pb-16">
            <p className="text-xs text-white/50 uppercase tracking-[0.4em] font-medium transform -rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Before I ever wrote code, I learned to <span className="text-brand-yellow font-bold">communicate</span> through ink.
            </p>
            {/* Minimal vertical anchor line */}
            <div className="w-[1px] h-32 bg-white/20 mt-8"></div>
          </div>

          {/* The Hero Typography block (Cols 2 to 7) */}
          <div className="col-span-4 md:col-span-6 flex flex-col justify-center h-full relative -mt-6 md:-mt-10">
            <span className="text-luxury-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block md:hidden">creative direction</span>
            {/* THE (Wireframe) */}
            <h1
              className="text-[4.5rem] md:text-[9rem] lg:text-[14rem] leading-[0.75] font-black uppercase tracking-tighter text-black mix-blend-screen font-display"
              style={{ textShadow: "-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff" }}
            >
              THE
            </h1>
            {/* DESIGNER (Solid) */}
            <h1 className="text-[2.2rem] md:text-[3.5rem] lg:text-[5.5rem] leading-[0.8] font-black uppercase tracking-tighter text-white font-display drop-shadow-2xl ml-1 md:ml-2 mb-4 md:mb-16">
              DESIGNER
            </h1>

            {/* Polished Body Copy (Aligned with grid, constrained width) */}
            <div className="w-full md:max-w-md ml-2 md:ml-4 relative pl-6 md:pl-8 border-l border-white/20">
              <div className="absolute left-0 top-0 w-[2px] h-1/3 bg-brand-yellow"></div>
              <p className="text-sm md:text-base text-white/70 font-sans leading-relaxed">
                {"Before intention, there was curiosity. An empty page wasn't a void, but a question. Drawing wasn't about creating pictures; it was the discipline of pure observation. Through every stroke of ink, seeing slowly evolved into instinct—laying an architectural foundation for everything that followed."}
              </p>
            </div>
          </div>

          {/* Image Gallery Section (Cols 8 to 12) - 3 images modular layout */}
          <div className="col-span-4 md:col-span-5 flex flex-col justify-center h-full gap-4 md:gap-6 relative mt-12 md:mt-0 pb-10">

            {/* Abstract geometric framing line */}
            <div className="absolute -top-12 -right-8 w-32 h-[1px] bg-luxury-gold/50 hidden md:block"></div>
            <div className="absolute -top-12 -right-8 w-[1px] h-32 bg-luxury-gold/50 hidden md:block"></div>

            {/* Main Hero Graphic Image */}
            <div className="w-full aspect-video overflow-hidden group bg-[#050505] relative shadow-2xl">
              <div className="absolute inset-0 bg-brand-yellow/10 mix-blend-overlay z-10 transition-opacity duration-700 group-hover:opacity-0"></div>
              <img
                src="/png%20elements/image.png"
                alt="Graphic Design Primary"
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out transform group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 z-20 text-[10px] font-mono text-white/60 tracking-widest bg-black/50 px-2 py-1 backdrop-blur-sm">
                [ 01 ]
              </div>
            </div>

            {/* 2 Small Supporting Images */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="aspect-[4/3] overflow-hidden group bg-[#050505] relative shadow-xl">
                <img
                  src="/png%20elements/image.png"
                  alt="Graphic Design Detail 1"
                  className="w-full h-full object-cover object-left-top grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 z-20 text-[10px] font-mono text-white/60 tracking-widest bg-black/50 px-2 py-1 backdrop-blur-sm">
                  [ 02 ]
                </div>
              </div>
              <div className="aspect-[4/3] overflow-hidden group bg-[#050505] relative shadow-xl md:mt-8">
                {/* Asymmetric offset for golden ratio tension */}
                <img
                  src="/png%20elements/image.png"
                  alt="Graphic Design Detail 2"
                  className="w-full h-full object-cover object-bottom grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 z-20 text-[10px] font-mono text-white/60 tracking-widest bg-black/50 px-2 py-1 backdrop-blur-sm">
                  [ 03 ]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "panel-4",
    bgColor: "bg-transparent",
    content: (
      <>
        <img
          src="/images/BLUE.jpg"
          alt="Parallax 4 Background"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-100"
        />
        <div className="absolute top-[15%] left-0 z-10 p-8 md:p-16 max-w-4xl">
          <span className="block text-left text-luxury-gold text-sm md:text-lg font-bold uppercase tracking-[0.3em] mb-4">
            Chapter One
          </span>
          <h1 className="text-5xl md:text-[8rem] lg:text-[10rem] leading-none font-black uppercase tracking-tight text-white font-display drop-shadow-2xl mb-6 whitespace-nowrap">
            THE ARTIST
          </h1>
          <p className="text-xl md:text-3xl text-white/90 font-medium drop-shadow-lg leading-relaxed max-w-2xl ml-2 md:ml-2 lg:ml-8">
            Before i ever wrote code,
          </p>
          <p className="text-xl md:text-3xl text-white/90 font-medium drop-shadow-lg leading-relaxed max-w-2xl ml-2 md:ml-2 lg:ml-8">
            i learned to comunicate thorugh ink.
          </p>
        </div>

        {/* Right Side Images */}
        <div className="absolute top-1/2 right-4 md:right-16 -translate-y-1/2 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-[-2rem] z-10">
          <div className="relative group md:z-10 md:rotate-[-5deg]">
            <img
              src="/sketches/Whisk_aa4f3f03c1.jpg"
              alt="Sketch 1"
              className="w-40 md:w-64 lg:w-72 h-auto rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-cover transform transition-all duration-700 group-hover:-translate-y-4 group-hover:scale-105 group-hover:z-50 border-4 border-white"
            />
          </div>
          <div className="relative group md:-ml-12 md:z-20 md:mt-16 md:rotate-[3deg]">
            <img
              src="/sketches/Whisk_b0b5601e26.jpg"
              alt="Sketch 2"
              className="w-40 md:w-64 lg:w-72 h-auto rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] object-cover transform transition-all duration-700 group-hover:-translate-y-4 group-hover:scale-105 group-hover:z-50 border-4 border-white"
            />
          </div>
          <div className="relative group md:-ml-12 md:z-10 md:-mt-8 md:rotate-[8deg]">
            <img
              src="/sketches/Whisk_ec3285f3ab.jpg"
              alt="Sketch 3"
              className="w-40 md:w-64 lg:w-72 h-auto rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-cover transform transition-all duration-700 group-hover:-translate-y-4 group-hover:scale-105 group-hover:z-50 border-4 border-white"
            />
          </div>
        </div>
      </>
    ),
  },
];

export default function Experiment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const column = columnRef.current;
    const plane = planeRef.current;

    if (!container || !column || !plane) return;

    // Use GSAP Context for precise scoping and easy cleanup
    const ctx = gsap.context(() => {
      // Initial Position (Very Important)
      // Do not start the column at the top. Position exactly like the original right image column.
      gsap.set(column, {
        y: window.innerHeight - column.clientHeight,
      });

      // Position the jet plane at the bottom of the screen initially (near Panel 4)
      gsap.set(plane, {
        y: "100vh",
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top -2px",
          end: () => "+=" + (column.clientHeight - window.innerHeight),
          pin: true,
          scrub: 1, // 1 second smoothing for a realistic flight feel
          invalidateOnRefresh: true,
        },
      });

      // 1. Animate the parent column downward
      tl.to(column, {
        y: 0,
        ease: "none",
      }, 0);

      // 2. Animate the jet plane flying upward at the exact same time
      // It starts at Panel 4 (100vh) and flies up to Panel 1 (-150vh)
      tl.to(plane, {
        y: "-150vh",
        ease: "none",
      }, 0);

    }, containerRef);

    // Clean up all ScrollTriggers and animations tied to this context on unmount
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">

      {/* The Jet Plane Overlay */}
      <div
        ref={planeRef}
        className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none will-change-transform flex items-center justify-center w-full"
      >
        <img
          src="/images/69834ca922d650666343a7a4_img_jet.webp"
          alt="Jet Plane"
          className="object-contain w-[800px] md:w-[1300px] lg:w-[1700px] h-auto drop-shadow-2xl"
        />
      </div>

      {/* The animated column that holds all stacked panels */}
      <div ref={columnRef} className="flex flex-col w-full will-change-transform relative z-10">
        {EXPERIMENT_PANELS.map((panel) => (
          <div
            key={panel.id}
            className={`relative w-full h-[102vh] flex flex-shrink-0 items-center justify-center -mt-[2vh] first:mt-0 ${panel.bgColor}`}
          >
            {/* The custom content renders here */}
            {panel.content}
          </div>
        ))}
      </div>
    </section>
  );
}

