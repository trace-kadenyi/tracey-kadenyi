import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#050708",
          surface: "#0f1318",
          elevated: "#161c22",
          highlight: "#1c242c",
        },
        em: {
          DEFAULT: "#00a8ff",
          deep: "#0090e0",
          dim: "#00a8ff1a",
          glow: "#00a8ff40",
        },
        ink: {
          DEFAULT: "#eef2ee",
          muted: "#7a8f7e",
          faint: "#3a4a3e",
        },
        edge: {
          DEFAULT: "rgba(0,168,255,0.12)",
          strong: "rgba(0,168,255,0.25)",
          bright: "rgba(0,168,255,0.45)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-display)", "sans-serif"],
      },
      backgroundImage: {
        "em-radial": "radial-gradient(circle at 50% 50%, #00a8ff15, transparent 70%)",
        "em-subtle": "radial-gradient(circle at 80% 20%, #00a8ff08, transparent 50%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "bar-fill": "barFill 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        barFill: {
          "0%": { width: "0%" },
          "100%": { width: "var(--bar-width)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      boxShadow: {
        em: "0 0 40px rgba(0,168,255,0.15)",
        "em-lg": "0 0 80px rgba(0,168,255,0.2)",
        "em-sm": "0 0 20px rgba(0,168,255,0.1)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;