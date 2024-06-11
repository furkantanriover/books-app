const { lightColors, darkColors } = require("./src/theme/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: lightColors.primary,
        secondary: lightColors.secondary,
        accent: lightColors.accent,
        background: lightColors.background,
        text: lightColors.text,
        "primary-dark": darkColors.primary,
        "secondary-dark": darkColors.secondary,
        "accent-dark": darkColors.accent,
        "background-dark": darkColors.background,
        "text-dark": darkColors.text,
      },
    },
  },
  plugins: [],
};
