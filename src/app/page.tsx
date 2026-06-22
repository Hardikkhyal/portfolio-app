"use client";

import Navbar from "@/components/layout/Navbar";
import HeroScroll from "@/components/hero/HeroScroll";
import Journey from "@/components/Journey";
import Gallery from "@/components/Gallery";
import Welcome, { Testimonial } from "@/components/Welcome";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const testimonials: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    role: "Director of Design at Veloce",
    message: "Hardik is an absolute wizard. He brought our complex design system to life with flawless interactive scroll animations.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    verified: true
  },
  {
    name: "Alexandre Mercier",
    role: "Founder of Atelier Luxury",
    message: "The attention to detail in Hardik's front-end work is matchless. The custom web canvas scrollytelling he developed elevated our luxury brand.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    verified: true
  },
  {
    name: "Elena Rostova",
    role: "Lead Product Manager at FinTech Labs",
    message: "Working with Hardik was seamless. He coded our dashboard with extreme precision and optimized it for performance.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    verified: true
  },
  {
    name: "Marcus Aurelius",
    role: "Creative Director at Rome Interactive",
    message: "An exceptional developer who understands the intersection of motion design, aesthetics, and high performance.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    verified: true
  }
];

export default function Home() {
  return (
    <main className="relative bg-luxury-bg text-white">
      {/* Fixed Header & Navigation */}
      <Navbar />

      {/*
        Sky Continuity Zone
        ─────────────────────────────────────────────────────────────────
        Both the hero canvas and the Journey section share this wrapper.
        The `background-attachment: fixed` image stays pinned to the
        viewport, so when the hero animation ends the same sky bleeds
        seamlessly into the top of the Journey section — no hard cut.
      */}
      <div>
        {/* Hero Canvas Scrollytelling Section */}
        <HeroScroll />

        {/* Dynamic Scroll Journey (transparent top zone shows sky above) */}
        <Journey />
      </div>

      {/* Gallery Showcase */}
      <Gallery />

      {/* Client Love Testimonials */}
      <Welcome testimonials={testimonials} />

      {/* Contact Section */}
      <Contact />

      {/* Interactive Footer */}
      <Footer />
    </main>
  );
}
