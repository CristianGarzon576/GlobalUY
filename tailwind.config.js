/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",
    "./src/Pages/**/*.{js,ts,jsx,tsx,html}",
    "./src/Components/**/*.{js,ts,jsx,tsx,html}"
],
  theme: {
    extend: {
      colors: {
        'blue': '#006EAA',
        'dark-blue': '#1DA2FC',
        'gray' :'#979797',
        'soft-gray': '#D4D4D4',
        'ligth-gray': '#FAFAFF',
        'dark-gray': '#767676',
        'red': '#EA4335',
        'dark-red': '#9A3648'
      },
    },
  },
  plugins: [],
}
