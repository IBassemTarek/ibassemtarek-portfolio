import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import React from "react";
import TransitionEffect from "@/components/TransitionEffect";
import { useRouter } from "next/router";
import { projectData } from "@/utils/projectsData";

const withAccessibleProjectImages = (html = "", title = "Project") =>
  html.replace(/<img src="([^"]+)" \/>/g, (_, src) => {
    const fileName = src.split("/").pop()?.replace(/\.[^.]+$/, "") || "preview";
    return `<img src="${src}" alt="${title} ${fileName} screenshot" loading="lazy" />`;
  });

const Project = () => {
  const router = useRouter();
  const projectId = router.query.slug;
  const project_data = projectData.filter(
    (project) => project.id == projectId
  )[0];
  const projectContent = withAccessibleProjectImages(
    project_data?.content,
    project_data?.title
  );

  return (
    <>
      <Head>
        <title>{project_data?.title} - IBassemTarek</title>
        <meta name="description" content={project_data?.summary} />
      </Head>
      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text={project_data?.title || ""}
            className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8 leading-snug"
          />

          <article className="project-details" aria-label={project_data?.title}>
            <style jsx global>{`
              .project-details {
                margin: 20px 0;
                padding: 20px;
              }

              .project-details h2 {
                color: #fff;
                font-weight: bold;
                margin-bottom: 10px;
              }

              /* Paragraph styles */
              .project-details p {
                line-height: 1.2;
                color: rgba(255, 255, 255, 0.8);
                /* Adjust opacity as needed */
              }

              /* Link styles */
              .project-details a {
                color: #0070f3;
                text-decoration: none;
                transition: color 0.3s;
              }

              .project-details a:hover,
              .project-details a:focus {
                text-decoration: underline;
              }

              /* Image styles */
              .project-details img {
                max-width: 100%;
                height: auto;
                margin-top: 10px;
              }

              /* List styles */
              .project-details ul {
                list-style-type: none;
                padding: 0;
              }

              .project-details li {
                margin-bottom: 8px;
              }

              /* Horizontal rule styles */
              .project-details hr {
                margin-top: 15px;
                margin-bottom: 15px;
              }
            `}</style>

            <div dangerouslySetInnerHTML={{ __html: projectContent }} />
          </article>
        </Layout>
      </main>
    </>
  );
};

export default Project;
