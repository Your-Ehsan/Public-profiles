/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
      // images: {
      //   domains: ["lh3.googleusercontent.com"],
      // },
      // },
      images: {
        remotePatterns: [
          {
            // protocol: 'http',
            hostname: 'localhost',
            // port: '',
            // pathname: '/account123/**',
          },
        ],
      },
}

module.exports = nextConfig
