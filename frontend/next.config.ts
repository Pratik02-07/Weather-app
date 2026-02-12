import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: true,
    turbo: {
      resolveAlias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
  transpilePackages: [
    "@radix-ui/react-slot",
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
};

export default nextConfig;
