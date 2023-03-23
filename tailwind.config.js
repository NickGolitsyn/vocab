/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        volkhov: ['var(--font-volkhov)'],
        tinos: ['var(--font-tinos)'],
      }
    },
  },
  plugins: [],
}
