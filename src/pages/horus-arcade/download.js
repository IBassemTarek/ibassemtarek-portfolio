import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Lilita_One, Tajawal } from "next/font/google";
import { useEffect } from "react";
import DownloadQr from "../../components/horus-arcade/DownloadQr";
import StoreBadges from "../../components/horus-arcade/StoreBadges";
import {
  ARABIC_DOWNLOAD_PATH,
  DOWNLOAD_PATH,
  IOS_STORE_URL,
  detectStorePlatform,
  storeUrlFor,
} from "../../lib/horus-arcade-download.mjs";
import { HORUS_ARCADE_URL } from "../../lib/site-urls.mjs";

const lilita = Lilita_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-ha-display",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "700", "800"],
  display: "swap",
  variable: "--font-ha-arabic",
});

const SITE_URL = HORUS_ARCADE_URL;
const OG_IMAGE_URL = `${SITE_URL}/images/horus-arcade/og-banner.jpg`;
const COPY = {
  en: {
    title: "Download Horus Arcade – 23 Games, Free",
    description:
      "Download Horus Arcade, 23 quick arcade, puzzle and brain games in one neon Egyptian arcade, free on the App Store and Google Play.",
    heading: "23 games. One free download.",
    body: "Open this page on your phone to go straight to the right store, or choose your store below.",
    qr: "Scan with your phone",
    back: "Take a tour of the arcade",
    switchLabel: "العربية",
  },
  ar: {
    title: "تحميل هورس أركيد – 23 لعبة مجانية",
    description:
      "حمّل هورس أركيد مجانًا من App Store أو Google Play واستمتع بـ23 لعبة أركيد وألغاز وذكاء.",
    heading: "23 لعبة. تحميل واحد مجاني.",
    body: "افتح الصفحة من موبايلك للانتقال مباشرةً إلى المتجر المناسب، أو اختر متجرك من الأسفل.",
    qr: "امسح الكود بالموبايل",
    back: "ادخل صالة هورس أركيد",
    switchLabel: "English",
  },
};

// Phones are redirected to their store by the edge redirects in
// next.config.mjs and never load this page. It renders for desktop browsers,
// link-preview crawlers, and iPadOS (which hides behind a Mac UA) — the effect
// below catches that last case, plus any phone the edge rules missed.
export default function HorusArcadeDownloadPage({ locale = "en" }) {
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
        <meta name="theme-color" content="#0a0820" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Horus Arcade" />
        <meta property="og:locale" content={isArabic ? "ar_EG" : "en_US"} />
        <meta property="og:locale:alternate" content={isArabic ? "en_US" : "ar_EG"} />
        <meta property="og:title" content={copy.title} />
        <meta property="og:description" content={copy.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Horus Arcade: the Eye of Horus surrounded by neon game tiles over pyramids"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={copy.title} />
        <meta name="twitter:description" content={copy.description} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}${DOWNLOAD_PATH}`} />
        <link rel="alternate" hrefLang="ar" href={`${SITE_URL}${ARABIC_DOWNLOAD_PATH}`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${DOWNLOAD_PATH}`} />
      </Head>
      <main
        lang={isArabic ? "ar" : "en"}
        dir={isArabic ? "rtl" : "ltr"}
        className={`ha ${lilita.variable} ${tajawal.variable} ${isArabic ? "ha-arabic" : ""} relative flex min-h-[80vh] w-full flex-col items-center justify-center gap-6 overflow-hidden px-6 py-16 text-center`}
      >
        <div className="ha-floor pointer-events-none absolute inset-x-0 bottom-0 h-48" />
        <Image
          src="/images/horus-arcade/icon-512.png"
          alt={isArabic ? "أيقونة تطبيق هورس أركيد" : "Horus Arcade app icon"}
          width={512}
          height={512}
          priority
          sizes="128px"
          className="ha-icon relative h-32 w-32 rounded-[1.8rem]"
        />
        <Image
          src="/images/horus-arcade/marquee.webp"
          alt="Horus Arcade"
          width={1000}
          height={326}
          sizes="(max-width: 639px) 80vw, 420px"
          className="relative h-auto w-[420px] max-w-full drop-shadow-[0_0_24px_rgba(255,62,200,0.45)]"
        />
        <h1 className="ha-display relative text-4xl text-white sm:text-3xl">
          {copy.heading}
        </h1>
        <p className="relative max-w-md text-lg">{copy.body}</p>
        <StoreBadges className="relative justify-center" />
        <div className="relative md:hidden">
          <DownloadQr caption={copy.qr} />
        </div>
        <div className="relative flex flex-wrap justify-center gap-5">
          <Link
            href={isArabic ? "/ar" : "/"}
            className="font-bold text-[#29e6ff] underline underline-offset-4"
          >
            {copy.back}
          </Link>
          <Link
            href={isArabic ? DOWNLOAD_PATH : ARABIC_DOWNLOAD_PATH}
            hrefLang={isArabic ? "en" : "ar"}
            className="font-bold text-[#f5c04a] underline underline-offset-4"
          >
            {copy.switchLabel}
          </Link>
        </div>
      </main>

      <style jsx global>{`
        .ha {
          background:
            radial-gradient(700px 400px at 50% 20%, rgba(255, 62, 200, 0.2), transparent 70%),
            linear-gradient(180deg, #03092a, #100d2b);
          color: #c9c6e0;
          color-scheme: dark;
          --ha-muted: #8f8ab0;
        }
        .ha-display {
          font-family: var(--font-ha-display), sans-serif;
        }
        .ha-arabic,
        .ha-arabic .ha-display {
          font-family: var(--font-ha-arabic), sans-serif;
        }
        .ha-icon {
          box-shadow: 0 0 0 2px rgba(245, 192, 74, 0.7), 0 0 50px rgba(245, 192, 74, 0.35);
        }
        .ha-floor {
          background-image:
            linear-gradient(rgba(255, 62, 200, 0.55) 2px, transparent 2px),
            linear-gradient(90deg, rgba(41, 230, 255, 0.45) 2px, transparent 2px);
          background-size: 64px 64px;
          transform: perspective(320px) rotateX(62deg);
          transform-origin: bottom;
          mask-image: linear-gradient(0deg, black 10%, transparent 95%);
          -webkit-mask-image: linear-gradient(0deg, black 10%, transparent 95%);
          opacity: 0.5;
        }
        .ha-store {
          background: linear-gradient(180deg, rgba(28, 23, 64, 0.95), rgba(10, 8, 32, 0.95));
          border: 1px solid rgba(245, 192, 74, 0.55);
          color: #fff;
          transition: transform 0.2s ease, box-shadow 0.25s ease;
        }
        .ha-store:hover,
        .ha-store:focus-visible {
          transform: translateY(-3px);
          box-shadow: 0 0 28px rgba(245, 192, 74, 0.45);
        }
      `}</style>
    </>
  );
}
