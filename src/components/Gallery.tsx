"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, Monitor, Image as ImageIcon, Plus } from "lucide-react";
import FloatingStars from "./ui/FloatingStars";

interface GalleryItem {
  id: number;
  title: string;
  category: "Pen Artworks" | "Web Design" | "Graphic Design";
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Pen Artworks", "Web Design", "Graphic Design"];

  const items: GalleryItem[] = [
    {
      id: 1,
      title: "Ethereal Commerce",
      category: "Web Design",
      description: "A premium headless e-commerce experience for a luxury apparel brand, optimized for performance, interactive animations, and responsive touch layout.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
      icon: Monitor,
    },
    {
      id: 2,
      title: "The Grid of Silence",
      category: "Pen Artworks",
      description: "Intricate black ink line-art exploring geometry and silence. Hand-drawn with precision micro-pens on raw cotton paper.",
      image: "/sketches/SK-A-348.jpg",
      icon: PenTool,
    },
    {
      id: 3,
      title: "Vortex Dashboard",
      category: "Web Design",
      description: "Interactive data visualization dashboard with dark glassmorphism styling, live web socket charting, and customized GSAP motion templates.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80",
      icon: Monitor,
    },
    {
      id: 4,
      title: "Intricate Textures",
      category: "Pen Artworks",
      description: "Detailed hand-drawn sketch exploring fine details and textures, created with precision micro-pens.",
      image: "/sketches/SK-C-109.jpg",
      icon: PenTool,
    },
    {
      id: 5,
      title: "Vesper Identity",
      category: "Graphic Design",
      description: "Complete visual identity system for a luxury architectural studio, including custom typography assets, business suites, and digital guidelines.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
      icon: ImageIcon,
    },
    {
      id: 6,
      title: "Organic Flow",
      category: "Pen Artworks",
      description: "Fluid ink patterns investigating natural currents, contours, and waves. Created using fine point technical ink pens.",
      image: "/sketches/SK-C-165.jpg",
      icon: PenTool,
    },
  ];

  const filteredItems = activeFilter === "All"
    ? items
    : items.filter(item => item.category === activeFilter);

  // Dynamic Bento Grid classes based on active filter to keep grid balanced when filtered
  const getBentoClasses = (id: number, filter: string) => {
    if (filter !== "All") {
      return "col-span-1 h-[350px] md:h-[450px]";
    }
    switch (id) {
      case 1:
        return "md:col-span-2 md:row-span-1 h-[350px] md:h-[450px]";
      case 2:
        return "md:col-span-1 md:row-span-2 h-[720px] md:h-auto"; // Stretch dynamically on row-span
      case 3:
        return "md:col-span-1 md:row-span-1 h-[350px] md:h-[450px]";
      case 4:
        return "md:col-span-1 md:row-span-1 h-[350px] md:h-[450px]";
      case 5:
        return "md:col-span-2 md:row-span-1 h-[350px] md:h-[450px]";
      case 6:
        return "md:col-span-1 md:row-span-1 h-[350px] md:h-[450px]";
      default:
        return "md:col-span-1 md:row-span-1 h-[350px] md:h-[450px]";
    }
  };

  // Dynamic tab width helper for category cutout badge
  const getTabWidth = (category: string) => {
    switch (category) {
      case "Pen Artworks":
        return 125;
      case "Web Design":
        return 115;
      case "Graphic Design":
        return 135;
      default:
        return 120;
    }
  };

  return (
    <section id="projects" className="relative w-full py-24 bg-luxury-bg select-none z-30">
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

        {/* Categories Filtering Controls with Sliding Pill Capsule */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-16 max-w-2xl mx-auto bg-white/[0.02] border border-white/[0.06] p-1.5 rounded-full w-fit backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-500 cursor-pointer ${
                activeFilter === cat ? "text-black font-black" : "text-white/80 hover:text-white"
              }`}
            >
              {activeFilter === cat && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-brand-yellow rounded-full z-0 shadow-[0_0_20px_rgba(244,196,0,0.3)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Bento Grid layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const CategoryIcon = item.icon;
              const tabWidth = getTabWidth(item.category);

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 30 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`group relative overflow-hidden rounded-[2rem] bg-white/[0.01] border border-white/[0.06] hover:border-luxury-gold/30 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between ${getBentoClasses(
                    item.id,
                    activeFilter
                  )}`}
                >
                  {/* Gallery Image */}
                  <div className="absolute inset-0 w-full h-full z-0 overflow-hidden rounded-[2rem]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.75] group-hover:brightness-100"
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    />
                    {/* Shadow overlay at the bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/30 opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                  </div>

                  {/* Inverted Border Radius Tab (Cutout in the top-left corner) */}
                  <div
                    className="absolute top-0 left-0 h-[36px] bg-luxury-bg rounded-br-2xl z-10 pointer-events-none"
                    style={{ width: `${tabWidth}px` }}
                  >
                    {/* Inverted corner right */}
                    <div
                      className="absolute top-0 w-4 h-4 bg-transparent pointer-events-none"
                      style={{
                        left: `${tabWidth}px`,
                        borderTopLeftRadius: "16px",
                        boxShadow: "-8px -8px 0 0 #050505",
                      }}
                    />
                    {/* Inverted corner bottom */}
                    <div
                      className="absolute left-0 top-[36px] w-4 h-4 bg-transparent pointer-events-none"
                      style={{
                        borderTopLeftRadius: "16px",
                        boxShadow: "-8px -8px 0 0 #050505",
                      }}
                    />
                    {/* Content inside the cutout (Category Label) */}
                    <div className="flex items-center gap-1.5 px-4 h-full text-luxury-gold select-none">
                      <CategoryIcon className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-black uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Bottom content: Metadata (Slides up slightly on hover) */}
                  <div className="relative z-10 p-6 md:p-8 w-full mt-auto text-left transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-luxury-gold text-[10px] font-bold uppercase tracking-widest mb-1.5 block">
                      {item.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2.5 font-display">
                      {item.title}
                    </h3>

                    {/* Description - Fades in on hover */}
                    <p className="text-white/0 text-xs font-light leading-relaxed mb-4 group-hover:text-white/90 transition-colors duration-500 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Interactive overlay link */}
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 group-hover:text-luxury-gold transition-all duration-500 cursor-pointer">
                      <span>View Project</span>
                      <Plus className="w-3.5 h-3.5 transform group-hover:rotate-90 transition-transform duration-500" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
