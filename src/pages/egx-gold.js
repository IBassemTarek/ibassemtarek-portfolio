import Head from "next/head";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Cormorant_Garamond, Tajawal } from "next/font/google";
import { useEffect, useState } from "react";
import TransitionEffect from "@/components/TransitionEffect";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-egx-display",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-egx-body",
});

const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.egxgold.app";
const IOS_URL =
  "https://apps.apple.com/us/app/egx-gold-%D8%A3%D8%B3%D8%B9%D8%A7%D8%B1-%D8%A7%D9%84%D8%B0%D9%87%D8%A8-%D8%A7%D9%84%D9%8A%D9%88%D9%85/id6762029452";

const featureCards = [
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
    title: "Track your gold investment and savings goals.",
    detail:
      "Use the built-in calculator to estimate plans for marriage, investment, or future saving.",
  },
];

const quickHighlights = [
  "Arabic and English support",
  "Offline latest-update view",
  "Price tracking charts",
  "No login required",
  "Private by default",
];

const storeCards = [
  {
    href: IOS_URL,
    icon: "/images/egx-gold/app-store.png",
    alt: "Apple App Store",
    label: "iPhone / iPad",
    title: "Continue with the App Store",
    subtitle: "For iOS users who want the premium EGX Gold experience.",
    accent: "from-sky-400/30 via-cyan-300/10 to-white/5",
    ring: "ring-sky-200/25",
  },
  {
    href: ANDROID_URL,
    icon: "/images/egx-gold/google-play.png",
    alt: "Google Play",
    label: "Android phones",
    title: "Continue with Google Play",
    subtitle: "For Android users who want live gold tracking on the go.",
    accent: "from-emerald-400/20 via-yellow-300/10 to-amber-300/5",
    ring: "ring-emerald-200/25",
  },
];

