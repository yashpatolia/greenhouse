/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7cfc7',
          300: '#a3b0a3',
          400: '#7d8f7d',
          500: '#627462',
          600: '#4d5d4d',
          700: '#3f4b3f',
          800: '#353d35',
          900: '#2e342e',
        },
        earth: {
          50: '#f9f7f4',
          100: '#f0ebe3',
          200: '#e1d6c7',
          300: '#cdb9a3',
          400: '#b69a7d',
          500: '#a17f61',
          600: '#8d6c53',
          700: '#735644',
          800: '#5f483a',
          900: '#4e3c30',
        },
      },
    },
  },
  plugins: [],
}
