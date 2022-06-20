/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    ERPGATEWAY_URL: process.env.ERPGATEWAY_URL,
  },
}
