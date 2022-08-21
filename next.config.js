/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images : {
    domains : ['bonik-react.vercel.app' , 'dummyjson.com']
  }
}

module.exports = nextConfig
