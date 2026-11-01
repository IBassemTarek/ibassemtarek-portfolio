import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import heroPic from "../../public/images/profile/bassem-hero.webp";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LinkArrow } from "@/components/AppIcons";
import TransitionEffect from "@/components/TransitionEffect";
import ContactForm from "@/components/ContactForm";
import { projectData } from "@/utils/projectsData";

const SITE_URL = "https://ibassemtarek.vercel.app";
const TITLE = "Bassem Tarek | Mobile & Full-Stack Developer (React Native, Next.js)";
const DESCRIPTION =
  "Bassem Tarek is a software engineer with 5+ years of experience building iOS and Android apps, web apps and backends with React Native, Flutter, Next.js and NestJS. Projects include Horus Arcade, Dahabna, SHM and Simply Nikah.";
const OG_IMAGE_URL = `${SITE_URL}/images/profile/og-home.jpg`;

const SOCIALS = [
  "https://github.com/IBassemTarek",
  "https://www.linkedin.com/in/ibassemtarek/",
  "https://twitter.com/IBassemTarek",
];

const STACK = [
  "React Native",
  "Flutter",
  "Next.js",
  "NestJS",
  "TypeScript",
  "GraphQL",
  "PostgreSQL",
  "Docker",
  "AWS",
];

// Same numbers as the About page.
const STATS = [
  { value: "5+", label: "Years building software" },
  { value: "12+", label: "Projects delivered" },
  { value: "10+", label: "Happy clients" },
  { value: "4", label: "Apps live in the stores" },
];

// The apps with their own pages, newest first.
const APPS = [10, 11, 12, 13].map((id) =>
  projectData.find((project) => project.id === id)
);

const SERVICES = [
  {
    title: "Mobile apps",
    copy: "iOS and Android apps in React Native and Flutter, from the first screen to the App Store and Google Play launch.",
    tags: ["React Native", "Flutter", "Expo"],
    icon: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 3v13h10V5H7zm5 14.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  },
  {
    title: "Web apps & landing pages",
    copy: "Fast, SEO-ready sites, dashboards and campaign pages in Next.js and React.",
    tags: ["Next.js", "React", "Tailwind"],
    icon: "M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm1 4v10h16V8H4zm1-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  },
  {
    title: "Backends & APIs",
    copy: "REST and GraphQL APIs, auth, payments and real-time features in NestJS and Node.js.",
    tags: ["NestJS", "GraphQL", "PostgreSQL", "MongoDB"],
    icon: "M4 4h16v6H4V4zm0 10h16v6H4v-6zm3-8a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  },
  {
    title: "Cloud & DevOps",
    copy: "Docker, CI/CD and AWS deployments that keep apps fast, monitored and online.",
    tags: ["Docker", "AWS", "CI/CD"],
    icon: "M19 18H7a5 5 0 0 1-.9-9.92A6 6 0 0 1 17.65 9 4.5 4.5 0 0 1 19 18z",
  },
];

// Short, quotable answers for search snippets and AI answer engines; the
// same text is in the FAQPage JSON-LD.
const FAQS = [
  {
    q: "Who is Bassem Tarek?",
    a: "Bassem Tarek Mahrous is a software engineer with 5+ years of experience building mobile apps, web apps and backends. He works as a backend developer at GiveBrite LLC, and his recent projects include Horus Arcade, Dahabna, SHM and Simply Nikah.",
  },
  {
    q: "What does Bassem Tarek build?",
    a: "iOS and Android apps in React Native and Flutter, web apps and landing pages in Next.js, backends and APIs in NestJS and Node.js, and the Docker and AWS setup to run them.",
  },
  {
    q: "Which technologies does he work with?",
    a: "React Native, Flutter, React, Next.js, NestJS, TypeScript, GraphQL, PostgreSQL, MongoDB, Firebase, Docker and AWS.",
  },
  {
    q: "How can I hire Bassem Tarek?",
    a: "Use the contact form on this page or email ibassemtarek@gmail.com. You can also download his resume or reach him on LinkedIn.",
  },
];

const linkPropsFor = (href) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {};

function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ eyebrow, title, id, children }) {
  return (
    <Reveal className="mb-10 max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary dark:text-primaryDark">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-5xl font-bold text-dark dark:text-light lg:text-4xl sm:text-3xl"
      >
        {title}
      </h2>
      {children && (
        <p className="mt-3 text-lg font-medium text-dark/75 dark:text-light/75 sm:text-base">
          {children}
        </p>
      )}
    </Reveal>
  );
}

