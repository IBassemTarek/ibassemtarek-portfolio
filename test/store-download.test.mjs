import assert from "node:assert/strict";
import test from "node:test";

import { createStoreDownload } from "../src/lib/store-download.mjs";
import { downloadRedirects as dahabnaRedirects } from "../src/lib/dahabna-download.mjs";
import { downloadRedirects as horusArcadeRedirects } from "../src/lib/horus-arcade-download.mjs";

const app = createStoreDownload({
  paths: ["/download", "/ar/download"],
  host: "example.com",
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

test("builds host-scoped Android and iOS rules for every download path", () => {
  const rules = app.redirects();
  assert.equal(rules.length, 4);
  assert.deepEqual(
    rules.map(({ source }) => source),
    ["/download", "/download", "/ar/download", "/ar/download"]
  );
  assert.ok(
    rules.every(({ has }) =>
      has.some(({ type, value }) => type === "host" && value === "example.com")
    )
  );
});

test("apps' shared paths are separated by their host match", () => {
  const ruleKey = ({ source, has }) =>
    `${has.find(({ type }) => type === "host").value}${source}`;
  const dahabnaRules = new Set(dahabnaRedirects().map(ruleKey));
  for (const rule of horusArcadeRedirects()) {
    assert.ok(!dahabnaRules.has(ruleKey(rule)), ruleKey(rule));
  }
});
