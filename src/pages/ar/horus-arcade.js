import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Noto_Kufi_Arabic, Tajawal } from "next/font/google";
import DownloadQr from "../../components/horus-arcade/DownloadQr";
import StoreBadges from "../../components/horus-arcade/StoreBadges";
import { GAMES, SHELVES } from "../../components/horus-arcade/games";
import { CONTACT_EMAIL } from "../../lib/contact.mjs";
import {
  ARABIC_HREFLANG,
  DEFAULT_HREFLANG,
  ENGLISH_HREFLANG,
  getLocalizedUrls,
} from "../../lib/project-seo.mjs";
import {
  ANDROID_STORE_URL,
  DOWNLOAD_PATH,
  IOS_STORE_URL,
} from "../../lib/horus-arcade-download.mjs";
import { HORUS_ARCADE_URL, PORTFOLIO_URL } from "../../lib/site-urls.mjs";

const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-ha-ar-display",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
  variable: "--font-ha-ar-body",
});

const PAGE_URL = `${HORUS_ARCADE_URL}/ar`;
const LOCALIZED_URLS = getLocalizedUrls(HORUS_ARCADE_URL);
const TITLE = "هورس أركيد – 23 لعبة أركيد وألغاز مجانية";
const DESCRIPTION =
  "هورس أركيد يجمع 23 لعبة أركيد وألغاز وذكاء وألعاب لوحية وكلمات في تطبيق مجاني للآيفون وأندرويد، ويعمل بدون إنترنت.";
const IMG = "/images/horus-arcade";

const SHELF_COPY = {
  brain: ["ألعاب ذكاء", "سرعة ملاحظة وذاكرة وحساب ذهني في جولات قصيرة."],
  puzzle: ["ألغاز", "رتّب وادمج واكتشف الحل من غير ضغط جلسة طويلة."],
  arcade: ["أركيد", "رد فعل سريع ومحاولات قصيرة تقدر تعيدها في أي وقت."],
  classics: ["كلاسيكيات", "ألعاب لوحية معروفة بطابع مصري قديم ومنافس اسمه ست."],
  word: ["كلمات", "تحديات كلمات يومية بالإنجليزية والعربية."],
};

const FACTS = [
  ["23", "لعبة في تطبيق واحد"],
  ["5", "أقسام داخل الصالة"],
  ["5", "تحديات يومية"],
  ["3", "مستويات لمنافسة ست"],
];

const ANSWERS = [
  {
    q: "هل هورس أركيد لعبة مجانية تعمل بدون إنترنت على أندرويد؟",
    a: "نعم. تحميل هورس أركيد مجاني على أندرويد، وكل الألعاب الـ23 تعمل بدون اتصال. تُحفظ نتائجك وتُرسل إلى لوحات الصدارة عند رجوع الإنترنت؛ مباريات Eyecon الأونلاين فقط تحتاج اتصالًا.",
  },
  {
    q: "ما الألعاب المشابهة لسنت داخل التطبيق؟",
    a: "يضم التطبيق Senet، لعبة السباق المصرية القديمة، وNile Seeds بأسلوب المانكالا، وKemet Draughts المستوحاة من الداما. تقدر تلعبها ضد ست أو مع صديق على نفس الهاتف.",
  },
  {
    q: "ما الألعاب التي تدعم لاعبين على هاتف واحد؟",
    a: "تدعم Eyecon وضع Duo للاعبين، كما تدعم Four in a Row وSenet وNile Seeds وKemet Draughts اللعب بالتبادل على نفس الهاتف.",
  },
];

const FAQS = [
  ...ANSWERS,
  {
    q: "ما هو تطبيق هورس أركيد؟",
    a: "هورس أركيد صالة ألعاب مصرية بطابع نيون يستضيفها حورس الصقر. تجمع 23 لعبة أركيد وألغاز وذكاء وألعاب لوحية وكلمات في تطبيق واحد للآيفون وأندرويد.",
  },
  {
    q: "هل كل الألعاب مجانية؟",
    a: "نعم، كل الألعاب الـ23 متاحة مجانًا. توجد إعلانات ومشتريات اختيارية للعملات وإزالة الإعلانات واشتراك Premium، لكنها ليست مطلوبة للعب.",
  },
  {
    q: "هل توجد ألعاب يومية ولوحات صدارة؟",
    a: "نعم. توجد لوحات يومية جديدة في Number Stack وSand Slide وTomb Sweeper وSphinx Sudoku وكلمة يومية، مع ترتيب أسبوعي وعام ولوحة لكل لعبة.",
  },
  {
    q: "أين أحمّل هورس أركيد؟",
    a: "من App Store على iPhone ومن Google Play على Android. رابط horus-arcade.ibassemtarek.fyi/ar/download يفتح المتجر المناسب تلقائيًا على الهاتف.",
  },
];

