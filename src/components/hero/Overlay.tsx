"use client";

import { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Refs for mobile GSAP animations
  const titleRef = useRef<HTMLSpanElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dedicated GSAP / ScrollTrigger timeline on mobile for slower, better sequenced pacing
  useEffect(() => {
    if (!isMobile) return;

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const titleUpper = titleRef.current;
    const titleMain = titleMainRef.current;
    const subheading = subheadingRef.current;
    const container = document.querySelector(".relative.h-\\[400vh\\]");

    if (!titleUpper || !titleMain || !subheading || !container) return;

    // Reset initial states for mobile:
    // Logo, main heading ("HARDIKKHYAL"), and top heading are initially shown. Nothing else.
    gsap.set([titleUpper, titleMain], { opacity: 1, scale: 1, y: 0 });
    gsap.set(subheading, { opacity: 0, scale: 0.95, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Slower, smooth pacing
      },
    });

    tl.to(subheading, { opacity: 1, scale: 1, y: 0, duration: 2 }) // Subheading fades in smoothly
      .to(subheading, { duration: 2.5 }) // Keep it visible briefly
      .to(subheading, { opacity: 0, scale: 1.05, y: -20, duration: 2 }) // Subheading fades out
      .to([titleUpper, titleMain], { opacity: 0, duration: 2, ease: "power1.inOut" }); // Fade out title at the very end

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [isMobile]);

  // =========================================================================
  // Desktop Transform Mappings (Kept 100% Intact)
  // =========================================================================
  const titleOpacity = useTransform(scrollYProgress, [0.85, 1.0], [1, 0], { clamp: true });
  const titleScale = useTransform(scrollYProgress, [0.85, 1.0], [1, 1.15], { clamp: true });
  const titleY = useTransform(scrollYProgress, [0.85, 1.0], [0, -30], { clamp: true });

  const subheadingOpacity = useTransform(scrollYProgress, [0.02, 0.10, 0.18, 0.25], [0, 1, 1, 0], { clamp: true });
  const subheadingScale = useTransform(scrollYProgress, [0.02, 0.10, 0.18, 0.25], [0.95, 1, 1, 1.05], { clamp: true });
  const subheadingY = useTransform(scrollYProgress, [0.02, 0.10, 0.18, 0.25], [20, 0, 0, -20], { clamp: true });

  const hintOpacity = useTransform(scrollYProgress, [0, 1], [0, 0], { clamp: true });
  const hintY = useTransform(scrollYProgress, [0, 1], [0, 0], { clamp: true });

  return (
    <div className="absolute inset-0 pointer-events-none z-20 w-full h-full">
      {/* Layer 1: Initial View Hero Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <motion.span
          ref={titleRef}
          style={!mounted || isMobile ? {} : { opacity: titleOpacity, scale: titleScale, y: titleY }}
          className="text-luxury-gold text-xs md:text-sm font-semibold uppercase tracking-widest mb-4"
        >
          F U L L - S T A C K   D E V E L O P E R   &   D E S I G N E R
        </motion.span>

        <motion.h1
          ref={titleMainRef}
          style={!mounted || isMobile ? {} : { opacity: titleOpacity, scale: titleScale, y: titleY }}
          className="heading-premium text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white text-center select-none"
        >
          hardikkhyal
        </motion.h1>

        {/* Subtle grey description text with its own separate animation */}
        <motion.p
          ref={subheadingRef}
          style={!mounted || isMobile ? {} : { opacity: subheadingOpacity, scale: subheadingScale, y: subheadingY }}
          className="text-white/40 text-sm md:text-base max-w-xl text-center mt-6 font-light leading-relaxed select-none"
        >
          Hardik Khyal is a creative developer crafting high-performance, high-end web applications with pixel perfection.
        </motion.p>

        {/* Scroll hint with its own separate animation */}
        <motion.p
          style={{ opacity: hintOpacity, y: hintY }}
          className="text-white/20 text-xs md:text-sm uppercase tracking-widest mt-8 animate-pulse select-none"
        >
          Scroll to explore the journey
        </motion.p>
      </div>
    </div>
  );
}
