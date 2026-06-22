"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// =========================================================================
// Reusable FadeIn Component (using motion.create() as specified)
// =========================================================================
interface FadeInProps {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: string;
  children?: React.ReactNode;
}

export function FadeIn({
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
  as = "div",
  children,
}: FadeInProps) {
  // Uses motion.create() to make any HTML element animatable
  const Component = useMemo(() => {
    return typeof (motion as any).create === "function"
      ? (motion as any).create(as)
      : (motion as any)[as] || motion.div;
  }, [as]);

  const variants = {
    hidden: { opacity: 0, x, y },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1], // cubic bezier easing
      }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}

// =========================================================================
// Child component for per-character scroll reveal
// =========================================================================
interface CharProps {
  char: string;
  index: number;
  totalChars: number;
  scrollYProgress: MotionValue<number>;
}

function Char({ char, index, totalChars, scrollYProgress }: CharProps) {
  const charProgress = index / totalChars;
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);

  // Maps scroll progress from [start, end] to opacity [0.2, 1]
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block select-none">
      {/* Invisible duplicate holds the space */}
      <span className="opacity-0">{char === " " ? "\u00A0" : char}</span>
      {/* Visible character absolutely positioned on top */}
      <motion.span style={{ opacity }} className="absolute top-0 left-0">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
}

// =========================================================================
// Main AboutMe Component
// =========================================================================
export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking on the section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const paragraphText =
    "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

  const characters = useMemo(() => Array.from(paragraphText), [paragraphText]);

  return (
    <section
      ref={containerRef}
      id="about-me"
      className="relative min-h-[50vh] md:min-h-[60vh] w-full flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-16 md:py-24 overflow-hidden bg-transparent"
      style={{ fontFamily: "'Kanit', sans-serif" }}
    >
      {/* Center Content Container */}
      <div className="relative z-10 max-w-[90%] md:max-w-[85%] w-full flex flex-col items-center justify-center gap-16 sm:gap-20 md:gap-24 text-center">
        
        {/* Group 1: Heading + Animated Text */}
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 w-full">
          
          {/* Animated reveal paragraph */}
          <p
            className="limelight-regular text-[#D7E2EA] font-medium text-center leading-relaxed max-w-none w-full"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontFamily: '"Limelight", sans-serif',
            }}
          >
            {characters.map((char, index) => (
              <Char
                key={index}
                char={char}
                index={index}
                totalChars={characters.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
