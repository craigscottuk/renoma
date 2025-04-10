// cSpell:disable

import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // TO RESTORE OTHER LANGUAGES: Uncomment 'en', 'de' in the following line
  locales: ["pl"], // ["pl", "en", "de"]
  defaultLocale: "pl",
  pathnames: {
    "/": "/",
    "/o-nas": {
      // TO RESTORE OTHER LANGUAGES: Uncomment these blocks
      // en: "/about-us",
      // de: "/uber-uns",
      pl: "/o-nas",
    },
    "/uslugi": {
      // en: "/services",
      // de: "/dienstleistungen",
      pl: "/uslugi",
    },
    "/realizacje": {
      // en: "/projects",
      // de: "/projekte",
      pl: "/realizacje",
    },
    "/renoma-lab": {
      // en: "/renoma-lab",
      // de: "/renoma-lab",
      pl: "/renoma-lab",
    },
    "/ucz-sie-z-nami": {
      // en: "/learn-with-us",
      // de: "/lernen-sie-mit-uns",
      pl: "/ucz-sie-z-nami",
    },
    "/pracuj-z-nami": {
      // en: "/work-with-us",
      // de: "/arbeiten-sie-mit-uns",
      pl: "/pracuj-z-nami",
    },
    "/kontakt": {
      // en: "/contact",
      // de: "/kontakt",
      pl: "/kontakt",
    },
    "/polityka-prywatnosci": {
      // en: "/privacy-policy",
      // de: "/datenschutzrichtlinie",
      pl: "/polityka-prywatnosci",
    },
    "/realizacje/[slug]": {
      // en: "/projects/[slug]",
      // de: "/projekte/[slug]",
      pl: "/realizacje/[slug]",
    },
    "/faq": {
      // en: "/faq",
      // de: "/faq",
      pl: "/faq",
    },
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
