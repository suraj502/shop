module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003228',
        secondary: '#585F64',
      },
      fontFamily: {
        headline: ['"Noto Serif"', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
