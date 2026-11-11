import { createStoreDownload } from "./store-download.mjs";
import { HORUS_ARCADE_HOST } from "./site-urls.mjs";

export { detectStorePlatform } from "./store-download.mjs";

// The Android package keeps the app's original "eyecon" id.
export const ANDROID_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.ibassemtarek.eyecon";
export const IOS_STORE_URL =
  "https://apps.apple.com/eg/app/horus-arcade/id6819313846";
export const IOS_APP_ID = "6819313846";

export const DOWNLOAD_PATH = "/download";
export const ARABIC_DOWNLOAD_PATH = "/ar/download";

const download = createStoreDownload({
  paths: [DOWNLOAD_PATH, ARABIC_DOWNLOAD_PATH],
  host: HORUS_ARCADE_HOST,
  iosUrl: IOS_STORE_URL,
  androidUrl: ANDROID_STORE_URL,
});

export const storeUrlFor = download.storeUrlFor;
export const downloadRedirects = download.redirects;
