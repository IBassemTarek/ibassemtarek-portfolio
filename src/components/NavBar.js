import Link from "next/link";
import React, { useState } from "react";
import Logo from "./Logo";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  GithubIcon,
  LinkedInIcon,
  MoonIcon,
  SunIcon,
  TwitterIcon,
} from "./AppIcons";
import useThemeSwitcher from "@/hooks/themeSwitcher";

const CustomLink = ({ href, title, className = "" }) => {
  const router = useRouter();

  return (
    <Link className={`${className} relative group`} href={href}>
      {title}
      <span
        className={`h-[2px] inline-block bg-black absolute left-0 -bottom-1 group-hover:w-full transition-[width] ease duration-300 ${
          router.asPath === href ? "w-full" : "w-0"
        }
        dark:bg-light
        `}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const CustomLinkMobile = ({ href, title, className = "", toggle }) => {
  const router = useRouter();

  const handleClick = () => {
    toggle();
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className={`${className} relative group text-light dark:text-dark my-2`}
    >
      {title}
      <span
        className={`h-[2px] inline-block bg-light absolute left-0 -bottom-1 group-hover:w-full transition-[width] ease duration-300 ${
          router.asPath === href ? "w-full" : "w-0"
        }
        dark:bg-dark
        `}
      >
        &nbsp;
      </span>
    </button>
  );
};

const NavBar = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <header
      className="w-full px-32 py-8 font-medium flex items-center justify-between
    dark:text-light relative z-10 lg:px-16 md:12 sm:px-8
    "
    >
      <button
        className="flex-col justify-center items-center hidden lg:flex"
        onClick={handleClick}
      >
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            open ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-100 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            open ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        ></span>
      </button>
      <div className="w-full flex justify-between items-center lg:hidden">
        <nav>
          <CustomLink title={"Home"} href={"/"} className="mr-4" />
          <CustomLink title={"About"} href={"/about"} className="mx-4" />
          <CustomLink title={"Projects"} href={"/projects"} className="mx-4" />
        </nav>

        <nav className="flex items-center justify-center flex-wrap">
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mx-3"
            href={"https://twitter.com/IBassemTarek"}
            target={"_blank"}
          >
            <TwitterIcon />
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mx-3"
            href={"https://github.com/IBassemTarek"}
            target={"_blank"}
          >
            <GithubIcon />
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 ml-3"
            href={"https://www.linkedin.com/in/ibassemtarek/"}
            target={"_blank"}
          >
            <LinkedInIcon />
          </motion.a>
          <button
            className={` ml-6 flex items-center justify-center rounded-full p-1 ${
              mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
            }`}
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          >
            {mode === "dark" ? (
              <SunIcon className={"fill-dark"} />
            ) : (
              <MoonIcon className={"fill-dark"} />
            )}
          </button>
        </nav>
      </div>

      {open && (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, opacity: 1 }}
          className="min-w-[70vw] flex flex-col justify-between items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32"
        >
          <nav className="flex items-center flex-col justify-center">
            <CustomLinkMobile title={"Home"} href={"/"} toggle={handleClick} />
            <CustomLinkMobile
              title={"About"}
              href={"/about"}
              toggle={handleClick}
            />
            <CustomLinkMobile
              title={"Projects"}
              href={"/projects"}
              toggle={handleClick}
            />
          </nav>

          <nav className="flex items-center justify-center flex-wrap mt-3">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 sm:mx-1"
              href={"https://twitter.com/IBassemTarek"}
              target={"_blank"}
            >
              <TwitterIcon />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 bg-light rounded-full dark:bg-dark sm:mx-1"
              href={"https://github.com/IBassemTarek"}
              target={"_blank"}
            >
              <GithubIcon />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 ml-3 sm:mx-1"
              href={"https://www.linkedin.com/in/ibassemtarek/"}
              target={"_blank"}
            >
              <LinkedInIcon />
            </motion.a>
            <button
              className={` ml-6 flex items-center justify-center rounded-full p-1 ${
                mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
              }`}
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            >
              {mode === "dark" ? (
                <SunIcon className={"fill-dark"} />
              ) : (
                <MoonIcon className={"fill-dark"} />
              )}
            </button>
          </nav>
        </motion.div>
      )}

      <div className="absolute left-[50%] top-2 translate-x-[-50%]">
        <Logo />
      </div>
    </header>
  );
};

export default NavBar;
