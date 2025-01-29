import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
   
    config.module.rules.push({
      test: /\.hdr$/,
      use: ['raw-loader'], 
    });

    return config;
  },
};

export default nextConfig;
