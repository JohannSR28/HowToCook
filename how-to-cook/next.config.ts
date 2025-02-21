/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "equipenutrition.ca",
      },
      {
        protocol: "https",
        hostname: "thegreatbritishbakeoff.co.uk",
      },
      {
        protocol: "https",
        hostname: "www.thecookierookie.com",
      },
    ],
  },
};

module.exports = nextConfig;
