"use client";

import React from "react";
import { Sparkles, Cpu, Layers, Palette, Zap, Code } from "lucide-react";
import FloatingStars from "./ui/FloatingStars";

export default function FeaturedCards() {
  const allCards = [
    {
      icon: <Layers className="w-6 h-6 md:w-8 md:h-8 text-luxury-gold" />,
      title: "Immersive Front-End Development",
      desc: "Crafting highly performant, production-ready React and Next.js applications tailored with rigid design systems and optimized components.",
      tag: "ENGINEERING"
    },
    {
      icon: <Code className="w-6 h-6 md:w-8 md:h-8 text-luxury-gold" />,
      title: "Interactive WebGL & 3D",
      desc: "Integrating WebGL experiences, Three.js shaders, and interactive 3D assets that respond dynamically to scroll and mouse coordinates.",
      tag: "WEBGL & 3D"
    },
    {
      icon: <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-luxury-gold" />,
      title: "Creative Motion & Interaction",
      desc: "Creating micro-interactions and smooth, scroll-triggered animations utilizing GSAP, ScrollTrigger, and custom spring-physics engines.",
      tag: "ANIMATION"
    },
    {
      icon: <Palette className="w-6 h-6 md:w-8 md:h-8 text-luxury-gold" />,
      title: "Luxury Digital Aesthetics",
      desc: "Designing responsive layouts with high contrast, bespoke grids, custom color palettes, and glassmorphism that align with premium brand identities.",
      tag: "DESIGN"
    },
    {
      icon: <Cpu className="w-6 h-6 md:w-8 md:h-8 text-luxury-gold" />,
      title: "Robust Performance Tuning",
      desc: "Achieving perfect Core Web Vitals through asset optimization, code splitting, lazy loading, and fine-tuning database queries.",
      tag: "OPTIMIZATION"
    },
    {
      icon: <Zap className="w-6 h-6 md:w-8 md:h-8 text-luxury-gold" />,
      title: "Scalable Architecture Design",
      desc: "Establishing clean folder structures, robust state management, and reusable utility layers to support continuous feature expansion.",
      tag: "ARCHITECTURE"
    }
  ];

  return (
    <section className="relative w-full pt-2 md:pt-6 pb-12 md:pb-20 px-8 md:px-24 lg:px-32 select-none overflow-hidden z-30 pointer-events-auto">
      <FloatingStars />
      {/* Subtle gold mesh accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.015),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Cards Grid: two columns (left side 3 cards, right side 3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
          {allCards.map((card, index) => (
            <div
              key={`card-${index}`}
              className={`group relative p-4 md:p-10 rounded-xl md:rounded-2xl bg-white border border-slate-100 hover:border-luxury-gold/50 hover:bg-slate-50/50 shadow-xl transition-all duration-500 hover:scale-[1.02] flex flex-col justify-between overflow-hidden h-full min-h-0 md:min-h-[280px] ${
                index >= 4 ? "hidden md:flex" : "flex"
              }`}
            >
              {/* Subtle inner card glow effect on hover */}
              <div className="absolute -inset-px bg-gradient-to-r from-luxury-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl md:rounded-2xl" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="p-2 md:p-3 bg-slate-50 rounded-lg md:rounded-xl border border-slate-200/60 group-hover:border-luxury-gold/30 transition-colors duration-300">
                      {card.icon}
                    </div>
                    <span className="text-[9px] md:text-[10px] text-luxury-gold font-bold tracking-widest uppercase bg-luxury-gold/10 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full border border-luxury-gold/20">
                      {card.tag}
                    </span>
                  </div>

                  <h4 className="text-base md:text-2xl font-black tracking-tight text-slate-900 mb-2 md:mb-4 font-display group-hover:text-luxury-gold transition-colors duration-300">
                    {card.title}
                  </h4>
                </div>

                <p className="text-slate-600 font-medium text-xs md:text-base leading-relaxed mt-auto">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
