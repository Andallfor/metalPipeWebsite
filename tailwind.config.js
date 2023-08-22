/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["src/*.{html,js,txt}"],
  theme: {
    extend: {
      backgroundImage: {
        'home-1': "url('../src/mainBgPics/1.jpg')"
      },
      height: {
        'nav': '3rem'
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-19': 'span 19 / span 19',
      },
      colors: {
        'bg-side': '#ab75e0',
        'bg-center': '#d1bee6',
        'footer-main': '#1a131f',
      },
      animation: {
        'pulse-slow': 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('is-inview', '&.is-inview')
    })
  ],
}

