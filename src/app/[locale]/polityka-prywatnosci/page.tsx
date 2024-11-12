// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeaderSection from "@/components/page-header-section";
import { client } from "@/sanity/client";

const QUERY = `
{
  "privacyHeaderSection": *[_type == "privacyHeaderSection"][0]{
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
  privacyHeaderSection: {
    sectionLabel: string;
    sectionTitle: string;
    sectionDescription: string;
    headerImage?: string;
    headerImageAlt?: string;
  };
}

export default async function PolitykaPrywatnosci({
  params: { locale },
}: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { privacyHeaderSection } = content;

  return (
    <PageHeaderSection
      sectionLabel={privacyHeaderSection.sectionLabel}
      sectionTitle={privacyHeaderSection.sectionTitle}
      sectionDescription={privacyHeaderSection.sectionDescription}
      headerImage={privacyHeaderSection.headerImage}
      headerImageAlt={privacyHeaderSection.headerImageAlt}
    />
  );
}
