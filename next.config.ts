import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                pathname: '/**',
            },
            {
                protocol: "https",
                hostname: "files.edgestore.dev",
            },
        ]
    }
};

export default nextConfig;
