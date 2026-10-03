import EgxGoldPage from "../egx-gold";
import { getDahabnaStaticProps } from "../../lib/dahabna-prices.mjs";

export async function getStaticProps() {
  return getDahabnaStaticProps();
}

export default function ArabicDahabnaPage({ initialPrices }) {
  return <EgxGoldPage locale="ar" initialPrices={initialPrices} />;
}
