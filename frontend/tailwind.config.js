/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "authBg": "url('./assets/plants.jpeg')"
      },
      colors:{
        "dark": "#1e1e1e",
        "graySoft": "#f2f2f2"
      }
    },
  },
  plugins: [],
}