"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Code, Cpu } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Milestone {
  year: string;
  title: string;
  institution: string;
  badge: string;
  grade: string;
  details: string;
  icon: React.ComponentType<{ className?: string }>;
}

const milestones: Milestone[] = [
  {
    year: "2018–2020",
    title: "High School Education",
    institution: "Mother Teresa Sr. Sec. School",
    badge: "Science & Mathematics",
    grade: "91.2% Aggregate",
    details: "Fostered a strong analytical foundation with deep focus on Physics, Chemistry, and Advanced Mathematics.",
    icon: GraduationCap,
  },
  {
    year: "2020–2023",
    title: "Diploma in Computer Science",
    institution: "Government Polytechnic College",
    badge: "Software Engineering",
    grade: "8.5 CGPA / 87.5%",
    details: "Learned core computer science concepts including OOPs, Data Structures, Database Systems, and built multiple web-based platforms.",
    icon: Code,
  },
  {
    year: "2024–Present",
    title: "B.Tech in Computer Science",
    institution: "Lovely Professional University",
    badge: "Web Architecture & AI",
    grade: "Pursuing (Current)",
    details: "Specializing in full-stack architecture, machine learning integrations, creative UI motion, and next-generation web technologies.",
    icon: Cpu,
  }
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pathGlowRef = useRef<SVGPathElement>(null);
  const pointerRef = useRef<SVGCircleElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const [pathD, setPathD] = useState("");

  // Dynamically calculate and build the connecting SVG path
  useEffect(() => {
    const updatePath = () => {
      const svg = svgRef.current;
      const container = containerRef.current;
      if (!svg || !container) return;

      const svgRect = svg.getBoundingClientRect();
      const coords = nodesRef.current.map((node) => {
        if (!node) return { x: 0, y: 0 };
        const rect = node.getBoundingClientRect();
        return {
          x: rect.left - svgRect.left + rect.width / 2,
          y: rect.top - svgRect.top + rect.height / 2,
        };
      });

      const width = svgRect.width;
      const height = svgRect.height;
      const centerX = width / 2;

      let d = `M ${centerX} 0`;

      if (coords.length > 0) {
        // Curve from top center to first node
        const first = coords[0];
        d += ` L ${centerX} ${first.y - 80}`;
        d += ` C ${centerX} ${first.y - 40}, ${first.x} ${first.y - 40}, ${first.x} ${first.y}`;

        // Connect milestones with elegant cubic bezier curves
        for (let i = 0; i < coords.length - 1; i++) {
          const curr = coords[i];
          const next = coords[i + 1];
          const dy = next.y - curr.y;

          d += ` C ${curr.x} ${curr.y + dy * 0.45}, ${next.x} ${next.y - dy * 0.45}, ${next.x} ${next.y}`;
        }

        // Curve from last node to bottom center
        const last = coords[coords.length - 1];
        d += ` C ${last.x} ${last.y + 40}, ${centerX} ${last.y + 40}, ${centerX} ${last.y + 80}`;
        d += ` L ${centerX} ${height}`;
      } else {
        d += ` L ${centerX} ${height}`;
      }

      setPathD(d);
    };

    // Wait slightly to ensure layout rendering has settled
    const timer = setTimeout(updatePath, 100);

    // Watch for size changes of the section container to auto-update path coordinates
    const observer = new ResizeObserver(() => updatePath());
    if (containerRef.current && containerRef.current.parentElement) {
      observer.observe(containerRef.current.parentElement);
    }

    window.addEventListener("resize", updatePath);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, []);

  // Hook GSAP ScrollTrigger animations to the dynamic path
  useEffect(() => {
    const path = pathRef.current;
    const pathGlow = pathGlowRef.current;
    const pointer = pointerRef.current;
    const container = containerRef.current;
    if (!path || !pathGlow || !pathD || !container) return;

    const length = path.getTotalLength();

    // Prepare initial state of paths
    gsap.set([path, pathGlow], {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Create the master scroll-driven timeline for line reveal
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 70%",
        end: "bottom 75%",
        scrub: 0.5,
      },
    });

    mainTimeline.to([path, pathGlow], {
      strokeDashoffset: 0,
      ease: "none",
    });

    // Position and fade the leading tracking light dot along the SVG path
    ScrollTrigger.create({
      trigger: contentRef.current,
      start: "top 70%",
      end: "bottom 75%",
      scrub: 0.5,
      onUpdate: (self) => {
        if (!pointer || !path) return;
        const currentLength = length * self.progress;
        const point = path.getPointAtLength(currentLength);

        // Position the pointer dot using attributes for maximum SVG compatibility
        pointer.setAttribute("cx", point.x.toString());
        pointer.setAttribute("cy", point.y.toString());

        // Fade out dot at the extreme edges
        gsap.set(pointer, {
          opacity: self.progress > 0.01 && self.progress < 0.99 ? 1 : 0,
        });
      },
    });

    // Trigger entrance animation for cards and activation of nodes
    const ctx = gsap.context(() => {
      milestones.forEach((_, idx) => {
        const card = cardsRef.current[idx];
        const node = nodesRef.current[idx];
        if (!card || !node) return;

        // Card reveal animation
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
            scale: 0.96,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Node glow and pulse activation animation
        gsap.fromTo(
          node,
          {
            scale: 0.8,
            boxShadow: "0 0 0px rgba(212, 175, 55, 0)",
            backgroundColor: "#8e8e93",
          },
          {
            scale: 1.25,
            backgroundColor: "#f4c400",
            boxShadow: "0 0 15px #d4af37, 0 0 30px #f4c400",
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: node,
              start: "top 72%",
              toggleActions: "play none none reverse",
              onEnter: () => {
                // Trigger the ring pulse visual ripple
                const ring = node.querySelector(".ring-pulse");
                if (ring) {
                  gsap.fromTo(
                    ring,
                    { scale: 1, opacity: 0.8 },
                    { scale: 3, opacity: 0, duration: 0.8, ease: "power2.out" }
                  );
                }
              },
            },
          }
        );
      });
    }, container);

    return () => {
      ctx.revert();
      if (mainTimeline.scrollTrigger) mainTimeline.scrollTrigger.kill();
      mainTimeline.kill();
    };
  }, [pathD]);

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative w-full z-20 mt-[-100vh] select-none"
    >
      {/*
        Cinematic blend wrapper
        ───────────────────────────────────────────────────────────────
        fetures.jpg lives here ONCE — it spans both the cross-fade zone
        and the content body as a single continuous background.

        mask-image (5-stop eased curve, transparent → opaque over 100vh):
          0vh  → fully transparent  : hero canvas shows through 100%
          20vh → 15% opaque         : fetures.jpg barely starts bleeding in
          50vh → 55% opaque         : midpoint cross-dissolve
          80vh → 88% opaque         : nearly fully fetures.jpg
          100vh→ fully opaque       : hard content starts here, zero seam
      */}
      <div
        style={{
          backgroundImage: "url('/images/fetures.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          maskImage: "linear-gradient(to bottom, transparent 0vh, rgba(0,0,0,0.15) 20vh, rgba(0,0,0,0.55) 50vh, rgba(0,0,0,0.88) 80vh, black 100vh)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0vh, rgba(0,0,0,0.15) 20vh, rgba(0,0,0,0.55) 50vh, rgba(0,0,0,0.88) 80vh, black 100vh)",
        }}
      >
        {/* Cross-fade zone: hero canvas (z-10) shows through the transparent mask above */}
        <div className="relative w-full h-[100vh] pointer-events-none" />

        {/* Main content body — fetures.jpg fully opaque here from wrapper */}
        <div
          ref={contentRef}
          className="relative w-full py-20 pb-36 border-b border-white/[0.03]"
        >
        {/* Radial gold accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.02),transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Section Header (Academic Timeline // My Journey) */}
          <div className="text-center w-full mb-16 relative z-30">
            <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.25em] mb-3 block">
              academic timeline
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white font-display">
              My Journey
            </h2>
            <div className="h-[2px] w-16 bg-luxury-gold mx-auto mt-6" />
          </div>
          {/* Dynamic Timeline Wrapper */}
          <div className="relative w-full">
            {/* Centered SVG Path Container */}
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
              aria-hidden="true"
            >
              <defs>
                {/* Path glow filter */}
                <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Pointer dot glow filter */}
                <filter id="glow-dot" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Inactive line path (background track) */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Glowing active line path */}
              {pathD && (
                <path
                  ref={pathGlowRef}
                  d={pathD}
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="8"
                  opacity="0.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow-line)"
                />
              )}

              {/* Sharp active line path */}
              {pathD && (
                <path
                  ref={pathRef}
                  d={pathD}
                  fill="none"
                  stroke="#f4c400"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Leading Animated Glow Light Dot */}
              <circle
                ref={pointerRef}
                r="6"
                fill="#f4c400"
                className="opacity-0 pointer-events-none"
                filter="url(#glow-dot)"
              />
            </svg>

            {/* Milestone Cards Column Layout */}
            <div className="flex flex-col gap-24 md:gap-32 w-full relative z-20">
              {milestones.map((item, idx) => {
                const Icon = item.icon;
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={idx}
                    className={`grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] items-center w-full`}
                  >
                    {/* Left Column for Desktop (Even Card) */}
                    <div
                      className={`order-2 md:order-1 ${isEven ? "block" : "hidden md:block opacity-0 pointer-events-none"
                        }`}
                    >
                      {isEven && (
                        <div
                          ref={(el) => { cardsRef.current[idx] = el; }}
                          className="group relative backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] hover:border-luxury-gold/30 hover:bg-white/[0.04] p-8 md:p-10 rounded-3xl transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)] select-none text-left"
                        >
                          {/* Connecting Point Circle (Desktop Right-aligned) */}
                          <div
                            ref={(el) => { nodesRef.current[idx] = el; }}
                            className="absolute z-30 w-4 h-4 rounded-full border-2 border-luxury-bg top-[-8px] left-1/2 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:left-auto md:right-[-48px]"
                          >
                            <div className="absolute inset-0 rounded-full bg-brand-yellow/50 opacity-0 scale-100 ring-pulse pointer-events-none" />
                          </div>

                          {/* Milestone header */}
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                              <span className="text-luxury-gold text-xs font-mono font-semibold tracking-wider block mb-1">
                                {item.year}
                              </span>
                              <h3 className="text-xl md:text-2xl font-black text-white leading-tight uppercase tracking-tight">
                                {item.title}
                              </h3>
                            </div>
                            <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/[0.05] group-hover:bg-luxury-gold/15 group-hover:border-luxury-gold/30 transition-colors duration-300">
                              <Icon className="w-6 h-6 text-luxury-gold" />
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2.5 mb-6">
                            <span className="text-[10px] bg-white/5 border border-white/[0.05] text-white/80 px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">
                              {item.institution}
                            </span>
                            <span className="text-[10px] bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold px-2.5 py-1 rounded-full uppercase font-black tracking-wider">
                              {item.badge}
                            </span>
                            <span className="text-[10px] bg-white/[0.03] border border-white/[0.03] text-white/60 px-2.5 py-1 rounded-full font-mono">
                              {item.grade}
                            </span>
                          </div>

                          <p className="text-white/50 text-sm leading-relaxed font-light">
                            {item.details}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Middle Center column for visual spacing on desktop */}
                    <div className="order-1 md:order-2 flex justify-center items-center h-full pointer-events-none min-h-[40px] md:min-h-0" />

                    {/* Right Column for Desktop (Odd Card) */}
                    <div
                      className={`order-3 ${!isEven ? "block" : "hidden md:block opacity-0 pointer-events-none"
                        }`}
                    >
                      {!isEven && (
                        <div
                          ref={(el) => { cardsRef.current[idx] = el; }}
                          className="group relative backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] hover:border-luxury-gold/30 hover:bg-white/[0.04] p-8 md:p-10 rounded-3xl transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)] select-none text-left"
                        >
                          {/* Connecting Point Circle (Desktop Left-aligned) */}
                          <div
                            ref={(el) => { nodesRef.current[idx] = el; }}
                            className="absolute z-30 w-4 h-4 rounded-full border-2 border-luxury-bg top-[-8px] left-1/2 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:right-auto md:left-[-48px]"
                          >
                            <div className="absolute inset-0 rounded-full bg-brand-yellow/50 opacity-0 scale-100 ring-pulse pointer-events-none" />
                          </div>

                          {/* Milestone header */}
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                              <span className="text-luxury-gold text-xs font-mono font-semibold tracking-wider block mb-1">
                                {item.year}
                              </span>
                              <h3 className="text-xl md:text-2xl font-black text-white leading-tight uppercase tracking-tight">
                                {item.title}
                              </h3>
                            </div>
                            <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/[0.05] group-hover:bg-luxury-gold/15 group-hover:border-luxury-gold/30 transition-colors duration-300">
                              <Icon className="w-6 h-6 text-luxury-gold" />
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2.5 mb-6">
                            <span className="text-[10px] bg-white/5 border border-white/[0.05] text-white/80 px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">
                              {item.institution}
                            </span>
                            <span className="text-[10px] bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold px-2.5 py-1 rounded-full uppercase font-black tracking-wider">
                              {item.badge}
                            </span>
                            <span className="text-[10px] bg-white/[0.03] border border-white/[0.03] text-white/60 px-2.5 py-1 rounded-full font-mono">
                              {item.grade}
                            </span>
                          </div>

                          <p className="text-white/50 text-sm leading-relaxed font-light">
                            {item.details}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        </div> {/* end blend wrapper */}
      </div>
    </section>
  );
}
