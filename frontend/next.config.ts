import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["learntern-files.s3.ap-south-1.amazonaws.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      use: "ignore-loader",
    });
    return config;
  },
};

export default nextConfig;
