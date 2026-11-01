import { createStoreDownload } from "./store-download.mjs";

export { detectStorePlatform } from "./store-download.mjs";

// The Android package keeps the app's original "eyecon" id.
export const ANDROID_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.ibassemtarek.eyecon";
export const IOS_STORE_URL =
  "https://apps.apple.com/eg/app/horus-arcade/id6819313846";
export const IOS_APP_ID = "6819313846";

export const DOWNLOAD_PATH = "/horus-arcade/download";

const download = createStoreDownload({
  path: DOWNLOAD_PATH,
  iosUrl: IOS_STORE_URL,
  androidUrl: ANDROID_STORE_URL,
});

export const storeUrlFor = download.storeUrlFor;
export const downloadRedirects = download.redirects;
