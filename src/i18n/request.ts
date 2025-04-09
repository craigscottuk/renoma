import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // TO RESTORE OTHER LANGUAGES: Change type to "pl" | "en" | "de"
  if (!locale || !routing.locales.includes(locale as "pl")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
