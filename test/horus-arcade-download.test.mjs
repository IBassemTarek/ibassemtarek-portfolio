import assert from "node:assert/strict";
import test from "node:test";

import {
  ANDROID_STORE_URL,
  ARABIC_DOWNLOAD_PATH,
  DOWNLOAD_PATH,
  IOS_APP_ID,
  IOS_STORE_URL,
  detectStorePlatform,
  downloadRedirects,
  storeUrlFor,
} from "../src/lib/horus-arcade-download.mjs";
import { HORUS_ARCADE_HOST } from "../src/lib/site-urls.mjs";

const UA = {
  androidChrome:
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36",
  androidTikTok:
    "Mozilla/5.0 (Linux; Android 13; SM-A536E; wv) AppleWebKit/537.36 Chrome/128.0 Mobile Safari/537.36 trill_360001 BytedanceWebview",
  iphoneSafari:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  iphoneInstagram:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Instagram 350.0",
  macSafari:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15",
  facebookPreview:
    "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
};

test("store URLs point at the Horus Arcade listings", () => {
  assert.match(IOS_STORE_URL, new RegExp(`/id${IOS_APP_ID}$`));
  assert.match(ANDROID_STORE_URL, /id=com\.ibassemtarek\.eyecon$/);
});

test("maps phones to their store and everything else to null", () => {
  assert.equal(storeUrlFor(detectStorePlatform(UA.androidTikTok)), ANDROID_STORE_URL);
  assert.equal(storeUrlFor(detectStorePlatform(UA.iphoneInstagram)), IOS_STORE_URL);
  assert.equal(storeUrlFor(detectStorePlatform(UA.macSafari)), null);
  assert.equal(storeUrlFor(detectStorePlatform(UA.facebookPreview)), null);
});

// Mirrors Next's matchHas: header values are tested against ^value$ and the
// first matching redirect wins.
function edgeRedirectFor(userAgent) {
  const rule = downloadRedirects().find(({ has }) =>
    has.every(({ type, value }) =>
      type === "host"
        ? value === HORUS_ARCADE_HOST
        : new RegExp(`^${value}$`).test(userAgent)
    )
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
  assert.equal(DOWNLOAD_PATH, "/download");
  for (const rule of downloadRedirects()) {
    assert.ok(
      rule.source === DOWNLOAD_PATH || rule.source === ARABIC_DOWNLOAD_PATH,
      rule.source
    );
    assert.ok(
      rule.has.some(
        ({ type, value }) => type === "host" && value === HORUS_ARCADE_HOST
      )
    );
    assert.equal(rule.permanent, false);
  }
});
