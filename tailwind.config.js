/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'customGrey': '#4B4D61',
      'customWhite': '#EDEEEB',
      'fff': '#FFFFFF',
      'redError': '#F34545'
    },
    extend: {
      fontFamily: {
        volkhov: ['var(--font-volkhov)'],
        tinos: ['var(--font-tinos)'],
      }
    },
  },
  plugins: [],
}
