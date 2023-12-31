import AnimatedText from "@/components/AnimatedText";
import { GithubIcon } from "@/components/AppIcons";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import TransitionEffect from "@/components/TransitionEffect";
import { featureProject, projectData } from "./projectsData";

const FramerImage = motion(Image);
const FeaturedProjects = ({ type, title, summary, img, link, githubLink }) => {
  return (
    <article
      className="w-full flex items-center justify-between rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 relative rounded-br-2xl dark:bg-dark dark:border-light
    lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4
    "
    >
      <div className="absolute top-0 -right-4 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]" />

      <Link
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full"
        href={link}
        target="_blank"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{
            scale: 1.05,
          }}
          transition={{
            duration: 0.2,
          }}
          priority
          sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw,
         50vw"
        />
      </Link>
      <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <span className="text-primary font-medium text-xl dark:text-primaryDark xs:text-base">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light sm:text-sm">
            {title}
          </h2>
        </Link>
        <p className="my-2 font-medium text-dark dark:text-light sm:text-sm">
          {summary}
        </p>
        <div className="mt-2 flex items-center">
          {githubLink && (
            <Link className="w-10" href={githubLink} target="_blank">
              <GithubIcon />
            </Link>
          )}
          <Link
            className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
            dark:bg-light dark:text-dark
            dark:hover:bg-dark dark:hover:text-light dark:hover:border-light
            sm:px-4 sm:text-base
            "
            href={link}
            target="_blank"
          >
            Visit The Project
          </Link>
        </div>
      </div>
    </article>
  );
};

const Project = ({ type, title, img, link, githubLink }) => {
  return (
    <article
      className="w-full flex flex-col items-center justify-center rounded-2xl border border-solid border-dark bg-light p-6 relative dark:border-light dark:bg-dark
    xs:p-4 
    "
    >
      <div className="absolute top-0 -right-2 -z-10 w-[101%] h-[102%] rounded-[2rem] bg-dark rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded[1.5rem]" />
      <Link
        className="w-full cursor-pointer overflow-hidden rounded-lg"
        href={link}
        target="_blank"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          priority
          sizes="(max-width: 768px) 100vw, 
          (max-width: 1200px) 50vw,
          (max-height: 768px) 100vh,
          50vw"
          whileHover={{
            scale: 1.05,
          }}
          transition={{
            duration: 0.2,
          }}
        />
      </Link>
      <div className="w-full flex flex-col items-start justify-between mt-4">
        <span className="text-primary font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-3xl font-bold lg:text-2xl">
            {title}
          </h2>
        </Link>
        <div className="mt-2 flex items-center justify-between w-full">
          <Link
            className="text-lg font-semibold md:text-base"
            href={link}
            target="_blank"
          >
            Visit
          </Link>
          {githubLink && (
            <Link className="w-8 md:w-6" href={githubLink} target="_blank">
              <GithubIcon />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  return (
    <>
      <Head>
        <title>Projects - IBassemTarek</title>
        <meta name="description" content="My Projects" />
      </Head>
      <TransitionEffect />
      <main className="flex flex-col w-full mb-16 items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text={"Imagination My Knowledge!"}
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />

          <div className="grid grid-cols-12 gap-24 gap-y-20 xl:gap-x-16 lg:gap-x-8 sm:gap-x-0">
            <div className="col-span-12">
              <FeaturedProjects
                title={featureProject.title}
                summary={featureProject.summary}
                link={featureProject.link}
                type={"Featured Project"}
                img={featureProject.img}
              />
            </div>

            {projectData.map((project, index) => (
              <div key={index} className="col-span-6 sm:col-span-12">
                <Project
                  type={project.isFeatured}
                  title={project.title}
                  summary={project.summary}
                  link={project.link}
                  img={project.img}
                  githubLink={project.githubLink}
                />
              </div>
            ))}
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Projects;
