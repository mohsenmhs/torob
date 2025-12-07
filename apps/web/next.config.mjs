/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    cacheComponents: true,
  },
  transpilePackages: ["@repo/ui", "@repo/typesense", "@repo/config"],
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];
    return config;
  },
  // Add empty turbopack config to silence warning when using webpack
  turbopack: {},
};

export default nextConfig;

