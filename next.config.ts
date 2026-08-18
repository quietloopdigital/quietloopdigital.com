import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a minimal self-contained server in .next/standalone —
  // only the files actually needed at runtime, so the Docker image
  // doesn't have to carry the whole node_modules tree.
  output: "standalone",
};

export default nextConfig;
