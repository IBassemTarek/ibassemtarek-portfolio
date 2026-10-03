import EgxGoldPage from "./egx-gold";
import { getDahabnaStaticProps } from "../lib/dahabna-prices.mjs";

export async function getStaticProps() {
  return getDahabnaStaticProps();
}

export default function DahabnaPage({ initialPrices }) {
  return <EgxGoldPage locale="en" initialPrices={initialPrices} />;
}
