import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// The wipe plays on client-side navigation only. On the first load the
// panels start already wiped away, so the server-rendered page is visible at
// once instead of hiding behind the overlay for about a second.
let hasMountedOnce = false;

const TransitionEffect = () => {
  const [playEntry] = useState(() => hasMountedOnce);

  useEffect(() => {
    hasMountedOnce = true;
  }, []);

  const entry = (delay) => ({
    initial: playEntry ? { scaleX: 1 } : false,
    animate: { scaleX: 0 },
    transition: { delay, duration: 0.8, ease: "easeInOut" },
  });

  return (
    <>
      <motion.div
        {...entry(0)}
        exit={{
          scaleX: [0, 1],
        }}
        className="pointer-events-none fixed inset-y-0 left-0 z-30 h-screen w-screen origin-right bg-primary"
      />

      <motion.div
        {...entry(0.2)}
        className="pointer-events-none fixed inset-y-0 left-0 z-20 h-screen w-screen origin-right bg-light"
      />

      <motion.div
        {...entry(0.4)}
        className="pointer-events-none fixed inset-y-0 left-0 z-10 h-screen w-screen origin-right bg-dark"
      />
    </>
  );
};

export default TransitionEffect;
