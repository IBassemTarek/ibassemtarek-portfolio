import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  INDEXNOW_KEY,
  SITE_URL,
  buildPayload,
  extractSitemapUrls,
} from "../scripts/indexnow.mjs";

const host = new URL(SITE_URL).host;

test("reads page URLs from the real sitemap, skipping image URLs", () => {
  const urls = extractSitemapUrls(readFileSync("public/sitemap.xml", "utf8"), host);
  assert.ok(urls.includes(`${SITE_URL}/dahabna`));
  assert.ok(urls.includes(`${SITE_URL}/ar/dahabna`));
  assert.ok(urls.every((url) => !/\.(png|jpe?g|webp)$/.test(url)), urls.join("\n"));
  assert.equal(new Set(urls).size, urls.length);
});

test("drops URLs on other hosts, which would fail the whole batch", () => {
  const xml = `<urlset>
    <url><loc>${SITE_URL}/</loc></url>
    <url><loc>https://example.com/elsewhere</loc></url>
  </urlset>`;
  assert.deepEqual(extractSitemapUrls(xml, host), [`${SITE_URL}/`]);
});

test("payload points at the hosted key file", () => {
  const payload = buildPayload([`${SITE_URL}/dahabna`]);
  assert.equal(payload.host, host);
  assert.equal(payload.key, INDEXNOW_KEY);
  assert.equal(payload.keyLocation, `${SITE_URL}/${INDEXNOW_KEY}.txt`);
  assert.deepEqual(payload.urlList, [`${SITE_URL}/dahabna`]);
});

test("key file in /public contains exactly the key", () => {
  assert.equal(
    readFileSync(`public/${INDEXNOW_KEY}.txt`, "utf8"),
    INDEXNOW_KEY
  );
});
