/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,css,sass,css}", "./src/**/**/*.{vue,js,ts,jsx,tsx,css,sass,css}"],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      custom: "1440px",
      "2xl": "1536px",
      "3xl": "1800px",
    },
    extend: {
      colors: {
        smoke: "#F1F1F3",
        gold: "#FFA445",
        primary: "#002e69",
        danger: "#D52C55",
        whiteBlue: "#AECBF4",
        primaryBlue: "#4F87D3",
        blue100: "#E7F0FE",
      },
    },
  },
  plugins: [],
}
