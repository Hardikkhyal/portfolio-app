"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Code, Sparkles, ShieldCheck } from 'lucide-react';

// Register GSAP ScrollTrigger plugin only on client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface Testimonial {
  name: string;
  role: string;
  message: string;
  image: string;
  verified: boolean;
}

interface WelcomeProps {
  testimonials?: Testimonial[];
}

export default function Welcome({ testimonials = [] }: WelcomeProps) {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const welcomeTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP context scope to handle clean garbage collection on component unmount
    const ctx = gsap.context(() => {
      // Parallax text shift for the welcome screen typography
      gsap.fromTo(welcomeTextRef.current,
        { y: 100 },
        {
          y: -100,
          scrollTrigger: {
            trigger: welcomeRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    }, welcomeRef);

    return () => ctx.revert();
  }, []);

  // Split testimonials for alternating speed/direction row lists
  const midPoint = Math.ceil(testimonials.length / 2);
  const row1Testimonials = [...testimonials.slice(0, midPoint), ...testimonials.slice(0, midPoint), ...testimonials.slice(0, midPoint)];
  const row2Testimonials = [...testimonials.slice(midPoint), ...testimonials.slice(midPoint), ...testimonials.slice(midPoint)];

  return (
    <div
      ref={welcomeRef}
      id="about"
      className="relative min-h-[200vh] w-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white to-zinc-50 select-none noise-overlay text-zinc-900"
    >
      {/* Screen 1: About Me (Light Theme) */}
      <div className="relative min-h-[100vh] w-full flex flex-col justify-center items-center px-6 md:px-12 py-24 z-10">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left Column: Narrative Text */}
          <div ref={welcomeTextRef} className="flex flex-col text-left">
            <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
              About Me
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-zinc-900 mb-8 font-display">
              CREATIVE DEVELOPER & DESIGNER
            </h2>
            <div className="text-zinc-600 text-sm md:text-lg leading-[1.6] space-y-6 font-light">
              <p>
                I am a full-stack engineer and digital creator specializing in building immersive, high-end web applications.
                My workflow is rooted in bridging the gap between raw code and expressive motion design.
              </p>
              <p className="font-semibold text-[#b89324] border-l-2 border-[#d4af37] pl-4 italic text-base md:text-xl">
                My mission is to craft digital interfaces that do not merely function, but evoke a sense of touch, space, and premium quality.
              </p>
              <p>
                By blending robust system architectures with advanced front-end capabilities,
                I ensure that every project is highly responsive, performant, and search-engine optimized.
              </p>
            </div>
          </div>

          {/* Right Column: Stack of 3 feature cards */}
          <div className="flex flex-col gap-6">
            {[
              {
                icon: Code,
                title: "Bespoke Engineering",
                desc: "Coding tailored architectures with Next.js, TypeScript, and modern styling solutions to deliver robust enterprise-grade applications."
              },
              {
                icon: Sparkles,
                title: "Creative Motion Design",
                desc: "Implementing fluid animations using GSAP, Framer Motion, and WebGL canvases to create premium tactile interactions."
              },
              {
                icon: ShieldCheck,
                title: "Performance & Quality",
                desc: "Ensuring near-perfect Lighthouse scores, secure layouts, and responsive cross-browser designs that scale seamlessly."
              }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="flex gap-5 p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1"
                  style={{ borderLeft: "4px solid #d4af37" }}
                >
                  <div className="p-3.5 bg-[#d4af37]/10 rounded-xl flex-shrink-0 h-fit">
                    <Icon className="w-6 h-6 text-[#b89324]" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-zinc-950 font-black text-sm md:text-base uppercase tracking-tight mb-2">
                      {card.title}
                    </h4>
                    <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Screen 2: Testimonials Marquee Section (Light Theme) */}
      <div className="relative h-[100vh] w-full flex flex-col justify-center items-center px-4 md:px-12 py-20 z-10 bg-white border-t border-zinc-200/50">
        <div className="max-w-4xl text-center mb-12">
          <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs md:text-sm mb-2 block">
            {""}
          </span>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-zinc-900 mb-4">
            Client Love
          </h3>
          <p className="text-zinc-500 font-medium text-xs md:text-base max-w-lg mx-auto">
            Explore what clients and designers around the world say about crafting products with Lema.web.
          </p>
        </div>

        {/* Testimonials Infinite Marquees Container */}
        <div className="w-full flex flex-col gap-6 overflow-hidden py-4">

          {/* Row 1: Left-moving Marquee */}
          <div className="relative w-full flex overflow-x-hidden">
            <div className="animate-marquee-left flex gap-6 py-2">
              {row1Testimonials.map((review, idx) => (
                <div
                  key={`row1-${idx}-${review.name}`}
                  className="w-[300px] md:w-[380px] flex-shrink-0 p-6 rounded-2xl bg-white border border-zinc-200/80 hover:border-brand-yellow/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-102 flex flex-col justify-between"
                >
                  <div className="flex gap-1.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-yellow text-brand-yellow border-none" />
                    ))}
                  </div>

                  <p className="text-zinc-700 font-medium text-xs md:text-sm leading-relaxed mb-6 italic">
                    &quot;{review.message}&quot;
                  </p>

                  <div className="flex items-center gap-3.5 border-t border-zinc-100 pt-4">
                    {review.image && (
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full border border-zinc-200 bg-zinc-50 object-cover"
                      />
                    )}
                    <div className="text-left">
                      <h4 className="text-zinc-900 text-xs md:text-sm font-black tracking-tight flex items-center gap-1.5">
                        {review.name}
                        {review.verified && (
                          <span className="text-[9px] bg-brand-yellow/25 text-zinc-800 px-1.5 py-0.5 rounded font-black uppercase tracking-wider scale-90">
                            Verified
                          </span>
                        )}
                      </h4>
                      <p className="text-zinc-400 text-[10px] md:text-xs font-semibold">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right-moving Marquee */}
          <div className="relative w-full flex overflow-x-hidden">
            <div className="animate-marquee-right flex gap-6 py-2">
              {row2Testimonials.map((review, idx) => (
                <div
                  key={`row2-${idx}-${review.name}`}
                  className="w-[300px] md:w-[380px] flex-shrink-0 p-6 rounded-2xl bg-white border border-zinc-200/80 hover:border-brand-yellow/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-102 flex flex-col justify-between"
                >
                  <div className="flex gap-1.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-yellow text-brand-yellow border-none" />
                    ))}
                  </div>

                  <p className="text-zinc-700 font-medium text-xs md:text-sm leading-relaxed mb-6 italic">
                    &quot;{review.message}&quot;
                  </p>

                  <div className="flex items-center gap-3.5 border-t border-zinc-100 pt-4">
                    {review.image && (
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full border border-zinc-200 bg-zinc-50 object-cover"
                      />
                    )}
                    <div className="text-left">
                      <h4 className="text-zinc-900 text-xs md:text-sm font-black tracking-tight flex items-center gap-1.5">
                        {review.name}
                        {review.verified && (
                          <span className="text-[9px] bg-brand-yellow/25 text-zinc-800 px-1.5 py-0.5 rounded font-black uppercase tracking-wider scale-90">
                            Verified
                          </span>
                        )}
                      </h4>
                      <p className="text-zinc-400 text-[10px] md:text-xs font-semibold">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
