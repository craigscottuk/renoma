// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeaderSection from "@/components/page-header-section";
import { client } from "@/sanity/client";
import CaseContentOne from "@/components/sections-case/case-concept-one";

const QUERY = `
{
  "learnWithUsHeaderSection": *[_type == "learnWithUsHeaderSection"][0]{
    "sectionLabel": coalesce(sectionLabel[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionTitle": coalesce(sectionTitle[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionDescription": coalesce(sectionDescription[_key == $locale][0].value, "Brak tłumaczenia"),
    "headerImage": headerImage, // Fetch full image object with asset._ref
    "headerImageAlt": coalesce(headerImage.alt[_key == $locale][0].value, "Brak tłumaczenia")
  },
}
`;

const OPTIONS = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  learnWithUsHeaderSection: {
    sectionLabel: string;
    sectionTitle: string;
    sectionDescription: string;
    headerImage?: string;
    headerImageAlt?: string;
  };
}

export default async function UczSieZNami({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { learnWithUsHeaderSection } = content;

  return (
    <>
      {/* <PageHeaderSection
        sectionLabel={learnWithUsHeaderSection.sectionLabel}
        sectionTitle={learnWithUsHeaderSection.sectionTitle}
        sectionDescription={learnWithUsHeaderSection.sectionDescription}
        headerImage={learnWithUsHeaderSection.headerImage}
        headerImageAlt={learnWithUsHeaderSection.headerImageAlt}
      /> */}

      <CaseContentOne />
    </>
  );
}
