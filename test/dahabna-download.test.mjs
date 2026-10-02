import assert from "node:assert/strict";
import test from "node:test";

import {
  ANDROID_STORE_URL,
  IOS_STORE_URL,
  detectStorePlatform,
  storeUrlFor,
} from "../src/lib/dahabna-download.mjs";

test("detects Android, including in-app browsers", () => {
  assert.equal(
    detectStorePlatform(
      "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36"
    ),
    "android"
  );
  assert.equal(
    detectStorePlatform(
      "Mozilla/5.0 (Linux; Android 13; SM-A536E Build/TP1A; wv) AppleWebKit/537.36 Chrome/128.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/480.0;]"
    ),
    "android"
  );
});

test("detects iPhone and iPad user agents", () => {
  assert.equal(
    detectStorePlatform(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"
    ),
    "ios"
  );
  assert.equal(
    detectStorePlatform(
      "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Instagram 300.0"
    ),
    "ios"
  );
});

test("treats desktop and missing user agents as desktop", () => {
  assert.equal(
    detectStorePlatform(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15"
    ),
    "desktop"
  );
  assert.equal(detectStorePlatform(undefined), "desktop");
});

test("maps platforms to store URLs", () => {
  assert.equal(storeUrlFor("android"), ANDROID_STORE_URL);
  assert.equal(storeUrlFor("ios"), IOS_STORE_URL);
  assert.equal(storeUrlFor("desktop"), null);
});
