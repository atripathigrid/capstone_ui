import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import containerQueries from "@tailwindcss/container-queries";

// Color tokens ported 1:1 from the original index.html tailwind.config so the
// visual design is preserved exactly.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-error": "#410002",
        "on-primary": "#112b00",
        "on-surface-variant": "#8e989e",
        background: "#0d0f10",
        surface: "#141819",
        error: "#f28b82",
        "on-secondary": "#003732",
        "on-primary-container": "#bceb9c",
        "on-surface": "#ffffff",
        "surface-container-highest": "#272b2c",
        "surface-container": "#171b1c",
        tertiary: "#ffb870",
        warning: "#fdd663",
        "surface-bright": "#222627",
        "surface-container-low": "#111415",
        secondary: "#5ce0d0",
        primary: "#a8d08d",
        "surface-container-high": "#1c2021",
        "secondary-container": "#005049",
      },
      fontFamily: {
        sans: ["'Hanken Grotesk'", "sans-serif"],
        geist: ["'Geist'", "sans-serif"],
      },
    },
  },
  plugins: [forms, containerQueries],
} satisfies Config;
