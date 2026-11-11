import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import {
  ANDROID_STORE_URL,
  ARABIC_DOWNLOAD_PATH,
  DOWNLOAD_PATH,
  IOS_STORE_URL,
  detectStorePlatform,
  storeUrlFor,
} from "../../lib/dahabna-download.mjs";
import { DAHABNA_URL } from "../../lib/site-urls.mjs";

const SITE_URL = DAHABNA_URL;
const COPY = {
  en: {
    title: "Download Dahabna – App Store & Google Play",
    description:
      "Download Dahabna, the free gold prices app for Egypt, from the App Store or Google Play.",
    heading: "Download Dahabna",
    body: "Open this page on your phone to go straight to the right store, or choose your platform below.",
    back: "Learn more about Dahabna",
    switchLabel: "العربية",
  },
  ar: {
    title: "تحميل دهبنا – أسعار الذهب في مصر",
    description:
      "حمّل تطبيق دهبنا مجانًا من App Store أو Google Play وتابع سعر الذهب اليوم في مصر.",
    heading: "حمّل تطبيق دهبنا",
    body: "افتح الصفحة من موبايلك للانتقال مباشرةً إلى المتجر المناسب، أو اختر متجرك من الأسفل.",
    back: "تعرّف على دهبنا",
    switchLabel: "English",
  },
};

// Phones are redirected to their store by the edge redirects in
// next.config.mjs and never load this page. It renders for desktop browsers,
// link-preview crawlers, and iPadOS (which hides behind a Mac UA) — the effect
// below catches that last case, plus any phone the edge rules missed.
export default function DahabnaDownloadPage({ locale = "en" }) {
  const isArabic = locale === "ar";
  const copy = isArabic ? COPY.ar : COPY.en;
  const pageUrl = `${SITE_URL}${isArabic ? ARABIC_DOWNLOAD_PATH : DOWNLOAD_PATH}`;

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
        <title>{copy.title}</title>
        <meta name="description" content={copy.description} />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Dahabna" />
        <meta property="og:locale" content={isArabic ? "ar_EG" : "en_US"} />
        <meta property="og:locale:alternate" content={isArabic ? "en_US" : "ar_EG"} />
        <meta property="og:title" content={copy.title} />
        <meta property="og:description" content={copy.description} />
        <meta property="og:url" content={pageUrl} />
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
        <meta name="twitter:title" content={copy.title} />
        <meta name="twitter:description" content={copy.description} />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/images/egx-gold/og-banner.jpg`}
        />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}${DOWNLOAD_PATH}`} />
        <link rel="alternate" hrefLang="ar" href={`${SITE_URL}${ARABIC_DOWNLOAD_PATH}`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${DOWNLOAD_PATH}`} />
      </Head>
      <main
        lang={isArabic ? "ar" : "en"}
        dir={isArabic ? "rtl" : "ltr"}
        className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 px-6 py-16 text-center text-dark dark:text-light"
      >
        <h1 className="text-3xl font-bold">{copy.heading}</h1>
        <p className="max-w-md text-lg">{copy.body}</p>
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
          <Link href={isArabic ? "/ar" : "/"} className="underline underline-offset-4">
            {copy.back}
          </Link>
          <Link
            href={isArabic ? DOWNLOAD_PATH : ARABIC_DOWNLOAD_PATH}
            hrefLang={isArabic ? "en" : "ar"}
            className="underline underline-offset-4"
          >
            {copy.switchLabel}
          </Link>
        </div>
      </main>
    </>
  );
}
