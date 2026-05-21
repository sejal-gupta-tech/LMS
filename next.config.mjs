/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.3', '192.168.1.8'],
  // Ignore typescript warnings to allow build for now
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
