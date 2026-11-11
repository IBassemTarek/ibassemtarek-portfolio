export const ENGLISH_HREFLANG = "en";
export const ARABIC_HREFLANG = "ar-EG";
export const DEFAULT_HREFLANG = "x-default";

function absoluteUrl(siteUrl, path) {
  return path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
}

export function getLocalizedUrls(
  siteUrl,
  { englishPath = "/", arabicPath = "/ar" } = {}
) {
  const english = absoluteUrl(siteUrl, englishPath);
  const arabic = absoluteUrl(siteUrl, arabicPath);

  return {
    english,
    arabic,
    default: english,
  };
}
