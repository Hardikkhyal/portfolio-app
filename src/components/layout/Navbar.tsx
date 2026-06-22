"use client";

import { Phone, Mail, Plane } from "lucide-react";
import Button from "../ui/Button";

export default function Navbar() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Navbar Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent border-b border-white/[0.03] backdrop-blur-[4px] py-5 px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div>
          <a href="#" className="font-display text-lg md:text-xl font-extrabold tracking-widest text-white uppercase group transition-all duration-300">
            hardik khyal <span className="text-luxury-gold transition-colors group-hover:text-white">®</span>
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "About", id: "about" },
            { label: "Projects", id: "projects" },
            { label: "Skills", id: "skills" },
            { label: "Contact", id: "contact" }
          ].map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 font-semibold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Contact Links */}
        <div className="flex items-center gap-6">
          <a
            href="tel:+919876543210"
            className="hidden sm:flex items-center gap-2 text-xs tracking-wider text-white/60 hover:text-luxury-gold transition-colors duration-300 font-medium"
          >
            <Phone className="h-3.5 w-3.5 text-luxury-gold" />
            <span>+91 98765 43210</span>
          </a>
          <a
            href="mailto:hardikkhyal@gmail.com"
            className="flex items-center gap-2 text-xs tracking-wider text-white/60 hover:text-luxury-gold transition-colors duration-300 font-medium"
          >
            <Mail className="h-3.5 w-3.5 text-luxury-gold" />
            <span className="hidden lg:inline">hardikkhyal@gmail.com</span>
          </a>
        </div>
      </header>

      {/* Floating Bottom CTA */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
        <Button
          variant="gold"
          className="shadow-2xl shadow-luxury-gold/15 border border-luxury-gold/20 flex items-center gap-2"
          onClick={scrollToContact}
        >
          <Plane className="h-3.5 w-3.5 fill-black stroke-black group-hover:rotate-45 transition-transform duration-500" />
          <span>Contact Me</span>
        </Button>
      </div>
    </>
  );
}
