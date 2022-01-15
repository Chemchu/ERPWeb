/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    ERPBACK_URL: process.env.ERPBACK_URL,
  },
}
