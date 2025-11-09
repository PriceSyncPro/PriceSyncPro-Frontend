import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Turbopack yapılandırması
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
