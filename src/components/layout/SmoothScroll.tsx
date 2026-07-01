"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<import("@studio-freight/lenis").default | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let lenisInstance: any;
    let rafCallback: (time: number) => void;

    Promise.all([
      import("gsap/ScrollTrigger"),
      import("@studio-freight/lenis")
    ]).then(([ { ScrollTrigger }, { default: Lenis } ]) => {
      
      gsap.registerPlugin(ScrollTrigger);

      lenisInstance = new Lenis({
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisRef.current = lenisInstance;

      lenisInstance.on('scroll', ScrollTrigger.update);

      rafCallback = (time: number) => {
        lenisInstance.raf(time * 1000);
      };

      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      if (rafCallback) {
        gsap.ticker.remove(rafCallback);
      }
    };
  }, []);

  return <>{children}</>;
}
