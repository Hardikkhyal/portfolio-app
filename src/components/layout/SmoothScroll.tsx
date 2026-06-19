"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxury, weighted easing curve
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9, // Slightly damped for a more weighted scroll
      }}
    >
      {children}
    </ReactLenis>
  );
}
