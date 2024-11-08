import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/**",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
