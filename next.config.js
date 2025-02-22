/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        "avatars.githubusercontent.com",
        "avatars.googleusercontent.com",
        "lh3.googleusercontent.com"
      ],
    },
    webpack: (config) => {
      config.experiments = { 
        ...config.experiments,
        topLevelAwait: true,
      };
      return config;
    },
  };
  
  module.exports = nextConfig;
  