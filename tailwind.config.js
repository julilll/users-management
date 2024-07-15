/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    fontFamily: {
      sans: ['"Helvetica Neue"', 'sans-serif']
    },
    extend: {
      colors: {
        'app-bluish': '#0E4F6E',
        'app-blue': '#007AF9',
        'app-font-color': '#797979',
        'app-grey-bg': '#F2F6F9',
        'app-modal-bg': '#F8F8F8',
        'app-grey-basic': '#749AAC',
        'app-success' : '#2BAE6D',
        'app-danger' : '#FF3131'
      }
    },
  },
  plugins: [],
}

