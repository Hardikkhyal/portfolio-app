import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-kanit)", "var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
        kanit: ["var(--font-kanit)", "sans-serif"],
      },
      colors: {
        brand: {
          yellow: "#f4c400",
        },
        luxury: {
          bg: "#050505",
          gold: "#d4af37", // metallic gold hue
          goldHover: "#f3e5ab", // lighter champagne gold
          gray: "#8e8e93",
          border: "rgba(255, 255, 255, 0.08)",
          glass: "rgba(5, 5, 5, 0.6)",
        },
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'widest': '0.15em',
      },
    },
  },
  plugins: [],
};
export default config;
