export const ANDROID_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.egxgold.app";
export const IOS_STORE_URL =
  "https://apps.apple.com/us/app/egx-gold-%D8%A3%D8%B3%D8%B9%D8%A7%D8%B1-%D8%A7%D9%84%D8%B0%D9%87%D8%A8-%D8%A7%D9%84%D9%8A%D9%88%D9%85/id6762029452";

// Server-side platform check from the User-Agent header. iPadOS Safari sends a
// desktop (Macintosh) UA, so it lands here as "desktop" and is caught by the
// client-side touch check on the download page instead.
export function detectStorePlatform(userAgent = "") {
  if (/Android/i.test(userAgent)) {
    return "android";
  }
  if (/(iPhone|iPad|iPod)/i.test(userAgent)) {
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
