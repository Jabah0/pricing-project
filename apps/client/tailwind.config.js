const { fontFamily } = require("tailwindcss/defaultTheme");
const { createThemes } = require("tw-colors");

/**@type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      scrollbar: {
        thin: {
          width: "thin",
          color: "var(--tw-primary)",
          track: "var(--primary)",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--kb-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--kb-accordion-content-height)" },
          to: { height: 0 },
        },
        "content-show": {
          from: { opacity: 0, transform: "scale(0.96)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
        "content-hide": {
          from: { opacity: 1, transform: "scale(1)" },
          to: { opacity: 0, transform: "scale(0.96)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "content-show": "content-show 0.2s ease-out",
        "content-hide": "content-hide 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@corvu/tailwind"),
    createThemes({
      light: {
        primary: "#6365f1",
        secondary: "#3b3d91",
        backPrimary: "#ffffff",
        elementBack: "#ffffff",
        background: "#e6e6e6",
        backgroundSec: "#e6e6e6",
        backgroundForm: "#ffffff",
        inputForm: "#e6e6e6",
        iconStroke: "#6365f1",
        moon: "#FACC15",
        sun: "#FACC15",
        buttonBack: "#e6e6e6",
        text: "#374151",
        textSecondary: "#696b6e",
      },
      dark: {
        primary: "#6365f1",
        secondary: "#3b3d91",
        backPrimary: "#1E293B",
        elementBack: "#1E293B",
        background: "#0F172A",
        backgroundSec: "#292E4E",
        backgroundForm: "#292E4E",
        inputForm: "#1E293B",
        iconStroke: "#6365f1",
        moon: "#FACC15",
        sun: "#FACC15",
        buttonBack: "#334155",
        text: "#ffffff",
        textSecondary: "#d1d5db",
      },
    }),
  ],
};
