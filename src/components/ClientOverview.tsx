"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

export default function ClientOverview() {
  return (
    <section id="client-overview" className="relative w-full h-screen z-30 overflow-hidden">
      <img
        src="/images/BLUE.jpg"
        alt="Client Overview Background"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-100"
      />
      {/* Blank section as requested */}
    </section>
  );
}
