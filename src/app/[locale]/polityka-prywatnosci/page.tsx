// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { client } from "@/sanity/client";
import { PortableTextBlock } from "next-sanity";
import Privacy from "@/app/[locale]/polityka-prywatnosci/privacy";

const QUERY = `
{
  "privacyHeader": *[_type == "privacyHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image, 
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor
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
    imageLayout?: "fullWidth" | "portraitRight";
    backgroundColor?: "black" | "white";
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
      {/* Page Header */}
      {privacyHeader && (
        <PageHeader
          label={privacyHeader.label}
          title={privacyHeader.title}
          description={privacyHeader.description}
          image={privacyHeader.image}
          imageAlt={privacyHeader.imageAlt}
          imageLayout={privacyHeader.imageLayout}
          backgroundColor={privacyHeader.backgroundColor}
        />
      )}

      {/* Privacy Policy text content */}
      {privacyText && (
        <Privacy content={privacyText.content} paddingY="py-20 md:py-48" />
      )}
    </>
  );
}
