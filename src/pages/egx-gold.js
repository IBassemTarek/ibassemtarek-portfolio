import Head from "next/head";
import Image from "next/image";
import { animate, motion, useReducedMotion } from "framer-motion";
import {
  Cormorant_Garamond,
  Noto_Naskh_Arabic,
  Tajawal,
} from "next/font/google";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { isValidGoldPricePayload } from "../lib/dahabna-prices.mjs";

// display:swap → text paints immediately in a fallback face, then swaps (no
// invisible-text FCP block). Only the English display face (used in the
// above-the-fold H1) is preloaded; the Arabic/body faces load on demand to keep
// the critical request count small.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-egx-display",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
  variable: "--font-egx-body",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["600", "700"],
  display: "swap",
  preload: false,
  variable: "--font-egx-arabic",
});

const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.egxgold.app";
const IOS_URL =
  "https://apps.apple.com/us/app/egx-gold-%D8%A3%D8%B3%D8%B9%D8%A7%D8%B1-%D8%A7%D9%84%D8%B0%D9%87%D8%A8-%D8%A7%D9%84%D9%8A%D9%88%D9%85/id6762029452";
const FACEBOOK_URL = "https://www.facebook.com/dahabnaapp";
const INSTAGRAM_URL = "https://www.instagram.com/dahabnaapp/";
// App Store numeric id (from IOS_URL). Used for Apple's native Smart App Banner
// meta tag, which shows "OPEN" if the app is installed (iOS Safari only).
const IOS_APP_ID = "6762029452";

// Public, no-auth endpoint on the Cloudflare Worker backend that returns the
// latest karat buy/sell snapshot. See egypt-gold-scraper: GET /public/latest-prices.
const PRICES_ENDPOINT =
  "https://egypt-gold-scraper.egypt-gold-scraper.workers.dev/public/latest-prices";
const PRIVACY_POLICY_URL =
  "https://egypt-gold-scraper.egypt-gold-scraper.workers.dev/privacy-policy";
const SUPPORT_EMAIL = "ibassemtarek@gmail.com";

// Fallback shown before the live snapshot arrives (or if the request fails).
// Labelled as a sample in the UI so nothing implies these exact numbers are
// real. `spark` is a decorative shape per karat, kept for both live and sample.
const SAMPLE_KARATS = [
  { key: "24", sell: 5460, buy: 5390, spark: [58, 52, 60, 46, 50, 38, 30, 22] },
  { key: "21", sell: 4778, buy: 4715, spark: [62, 56, 58, 48, 52, 40, 36, 28] },
  { key: "18", sell: 4095, buy: 4040, spark: [64, 60, 55, 58, 50, 46, 42, 34] },
];

