// Set NEXT_PUBLIC_BASE_PATH (e.g. "/my-repo") when deploying to a GitHub Pages project site.
// Leave it empty for local development, user sites (<name>.github.io) and custom domains.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
