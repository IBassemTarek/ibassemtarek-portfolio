import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import nextConfig from "../next.config.mjs";
import {
  ARABIC_HREFLANG,
  DEFAULT_HREFLANG,
  ENGLISH_HREFLANG,
  getLocalizedUrls,
} from "../src/lib/project-seo.mjs";
import {
  DAHABNA_HOST,
  DAHABNA_URL,
  HORUS_ARCADE_HOST,
  HORUS_ARCADE_URL,
  PORTFOLIO_HOST,
} from "../src/lib/site-urls.mjs";

const APPS = [
  {
    slug: "dahabna",
    host: DAHABNA_HOST,
    siteUrl: DAHABNA_URL,
    sitemap: "public/sitemap-dahabna.xml",
    robots: "public/robots-dahabna.txt",
  },
  {
    slug: "horus-arcade",
    host: HORUS_ARCADE_HOST,
    siteUrl: HORUS_ARCADE_URL,
    sitemap: "public/sitemap-horus-arcade.xml",
    robots: "public/robots-horus-arcade.txt",
  },
];

function sitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function hostValue(rule) {
  return rule.has?.find(({ type }) => type === "host")?.value;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("localized URL helpers produce the exact public canonical pairs", () => {
  assert.equal(ENGLISH_HREFLANG, "en");
  assert.equal(ARABIC_HREFLANG, "ar-EG");
  assert.equal(DEFAULT_HREFLANG, "x-default");

  for (const { siteUrl } of APPS) {
    assert.deepEqual(getLocalizedUrls(siteUrl), {
      english: `${siteUrl}/`,
      arabic: `${siteUrl}/ar`,
      default: `${siteUrl}/`,
    });
    assert.deepEqual(
      getLocalizedUrls(siteUrl, {
        englishPath: "/download",
        arabicPath: "/ar/download",
      }),
      {
        english: `${siteUrl}/download`,
        arabic: `${siteUrl}/ar/download`,
        default: `${siteUrl}/download`,
      }
    );
  }
});

test("app sitemaps contain only indexable landing pages and reciprocal alternates", () => {
  for (const { siteUrl, sitemap } of APPS) {
    const xml = readFileSync(sitemap, "utf8");
    assert.deepEqual(sitemapLocs(xml), [`${siteUrl}/`, `${siteUrl}/ar`]);
    assert.doesNotMatch(xml, /<loc>[^<]*\/download<\/loc>/);

    for (const canonical of [`${siteUrl}/`, `${siteUrl}/ar`]) {
      const block = xml.match(
        new RegExp(
          `<url>\\s*<loc>${escapeRegExp(canonical)}<\\/loc>[\\s\\S]*?<\\/url>`
        )
      )?.[0];
      assert.ok(block, canonical);
      assert.match(block, new RegExp(`hreflang="en" href="${siteUrl}/"`));
      assert.match(block, new RegExp(`hreflang="ar-EG" href="${siteUrl}/ar"`));
      assert.match(block, new RegExp(`hreflang="x-default" href="${siteUrl}/"`));
    }
  }
});

test("each app host serves its own sitemap and robots file through rewrites", async () => {
  const { beforeFiles } = await nextConfig.rewrites();

  for (const { host, sitemap, robots } of APPS) {
    const expected = [
      ["/sitemap.xml", `/${sitemap.split("/").at(-1)}`],
      ["/robots.txt", `/${robots.split("/").at(-1)}`],
    ];

    for (const [source, destination] of expected) {
      assert.ok(
        beforeFiles.some(
          (rule) =>
            rule.source === source &&
            rule.destination === destination &&
            hostValue(rule) === host
        ),
        `${host}${source} -> ${destination}`
      );
    }

    assert.match(
      readFileSync(robots, "utf8"),
      new RegExp(`Sitemap: https://${host}/sitemap\\.xml`)
    );
  }
});

test("old portfolio project routes permanently redirect to canonical subdomains", async () => {
  const redirects = await nextConfig.redirects();

  for (const { slug, siteUrl } of APPS) {
    for (const [source, destination] of [
      [`/${slug}`, `${siteUrl}/`],
      [`/${slug}/:path*`, `${siteUrl}/:path*`],
      [`/ar/${slug}`, `${siteUrl}/ar`],
      [`/ar/${slug}/:path*`, `${siteUrl}/ar/:path*`],
    ]) {
      const rule = redirects.find(
        (candidate) =>
          candidate.source === source && hostValue(candidate) === PORTFOLIO_HOST
      );
      assert.equal(rule?.destination, destination, source);
      assert.equal(rule?.permanent, true, source);
    }
  }
});

test("download page sources remain thin-utility noindex pages", () => {
  for (const source of [
    "src/pages/dahabna/download.js",
    "src/pages/horus-arcade/download.js",
  ]) {
    assert.match(readFileSync(source, "utf8"), /content="noindex, follow"/);
  }
});
