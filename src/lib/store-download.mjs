// User-Agent fragments, shared by the edge redirects in next.config.mjs and the
// client-side fallback on each app's download page so both agree on what is a
// phone.
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

// One smart store link per app: `storeUrlFor` maps a platform to its listing,
// `redirects` builds the matching next.config rules for `path`.
export function createStoreDownload({ path, iosUrl, androidUrl }) {
  function storeUrlFor(platform) {
    if (platform === "android") {
      return androidUrl;
    }
    if (platform === "ios") {
      return iosUrl;
    }
    return null;
  }

  // next.config redirects run in Vercel's edge routing layer, so phones reach
  // the store without waiting on a serverless function. Next matches `has`
  // values as `^value$`, hence the surrounding `.*`.
  function redirects() {
    return [
      { pattern: ANDROID_UA, destination: androidUrl },
      { pattern: IOS_UA, destination: iosUrl },
    ].map(({ pattern, destination }) => ({
      source: path,
      has: [{ type: "header", key: "user-agent", value: `.*(?:${pattern}).*` }],
      destination,
      permanent: false,
    }));
  }

  return { storeUrlFor, redirects };
}
