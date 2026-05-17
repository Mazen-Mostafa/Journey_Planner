/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "light-main-color": "#f9e17d",
      "main-color": "#feedae",
      "second-color": "#454545",
      "light-green": "#869a90",
      "dark-green": "#4f6152",
      "blue-color": "#1d3cad",
    },
    screens: {
      xs: "450px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      clg: "1192px",
      xl: "1280px",
      "2xl": "1536px",
    },
    backgroundImage: {
      "signUp-bg": "url('./src/assets/bgs/sign_bg.jpg')",
    },
  },
  plugins: [],
};
