import type { Metadata } from "next";
import { Inter, Outfit, Kanit } from "next/font/google";
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

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
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
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${kanit.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Fleur+De+Leah&family=Lavishly+Yours&family=Limelight&family=Mea+Culpa&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-luxury-bg text-white selection:bg-white/10 select-none">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
