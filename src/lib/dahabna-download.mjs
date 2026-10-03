export const ANDROID_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.egxgold.app";
// Apple's canonical listing URL (Egypt storefront). The old
// "egx-gold-أسعار-الذهب-اليوم" slug 301s here; linking the canonical form is
// what lets search engines tie this page to the App Store listing.
export const IOS_STORE_URL =
  "https://apps.apple.com/eg/app/dahabna-gold-price-today/id6762029452";

export const DOWNLOAD_PATH = "/dahabna/download";

// User-Agent fragments, shared by the edge redirects in next.config.mjs and the
// client-side fallback on the download page so both agree on what is a phone.
const ANDROID_UA = "Android";
const IOS_UA = "iPhone|iPad|iPod";

// iPadOS Safari sends a desktop (Macintosh) UA, so it lands on "desktop" here
// and is caught by the touch check on the download page instead.
export function detectStorePlatform(userAgent = "") {
  if (new RegExp(ANDROID_UA).test(userAgent)) {
    return "android";
  }
  if (new RegExp(IOS_UA).test(userAgent)) {
    return "ios";
  }
  return "desktop";
}

export function storeUrlFor(platform) {
  if (platform === "android") {
    return ANDROID_STORE_URL;
  }
  if (platform === "ios") {
    return IOS_STORE_URL;
  }
  return null;
}

// next.config redirects run in Vercel's edge routing layer, so phones reach
// the store without waiting on a serverless function. Next matches `has`
// values as `^value$`, hence the surrounding `.*`.
export function downloadRedirects() {
  return [
    { pattern: ANDROID_UA, destination: ANDROID_STORE_URL },
    { pattern: IOS_UA, destination: IOS_STORE_URL },
  ].map(({ pattern, destination }) => ({
    source: DOWNLOAD_PATH,
    has: [{ type: "header", key: "user-agent", value: `.*(?:${pattern}).*` }],
    destination,
    permanent: false,
  }));
}
