/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts, tsx}', './public/index.html'],
  theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif']
    },
    extend: {
      backgroundColor: {
        main: '#ee3131'
      },
      colors: {
        main: '#ee3131'
      }
    }
  },
  plugins: []
}
