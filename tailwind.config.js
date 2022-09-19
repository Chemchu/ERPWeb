module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', '"Public Sans"', 'sans-serif', 'system-ui'],
        mono: ['monospace', 'SFMono-Regular'],
      },
      height: {
        "5v":"5vh",
        "10v": "10vh",
        "15v": "15vh",
        "20v": "20vh",
        "25v": "25vh",      
        "30v": "30vh",
        "35v": "35vh",
        "40v": "40vh",
        "45v": "45vh",
        "50v": "50vh",
        "55v": "55vh",
        "60v": "60vh",
        "65v": "65vh",
        "70v": "70vh",
        "75v": "75vh",
        "80v": "80vh",
        "85v": "85vh",
        "90v": "90vh",
        "95v": "95vh",
        "100v": "100vh",
    },
      backgroundImage: {
        'supermarket1': "url('/img/market-1.jpg')",
        'supermarket2': "url('/img/market-2.jpg')",
        'supermarket3': "url('/img/market-3.jpg')",        
        'supermarket4': "url('/img/market-4.jpg')",
        'supermarket5': "url('/img/market-5.jpg')",
        'landing1': "url('/img/landing-1.jpg')",
        'landing2': "url('/img/landing-2.jpg')"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")]
}