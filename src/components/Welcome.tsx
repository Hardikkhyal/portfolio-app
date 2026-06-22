"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import FloatingStars from "./ui/FloatingStars";

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

  // Repeat testimonials list to ensure a seamless infinite scrolling marquee
  const marqueeTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div
      ref={welcomeRef}
      id="about"
      className="relative w-full flex flex-col justify-center items-center overflow-hidden bg-luxury-bg select-none noise-overlay text-white py-12 md:py-16 z-30"
    >
      {/* Floating Stars Background */}
      <FloatingStars />

      {/* Subtle gold mesh accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.01),transparent_70%)] pointer-events-none" />

      {/* Screen 2: Testimonials Marquee Section */}
      <div className="relative w-full flex flex-col justify-center items-center px-4 md:px-12 z-10 bg-transparent">
        <div className="max-w-4xl text-center mb-8">
          <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.25em] mb-2 block">
            testimonials
          </span>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4 font-display">
            Client Love
          </h3>
          <p className="text-white/60 font-medium text-xs md:text-base max-w-lg mx-auto">
            Explore what clients and designers around the world say about crafting products with Hardik.
          </p>
        </div>

        {/* Testimonials Infinite Marquees Container */}
        <div className="w-full flex flex-col gap-6 overflow-hidden py-4">

          {/* Row 1: Left-moving Marquee */}
          <div className="relative w-full flex overflow-x-hidden">
            <div className="animate-marquee-left flex gap-6 py-2">
              {marqueeTestimonials.map((review, idx) => (
                <div
                  key={`marquee-${idx}-${review.name}`}
                  className="w-[300px] md:w-[380px] flex-shrink-0 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-yellow/60 hover:bg-white/[0.04] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-102 flex flex-col justify-between"
                >
                  <div className="flex gap-1.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-yellow text-brand-yellow border-none" />
                    ))}
                  </div>

                  <p className="text-white/80 font-medium text-xs md:text-sm leading-relaxed mb-6 italic">
                    &quot;{review.message}&quot;
                  </p>

                  <div className="flex items-center gap-3.5 border-t border-white/[0.06] pt-4">
                    {review.image && (
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/5 object-cover"
                      />
                    )}
                    <div className="text-left">
                      <h4 className="text-white text-xs md:text-sm font-black tracking-tight flex items-center gap-1.5">
                        {review.name}
                        {review.verified && (
                          <span className="text-[9px] bg-brand-yellow/15 text-brand-yellow px-1.5 py-0.5 rounded font-black uppercase tracking-wider scale-90 border border-brand-yellow/20">
                            Verified
                          </span>
                        )}
                      </h4>
                      <p className="text-white/40 text-[10px] md:text-xs font-semibold">{review.role}</p>
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
