// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { client } from "@/sanity/client";
import LabOffer from "./offer";
import { AboutLab } from "./about-lab";
import { PortableTextBlock } from "next-sanity";
const QUERY = `
{
  "renomaLabHeader": *[_type == "renomaLabHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image, 
    "imageAlt": coalesce(imageAlt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor
  },
  "aboutLab": *[_type == "aboutLab"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "text": select(
      defined(text[$locale]) => text[$locale],
      "Brak tłumaczenia"
    )
  },
  "labOffer": *[_type == "labOffer"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "offers": offers[]{
      "icon": icon,
      "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
      "content": select(
        defined(content[$locale]) => content[$locale],
        "Brak tłumaczenia"
      )
    },
    "collaborationDescription": coalesce(collaborationDescription[_key == $locale][0].value, "Brak tłumaczenia")
  }
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
    imageLayout?: "fullWidthAbove" | "fullWidthBelow" | "portraitRight";
    backgroundColor?: "white" | "black";
  };
  aboutLab: {
    title: string;
    text: PortableTextBlock[];
  };
  labOffer: {
    title: string;
    offers: {
      icon: string;
      title: string;
      content: PortableTextBlock[];
    }[];
    collaborationDescription: string;
  };
}

export default async function RenomaLab({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { renomaLabHeader, aboutLab, labOffer } = content;

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

      {/* About Lab */}
      {aboutLab && (
        <AboutLab
          title={aboutLab.title}
          text={aboutLab.text}
          paddingY="py-36"
        />
      )}

      {/* Lab Offer */}
      {labOffer && (
        <LabOffer
          title={labOffer.title}
          offers={labOffer.offers}
          collaborationDescription={labOffer.collaborationDescription}
          paddingY="py-12"
          colorScheme="zincLight" // Add this line
        />
      )}
    </>
  );
}
