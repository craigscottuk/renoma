// cSpell:disable
// app/[locale]/realizacje/page.tsx
import { setRequestLocale } from "next-intl/server";
import { client } from "@/sanity/client";
import PageHeader from "@/components/page-header";
import ProjectsList from "./projects-list";
import CTA from "@/components/cta";

const QUERY = `
{
  "projectsHeader": *[_type == "projectsHeader"][0]{
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
      draft,
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
  },
  "projectsPageMeta": *[_type == "projectsPageMeta"][0]{
    "pageTitle": coalesce(pageTitle[_key == $locale][0].value, "Default SEO Title"),
    "metaDescription": coalesce(metaDescription[_key == $locale][0].value, "Default SEO Description"),
    "ogTitle": coalesce(ogTitle[_key == $locale][0].value, "Default OG Title"),
    "ogDescription": coalesce(ogDescription[_key == $locale][0].value, "Default OG Description"),
    "ogImage": ogImage
  }
}
`;

const OPTIONS = { next: { revalidate: 10 } };
// 604800

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const { projectsPageMeta } = await client.fetch(QUERY, { locale }, OPTIONS);

  return {
    title: projectsPageMeta?.pageTitle,
    description: projectsPageMeta?.metaDescription,
    openGraph: {
      title: projectsPageMeta?.ogTitle,
      description: projectsPageMeta?.ogDescription,
      images: projectsPageMeta?.ogImage
        ? [{ url: projectsPageMeta.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: projectsPageMeta?.ogTitle,
      description: projectsPageMeta?.ogDescription,
    },
  };
}

export default async function Realizacje({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const { projectsHeader, projects, ctaContent } = await client.fetch(
    QUERY,
    { locale },
    OPTIONS,
  );

  return (
    <>
      {/* Page Header */}
      {projectsHeader && (
        <PageHeader
          label={projectsHeader.label}
          title={projectsHeader.title}
          description={projectsHeader.description}
          image={projectsHeader.image}
          imageAlt={projectsHeader.imageAlt}
          imageLayout={projectsHeader.imageLayout}
          backgroundColor={projectsHeader.backgroundColor}
          landscapeMobileForPortraitRight={
            projectsHeader.landscapeMobileForPortraitRight
          }
          paddingY="py-20 md:pt-24 md:pb-36"
        />
      )}

      {/* Projects List */}
      <ProjectsList projectCardData={projects} paddingY="py-36" />

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
