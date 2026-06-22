"use client";

import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
  isGold: boolean;
}

export default function FloatingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate stars only on client side to prevent SSR hydration mismatches
    const generatedStars: Star[] = Array.from({ length: 45 }).map((_, i) => {
      const size = Math.random() * 2 + 1; // 1px to 3px
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const delay = `${Math.random() * -30}s`; // Start immediately at different phases
      const duration = `${Math.random() * 20 + 20}s`; // Slow, elegant float speeds (20s to 40s)
      const opacity = Math.random() * 0.5 + 0.15; // Soft opacities
      const isGold = Math.random() < 0.25; // 25% of stars are gold accents

      return {
        id: i,
        left,
        top,
        size,
        delay,
        duration,
        opacity,
        isGold,
      };
    });
    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-drift-up"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: star.delay,
            animationDuration: star.duration,
            backgroundColor: star.isGold ? "#d4af37" : "#ffffff",
            boxShadow: star.isGold
              ? "0 0 6px #d4af37"
              : "0 0 4px rgba(255, 255, 255, 0.8)",
          }}
        />
      ))}
    </div>
  );
}
