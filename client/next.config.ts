import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // Ignore 'fs' module
    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;
