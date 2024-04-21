/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,css}', './public/index.html'],
  theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif']
    },
    extend: {
      colors: {
        primary: {
          400: '#ee3131',
          600: '#941212'
        },
        secondary: {
          200: '#976ff3',
          400: '#885CEE'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
