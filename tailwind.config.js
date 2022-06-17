const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Saira', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        // primary: 'rgb(102, 201, 156)',
        // primaryLow: 'rgba(102, 201, 156, 0.25)',
        primary: 'rgb(253, 255, 143)',
        primaryLow: 'rgba(253, 255, 143, 0.25)',
        secondary: 'rgb(55, 156, 111)',
        secondaryLow: 'rgba(55, 156, 111, 0.25)',
        back1: 'rgb(25, 25, 25)',
        back2: '#000000'
      }
    }
  },
  plugins: []
}
