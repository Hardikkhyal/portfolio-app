import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Hardik Khyal | Premium Full-Stack Developer & Designer",
  description: "Welcome to the portfolio of Hardik Khyal, a premium full-stack developer and designer crafting high-performance digital experiences.",
  keywords: ["Hardik Khyal", "portfolio", "full-stack developer", "software engineer", "luxury web design", "Next.js portfolio"],
  authors: [{ name: "Hardik Khyal" }],
  openGraph: {
    title: "Hardik Khyal | Creative Developer Portfolio",
    description: "Bespoke digital experiences, curated for the modern web.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="font-sans antialiased bg-luxury-bg text-white selection:bg-white/10 select-none">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
