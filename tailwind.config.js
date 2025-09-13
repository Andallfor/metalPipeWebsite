/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["docs/*.{html,js,txt}", "docs/templates/*.js", "docs/blogs/helloWorld/*.{html,js,txt}"],
  theme: {
    extend: {
      height: {
        'nav': '3rem',
        'nav-2x': '6rem',
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '19': 'repeat(19, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
      },
      colors: {
        'bg-side': '#ab75e0',
        'bg-center': '#d1bee6',

        'footer-main': '#1a131f',

        'main-dark': '#9333ea',
        'main-light': '#d946ef',
        'main-main': '#9333ea',

        'sky-dark': '#0284c7',
        'sky-light': '#38bdf8',
        'sky-main': '#6366f1',

        'red-dark': '#dc2626',
        'red-light': '#f87171',
        'red-main': '#dc2626',

        'emerald-dark': '#059669',
        'emerald-light': '#10b981',
        'emerald-main': '#10b981',
      },
      animation: {
        'pulse-slow': 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%': {'--tw-gradient-via-position': '25%'},
          '50%': {'--tw-gradient-via-position': '75%'},
          '100%': {'--tw-gradient-via-position': '25%'},
        },
      },
      flex: {
        '100': '0 0 100%',
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      screens: {
        'xs': '480px',
        '2xs': '360px',
        '3xs': '240px'
      },
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('is-inview', '&.is-inview')
    })
  ],
}

