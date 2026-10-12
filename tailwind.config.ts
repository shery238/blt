import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: token("ink"), deep: token("ink-deep") },
        paper: token("paper"),
        mist: token("mist"),
        signal: { DEFAULT: token("signal"), bright: token("signal-bright") },
        pulse: token("pulse"),
        slate: token("slate"),
      },
      fontFamily: {
        display: ["'Bricolage Grotesque Variable'", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["'Hanken Grotesk Variable'", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      maxWidth: { prose: "68ch", site: "84rem" },
      borderRadius: { panel: "1.75rem" },
    },
  },
  plugins: [],
} satisfies Config;
