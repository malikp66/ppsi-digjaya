import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/styles/**/*.{css,ts}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "var(--color-surface)",
        ink: "var(--color-ink)",
        heritage: "var(--color-heritage)",
        prestige: "var(--color-prestige)",
        forest: "var(--color-forest)",
        accent: "var(--color-accent)",
        muted: "var(--color-muted)",
        border: "var(--border)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        inset: "var(--shadow-inset)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        display: "var(--font-display)",
      },
      spacing: {
        2: "var(--spacing-2)",
        4: "var(--spacing-4)",
        6: "var(--spacing-6)",
        8: "var(--spacing-8)",
        12: "var(--spacing-12)",
        16: "var(--spacing-16)",
        24: "var(--spacing-24)",
        32: "var(--spacing-32)",
        48: "var(--spacing-48)",
        64: "var(--spacing-64)",
      },
      zIndex: {
        header: "var(--z-header)",
        overlay: "var(--z-overlay)",
        toast: "var(--z-toast)",
      },
    },
  },
};

export default config;
