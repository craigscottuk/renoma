// cSpell:disable
// app/[locale]/realizacje/page.tsx
import { setRequestLocale } from "next-intl/server";
import { client } from "@/sanity/client";
import PageHeader from "@/components/page-header";
import ProjectsList from "./projects-list";

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

const OPTIONS = { next: { revalidate: 86400 } }; // Persistent caching

type Props = {
  params: { locale: string };
};

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

      {/* List of Projects / Case Studies */}
      {projects && projects.length > 0 && (
        <ProjectsList projects={projects} paddingY="py-20 md:py-48" />
      )}
    </>
  );
}
