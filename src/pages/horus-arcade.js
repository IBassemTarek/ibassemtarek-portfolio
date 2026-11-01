import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Lilita_One, Nunito } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
import GameHall from "../components/horus-arcade/GameHall";
import DownloadQr from "../components/horus-arcade/DownloadQr";
import LoopVideo, { videoSource } from "../components/horus-arcade/LoopVideo";
import StoreBadges from "../components/horus-arcade/StoreBadges";
import { GAMES, SHELVES } from "../components/horus-arcade/games";
import {
  ANDROID_STORE_URL,
  DOWNLOAD_PATH,
  IOS_APP_ID,
  IOS_STORE_URL,
} from "../lib/horus-arcade-download.mjs";

// The app's own type pairing: Lilita One for headings and scores, a rounded
// body face. Only the display face sits in the above-the-fold H1.
const lilita = Lilita_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: true,
  variable: "--font-ha-display",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
  preload: false,
  variable: "--font-ha-body",
});

const SITE_URL = "https://ibassemtarek.vercel.app";
const PAGE_URL = `${SITE_URL}/horus-arcade`;
const IMG = "/images/horus-arcade";
const VID = "/videos/horus-arcade";
const OG_IMAGE_URL = `${SITE_URL}${IMG}/og-banner.jpg`;
const APP_ICON_URL = `${SITE_URL}${IMG}/app-icon.jpg`;

const PRIVACY_POLICY_URL = "https://eyecon-backend.fly.dev/privacy-policy";
const DELETE_ACCOUNT_URL = "https://eyecon-backend.fly.dev/delete-account";
const SUPPORT_EMAIL = "ibassemtarek@gmail.com";
const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/horusarcade/" },
  { label: "TikTok", href: "https://www.tiktok.com/@horusarcade" },
  { label: "YouTube", href: "https://www.youtube.com/@horus-arcade" },
];

const TITLE = "Horus Arcade: 23 Free Arcade & Puzzle Games in One App";
const DESCRIPTION =
  "Horus Arcade packs 23 quick games into one neon Egyptian arcade: Eyecon, Number Stack, Nova Skim, Block Fit, Senet, Sphinx Sudoku and more. Free on iPhone and Android.";

const STATS = [
  { value: 23, label: "games in one app" },
  { value: 5, label: "shelves to explore" },
  { value: 5, label: "daily challenges" },
  { value: 3, label: "levels of Seth to beat" },
];

const EYECON_MODES = [
  { name: "Solo", detail: "Race the clock" },
  { name: "vs Seth", detail: "Easy, Medium, Hard" },
  { name: "Duo", detail: "Two players, one phone" },
  { name: "Online", detail: "Quick match or private room" },
];

const SPOTLIGHT_CLIPS = [
  {
    id: "number-stack",
    name: "Number Stack",
    accent: "#2ff4ff",
    copy: "Drag, match, merge. Chain combos up to x5 and chase the daily board.",
  },
  {
    id: "nova-skim",
    name: "Nova Skim",
    accent: "#ff2bd6",
    copy: "Hop planet to planet and skim the mines for up to x6. Every hop plays a note.",
  },
];

const VERSUS_POINTS = [
  "Seth plays at Easy, Medium and Hard, and he doesn't go easy on Hard.",
  "Four in a Row, Senet, Nile Seeds and Kemet Draughts: pass the phone and play a friend.",
  "Eyecon online: quick matches against players worldwide, or a private room for your crew.",
];

const RANK_FEATURES = [
  {
    title: "XP on every run",
    copy: "Beat your usual score for bonus XP and level up across all 23 games.",
  },
  {
    title: "Weekly XP race",
    copy: "Climb the weekly board, plus all-time ranks and a board for every game.",
  },
  {
    title: "Game Center & Play Games",
    copy: "Your bests post to the leaderboards you already use.",
  },
  {
    title: "Daily boards",
    copy: "New Number Stack, Sand Slide, Tomb Sweeper and Sudoku boards, and a daily word.",
  },
  {
    title: "Daily chest & 2x XP",
    copy: "Open a coin chest every day and switch on a 15-minute XP boost.",
  },
  {
    title: "Plays offline",
    copy: "No signal? Keep playing. Scores sync to the boards when you're back.",
  },
];

const SCREENS = [
  ["01-hub", "The Horus Arcade hall, with every game on its shelf"],
  ["02-number-stack", "Number Stack: drag, match, merge"],
  ["03-eyecon", "Eyecon: spot the match first"],
  ["04-block-fit", "Block Fit: fit pieces, clear lines"],
  ["05-color-sort", "Color Sort: one colour per tube"],
  ["06-nova-skim", "Nova Skim: hop planet to planet"],
  ["07-brick-blitz", "Brick Blitz: smash the wall"],
  ["08-four-in-a-row", "Four in a Row: line up four first"],
  ["09-odd-one-out", "Odd One Out: spot the odd shade"],
  ["10-glyph-guess", "Glyph Guess: find the hidden word"],
  ["11-obelisk-flap", "Obelisk Flap: tap to fly the gaps"],
  ["12-scarab-dash", "Scarab Dash: swipe, dodge, dash"],
  ["13-tomb-sweeper", "Tomb Sweeper: mind the cobras"],
  ["14-sand-slide", "Sand Slide: slide it back in order"],
];

// Answer-first copy: one self-contained definition and a fact list that
// search snippets, voice assistants and AI answer engines can quote as-is.
const SUMMARY =
  "Horus Arcade is a free mobile game app for iPhone and Android with 23 quick games in one neon, ancient-Egypt-themed arcade hosted by Horus the falcon. It mixes arcade, puzzle, brain, classic board and word games, works offline, and has leaderboards, daily challenges, a computer rival called Seth and two-player modes.";

