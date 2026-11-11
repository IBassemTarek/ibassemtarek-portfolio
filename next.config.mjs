
import {
  downloadRedirects as dahabnaDownloadRedirects,
} from "./src/lib/dahabna-download.mjs";

import {
  downloadRedirects as horusArcadeDownloadRedirects,
} from "./src/lib/horus-arcade-download.mjs";
import {
  DAHABNA_HOST,
  DAHABNA_URL,
  HORUS_ARCADE_HOST,
  HORUS_ARCADE_URL,
  PORTFOLIO_HOST,
  PORTFOLIO_URL,
} from "./src/lib/site-urls.mjs";

// --------------------------------------------------
// Project domains
// --------------------------------------------------

const LEGACY_PORTFOLIO_HOSTS = [
  "ibassemtarek.fyi",
  "ibassemtarek.vercel.app",
];

const projects = [
  {
    slug: "dahabna",
    host: DAHABNA_HOST,
    url: DAHABNA_URL,
    sitemap: "/sitemap-dahabna.xml",
    robots: "/robots-dahabna.txt",
  },
  {
    slug: "horus-arcade",
    host: HORUS_ARCADE_HOST,
    url: HORUS_ARCADE_URL,
    sitemap: "/sitemap-horus-arcade.xml",
    robots: "/robots-horus-arcade.txt",
  },
];

const CANONICAL_SOURCE_HOSTS = [
  PORTFOLIO_HOST,
  ...LEGACY_PORTFOLIO_HOSTS,
  ...projects.map(({ host }) => host),
];

// --------------------------------------------------
// Generate subdomain redirects
// --------------------------------------------------

function getProjectRedirects() {
  return projects.flatMap(({ slug, url }) =>
    CANONICAL_SOURCE_HOSTS.flatMap((sourceHost) => {
      const hostMatch = [{ type: "host", value: sourceHost }];

      return [
        {
          source: `/${slug}`,
          has: hostMatch,
          destination: `${url}/`,
          permanent: true,
        },
        {
          source: `/${slug}/:path*`,
          has: hostMatch,
          destination: `${url}/:path*`,
          permanent: true,
        },
        {
          source: `/ar/${slug}`,
          has: hostMatch,
          destination: `${url}/ar`,
          permanent: true,
        },
        {
          source: `/ar/${slug}/:path*`,
          has: hostMatch,
          destination: `${url}/ar/:path*`,
          permanent: true,
        },
      ];
    })
  );
}

function getPortfolioRedirects() {
  const projectHostRedirects = projects.flatMap(({ host }) => {
    const hostMatch = [{ type: "host", value: host }];

    return [
      {
        source: "/about",
        has: hostMatch,
        destination: `${PORTFOLIO_URL}/about`,
        permanent: true,
      },
      {
        source: "/projects/:path*",
        has: hostMatch,
        destination: `${PORTFOLIO_URL}/projects/:path*`,
        permanent: true,
      },
      {
        source: "/BassemTarekMahrousResume.pdf",
        has: hostMatch,
        destination: `${PORTFOLIO_URL}/BassemTarekMahrousResume.pdf`,
        permanent: true,
      },
      ...["/llms.txt", "/llms-ar.txt", "/ar/llms.txt"].map((source) => ({
        source,
        has: hostMatch,
        destination: `${PORTFOLIO_URL}${source}`,
        permanent: true,
      })),
    ];
  });

  const factSheetRedirects = CANONICAL_SOURCE_HOSTS.filter(
    (host) => host !== HORUS_ARCADE_HOST
  ).map((host) => ({
    source: "/horus-arcade.md",
    has: [{ type: "host", value: host }],
    destination: `${HORUS_ARCADE_URL}/horus-arcade.md`,
    permanent: true,
  }));

  const legacyHostRedirects = LEGACY_PORTFOLIO_HOSTS.map((host) => ({
    source: "/:path*",
    has: [{ type: "host", value: host }],
    destination: `${PORTFOLIO_URL}/:path*`,
    permanent: true,
  }));

  return [
    ...projectHostRedirects,
    ...factSheetRedirects,
    ...legacyHostRedirects,
  ];
}

// --------------------------------------------------
// Generate subdomain rewrites
// --------------------------------------------------

function getProjectRewrites() {
  return projects.flatMap(({ slug, host, sitemap, robots }) => {
    const domain = [
      {
        type: "host",
        value: host,
      },
    ];

    return [
      {
        source: "/sitemap.xml",
        has: domain,
        destination: sitemap,
      },
      {
        source: "/robots.txt",
        has: domain,
        destination: robots,
      },

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

      // Canonicalize the bare domain and Vercel deployment domain, and keep
      // portfolio pages from being indexed on either app subdomain.
      ...getPortfolioRedirects(),
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
