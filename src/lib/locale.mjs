// Pages Router has no i18n config here; Arabic pages live under /ar/ (plus the
// legacy /دهبنا route, which redirects but still exists as a page file).
export function isArabicPath(pathname = "") {
  return (
    pathname === "/ar" || pathname.startsWith("/ar/") || pathname === "/دهبنا"
  );
}

export function documentLocale(pathname) {
  return isArabicPath(pathname)
    ? { lang: "ar", dir: "rtl" }
    : { lang: "en", dir: "ltr" };
}
