import assert from "node:assert/strict";
import test from "node:test";

import {
  ANDROID_STORE_URL,
  DOWNLOAD_PATH,
  IOS_STORE_URL,
  detectStorePlatform,
  downloadRedirects,
  storeUrlFor,
} from "../src/lib/dahabna-download.mjs";

const UA = {
  androidChrome:
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36",
  androidFacebook:
    "Mozilla/5.0 (Linux; Android 13; SM-A536E Build/TP1A; wv) AppleWebKit/537.36 Chrome/128.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/480.0;]",
  iphoneSafari:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  ipadInstagram:
    "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Instagram 300.0",
  macSafari:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15",
  whatsappPreview: "WhatsApp/2.24.1 A",
  facebookPreview:
    "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
};

test("detects Android, including in-app browsers", () => {
  assert.equal(detectStorePlatform(UA.androidChrome), "android");
  assert.equal(detectStorePlatform(UA.androidFacebook), "android");
});

test("detects iPhone and iPad user agents", () => {
  assert.equal(detectStorePlatform(UA.iphoneSafari), "ios");
  assert.equal(detectStorePlatform(UA.ipadInstagram), "ios");
});

test("treats desktop, link-preview bots, and missing user agents as desktop", () => {
  assert.equal(detectStorePlatform(UA.macSafari), "desktop");
  assert.equal(detectStorePlatform(UA.whatsappPreview), "desktop");
  assert.equal(detectStorePlatform(UA.facebookPreview), "desktop");
  assert.equal(detectStorePlatform(undefined), "desktop");
});

test("maps platforms to store URLs", () => {
  assert.equal(storeUrlFor("android"), ANDROID_STORE_URL);
  assert.equal(storeUrlFor("ios"), IOS_STORE_URL);
  assert.equal(storeUrlFor("desktop"), null);
});

// Mirrors Next's matchHas: header values are tested against ^value$ and the
// first matching redirect wins.
function edgeRedirectFor(userAgent) {
  const rule = downloadRedirects().find(({ has }) =>
    has.every(({ value }) => new RegExp(`^${value}$`).test(userAgent))
  );
  return rule?.destination ?? null;
}

test("edge redirects agree with detectStorePlatform", () => {
  for (const userAgent of Object.values(UA)) {
    assert.equal(
      edgeRedirectFor(userAgent),
      storeUrlFor(detectStorePlatform(userAgent)),
      userAgent
    );
  }
});

test("edge redirects are temporary and scoped to the download path", () => {
  for (const rule of downloadRedirects()) {
    assert.equal(rule.source, DOWNLOAD_PATH);
    assert.equal(rule.permanent, false);
  }
});
