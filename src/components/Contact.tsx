"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, ArrowRight, Sparkles } from "lucide-react";
import FloatingStars from "./ui/FloatingStars";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={`${className} fill-none stroke-current stroke-2`} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedService, setSelectedService] = useState("Web Design");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const services = ["Web Design", "Web Development", "Graphic Design", "Brand Strategy"];

  const marquees = [
    { text: "CREATIVE DEVELOPER // PORTFOLIO // LEMA.WEB // FUTURE INTERFACES // AWWWARDS STYLE // ", dir: "left" },
    { text: "IMMERSIVE EXPERIENCE // WEBGL // GSAP // REACT // SMOOTH SCROLLING // TAILWIND // ", dir: "right" },
    { text: "LEESHARK // INNOVATIVE CODE // MODERN BRANDING // LUXURY DESIGN // ", dir: "left" },
    { text: "AESTHETIC LAYOUTS // SCROLLTRIGGER // LENIS // PHYSICAL ANIMATION // ", dir: "right" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form fields after brief delay
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 select-none z-30 overflow-hidden"
    >
      {/* Floating Stars Background */}
      <FloatingStars />

      {/* Subtle gold mesh accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.015),transparent_70%)] pointer-events-none" />

      {/* BACKGROUND TEXT MARQUEES - LAYERED VISUAL DEPTH */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-between py-12 pointer-events-none z-0">
        {marquees.map((m, idx) => (
          <div key={idx} className="relative w-full flex overflow-hidden select-none">
            {/* Animates text seamlessly using global infinite marquee styling */}
            <div
              className={`flex gap-4 font-black uppercase text-white/[0.015] text-[6.5vw] leading-none tracking-tighter ${m.dir === "left" ? "animate-marquee-left" : "animate-marquee-right"
                }`}
            >
              <span>{m.text}</span>
              <span>{m.text}</span>
              <span>{m.text}</span>
              <span>{m.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-[95%] xl:max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT SIDE: Contact info & Typography */}
          <div className="lg:col-span-5 text-left flex flex-col justify-between h-full">
            <div>
              <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.25em] mb-4 block">
                get in touch
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white font-display mb-6 leading-none">
                Let&apos;s Create <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-luxury-goldHover to-white">
                  Something Real
                </span>
              </h2>
              <p className="text-white/60 text-sm md:text-base font-light leading-relaxed mb-10 max-w-md">
                Have a project in mind, want to discuss a collaboration, or just looking to say hello? Drop a message, and let&apos;s craft an exceptional immersive digital experience.
              </p>
            </div>

            {/* Practical info list */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-2xl text-luxury-gold group-hover:bg-luxury-gold/15 group-hover:border-luxury-gold/30 transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest block">Email me</span>
                  <a
                    href="mailto:hardikkhyal@gmail.com"
                    className="text-white hover:text-luxury-gold transition-colors font-medium text-sm md:text-base font-mono"
                  >
                    hardikkhyal@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-2xl text-luxury-gold group-hover:bg-luxury-gold/15 group-hover:border-luxury-gold/30 transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest block">Based in</span>
                  <span className="text-white font-medium text-sm md:text-base">
                    Punjab, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social profiles */}
            <div>
              <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest mb-4 block">Follow my updates</span>
              <div className="flex gap-4">
                {[
                  { icon: GithubIcon, link: "https://github.com" },
                  { icon: LinkedinIcon, link: "https://linkedin.com" },
                  { icon: InstagramIcon, link: "https://instagram.com" }
                ].map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-full text-white/60 hover:text-luxury-gold hover:border-luxury-gold/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive contact form */}
          <div className="lg:col-span-7 w-full">
            <div className="relative group/form backdrop-blur-xl bg-white/[0.01] border border-white/[0.06] p-8 md:p-12 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              {/* Outer corner glow */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_100%_0%,rgba(212,175,55,0.03),transparent_60%)] pointer-events-none" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="p-5 bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold rounded-full mb-6 relative animate-pulse">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3 font-display">
                    Thank You, Hardik Received!
                  </h3>
                  <p className="text-white/60 text-sm max-w-sm mb-8">
                    Your message was sent successfully. I will review your request and get back to you within 24 hours. Let&apos;s make something amazing.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-white/5 border border-white/10 hover:border-luxury-gold/30 text-white hover:text-luxury-gold rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 text-left">

                  {/* Name and Email side-by-side on desktop */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="relative flex flex-col gap-2">
                      <label className="text-white/40 text-[10px] uppercase font-mono tracking-widest">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-luxury-gold/50 rounded-2xl px-5 py-4 text-white text-sm outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                      />
                    </div>

                    {/* Email input */}
                    <div className="relative flex flex-col gap-2">
                      <label className="text-white/40 text-[10px] uppercase font-mono tracking-widest">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-luxury-gold/50 rounded-2xl px-5 py-4 text-white text-sm outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                      />
                    </div>
                  </div>

                  {/* Service selection pills */}
                  <div className="relative flex flex-col gap-4">
                    <label className="text-white/40 text-[10px] uppercase font-mono tracking-widest">
                      What service are you looking for?
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {services.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => setSelectedService(service)}
                          className={`relative px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-500 cursor-pointer border ${selectedService === service
                              ? "bg-brand-yellow border-brand-yellow text-black font-black shadow-[0_0_20px_rgba(244,196,0,0.25)]"
                              : "bg-white/[0.02] border-white/[0.08] text-white/70 hover:text-white hover:border-white/20"
                            }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="relative flex flex-col gap-2">
                    <label className="text-white/40 text-[10px] uppercase font-mono tracking-widest">
                      Tell me about your project
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Let's build a luxury ecommerce platform with GSAP animations..."
                      className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-luxury-gold/50 rounded-3xl px-5 py-4 text-white text-sm outline-none resize-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full flex items-center justify-center gap-2.5 px-8 py-4 bg-luxury-gold hover:bg-luxury-goldHover disabled:bg-luxury-gold/50 text-zinc-950 font-black uppercase tracking-widest text-xs rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] active:scale-98 transition-all duration-300 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
                    <Send className={`w-3.5 h-3.5 transition-transform duration-300 ${isSubmitting ? "translate-x-1" : "group-hover/form:translate-x-0.5"}`} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
