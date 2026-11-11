
import {
  downloadRedirects as dahabnaDownloadRedirects,
} from "./src/lib/dahabna-download.mjs";

import {
  downloadRedirects as horusArcadeDownloadRedirects,
} from "./src/lib/horus-arcade-download.mjs";

// --------------------------------------------------
// Project domains
// --------------------------------------------------

const MAIN_DOMAIN = "www.ibassemtarek.fyi";

const projects = [
  {
    slug: "dahabna",
    host: "dahabna.ibassemtarek.fyi",
  },
  {
    slug: "horus-arcade",
    host: "horus-arcade.ibassemtarek.fyi",
  },
];

// --------------------------------------------------
// Generate subdomain redirects
// --------------------------------------------------

function getProjectRedirects() {
  return projects.flatMap(({ slug, host }) => {
    const mainHost = [
      {
        type: "host",
        value: MAIN_DOMAIN,
      },
    ];

    return [
      // English homepage
      {
        source: `/${slug}`,
        has: mainHost,
        destination: `https://${host}/`,
        permanent: true,
      },

      // English nested routes
      // Example: /dahabna/download -> /download
      {
        source: `/${slug}/:path*`,
        has: mainHost,
        destination: `https://${host}/:path*`,
        permanent: true,
      },

      // Arabic homepage
      {
        source: `/ar/${slug}`,
        has: mainHost,
        destination: `https://${host}/ar`,
        permanent: true,
      },

      // Arabic nested routes
      // Example: /ar/dahabna/download -> /ar/download
      {
        source: `/ar/${slug}/:path*`,
        has: mainHost,
        destination: `https://${host}/ar/:path*`,
        permanent: true,
      },
    ];
  });
}

// --------------------------------------------------
// Generate subdomain rewrites
// --------------------------------------------------

function getProjectRewrites() {
  return projects.flatMap(({ slug, host }) => {
    const domain = [
      {
        type: "host",
        value: host,
      },
    ];

    return [
      // English homepage
      {
        source: "/",
        has: domain,
        destination: `/${slug}`,
      },

      // Arabic homepage
      {
        source: "/ar",
        has: domain,
        destination: `/ar/${slug}`,
      },

      // English download page
      {
        source: "/download",
        has: domain,
        destination: `/${slug}/download`,
      },

      // Arabic download page
      {
        source: "/ar/download",
        has: domain,
        destination: `/ar/${slug}/download`,
      },
    ];
  });
}

// --------------------------------------------------
// Next.js configuration
// --------------------------------------------------

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  // ------------------------------------------------
  // Permanent redirects (308)
  // ------------------------------------------------

  async redirects() {
    return [
      // Move original project routes to subdomains
      ...getProjectRedirects(),

      // Preserve existing download redirect logic
      ...dahabnaDownloadRedirects(),
      ...horusArcadeDownloadRedirects(),

      // Legacy project links
      {
        source: "/projects/10",
        destination:
          "https://horus-arcade.ibassemtarek.fyi/",
        permanent: true,
      },
      {
        source: "/projects/11",
        destination:
          "https://dahabna.ibassemtarek.fyi/",
        permanent: true,
      },
      {
        source: "/projects/12",
        destination: "https://mindovaq.com/shm/",
        permanent: true,
      },
      {
        source: "/projects/13",
        destination: "https://simplynikah.app",
        permanent: true,
      },

      // Legacy EGX Gold routes
      {
        source: "/egx-gold",
        destination:
          "https://dahabna.ibassemtarek.fyi/",
        permanent: true,
      },
      {
        source: "/ar/egx-gold",
        destination:
          "https://dahabna.ibassemtarek.fyi/ar",
        permanent: true,
      },

      // Arabic legacy slug: دهبنا
      {
        source: "/%D8%AF%D9%87%D8%A8%D9%86%D8%A7",
        destination:
          "https://dahabna.ibassemtarek.fyi/ar",
        permanent: true,
      },
    ];
  },

  // ------------------------------------------------
  // Internal subdomain routing
  // ------------------------------------------------

  async rewrites() {
    return {
      beforeFiles: getProjectRewrites(),
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
