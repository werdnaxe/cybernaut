// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          background: '#041F4A',
          blue: '#38BDF8',
          softBlue: '#60A5FA',
          pink: '#F472B6',
          green: '#4ADE80',
          orange: '#FBBF24',
          dark: '#1E3A8A',
          bubble: '#BFDBFE',
          'custom-blue': '#537FB2',
        },
      },
      fontFamily: {
        // fredoka: ['Fredoka', 'sans-serif'],
        zing: ['zing', 'sans-serif'],
      },
    },
  },
  // variants: {},
  plugins: [],
}