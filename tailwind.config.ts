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
          DEFAULT: "#ffffff",
          surface: "#f5f5f5",
          elevated: "#eeeeee",
          highlight: "#e5e5e5",
        },
        navy: {
          DEFAULT: "#0f1626",
          soft: "#1a2540",
          muted: "#2d3d5a",
        },
        em: {
          DEFAULT: "#ff3b3f",
          deep: "#e02e32",
          dim: "#ff3b3f1a",
          glow: "#ff3b3f40",
        },
        ink: {
          DEFAULT: "#0f1626",
          muted: "#4a5568",
          faint: "#9aa5b4",
        },
        edge: {
          DEFAULT: "rgba(15,22,38,0.1)",
          strong: "rgba(15,22,38,0.2)",
          bright: "rgba(255,59,63,0.4)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-display)", "sans-serif"],
      },
      backgroundImage: {
        "em-radial":
          "radial-gradient(circle at 50% 50%, #ff3b3f15, transparent 70%)",
        "em-subtle":
          "radial-gradient(circle at 80% 20%, #ff3b3f08, transparent 50%)",
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
        em: "0 0 40px rgba(255,59,63,0.15)",
        "em-lg": "0 0 80px rgba(255,59,63,0.2)",
        "em-sm": "0 0 20px rgba(255,59,63,0.1)",
        card: "0 2px 20px rgba(15,22,38,0.08)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
