module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
    'sans': ["'Roboto Condensed'",'Lato', 'sans-serif', 'system-ui' ],
    'serif': ['serif', 'Georgia'],
    'mono': ['monospace', 'SFMono-Regular'],
    'display': ['Oswald'],
    'body': ['"Open Sans"'],
   },
    extend: {
      height: {
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
        'supermarket1': "url('/src/img/market-1.jpg')",
        'supermarket2': "url('/src/img/market-2.jpg')",
        'supermarket3': "url('/src/img/market-3.jpg')",        
        'supermarket4': "url('/src/img/market-4.jpg')",
        'supermarket5': "url('/src/img/market-5.jpg')",
        'supermarket1V': "url('/src/img/marketv-1.jpeg')",
        'supermarket2V': "url('/src/img/marketv-2.jpeg')",
        'supermarket3V': "url('/src/img/marketv-3.jpeg')",
        'supermarket4V': "url('/src/img/marketv-4.jpeg')",
        'supermarketVideo': "url('/src/video/marketVideo-1.mp4')",
        'landing1': "url('/src/img/landing-1.jpg')",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}