// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header-section";
import { client } from "@/sanity/client";
import { PortableTextBlock } from "next-sanity";
import Privacy from "@/components/sections-privacy/privacy";

const QUERY = `
{
  "privacyHeader": *[_type == "privacyHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image, 
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia")
  },

  "privacyText": *[_type == "privacyText"][0]
  {
    "content": select(
      defined(content[$locale]) => content[$locale],
      "Brak tłumaczenia"
)}
}

`;

const OPTIONS = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  privacyHeader: {
    label: string;
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
  };
  privacyText: {
    content: PortableTextBlock[];
  };
}

export default async function PolitykaPrywatnosci({
  params: { locale },
}: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { privacyHeader, privacyText } = content;

  return (
    <>
      <PageHeader
        label={privacyHeader.label}
        title={privacyHeader.title}
        description={privacyHeader.description}
        image={privacyHeader.image}
        imageAlt={privacyHeader.imageAlt}
      />
      <Privacy content={privacyText.content} />
    </>
  );
}