const GAMES_BY_SHELF = SHELVES.map(
  ({ id, label }) =>
    `${label}: ${GAMES.filter((game) => game.shelf === id)
      .map(({ name }) => name)
      .join(", ")}`
).join(". ");

const FACTS = [
  ["Platforms", "iPhone (App Store) and Android phones (Google Play)"],
  ["Price", "Free to download and play; ads, with optional in-app purchases"],
  ["Games", "23 games on 5 shelves: Brain, Puzzle, Arcade, Classics, Word"],
  ["Play modes", "Solo, vs Seth (Easy, Medium, Hard), 2 players on one phone, online Eyecon matches"],
  ["Offline", "Every game plays offline; scores sync when you reconnect"],
  ["Progress", "Guest play, or sign in with Apple or Google for cloud saves"],
  ["Leaderboards", "Weekly and all-time ranks, plus Game Center and Google Play Games"],
  ["Language", "English; Glyph Guess also has an Arabic word mode"],
  ["Made by", "Bassem Tarek, published by Fanar, LLC"],
];

const FAQS = [
  { q: "What is Horus Arcade?", a: SUMMARY },
  {
    q: "What games are in Horus Arcade?",
    a: `23 games on five shelves. ${GAMES_BY_SHELF}.`,
  },
  {
    q: "Is Horus Arcade free?",
    a: "Yes. All 23 games are free to play. Coin packs, a one-time Remove Ads purchase and Horus Arcade Premium are optional extras inside the app.",
  },
  {
    q: "Does Horus Arcade have ads?",
    a: "Yes, the free version shows ads, paced so you never get one right after a loss. A one-time Remove Ads purchase or Horus Arcade Premium turns them off, and reward videos are always optional.",
  },
  {
    q: "Can I play offline?",
    a: "Yes. Every game works without a connection, and your scores are saved and sent to the leaderboards when you're back online. Online Eyecon matches need a connection.",
  },
  {
    q: "Which phones does it run on?",
    a: "iPhone, from the App Store, and Android phones, from Google Play.",
  },
  {
    q: "Can I play with friends?",
    a: "Eyecon has online quick matches, private rooms and a two-player Duo mode on one phone. Four in a Row, Senet, Nile Seeds and Kemet Draughts can be played by two people on one phone, or against Seth.",
  },
  {
    q: "Can I play ancient Egyptian board games like Senet?",
    a: "Yes. Senet is the pharaohs' race game, Nile Seeds is mancala on a Nile boat and Kemet Draughts is classic draughts. Play them against Seth or a friend on one phone.",
  },
  {
    q: "Does it save my progress?",
    a: "Sign in with Google or Apple to keep your progress in the cloud, or play as a guest. You can delete your account at any time from the app or the web.",
  },
  {
    q: "Who makes Horus Arcade?",
    a: "Horus Arcade is made by independent developer Bassem Tarek and published by Fanar, LLC.",
  },
];

// Counts up once when the strip scrolls into view. The real number is in the
// server-rendered HTML, so crawlers and reduced-motion users just see it.
function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || reduce || !node) {
      return undefined;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toString();
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return <span ref={ref}>{value}</span>;
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p className="ha-eyebrow">{eyebrow}</p>
      <h2 className="ha-display ha-glow-text mt-3 text-5xl leading-[1.05] text-white lg:text-4xl sm:text-3xl">
        {title}
      </h2>
      {children && (
        <p className="mt-4 text-lg text-[color:var(--ha-text)] sm:text-base">
          {children}
        </p>
      )}
    </Reveal>
  );
}

// Phones get a lighter 540p cut of the reel; the first matching source wins.
const REEL_SOURCES = [
  { src: `${VID}/discovery-v2-540.mp4`, media: "(max-width: 767px)" },
  { src: `${VID}/discovery-v2.mp4` },
];

// Plays the promo reel muted; the button hands the sound to the viewer. If the
// browser refuses autoplay (iOS Low Power Mode), a play button takes over.
function ReelPhone() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const onBlocked = useCallback(() => setBlocked(true), []);

  const playNow = () => {
    videoRef.current?.play().then(() => setBlocked(false)).catch(() => {});
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.muted = !muted;
    video.dataset.unmuted = muted ? "true" : "";
    if (muted) {
      playNow();
    }
    setMuted(!muted);
  };

  return (
    <div className="ha-phone relative mx-auto w-[300px] translate-x-10 lg:w-[270px] lg:translate-x-0 sm:w-[240px]">
      <div className="ha-phone-screen relative overflow-hidden">
        <LoopVideo
          ref={videoRef}
          eager
          sources={REEL_SOURCES}
          poster={`${VID}/discovery-v2-poster.webp`}
          onBlocked={onBlocked}
          label="Horus Arcade promo: Horus walks the neon hall and plays the arcade cabinets"
          className="block aspect-[9/16] w-full object-cover"
        />
        {blocked && (
          <button
            type="button"
            onClick={playNow}
            className="ha-play absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            aria-label="Play the Horus Arcade trailer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="ms-1 h-9 w-9 fill-current">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
            </svg>
          </button>
        )}
        <button
          type="button"
          onClick={toggleSound}
          className="ha-sound absolute end-3 top-3 rounded-full px-3 py-1.5 text-xs font-extrabold"
          aria-pressed={!muted}
        >
          {muted ? "🔇 Sound off" : "🔊 Sound on"}
        </button>
      </div>
    </div>
  );
}

