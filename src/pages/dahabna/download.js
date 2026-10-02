import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import {
  ANDROID_STORE_URL,
  IOS_STORE_URL,
  detectStorePlatform,
  storeUrlFor,
} from "../../lib/dahabna-download.mjs";

// Phones are redirected to their store before any HTML is sent. Only desktop
// (and iPadOS, which hides behind a Mac UA) ever renders this page.
export async function getServerSideProps({ req, res }) {
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("Vary", "User-Agent");

  const destination = storeUrlFor(
    detectStorePlatform(req.headers["user-agent"])
  );
  if (destination) {
    return { redirect: { destination, statusCode: 302 } };
  }
  return { props: {} };
}

export default function DahabnaDownloadPage() {
  useEffect(() => {
    const { platform, maxTouchPoints = 0 } = window.navigator;
    if (platform === "MacIntel" && maxTouchPoints > 1) {
      window.location.replace(IOS_STORE_URL);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Download Dahabna | دهبنا</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 px-6 py-16 text-center text-dark dark:text-light">
        <h1 className="text-3xl font-bold">Download Dahabna</h1>
        <p className="max-w-md text-lg">
          Open this link on your phone to go straight to the store, or choose
          your platform below.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={IOS_STORE_URL}
            className="rounded-lg bg-dark px-6 py-3 font-semibold text-light dark:bg-light dark:text-dark"
          >
            App Store
          </a>
          <a
            href={ANDROID_STORE_URL}
            className="rounded-lg bg-dark px-6 py-3 font-semibold text-light dark:bg-light dark:text-dark"
          >
            Google Play
          </a>
        </div>
        <Link href="/dahabna" className="underline underline-offset-4">
          Learn more about Dahabna
        </Link>
      </main>
    </>
  );
}
