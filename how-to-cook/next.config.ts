import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // next.config.js
  reactStrictMode: true,
  images: {
    domains: ["example.com", "equipenutrition.ca"], // Ajoutez ici le domaine
  },
};

export default nextConfig;
