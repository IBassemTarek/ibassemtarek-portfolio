import assert from "node:assert/strict";
import test from "node:test";

import { pageTheme } from "../src/lib/page-theme.mjs";

test("Horus Arcade pages theme the header and footer", () => {
  assert.equal(pageTheme("/horus-arcade"), "horus-arcade");
  assert.equal(pageTheme("/horus-arcade/download"), "horus-arcade");
});

test("other pages keep the site theme", () => {
  for (const pathname of ["/", "/projects", "/dahabna", "/horus-arcade-old", undefined]) {
    assert.equal(pageTheme(pathname), undefined, pathname);
  }
});
