import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 90] },
  cacheComponents: true,
  // The resume PDF sits outside /public; make sure it ships with the serverless function that emails it.
  outputFileTracingIncludes: { "/api/cv": ["./private/**/*"] },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
