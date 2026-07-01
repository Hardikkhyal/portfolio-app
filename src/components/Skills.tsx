"use client";

import React, { useEffect, useRef, useState } from "react";
import { Code2, Server, Sparkles, Cpu, Database, Layout, Workflow, Layers } from "lucide-react";
import { motion } from "framer-motion";
import Stamp from "./ui/Stamp";

export default function Skills() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pinPositions, setPinPositions] = useState<{ x: number; y: number }[]>([]);

  const boardRef = useRef<HTMLDivElement>(null);
  const pin1Ref = useRef<HTMLDivElement>(null);
  const pin2Ref = useRef<HTMLDivElement>(null);
  const pin3Ref = useRef<HTMLDivElement>(null);
  const pin4Ref = useRef<HTMLDivElement>(null);

  const coreSkills = [
    {
      id: "01",
      icon: Sparkles,
      title: "UI/UX Design",
      description: "Creating high-fidelity wireframes, interface mockups, user flows, and interactive prototypes that unify aesthetic elegance with clear usability.",
      tags: ["Figma", "Visual Design", "Prototyping", "Wireframing", "User Research"],
      photo: "/images/ui_ux_design_evidence.png"
    },
    {
      id: "02",
      icon: Code2,
      title: "Frontend Architecture",
      description: "Crafting modern, highly immersive web applications using React, Next.js, and TypeScript with clean component design and responsive layout systems.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML5 & CSS3"],
      photo: "/images/frontend_engineering_evidence.png"
    },
    {
      id: "03",
      icon: Workflow,
      title: "Creative Interaction",
      description: "Bringing interfaces to life with interactive physics, scroll-driven page animations, dynamic SVG yarn structures, and fluid Framer Motion transitions.",
      tags: ["Framer Motion", "GSAP", "SVG Animation", "WebGL", "Lenis Scroll"],
      photo: "/images/creative_interaction_evidence.png"
    },
    {
      id: "04",
      icon: Layers,
      title: "Design Systems",
      description: "Constructing scalable design tokens and reusable visual style libraries to ensure perfect consistency and smooth engineering workflow.",
      tags: ["Figma Libraries", "Design Tokens", "Tailwind Config", "Storybook", "Accessibility"],
      photo: "/images/design_systems_evidence.png"
    },
  ];

  const cardLayouts = [
    {
      desktop: { left: "3%", top: "16%", width: "21%", rotate: -5 },
      mobile: { left: "3%", top: "5%", width: "44%", rotate: -4 }
    },
    {
      desktop: { left: "26%", top: "42%", width: "22%", rotate: 4 },
      mobile: { left: "51%", top: "22%", width: "45%", rotate: 5 }
    },
    {
      desktop: { left: "50%", top: "14%", width: "21%", rotate: -3 },
      mobile: { left: "3%", top: "41%", width: "44%", rotate: -3 }
    },
    {
      desktop: { left: "73%", top: "40%", width: "22%", rotate: 5 },
      mobile: { left: "51%", top: "60%", width: "45%", rotate: 4 }
    }
  ];

  const updateStringCoords = () => {
    if (!boardRef.current) return;
    const boardRect = boardRef.current.getBoundingClientRect();
    const pins = [pin1Ref, pin2Ref, pin3Ref, pin4Ref];
    const coords = pins.map((pinRef) => {
      if (!pinRef.current) return { x: 0, y: 0 };
      const pinRect = pinRef.current.getBoundingClientRect();
      return {
        x: pinRect.left - boardRect.left + pinRect.width / 2,
        y: pinRect.top - boardRect.top + pinRect.height / 2,
      };
    });
    setPinPositions((prev) => {
      const changed = coords.some((c, i) => !prev[i] || c.x !== prev[i].x || c.y !== prev[i].y);
      return changed ? coords : prev;
    });
  };

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      updateStringCoords();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const tick = () => {
      updateStringCoords();
      animationFrameId = requestAnimationFrame(tick);
    };
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="skills" className="relative w-full py-12 md:py-16 select-none z-30 bg-[#050505]">
      <img
        src="/images/BLUE.jpg"
        alt="Skills Section Background"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-100 pointer-events-none z-0"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.01),transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center w-full mb-10 relative">
          {/* Faded Rubber Stamp behind heading */}
          <Stamp className="absolute top-[55%] right-2 md:right-12 w-36 h-36 md:w-48 md:h-48 opacity-[0.12] rotate-[-12deg] pointer-events-none z-0" color="#B22222" />
          <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.25em] mb-3 block relative z-10">
            capabilities & stack
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white font-display relative z-10">
            Skills & Expertise
          </h2>
          <div className="h-[2px] w-16 bg-luxury-gold mx-auto mt-6 relative z-10" />
        </div>

        {/* Transparent Canvas wrapper for Polaroid Evidence Board */}
        <div 
          ref={boardRef}
          className="relative w-full h-[880px] md:h-[680px] overflow-hidden"
        >

          {/* Decorative Scrap Elements */}
          <div className="absolute top-4 left-4 text-white/20 text-[0.6rem] font-mono tracking-widest z-10 select-none">
            [ DOSSIER / STACK_EVIDENCE_ROOM ]
          </div>



          {/* Ripped Memo Case brief */}
          <div className="absolute top-[8%] left-[4%] w-[200px] bg-[#fcfbf9] text-stone-800 p-4 shadow-md border border-stone-300 font-sans rotate-[-3deg] hidden md:block z-10">
            <div className="absolute -top-3 left-[15%] w-3.5 h-3.5 rounded-full bg-blue-600 shadow-sm border border-blue-700 flex items-center justify-center pointer-events-none">
              <div className="absolute top-2.5 left-2.5 w-1 h-2 bg-black/35 origin-top-left rotate-[35deg] rounded-full blur-[0.5px]" />
            </div>
            <p className="text-[0.6rem] text-stone-400 font-mono tracking-widest mb-2 border-b border-dashed border-stone-200 pb-1">
              {"// CLASSIFIED REPORT"}
            </p>
            <p className="text-[0.75rem] text-stone-600 leading-relaxed font-serif italic">
              {"\"System core parameters verified. Senior UI/UX architecture established.\""}
            </p>
          </div>

          {/* SVG red yarn overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
            {pinPositions.map((pos, idx) => {
              if (idx === pinPositions.length - 1) return null;
              const nextPos = pinPositions[idx + 1];
              if (!pos || !nextPos || (pos.x === 0 && pos.y === 0)) return null;

              const x1 = pos.x;
              const y1 = pos.y;
              const x2 = nextPos.x;
              const y2 = nextPos.y;

              const mx = (x1 + x2) / 2;
              const my = (y1 + y2) / 2;
              const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
              const sag = my + Math.min(65, dist * 0.16);

              const d = `M ${x1} ${y1} Q ${mx} ${sag} ${x2} ${y2}`;

              return (
                <g key={idx}>
                  <motion.path
                    d={d}
                    fill="none"
                    stroke="rgba(0,0,0,0.35)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, ease: "easeInOut", delay: 0.6 }}
                    style={{ transform: "translateY(4px) translateX(1px)" }}
                  />
                  <motion.path
                    d={d}
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, ease: "easeInOut", delay: 0.6 }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Polaroid Cards */}
          {coreSkills.map((skill, idx) => {
            const layout = cardLayouts[idx];
            const currentStyle = isMobile ? layout.mobile : layout.desktop;
            const Icon = skill.icon;

            let pinRef;
            if (idx === 0) pinRef = pin1Ref;
            else if (idx === 1) pinRef = pin2Ref;
            else if (idx === 2) pinRef = pin3Ref;
            else pinRef = pin4Ref;

            return (
              <motion.div
                key={skill.title}
                initial={{ y: -100, opacity: 0, rotate: currentStyle.rotate }}
                animate={{ y: 0, opacity: 1, rotate: currentStyle.rotate }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 14,
                  delay: idx * 0.2
                }}
                whileHover={{
                  scale: 1.03,
                  rotate: currentStyle.rotate * 0.25,
                  y: -6,
                  zIndex: 30,
                  transition: { type: "spring", stiffness: 300, damping: 14 }
                }}
                className="absolute cursor-pointer bg-[#faf8f5] p-2.5 pb-5 md:p-3 md:pb-6 shadow-[0_6px_15px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.65)] border border-stone-200/50 rounded-sm select-none z-10 transition-shadow duration-300"
                style={{
                  width: currentStyle.width,
                  left: currentStyle.left,
                  top: currentStyle.top,
                  minWidth: isMobile ? "140px" : "180px",
                  maxWidth: isMobile ? "200px" : "250px",
                }}
              >
                {/* Pin */}
                <div
                  ref={pinRef}
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-red-600 shadow-[0_2px_4px_rgba(0,0,0,0.4)] border border-red-700 z-25 flex items-center justify-center pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 3px 3px, #f87171, #b91c1c)"
                  }}
                >
                  <div className="w-0.5 h-0.5 rounded-full bg-white/60 absolute top-0.5 left-0.5" />
                  <div className="absolute top-2.5 left-2.5 w-1 h-2.5 bg-black/45 origin-top-left rotate-[40deg] rounded-full blur-[0.5px]" />
                </div>

                {/* Photo */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-stone-900 border border-stone-200/60 shadow-inner">
                  <img
                    src={skill.photo}
                    alt={skill.title}
                    className="w-full h-full object-cover filter contrast-[1.08] brightness-[0.92] sepia-[0.05]"
                  />
                  <div className="absolute bottom-2 right-2 bg-stone-900/80 border border-[#C9A84C]/50 p-1.5 rounded backdrop-blur-sm z-10 pointer-events-none">
                    <Icon className="w-4 h-4 text-[#C9A84C]" />
                  </div>
                  <div className="absolute -top-3 -left-3 w-6 h-2.5 bg-yellow-100/25 backdrop-blur-[0.5px] rotate-[-35deg] border-l border-r border-yellow-200/10" />
                </div>

                {/* Info */}
                <div className="mt-3 flex flex-col gap-1.5">
                  <h3 className="text-xs md:text-sm font-black tracking-wider text-stone-800 leading-tight uppercase font-display">
                    {skill.title}
                  </h3>
                  <p className="text-[0.6rem] md:text-[0.7rem] text-stone-600 leading-relaxed font-light font-sans line-clamp-3 select-text pointer-events-auto">
                    {skill.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-1 border-t border-dashed border-stone-200 pt-2">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.55rem] bg-stone-100 border border-amber-800/15 text-amber-900/85 px-1.5 py-0.5 rounded font-mono tracking-wider font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Cursive Number */}
                  <div className="fleur-de-leah-regular text-3xl md:text-4xl text-red-800/80 mt-1 select-none font-bold text-center leading-none">
                    {skill.id}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* Circular Approved Stamp placed at bottom right of the whole section */}
      <Stamp className="absolute bottom-4 right-4 w-36 h-36 md:w-48 md:h-48 opacity-85 rotate-[-15deg] z-20" color="#B22222" />
    </section>
  );
}
