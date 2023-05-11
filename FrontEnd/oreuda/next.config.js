/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "mazassumnida.wtf" },
      { protocol: "http", hostname: "*.herokuapp.com" },
    ],
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
