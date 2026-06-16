import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F7F4EF",
        ink: "#1B2430",
        forest: "#3C5A4B",
        night: "#0E1B2A",
        gold: "#C9A86A",
      },
      fontFamily: {
        sans: ["var(--font-mulish)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
        script: ["var(--font-petit-formal)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
