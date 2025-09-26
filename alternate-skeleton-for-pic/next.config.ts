import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config external images host */
  images: {
    remotePatterns: [
      { hostname: '"plus.unsplash.com', }
    ]
  }
};

export default nextConfig;
