import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import {
  ANDROID_STORE_URL,
  DOWNLOAD_PATH,
  IOS_STORE_URL,
  detectStorePlatform,
  storeUrlFor,
} from "../../lib/dahabna-download.mjs";

const SITE_URL = "https://ibassemtarek.vercel.app";
const TITLE = "Download Dahabna | تحميل دهبنا";
const DESCRIPTION =
  "Get Dahabna, the free gold prices app for Egypt, on the App Store or Google Play. حمّل دهبنا وتابع أسعار الذهب في مصر لحظة بلحظة.";

// Phones are redirected to their store by the edge redirects in
// next.config.mjs and never load this page. It renders for desktop browsers,
// link-preview crawlers, and iPadOS (which hides behind a Mac UA) — the effect
// below catches that last case, plus any phone the edge rules missed.
export default function DahabnaDownloadPage() {
  useEffect(() => {
    const { userAgent, platform, maxTouchPoints = 0 } = window.navigator;
    const isIpadOs = platform === "MacIntel" && maxTouchPoints > 1;
    const storeUrl = isIpadOs
      ? IOS_STORE_URL
      : storeUrlFor(detectStorePlatform(userAgent));
    if (storeUrl) {
      window.location.replace(storeUrl);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Dahabna" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}${DOWNLOAD_PATH}`} />
        <meta
          property="og:image"
          content={`${SITE_URL}/images/egx-gold/og-banner.jpg`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Dahabna app showing live gold prices in Egypt"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/images/egx-gold/og-banner.jpg`}
        />
      </Head>
      <main className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 px-6 py-16 text-center text-dark dark:text-light">
        <h1 className="text-3xl font-bold">Download Dahabna</h1>
        <p className="max-w-md text-lg">
          Open this link on your phone to go straight to the store, or choose
          your platform below.
        </p>
        <p lang="ar" dir="rtl" className="max-w-md text-lg">
          افتح الرابط من موبايلك وهيوديك على المتجر مباشرة، أو اختار المتجر من
          هنا.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={IOS_STORE_URL}
            className="rounded-lg bg-dark px-6 py-3 font-semibold text-light dark:bg-light dark:text-dark"
          >
            App Store
          </a>
          <a
            href={ANDROID_STORE_URL}
            className="rounded-lg bg-dark px-6 py-3 font-semibold text-light dark:bg-light dark:text-dark"
          >
            Google Play
          </a>
        </div>
        <div className="flex gap-6">
          <Link href="/dahabna" className="underline underline-offset-4">
            Learn more about Dahabna
          </Link>
          <Link
            href="/ar/dahabna"
            lang="ar"
            className="underline underline-offset-4"
          >
            تعرّف على دهبنا
          </Link>
        </div>
      </main>
    </>
  );
}
