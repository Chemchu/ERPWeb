/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    ERPGATEWAY_URL: process.env.ERPGATEWAY_URL,
  },
};

// const withPWA = require("next-pwa");
// module.exports = withPWA({
//   reactStrictMode: false,
//   publicRuntimeConfig: {
//     ERPGATEWAY_URL: process.env.ERPGATEWAY_URL,
//   },
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//     //disable: process.env.NODE_ENV === "development",
//     //disable: true
//   },
// });
