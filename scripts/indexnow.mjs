// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver…) that the site
// changed, so they recrawl in hours instead of days. Runs from the IndexNow
// GitHub workflow after each successful production deploy on Vercel.
//
// The key is public by design: search engines verify ownership by fetching
// https://<host>/<key>.txt, which lives in /public.

export const INDEXNOW_SITES = [
  {
    siteUrl: "https://www.ibassemtarek.fyi",
    key: "1a0d8393b7fb494cbab91bc95ce2906e",
  },
  {
    siteUrl: "https://dahabna.ibassemtarek.fyi",
    key: "69c353d063d98ebf693f8d4d9416f662",
  },
  {
    siteUrl: "https://horus-arcade.ibassemtarek.fyi",
    key: "a288449ed4b2accd81a35e2beb8a1310",
  },
];
export const SITE_URL = INDEXNOW_SITES[0].siteUrl;
export const SITE_URLS = INDEXNOW_SITES.map(({ siteUrl }) => siteUrl);
const ENDPOINT = "https://api.indexnow.org/indexnow";

export function extractSitemapUrls(xml, host) {
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(
    ([, loc]) => loc
  );
  // Only page URLs (image:loc lives in <image:loc>, which the regex skips) on
  // our own host: IndexNow rejects the whole batch if any URL is foreign.
  return [...new Set(urls)].filter((url) => new URL(url).host === host);
}

export function buildPayload(urls, { siteUrl, key } = INDEXNOW_SITES[0]) {
  return {
    host: new URL(siteUrl).host,
    key,
    keyLocation: `${siteUrl}/${key}.txt`,
    urlList: urls,
  };
}

async function main() {
  for (const site of INDEXNOW_SITES) {
    const { siteUrl, key } = site;
    const host = new URL(siteUrl).host;
    const sitemap = await fetch(`${siteUrl}/sitemap.xml`, {
      signal: AbortSignal.timeout(15000),
    });
    if (!sitemap.ok) {
      throw new Error(`${host}/sitemap.xml returned ${sitemap.status}`);
    }

    const urls = extractSitemapUrls(await sitemap.text(), host);
    if (urls.length === 0) {
      throw new Error(`${host}/sitemap.xml has no URLs for this host`);
    }

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(buildPayload(urls, site)),
      signal: AbortSignal.timeout(15000),
    });

    // 200 = accepted, 202 = accepted while the key file is being verified.
    if (res.status !== 200 && res.status !== 202) {
      throw new Error(
        `IndexNow returned ${res.status} for ${host}: ${(await res.text()).slice(0, 300)}`
      );
    }
    console.log(`IndexNow ${res.status}: submitted ${urls.length} URLs for ${host}`);
    for (const url of urls) {
      console.log(`  ${url}`);
    }
  }
}

if (import.meta.main) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
