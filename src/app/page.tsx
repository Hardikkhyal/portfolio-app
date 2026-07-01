"use client";

import Navbar from "@/components/layout/Navbar";
import HeroScroll from "@/components/hero/HeroScroll";
import Journey from "@/components/Journey";
import Experiment from "@/components/Experiment";

import ClientOverview from "@/components/ClientOverview";

export default function Home() {
  return (
    <main className="relative bg-luxury-bg text-white">
      {/* Fixed Header & Navigation */}
      <Navbar />

      <div>
        <HeroScroll />
        <Journey />
      </div>

      <Experiment />
      <ClientOverview />
    </main>
  );
}
