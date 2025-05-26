module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['your-image-domain.com'], // Add your image domains here
  },
  webpack: (config) => {
    // Custom webpack configurations can be added here
    return config;
  },
};