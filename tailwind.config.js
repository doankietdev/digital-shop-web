const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,css}', './public/index.html'],
  theme: {
    listStyleType: {
      square: 'square'
    },
    fontFamily: {
      main: ['Poppins', 'sans-serif']
    },
    extend: {
      colors: {
        primary: {
          200: '#40b5ff',
          400: '#349FE2',
          600: '#941212'
        },
        secondary: {
          200: '#4F89FC',
          400: '#00193B',
          600: '#031123'
        },
        success: {
          200: '#01d7b7',
          400: '#00BA9D'
        }
      },
      boxShadow: {
        card: '0px 4px 16px rgb(43 52 69 / 10%)',
        'card-md': '0px 4px 24px rgb(43 52 69 / 16%)'
      },
      animation: {
        slideDown: 'slideDown .3s ease-in-out',
        fadeIn: 'fadeIn .3s ease-in-out'
      },
      keyframes: {
        slideDown: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-100%)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        fadeIn: {
          '0%': {
            opacity: 0
          },
          '100%': {
            opacity: 100
          }
        }
      }
    },
    screens: {
      xs: '375px',
      ...defaultTheme.screens
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
