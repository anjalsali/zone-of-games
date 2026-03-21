/** @type {import('tailwindcss').Config} */
export default {
   darkMode: "class",
   content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",

      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      container: {
         padding: {
            DEFAULT: "15px",
         },
      },
      screens: {
         sm: "640px",
         md: "768px",
         lg: "960px",
         xl: "1200px",
      },
      extend: {
         colors: {
            primary: "rgb(var(--color-primary) / <alpha-value>)",
            secondary: "rgb(var(--color-secondary) / <alpha-value>)",
            accent: "rgb(var(--color-accent) / <alpha-value>)",
            text: "rgb(var(--color-text) / <alpha-value>)",
            success: "rgb(var(--color-success) / <alpha-value>)",
            info: "rgb(var(--color-info) / <alpha-value>)",
            warn: "rgb(var(--color-warn) / <alpha-value>)",
            error: "rgb(var(--color-error) / <alpha-value>)",
            background: "rgb(var(--color-background) / <alpha-value>)",
            muted: "rgb(var(--color-muted) / <alpha-value>)",
            borderTheme: "rgb(var(--color-border) / <alpha-value>)",
            transparent: "transparent",
            current: "currentColor",
            navItemColor: "rgb(var(--color-navColor) / <alpha-value>)",
         },
         fontFamily: {
            montserrat: [`var(--font-montserrat)`, "sans-serif"],
         },
         boxShadow: {
            glow: "0 0 40px -8px rgb(var(--color-accent) / 0.45)",
            "glow-sm": "0 0 20px -6px rgb(var(--color-accent) / 0.35)",
         },
         keyframes: {
            "zog-fade-up": {
               "0%": { opacity: "0", transform: "translateY(14px)" },
               "100%": { opacity: "1", transform: "translateY(0)" },
            },
            "zog-shimmer": {
               "0%": { backgroundPosition: "200% 0" },
               "100%": { backgroundPosition: "-200% 0" },
            },
         },
         animation: {
            "fade-up": "zog-fade-up 0.55s ease-out both",
            shimmer: "zog-shimmer 2.2s ease-in-out infinite",
         },
      },
   },
   container: {
      padding: {
         DEFAULT: "15px",
      },
   },
   plugins: [require("tailwind-scrollbar")],
};