const COPY = {
  en: {
    dir: "ltr",
    lang: "en",
    numberLocale: "en-US",
    brand: "Dahabna",
    slogan: "Your gold. Your future.",
    heroTitle: "Gold prices in Egypt, always within reach.",
    heroSubtitle:
      "Follow the Egyptian gold market with clear, up-to-date information for calmer everyday decisions.",
    heroBody:
      "Track 24k, 21k, and 18k gold, see live buying and selling prices, monitor bullion by weight, and keep your own savings plan moving with clarity.",
    pricePanel: {
      label: "Gold price now",
      live: "Live",
      sample: "Sample",
      unit: "EGP / gram",
      karatWord: "karat",
      sell: "Sell",
      buy: "Buy",
      spread: "Spread",
      liveNote: "Live from the Egyptian market — updated {time}.",
      sampleNote: "Sample view — live prices open inside Dahabna.",
    },
    featuresLabel: "Why people keep this app close",
    features: [
      {
        eyebrow: "Live market view",
        title: "Track 24k, 21k, and 18k gold in real time.",
        detail:
          "Follow buying and selling prices across the Egyptian market without the noise.",
      },
      {
        eyebrow: "Bullion intelligence",
        title: "Monitor bullion prices by weight and movement.",
        detail:
          "Spot shifts faster with a view that stays focused on what matters to buyers and investors.",
      },
      {
        eyebrow: "Personal planning",
        title: "Plan your savings and investment goals.",
        detail:
          "Use informational calculator scenarios to explore marriage, investment, or future-saving plans.",
      },
    ],
    highlightsLabel: "Built for everyday confidence",
    highlights: [
      "Arabic & English",
      "Works offline",
      "Price charts",
      "Prices without sign-in",
      "Portfolio stays local",
    ],
    privacyLabel: "Privacy promise",
    privacyText:
      "Browse prices without an account. Price alerts require sign-in. Portfolio and zakat records stay on your device. Advertising partners may process device and usage identifiers, and optional analytics runs only when you enable it.",
    disclosure: {
      label: "Important information",
      commercial:
        "Dahabna is free to download, contains ads, and offers an optional Premium subscription. Store pricing may vary and is shown before purchase.",
      advice:
        "Prices, calculations, and projections are indicative and provided for information only. They are not financial, investment, tax, or religious advice.",
      privacy: "Read the privacy policy",
      contact: "Developer contact",
      address:
        "332 Mahmoudia Canal, Royal House, Moharram Bek, Alexandria, Alexandria 21522, Egypt",
    },
    social: {
      label: "Stay connected",
      heading: "Follow Dahabna",
      body: "Keep up with gold market updates and the latest from the app.",
      facebook: "Facebook",
      instagram: "Instagram",
    },
    chooseLabel: "Choose your device",
    chooseHeading: "Download Dahabna where you use it.",
    chooseBody: "Choose your platform and continue to the right store.",
    banner: {
      price: "Free",
      tagline: "Live gold prices — 24k, 21k & 18k.",
      cta: "Get",
    },
    share: {
      button: "Share page",
      idle: "Share this page",
      shared: "Shared successfully.",
      copied: "Share text copied.",
      error: "Sharing failed. Try again.",
    },
    stores: {
      ios: {
        label: "iPhone / iPad",
        title: "Continue with the App Store",
        subtitle: "For iOS users who want the full Dahabna experience.",
      },
      android: {
        label: "Android phones",
        title: "Continue with Google Play",
        subtitle: "For Android users who want live gold tracking on the go.",
      },
      cta: "Open store",
    },
  },
  ar: {
    dir: "rtl",
    lang: "ar",
    numberLocale: "ar-EG",
    brand: "دهبنا",
    slogan: "ذهبك . مستقبلك",
    heroTitle: "أسعار الذهب في مصر، دائمًا في متناولك.",
    heroSubtitle:
      "تابع سوق الذهب المصري بمعلومات واضحة ومحدّثة تساعدك تفهم حركة السوق بهدوء.",
    heroBody:
      "تابع الذهب عيار 24 و21 و18، واعرف أسعار البيع والشراء لحظيًا، وراقب أسعار السبائك حسب الوزن، وخطّط لادّخارك بوضوح.",
    pricePanel: {
      label: "سعر الذهب الآن",
      live: "مباشر",
      sample: "عرض توضيحي",
      unit: "جنيه / جرام",
      karatWord: "عيار",
      sell: "بيع",
      buy: "شراء",
      spread: "الفارق",
      liveNote: "مباشر من السوق المصري — آخر تحديث {time}.",
      sampleNote: "عرض توضيحي — الأسعار المباشرة داخل دهبنا.",
    },
    featuresLabel: "لماذا يبقى هذا التطبيق قريبًا منك",
    features: [
      {
        eyebrow: "متابعة لحظية للسوق",
        title: "تابع الذهب عيار 24 و21 و18 في الوقت الحقيقي.",
        detail: "اعرف أسعار البيع والشراء في السوق المصري بدون تشويش.",
      },
      {
        eyebrow: "ذكاء السبائك",
        title: "راقب أسعار السبائك حسب الوزن والحركة.",
        detail: "اكتشف التغيّرات أسرع بواجهة تركّز على ما يهمّ المشتري والمستثمر.",
      },
      {
        eyebrow: "تخطيط شخصي",
        title: "خطّط لأهداف ادّخارك واستثمارك.",
        detail:
          "استخدم سيناريوهات الحاسبة التوضيحية لاستكشاف خطط الزواج أو الاستثمار أو الادّخار المستقبلي.",
      },
    ],
    highlightsLabel: "مصمّم ليمنحك الثقة كل يوم",
    highlights: [
      "عربي وإنجليزي",
      "يعمل بدون إنترنت",
      "رسوم بيانية للأسعار",
      "الأسعار بدون تسجيل",
      "المحفظة محفوظة محليًا",
    ],
    privacyLabel: "وعد الخصوصية",
    privacyText:
      "تقدر تتابع الأسعار من غير حساب، بينما تنبيهات الأسعار تحتاج تسجيل دخول. بيانات المحفظة والزكاة تفضل محفوظة على جهازك. قد يعالج شركاء الإعلانات معرّفات الجهاز وبيانات الاستخدام، ولا تعمل التحليلات الاختيارية إلا بعد موافقتك.",
    disclosure: {
      label: "معلومات مهمة",
      commercial:
        "تحميل دهبنا مجاني، ويحتوي التطبيق على إعلانات، كما يوفّر اشتراك Premium اختياريًا. قد تختلف أسعار المتجر وتظهر لك قبل الشراء.",
      advice:
        "الأسعار والحسابات والتوقعات تقديرية ولغرض المعلومات فقط، وليست نصيحة مالية أو استثمارية أو ضريبية أو دينية.",
      privacy: "اقرأ سياسة الخصوصية",
      contact: "تواصل مع المطوّر",
      address:
        "٣٣٢ ترعة المحمودية، رويال هاوس، محرم بك، الإسكندرية ٢١٥٢٢، مصر",
    },
    social: {
      label: "ابقَ على تواصل",
      heading: "تابع دهبنا",
      body: "تابع مستجدات سوق الذهب وكل جديد في التطبيق.",
      facebook: "فيسبوك",
      instagram: "إنستجرام",
    },
    chooseLabel: "اختر جهازك",
    chooseHeading: "حمّل دهبنا على جهازك.",
    chooseBody: "اختر نظام جهازك لتنتقل إلى المتجر المناسب.",
    banner: {
      price: "مجانًا",
      tagline: "أسعار الذهب مباشرة — عيار 24 و21 و18.",
      cta: "تحميل",
    },
    share: {
      button: "شارك الصفحة",
      idle: "شارك هذه الصفحة",
      shared: "تمت المشاركة بنجاح.",
      copied: "تم نسخ نص المشاركة.",
      error: "فشلت المشاركة. حاول مرة أخرى.",
    },
    stores: {
      ios: {
        label: "iPhone / iPad",
        title: "المتابعة عبر App Store",
        subtitle: "لمستخدمي iOS الذين يريدون تجربة دهبنا الكاملة.",
      },
      android: {
        label: "هواتف Android",
        title: "المتابعة عبر Google Play",
        subtitle: "لمستخدمي Android الذين يريدون متابعة الذهب أينما كانوا.",
      },
      cta: "افتح المتجر",
    },
  },
};

