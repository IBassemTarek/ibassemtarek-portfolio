import { downloadRedirects } from "./src/lib/dahabna-download.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      ...downloadRedirects(),
      {
        source: "/egx-gold",
        destination: "/dahabna",
        permanent: true,
      },
      {
        source: "/ar/egx-gold",
        destination: "/ar/dahabna",
        permanent: true,
      },
      {
        source: "/%D8%AF%D9%87%D8%A8%D9%86%D8%A7",
        destination: "/ar/dahabna",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
