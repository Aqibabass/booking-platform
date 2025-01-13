/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors:{
        primary:'#0d9488',
      },
    },
  },
  plugins: [],
}
