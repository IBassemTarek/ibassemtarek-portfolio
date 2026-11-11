import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  INDEXNOW_SITES,
  SITE_URLS,
  buildPayload,
  extractSitemapUrls,
} from "../scripts/indexnow.mjs";

const [portfolioUrl, dahabnaUrl, horusArcadeUrl] = SITE_URLS;
const host = new URL(portfolioUrl).host;

test("the portfolio sitemap contains only portfolio canonical URLs", () => {
  const urls = extractSitemapUrls(readFileSync("public/sitemap.xml", "utf8"), host);
  assert.ok(urls.includes(`${portfolioUrl}/`));
  assert.ok(urls.includes(`${portfolioUrl}/projects`));
  assert.ok(urls.every((url) => new URL(url).host === host));
  assert.ok(urls.every((url) => !/\.(png|jpe?g|webp)$/.test(url)), urls.join("\n"));
  assert.equal(new Set(urls).size, urls.length);
});

test("each app sitemap uses its own canonical subdomain", () => {
  const appSitemaps = [
    [dahabnaUrl, "public/sitemap-dahabna.xml", [`${dahabnaUrl}/`, `${dahabnaUrl}/ar`]],
    [
      horusArcadeUrl,
      "public/sitemap-horus-arcade.xml",
      [`${horusArcadeUrl}/`, `${horusArcadeUrl}/ar`],
    ],
  ];

  for (const [siteUrl, file, expected] of appSitemaps) {
    const siteHost = new URL(siteUrl).host;
    const urls = extractSitemapUrls(readFileSync(file, "utf8"), siteHost);
    assert.deepEqual(urls, expected);
    assert.ok(urls.every((url) => new URL(url).host === siteHost));
  }
});

test("drops URLs on other hosts, which would fail the whole batch", () => {
  const xml = `<urlset>
    <url><loc>${portfolioUrl}/</loc></url>
    <url><loc>https://example.com/elsewhere</loc></url>
  </urlset>`;
  assert.deepEqual(extractSitemapUrls(xml, host), [`${portfolioUrl}/`]);
});

test("payload points at the hosted key file", () => {
  for (const site of INDEXNOW_SITES) {
    const url = `${site.siteUrl}/`;
    const payload = buildPayload([url], site);
    assert.equal(payload.host, new URL(site.siteUrl).host);
    assert.equal(payload.key, site.key);
    assert.equal(payload.keyLocation, `${site.siteUrl}/${site.key}.txt`);
    assert.deepEqual(payload.urlList, [url]);
  }
});

test("each host has a distinct key file in /public", () => {
  assert.equal(new Set(INDEXNOW_SITES.map(({ key }) => key)).size, 3);

  for (const { key } of INDEXNOW_SITES) {
    assert.equal(readFileSync(`public/${key}.txt`, "utf8").trim(), key);
  }
});
