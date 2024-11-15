/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Fix for undici module
    config.resolve.alias = {
      ...config.resolve.alias,
      undici: false,
    };
    
    // Fallbacks for Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      path: false,
      http: false,
      https: false,
      zlib: false,
    };

    return config;
  },
  experimental: {
    optimizeCss: true,
    legacyBrowsers: false,
    serverComponentsExternalPackages: ['undici'],
  },
};

module.exports = nextConfig;