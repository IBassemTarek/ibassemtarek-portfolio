import assert from "node:assert/strict";
import test from "node:test";

import { documentLocale, isArabicPath } from "../src/lib/locale.mjs";

test("Arabic routes are detected by path", () => {
  assert.equal(isArabicPath("/ar/dahabna"), true);
  assert.equal(isArabicPath("/ar"), true);
  assert.equal(isArabicPath("/دهبنا"), true);
  assert.equal(isArabicPath("/dahabna"), false);
  assert.equal(isArabicPath("/about"), false);
  assert.equal(isArabicPath("/archive"), false);
  assert.equal(isArabicPath(undefined), false);
});

test("document locale carries both lang and dir", () => {
  assert.deepEqual(documentLocale("/ar/dahabna"), { lang: "ar", dir: "rtl" });
  assert.deepEqual(documentLocale("/dahabna"), { lang: "en", dir: "ltr" });
});
