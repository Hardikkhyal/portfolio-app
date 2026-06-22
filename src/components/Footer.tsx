"use client";

import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  // Utility for smooth scrolling directly to section elements via ID references
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Stacked marquee texts to overlay in the footer background (layered look)
  const marquees = [
    { text: "CREATIVE DEVELOPER // PORTFOLIO // LEMA.WEB // FUTURE INTERFACES // AWWWARDS STYLE // ", dir: "left" },
    { text: "IMMERSIVE EXPERIENCE // WEBGL // GSAP // REACT // SMOOTH SCROLLING // TAILWIND // ", dir: "right" },
    { text: "LEESHARK // INNOVATIVE CODE // MODERN BRANDING // LUXURY DESIGN // ", dir: "left" },
    { text: "AESTHETIC LAYOUTS // SCROLLTRIGGER // LENIS // PHYSICAL ANIMATION // ", dir: "right" }
  ];

  return (
    <footer
      className="relative w-full bg-[#f4c400] text-zinc-950 py-12 md:py-16 px-6 md:px-12 lg:px-24 overflow-hidden z-30 select-none flex flex-col items-center"
    >
      {/* BACKGROUND TEXT MARQUEES - LAYERED VISUAL DEPTH */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-between py-4 pointer-events-none z-0">
        {marquees.map((m, idx) => (
          <div key={idx} className="relative w-full flex overflow-hidden select-none">
            {/* Animates text seamlessly using global infinite marquee styling */}
            <div
              className={`flex gap-4 font-black uppercase text-zinc-950/[0.045] text-[6.5vw] leading-none tracking-tighter ${m.dir === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
                }`}
            >
              <span>{m.text}</span>
              <span>{m.text}</span>
              <span>{m.text}</span>
              <span>{m.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="w-full max-w-5xl flex flex-col items-center z-10 relative text-center">

        {/* Floating Profile Image Placeholder (leaving hero image blank/logo placeholder as requested) */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-zinc-950 bg-zinc-950 shadow-xl group cursor-pointer mb-4 flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center bg-zinc-950 text-white font-display text-2xl font-extrabold tracking-tighter">
            <span>L</span>
            <span className="text-brand-yellow">.</span>
          </div>
        </div>


        {/* Luxury Branding */}
        <div className="mb-8">
          <div className="flex justify-center items-center gap-1 cursor-pointer font-black text-2xl tracking-tighter mb-1" onClick={() => handleScrollTo('home')}>
            <span className="text-zinc-950">HARDIK</span>
            <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]">KHYAL</span>
          </div>
          <p className="text-xs font-black tracking-[0.25em] text-zinc-900/80 uppercase">
            Future Interfaces // Immersive Experiences
          </p>
        </div>


        {/* Divider */}
        <div className="w-full h-[1px] bg-zinc-950/15 rounded-full mb-6" />

        {/* Copyright & Legal */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-black text-zinc-900/60 uppercase tracking-widest">
          <div className="flex items-center gap-1.5 justify-center md:justify-start">
            <span>&copy; {new Date().getFullYear()} khyalhardik ALL RIGHTS RESERVED.</span>
            <Heart className="w-3 h-3 text-red-600 fill-current" />
            <span>BY HARDIIKKHYAL</span>
          </div>

          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-zinc-950 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-zinc-950 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
