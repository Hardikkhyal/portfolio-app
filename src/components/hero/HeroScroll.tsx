"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import Overlay from "./Overlay";
import "./HeroScroll.css";

const TOTAL_FRAMES = 90;
const SEQUENCE_PATH = "/sequence-1";

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(0);

  const [sequencePath, setSequencePath] = useState(SEQUENCE_PATH);

  // Monitor viewport size to select responsive sequence path
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      setSequencePath(isMobile ? "/phonee" : SEQUENCE_PATH);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Preload sequence images from public folder
  const { images, isLoaded, progress } = useImagePreloader(
    sequencePath,
    TOTAL_FRAMES,
    "ezgif-frame-",
    "jpg",
    3
  );

  // Monitor scroll progress on the parent container (400vh track)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress [0, 0.75] to frame index [0, 89] and clamp it
  const frameIndex = useTransform(scrollYProgress, [0, 0.75], [0, TOTAL_FRAMES - 1], { clamp: true });

  // Object-fit: cover drawing implementation for canvas
  const drawImageCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number,
    offsetX = 0.5,
    offsetY = 0.5
  ) => {
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    const r = Math.min(w / iw, h / ih);
    let nw = iw * r;
    let nh = ih * r;
    let cx = 0, cy = 0, cw = iw, ch = ih;

    if (nw < w) {
      const r2 = w / nw;
      nw = w;
      nh = nh * r2;
    }
    if (nh < h) {
      const r3 = h / nh;
      nh = h;
      nw = nw * r3;
    }

    cw = iw * (w / nw);
    ch = ih * (h / nh);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
  };

  // Rendering frame callback
  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || images.length === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = images[index];
      if (!img) return;

      currentFrameRef.current = index;

      // Draw image cover-cropped
      drawImageCover(ctx, img, 0, 0, canvas.width, canvas.height);
    },
    [images]
  );

  // Resize listener
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, images, renderFrame]);

  // Sync scroll motion value updates using requestAnimationFrame
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!isLoaded) return;
    const targetIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(latest)));

    // Draw on animation frame to lock onto monitor refresh rates (60fps+)
    requestAnimationFrame(() => {
      renderFrame(targetIndex);
    });
  });

  // Draw current frame immediately when assets load
  useEffect(() => {
    if (isLoaded && images.length > 0) {
      const currentIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(frameIndex.get())));
      renderFrame(currentIndex);
    }
  }, [isLoaded, images, renderFrame, frameIndex]);

  return (
    <>
      {/* Cinematic departure preloading screen */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-[#050505] z-50 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center max-w-[280px] w-full px-4 text-center">
            <span className="text-luxury-gold text-xs font-semibold uppercase tracking-widest mb-2 select-none">
              hardik khyal
            </span>
            <h3 className="text-white text-lg font-display font-light mb-8 select-none">
              Initializing Portfolio...
            </h3>
            {/* Loading Bar Track */}
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden mb-3">
              <div
                className="h-full bg-luxury-gold transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-white/30 text-[10px] tracking-widest font-mono select-none">
              {progress}% LOADED
            </span>
          </div>
        </div>
      )}

      {/* Main scroll height container track */}
      <div ref={containerRef} className="relative h-[400vh] bg-luxury-bg">
        {/* Sticky viewport content wrapper */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          {/* Main Canvas drawing sequence */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full object-cover block will-change-transform z-10 hero-canvas"
          />

          {/* Typography overlays */}
          {isLoaded && <Overlay scrollYProgress={scrollYProgress} />}

          {/* Subtle gradient vignette to overlay the canvas and enhance text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/0 to-[#050505] pointer-events-none z-15" />
        </div>
      </div>
    </>
  );
}
