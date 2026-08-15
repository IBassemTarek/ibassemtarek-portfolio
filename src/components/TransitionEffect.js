import React from "react";
import { motion } from "framer-motion";

const TransitionEffect = () => {
  return (
    <>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        exit={{
          scaleX: [0, 1],
        }}
        className="pointer-events-none fixed inset-y-0 left-0 z-30 h-screen w-screen origin-right bg-primary"
      />

      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed inset-y-0 left-0 z-20 h-screen w-screen origin-right bg-light"
      />

      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed inset-y-0 left-0 z-10 h-screen w-screen origin-right bg-dark"
      />
    </>
  );
};

export default TransitionEffect;
