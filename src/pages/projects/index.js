import { GithubIcon, LinkArrow } from "@/components/AppIcons";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import TransitionEffect from "@/components/TransitionEffect";
import { featureProject, projectData } from "@/utils/projectsData";
import {
  ANDROID_STORE_URL,
  IOS_STORE_URL,
} from "@/lib/horus-arcade-download.mjs";
import { PORTFOLIO_URL } from "@/lib/site-urls.mjs";

const SITE_URL = PORTFOLIO_URL;
const TITLE = "Projects | Bassem Tarek – Mobile Apps, Web Apps & Backends";
const DESCRIPTION =
  "Projects by Bassem Tarek: Horus Arcade, Dahabna, SHM, Simply Nikah, SmooV and blthanih mobile apps, plus web platforms and backends for startups.";

const absolute = (href) => (href.startsWith("http") ? href : `${SITE_URL}${href}`);
const hrefFor = (project) => project.href ?? `/projects/${project.id}`;

// Projects hosted elsewhere (SHM, Simply Nikah) open in a new tab.
const newTabFor = (href) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/projects`,
  url: `${SITE_URL}/projects`,
  name: TITLE,
  description: DESCRIPTION,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: { "@id": `${SITE_URL}/#person` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projectData.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: absolute(hrefFor(project)),
      image: `${SITE_URL}${project.img.src}`,
    })),
  },
};

const OTHERS = projectData.filter((project) => !project.isFeatured);
const FILTERS = [
  { id: "all", label: "All projects" },
  { id: "app", label: "Mobile apps" },
  { id: "web", label: "Websites" },
];
const countFor = (id) =>
  id === "all" ? OTHERS.length : OTHERS.filter((p) => p.kind === id).length;

// The arrow icon carries its own w-full, so it sits in a fixed box.
function Arrow({ className = "h-5 w-5" }) {
  return (
    <span className={`inline-flex shrink-0 ${className}`}>
      <LinkArrow />
    </span>
  );
}

// Both cards use a "stretched link": the title link's ::after covers the
// whole card, so a click anywhere opens the project. Other links in the card
// (store buttons, GitHub) sit above it with relative z-10.
// Both cards use a "stretched link": the title link's ::after covers the
// whole card, so a click anywhere opens the project. Other links inside the
// card (store buttons, GitHub) sit above it with relative z-10.
const STRETCHED =
  "after:absolute after:inset-0 after:content-[''] focus:outline-none focus-visible:after:ring-4";

