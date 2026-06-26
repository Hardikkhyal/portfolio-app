"use client";

import React from "react";
import Image from "next/image";
import FloatingStars from "./ui/FloatingStars";

export default function Gallery() {
  return (
    <section
      id="projects"
      className="relative w-full pt-[280px] pb-24 select-none z-30 mt-[-200px]"
    >
      {/* Floating Stars Background */}
      <FloatingStars />

      {/* Angel background cutout extending into the Journey section above without being cropped */}
      <div className="absolute right-0 top-[-250px] md:top-[-450px] w-[100%] md:w-[75%] h-[550px] md:h-[850px] max-w-[800px] pointer-events-none z-0 opacity-35 select-none transition-all duration-700">
        <Image
          src="/png elements/angel_no_background.png"
          alt="Angel Background Cutout"
          fill
          className="object-contain object-right-top select-none pointer-events-none"
          priority
        />
      </div>

      {/* Subtle gold mesh accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.01),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-[95%] xl:max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center w-full mb-16">
          <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.25em] mb-3 block">
            creative portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white font-display">
            Selected Works
          </h2>
          <div className="h-[2px] w-16 bg-luxury-gold mx-auto mt-6" />
        </div>
      </div>
    </section>
  );
}
