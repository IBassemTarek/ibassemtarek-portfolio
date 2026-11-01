import React from "react";
import Layout from "./Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { isArabicPath } from "@/lib/locale.mjs";
import { pageTheme } from "@/lib/page-theme.mjs";

const Footer = () => {
  const { pathname } = useRouter();
  const isArabic = isArabicPath(pathname);

  return (
    <footer
      data-page-theme={pageTheme(pathname)}
      className="site-footer w-full border-t-2 border-solid border-dark
    font-medium text-lg
    dark:text-light dark:border-light sm:text-base
    "
    >
      <Layout className="py-8 flex items-center justify-between sm:flex-col lg:py-6">
        <span>
          {new Date().getFullYear()} &copy;{" "}
          {isArabic ? "جميع الحقوق محفوظة" : "All Rights Reserved"}
        </span>
        <div>
          {isArabic ? "تطوير" : "Built by"} <Link href="/">IBassemTarek</Link>
        </div>
      </Layout>
    </footer>
  );
};

export default Footer;
