/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    ERPBACK_URL: process.env.ERPBACK_URL,
  },
}
