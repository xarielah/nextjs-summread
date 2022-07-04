/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    LOCAL: 'http://localhost:3000',
  },
};

module.exports = nextConfig;
