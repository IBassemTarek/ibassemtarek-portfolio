import assert from "node:assert/strict";
import test from "node:test";

import { createStoreDownload } from "../src/lib/store-download.mjs";
import { downloadRedirects as dahabnaRedirects } from "../src/lib/dahabna-download.mjs";
import { downloadRedirects as horusArcadeRedirects } from "../src/lib/horus-arcade-download.mjs";

const app = createStoreDownload({
  path: "/example/download",
  iosUrl: "https://apps.apple.com/app/id1",
  androidUrl: "https://play.google.com/store/apps/details?id=example",
});

test("each app maps platforms to its own listings", () => {
  assert.equal(app.storeUrlFor("ios"), "https://apps.apple.com/app/id1");
  assert.equal(
    app.storeUrlFor("android"),
    "https://play.google.com/store/apps/details?id=example"
  );
  assert.equal(app.storeUrlFor("desktop"), null);
});

test("builds one Android and one iOS rule for the app's path", () => {
  const rules = app.redirects();
  assert.equal(rules.length, 2);
  assert.deepEqual(
    rules.map(({ source }) => source),
    ["/example/download", "/example/download"]
  );
});

test("apps' redirect rules never share a source path", () => {
  const sources = new Set(dahabnaRedirects().map(({ source }) => source));
  for (const { source } of horusArcadeRedirects()) {
    assert.ok(!sources.has(source), source);
  }
});