export default function HorusArcadePage() {
  const reduce = useReducedMotion();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Bassem Tarek",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Bassem Tarek",
        url: SITE_URL,
        jobTitle: "Mobile and full-stack developer",
        sameAs: [
          "https://github.com/IBassemTarek",
          "https://www.linkedin.com/in/ibassemtarek/",
          "https://twitter.com/IBassemTarek",
        ],
      },
      {
        "@type": "Organization",
        "@id": `${PAGE_URL}#publisher`,
        name: "Fanar, LLC",
      },
      {
        "@type": ["MobileApplication", "VideoGame"],
        "@id": `${PAGE_URL}#app`,
        name: "Horus Arcade",
        alternateName: "Eyecon",
        url: PAGE_URL,
        description: SUMMARY,
        image: APP_ICON_URL,
        screenshot: SCREENS.map(([file]) => `${SITE_URL}${IMG}/screens/${file}.webp`),
        applicationCategory: "GameApplication",
        applicationSubCategory: "Arcade, Puzzle, Board, Word",
        genre: ["Arcade", "Puzzle", "Casual", "Board", "Word", "Brain training"],
        operatingSystem: "iOS, Android",
        gamePlatform: ["iOS", "Android"],
        playMode: ["SinglePlayer", "MultiPlayer"],
        inLanguage: "en",
        isAccessibleForFree: true,
        downloadUrl: [IOS_STORE_URL, ANDROID_STORE_URL],
        installUrl: `${SITE_URL}${DOWNLOAD_PATH}`,
        sameAs: [IOS_STORE_URL, ANDROID_STORE_URL, ...SOCIALS.map(({ href }) => href)],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        featureList: GAMES.map(({ name, tagline }) => `${name}: ${tagline}`),
        hasPart: { "@id": `${PAGE_URL}#games` },
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${PAGE_URL}#publisher` },
        trailer: { "@id": `${PAGE_URL}#reel` },
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#games`,
        name: "Games in Horus Arcade",
        numberOfItems: GAMES.length,
        itemListElement: GAMES.map((game, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "VideoGame",
            "@id": `${PAGE_URL}#game-${game.id}`,
            url: `${PAGE_URL}#game-${game.id}`,
            name: game.name,
            description: `${game.tagline}. ${game.howTo}`,
            genre: SHELVES.find(({ id }) => id === game.shelf)?.label,
            image: `${SITE_URL}${IMG}/games/${game.id}/play.webp`,
            isPartOf: { "@id": `${PAGE_URL}#app` },
          },
        })),
      },
      {
        "@type": "VideoObject",
        "@id": `${PAGE_URL}#reel`,
        name: "Horus Arcade: walk the neon hall",
        description:
          "Horus the falcon walks the Horus Arcade hall and plays the cabinets one by one. 23 games in one app, free on the App Store and Google Play.",
        thumbnailUrl: `${SITE_URL}${VID}/discovery-v2-poster.webp`,
        contentUrl: `${SITE_URL}${VID}/discovery-v2.mp4`,
        uploadDate: "2026-11-01",
        duration: "PT20S",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
          { "@type": "ListItem", position: 3, name: "Horus Arcade", item: PAGE_URL },
        ],
      },
      {
        "@type": "WebPage",
        "@id": PAGE_URL,
        url: PAGE_URL,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en",
        dateModified: "2026-11-01",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
        primaryImageOfPage: OG_IMAGE_URL,
        about: { "@id": `${PAGE_URL}#app` },
        mainEntity: { "@id": `${PAGE_URL}#app` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".ha-summary", ".ha-faq-answer"],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQS.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="author" content="Bassem Tarek" />
        <meta name="application-name" content="Horus Arcade" />
        <meta name="theme-color" content="#0a0820" />
        <meta name="apple-itunes-app" content={`app-id=${IOS_APP_ID}`} />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="apple-touch-icon" href={`${IMG}/app-icon.jpg`} />
        {/* Plain-text fact sheet for LLM crawlers and answer engines. */}
        <link rel="alternate" type="text/markdown" href="/horus-arcade.md" />
        {/* The first frames people see: the reel's poster, and the hero
            loop's poster on screens wide enough to play it. */}
        <link
          rel="preload"
          as="image"
          href={`${VID}/discovery-v2-poster.webp`}
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href={`${VID}/hero-loop-poster.webp`}
          media="(min-width: 768px)"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Horus Arcade" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Horus Arcade: the Eye of Horus surrounded by neon game tiles over pyramids"
        />
        <meta property="og:video" content={`${SITE_URL}${VID}/discovery-v2.mp4`} />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:width" content="720" />
        <meta property="og:video:height" content="1280" />
        {/* App Links and Twitter app cards: deep-link shares straight to the
            stores. */}
        <meta property="al:ios:app_store_id" content={IOS_APP_ID} />
        <meta property="al:ios:app_name" content="Horus Arcade" />
        <meta property="al:android:package" content="com.ibassemtarek.eyecon" />
        <meta property="al:android:app_name" content="Horus Arcade" />
        <meta name="twitter:app:name:iphone" content="Horus Arcade" />
        <meta name="twitter:app:id:iphone" content={IOS_APP_ID} />
        <meta name="twitter:app:name:googleplay" content="Horus Arcade" />
        <meta name="twitter:app:id:googleplay" content="com.ibassemtarek.eyecon" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </Head>

      <main
        lang="en"
        className={`ha ${lilita.variable} ${nunito.variable} relative w-full overflow-hidden`}
      >
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="ha-hero relative isolate overflow-hidden">
          <Image
            src={`${IMG}/hall-wide.webp`}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center opacity-60"
          />
          {/* Phones match no source (and hide the element), so they never
              download the loop and keep the still hall art. */}
          <LoopVideo
            eager
            sources={[{ src: `${VID}/hero-loop.mp4`, media: "(min-width: 768px)" }]}
            poster={`${VID}/hero-loop-poster.webp`}
            className="ha-hero-video absolute inset-0 -z-20 h-full w-full object-cover md:hidden"
          />
          <div className="ha-hero-shade pointer-events-none absolute inset-0 -z-10" />
          <div className="ha-floor pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56" />

          <div className="mx-auto grid max-w-7xl grid-cols-[1.1fr_0.9fr] items-center gap-10 px-10 pb-24 pt-16 lg:grid-cols-1 lg:px-6 lg:pb-16 lg:pt-10">
            <div className="ha-rise lg:text-center">
              <Image
                src={`${IMG}/marquee.webp`}
                alt="Horus Arcade"
                width={1000}
                height={326}
                priority
                sizes="(max-width: 1023px) 80vw, 520px"
                className="ha-marquee h-auto w-[520px] max-w-full lg:mx-auto"
              />
              <h1 className="ha-display mt-6 text-7xl leading-[0.95] text-white xl:text-6xl sm:text-5xl">
                <span className="ha-gold-text">23 games.</span>
                <br />
                One neon arcade.
              </h1>
              <p className="ha-display mt-5 text-2xl tracking-wide text-[color:var(--ha-cyan)] sm:text-xl">
                Spot it. Stack it. Smash it.
              </p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-[color:var(--ha-text)] lg:mx-auto sm:text-base">
                Puzzles, brain teasers, arcade dashes and the pharaohs&apos;
                own board games, all in one hall run by Horus the falcon. Beat
                your best, beat Seth, then beat the world.
              </p>
              <StoreBadges className="mt-8 lg:justify-center" />
              <p className="mt-4 text-sm font-semibold text-[color:var(--ha-muted)]">
                Free to play · iPhone &amp; Android · Plays offline
              </p>
            </div>

            <div className="ha-rise ha-rise-late relative">
              <div className="ha-halo pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
              <ReelPhone />
              <Image
                src={`${IMG}/horus.webp`}
                alt="Horus the falcon, your arcade host"
                width={406}
                height={640}
                sizes="180px"
                className="ha-horus-peek absolute -bottom-6 left-[-6%] w-[170px] lg:left-[4%] md:hidden"
              />
            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────── */}
        <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-6">
          <div className="ha-panel grid grid-cols-4 gap-4 rounded-[2rem] p-6 md:grid-cols-2">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="ha-display ha-gold-text text-6xl leading-none sm:text-5xl">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-[color:var(--ha-text)] sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── At a glance ──────────────────────────────────────── */}
        <section
          id="about"
          aria-labelledby="ha-about-title"
          className="mx-auto max-w-6xl px-10 pt-24 lg:px-6 md:pt-16"
        >
          <Reveal className="ha-panel grid grid-cols-[1fr_1.1fr] gap-10 rounded-[2rem] p-10 lg:grid-cols-1 lg:p-8 sm:p-6">
            <div>
              <p className="ha-eyebrow">At a glance</p>
              <h2
                id="ha-about-title"
                className="ha-display mt-3 text-4xl leading-tight text-white sm:text-3xl"
              >
                What is Horus Arcade?
              </h2>
              <p className="ha-summary mt-4 text-lg leading-relaxed text-[color:var(--ha-text)]">
                {SUMMARY}
              </p>
            </div>
            <dl className="ha-facts m-0 grid gap-x-6 gap-y-3 self-center">
              {FACTS.map(([term, detail]) => (
                <div key={term} className="grid grid-cols-[8.5rem_1fr] gap-4 sm:grid-cols-1 sm:gap-0">
                  <dt className="text-sm font-extrabold uppercase tracking-[0.12em] text-[color:var(--ha-gold)]">
                    {term}
                  </dt>
                  <dd className="m-0 text-[color:var(--ha-text)]">{detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* ── The hall ─────────────────────────────────────────── */}
        <section id="games" className="mx-auto max-w-7xl px-10 pt-28 lg:px-6 md:pt-20">
          <SectionHeading eyebrow="Welcome to the arcade" title="Pick a cabinet">
            Every game is a cabinet on Horus&apos;s shelves. Quick to learn,
            hard to put down, and each one keeps your best score.
          </SectionHeading>
          <Reveal className="ha-parade mx-auto mt-10 max-w-md overflow-hidden rounded-[2rem]">
            <LoopVideo
              sources={videoSource(`${VID}/cabinet-parade`)}
              poster={`${VID}/cabinet-parade-poster.webp`}
              label="Arcade cabinets slide past as their neon signs light up"
              className="block aspect-square w-full object-cover"
            />
          </Reveal>
          <div className="mt-12">
            <GameHall />
          </div>
        </section>

        {/* ── Spotlight ────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-10 pt-32 lg:px-6 md:pt-20">
          <SectionHeading eyebrow="Spotlight" title="Where it all started" />
          <div className="mt-12 grid grid-cols-[1.15fr_1fr] gap-6 lg:grid-cols-1">
            <Reveal className="ha-panel ha-spot relative overflow-hidden rounded-[2rem] p-8 sm:p-6" >
              <div className="grid grid-cols-[1fr_auto] items-center gap-6 sm:grid-cols-1">
                <div>
                  <Image
                    src={`${IMG}/games/eyecon/sign.webp`}
                    alt="Eyecon"
                    width={800}
                    height={229}
                    sizes="320px"
                    className="h-auto w-[320px] max-w-full"
                  />
                  <p className="mt-4 text-lg text-[color:var(--ha-text)]">
                    Any two cards share exactly one symbol. Find it first. The
                    original Horus Arcade game, with pharaoh, animal and food
                    symbol sets.
                  </p>
                  <ul className="mt-6 grid grid-cols-2 gap-3 p-0">
                    {EYECON_MODES.map((mode) => (
                      <li key={mode.name} className="ha-mode list-none rounded-2xl p-4">
                        <p className="ha-display text-xl text-white">{mode.name}</p>
                        <p className="text-sm text-[color:var(--ha-muted)]">{mode.detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <Image
                  src={`${IMG}/screens/03-eyecon.webp`}
                  alt="Eyecon gameplay: two symbol cards, one shared symbol"
                  width={600}
                  height={1300}
                  sizes="220px"
                  className="ha-shot w-[220px] sm:mx-auto"
                />
              </div>
            </Reveal>
            <div className="grid gap-6">
              {SPOTLIGHT_CLIPS.map((clip, index) => (
                <Reveal
                  key={clip.id}
                  delay={0.1 * (index + 1)}
                  className="ha-panel overflow-hidden rounded-[2rem]"
                >
                  <div style={{ "--accent": clip.accent }} className="ha-clip">
                    <LoopVideo
                      sources={videoSource(`${VID}/${clip.id}-preview`)}
                      poster={`${VID}/${clip.id}-preview-poster.webp`}
                      label={`${clip.name} gameplay`}
                      className="block aspect-video w-full object-cover"
                    />
                    <div className="p-6">
                      <h3 className="ha-display text-3xl text-[color:var(--accent)]">
                        {clip.name}
                      </h3>
                      <p className="mt-1 text-[color:var(--ha-text)]">{clip.copy}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Horus vs Seth ────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-10 pt-32 lg:px-6 md:pt-20">
          <div className="ha-versus grid grid-cols-2 items-center gap-12 overflow-hidden rounded-[2.5rem] p-12 lg:grid-cols-1 lg:p-8 sm:p-5">
            <Reveal>
              <LoopVideo
                sources={videoSource(`${VID}/horus-vs-seth`)}
                poster={`${VID}/horus-vs-seth-poster.webp`}
                label="Horus and Seth face off, with Easy, Medium and Hard difficulty"
                className="ha-versus-video block aspect-[4/5] w-full rounded-[2rem] object-cover"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="ha-eyebrow">Your rival</p>
              <h2 className="ha-display mt-3 text-5xl leading-[1.05] text-white lg:text-4xl">
                Think you can beat <span className="text-[color:var(--ha-magenta)]">Seth</span>?
              </h2>
              <p className="mt-4 text-lg text-[color:var(--ha-text)]">
                Horus&apos;s old rival haunts the board games and Eyecon. Pick
                his mood, or bring a friend instead.
              </p>
              <ul className="mt-6 space-y-3 p-0">
                {VERSUS_POINTS.map((point) => (
                  <li key={point} className="ha-point flex list-none gap-3 text-[color:var(--ha-text)]">
                    <span aria-hidden="true" className="ha-point-dot mt-2 h-2.5 w-2.5 shrink-0 rounded-full" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-end gap-3">
                {["easy", "medium", "hard"].map((level, index) => (
                  <motion.div
                    key={level}
                    className="ha-seth text-center"
                    whileHover={reduce ? undefined : { y: -6, rotate: index === 1 ? 0 : index === 0 ? -3 : 3 }}
                  >
                    <Image
                      src={`${IMG}/rival/${level}.webp`}
                      alt={`Seth on ${level}`}
                      width={419}
                      height={640}
                      sizes="110px"
                      className="mx-auto h-auto w-[96px] sm:w-[72px]"
                    />
                    <p className="ha-display mt-1 text-lg capitalize text-white">{level}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Ranks ────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-10 pt-32 lg:px-6 md:pt-20">
          <div className="grid grid-cols-[0.8fr_1.2fr] items-center gap-12 lg:grid-cols-1">
            <Reveal className="relative mx-auto w-full max-w-sm">
              <div className="ha-halo ha-halo-gold pointer-events-none absolute inset-0 -z-10 rounded-full" />
              <Image
                src={`${IMG}/horus-trophy.webp`}
                alt="Horus holding up a golden trophy"
                width={536}
                height={760}
                sizes="(max-width: 1023px) 70vw, 360px"
                className="ha-float relative mx-auto h-auto w-[85%]"
              />
              <Image
                src={`${IMG}/props/hoard.webp`}
                alt=""
                width={400}
                height={383}
                sizes="140px"
                className="ha-float ha-float-slow absolute -bottom-2 -right-4 w-[140px]"
              />
              <Image
                src={`${IMG}/props/crown.webp`}
                alt=""
                width={400}
                height={342}
                sizes="90px"
                className="ha-float ha-float-fast absolute left-0 top-6 w-[90px]"
              />
            </Reveal>
            <div>
              <Reveal>
                <p className="ha-eyebrow">Climb the ranks</p>
                <h2 className="ha-display mt-3 text-5xl leading-[1.05] text-white lg:text-4xl">
                  Every run counts.
                </h2>
              </Reveal>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-1">
                {RANK_FEATURES.map((feature, index) => (
                  <Reveal key={feature.title} delay={0.05 * index} className="ha-panel ha-feature rounded-2xl p-5">
                    <h3 className="ha-display text-xl text-white">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[color:var(--ha-text)]">
                      {feature.copy}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Screenshots ──────────────────────────────────────── */}
        <section className="pt-32 md:pt-20">
          <div className="px-6">
            <SectionHeading eyebrow="Inside the app" title="Take a look around" />
          </div>
          <div className="ha-strip mt-10 flex gap-5 overflow-x-auto px-10 pb-6 sm:px-6" tabIndex={0} aria-label="App screenshots">
            {SCREENS.map(([file, alt]) => (
              <Image
                key={file}
                src={`${IMG}/screens/${file}.webp`}
                alt={alt}
                width={600}
                height={1300}
                sizes="220px"
                className="ha-shot w-[220px] shrink-0 snap-center sm:w-[180px]"
              />
            ))}
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-10 pt-28 lg:px-6 md:pt-20">
          <Reveal className="ha-cta relative overflow-hidden rounded-[2.5rem] p-12 lg:p-8 sm:p-6">
            <div className="ha-floor ha-floor-cta pointer-events-none absolute inset-x-0 bottom-0 h-40" />
            <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-10 lg:grid-cols-1 lg:text-center">
              <Image
                src={`${IMG}/icon-512.png`}
                alt="Horus Arcade app icon"
                width={512}
                height={512}
                sizes="140px"
                className="ha-icon mx-auto h-[140px] w-[140px] rounded-[2rem]"
              />
              <div>
                <h2 className="ha-display ha-glow-text text-5xl leading-[1.05] text-white lg:text-4xl">
                  The hall is open.
                </h2>
                <p className="mt-3 text-lg text-[color:var(--ha-text)]">
                  23 games, one free download. Horus is waiting.
                </p>
                <StoreBadges className="mt-6 lg:justify-center" />
              </div>
              <div className="lg:hidden">
                <DownloadQr caption="Scan with your phone" />
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section id="faq" className="mx-auto max-w-3xl px-6 pb-16 pt-28 md:pt-20">
          <SectionHeading eyebrow="Questions" title="Good to know" />
          <div className="mt-10 space-y-3">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="ha-faq ha-panel group rounded-2xl px-6 py-5">
                <summary className="ha-display flex cursor-pointer list-none items-center justify-between gap-4 text-xl text-white">
                  {q}
                  <span aria-hidden="true" className="ha-faq-plus text-2xl text-[color:var(--ha-gold)]">+</span>
                </summary>
                <p className="ha-faq-answer mt-3 leading-relaxed text-[color:var(--ha-text)]">{a}</p>
              </details>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 text-center text-sm text-[color:var(--ha-muted)]">
            <div className="flex flex-wrap justify-center gap-3">
              {SOCIALS.map((social) => (
                <a key={social.label} href={social.href} rel="me noopener" target="_blank" className="ha-social rounded-full px-4 py-2 font-bold">
                  {social.label}
                </a>
              ))}
            </div>
            <p>
              <a href={PRIVACY_POLICY_URL} className="underline underline-offset-4 hover:text-white">
                Privacy policy
              </a>
              {" · "}
              <a href={DELETE_ACCOUNT_URL} className="underline underline-offset-4 hover:text-white">
                Delete account
              </a>
              {" · "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="underline underline-offset-4 hover:text-white">
                {SUPPORT_EMAIL}
              </a>
            </p>
            <p>Horus Arcade is made by Bassem Tarek and published by Fanar, LLC.</p>
          </div>
        </section>

        {/* Phones get a pinned shortcut to their store via the smart link. */}
        <div className="ha-sticky fixed inset-x-3 bottom-3 z-40 hidden md:flex">
          <Link
            href={DOWNLOAD_PATH}
            className="ha-sticky-btn flex w-full items-center gap-3 rounded-2xl px-4 py-3"
          >
            <Image
              src={`${IMG}/icon-512.png`}
              alt=""
              width={512}
              height={512}
              sizes="44px"
              className="h-11 w-11 rounded-xl"
            />
            <span className="flex-1 text-start leading-tight">
              <span className="ha-display block text-lg text-white">Horus Arcade</span>
              <span className="text-xs font-semibold text-[color:var(--ha-muted)]">
                23 games · Free
              </span>
            </span>
            <span className="ha-display rounded-xl bg-[color:var(--ha-gold)] px-4 py-2 text-[#1c1740]">
              Play free
            </span>
          </Link>
        </div>
      </main>

      <style jsx global>{`
        .ha {
          --ha-bg: #0a0820;
          --ha-bg-2: #100d2b;
          --ha-deep: #03092a;
          --ha-surface: #1c1740;
          --ha-gold: #f5c04a;
          --ha-cyan: #29e6ff;
          --ha-magenta: #ff3ec8;
          --ha-violet: #9b6dff;
          --ha-text: #c9c6e0;
          --ha-muted: #8f8ab0;
          --ha-border: rgba(155, 109, 255, 0.28);
          background:
            radial-gradient(1200px 600px at 85% 30%, rgba(255, 62, 200, 0.12), transparent 60%),
            radial-gradient(900px 600px at 10% 60%, rgba(41, 230, 255, 0.08), transparent 60%),
            linear-gradient(180deg, var(--ha-deep) 0%, var(--ha-bg) 30%, var(--ha-bg-2) 100%);
          color: var(--ha-text);
          font-family: var(--font-ha-body), ui-rounded, system-ui, sans-serif;
          color-scheme: dark;
        }
        .ha-display {
          font-family: var(--font-ha-display), var(--font-ha-body), sans-serif;
          font-weight: 400;
          letter-spacing: 0.01em;
        }
        .ha-gold-text {
          background: linear-gradient(180deg, #fff3c4 0%, #f5c04a 45%, #e08a1e 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 0 18px rgba(245, 192, 74, 0.45));
        }
        .ha-glow-text {
          text-shadow: 0 0 24px rgba(155, 109, 255, 0.55), 0 0 2px rgba(255, 255, 255, 0.6);
        }
        .ha-eyebrow {
          display: inline-block;
          border: 1px solid rgba(41, 230, 255, 0.45);
          border-radius: 999px;
          padding: 0.35rem 0.9rem;
          color: var(--ha-cyan);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          box-shadow: 0 0 18px rgba(41, 230, 255, 0.18), inset 0 0 12px rgba(41, 230, 255, 0.12);
        }
        .ha-panel {
          background: linear-gradient(180deg, rgba(28, 23, 64, 0.88), rgba(16, 13, 43, 0.92));
          border: 1px solid var(--ha-border);
          box-shadow: 0 24px 80px rgba(3, 9, 42, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(10px);
        }

        /* Hero */
        .ha-hero {
          min-height: 760px;
        }
        .ha-hero-shade {
          background:
            linear-gradient(90deg, rgba(3, 9, 42, 0.92) 0%, rgba(3, 9, 42, 0.72) 42%, rgba(3, 9, 42, 0.15) 75%),
            linear-gradient(180deg, rgba(3, 9, 42, 0.2) 0%, transparent 40%, var(--ha-bg) 100%);
        }
        @media (max-width: 1023px) {
          .ha-hero-shade {
            background: linear-gradient(180deg, rgba(3, 9, 42, 0.75) 0%, rgba(3, 9, 42, 0.85) 60%, var(--ha-bg) 100%);
          }
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
          animation: ha-floor 2.4s linear infinite;
          opacity: 0.55;
        }
        .ha-floor-cta {
          opacity: 0.35;
        }
        .ha-marquee {
          filter: drop-shadow(0 0 30px rgba(255, 62, 200, 0.45));
          animation: ha-flicker 4.8s 0.4s both;
        }
        .ha-halo {
          background: radial-gradient(circle, rgba(255, 62, 200, 0.35) 0%, rgba(155, 109, 255, 0.2) 40%, transparent 70%);
          animation: ha-breathe 5s ease-in-out infinite;
        }
        .ha-halo-gold {
          background: radial-gradient(circle, rgba(245, 192, 74, 0.35) 0%, rgba(255, 62, 200, 0.12) 45%, transparent 70%);
        }
        .ha-phone {
          border-radius: 3rem;
          padding: 10px;
          background: linear-gradient(145deg, #2a2360, #0d0a26);
          box-shadow:
            0 0 0 2px rgba(245, 192, 74, 0.7),
            0 0 40px rgba(255, 62, 200, 0.45),
            0 0 90px rgba(41, 230, 255, 0.25),
            0 40px 80px rgba(0, 0, 0, 0.6);
        }
        .ha-phone-screen {
          border-radius: 2.4rem;
          background: #000;
        }
        .ha-sound {
          background: rgba(10, 8, 32, 0.78);
          border: 1px solid rgba(245, 192, 74, 0.6);
          color: #fff;
          backdrop-filter: blur(8px);
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .ha-play {
          background: rgba(10, 8, 32, 0.72);
          border: 2px solid var(--ha-gold);
          color: var(--ha-gold);
          box-shadow: 0 0 30px rgba(245, 192, 74, 0.5);
          backdrop-filter: blur(6px);
        }
        .ha-sound:hover {
          transform: scale(1.05);
          background: rgba(28, 23, 64, 0.9);
        }
        .ha-horus-peek {
          filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.6));
          animation: ha-wave 3.6s ease-in-out infinite;
          transform-origin: bottom center;
        }

        /* Store badges */
        .ha-store {
          background: linear-gradient(180deg, rgba(28, 23, 64, 0.95), rgba(10, 8, 32, 0.95));
          border: 1px solid rgba(245, 192, 74, 0.55);
          color: #fff;
          box-shadow: 0 0 0 0 rgba(245, 192, 74, 0);
          transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .ha-store:hover,
        .ha-store:focus-visible {
          transform: translateY(-3px);
          border-color: var(--ha-gold);
          box-shadow: 0 0 28px rgba(245, 192, 74, 0.45), 0 0 60px rgba(255, 62, 200, 0.2);
        }

        /* Game hall */
        .ha-tabs {
          justify-content: center;
          scrollbar-width: none;
        }
        .ha-tabs::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 767px) {
          .ha-tabs {
            justify-content: flex-start;
          }
        }
        .ha-tab {
          color: var(--ha-text);
          border: 1px solid var(--ha-border);
          background: rgba(28, 23, 64, 0.6);
        }
        .ha-tab[aria-selected="true"] {
          color: #1c1740;
          border-color: transparent;
        }
        .ha-tab-pill {
          background: linear-gradient(180deg, #ffe08a, var(--ha-gold));
          box-shadow: 0 0 22px rgba(245, 192, 74, 0.55);
        }
        .ha-cab {
          perspective: 1100px;
          text-align: start;
          border-radius: 1.5rem;
        }
        .ha-cab:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
        }
        .ha-cab-inner {
          position: relative;
          display: grid;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ha-cab.is-flipped .ha-cab-inner {
          transform: rotateY(180deg);
        }
        @media (hover: hover) and (pointer: fine) {
          .ha-cab:hover .ha-cab-inner {
            transform: rotateY(180deg);
          }
          .ha-cab.is-flipped:hover .ha-cab-inner {
            transform: rotateY(0deg);
          }
        }
        .ha-cab-face {
          grid-area: 1 / 1;
          display: flex;
          flex-direction: column;
          border-radius: 1.5rem;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
          background:
            radial-gradient(120% 60% at 50% 0%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 70%),
            linear-gradient(180deg, #1c1740, #0d0a26);
          box-shadow: 0 0 0 0 transparent, 0 18px 40px rgba(0, 0, 0, 0.45);
          transition: box-shadow 0.3s ease;
        }
        .ha-cab:hover .ha-cab-face,
        .ha-cab.is-flipped .ha-cab-face {
          box-shadow: 0 0 34px color-mix(in srgb, var(--accent) 55%, transparent), 0 18px 40px rgba(0, 0, 0, 0.45);
        }
        .ha-cab-front {
          padding: 0.9rem 0.6rem 1rem;
          align-items: center;
        }
        .ha-cab-sign {
          width: 100%;
          filter: drop-shadow(0 0 10px color-mix(in srgb, var(--accent) 70%, transparent));
        }
        .ha-cab-art {
          margin-top: -4px;
          filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.55));
        }
        .ha-cab-name {
          margin-top: auto;
          padding-top: 0.5rem;
          font-size: 1.15rem;
          color: #fff;
          text-align: center;
        }
        /* The back is laid over the front, so only the front sizes the card
           and every cabinet in a row stays the same height. */
        .ha-cab-back {
          position: absolute;
          inset: 0;
          overflow: hidden;
          transform: rotateY(180deg);
          padding: 0.8rem;
        }
        .ha-cab-play {
          background: radial-gradient(circle at 50% 60%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%);
        }
        .ha-cab-howto {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          overflow: hidden;
        }
        .ha-chip {
          display: inline-block;
          border-radius: 999px;
          padding: 0.15rem 0.6rem;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          border: 1px solid color-mix(in srgb, var(--accent) 60%, transparent);
        }
        .ha-parade {
          box-shadow: 0 0 0 1px rgba(245, 192, 74, 0.45), 0 0 60px rgba(255, 62, 200, 0.25);
        }

        /* Spotlight */
        .ha-spot::before {
          content: "";
          position: absolute;
          inset: -40% -20% auto auto;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 70%);
          pointer-events: none;
        }
        .ha-mode {
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid rgba(139, 92, 246, 0.35);
        }
        .ha-shot {
          border-radius: 1.6rem;
          box-shadow: 0 0 0 1px rgba(245, 192, 74, 0.4), 0 24px 50px rgba(0, 0, 0, 0.55);
          height: auto;
        }
        .ha-clip {
          border-top: 3px solid var(--accent);
        }

        /* Versus */
        .ha-versus {
          background:
            radial-gradient(70% 90% at 0% 50%, rgba(41, 230, 255, 0.16), transparent 60%),
            radial-gradient(70% 90% at 100% 50%, rgba(255, 62, 200, 0.18), transparent 60%),
            linear-gradient(180deg, #1c1740, #0d0a26);
          border: 1px solid var(--ha-border);
        }
        .ha-versus-video {
          box-shadow: 0 0 50px rgba(255, 62, 200, 0.3);
        }
        .ha-point-dot {
          background: var(--ha-magenta);
          box-shadow: 0 0 10px var(--ha-magenta);
        }
        .ha-seth img {
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
        }

        /* Ranks */
        .ha-float {
          animation: ha-float 6s ease-in-out infinite;
        }
        .ha-float-slow {
          animation-duration: 7.5s;
          animation-delay: -2s;
        }
        .ha-float-fast {
          animation-duration: 4.5s;
          animation-delay: -1s;
        }
        .ha-feature {
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .ha-feature:hover {
          transform: translateY(-4px);
          border-color: rgba(245, 192, 74, 0.6);
        }

        /* Screenshots */
        .ha-strip {
          scroll-snap-type: x mandatory;
          scrollbar-width: thin;
          scrollbar-color: var(--ha-violet) transparent;
          mask-image: linear-gradient(90deg, transparent, black 4%, black 96%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, black 4%, black 96%, transparent);
        }

        /* CTA */
        .ha-cta {
          background:
            radial-gradient(60% 120% at 50% 0%, rgba(255, 62, 200, 0.25), transparent 60%),
            linear-gradient(180deg, #221b52, #0d0a26);
          border: 1px solid rgba(245, 192, 74, 0.45);
          box-shadow: 0 0 80px rgba(155, 109, 255, 0.25);
        }
        .ha-icon {
          box-shadow: 0 0 0 2px rgba(245, 192, 74, 0.7), 0 0 50px rgba(245, 192, 74, 0.35);
        }

        /* FAQ + footer */
        .ha-faq summary::-webkit-details-marker {
          display: none;
        }
        .ha-faq-plus {
          transition: transform 0.25s ease;
        }
        .ha-faq[open] .ha-faq-plus {
          transform: rotate(45deg);
        }
        .ha-social {
          border: 1px solid var(--ha-border);
          color: var(--ha-text);
          transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .ha-social:hover {
          color: #fff;
          border-color: var(--ha-cyan);
          box-shadow: 0 0 18px rgba(41, 230, 255, 0.3);
        }
        .ha-sticky-btn {
          background: rgba(16, 13, 43, 0.92);
          border: 1px solid rgba(245, 192, 74, 0.55);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), 0 0 24px rgba(255, 62, 200, 0.25);
          backdrop-filter: blur(12px);
        }
        @media (max-width: 767px) {
          .ha {
            padding-bottom: 5.5rem;
          }
        }

        /* First paint: CSS-only so the hero shows before hydration. */
        .ha-rise {
          animation: ha-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .ha-rise-late {
          animation-delay: 0.2s;
        }
        @keyframes ha-rise {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes ha-floor {
          to {
            background-position: 0 64px;
          }
        }
        @keyframes ha-flicker {
          0%, 6%, 10%, 14% { opacity: 0.25; }
          4%, 8%, 12%, 100% { opacity: 1; }
        }
        @keyframes ha-breathe {
          50% {
            transform: translate(-50%, -50%) scale(1.08);
            opacity: 0.8;
          }
        }
        .ha-halo-gold {
          animation-name: ha-breathe-plain;
        }
        @keyframes ha-breathe-plain {
          50% {
            transform: scale(1.06);
            opacity: 0.8;
          }
        }
        @keyframes ha-wave {
          50% {
            transform: rotate(-4deg) translateY(-6px);
          }
        }
        @keyframes ha-float {
          50% {
            transform: translateY(-14px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ha *,
          .ha *::before,
          .ha *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