function detectPlatform() {
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

function StoreCard({ card, priority = false }) {
  return (
    <motion.a
      href={card.href}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${card.accent} p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.35)]`}
    >
      <div className="relative h-full rounded-[calc(2rem-1px)] bg-[#09090c]/90 p-7 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,210,84,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(36,211,238,0.16),transparent_30%)] opacity-80" />
        <div
          className={`absolute right-5 top-5 h-20 w-20 rounded-full bg-white/5 blur-2xl ring-1 ${card.ring}`}
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-white/55">
                {card.label}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                {card.title}
              </h3>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/95 p-3 shadow-[0_16px_32px_rgba(255,255,255,0.12)]">
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

          <p className="max-w-sm text-sm leading-7 text-white/70">
            {card.subtitle}
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm font-medium text-amber-200 transition-transform duration-300 group-hover:translate-x-1">
            <span>Open store</span>
            <span aria-hidden="true">-&gt;</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function EgxGoldPage() {
  const prefersReducedMotion = useReducedMotion();
  const [platform, setPlatform] = useState("detecting");

  useEffect(() => {
    const nextPlatform = detectPlatform();
    setPlatform(nextPlatform);

    if (nextPlatform === "desktop") {
      return undefined;
    }

    const destination = nextPlatform === "ios" ? IOS_URL : ANDROID_URL;
    const redirectTimer = window.setTimeout(() => {
      window.location.replace(destination);
    }, prefersReducedMotion ? 250 : 900);

    return () => window.clearTimeout(redirectTimer);
  }, [prefersReducedMotion]);

  const isMobile = platform === "android" || platform === "ios";
  const platformTitle =
    platform === "ios" ? "Redirecting to the App Store" : "Redirecting to Google Play";
  const platformArabic =
    platform === "ios"
      ? "جاري تحويلك إلى App Store"
      : "جاري تحويلك إلى Google Play";

  return (
    <>
      <Head>
        <title>EGX Gold | Smart Store Redirect</title>
        <meta
          name="description"
          content="Track live gold prices in Egypt, compare karats, watch bullion movement, and download EGX Gold on iPhone or Android."
        />
      </Head>

      <TransitionEffect />

      <main
        className={`${cormorant.variable} ${tajawal.variable} w-full px-10 pb-20 pt-6 text-white lg:px-8 md:px-6 sm:px-4`}
      >
        <section className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#040506] shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,212,99,0.22),transparent_24%),radial-gradient(circle_at_80%_28%,rgba(72,224,255,0.14),transparent_22%),linear-gradient(135deg,rgba(14,14,18,0.92),rgba(3,3,4,1))]" />
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:5rem_5rem]" />
          <div className="absolute left-[-10%] top-[16%] h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />
          <div className="absolute bottom-[10%] right-[-8%] h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="grid gap-10 px-14 pb-14 pt-16 xl:px-10 lg:grid-cols-1 lg:px-8 md:px-6 md:pb-10 md:pt-12">
              <div className="grid items-start gap-12 lg:gap-10">
                <div className="grid grid-cols-[minmax(0,160px)_1fr] items-center gap-8 md:grid-cols-1 md:gap-6">
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
                    className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-[2rem] border border-amber-200/20 bg-[radial-gradient(circle_at_30%_20%,rgba(255,221,124,0.36),transparent_35%),linear-gradient(180deg,rgba(31,26,14,0.95),rgba(10,10,12,0.98))] p-5 shadow-[0_24px_60px_rgba(255,195,0,0.22)]"
                  >
                    <div className="absolute inset-0 rounded-[2rem] bg-[conic-gradient(from_220deg,rgba(255,255,255,0.06),rgba(255,220,120,0.16),rgba(255,255,255,0.04),rgba(72,224,255,0.12),rgba(255,255,255,0.06))]" />
                    <Image
                      src="/images/egx-gold/app-icon.jpg"
                      alt="EGX Gold app logo"
                      width={120}
                      height={120}
                      priority
                      className="relative z-10 h-auto w-full rounded-[1.5rem]"
                    />
                  </motion.div>

                  <div className="max-w-4xl">
                    <p className="font-[var(--font-egx-body)] text-xs uppercase tracking-[0.42em] text-amber-200/80">
                      EGX Gold
                    </p>
                    <h1 className="mt-4 max-w-4xl font-[var(--font-egx-display)] text-7xl font-semibold leading-[0.9] text-[#fff5d5] xl:text-6xl md:text-5xl sm:text-4xl">
                      Gold Prices in Egypt, always within reach.
                    </h1>
                    <p
                      dir="rtl"
                      className="mt-4 max-w-3xl font-[var(--font-egx-body)] text-xl leading-9 text-amber-100/80 md:text-lg md:leading-8"
                    >
                      تابع سعر الذهب لحظة بلحظة في السوق المصري، واتخذ قرارات
                      أذكى للاستثمار والزواج والتخطيط للمستقبل.
                    </p>
                    <p className="mt-6 max-w-3xl font-[var(--font-egx-body)] text-base leading-8 text-white/72 md:text-[15px]">
                      Track 24k, 21k, and 18k gold, see live buying and selling
                      prices, monitor bullion by weight, and keep your own gold
                      plan moving with clarity.
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
                    <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(135deg,rgba(72,224,255,0.12),transparent_60%)]" />
                    <svg
                      viewBox="0 0 560 220"
                      className="absolute inset-x-0 bottom-0 h-full w-full opacity-60"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id="egx-gold-line" x1="0%" x2="100%" y1="0%" y2="0%">
                          <stop offset="0%" stopColor="rgba(255,196,62,0)" />
                          <stop offset="30%" stopColor="rgba(255,196,62,0.9)" />
                          <stop offset="70%" stopColor="rgba(96,241,255,0.95)" />
                          <stop offset="100%" stopColor="rgba(96,241,255,0)" />
                        </linearGradient>
                      </defs>
                      <polyline
                        points="24,176 108,164 176,144 240,152 318,118 384,126 446,82 534,46"
                        fill="none"
                        stroke="url(#egx-gold-line)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <div className="relative z-10">
                      <p className="font-[var(--font-egx-body)] text-xs uppercase tracking-[0.32em] text-cyan-100/65">
                        Why people keep this app close
                      </p>
                      <div className="mt-6 grid gap-5">
                        {featureCards.map((card) => (
                          <div
                            key={card.eyebrow}
                            className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5"
                          >
                            <p className="font-[var(--font-egx-body)] text-[11px] uppercase tracking-[0.3em] text-amber-100/55">
                              {card.eyebrow}
                            </p>
                            <h2 className="mt-3 text-xl font-semibold text-white">
                              {card.title}
                            </h2>
                            <p className="mt-2 font-[var(--font-egx-body)] text-sm leading-7 text-white/70">
                              {card.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div className="rounded-[2rem] border border-amber-200/10 bg-[linear-gradient(180deg,rgba(255,219,118,0.12),rgba(255,255,255,0.03))] p-7">
                      <p className="font-[var(--font-egx-body)] text-xs uppercase tracking-[0.32em] text-amber-100/60">
                        Built for everyday confidence
                      </p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        {quickHighlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="rounded-full border border-white/10 bg-white/6 px-4 py-2 font-[var(--font-egx-body)] text-sm text-white/80"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[2rem] border border-cyan-200/10 bg-white/[0.03] p-7">
                      <p className="font-[var(--font-egx-body)] text-xs uppercase tracking-[0.32em] text-cyan-100/60">
                        Privacy promise
                      </p>
                      <p className="mt-4 font-[var(--font-egx-body)] text-base leading-8 text-white/72">
                        No login, no data collection, no unnecessary friction.
                        Your information stays on your device.
                      </p>
                    </div>

                    <div className="rounded-[2rem] border border-white/10 bg-black/25 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                      {isMobile ? (
                        <>
                          <p className="font-[var(--font-egx-body)] text-xs uppercase tracking-[0.32em] text-amber-100/60">
                            Smart redirect
                          </p>
                          <h2 className="mt-4 font-[var(--font-egx-display)] text-4xl font-semibold text-[#fff3cf] md:text-3xl">
                            {platformTitle}
                          </h2>
                          <p
                            dir="rtl"
                            className="mt-3 font-[var(--font-egx-body)] text-lg text-white/70"
                          >
                            {platformArabic}
                          </p>
                          <p className="mt-4 font-[var(--font-egx-body)] text-sm leading-7 text-white/65">
                            If the store does not open automatically, use one of
                            the buttons below.
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-[var(--font-egx-body)] text-xs uppercase tracking-[0.32em] text-amber-100/60">
                            Choose your device
                          </p>
                          <h2 className="mt-4 font-[var(--font-egx-display)] text-4xl font-semibold text-[#fff3cf] md:text-3xl">
                            Download EGX Gold where you use it.
                          </h2>
                          <p className="mt-4 max-w-xl font-[var(--font-egx-body)] text-sm leading-7 text-white/65">
                            On desktop, choose your platform and continue to the
                            right store. On mobile, this page redirects you
                            automatically.
                          </p>
                        </>
                      )}

                      <div className="mt-8 grid gap-4 lg:grid-cols-2">
                        {storeCards.map((card, index) => (
                          <StoreCard
                            key={card.href}
                            card={card}
                            priority={index === 0}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
