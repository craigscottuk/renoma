// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { client } from "@/sanity/client";
import WhatWeOffer from "./what-we-offer";
import WhoWeAreLookingFor from "./who-we-are-looking-for";
import { PortableTextBlock } from "next-sanity";

const QUERY = `
{
  "learnWithUsHeader": *[_type == "learnWithUsHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image, 
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout
  },
  "whatWeOffer": *[_type == "whatWeOffer"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "offers": offers[]{
      "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
      "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia")
    }
  },
  "whoWeAreLookingFor": *[_type == "whoWeAreLookingFor"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "criteria": select(
      defined(criteria[$locale]) => criteria[$locale],
      "Brak tłumaczenia"
    ),
    "image": image,
    "imageAlt": coalesce(imageAlt[_key == $locale][0].value, "Brak tłumaczenia"),
    "applyButtonText": coalesce(applyButtonText[_key == $locale][0].value, "Brak tłumaczenia")
  }
}
`;

const OPTIONS = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  learnWithUsHeader: {
    label: string;
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    imageLayout?: "fullWidth" | "portraitRight";
  };
  whatWeOffer: {
    title: string;
    offers: { title: string; description: string }[];
  };
  whoWeAreLookingFor: {
    title: string;
    criteria: PortableTextBlock[];
    image: string;
    imageAlt: string;
    applyButtonText: string;
  };
}

export default async function UczSieZNami({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { learnWithUsHeader, whatWeOffer, whoWeAreLookingFor } = content;

  return (
    <>
      {/* Page Header */}
      {learnWithUsHeader && (
        <PageHeader
          label={learnWithUsHeader.label}
          title={learnWithUsHeader.title}
          description={learnWithUsHeader.description}
          image={learnWithUsHeader.image}
          imageAlt={learnWithUsHeader.imageAlt}
          imageLayout={learnWithUsHeader.imageLayout}
        />
      )}

      {/* What we offer */}
      {whatWeOffer && (
        <WhatWeOffer
          title={whatWeOffer.title}
          offers={whatWeOffer.offers}
          paddingY="py-20 md:py-48"
        />
      )}

      {/* Who we are looking for */}
      {whoWeAreLookingFor && (
        <WhoWeAreLookingFor
          title={whoWeAreLookingFor.title}
          criteria={whoWeAreLookingFor.criteria}
          image={whoWeAreLookingFor.image}
          imageAlt={whoWeAreLookingFor.imageAlt}
          applyButtonText={whoWeAreLookingFor.applyButtonText}
          paddingY="py-20 md:py-48"
        />
      )}
    </>
  );
}
