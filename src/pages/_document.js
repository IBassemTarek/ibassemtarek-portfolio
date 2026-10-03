import { Html, Head, Main, NextScript } from "next/document";
import { documentLocale } from "@/lib/locale.mjs";

export default function Document({ __NEXT_DATA__ }) {
  const { lang, dir } = documentLocale(__NEXT_DATA__?.page);

  return (
    <Html lang={lang} dir={dir}>
      <Head>
        <script
          id="theme-switcher"
          dangerouslySetInnerHTML={{
            __html: `try{var theme=localStorage.theme;if(theme==="dark"||(!theme&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}catch(e){}`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
