import { downloadRedirects as dahabnaDownloadRedirects } from "./src/lib/dahabna-download.mjs";
import { downloadRedirects as horusArcadeDownloadRedirects } from "./src/lib/horus-arcade-download.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      ...dahabnaDownloadRedirects(),
      ...horusArcadeDownloadRedirects(),
      // App projects have landing pages instead of /projects/<id> case studies.
      { source: "/projects/10", destination: "/horus-arcade", permanent: true },
      { source: "/projects/11", destination: "/dahabna", permanent: true },
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
