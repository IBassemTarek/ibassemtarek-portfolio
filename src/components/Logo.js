import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import profilePic from "../../public/images/profile/logo.png";

const MotionLink = motion(Link);

const Logo = () => {
  return (
    <div className="flex items-center justify-center mt-2">
      <MotionLink
        href={"/"}
        aria-label="Go to homepage"
        className="w-16 h-16 bg-dark text-light flex items-center justify-center rounded-full text-2xl font-bold dark:border-light border border-solid border-transparent"
        whileHover={{
          backgroundColor: [
            "#121212",
            "rgba(131,58,180,1)",
            "rgba(253,29,29,1)",
            "rgba(252,176,69,1)",
            "rgba(131,58,180,1)",
            "#121212",
          ],
          transition: {
            duration: 1,
            repeat: Infinity,
          },
        }}
      >
        <Image
          src={profilePic}
          alt="IBassemTarek logo"
          className="w-[40%] h-auto"
        />
      </MotionLink>
    </div>
  );
};

export default Logo;
