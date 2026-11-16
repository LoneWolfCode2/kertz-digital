import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  images: {
    // Placeholder images until real photos exist. Use the /png form,
    // e.g. https://placehold.co/1200x800/png?text=Project
    remotePatterns: [{ protocol: "https", hostname: "placehold.co" }],
  },
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
