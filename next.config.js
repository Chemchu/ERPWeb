/** @type {import('next').NextConfig} */

// module.exports = {
//   reactStrictMode: false,
//   publicRuntimeConfig: {
//     ERPGATEWAY_URL: process.env.ERPGATEWAY_URL,
//   },
// };

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  //disable: false,
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});

module.exports = withPWA({
  reactStrictMode: false,
  publicRuntimeConfig: {
    ERPGATEWAY_URL: process.env.ERPGATEWAY_URL,
  },
});
