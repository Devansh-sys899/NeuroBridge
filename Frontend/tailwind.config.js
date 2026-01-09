/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      bg: "#12161D",
      surface: "#171C24",
      border: "#242B38",

      primary: "#4F7FFF",
      primarySoft: "#1A2540",

      textMain: "#DCE1EA",
      textSub: "#C9D1E1",
      textMuted: "#8B93A7",
    }
  }
},
  plugins: [],
}

