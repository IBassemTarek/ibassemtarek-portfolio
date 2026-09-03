const REQUIRED_KARATS = ["gold_24k", "gold_21k", "gold_18k"];

const isPositiveFiniteNumber = (value) =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

export function isValidGoldPricePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return false;
  }

  return REQUIRED_KARATS.every((karat) => {
    const price = payload[karat];
    return (
      price &&
      typeof price === "object" &&
      isPositiveFiniteNumber(price.buy) &&
      isPositiveFiniteNumber(price.sell)
    );
  });
}
