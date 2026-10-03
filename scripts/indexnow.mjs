// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver…) that the site
// changed, so they recrawl in hours instead of days. Runs from the IndexNow
// GitHub workflow after each successful production deploy on Vercel.
//
// The key is public by design: search engines verify ownership by fetching
// https://<host>/<key>.txt, which lives in /public.

export const SITE_URL = "https://ibassemtarek.vercel.app";
export const INDEXNOW_KEY = "1a0d8393b7fb494cbab91bc95ce2906e";
const ENDPOINT = "https://api.indexnow.org/indexnow";

export function extractSitemapUrls(xml, host) {
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(
    ([, loc]) => loc
  );
  // Only page URLs (image:loc lives in <image:loc>, which the regex skips) on
  // our own host: IndexNow rejects the whole batch if any URL is foreign.
  return [...new Set(urls)].filter((url) => new URL(url).host === host);
}

export function buildPayload(urls, siteUrl = SITE_URL, key = INDEXNOW_KEY) {
  return {
    host: new URL(siteUrl).host,
    key,
    keyLocation: `${siteUrl}/${key}.txt`,
    urlList: urls,
  };
}

async function main() {
  const host = new URL(SITE_URL).host;
  const sitemap = await fetch(`${SITE_URL}/sitemap.xml`, {
    signal: AbortSignal.timeout(15000),
  });
  if (!sitemap.ok) {
    throw new Error(`sitemap.xml returned ${sitemap.status}`);
  }

  const urls = extractSitemapUrls(await sitemap.text(), host);
  if (urls.length === 0) {
    throw new Error("sitemap.xml has no URLs for this host");
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(buildPayload(urls)),
    signal: AbortSignal.timeout(15000),
  });

  // 200 = accepted, 202 = accepted while the key file is being verified.
  if (res.status !== 200 && res.status !== 202) {
    throw new Error(
      `IndexNow returned ${res.status}: ${(await res.text()).slice(0, 300)}`
    );
  }
  console.log(`IndexNow ${res.status}: submitted ${urls.length} URLs`);
  for (const url of urls) {
    console.log(`  ${url}`);
  }
}

if (import.meta.main) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
