/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [],
}