export default function Home() {
  const reduce = useReducedMotion();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Bassem Tarek",
        description: DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Bassem Tarek Mahrous",
        alternateName: ["Bassem Tarek", "IBassemTarek"],
        url: SITE_URL,
        image: `${SITE_URL}/images/profile/bassem-hero.webp`,
        email: "mailto:ibassemtarek@gmail.com",
        jobTitle: "Software Engineer, Mobile & Full-Stack Developer",
        worksFor: { "@type": "Organization", name: "GiveBrite LLC" },
        knowsAbout: [
          ...STACK,
          "React",
          "MongoDB",
          "Firebase",
          "Mobile app development",
          "Backend development",
          "App Store Optimization",
        ],
        sameAs: SOCIALS,
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
        primaryImageOfPage: OG_IMAGE_URL,
        dateModified: "2026-11-01",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".home-summary", ".home-faq-answer"],
        },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#apps`,
        name: "Apps by Bassem Tarek",
        itemListElement: APPS.map((app, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "MobileApplication",
            name: app.title,
            description: app.summary,
            url: app.href.startsWith("http") ? app.href : `${SITE_URL}${app.href}`,
            image: `${SITE_URL}${app.img.src}`,
            applicationCategory: app.title === "Horus Arcade" ? "GameApplication" : "LifestyleApplication",
            author: { "@id": `${SITE_URL}/#person` },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
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
          content="index, follow, max-image-preview:large, max-snippet:-1"
        />
        <meta name="author" content="Bassem Tarek Mahrous" />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta
          name="google-site-verification"
          content="ypEHRoJMh52hPC3nL6q6Xaa5ZMHj2Fl0mm5lvYja_Ss"
        />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Bassem Tarek" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Bassem Tarek, mobile and full-stack developer, at his laptop"
        />
        <meta property="profile:first_name" content="Bassem" />
        <meta property="profile:last_name" content="Tarek Mahrous" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@IBassemTarek" />
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
      <TransitionEffect />
      <main className="w-full text-dark dark:text-light">
        <Layout className="relative overflow-hidden pt-8 md:p-8 sm:p-6">
          {/* ── Hero ─────────────────────────────────────────── */}
          <div
            aria-hidden="true"
            className="home-hero-glow pointer-events-none absolute inset-x-0 top-0 h-[60rem]"
          />

          <section
            aria-labelledby="hero-title"
            className="relative grid grid-cols-[1fr_1.05fr] items-center gap-10 lg:grid-cols-1 lg:gap-4"
          >
            <div className="flex flex-col items-start lg:order-2 lg:items-center lg:text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-dark/15 bg-light/70 px-4 py-1.5 text-sm font-semibold backdrop-blur dark:border-light/20 dark:bg-dark/60">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primaryDark opacity-70 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primaryDark" />
                </span>
                Software engineer · Mobile &amp; full-stack
              </p>
              <div id="hero-title" className="mt-4 w-full">
                <AnimatedText
                  className="!text-left !text-6xl xl:!text-5xl lg:!text-center md:!text-5xl sm:!text-4xl"
                  text={"Dreams Coded, Visions Designed."}
                />
              </div>
              <p className="home-summary mt-4 max-w-xl text-lg font-medium leading-relaxed text-dark/80 dark:text-light/80 md:text-base">
                I&apos;m Bassem Tarek, a software engineer who builds iOS and
                Android apps and the backends behind them. I turn ideas into
                products people use every day, like{" "}
                <Link href="/horus-arcade" className="font-semibold text-primary underline-offset-4 hover:underline dark:text-primaryDark">
                  Horus Arcade
                </Link>{" "}
                and{" "}
                <Link href="/dahabna" className="font-semibold text-primary underline-offset-4 hover:underline dark:text-primaryDark">
                  Dahabna
                </Link>
                .
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3 lg:justify-center">
                <Link
                  className="flex items-center rounded-xl border-2 border-solid border-transparent bg-dark p-2.5 px-6 text-lg font-semibold text-light shadow-lg transition hover:border-dark hover:bg-light hover:text-dark dark:bg-light dark:text-dark hover:dark:border-light hover:dark:bg-dark hover:dark:text-light md:p-2 md:px-4 md:text-base"
                  href={"/BassemTarekMahrousResume.pdf"}
                  target={"_blank"}
                  rel="noreferrer"
                  aria-label="Open Bassem Tarek Mahrous resume PDF"
                >
                  Resume
                  <span className="ml-2 inline-flex h-6 w-6 shrink-0">
                    <LinkArrow />
                  </span>
                </Link>
                <Link
                  href="/projects"
                  className="rounded-xl border-2 border-solid border-dark p-2.5 px-6 text-lg font-semibold transition hover:bg-dark hover:text-light dark:border-light hover:dark:bg-light hover:dark:text-dark md:p-2 md:px-4 md:text-base"
                >
                  View projects
                </Link>
                <Link
                  href={"#contact"}
                  aria-label="Jump to contact form"
                  className="group relative ml-2 text-lg font-medium md:text-base"
                >
                  Contact
                  <span className="absolute -bottom-0.5 left-0 inline-block h-[2px] w-0 bg-dark transition-[width] duration-300 ease-out group-hover:w-full dark:bg-light">
                    &nbsp;
                  </span>
                </Link>
              </div>

              <ul aria-label="Main technologies" className="mt-8 flex flex-wrap gap-2 p-0 lg:justify-center">
                {STACK.map((skill) => (
                  <li
                    key={skill}
                    className="list-none rounded-full border border-dark/15 bg-light/80 px-3 py-1 text-sm font-semibold text-dark/80 dark:border-light/15 dark:bg-dark/60 dark:text-light/80"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative lg:order-1 lg:mx-auto lg:w-full lg:max-w-xl">
              <div
                aria-hidden="true"
                className="home-portrait-glow pointer-events-none absolute -inset-[6%]"
              />
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={heroPic}
                  alt="Bassem Tarek Mahrous, mobile and full-stack developer, working on his laptop"
                  className="relative h-auto w-full"
                  priority
                  sizes="(max-width: 1023px) 92vw, 52vw"
                />
              </motion.div>
              <motion.div
                className="absolute bottom-[12%] left-[2%] rounded-2xl border border-dark/10 bg-light/90 px-4 py-3 shadow-xl backdrop-blur dark:border-light/15 dark:bg-dark/80 sm:px-3 sm:py-2"
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-2xl font-bold leading-none sm:text-xl">5+ years</p>
                <p className="text-xs font-semibold text-dark/60 dark:text-light/60">shipping software</p>
              </motion.div>
              <motion.div
                className="absolute right-[2%] top-[6%] rounded-2xl border border-dark/10 bg-light/90 px-4 py-3 shadow-xl backdrop-blur dark:border-light/15 dark:bg-dark/80 sm:px-3 sm:py-2"
                animate={reduce ? undefined : { y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-2xl font-bold leading-none text-primary dark:text-primaryDark sm:text-xl">
                  4 apps
                </p>
                <p className="text-xs font-semibold text-dark/60 dark:text-light/60">live in the stores</p>
              </motion.div>
            </div>
          </section>

          {/* ── Stats ────────────────────────────────────────── */}
          <section aria-label="At a glance" className="relative mt-16 md:mt-10">
            <dl className="m-0 grid grid-cols-4 overflow-hidden rounded-3xl border border-dark/10 bg-light/80 shadow-xl backdrop-blur dark:border-light/10 dark:bg-dark/70 md:grid-cols-2">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse items-center gap-1 border-dark/10 p-6 text-center dark:border-light/10 [&:not(:last-child)]:border-r md:[&:nth-child(2)]:border-r-0 md:[&:nth-child(-n+2)]:border-b"
                >
                  <dt className="text-sm font-semibold text-dark/65 dark:text-light/65">{stat.label}</dt>
                  <dd className="m-0 bg-gradient-to-r from-primary to-primaryDark bg-clip-text text-5xl font-bold text-transparent sm:text-4xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Apps ─────────────────────────────────────────── */}
          <section aria-labelledby="apps-title" className="relative mt-28 md:mt-20">
            <SectionTitle eyebrow="Live in the stores" title="Apps I've shipped" id="apps-title">
              Real products on the App Store and Google Play, from a 23-game
              arcade to live gold prices and trading tools.
            </SectionTitle>
            <ul className="grid grid-cols-2 gap-8 p-0 md:grid-cols-1 md:gap-6">
              {APPS.map((app, index) => (
                <li key={app.id} className="list-none">
                  <Reveal delay={0.08 * index} className="h-full">
                    <Link
                      href={app.href}
                      {...linkPropsFor(app.href)}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-dark/10 bg-light shadow-lg transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl dark:border-light/10 dark:bg-dark"
                    >
                      <div className="overflow-hidden">
                        <Image
                          src={app.img}
                          alt={`${app.title} app`}
                          className="h-auto w-full transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 767px) 100vw, 50vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6 sm:p-5">
                        <p className="text-sm font-semibold text-primary dark:text-primaryDark">{app.tag}</p>
                        <h3 className="mt-1 text-2xl font-bold">{app.title}</h3>
                        <p className="mt-2 flex-1 text-base text-dark/75 dark:text-light/75">{app.summary}</p>
                        <span className="mt-4 inline-flex items-center text-base font-semibold">
                          {app.href.startsWith("http") ? "Visit the site" : "See the app"}
                          <span className="ml-2 inline-flex h-5 w-5 shrink-0 transition group-hover:translate-x-1">
                            <LinkArrow />
                          </span>
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Services ─────────────────────────────────────── */}
          <section aria-labelledby="services-title" className="relative mt-28 md:mt-20">
            <SectionTitle eyebrow="What I do" title="From idea to app store" id="services-title">
              One developer for the app, the API behind it and the launch.
            </SectionTitle>
            <ul className="grid grid-cols-4 gap-6 p-0 xl:grid-cols-2 sm:grid-cols-1">
              {SERVICES.map((service, index) => (
                <li key={service.title} className="list-none">
                  <Reveal delay={0.06 * index} className="h-full rounded-3xl border border-dark/10 bg-light p-6 shadow-md transition hover:border-primary/40 hover:shadow-xl dark:border-light/10 dark:bg-dark dark:hover:border-primaryDark/40">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primaryDark text-light">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
                        <path d={service.icon} />
                      </svg>
                    </span>
                    <h3 className="mt-4 text-xl font-bold">{service.title}</h3>
                    <p className="mt-2 text-base text-dark/75 dark:text-light/75">{service.copy}</p>
                    <p className="mt-4 text-sm font-semibold text-dark/55 dark:text-light/55">
                      {service.tags.join(" · ")}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>

          {/* ── FAQ ──────────────────────────────────────────── */}
          <section aria-labelledby="faq-title" className="relative mt-28 md:mt-20">
            <SectionTitle eyebrow="Quick answers" title="Good to know" id="faq-title" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              {FAQS.map(({ q, a }) => (
                <details
                  key={q}
                  className="group rounded-2xl border border-dark/10 bg-light p-5 shadow-sm open:shadow-lg dark:border-light/10 dark:bg-dark"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                    {q}
                    <span aria-hidden="true" className="text-2xl text-primary transition group-open:rotate-45 dark:text-primaryDark">
                      +
                    </span>
                  </summary>
                  <p className="home-faq-answer mt-3 text-base text-dark/75 dark:text-light/75">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <ContactForm />
        </Layout>
      </main>
    </>
  );
}
