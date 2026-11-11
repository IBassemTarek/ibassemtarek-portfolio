import { createStoreDownload } from "./store-download.mjs";
import { DAHABNA_HOST } from "./site-urls.mjs";

export { detectStorePlatform } from "./store-download.mjs";

export const ANDROID_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.egxgold.app";
// Apple's canonical listing URL (Egypt storefront). The old
// "egx-gold-أسعار-الذهب-اليوم" slug 301s here; linking the canonical form is
// what lets search engines tie this page to the App Store listing.
export const IOS_STORE_URL =
  "https://apps.apple.com/eg/app/dahabna-gold-price-today/id6762029452";

export const DOWNLOAD_PATH = "/download";
export const ARABIC_DOWNLOAD_PATH = "/ar/download";

const download = createStoreDownload({
  paths: [DOWNLOAD_PATH, ARABIC_DOWNLOAD_PATH],
  host: DAHABNA_HOST,
  iosUrl: IOS_STORE_URL,
  androidUrl: ANDROID_STORE_URL,
});

export const storeUrlFor = download.storeUrlFor;
export const downloadRedirects = download.redirects;
