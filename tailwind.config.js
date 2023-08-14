/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/*.{html,js,txt}"],
  theme: {
    extend: {
      backgroundImage: {
        'home-1': "url('../src/mainBgPics/1.jpg')"
      },
    },
  },
  plugins: [],
}

