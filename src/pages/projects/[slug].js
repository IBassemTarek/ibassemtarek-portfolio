import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import path from "node:path";
import sharp from "sharp";
import { motion, useReducedMotion } from "framer-motion";
import TransitionEffect from "@/components/TransitionEffect";
import { GithubIcon, LinkArrow } from "@/components/AppIcons";
import { projectData } from "@/utils/projectsData";
import { PORTFOLIO_URL } from "@/lib/site-urls.mjs";

const SITE_URL = PORTFOLIO_URL;

// Only projects without their own page have a case study here; the others
// redirect to it (next.config.mjs).
const CASE_STUDIES = projectData.filter((project) => !project.href);

export function getStaticPaths() {
  return {
    paths: CASE_STUDIES.map(({ id }) => ({ params: { slug: String(id) } })),
    fallback: false,
  };
}

const stripTags = (html) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();

// The case-study HTML always has three parts: a description, a "Skills and
// deliverables" line of dash-separated names, and a "Preview" run of
// screenshots. Split it so each part gets its own design.
async function parseContent(html) {
  const [descriptionPart = "", rest = ""] = html.split(/<h2>Skills and deliverables<\/h2>/);
  const [skillsPart = "", previewPart = ""] = rest.split(/<h2>Preview<\/h2>/);

  const links = [];
  const description = descriptionPart
    .replace(/<h2>[\s\S]*?<\/h2>/, "")
    .replace(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g, (_, href, label) => {
      links.push({ href, label: label.trim() });
      return "";
    })
    .replace(/<hr \/>/g, "")
    .replace(/<p>\s*(&nbsp;)?\s*<\/p>/g, "")
    .trim();

  const skills = stripTags(skillsPart)
    .split(/\s+-\s*/)
    .map((skill) => skill.trim())
    .filter(Boolean);

  // Screenshots come from this site; serve them locally through next/image.
  // The /images/projects/ cover already heads the page.
  const sources = [...previewPart.matchAll(/<img src="([^"]+)"/g)]
    .map(([, src]) => src.replace(SITE_URL, ""))
    .filter((src, index, all) => all.indexOf(src) === index)
    .filter((src) => !src.startsWith("/images/projects/"));
  const gallery = await Promise.all(
    sources.map(async (src) => {
      const { width, height } = await sharp(
        path.join(process.cwd(), "public", src)
      ).metadata();
      return { src, width, height };
    })
  );

  return { description, links, skills, gallery };
}

export async function getStaticProps({ params }) {
  const index = CASE_STUDIES.findIndex(({ id }) => String(id) === params.slug);
  const project = CASE_STUDIES[index];
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];
  const previous = CASE_STUDIES[(index - 1 + CASE_STUDIES.length) % CASE_STUDIES.length];
  return {
    props: {
      id: project.id,
      ...(await parseContent(project.content ?? "")),
      neighbours: [previous, next].map(({ id, title, tag }) => ({ id, title, tag })),
    },
  };
}

function linkLabel(label, href) {
  if (/code/i.test(label)) return "View the code";
  if (href.includes("play.google.com")) return "Get it on Google Play";
  if (href.includes("apps.apple.com")) return "Download on the App Store";
  if (href.includes("linkedin.com")) return "Company on LinkedIn";
  return "Visit the live project";
}

function Arrow({ className = "h-5 w-5" }) {
  return (
    <span className={`inline-flex shrink-0 ${className}`}>
      <LinkArrow />
    </span>
  );
}

