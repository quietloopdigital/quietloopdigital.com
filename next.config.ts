import type { NextConfig } from "next";

// Vercel sets VERCEL=1 during its own build. Its deployment pipeline does
// its own equivalent of "standalone" packaging (serverless functions +
// output file tracing) and actively breaks when this flag is also set —
// it looks for .next/next-server.js.nft.json in a location that
// "standalone" mode doesn't produce, and the build fails with ENOENT.
//
// So: standalone output only when we're NOT on Vercel — i.e. for the
// Docker image (Week 1) and any other self-hosted build.
const nextConfig: NextConfig = {
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;
