import { MetadataRoute } from "next";
import { routing } from "../i18n/routing";
import { client } from "@/sanity/client"; // Adjust import if necessary

// Your production base URL
const BASE_URL = "https://www.pkzrenoma.com";

// Derive a Locale type from routing
type Locale = (typeof routing.locales)[number];

// Type for your pathnames: Since "/" is a string and others are records
// we can define a helper type that represents pathnames more explicitly:
type Pathnames = typeof routing.pathnames;
type RouteKey = keyof Pathnames;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { locales, defaultLocale, pathnames } = routing;

  const entries: MetadataRoute.Sitemap = [];

  // Handle the homepage
  const homeAlternates: Record<Locale, string> = {} as Record<Locale, string>;
  for (const locale of locales) {
    homeAlternates[locale] =
      locale === defaultLocale ? `${BASE_URL}/` : `${BASE_URL}/${locale}`;
  }

  entries.push({
    url: homeAlternates[defaultLocale],
    lastModified: new Date(),
    alternates: {
      languages: homeAlternates,
    },
  });

  // Add all static (non-dynamic) routes
  for (const routeKey in pathnames) {
    if (routeKey === "/" || routeKey === "/realizacje/[slug]") continue;

    // Assert routeKey as a RouteKey
    const key = routeKey as RouteKey;
    // For static routes (other than "/"), pathnames[key] is a Record<Locale,string>
    const routeMapping = pathnames[key] as Record<Locale, string>;

    const alternates: Record<Locale, string> = {} as Record<Locale, string>;
    for (const locale of locales) {
      const localizedPath = routeMapping[locale];
      // Add the locale prefix to the URL for all locales
      alternates[locale] = `${BASE_URL}/${locale}${localizedPath}`;
    }

    const defaultUrl = alternates[defaultLocale];
    entries.push({
      url: defaultUrl,
      lastModified: new Date(),
      alternates: {
        languages: alternates,
      },
    });
  }

  // Handle dynamic routes: /realizacje/[slug]
  const data = await client.fetch<
    {
      slug: { current: string };
      language: string;
      _translations: { slug: { current: string }; language: string }[];
    }[]
  >(`
    *[_type == "caseStudyEntry"]{
      slug,
      language,
      "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
        slug,
        language
      }
    }
  `);

  // projectRouteMapping is known to be { en: "...", de: "...", pl: "..." }
  const projectRouteMapping = pathnames["/realizacje/[slug]"] as Record<
    Locale,
    string
  >;

  for (const project of data) {
    const projectLocales: Record<Locale, string> = {} as Record<Locale, string>;

    // Cast project.language and t.language to Locale
    const projectLang = project.language as Locale;

    // Add the main project's language slug
    if (projectRouteMapping[projectLang]) {
      const mainTemplate = projectRouteMapping[projectLang];
      const mainUrl = `${BASE_URL}/${projectLang}${mainTemplate.replace("[slug]", project.slug.current)}`;
      projectLocales[projectLang] = mainUrl;
    }

    // Add each translated version
    for (const t of project._translations) {
      const translationLang = t.language as Locale;
      if (projectRouteMapping[translationLang]) {
        const localizedTemplate = projectRouteMapping[translationLang];
        const localizedUrl = `${BASE_URL}/${translationLang}${localizedTemplate.replace("[slug]", t.slug.current)}`;
        projectLocales[translationLang] = localizedUrl;
      }
    }

    const defaultProjectUrl =
      projectLocales[defaultLocale] ?? Object.values(projectLocales)[0];

    if (defaultProjectUrl) {
      entries.push({
        url: defaultProjectUrl,
        lastModified: new Date(),
        alternates: {
          languages: projectLocales,
        },
      });
    }
  }

  return entries;
}