export default function CaseStudy({ id, description, links, skills, gallery, neighbours }) {
  const project = projectData.find((item) => item.id === id);
  // Phone screenshots read better four to a row; mixed galleries keep two.
  const mostlyPortrait =
    gallery.filter(({ width, height }) => height > width * 1.4).length > gallery.length / 2;
  const reduce = useReducedMotion();
  const pageUrl = `${SITE_URL}/projects/${id}`;
  const imageUrl = `${SITE_URL}${project.img.src}`;
  const githubLink =
    project.githubLink && !links.some(({ href }) => href.includes("github.com"))
      ? project.githubLink
      : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#project`,
        name: project.title,
        headline: `${project.title}: ${project.tag}`,
        description: project.summary,
        url: pageUrl,
        image: imageUrl,
        keywords: skills.join(", "),
        genre: project.kind === "app" ? "Mobile application" : "Website",
        author: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@id": `${SITE_URL}/projects` },
        ...(links[0] ? { sameAs: links.map(({ href }) => href) } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
          { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
        ],
      },
    ],
  };

  const fadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <>
      <Head>
        <title>{`${project.title}: ${project.tag} | Bassem Tarek`}</title>
        <meta name="description" content={project.summary} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${project.title} | Bassem Tarek`} />
        <meta property="og:description" content={project.summary} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} | Bassem Tarek`} />
        <meta name="twitter:description" content={project.summary} />
        <meta name="twitter:image" content={imageUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </Head>
      <TransitionEffect />
      <main className="w-full text-dark dark:text-light">
        <Layout className="relative overflow-hidden pt-10 md:p-8 sm:p-6">
          <div aria-hidden="true" className="home-hero-glow pointer-events-none absolute inset-x-0 top-0 h-[50rem]" />

          <nav aria-label="Breadcrumb" className="relative text-sm font-semibold text-dark/60 dark:text-light/60">
            <Link href="/projects" className="inline-flex items-center gap-2 transition hover:text-primary dark:hover:text-primaryDark">
              <span aria-hidden="true">←</span> All projects
            </Link>
          </nav>

          {/* ── Hero ─────────────────────────────────────── */}
          <header className="relative mt-8 grid grid-cols-[1fr_1.1fr] items-center gap-12 lg:grid-cols-1 lg:gap-8">
            <motion.div {...fadeUp()}>
              <p className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                <span className="rounded-full bg-dark px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-light dark:bg-light dark:text-dark">
                  {project.kind === "app" ? "Mobile app" : "Website"}
                </span>
                <span className="text-primary dark:text-primaryDark">{project.tag}</span>
              </p>
              <h1 className="mt-4 text-6xl font-bold leading-[1.05] xl:text-5xl sm:text-4xl">
                {project.title}
              </h1>
              <p className="mt-5 text-lg font-medium leading-relaxed text-dark/75 dark:text-light/75 sm:text-base">
                {project.summary}
              </p>
              {(links.length > 0 || githubLink) && (
                <div className="mt-7 flex flex-wrap gap-3">
                  {links.map(({ href, label }, index) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener"
                      className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition hover:-translate-y-0.5 ${
                        index === 0
                          ? "bg-dark text-light shadow-lg dark:bg-light dark:text-dark"
                          : "border-2 border-solid border-dark dark:border-light"
                      }`}
                    >
                      {linkLabel(label, href)}
                      <Arrow />
                    </a>
                  ))}
                  {githubLink && (
                    <a
                      href={githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-solid border-dark px-5 py-3 font-semibold transition hover:-translate-y-0.5 dark:border-light"
                    >
                      <span className="inline-flex h-5 w-5"><GithubIcon /></span>
                      Source code
                    </a>
                  )}
                </div>
              )}
            </motion.div>
            <motion.div {...fadeUp(0.1)} className="relative">
              <div aria-hidden="true" className="home-portrait-glow pointer-events-none absolute -inset-[8%]" />
              <Image
                src={project.img}
                alt={`${project.title} cover`}
                priority
                sizes="(max-width: 1023px) 100vw, 52vw"
                className="relative h-auto w-full rounded-3xl border border-solid border-dark/10 shadow-2xl dark:border-light/10"
              />
            </motion.div>
          </header>

          {/* ── Overview + stack ─────────────────────────── */}
          <section className="relative mt-20 grid grid-cols-[1.4fr_1fr] gap-10 lg:grid-cols-1 md:mt-14">
            <div className="rounded-3xl border border-solid border-dark/10 bg-light p-8 shadow-md dark:border-light/10 dark:bg-dark sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary dark:text-primaryDark">
                The project
              </h2>
              <div
                className="case-prose mt-4 text-lg leading-relaxed text-dark/80 dark:text-light/80 sm:text-base"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
            <aside className="h-fit rounded-3xl border border-solid border-dark/10 bg-light p-8 shadow-md dark:border-light/10 dark:bg-dark sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary dark:text-primaryDark">
                Skills & deliverables
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2 p-0">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="list-none rounded-full border border-solid border-dark/15 px-3 py-1.5 text-sm font-semibold dark:border-light/20"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-solid border-dark/10 pt-6 text-sm dark:border-light/10">
                <div>
                  <dt className="text-dark/55 dark:text-light/55">Type</dt>
                  <dd className="m-0 mt-1 font-semibold">{project.kind === "app" ? "Mobile app" : "Website"}</dd>
                </div>
                <div>
                  <dt className="text-dark/55 dark:text-light/55">Screens</dt>
                  <dd className="m-0 mt-1 font-semibold">{gallery.length + 1}</dd>
                </div>
              </dl>
            </aside>
          </section>

          {/* ── Gallery ──────────────────────────────────── */}
          {gallery.length > 0 && (
            <section aria-labelledby="gallery-title" className="relative mt-20 md:mt-14">
              <h2 id="gallery-title" className="text-4xl font-bold sm:text-3xl">
                Inside the {project.kind === "app" ? "app" : "site"}
              </h2>
              {/* Masonry columns: screenshots of different heights pack
                  together instead of leaving gaps in a grid row. */}
              <ul
                className={`mt-8 gap-6 p-0 ${
                  mostlyPortrait
                    ? "columns-4 xl:columns-3 md:columns-2 sm:gap-4"
                    : "columns-2 md:columns-1"
                }`}
              >
                {gallery.map((image, index) => (
                  <li key={image.src} className="mb-6 inline-block w-full list-none break-inside-avoid">
                    <a
                      href={image.src}
                      target="_blank"
                      rel="noopener"
                      className="group block overflow-hidden rounded-2xl border border-solid border-dark/10 bg-light shadow-md transition hover:shadow-2xl dark:border-light/10 dark:bg-dark"
                      aria-label={`Open ${project.title} screenshot ${index + 1} full size`}
                    >
                      <Image
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        alt={`${project.title} screenshot ${index + 1}`}
                        sizes="(max-width: 767px) 100vw, 50vw"
                        className="h-auto w-full transition duration-500 group-hover:scale-[1.03]"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── Next / previous + CTA ─────────────────────── */}
          <nav aria-label="More projects" className="relative mt-20 grid grid-cols-2 gap-6 md:mt-14 md:grid-cols-1">
            {neighbours.map((item, index) => (
              <Link
                key={item.id}
                href={`/projects/${item.id}`}
                className={`group rounded-3xl border border-solid border-dark/10 bg-light p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:border-light/10 dark:bg-dark ${
                  index === 1 ? "text-end" : ""
                }`}
              >
                <span className="text-sm font-semibold text-dark/55 dark:text-light/55">
                  {index === 0 ? "← Previous project" : "Next project →"}
                </span>
                <span className="mt-1 block text-2xl font-bold transition group-hover:text-primary dark:group-hover:text-primaryDark">
                  {item.title}
                </span>
                <span className="block text-sm font-medium text-dark/60 dark:text-light/60">{item.tag}</span>
              </Link>
            ))}
          </nav>

          <section className="contact-panel relative mt-10 flex items-center justify-between gap-6 rounded-3xl p-10 text-light shadow-2xl md:flex-col md:items-start sm:p-6">
            <div>
              <h2 className="text-3xl font-bold sm:text-2xl">Have a project like this in mind?</h2>
              <p className="mt-2 text-light/85">Tell me about it and I&apos;ll get back to you.</p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-light px-6 py-3 font-semibold text-dark shadow-lg transition hover:-translate-y-0.5"
            >
              Start a conversation <Arrow />
            </Link>
          </section>
        </Layout>
      </main>
    </>
  );
}
