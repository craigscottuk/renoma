// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { client } from "@/sanity/client";
import LabOffer from "./offer";

const QUERY = `
{
  "renomaLabHeader": *[_type == "renomaLabHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image, 
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor
  },
}

`;

const OPTIONS = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  renomaLabHeader: {
    label: string;
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    imageLayout?: "fullWidth" | "portraitRight";
    backgroundColor?: "white" | "black";
  };
}

export default async function RenomaLab({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { renomaLabHeader } = content;

  return (
    <>
      {/* Page Header */}
      {renomaLabHeader && (
        <PageHeader
          label={renomaLabHeader.label}
          title={renomaLabHeader.title}
          description={renomaLabHeader.description}
          image={renomaLabHeader.image}
          imageAlt={renomaLabHeader.imageAlt}
          imageLayout={renomaLabHeader.imageLayout}
          backgroundColor={renomaLabHeader.backgroundColor}
        />
      )}

      {/* Lab Offer */}
      {renomaLabHeader && <LabOffer />}
    </>
  );
}
