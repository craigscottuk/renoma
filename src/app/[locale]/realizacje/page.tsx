// cSpell:disable
// app/[locale]/realizacje/page.tsx
import { setRequestLocale } from "next-intl/server";
import { client } from "@/sanity/client";
import PageHeader from "@/components/page-header";
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
  "caseStudiesPageSeo": *[_type == "caseStudiesPageSeo"][0]{
    "pageTitle": coalesce(pageTitle[_key == $locale][0].value, "Default SEO Title"),
    "metaDescription": coalesce(metaDescription[_key == $locale][0].value, "Default SEO Description"),
    "ogTitle": coalesce(ogTitle[_key == $locale][0].value, "Default OG Title"),
    "ogDescription": coalesce(ogDescription[_key == $locale][0].value, "Default OG Description"),
    "ogImage": ogImage
  }
}
`;

const OPTIONS = { next: { revalidate: 60 } };
// 86400

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const { caseStudiesPageSeo } = await client.fetch(QUERY, { locale }, OPTIONS);

  return {
    title: caseStudiesPageSeo?.pageTitle,
    description: caseStudiesPageSeo?.metaDescription,
    openGraph: {
      title: caseStudiesPageSeo?.ogTitle,
      description: caseStudiesPageSeo?.ogDescription,
      images: caseStudiesPageSeo?.ogImage
        ? [{ url: caseStudiesPageSeo.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: caseStudiesPageSeo?.ogTitle,
      description: caseStudiesPageSeo?.ogDescription,
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
          paddingY="py-20 md:pt-24 md:pb-36"
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
