import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui", "@repo/db"],

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
