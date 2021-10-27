module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
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
