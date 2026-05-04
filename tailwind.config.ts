import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "coke-red": "#F40009",
        "coke-red-dark": "#C0000A",
        "coke-red-light": "#FF1A20",
        "coke-black": "#0A0A0A",
        "coke-white": "#F8F4F0",
        "fanta-orange": "#FF6B00",
        "sprite-green": "#00A651",
        "schweppes-gold": "#C9A84C",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "9xl": ["8rem", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "8xl": ["6rem", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "7xl": ["4.5rem", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "128": "32rem",
        "144": "36rem",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "liquid-flow": "liquidFlow 8s ease-in-out infinite",
        "text-shimmer": "textShimmer 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(244, 0, 9, 0.3)" },
          "50%": { boxShadow: "0 0 60px rgba(244, 0, 9, 0.8)" },
        },
        liquidFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        textShimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      backgroundImage: {
        "coke-gradient": "linear-gradient(135deg, #F40009 0%, #8B0000 50%, #0A0A0A 100%)",
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        "radial-red": "radial-gradient(ellipse at center, rgba(244,0,9,0.3) 0%, transparent 70%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in": "cubic-bezier(0.7, 0, 0.84, 0)",
        "circ-out": "cubic-bezier(0, 0.55, 0.45, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
