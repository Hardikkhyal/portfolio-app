"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Code, Cpu } from "lucide-react";
import Skills from "./Skills";
import AboutMe from "./AboutMe";
import FloatingStars from "./ui/FloatingStars";

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
        
        const first = coords[0];
        d += ` L ${centerX} ${first.y - 80}`;
        d += ` C ${centerX} ${first.y - 40}, ${first.x} ${first.y - 40}, ${first.x} ${first.y}`;

        
        for (let i = 0; i < coords.length - 1; i++) {
          const curr = coords[i];
          const next = coords[i + 1];
          const dy = next.y - curr.y;

          d += ` C ${curr.x} ${curr.y + dy * 0.45}, ${next.x} ${next.y - dy * 0.45}, ${next.x} ${next.y}`;
        }

        
        const last = coords[coords.length - 1];
        d += ` C ${last.x} ${last.y + 40}, ${centerX} ${last.y + 40}, ${centerX} ${last.y + 80}`;
        d += ` L ${centerX} ${height}`;
      } else {
        d += ` L ${centerX} ${height}`;
      }

      setPathD(d);
      
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    };

    
    const timer = setTimeout(updatePath, 100);

    
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

  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    
    const ctx = gsap.context(() => {
      
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%", 
              toggleActions: "play none none none",
              once: true, 
            },
          }
        );
      });

      
      nodesRef.current.forEach((node, idx) => {
        if (!node) return;

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
              toggleActions: "play none none none",
              once: true,
              onEnter: () => {
                
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
    };
  }, []);

  
  useEffect(() => {
    const path = pathRef.current;
    const pathGlow = pathGlowRef.current;
    const pointer = pointerRef.current;
    const container = containerRef.current;
    if (!path || !pathGlow || !pathD || !container) return;

    const length = path.getTotalLength();

    
    gsap.set([path, pathGlow], {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    
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

    
    const trackingTrigger = ScrollTrigger.create({
      trigger: contentRef.current,
      start: "top 70%",
      end: "bottom 75%",
      scrub: 0.5,
      onUpdate: (self) => {
        if (!pointer || !path) return;
        const currentLength = length * self.progress;
        const point = path.getPointAtLength(currentLength);

        
        pointer.setAttribute("cx", point.x.toString());
        pointer.setAttribute("cy", point.y.toString());

        
        gsap.set(pointer, {
          opacity: self.progress > 0.01 && self.progress < 0.99 ? 1 : 0,
        });
      },
    });

    return () => {
      if (mainTimeline.scrollTrigger) mainTimeline.scrollTrigger.kill();
      mainTimeline.kill();
      trackingTrigger.kill();
    };
  }, [pathD]);

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative w-full z-40 mt-[-50vh] -mb-4 select-none"
    >
      
      <div
        style={{
          backgroundImage: "url('/images/BLUE.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          maskImage: "linear-gradient(to bottom, transparent 0vh, rgba(0,0,0,0.15) 10vh, rgba(0,0,0,0.55) 25vh, rgba(0,0,0,0.88) 40vh, black 50vh, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0vh, rgba(0,0,0,0.15) 10vh, rgba(0,0,0,0.55) 25vh, rgba(0,0,0,0.88) 40vh, black 50vh, black 100%)",
        }}
      >
        
        <FloatingStars />

        
        <div className="relative w-full h-[50vh] pointer-events-none" />

        
        <AboutMe />

        
        <Skills />

        
        <div
          ref={contentRef}
          className="relative w-full py-12 pb-20"
        >
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.02),transparent_70%)] pointer-events-none z-0" />



          <div className="max-w-6xl mx-auto px-6 relative z-10">
            
            <div className="text-center w-full mb-10 relative z-30">
              <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.25em] mb-3 block">
                academic timeline
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white font-display">
                My Journey
              </h2>
              <div className="h-[2px] w-16 bg-luxury-gold mx-auto mt-6" />
            </div>
            
            <div className="relative w-full">
              
              <svg
                ref={svgRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
                aria-hidden="true"
              >
                <defs>
                  
                  <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  
                  <filter id="glow-dot" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                
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

                
                <circle
                  ref={pointerRef}
                  r="6"
                  fill="#f4c400"
                  className="opacity-0 pointer-events-none"
                  filter="url(#glow-dot)"
                />
              </svg>

              
              <div className="flex flex-col gap-12 md:gap-16 w-full relative z-20">
                {milestones.map((item, idx) => {
                  const Icon = item.icon;
                  const isEven = idx % 2 === 0;

                  return (
                    <div
                      key={idx}
                      className={`grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] items-center w-full`}
                    >
                      
                      <div
                        className={`order-2 md:order-1 ${isEven ? "block" : "hidden md:block opacity-0 pointer-events-none"
                          }`}
                      >
                        {isEven && (
                          <div
                            ref={(el) => { cardsRef.current[idx] = el; }}
                            className="group relative p-8 md:p-10 rounded-3xl select-none text-left transition-all duration-500"
                          >
                            
                            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                              <svg
                                viewBox="10 120 480 260"
                                preserveAspectRatio="none"
                                className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                              >
                                
                                <path
                                  d="M469.2,376.12H158.01v-7.02c0-4.71-3.83-8.54-8.55-8.54s-8.54,3.83-8.54,8.54v7.02H30.8c-10.14,0-18.39-8.25-18.39-18.39 v-77.64h3c16.59,0,30.09-13.5,30.09-30.09S32,219.91,15.41,219.91h-3v-77.64c0-10.14,8.25-18.39,18.39-18.39h110.11v7.02 c0,4.71,3.83,8.55,8.54,8.55s8.55-3.83,8.55-8.55v-7.02H469.2c10.14,0,18.39,8.25,18.39,18.39v215.45 C487.59,367.87,479.34,376.12,469.2,376.12z"
                                  fill="#ffffff"
                                />
                                
                                <path
                                  d="M469.2,376.12H158.01v-7.02c0-4.71-3.83-8.54-8.55-8.54s-8.54,3.83-8.54,8.54v7.02H30.8c-10.14,0-18.39-8.25-18.39-18.39 v-77.64h3c16.59,0,30.09-13.5,30.09-30.09S32,219.91,15.41,219.91h-3v-77.64c0-10.14,8.25-18.39,18.39-18.39h110.11v7.02 c0,4.71,3.83,8.55,8.54,8.55s8.55-3.83,8.55-8.55v-7.02H469.2c10.14,0,18.39,8.25,18.39,18.39v215.45 C487.59,367.87,479.34,376.12,469.2,376.12z M164.01,370.12H469.2c6.83,0,12.39-5.56,12.39-12.39V142.27 c0-6.83-5.56-12.39-12.39-12.39H164.01v1.02c0,5.87-3.49,10.94-8.51,13.23c5.02,2.3,8.51,7.36,8.51,13.23v26.46 c0,5.87-3.49,10.94-8.51,13.23c5.02,2.3,8.51,7.36,8.51,13.23v26.46c0,5.87-3.49,10.94-8.51,13.23c5.02,2.3,8.51,7.36,8.51,13.23 v26.47c0,5.87-3.49,10.94-8.51,13.23c5.02,2.3,8.51,7.36,8.51,13.23v26.47c0,5.87-3.49,10.94-8.51,13.23 c5.02,2.3,8.51,7.36,8.51,13.23V370.12z M18.41,285.96v71.76c0,6.83,5.56,12.39,12.39,12.39h104.11v-1.02 c0-5.87,3.49-10.94,8.51-13.23c-5.02-2.3-8.51-7.36-8.51-13.23v-26.47c0-5.87,3.49-10.94,8.51-13.23 c-5.02-2.3-8.51-7.36-8.51-13.23v-26.47c0-5.87,3.49-10.94,8.51-13.23c-5.02-2.3-8.51-7.36-8.51-13.23V210.3 c0-5.87,3.49-10.94,8.51-13.23c-5.02-2.3-8.51-7.36-8.51-13.23v-26.46c0-5.87,3.49-10.94,8.51-13.23 c-5.02-2.3-8.51-7.36-8.51-13.23v-1.02H30.8c-6.83,0-12.39,5.56-12.39,12.39v71.76c18.5,1.53,33.09,17.08,33.09,35.96 S36.91,284.43,18.41,285.96z M149.46,307.62c-4.71,0-8.54,3.83-8.54,8.54v26.47c0,4.71,3.83,8.54,8.54,8.54s8.55-3.83,8.55-8.54 v-26.47C158.01,311.45,154.17,307.62,149.46,307.62z M149.46,254.69c-4.71,0-8.54,3.83-8.54,8.54v26.47 c0,4.71,3.83,8.54,8.54,8.54s8.55-3.83,8.55-8.54v-26.47C158.01,258.52,154.17,254.69,149.46,254.69z M149.46,201.76 c-4.71,0-8.54,3.83-8.54,8.55v26.46c0,4.71,3.83,8.54,8.54,8.54s8.55-3.83,8.55-8.54V210.3 C158.01,205.59,154.17,201.76,149.46,201.76z M149.46,148.83c-4.71,0-8.54,3.83-8.54,8.55v26.46c0,4.71,3.83,8.54,8.54,8.54 s8.55-3.83,8.55-8.54v-26.46C158.01,152.66,154.17,148.83,149.46,148.83z"
                                  fill="rgba(0, 0, 0, 0.05)"
                                />
                                
                                <path
                                  d="M308.42,340.87h-8.13l14.15-60.4v-15.48c-18.4-1.62-39.11-4.07-61.64-7.3l-10.83,25.81l-11.64,4.14l7.29-32.21 c-5.27-0.81-10.53-1.63-15.68-2.47l-18.3-2.96l18.3-2.96c5.15-0.83,10.41-1.66,15.68-2.47l-7.29-32.21l11.64,4.14l10.83,25.81 c22.53-3.23,43.24-5.68,61.64-7.3v-15.48l-14.15-60.4h8.13c4,0,7.71,2.33,9.44,5.94l32.48,67.72c47.8-1.45,64.82,5.33,70.66,11.32 c2.62,2.68,2.88,5.01,2.87,5.89c0.01,0.88-0.25,3.21-2.87,5.89c-5.84,5.99-22.86,12.77-70.66,11.32l-32.48,67.72 C316.13,338.53,312.43,340.87,308.42,340.87z M307.86,334.87h0.56c1.71,0,3.29-1,4.03-2.54l34.17-71.25l1.96,0.07 c62.55,2.15,68.81-9.94,69.26-11.15c-0.45-1.2-6.71-13.3-69.26-11.15l-1.96,0.07l-34.17-71.25c-0.74-1.54-2.32-2.54-4.03-2.54 h-0.56l12.58,53.71v21.69l-2.75,0.23c-19.57,1.66-41.89,4.29-66.33,7.83l-2.3,0.33l-9.36-22.32l5.19,22.94l-3.05,0.46l3.05,0.46 l-5.19,22.94l9.36-22.32l2.3,0.33c24.44,3.54,46.75,6.18,66.33,7.83l2.75,0.23v21.69L307.86,334.87z M417.88,250.09L417.88,250.09 L417.88,250.09z M417.88,249.9L417.88,249.9L417.88,249.9z"
                                  fill="rgba(212, 175, 55, 0.08)"
                                />
                              </svg>
                            </div>

                            
                            <div
                              ref={(el) => { nodesRef.current[idx] = el; }}
                              className="absolute z-30 w-4 h-4 rounded-full border-2 border-luxury-bg top-[-8px] left-1/2 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:left-auto md:right-[-48px]"
                            >
                              <div className="absolute inset-0 rounded-full bg-brand-yellow/50 opacity-0 scale-100 ring-pulse pointer-events-none" />
                            </div>

                            
                            <div className="relative z-10">
                              
                              <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                  <span className="text-luxury-gold text-xs font-mono font-semibold tracking-wider block mb-1">
                                    {item.year}
                                  </span>
                                  <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                                    {item.title}
                                  </h3>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 group-hover:bg-luxury-gold/15 group-hover:border-luxury-gold/30 transition-colors duration-300">
                                  <Icon className="w-6 h-6 text-luxury-gold" />
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2.5 mb-6">
                                <span className="text-[0.625rem] bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">
                                  {item.institution}
                                </span>
                                <span className="text-[0.625rem] bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold px-2.5 py-1 rounded-full uppercase font-black tracking-wider">
                                  {item.badge}
                                </span>
                                <span className="text-[0.625rem] bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-mono">
                                  {item.grade}
                                </span>
                              </div>

                              <p className="text-slate-600 text-sm leading-relaxed font-light">
                                {item.details}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      
                      <div className="order-1 md:order-2 flex justify-center items-center h-full pointer-events-none min-h-[2.5rem] md:min-h-0" />

                      
                      <div
                        className={`order-3 ${!isEven ? "block" : "hidden md:block opacity-0 pointer-events-none"
                          }`}
                      >
                        {!isEven && (
                          <div
                            ref={(el) => { cardsRef.current[idx] = el; }}
                            className="group relative p-8 md:p-10 rounded-3xl select-none text-left transition-all duration-500"
                          >
                            
                            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                              <svg
                                viewBox="10 120 480 260"
                                preserveAspectRatio="none"
                                className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                              >
                                
                                <path
                                  d="M469.2,376.12H158.01v-7.02c0-4.71-3.83-8.54-8.55-8.54s-8.54,3.83-8.54,8.54v7.02H30.8c-10.14,0-18.39-8.25-18.39-18.39 v-77.64h3c16.59,0,30.09-13.5,30.09-30.09S32,219.91,15.41,219.91h-3v-77.64c0-10.14,8.25-18.39,18.39-18.39h110.11v7.02 c0,4.71,3.83,8.55,8.54,8.55s8.55-3.83,8.55-8.55v-7.02H469.2c10.14,0,18.39,8.25,18.39,18.39v215.45 C487.59,367.87,479.34,376.12,469.2,376.12z"
                                  fill="#ffffff"
                                />
                                
                                <path
                                  d="M469.2,376.12H158.01v-7.02c0-4.71-3.83-8.54-8.55-8.54s-8.54,3.83-8.54,8.54v7.02H30.8c-10.14,0-18.39-8.25-18.39-18.39 v-77.64h3c16.59,0,30.09-13.5,30.09-30.09S32,219.91,15.41,219.91h-3v-77.64c0-10.14,8.25-18.39,18.39-18.39h110.11v7.02 c0,4.71,3.83,8.55,8.54,8.55s8.55-3.83,8.55-8.55v-7.02H469.2c10.14,0,18.39,8.25,18.39,18.39v215.45 C487.59,367.87,479.34,376.12,469.2,376.12z M164.01,370.12H469.2c6.83,0,12.39-5.56,12.39-12.39V142.27 c0-6.83-5.56-12.39-12.39-12.39H164.01v1.02c0,5.87-3.49,10.94-8.51,13.23c5.02,2.3,8.51,7.36,8.51,13.23v26.46 c0,5.87-3.49,10.94-8.51,13.23c5.02,2.3,8.51,7.36,8.51,13.23v26.46c0,5.87-3.49,10.94-8.51,13.23c5.02,2.3,8.51,7.36,8.51,13.23 v26.47c0,5.87-3.49,10.94-8.51,13.23c5.02,2.3,8.51,7.36,8.51,13.23v26.47c0,5.87-3.49,10.94-8.51,13.23 c5.02,2.3,8.51,7.36,8.51,13.23V370.12z M18.41,285.96v71.76c0,6.83,5.56,12.39,12.39,12.39h104.11v-1.02 c0-5.87,3.49-10.94,8.51-13.23c-5.02-2.3-8.51-7.36-8.51-13.23v-26.47c0-5.87,3.49-10.94,8.51-13.23c-5.02-2.3-8.51-7.36-8.51-13.23v-26.47c0-5.87,3.49-10.94,8.51-13.23c-5.02-2.3-8.51-7.36-8.51-13.23V210.3 c0-5.87,3.49-10.94,8.51-13.23c-5.02-2.3-8.51-7.36-8.51-13.23v-26.46c0-5.87,3.49-10.94,8.51-13.23 c-5.02-2.3-8.51-7.36-8.51-13.23v-1.02H30.8c-6.83,0-12.39,5.56-12.39,12.39v71.76c18.5,1.53,33.09,17.08,33.09,35.96 S36.91,284.43,18.41,285.96z M149.46,307.62c-4.71,0-8.54,3.83-8.54,8.54v26.47c0,4.71,3.83,8.54,8.54,8.54s8.55-3.83,8.55-8.54 v-26.47C158.01,311.45,154.17,307.62,149.46,307.62z M149.46,254.69c-4.71,0-8.54,3.83-8.54,8.54v26.47 c0,4.71,3.83,8.54,8.54,8.54s8.55-3.83,8.55-8.54v-26.47C158.01,258.52,154.17,254.69,149.46,254.69z M149.46,201.76 c-4.71,0-8.54,3.83-8.54,8.55v26.46c0,4.71,3.83,8.54,8.54,8.54s8.55-3.83,8.55-8.54V210.3 C158.01,205.59,154.17,201.76,149.46,201.76z M149.46,148.83c-4.71,0-8.54,3.83-8.54,8.55v26.46c0,4.71,3.83,8.54,8.54,8.54 s8.55-3.83,8.55-8.54v-26.46C158.01,152.66,154.17,148.83,149.46,148.83z"
                                  fill="rgba(0, 0, 0, 0.05)"
                                />
                                
                                <path
                                  d="M308.42,340.87h-8.13l14.15-60.4v-15.48c-18.4-1.62-39.11-4.07-61.64-7.3l-10.83,25.81l-11.64,4.14l7.29-32.21 c-5.27-0.81-10.53-1.63-15.68-2.47l-18.3-2.96l18.3-2.96c5.15-0.83,10.41-1.66,15.68-2.47l-7.29-32.21l11.64,4.14l10.83,25.81 c22.53-3.23,43.24-5.68,61.64-7.3v-15.48l-14.15-60.4h8.13c4,0,7.71,2.33,9.44,5.94l32.48,67.72c47.8-1.45,64.82,5.33,70.66,11.32 c2.62,2.68,2.88,5.01,2.87,5.89c0.01,0.88-0.25,3.21-2.87,5.89c-5.84,5.99-22.86,12.77-70.66,11.32l-32.48,67.72 C316.13,338.53,312.43,340.87,308.42,340.87z M307.86,334.87h0.56c1.71,0,3.29-1,4.03-2.54l34.17-71.25l1.96,0.07 c62.55,2.15,68.81-9.94,69.26-11.15c-0.45-1.2-6.71-13.3-69.26-11.15l-1.96,0.07l-34.17-71.25c-0.74-1.54-2.32-2.54-4.03-2.54 h-0.56l12.58,53.71v21.69l-2.75,0.23c-19.57,1.66-41.89,4.29-66.33,7.83l-2.3,0.33l-9.36-22.32l5.19,22.94l-3.05,0.46l3.05,0.46 l-5.19,22.94l9.36-22.32l2.3,0.33c24.44,3.54,46.75,6.18,66.33,7.83l2.75,0.23v21.69L307.86,334.87z M417.88,250.09L417.88,250.09 L417.88,250.09z M417.88,249.9L417.88,249.9L417.88,249.9z"
                                  fill="rgba(212, 175, 55, 0.08)"
                                />
                              </svg>
                            </div>

                            
                            <div
                              ref={(el) => { nodesRef.current[idx] = el; }}
                              className="absolute z-30 w-4 h-4 rounded-full border-2 border-luxury-bg top-[-8px] left-1/2 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:right-auto md:left-[-48px]"
                            >
                              <div className="absolute inset-0 rounded-full bg-brand-yellow/50 opacity-0 scale-100 ring-pulse pointer-events-none" />
                            </div>

                            
                            <div className="relative z-10">
                              
                              <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                  <span className="text-luxury-gold text-xs font-mono font-semibold tracking-wider block mb-1">
                                    {item.year}
                                  </span>
                                  <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                                    {item.title}
                                  </h3>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 group-hover:bg-luxury-gold/15 group-hover:border-luxury-gold/30 transition-colors duration-300">
                                  <Icon className="w-6 h-6 text-luxury-gold" />
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2.5 mb-6">
                                <span className="text-[0.625rem] bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">
                                  {item.institution}
                                </span>
                                <span className="text-[0.625rem] bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold px-2.5 py-1 rounded-full uppercase font-black tracking-wider">
                                  {item.badge}
                                </span>
                                <span className="text-[0.625rem] bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-mono">
                                  {item.grade}
                                </span>
                              </div>

                              <p className="text-slate-600 text-sm leading-relaxed font-light">
                                {item.details}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div> 
      </div>
    </section>
  );
}
