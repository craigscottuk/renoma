// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { client } from "@/sanity/client";
import WhatWeOffer from "./what-we-offer";
import WhoWeAreLookingFor from "./who-we-are-looking-for";
import { PortableTextBlock } from "next-sanity";
import { getTranslations } from "next-intl/server";
import CTA from "@/components/cta";
import { ctaContent } from "@/lib/ctaContent";

const QUERY = `
{
  "learnWithUsHeader": *[_type == "learnWithUsHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image, 
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor
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
    "criteria": coalesce(criteria[$locale], []),
    "image": image,
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia"),
    "applyButtonText": coalesce(applyButtonText[_key == $locale][0].value, "Brak tłumaczenia")
  }
}
`;

const OPTIONS = { next: { revalidate: 60 } };
// 86400

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
    imageLayout?: "fullWidthAbove" | "fullWidthBelow" | "portraitRight";
    backgroundColor?: "white" | "black";
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

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("learn-with-us.title"),
    description: t("learn-with-us.description"),
    openGraph: {
      title: t("learn-with-us.title"),
      description: t("learn-with-us.description"),
    },
    twitter: {
      title: t("learn-with-us.title"),
      description: t("learn-with-us.description"),
    },
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
          backgroundColor={learnWithUsHeader.backgroundColor}
        />
      )}

      {/* What we offer */}
      {whatWeOffer && (
        <WhatWeOffer
          title={whatWeOffer.title}
          offers={whatWeOffer.offers}
          paddingY="py-20 md:py-24"
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
          paddingY="py-20 md:py-16"
        />
      )}
      <CTA
        title={ctaContent.title}
        description={ctaContent.description}
        buttonText={ctaContent.buttonText}
      />
    </>
  );
}
