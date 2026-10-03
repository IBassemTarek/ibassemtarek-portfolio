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

export const PRICES_ENDPOINT =
  "https://egypt-gold-scraper.egypt-gold-scraper.workers.dev/public/latest-prices";

// Build-time / ISR fetch so the landing pages ship real prices in their HTML
// (crawlers and AI agents that skip JavaScript would otherwise see nothing).
// Returns null on any failure; the page then falls back to its sample view.
export async function fetchLatestGoldPrices({ timeoutMs = 5000 } = {}) {
  try {
    const res = await fetch(PRICES_ENDPOINT, {
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return isValidGoldPricePayload(data) ? data : null;
  } catch {
    return null;
  }
}

// Shared getStaticProps body for /dahabna and /ar/dahabna. Prices move every
// minute, so the HTML is regenerated at most every 5 minutes on demand.
export async function getDahabnaStaticProps() {
  return {
    props: { initialPrices: await fetchLatestGoldPrices() },
    revalidate: 300,
  };
}
