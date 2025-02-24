// cSpell:disable
// src/app/[locale]/ucz-sie-z-nami/page.tsx
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { client } from "@/sanity/client";
import WhatWeOffer from "./what-we-offer";
import WhoWeAreLookingFor from "./who-we-are-looking-for";
import { PortableTextBlock } from "next-sanity";
import CTA from "@/components/cta";

const QUERY = `
{
  "learnWithUsHeader": *[_type == "learnWithUsHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image, 
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor,
    "aspectRatio": coalesce(aspectRatio, "wide")
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
  },
  "ctaContent": *[_type == "ctaContent"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "buttonText": coalesce(buttonLabel[_key == $locale][0].value, "Brak tłumaczenia")
  },
  "learnWithUsPageSeo": *[_type == "learnWithUsPageSeo"][0]{
    "pageTitle": coalesce(pageTitle[_key == $locale][0].value, "Default SEO Title"),
    "metaDescription": coalesce(metaDescription[_key == $locale][0].value, "Default SEO Description"),
    "ogTitle": coalesce(ogTitle[_key == $locale][0].value, "Default OG Title"),
    "ogDescription": coalesce(ogDescription[_key == $locale][0].value, "Default OG Description"),
    "ogImage": ogImage
  }
}
`;

const OPTIONS = { next: { revalidate: 30 } };
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
    imageLayout?:
      | "fullWidthAbove"
      | "fullWidthBelow"
      | "portraitRight"
      | "landscapeRight"
      | "noImage";
    backgroundColor?: "white" | "black";
    aspectRatio?: "standard" | "wide";
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
  ctaContent: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props) {
  const { learnWithUsPageSeo } = await client.fetch(QUERY, { locale }, OPTIONS);

  return {
    title: learnWithUsPageSeo?.pageTitle,
    description: learnWithUsPageSeo?.metaDescription,
    openGraph: {
      title: learnWithUsPageSeo?.ogTitle,
      description: learnWithUsPageSeo?.ogDescription,
      images: learnWithUsPageSeo?.ogImage
        ? [{ url: learnWithUsPageSeo.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: learnWithUsPageSeo?.ogTitle,
      description: learnWithUsPageSeo?.ogDescription,
    },
  };
}

export default async function UczSieZNami({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { learnWithUsHeader, whatWeOffer, whoWeAreLookingFor, ctaContent } =
    content;

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
          aspectRatio={learnWithUsHeader.aspectRatio}
          paddingY="py-20 md:pt-24 md:pb-36"
        />
      )}

      {/* What we offer */}
      {whatWeOffer && (
        <WhatWeOffer
          title={whatWeOffer.title}
          offers={whatWeOffer.offers}
          paddingY="py-20 md:py-28"
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
          paddingY="py-20 md:py-24"
        />
      )}

      {/* CTA */}
      {ctaContent && (
        <CTA
          title={ctaContent.title}
          description={ctaContent.description}
          buttonText={ctaContent.buttonText}
        />
      )}
    </>
  );
}