function FeaturedProject({ project }) {
  const href = hrefFor(project);
  return (
    <article className="projects-featured group relative grid cursor-pointer grid-cols-[1.15fr_1fr] items-center gap-10 overflow-hidden rounded-[2rem] p-8 text-light shadow-2xl transition duration-300 hover:shadow-[0_30px_80px_rgba(182,62,150,0.35)] lg:grid-cols-1 lg:gap-6 sm:p-5">
      <div className="overflow-hidden rounded-2xl ring-1 ring-light/20">
        <Image
          src={project.img}
          alt={`${project.title} app`}
          className="h-auto w-full transition duration-500 group-hover:scale-105"
          priority
          sizes="(max-width: 1023px) 100vw, 55vw"
        />
      </div>
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-light/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-light ring-1 ring-light/25">
          ★ Featured project
        </p>
        <h2 className="mt-4 text-5xl font-bold leading-tight lg:text-4xl sm:text-3xl">
          <Link
            href={href}
            className={`${STRETCHED} after:rounded-[2rem] focus-visible:after:ring-primaryDark/60`}
          >
            {project.title}
          </Link>
        </h2>
        <p className="mt-2 font-semibold text-primaryDark">{project.tag}</p>
        <p className="mt-4 text-lg leading-relaxed text-light/85 sm:text-base">
          {project.summary}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-2 rounded-xl bg-light px-5 py-3 font-semibold text-dark shadow-lg transition group-hover:-translate-y-0.5"
          >
            Explore the app <Arrow />
          </span>
          <a
            href={IOS_STORE_URL}
            target="_blank"
            rel="noopener"
            className="relative z-10 rounded-xl px-5 py-3 font-semibold ring-1 ring-light/40 transition hover:bg-light/10"
          >
            App Store
          </a>
          <a
            href={ANDROID_STORE_URL}
            target="_blank"
            rel="noopener"
            className="relative z-10 rounded-xl px-5 py-3 font-semibold ring-1 ring-light/40 transition hover:bg-light/10"
          >
            Google Play
          </a>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project, index, reduce }) {
  const href = hrefFor(project);
  const external = href.startsWith("http");
  return (
    <motion.li
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: reduce ? 0 : Math.min(index, 9) * 0.04 }}
      className="list-none"
    >
      <article className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-solid border-dark/10 bg-light shadow-md transition duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl dark:border-light/10 dark:bg-dark dark:hover:border-primaryDark/30">
        <div className="relative overflow-hidden">
          <Image
            src={project.img}
            alt={`${project.title} project preview`}
            className="aspect-[16/9] h-auto w-full object-cover object-top transition duration-500 group-hover:scale-105"
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          />
          <span className="absolute left-4 top-4 rounded-full bg-dark/75 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-light backdrop-blur">
            {project.kind === "app" ? "Mobile app" : "Website"}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-5">
          <p className="text-sm font-semibold text-primary dark:text-primaryDark">
            {project.tag}
          </p>
          <h2 className="mt-1 text-2xl font-bold">
            <Link
              href={href}
              {...newTabFor(href)}
              className={`${STRETCHED} after:rounded-3xl focus-visible:after:ring-primary/40`}
            >
              {project.title}
            </Link>
          </h2>
          <p className="projects-summary mt-2 flex-1 text-base text-dark/70 dark:text-light/70">
            {project.summary}
          </p>
          <div className="mt-5 flex items-center justify-between">
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-2 font-semibold transition group-hover:text-primary dark:group-hover:text-primaryDark"
            >
              {external ? "Visit the site" : project.href ? "See the app" : "Read the case study"}
              <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 inline-flex h-8 w-8"
                aria-label={`Source code for ${project.title}`}
              >
                <GithubIcon />
              </a>
            )}
          </div>
        </div>
      </article>
    </motion.li>
  );
}

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const reduce = useReducedMotion();
  const shown =
    filter === "all" ? OTHERS : OTHERS.filter((project) => project.kind === filter);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/projects`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/projects`} />
        <meta property="og:image" content={`${SITE_URL}/images/profile/og-home.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/images/profile/og-home.jpg`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </Head>
      <TransitionEffect />
      <main className="w-full text-dark dark:text-light">
        <Layout className="relative overflow-hidden pt-12 md:p-8 sm:p-6">
          <div aria-hidden="true" className="home-hero-glow pointer-events-none absolute inset-x-0 top-0 h-[50rem]" />

          <header className="relative mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary dark:text-primaryDark">
              Portfolio
            </p>
            <h1 className="mt-3 text-7xl font-bold leading-[1.05] xl:text-6xl md:text-5xl sm:text-4xl">
              Knowledge fuels{" "}
              <span className="bg-gradient-to-r from-primary to-primaryDark bg-clip-text text-transparent">
                imagination
              </span>
            </h1>
            <p className="mt-5 text-lg font-medium text-dark/70 dark:text-light/70 sm:text-base">
              {projectData.length} projects across mobile apps, web platforms
              and backends, from apps live in the stores to client websites.
            </p>
          </header>

          <div className="relative mt-14 md:mt-10">
            <FeaturedProject project={featureProject} />
          </div>

          <section aria-labelledby="all-projects" className="relative mt-20 md:mt-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="all-projects" className="text-4xl font-bold sm:text-3xl">
                More work
              </h2>
              <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
                {FILTERS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={filter === id}
                    onClick={() => setFilter(id)}
                    className={`rounded-full border border-solid px-4 py-2 text-sm font-semibold transition ${
                      filter === id
                        ? "border-dark bg-dark text-light dark:border-light dark:bg-light dark:text-dark"
                        : "border-dark/15 hover:border-dark/40 dark:border-light/15 dark:hover:border-light/40"
                    }`}
                  >
                    {label} <span className="opacity-60">{countFor(id)}</span>
                  </button>
                ))}
              </div>
            </div>

            <motion.ul
              layout={!reduce}
              className="mt-8 grid grid-cols-3 gap-8 p-0 xl:grid-cols-2 md:grid-cols-1 md:gap-6"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {shown.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} reduce={reduce} />
                ))}
              </AnimatePresence>
            </motion.ul>
          </section>
        </Layout>
      </main>
    </>
  );
};

export default Projects;
