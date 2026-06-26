"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import FloatingStars from "./ui/FloatingStars";
import FeaturedCards from "./FeaturedCards";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Gallery() {
  const planeRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const plane = planeRef.current;
    const cards = cardsWrapperRef.current;
    const header = headerRef.current;
    const section = sectionRef.current;
    if (!plane || !section || !cards || !header) return;

    // Plane: straight vertical scroll-scrub, below → above viewport
    gsap.set(plane, { y: "120vh", x: 0, rotate: 0, scale: 1, force3D: true });
    // Cards: start at same offset (120vh), stop translating at 0vh
    gsap.set(cards, { y: "120vh", force3D: true });

    const planeTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Translate plane from 120vh to -130vh (total 250vh)
    planeTl.fromTo(
      plane,
      { y: "120vh" },
      { y: "-130vh", ease: "none", duration: 1 },
      0
    );

    // Translate cards from 120vh to 0vh (total 120vh).
    // duration is 120/250 = 0.48 so they move in perfect sync and then stop/stick.
    planeTl.fromTo(
      cards,
      { y: "120vh" },
      { y: "0vh", ease: "none", duration: 0.48 },
      0
    );

    // Fade out header when plane crosses it (between 0.35 and 0.55 progress)
    planeTl.fromTo(
      header,
      { opacity: 1 },
      { opacity: 0, ease: "power1.inOut", duration: 0.2 },
      0.35
    );

    return () => {
      planeTl.scrollTrigger?.kill();
      planeTl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full pt-[400px] md:pt-[480px] pb-8 select-none z-30"
    >
      <FloatingStars />

      {/* Subtle gold mesh accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.01),transparent_70%)] pointer-events-none" />

      {/* HEADING — CSS sticky: locks just below the fixed navbar */}
      <div ref={headerRef} className="sticky top-[72px] z-10 py-6 text-center">
        <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.25em] mb-3 block">
          creative portfolio
        </span>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white font-display">
          Selected Works
        </h2>
        <div className="h-[2px] w-16 bg-luxury-gold mx-auto mt-6" />
      </div>

      {/* PLANE — z-20, renders on top of the heading */}
      <div className="relative z-20 w-full max-w-[95%] xl:max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col justify-center items-center w-full mt-4 mb-0 pointer-events-none select-none">
          {/* Plane image wrapper */}
          <div ref={planeRef} style={{ willChange: "transform" }} className="flex flex-col items-center">
            <Image
              src="/images/69834ca922d650666343a7a4_img_jet.webp"
              alt="Jet Plane"
              width={1800}
              height={900}
              className="object-contain w-[800px] md:w-[1300px] lg:w-[1700px] h-auto mb-6"
              priority
            />
          </div>
        </div>
      </div>

      {/* CARDS — Outer Sticky Wrapper (CSS sticky) — Direct child of section for proper boundary height */}
      <div className="relative z-30 w-full max-w-[95%] xl:max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 pointer-events-auto sticky top-[190px] md:top-[220px] -mt-8 md:-mt-16 mb-8">
        {/* Inner Animated Container (GSAP animated) */}
        <div ref={cardsWrapperRef} style={{ willChange: "transform" }} className="w-full">
          <FeaturedCards />
        </div>
      </div>
    </section>
  );
}
