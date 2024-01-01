import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import profilePic from "../../../public/images/profile/photograph.jpg";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import TransitionEffect from "@/components/TransitionEffect";

const content = `<h2><strong>Project description</strong></h2>

<p>I work as a Backend Developer and Mobile App Developer at Montu. I build and maintain scalable infrastructure using NestJS, integrate services, write clean code, and troubleshoot issues. I also develop and enhance Montu&rsquo;s mobile app, implementing new features and improving user experience. <a href="https://www.montuapps.com/">view project</a></p>

<hr />
<h2>Skills and deliverables</h2>

<p>Shopify -&nbsp;React Native -&nbsp;PostgreSQL -&nbsp;DevOps -&nbsp;Docker -&nbsp;Docker Compose -&nbsp;GraphQL -&nbsp;JavaScript</p>

<hr />
<h2>Preview</h2>

<p><a href="https://ibassemtarek.vercel.app/images/projects/montu.png" rel="" target="_blank"><img src="https://ibassemtarek.vercel.app/images/projects/montu.png" /></a></p>
<p><a href="https://ibassemtarek.vercel.app/images/montu/1.png" rel="" target="_blank"><img src="https://ibassemtarek.vercel.app/images/montu/1.png" /></a></p>
<p><a href="https://ibassemtarek.vercel.app/images/montu/2.png" rel="" target="_blank"><img src="https://ibassemtarek.vercel.app/images/montu/2.png" /></a></p>
<p><a href="https://ibassemtarek.vercel.app/images/montu/3.jpg" rel="" target="_blank"><img src="https://ibassemtarek.vercel.app/images/montu/3.jpg" /></a></p>
<p><a href="https://ibassemtarek.vercel.app/images/montu/4.jpg" rel="" target="_blank"><img src="https://ibassemtarek.vercel.app/images/montu/4.jpg" /></a></p>
<p><a href="https://ibassemtarek.vercel.app/images/montu/5.png" rel="" target="_blank"><img src="https://ibassemtarek.vercel.app/images/montu/5.png" /></a></p>

<p>&nbsp;</p>`;
const Project = () => {
  return (
    <>
      <Head>
        <title>About - IBassemTarek</title>
        <meta name="description" content="about me" />
      </Head>
      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text={"Dream Big, Achieve Bigger!"}
            className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8 leading-snug"
          />

          <div className="project-details">
            <style jsx global>{`
              .project-details {
                margin: 20px 0;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Project;
