// Pages that dress the shared header and footer in their own brand palette.
// The styles live in globals.css under [data-page-theme="<name>"].
export function pageTheme(pathname = "") {
  if (pathname === "/horus-arcade" || pathname.startsWith("/horus-arcade/")) {
    return "horus-arcade";
  }
  return undefined;
}
