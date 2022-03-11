module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        nft: 'url(/images/background.jpg)',
      },
      fontFamily: {
        sourceCode: ['Source Code Pro', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#181818',
          100: '#cbcfda',
          101: '#a1abca',
          200: '#686f7e',
          201: '#757f9e',
          500: '#3c4448',
          600: '#585c5c',
        },
        secondary: '#2B076E',
        ascent: '#3671E9',
        gray6: '#F2F2F2',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/forms')],
}
