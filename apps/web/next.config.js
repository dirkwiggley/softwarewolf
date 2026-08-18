/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Intercepts any frontend call starting with /api
        source: "/api/:path*",
        // Secretly proxies it directly to your Express server
        destination: "http://localhost:5001/api/:path*",
      },
    ];
  },
};

export default nextConfig;
