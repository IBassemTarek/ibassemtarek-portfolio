import assert from "node:assert/strict";
import test from "node:test";

import { isValidGoldPricePayload } from "../src/lib/dahabna-prices.mjs";

const validPayload = {
  currency: "EGP",
  unit: "gram",
  gold_24k: { buy: 7280, sell: 7314 },
  gold_21k: { buy: 6370, sell: 6400 },
  gold_18k: { buy: 5460, sell: 5486 },
  last_updated: "2026-09-03T17:00:58.222Z",
};

test("accepts a complete payload with positive numeric prices", () => {
  assert.equal(isValidGoldPricePayload(validPayload), true);
});

test("rejects missing or non-object payloads", () => {
  assert.equal(isValidGoldPricePayload(null), false);
  assert.equal(isValidGoldPricePayload([]), false);
});

test("rejects a partial payload", () => {
  const { gold_18k: _omitted, ...partialPayload } = validPayload;
  assert.equal(isValidGoldPricePayload(partialPayload), false);
});

test("rejects zero, negative, non-numeric, and infinite values", () => {
  for (const invalidValue of [0, -1, "6370", Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.equal(
      isValidGoldPricePayload({
        ...validPayload,
        gold_21k: { ...validPayload.gold_21k, buy: invalidValue },
      }),
      false
    );
  }
});
