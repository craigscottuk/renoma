// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeaderSection from "@/components/page-header-section";
import { client } from "@/sanity/client";

const QUERY = `
{
  "privacyHeaderSection": *[_type == "privacyHeaderSection"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image, 
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia")
  },
}

`;

const OPTIONS = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  privacyHeaderSection: {
    label: string;
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
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
      label={privacyHeaderSection.label}
      title={privacyHeaderSection.title}
      description={privacyHeaderSection.description}
      image={privacyHeaderSection.image}
      imageAlt={privacyHeaderSection.imageAlt}
    />
  );
}