export default function ArabicHorusArcadePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MobileApplication", "VideoGame"],
        "@id": `${HORUS_ARCADE_URL}/#app`,
        name: "Horus Arcade",
        alternateName: ["هورس أركيد", "Eyecon"],
        url: `${HORUS_ARCADE_URL}/`,
        description: DESCRIPTION,
        image: `${HORUS_ARCADE_URL}${IMG}/app-icon.jpg`,
        applicationCategory: "GameApplication",
        operatingSystem: "iOS, Android",
        gamePlatform: ["iOS", "Android"],
        playMode: ["SinglePlayer", "MultiPlayer"],
        inLanguage: [ENGLISH_HREFLANG, ARABIC_HREFLANG],
        isAccessibleForFree: true,
        downloadUrl: [IOS_STORE_URL, ANDROID_STORE_URL],
        installUrl: `${HORUS_ARCADE_URL}/ar${DOWNLOAD_PATH}`,
        offers: {
          "@type": "Offer",
          url: `${HORUS_ARCADE_URL}/ar${DOWNLOAD_PATH}`,
          price: "0",
          priceCurrency: "USD",
        },
        author: { "@id": `${PORTFOLIO_URL}/#person` },
        publisher: { "@type": "Organization", name: "Fanar, LLC" },
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: ARABIC_HREFLANG,
        isPartOf: { "@id": `${HORUS_ARCADE_URL}/#website` },
        about: { "@id": `${HORUS_ARCADE_URL}/#app` },
        mainEntity: { "@id": `${HORUS_ARCADE_URL}/#app` },
        primaryImageOfPage: `${HORUS_ARCADE_URL}${IMG}/og-banner.jpg`,
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        inLanguage: ARABIC_HREFLANG,
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
        <meta name="theme-color" content="#08061d" />
        <link rel="canonical" href={PAGE_URL} key="canonical" />
        <link rel="alternate" hrefLang={ENGLISH_HREFLANG} href={LOCALIZED_URLS.english} key="alternate-en" />
        <link rel="alternate" hrefLang={ARABIC_HREFLANG} href={LOCALIZED_URLS.arabic} key="alternate-ar-eg" />
        <link rel="alternate" hrefLang={DEFAULT_HREFLANG} href={LOCALIZED_URLS.default} key="alternate-x-default" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_EG" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:site_name" content="Horus Arcade" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={`${HORUS_ARCADE_URL}${IMG}/og-banner.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="عين حورس وسط ألعاب نيون وأهرامات في هورس أركيد" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${HORUS_ARCADE_URL}${IMG}/og-banner.jpg`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </Head>

      <main
        lang="ar"
        dir="rtl"
        className={`ha-ar ${kufi.variable} ${tajawal.variable} min-h-screen overflow-hidden`}
      >
        <section className="ha-ar-hero relative isolate overflow-hidden px-6 pb-24 pt-7">
          <Image
            src={`${IMG}/hall-wide.webp`}
            alt="صالة هورس أركيد المضيئة بألعاب النيون والأهرامات"
            fill
            priority
            sizes="100vw"
            className="-z-30 object-cover opacity-40"
          />
          <div className="ha-ar-veil absolute inset-0 -z-20" />
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <Image src={`${IMG}/marquee.webp`} alt="Horus Arcade" width={1000} height={326} priority className="h-auto w-52 sm:w-40" />
            <Link href={`${HORUS_ARCADE_URL}/`} hrefLang={ENGLISH_HREFLANG} className="rounded-full border border-white/25 bg-[#08061d]/70 px-4 py-2 text-sm font-bold text-white backdrop-blur hover:border-[#29e6ff]">
              English
            </Link>
          </nav>

          <div className="mx-auto grid max-w-6xl grid-cols-[1.08fr_0.92fr] items-center gap-10 pt-20 lg:grid-cols-1 lg:pt-14">
            <div className="lg:text-center">
              <p className="inline-flex rounded-full border border-[#f5c04a]/40 bg-[#08061d]/65 px-4 py-2 text-sm font-bold text-[#f5c04a] backdrop-blur">
                صالة ألعاب مصرية على موبايلك
              </p>
              <h1 className="ha-ar-display mt-6 max-w-3xl text-6xl font-extrabold leading-[1.3] text-white xl:text-5xl md:text-4xl lg:mx-auto">
                23 لعبة. صالة واحدة. <span className="ha-ar-neon">والدخول مجاني.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-9 text-[#d8d4eb] md:text-lg lg:mx-auto">
                أركيد وألغاز وذكاء وألعاب مصرية قديمة وكلمات، مع تحديات يومية
                ومنافس اسمه ست. العب على iPhone أو Android حتى من غير إنترنت.
              </p>
              <StoreBadges className="mt-8 lg:justify-center" />
            </div>
            <div className="ha-ar-portal relative mx-auto flex h-[460px] w-[390px] max-w-full items-end justify-center sm:h-[380px] sm:w-[310px]">
              <div className="ha-ar-eye absolute left-1/2 top-10 h-48 w-48 -translate-x-1/2 rounded-full" />
              <Image src={`${IMG}/horus-trophy.webp`} alt="حورس يرفع كأس هورس أركيد" width={768} height={768} priority sizes="360px" className="relative z-10 h-auto w-[360px] max-w-[88%]" />
            </div>
          </div>
        </section>

        <section aria-label="حقائق عن هورس أركيد" className="mx-auto -mt-8 grid max-w-6xl grid-cols-4 gap-3 px-6 lg:grid-cols-2 sm:grid-cols-1">
          {FACTS.map(([value, label]) => (
            <div key={label} className="ha-ar-panel rounded-2xl p-5 text-center">
              <strong className="ha-ar-display block text-4xl text-[#f5c04a]">{value}</strong>
              <span className="mt-1 block text-sm font-bold">{label}</span>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-6xl px-6 py-28 md:py-20">
          <p className="text-sm font-extrabold text-[#29e6ff]">داخل الصالة</p>
          <h2 className="ha-ar-display mt-3 text-4xl font-extrabold text-white md:text-3xl">خمس رفوف، وكل رف له مزاجه</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#b9b4d1]">
            اختر جولة ذكاء سريعة، لغزًا هادئًا، منافسة مع صديق، أو محاولة جديدة لكسر رقمك.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-1">
            {SHELVES.map((shelf) => {
              const [label, description] = SHELF_COPY[shelf.id];
              const games = GAMES.filter((game) => game.shelf === shelf.id);
              return (
                <article key={shelf.id} className="ha-ar-panel rounded-3xl p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="ha-ar-display text-2xl font-bold text-white">{label}</h3>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#f5c04a]">{games.length} ألعاب</span>
                  </div>
                  <p className="mt-3 leading-7 text-[#b9b4d1]">{description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2 p-0">
                    {games.map((game) => (
                      <li key={game.id} className="list-none rounded-full border border-white/10 bg-[#08061d]/60 px-3 py-1.5 text-sm font-bold">{game.name}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="ha-ar-answer-zone px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-extrabold text-[#ff63d4]">إجابات مباشرة</p>
            <h2 className="ha-ar-display mt-3 text-4xl font-extrabold text-white md:text-3xl">العب بالطريقة التي تناسبك</h2>
            <div className="mt-10 grid grid-cols-3 gap-5 xl:grid-cols-1">
              {ANSWERS.map(({ q, a }) => (
                <article key={q} className="ha-ar-panel rounded-3xl p-6">
                  <h3 className="ha-ar-display text-xl font-bold leading-9 text-white">{q}</h3>
                  <p className="mt-4 leading-8 text-[#c5c0d9]">{a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-10 px-6 py-24 lg:grid-cols-1 lg:text-center">
          <div>
            <p className="text-sm font-extrabold text-[#f5c04a]">الصالة مفتوحة</p>
            <h2 className="ha-ar-display mt-3 text-4xl font-extrabold text-white md:text-3xl">حمّل 23 لعبة مرة واحدة</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#b9b4d1] lg:mx-auto">افتح رابط التحميل من موبايلك للانتقال إلى المتجر المناسب، أو امسح الكود بالكاميرا.</p>
            <Link href={`/ar${DOWNLOAD_PATH}`} className="ha-ar-cta mt-7 inline-flex rounded-2xl px-7 py-3.5 font-extrabold text-[#08061d]">حمّل هورس أركيد</Link>
          </div>
          <div className="justify-self-center"><DownloadQr caption="امسح الكود بالموبايل" /></div>
        </section>

        <section id="faq" className="mx-auto max-w-4xl px-6 pb-24">
          <h2 className="ha-ar-display text-4xl font-extrabold text-white md:text-3xl">أسئلة شائعة</h2>
          <div className="mt-8 space-y-3">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="ha-ar-panel rounded-2xl px-6 py-5">
                <summary className="ha-ar-display flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-white">
                  {q}<span aria-hidden="true" className="text-2xl text-[#f5c04a]">+</span>
                </summary>
                <p className="mt-4 leading-8 text-[#c5c0d9]">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-[#8f89aa]">
            هورس أركيد من تطوير باسم طارق ونشر Fanar, LLC · <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 hover:text-white">{CONTACT_EMAIL}</a>
          </p>
        </section>
      </main>

      <style jsx global>{`
        .ha-ar { --ha-muted: #9d97b8; background: #08061d; color: #d8d4eb; color-scheme: dark; font-family: var(--font-ha-ar-body), sans-serif; }
        .ha-ar-display, .ha-display { font-family: var(--font-ha-ar-display), var(--font-ha-ar-body), sans-serif; }
        .ha-ar-hero { background: #08061d; }
        .ha-ar-veil { background: linear-gradient(90deg, rgba(8,6,29,.98), rgba(8,6,29,.64), rgba(8,6,29,.9)), linear-gradient(0deg, #08061d, transparent 45%); }
        .ha-ar-neon { text-shadow: 0 0 12px rgba(255,62,200,.75), 0 0 38px rgba(41,230,255,.55); }
        .ha-ar-portal { border: 1px solid rgba(245,192,74,.32); border-radius: 48% 48% 14% 14% / 38% 38% 12% 12%; background: radial-gradient(circle at 50% 35%, rgba(41,230,255,.22), rgba(255,62,200,.1) 45%, rgba(8,6,29,.72) 72%); box-shadow: inset 0 0 70px rgba(41,230,255,.08), 0 35px 90px rgba(0,0,0,.45); }
        .ha-ar-eye { background: radial-gradient(circle, #fff 0 4%, #29e6ff 5% 12%, #1b1247 13% 32%, rgba(255,62,200,.35) 34%, transparent 68%); filter: drop-shadow(0 0 26px rgba(41,230,255,.55)); animation: ha-ar-eye-pulse 3.6s ease-in-out infinite; }
        .ha-ar-panel { border: 1px solid rgba(155,109,255,.24); background: linear-gradient(145deg, rgba(28,23,64,.92), rgba(10,8,32,.94)); box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 18px 50px rgba(0,0,0,.24); }
        .ha-ar-answer-zone { background: linear-gradient(90deg, rgba(41,230,255,.05), rgba(255,62,200,.09), rgba(245,192,74,.05)); border-block: 1px solid rgba(155,109,255,.16); }
        .ha-ar-cta { background: linear-gradient(135deg, #f5c04a, #ffdf78); box-shadow: 0 12px 35px rgba(245,192,74,.24); transition: transform .2s ease; }
        .ha-ar-cta:hover, .ha-ar-cta:focus-visible { transform: translateY(-2px); }
        .ha-store { background: linear-gradient(180deg, rgba(28,23,64,.95), rgba(10,8,32,.95)); border: 1px solid rgba(245,192,74,.5); color: #fff; transition: transform .2s ease; }
        .ha-store:hover, .ha-store:focus-visible { transform: translateY(-3px); }
        @keyframes ha-ar-eye-pulse { 0%,100% { opacity:.72; transform:translateX(-50%) scale(.96); } 50% { opacity:1; transform:translateX(-50%) scale(1.04); } }
        @media (prefers-reduced-motion: reduce) { .ha-ar-eye { animation:none; } .ha-store, .ha-ar-cta { transition:none; } }
      `}</style>
    </>
  );
}
