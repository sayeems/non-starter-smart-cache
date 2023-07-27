/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "dev-non-starter-kit-smart-cache-27-jul-2023.pantheonsite.io",
      "live-non-starter-kit-smart-cache-27-jul-2023.pantheonsite.io",
      "test-non-starter-kit-smart-cache-27-jul-2023.pantheonsite.io",
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
