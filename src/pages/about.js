import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import profilePic from "../../public/images/profile/photograph.jpg";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import TransitionEffect from "@/components/TransitionEffect";

const About = () => {
  const text1 =
    "Hi, I'm Bassem Tarek, bringing over half a decade of experience in engineering and software development. I've played a pivotal role in delivering high-value projects, showcasing my collaborative efforts through close collaboration with cross-functional teams of professionals.";

  const text2 =
    "Proficient in the skillful transformation of conceptual ideas into Minimum Viable Products (MVPs) through strategic methodologies, I am committed to a continuous improvement mindset, aiming to consistently drive impactful outcomes.";

  const text3 =
    "Eager to contribute my well-honed expertise to ensure the success of future projects.";

  const AnimatedNo = ({ value }) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
      duration: 3000,
    });
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
      if (isInView) {
        motionValue.set(value);
      }
    }, [isInView, value, motionValue]);

    useEffect(() => {
      springValue.on("change", (latest) => {
        if (ref.current && latest.toFixed(0) <= value) {
          ref.current.textContent = latest.toFixed(0);
        }
      });
    }, [springValue, value]);

    return <span ref={ref}></span>;
  };
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
          <div className="grid w-full grid-cols-8 gap-16 sm:8 sm:flex sm:flex-col">
            <div className="col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
                Biography
              </h2>
              <p className="font-medium">{text1}</p>
              <p className="my-4 font-medium">{text2}</p>
              <p className="font-medium">{text3}</p>
            </div>

            <div className="col-span-2 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:border-light dark:bg-dark xl:col-span-4 md:order-1 md:col-span-8">
              <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
              <Image
                src={profilePic}
                alt="IBassemTarek"
                className="w-full h-auto rounded-2xl"
                priority
                sizes="(max-width: 768px) 100vw, 
                (max-width: 1200px) 50vw,
                33vw"
              />
            </div>
            <div className="col-span-1" />

            <div className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3">
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNo value={10} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  Satisfied Clients
                </h2>
              </div>

              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNo value={12} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  Projects Completed
                </h2>
              </div>

              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNo value={5} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                  Years Of Experience
                </h2>
              </div>
            </div>
          </div>
          <Skills />
          <Experience />
          <Education />
        </Layout>
      </main>
    </>
  );
};

export default About;
