/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdnnovashop.mehdimst.com"],
  },
};

module.exports = nextConfig;
