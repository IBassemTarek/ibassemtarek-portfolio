import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { documentLocale } from "@/lib/locale.mjs";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});
export default function App({ Component, pageProps }) {
  const router = useRouter();

  // _document only sets <html lang/dir> on the first server render; keep them
  // in sync when client-side navigation crosses between English and Arabic.
  useEffect(() => {
    const { lang, dir } = documentLocale(router.pathname);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [router.pathname]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${montserrat.variable} font-mont bg-light w-full min-h-screen dark:bg-dark`}
      >
        <NavBar />
        <AnimatePresence mode="wait">
          <Component key={router.asPath} {...pageProps} />
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
}
