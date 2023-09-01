import React from "react";
import { motion } from "framer-motion";

const Skill = ({ x, y, name }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y, transition: { duration: 1.5 } }}
      viewport={{ once: true }}
      className="flex items-center justify-center rounded-full font-semibold bg-dark text-light py-3 px-6 shadow-dark self-center cursor-pointer absolute first-letter:
      dark:bg-light dark:text-dark
      lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3 xs:bg-transparent xs:dark:bg-transparent xs:text-dark xs:dark:text-light xs:font-bold
      "
    >
      {name}
    </motion.div>
  );
};

const Skills = () => {
  return (
    <>
      <h2 className="font-bold text-8xl mt-64 w-full text-center md:text-6xl md:mt-32">
        Skills
      </h2>
      <div
        className="w-full h-screen relative flex item-center justify-center rounded-full bg-circularLight dark:bg-circularDark
      lg:h-[80vh] sm:h-[60vh] xs:h-[50vh]
      lg:bg-circularLightLg lg:dark:bg-circularDarkLg
      md:bg-circularLightMd md:dark:bg-circularDarkMd
      sm:bg-circularLightSm sm:dark:bg-circularDarkSm
      "
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center rounded-full font-semibold bg-dark text-light p-8 shadow-dark self-center cursor-pointer dark:bg-light dark:text-dark sm:p-6 md:p-4 xs:text-xs xs:p-2"
        >
          SW
        </motion.div>
        <Skill name={"React Native"} x="-20vw" y="-2vw" />
        <Skill name={"React"} x="-5vw" y="-10vw" />
        <Skill name={"NestJS"} x="20vw" y="6vw" />
        <Skill name={"Flutter"} x="0vw" y="12vw" />
        <Skill name={"Docker"} x="-20vw" y="-15vw" />
        <Skill name={"GraphQL"} x="15vw" y="-12vw" />
        <Skill name={"TypeScript"} x="32vw" y="-5vw" />
        <Skill name={"PostgreSQL"} x="0vw" y="-20vw" />
        <Skill name={"DevOps"} x="-25vw" y="18vw" />
        <Skill name={"AWS"} x="18vw" y="18vw" />
      </div>
    </>
  );
};

export default Skills;
