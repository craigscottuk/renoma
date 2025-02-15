// cSpell:disable
// app/[locale]/realizacje/page.tsx
import { setRequestLocale } from "next-intl/server";
import { client } from "@/sanity/client";
import PageHeader from "@/components/page-header";

import { getTranslations } from "next-intl/server";
import ProjectCard from "./project-card";
import CTA from "@/components/cta";

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
  "projects": *[_type == "caseStudyEntry" && language == $locale]
    | order(_createdAt asc){
      title,
      "location": details.lokalizacja,
      "timeframe": details.czasTrwania,
      cardDescription,
      "imageUrl": image.asset->url,
      "slug": slug.current
    },
  "ctaContent": *[_type == "ctaContent"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "buttonText": coalesce(buttonLabel[_key == $locale][0].value, "Brak tłumaczenia")
  }
}
`;

const OPTIONS = { next: { revalidate: 30 } };
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
  const { caseStudyHeader, projects, ctaContent } = await client.fetch(
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
        projectCardData={projects}
        paddingY="py-36"
        colorScheme="zincLight"
      />

      {/* CTA */}
      {ctaContent && (
        <CTA
          title={ctaContent.title}
          description={ctaContent.description}
          buttonText={ctaContent.buttonText}
        />
      )}
    </>
  );
}
