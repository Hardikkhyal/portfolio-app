"use client";

import React from "react";
import { Code2, Server, Sparkles, Cpu, Database, Layout, Workflow, Layers } from "lucide-react";
import { motion } from "framer-motion";

interface SkillCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tags: string[];
}

function SkillCard({ icon: Icon, title, description, tags, index }: SkillCardProps & { index: number }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as any,
        delay: index * 0.15,
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="group relative backdrop-blur-xl bg-white/[0.02] border border-white/[0.06] hover:border-luxury-gold/30 hover:bg-white/[0.04] p-8 rounded-3xl transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-2 select-none text-left flex flex-col justify-between h-full"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.06),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div>
        {/* Icon & Title */}
        <div className="flex items-center gap-4 mb-5">
          <div className="p-3.5 bg-white/[0.03] rounded-2xl border border-white/[0.05] group-hover:bg-luxury-gold/15 group-hover:border-luxury-gold/30 group-hover:scale-110 transition-all duration-300">
            <Icon className="w-6 h-6 text-luxury-gold" />
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white leading-tight uppercase tracking-tight font-display">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-white/75 text-sm md:text-base leading-relaxed font-light mb-6">
          {description}
        </p>
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] bg-white/5 border border-white/[0.05] text-white/80 px-2.5 py-1 rounded-full uppercase font-bold tracking-wider group-hover:border-luxury-gold/25 group-hover:text-luxury-gold transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const coreSkills = [
    {
      icon: Code2,
      title: "Frontend Architecture",
      description: "Crafting modern, immersive user interfaces with extreme responsiveness, component-driven clean code, and search-engine optimized structural layouts.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML5 & CSS3"],
    },
    {
      icon: Server,
      title: "Backend & Systems",
      description: "Designing robust, secure, and performant backend services, server-side APIs, database schemas, and caching layers to support heavy client operations.",
      tags: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "REST & GraphQL"],
    },
    {
      icon: Sparkles,
      title: "Creative Motion",
      description: "Elevating visual aesthetics and user delight using scroll-driven canvas sequencing, physical scrolling engines, web GL integration, and advanced GSAP timelines.",
      tags: ["GSAP", "Framer Motion", "Lenis Scroll", "HTML5 Canvas", "WebGL"],
    },
  ];

  return (
    <section id="skills" className="relative w-full py-12 md:py-16 select-none z-30">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.01),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center w-full mb-10">
          <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.25em] mb-3 block">
            capabilities & stack
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white font-display">
            Skills & Expertise
          </h2>
          <div className="h-[2px] w-16 bg-luxury-gold mx-auto mt-6" />
        </div>

        {/* Core Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreSkills.map((skill, index) => (
            <SkillCard
              key={index}
              index={index}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
              tags={skill.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