const getStoreCards = (copy) => [
  {
    href: IOS_URL,
    icon: "/images/egx-gold/app-store.png",
    alt: "Apple App Store",
    ...copy.stores.ios,
    accent: "egx-store-ios",
  },
  {
    href: ANDROID_URL,
    icon: "/images/egx-gold/google-play.png",
    alt: "Google Play",
    ...copy.stores.android,
    accent: "egx-store-android",
  },
];

function timeAgo(iso, isArabic) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) {
    return "";
  }

  const rtf = new Intl.RelativeTimeFormat(isArabic ? "ar-EG" : "en", {
    numeric: "auto",
  });
  const diffMin = Math.max(0, Math.round((Date.now() - then) / 60000));

  if (diffMin < 60) {
    return rtf.format(-diffMin, "minute");
  }
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) {
    return rtf.format(-diffHr, "hour");
  }
  return rtf.format(-Math.round(diffHr / 24), "day");
}

function detectPlatform() {
  if (typeof window === "undefined") {
    return "desktop";
  }

  const { userAgent, platform, maxTouchPoints = 0 } = window.navigator;

  if (/Android/i.test(userAgent)) {
    return "android";
  }

  if (
    /(iPhone|iPad|iPod)/i.test(userAgent) ||
    (platform === "MacIntel" && maxTouchPoints > 1)
  ) {
    return "ios";
  }

  return "desktop";
}

function subscribeToPlatform() {
  return () => {};
}

// True only for real mobile Safari, where Apple's native Smart App Banner
// renders. Other iOS browsers/webviews (Chrome, Firefox, Edge, in-app) don't
// show it, so they get the custom banner instead.
function isIosSafari() {
  if (typeof window === "undefined") {
    return false;
  }
  const ua = window.navigator.userAgent;
  return (
    /Version\/[\d.]+.*Safari/.test(ua) &&
    !/(CriOS|FxiOS|EdgiOS|OPiOS|GSA|FBAN|FBAV|Instagram|Line|MicroMessenger)/.test(
      ua
    )
  );
}

const BRAND_LOGO_SRC = "/images/egx-gold/dahabna-logo.png";
const BRAND_LOGO_FALLBACK = "/images/egx-gold/app-icon.jpg";

// next/image auto-serves a small webp/avif at the displayed size instead of the
// full ~800KB source PNG (big LCP/bandwidth win). Falls back to the app icon if
// the brand logo is ever missing.
function BrandLogo({ alt, className, priority = false, sizes = "160px" }) {
  const [src, setSrc] = useState(BRAND_LOGO_SRC);

  return (
    <Image
      src={src}
      alt={alt}
      width={160}
      height={160}
      sizes={sizes}
      priority={priority}
      onError={() => {
        if (src !== BRAND_LOGO_FALLBACK) {
          setSrc(BRAND_LOGO_FALLBACK);
        }
      }}
      className={className}
    />
  );
}

function AnimatedNumber({ value, locale, reduce }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    const format = (input) =>
      Math.round(input).toLocaleString(locale, { maximumFractionDigits: 0 });

    if (reduce) {
      node.textContent = format(value);
      return undefined;
    }

    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });

    return () => controls.stop();
  }, [value, locale, reduce]);

  return <span ref={ref}>0</span>;
}

function Sparkline({ points, className = "" }) {
  const width = 120;
  const height = 40;
  const step = width / (points.length - 1);
  const path = points
    .map((point, index) => `${index * step},${point}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M13.6 22v-9h3l.45-3.5H13.6V7.27c0-1.01.28-1.7 1.73-1.7h1.85V2.45a24.8 24.8 0 0 0-2.7-.14c-2.67 0-4.5 1.63-4.5 4.62V9.5H7v3.5h2.98v9h3.62Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function SocialLink({ href, label, icon, accent }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label}: @dahabnaapp`}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="egx-social-link group flex min-w-0 items-center gap-3 rounded-2xl p-3.5"
    >
      <span
        className={`egx-social-icon egx-social-icon-${accent} flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-[0_8px_20px_var(--egx-shadow)]`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1 font-[var(--font-egx-body)]">
        <span className="block text-sm font-semibold text-[color:var(--egx-ink)]">
          {label}
        </span>
        <span className="block truncate text-xs text-[color:var(--egx-ink-mute)]">
          @dahabnaapp
        </span>
      </span>
      <span
        aria-hidden="true"
        className="text-sm text-[color:var(--egx-gold-strong)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </motion.a>
  );
}

