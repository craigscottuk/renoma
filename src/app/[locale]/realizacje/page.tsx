// cSpell:disable
// app/[locale]/realizacje/page.tsx
import { setRequestLocale } from "next-intl/server";
import { client } from "@/sanity/client";
import PageHeader from "@/components/page-header";
import ProjectsList from "./projects-list";
import { getTranslations } from "next-intl/server";
import ProjectCard from "./project-card";

const QUERY = `
{
  "caseStudyHeader": *[_type == "caseStudyHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image,
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor
  },
  "projects": *[_type == "caseStudyEntry" && language == $locale]{
    title,
    slug,
    language,
}
}
`;

const projectCardData = [
  {
    id: 1,
    title: "Konserwacja Baszty Ferbera",
    location: "Wzgórze Katedralne we Fromborku",
    timeframe: "Styczeń 2024 – Grudzień 2024",
    description:
      "Stabilizacja konstrukcji i usunięcie czynników powodujących destrukcję zabytkowej substancji. Prace obejmowały remont więźby dachowej, wymianę pokrycia oraz konserwację oryginalnego wątku ceglanego i detali kamiennych.",
    imageUrl: "/basteja.webp",
    slug: "konserwacja-baszty-ferbera",
  },
  {
    id: 2,
    title: "Konserwacja Kościoła w Rogowie",
    location: "Rogowo, gmina Lubicz",
    timeframe: "Od stycznia 2024 r.",
    description:
      "Jeden z najważniejszych kościołów bezwieżowych na terenie dawnego państwa krzyżackiego. Prace koncentrują się głównie na usunięciu przyczyn zawilgocenia oraz konserwacji wątku ceglanego i detali kamiennych.",
    imageUrl: "/fallback-image.svg",
    slug: "konserwacja-kosciola-w-rogowie",
  },
  {
    id: 3,
    title: "Konserwacja Kościoła Farnego w Grudziądzu",
    location: "Grudziądz, Rynek Starego Miasta",
    timeframe: "Od 2018 r.",
    description:
      "Jedna z najstarszych świątyń miasta. Prace obejmują renowację gotyckich malowideł wewnątrz i zabytkowej elewacji, z celem przywrócenia strukturalnej stabilności i historycznego wyglądu.",
    imageUrl: "/fallback-image.svg",
    slug: "konserwacja-kosciola-farnego-w-grudziadzu",
  },
];

const OPTIONS = { next: { revalidate: 86400 } };
// 86400

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("projects.title"),
    description: t("projects.description"),
    openGraph: {
      title: t("projects.title"),
      description: t("projects.description"),
    },
    twitter: {
      title: t("projects.title"),
      description: t("projects.description"),
    },
  };
}

export default async function Realizacje({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const { projects, caseStudyHeader } = await client.fetch(
    QUERY,
    { locale },
    OPTIONS,
  );

  return (
    <>
      {/* Page Header Section */}
      {caseStudyHeader && (
        <PageHeader
          label={caseStudyHeader.label}
          title={caseStudyHeader.title}
          description={caseStudyHeader.description}
          image={caseStudyHeader.image}
          imageAlt={caseStudyHeader.imageAlt}
          imageLayout={caseStudyHeader.imageLayout}
          backgroundColor={caseStudyHeader.backgroundColor}
        />
      )}

      {/* {projects && projects.length > 0 && (
        <ProjectsList projects={projects} paddingY="py-20 md:py-48" />
      )} */}

      {/* List of Projects / Case Studies */}
      <ProjectCard
        projectCardData={projectCardData}
        paddingY="py-36"
        colorScheme="zincLight"
      />
    </>
  );
}