function StoreCard({ card, cta, arrow, priority = false }) {
  return (
    <motion.a
      href={card.href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`group relative block overflow-hidden rounded-[1.75rem] p-[1px] ${card.accent} shadow-[0_18px_50px_var(--egx-shadow)]`}
    >
      <div className="relative h-full rounded-[calc(1.75rem-1px)] bg-[color:var(--egx-card)] p-6 backdrop-blur-xl sm:p-5">
        <div className="egx-store-glow pointer-events-none absolute inset-0 opacity-80" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-6 flex items-center justify-between gap-4 sm:mb-5 sm:flex-col sm:items-start">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--egx-ink-mute)]">
                {card.label}
              </p>
              <h3 className="mt-2.5 max-w-xs text-xl font-semibold leading-tight text-[color:var(--egx-ink)] sm:max-w-none">
                {card.title}
              </h3>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[color:var(--egx-card-border)] bg-white p-2.5 shadow-[0_12px_28px_var(--egx-shadow)] sm:self-end">
              <Image
                src={card.icon}
                alt={card.alt}
                width={48}
                height={48}
                className="h-auto w-full"
                priority={priority}
              />
            </div>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[color:var(--egx-ink-soft)] sm:max-w-none">
            {card.subtitle}
          </p>

          <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-[color:var(--egx-gold-strong)] sm:mt-6">
            <span>{cta}</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
            >
              {arrow}
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

// Custom "smart app banner": a compact, in-flow bar at the top of the page
// shown on Android and non-Safari iOS browsers (where Apple's native banner
// isn't available). Not dismissible. Links to the correct store per platform.
function AppBanner({ copy, brand, storeUrl, reduce }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto mb-4 flex max-w-7xl items-center gap-3 rounded-2xl border border-[color:var(--egx-card-border)] bg-[color:var(--egx-card)] px-3.5 py-2.5 shadow-[0_10px_30px_var(--egx-shadow)] backdrop-blur-xl"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[color:var(--egx-card-border)] bg-[color:var(--egx-logo-bg)]">
        <BrandLogo alt={brand} className="h-full w-full object-contain p-1" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-[var(--font-egx-body)] text-sm font-semibold text-[color:var(--egx-ink)]">
          {brand}
        </p>
        <p className="truncate font-[var(--font-egx-body)] text-xs text-[color:var(--egx-ink-soft)]">
          <span className="font-semibold text-[color:var(--egx-gold-strong)]">
            {copy.banner.price}
          </span>
          {" · "}
          {copy.banner.tagline}
        </p>
      </div>
      <a
        href={storeUrl}
        target="_blank"
        rel="noreferrer"
        className="egx-share shrink-0 rounded-full px-5 py-2 font-[var(--font-egx-body)] text-sm font-semibold"
      >
        {copy.banner.cta}
      </a>
    </motion.div>
  );
}

export default function EgxGoldPage({ locale = "en" } = {}) {
  const prefersReducedMotion = useReducedMotion();
  const platform = useSyncExternalStore(
    subscribeToPlatform,
    detectPlatform,
    () => "desktop"
  );
  const [shareState, setShareState] = useState("idle");
  const [activeKarat, setActiveKarat] = useState("21");
  const [livePrices, setLivePrices] = useState(null);

  const isArabicPage = locale === "ar";
  const copy = isArabicPage ? COPY.ar : COPY.en;
  const dirFactor = isArabicPage ? -1 : 1;
  const storeCards = getStoreCards(copy);

  const canonicalUrl = isArabicPage
    ? "https://ibassemtarek.vercel.app/ar/dahabna"
    : "https://ibassemtarek.vercel.app/dahabna";
  const pageTitle = isArabicPage
    ? "دهبنا | أسعار الذهب في مصر اليوم"
    : "Dahabna | Live Gold Prices in Egypt";
  const pageDescription = copy.heroBody;

  // Pull the latest real prices from the public Worker endpoint, then refresh
  // every 60s. Any failure leaves the sample fallback in place — the page never
  // breaks if the backend is unreachable.
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 8000);

      try {
        const res = await fetch(PRICES_ENDPOINT, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!res.ok) {
          if (!cancelled) setLivePrices(null);
          return;
        }
        const data = await res.json();
        if (!cancelled) {
          setLivePrices(isValidGoldPricePayload(data) ? data : null);
        }
      } catch {
        if (!cancelled) setLivePrices(null);
      } finally {
        window.clearTimeout(timeoutId);
      }
    };

    load();
    const intervalId = window.setInterval(load, 60000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (shareState === "idle") {
      return undefined;
    }

    const resetTimer = window.setTimeout(() => {
      setShareState("idle");
    }, 2400);

    return () => window.clearTimeout(resetTimer);
  }, [shareState]);

  const handleShare = async () => {
    const shareText = `${copy.brand} | ${copy.heroTitle}

${copy.heroSubtitle}

${copy.brand}: ${canonicalUrl}
Google Play: ${ANDROID_URL}
App Store: ${IOS_URL}
Facebook: ${FACEBOOK_URL}
Instagram: ${INSTAGRAM_URL}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${copy.brand} | ${copy.heroTitle}`,
          text: shareText,
          url: canonicalUrl,
        });
        setShareState("shared");
        return;
      }

      await navigator.clipboard.writeText(shareText);
      setShareState("copied");
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }

      setShareState("error");
    }
  };

  // Show the custom banner on Android, and on iOS only when the native Apple
  // Smart App Banner won't render (i.e. non-Safari iOS browsers). Desktop: none.
  const showAppBanner =
    platform === "android" || (platform === "ios" && !isIosSafari());
  const bannerStoreUrl = platform === "ios" ? IOS_URL : ANDROID_URL;
  const shareStatusLabel = copy.share[shareState] ?? copy.share.idle;

  const isLive = isValidGoldPricePayload(livePrices);
  const karats = SAMPLE_KARATS.map((karat) => {
    const live = isLive ? livePrices[`gold_${karat.key}k`] : null;
    return live ? { ...karat, sell: live.sell, buy: live.buy } : karat;
  });
  const priceStatusLabel = isLive
    ? copy.pricePanel.live
    : copy.pricePanel.sample;
  const priceNote = isLive
    ? copy.pricePanel.liveNote.replace(
        "{time}",
        timeAgo(livePrices.last_updated, isArabicPage)
      )
    : copy.pricePanel.sampleNote;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {/* Apple native Smart App Banner (iOS Safari). Shows "OPEN" if the app
            is installed, otherwise routes to the App Store. */}
        <meta name="apple-itunes-app" content={`app-id=${IOS_APP_ID}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:image"
          content="https://ibassemtarek.vercel.app/images/egx-gold/app-icon.jpg"
        />
        <link rel="canonical" href={canonicalUrl} />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://ibassemtarek.vercel.app/dahabna"
        />
        <link
          rel="alternate"
          hrefLang="ar"
          href="https://ibassemtarek.vercel.app/ar/dahabna"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://ibassemtarek.vercel.app/dahabna"
        />
        <meta property="og:locale" content={isArabicPage ? "ar_EG" : "en_US"} />
        <meta
          property="og:locale:alternate"
          content={isArabicPage ? "en_US" : "ar_EG"}
        />
      </Head>

      <main
        lang={copy.lang}
        dir={copy.dir}
        className={`egx ${cormorant.variable} ${tajawal.variable} ${notoNaskhArabic.variable} ${
          isArabicPage ? "font-[var(--font-egx-arabic)]" : ""
        } w-full px-10 pb-20 pt-6 lg:px-8 md:px-6 sm:px-4`}
      >
        {showAppBanner && (
          <AppBanner
            copy={copy}
            brand={copy.brand}
            storeUrl={bannerStoreUrl}
            reduce={prefersReducedMotion}
          />
        )}

        <section className="egx-hero relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-[color:var(--egx-border)] shadow-[0_40px_120px_var(--egx-shadow)]">
          <div className="egx-grid pointer-events-none absolute inset-0" />
          <motion.div
            aria-hidden="true"
            className="egx-blob-gold pointer-events-none absolute h-72 w-72 rounded-full blur-3xl ltr:left-[-8%] rtl:right-[-8%]"
            style={{ top: "14%" }}
            animate={
              prefersReducedMotion
                ? undefined
                : { y: [0, -18, 0], opacity: [0.7, 0.95, 0.7] }
            }
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="egx-blob-cyan pointer-events-none absolute h-80 w-80 rounded-full blur-3xl ltr:right-[-8%] rtl:left-[-8%]"
            style={{ bottom: "8%" }}
            animate={
              prefersReducedMotion
                ? undefined
                : { y: [0, 20, 0], opacity: [0.6, 0.85, 0.6] }
            }
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* CSS-driven entrance (not framer): the hero content is present and
              paints on the first frame instead of waiting for JS hydration. */}
          <div className="egx-rise relative z-10 px-14 pb-14 pt-16 xl:px-10 lg:px-8 md:px-6 md:pb-10 md:pt-12">
            <div className="grid items-start gap-12 lg:gap-10">
              {/* Hero heading + logo */}
              <div className="grid grid-cols-[minmax(0,150px)_1fr] items-center gap-8 md:grid-cols-1 md:gap-6">
                <motion.div
                  initial={false}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                  className="egx-logo relative mx-auto flex h-36 w-36 items-center justify-center rounded-[1.9rem] p-4"
                >
                  <motion.div
                    aria-hidden="true"
                    className="egx-logo-ring absolute inset-0 rounded-[1.9rem]"
                    animate={
                      prefersReducedMotion ? undefined : { rotate: 360 }
                    }
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <BrandLogo
                    alt={isArabicPage ? "شعار تطبيق دهبنا" : "Dahabna app logo"}
                    priority
                    className="relative z-10 h-full w-full rounded-[1.2rem] object-contain drop-shadow-[0_8px_20px_var(--egx-shadow)]"
                  />
                </motion.div>

                <div className="max-w-4xl">
                  <span
                    className={`egx-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-semibold ${
                      isArabicPage
                        ? "font-[var(--font-egx-arabic)] text-sm"
                        : "text-[11px] uppercase tracking-[0.28em]"
                    }`}
                  >
                    <span className="egx-pulse relative flex h-2 w-2">
                      <span className="egx-pulse-ping absolute inline-flex h-full w-full rounded-full opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                    </span>
                    {copy.slogan}
                  </span>
                  <h1 className="mt-4 max-w-4xl font-[var(--font-egx-display)] text-6xl font-semibold leading-[0.95] text-[color:var(--egx-ink)] xl:text-5xl md:text-4xl sm:text-[2rem]">
                    {isArabicPage ? (
                      <span className="font-[var(--font-egx-arabic)] leading-[1.15]">
                        {copy.heroTitle}
                      </span>
                    ) : (
                      copy.heroTitle
                    )}
                  </h1>
                  <p
                    className={`mt-5 max-w-3xl text-2xl font-semibold leading-relaxed text-[color:var(--egx-gold-strong)] [text-wrap:balance] md:text-xl sm:text-lg ${
                      isArabicPage
                        ? "font-[var(--font-egx-arabic)]"
                        : "font-[var(--font-egx-body)]"
                    }`}
                  >
                    {copy.heroSubtitle}
                  </p>
                  <p className="mt-6 max-w-3xl font-[var(--font-egx-body)] text-base leading-8 text-[color:var(--egx-ink-soft)] md:text-[15px]">
                    {copy.heroBody}
                  </p>
                </div>
              </div>

              {/* Content grid */}
              <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                <div className="grid gap-6">
                  {/* Live price preview */}
                  <div className="egx-card relative overflow-hidden rounded-[1.75rem] p-6 sm:p-5">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--egx-ink-mute)]">
                          {copy.pricePanel.label}
                        </p>
                        <p className="mt-1 font-[var(--font-egx-body)] text-xs text-[color:var(--egx-ink-soft)]">
                          {copy.pricePanel.unit}
                        </p>
                      </div>
                      <span className="egx-live inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold">
                        <span className="egx-pulse relative flex h-2 w-2">
                          <span className="egx-pulse-ping absolute inline-flex h-full w-full rounded-full opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                        </span>
                        {priceStatusLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-1">
                      {karats.map((karat) => {
                        const isActive = activeKarat === karat.key;
                        const spread = karat.sell - karat.buy;
                        return (
                          <button
                            type="button"
                            key={karat.key}
                            onClick={() => setActiveKarat(karat.key)}
                            aria-pressed={isActive}
                            className={`egx-karat group relative overflow-hidden rounded-2xl p-4 text-start transition-all duration-300 ${
                              isActive ? "egx-karat-active" : ""
                            }`}
                          >
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="font-[var(--font-egx-body)] text-sm font-semibold text-[color:var(--egx-ink)]">
                                {isArabicPage
                                  ? `${copy.pricePanel.karatWord} ${karat.key}`
                                  : `${karat.key}${copy.pricePanel.karatWord[0]}`}
                              </span>
                              <Sparkline
                                points={karat.spark}
                                className="h-5 w-12 text-[color:var(--egx-gold-strong)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                              />
                            </div>
                            <div className="mt-3 flex items-baseline gap-1">
                              <span className="font-[var(--font-egx-display)] text-2xl font-semibold text-[color:var(--egx-ink)] md:text-xl">
                                <AnimatedNumber
                                  value={karat.sell}
                                  locale={copy.numberLocale}
                                  reduce={prefersReducedMotion}
                                />
                              </span>
                              <span className="text-[10px] uppercase tracking-wide text-[color:var(--egx-ink-mute)]">
                                {copy.pricePanel.sell}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between font-[var(--font-egx-body)] text-[11px] text-[color:var(--egx-ink-soft)]">
                              <span>
                                {copy.pricePanel.buy}{" "}
                                <AnimatedNumber
                                  value={karat.buy}
                                  locale={copy.numberLocale}
                                  reduce={prefersReducedMotion}
                                />
                              </span>
                              <span className="egx-spread rounded-full px-2 py-0.5 font-semibold">
                                {copy.pricePanel.spread}{" "}
                                {spread.toLocaleString(copy.numberLocale)}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-4 font-[var(--font-egx-body)] text-[11px] leading-5 text-[color:var(--egx-ink-mute)]">
                      {priceNote}
                    </p>
                  </div>

                  {/* Feature cards */}
                  <div className="egx-card relative overflow-hidden rounded-[1.75rem] p-6 sm:p-5">
                    <p className="font-[var(--font-egx-body)] text-[11px] uppercase tracking-[0.28em] text-[color:var(--egx-cyan-strong)]">
                      {copy.featuresLabel}
                    </p>
                    <div className="mt-5 grid gap-4">
                      {copy.features.map((card, index) => (
                        <motion.div
                          key={card.eyebrow}
                          initial={
                            prefersReducedMotion
                              ? false
                              : { opacity: 0, x: 16 * dirFactor }
                          }
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.5, delay: index * 0.08 }}
                          className="egx-feature rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
                        >
                          <p className="font-[var(--font-egx-body)] text-[10px] uppercase tracking-[0.28em] text-[color:var(--egx-gold-strong)]">
                            {card.eyebrow}
                          </p>
                          <h2 className="mt-2.5 text-lg font-semibold text-[color:var(--egx-ink)]">
                            {card.title}
                          </h2>
                          <p className="mt-2 font-[var(--font-egx-body)] text-sm leading-7 text-[color:var(--egx-ink-soft)]">
                            {card.detail}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="grid gap-6">
                  <div className="egx-card-gold rounded-[1.75rem] p-6 sm:p-5">
                    <p className="font-[var(--font-egx-body)] text-[11px] uppercase tracking-[0.28em] text-[color:var(--egx-gold-strong)]">
                      {copy.highlightsLabel}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {copy.highlights.map((highlight) => (
                        <motion.span
                          key={highlight}
                          whileHover={
                            prefersReducedMotion ? undefined : { y: -2 }
                          }
                          className="egx-chip rounded-full px-4 py-2 font-[var(--font-egx-body)] text-sm font-medium"
                        >
                          {highlight}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="egx-card rounded-[1.75rem] p-6 sm:p-5">
                    <p className="font-[var(--font-egx-body)] text-[11px] uppercase tracking-[0.28em] text-[color:var(--egx-cyan-strong)]">
                      {copy.privacyLabel}
                    </p>
                    <p className="mt-3.5 font-[var(--font-egx-body)] text-base leading-8 text-[color:var(--egx-ink-soft)]">
                      {copy.privacyText}
                    </p>
                  </div>

                  <div className="egx-card rounded-[1.75rem] p-6 sm:p-5">
                    <p className="font-[var(--font-egx-body)] text-[11px] uppercase tracking-[0.28em] text-[color:var(--egx-gold-strong)]">
                      {copy.disclosure.label}
                    </p>
                    <p className="mt-3.5 font-[var(--font-egx-body)] text-sm leading-7 text-[color:var(--egx-ink-soft)]">
                      {copy.disclosure.commercial}
                    </p>
                    <p className="mt-3 font-[var(--font-egx-body)] text-sm leading-7 text-[color:var(--egx-ink-soft)]">
                      {copy.disclosure.advice}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-[var(--font-egx-body)] text-sm font-semibold">
                      <a
                        href={PRIVACY_POLICY_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[color:var(--egx-cyan-strong)] underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                      >
                        {copy.disclosure.privacy}
                      </a>
                      <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className="text-[color:var(--egx-cyan-strong)] underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                      >
                        {copy.disclosure.contact}
                      </a>
                    </div>
                    <address className="mt-4 not-italic font-[var(--font-egx-body)] text-xs leading-6 text-[color:var(--egx-ink-mute)]">
                      {copy.disclosure.address}
                    </address>
                  </div>

                  <div className="egx-card rounded-[1.75rem] p-6 sm:p-5">
                    <p className="font-[var(--font-egx-body)] text-[11px] uppercase tracking-[0.28em] text-[color:var(--egx-gold-strong)]">
                      {copy.social.label}
                    </p>
                    <h2 className="mt-3.5 text-xl font-semibold text-[color:var(--egx-ink)]">
                      {copy.social.heading}
                    </h2>
                    <p className="mt-2 font-[var(--font-egx-body)] text-sm leading-7 text-[color:var(--egx-ink-soft)]">
                      {copy.social.body}
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-1">
                      <SocialLink
                        href={FACEBOOK_URL}
                        label={copy.social.facebook}
                        accent="facebook"
                        icon={<FacebookIcon />}
                      />
                      <SocialLink
                        href={INSTAGRAM_URL}
                        label={copy.social.instagram}
                        accent="instagram"
                        icon={<InstagramIcon />}
                      />
                    </div>
                  </div>

                  <div className="egx-card rounded-[1.75rem] p-6 shadow-[inset_0_1px_0_var(--egx-inset)] sm:p-5">
                    <p className="font-[var(--font-egx-body)] text-[11px] uppercase tracking-[0.28em] text-[color:var(--egx-gold-strong)]">
                      {copy.chooseLabel}
                    </p>
                    <h2 className="mt-3.5 font-[var(--font-egx-display)] text-3xl font-semibold text-[color:var(--egx-ink)] md:text-2xl">
                      {copy.chooseHeading}
                    </h2>
                    <p className="mt-3.5 max-w-xl font-[var(--font-egx-body)] text-sm leading-7 text-[color:var(--egx-ink-soft)]">
                      {copy.chooseBody}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <motion.button
                        type="button"
                        onClick={handleShare}
                        whileTap={{ scale: 0.96 }}
                        className="egx-share inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-[var(--font-egx-body)] text-sm font-semibold"
                      >
                        <span>{copy.share.button}</span>
                        <span aria-hidden="true">↗</span>
                      </motion.button>
                      <span
                        role="status"
                        aria-live="polite"
                        className="font-[var(--font-egx-body)] text-sm text-[color:var(--egx-ink-mute)]"
                      >
                        {shareStatusLabel}
                      </span>
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-1">
                      {storeCards.map((card, index) => (
                        <StoreCard
                          key={card.href}
                          card={card}
                          cta={copy.stores.cta}
                          arrow={isArabicPage ? "←" : "→"}
                          priority={index === 0}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .egx {
          /* Light theme (default) */
          --egx-border: rgba(180, 140, 40, 0.18);
          --egx-hero-a: rgba(255, 246, 224, 0.95);
          --egx-hero-b: rgba(253, 250, 243, 1);
          --egx-glow-gold: rgba(214, 158, 46, 0.28);
          --egx-glow-cyan: rgba(35, 170, 190, 0.18);
          --egx-grid-line: rgba(120, 90, 20, 0.05);
          --egx-ink: #2c2410;
          --egx-ink-soft: #5c5238;
          --egx-ink-mute: #8a7c58;
          --egx-gold-strong: #b07d16;
          --egx-cyan-strong: #0e8ba0;
          --egx-card: rgba(255, 255, 255, 0.72);
          --egx-card-border: rgba(180, 140, 40, 0.2);
          --egx-shadow: rgba(120, 90, 20, 0.12);
          --egx-inset: rgba(255, 255, 255, 0.6);
          --egx-chip-bg: rgba(255, 255, 255, 0.7);
          --egx-chip-border: rgba(180, 140, 40, 0.28);
          --egx-chip-ink: #6a5c34;
          --egx-feature-bg: rgba(255, 253, 247, 0.7);
          --egx-gold-card: linear-gradient(
            180deg,
            rgba(255, 236, 186, 0.7),
            rgba(255, 255, 255, 0.55)
          );
          --egx-karat-bg: rgba(255, 255, 255, 0.6);
          --egx-karat-active-bg: linear-gradient(
            160deg,
            rgba(255, 232, 168, 0.85),
            rgba(255, 249, 232, 0.6)
          );
          --egx-karat-active-border: rgba(196, 145, 30, 0.55);
          --egx-spread-bg: rgba(196, 145, 30, 0.14);
          --egx-spread-ink: #96690f;
          --egx-share-bg: #2c2410;
          --egx-share-ink: #fff4d6;
          --egx-logo-bg: linear-gradient(
            160deg,
            rgba(255, 255, 255, 0.98),
            rgba(253, 246, 230, 0.98)
          );
        }

        :is(.dark) .egx {
          /* Dark theme */
          --egx-border: rgba(255, 255, 255, 0.08);
          --egx-hero-a: rgba(16, 15, 20, 0.95);
          --egx-hero-b: rgba(3, 3, 4, 1);
          --egx-glow-gold: rgba(255, 205, 90, 0.2);
          --egx-glow-cyan: rgba(72, 224, 255, 0.14);
          --egx-grid-line: rgba(255, 255, 255, 0.035);
          --egx-ink: #fff5d5;
          --egx-ink-soft: rgba(255, 255, 255, 0.72);
          --egx-ink-mute: rgba(255, 255, 255, 0.5);
          --egx-gold-strong: #f4d78a;
          --egx-cyan-strong: #6ce6f8;
          --egx-card: rgba(255, 255, 255, 0.04);
          --egx-card-border: rgba(255, 255, 255, 0.1);
          --egx-shadow: rgba(0, 0, 0, 0.45);
          --egx-inset: rgba(255, 255, 255, 0.05);
          --egx-chip-bg: rgba(255, 255, 255, 0.06);
          --egx-chip-border: rgba(255, 255, 255, 0.12);
          --egx-chip-ink: rgba(255, 255, 255, 0.82);
          --egx-feature-bg: rgba(0, 0, 0, 0.22);
          --egx-gold-card: linear-gradient(
            180deg,
            rgba(255, 219, 118, 0.12),
            rgba(255, 255, 255, 0.03)
          );
          --egx-karat-bg: rgba(255, 255, 255, 0.04);
          --egx-karat-active-bg: linear-gradient(
            160deg,
            rgba(255, 220, 120, 0.18),
            rgba(72, 224, 255, 0.08)
          );
          --egx-karat-active-border: rgba(255, 213, 128, 0.5);
          --egx-spread-bg: rgba(255, 213, 128, 0.14);
          --egx-spread-ink: #f4d78a;
          --egx-share-bg: #fff4d6;
          --egx-share-ink: #2c2410;
          --egx-logo-bg: linear-gradient(
            160deg,
            rgba(22, 22, 28, 0.98),
            rgba(8, 8, 10, 0.98)
          );
        }

        /* Arabic is cursive: letter-spacing (Tailwind tracking-*) splits the
           joins between letters, and text-transform is meaningless. Neutralize
           both across the whole RTL scope so every label stays properly shaped,
           regardless of the utility classes on it. */
        .egx[dir="rtl"] * {
          letter-spacing: 0 !important;
          text-transform: none !important;
        }
        /* Hero entrance as a pure-CSS animation so it starts at first paint
           (no JS/hydration gate). fill-mode both keeps the from-state only for
           the brief animation, then the content settles fully visible. */
        @keyframes egx-rise {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .egx-rise {
          animation: egx-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .egx-rise {
            animation: none;
          }
        }
        .egx-hero {
          background:
            radial-gradient(
              circle at 50% 0%,
              var(--egx-glow-gold),
              transparent 42%
            ),
            radial-gradient(
              circle at 82% 30%,
              var(--egx-glow-cyan),
              transparent 40%
            ),
            linear-gradient(135deg, var(--egx-hero-a), var(--egx-hero-b));
        }
        .egx-grid {
          background-image:
            linear-gradient(var(--egx-grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--egx-grid-line) 1px, transparent 1px);
          background-size: 5rem 5rem;
          opacity: 0.7;
        }
        .egx-blob-gold {
          background: var(--egx-glow-gold);
        }
        .egx-blob-cyan {
          background: var(--egx-glow-cyan);
        }
        .egx-logo {
          border: 1px solid var(--egx-card-border);
          background: var(--egx-logo-bg);
          box-shadow: 0 20px 50px var(--egx-shadow);
        }
        .egx-logo-ring {
          background: conic-gradient(
            from 220deg,
            transparent,
            var(--egx-glow-gold),
            transparent,
            var(--egx-glow-cyan),
            transparent
          );
          opacity: 0.9;
        }
        .egx-eyebrow {
          color: var(--egx-gold-strong);
          background: var(--egx-spread-bg);
          border: 1px solid var(--egx-chip-border);
        }
        .egx-pulse-ping {
          background: currentColor;
          animation: egx-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes egx-ping {
          75%,
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .egx-pulse-ping {
            animation: none;
          }
        }
        .egx-card {
          border: 1px solid var(--egx-card-border);
          background: var(--egx-card);
          backdrop-filter: blur(16px);
        }
        .egx-card-gold {
          border: 1px solid var(--egx-card-border);
          background: var(--egx-gold-card);
        }
        .egx-feature {
          border: 1px solid var(--egx-card-border);
          background: var(--egx-feature-bg);
        }
        .egx-chip {
          color: var(--egx-chip-ink);
          background: var(--egx-chip-bg);
          border: 1px solid var(--egx-chip-border);
        }
        .egx-live {
          color: var(--egx-cyan-strong);
          background: var(--egx-spread-bg);
        }
        .egx-karat {
          border: 1px solid var(--egx-card-border);
          background: var(--egx-karat-bg);
        }
        .egx-karat:hover {
          transform: translateY(-2px);
        }
        .egx-karat-active {
          background: var(--egx-karat-active-bg);
          border-color: var(--egx-karat-active-border);
          box-shadow: 0 10px 30px var(--egx-shadow);
        }
        .egx-spread {
          color: var(--egx-spread-ink);
          background: var(--egx-spread-bg);
        }
        .egx-share {
          color: var(--egx-share-ink);
          background: var(--egx-share-bg);
          transition:
            transform 0.2s ease,
            opacity 0.2s ease;
        }
        .egx-share:hover {
          opacity: 0.9;
        }
        .egx-social-link {
          border: 1px solid var(--egx-card-border);
          background: var(--egx-feature-bg);
          transition:
            border-color 0.2s ease,
            background-color 0.2s ease,
            box-shadow 0.2s ease;
        }
        .egx-social-link:hover {
          border-color: var(--egx-karat-active-border);
          box-shadow: 0 10px 26px var(--egx-shadow);
        }
        .egx-social-link:focus-visible {
          outline: 2px solid var(--egx-cyan-strong);
          outline-offset: 3px;
        }
        .egx-social-icon-facebook {
          background: #1877f2;
        }
        .egx-social-icon-instagram {
          background: linear-gradient(135deg, #833ab4, #fd1d1d 58%, #fcb045);
        }
        .egx-store-ios {
          background: linear-gradient(
            135deg,
            rgba(56, 189, 248, 0.35),
            rgba(255, 255, 255, 0.05)
          );
        }
        .egx-store-android {
          background: linear-gradient(
            135deg,
            rgba(52, 211, 153, 0.3),
            rgba(250, 204, 21, 0.12)
          );
        }
        .egx-store-glow {
          background:
            radial-gradient(
              circle at top right,
              var(--egx-glow-gold),
              transparent 38%
            ),
            radial-gradient(
              circle at bottom left,
              var(--egx-glow-cyan),
              transparent 34%
            );
        }
      `}</style>
    </>
  );
}
