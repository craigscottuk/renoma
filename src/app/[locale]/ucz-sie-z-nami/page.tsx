// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeaderSection from "@/components/page-header-section";
import { client } from "@/sanity/client";
import WhatWeOffer from "@/components/sections-learn-with-us/what-we-offer";
import WhoWeAreLookingFor from "@/components/sections-learn-with-us/who-we-are-looking-for";
import { PortableTextBlock } from "next-sanity";

const QUERY = `
{
  "learnWithUsHeaderSection": *[_type == "learnWithUsHeaderSection"][0]{
    "sectionLabel": coalesce(sectionLabel[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionTitle": coalesce(sectionTitle[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionDescription": coalesce(sectionDescription[_key == $locale][0].value, "Brak tłumaczenia"),
    "headerImage": headerImage, // Fetch full image object with asset._ref
    "headerImageAlt": coalesce(headerImage.alt[_key == $locale][0].value, "Brak tłumaczenia")
  },
  "whatWeOfferSection": *[_type == "whatWeOfferSection"][0]{
    "sectionTitle": coalesce(sectionTitle[_key == $locale][0].value, "Brak tłumaczenia"),
    "offers": offers[]{
      "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
      "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia")
    }
  },
  "whoWeAreLookingForSection": *[_type == "whoWeAreLookingForSection"][0]{
    "sectionTitle": coalesce(sectionTitle[_key == $locale][0].value, "Brak tłumaczenia"),
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
  learnWithUsHeaderSection: {
    sectionLabel: string;
    sectionTitle: string;
    sectionDescription: string;
    headerImage?: string;
    headerImageAlt?: string;
  };
  whatWeOfferSection: {
    sectionTitle: string;
    offers: { title: string; description: string }[];
  };
  whoWeAreLookingForSection: {
    sectionTitle: string;
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

  const {
    learnWithUsHeaderSection,
    whatWeOfferSection,
    whoWeAreLookingForSection,
  } = content;

  return (
    <>
      <PageHeaderSection
        sectionLabel={learnWithUsHeaderSection.sectionLabel}
        sectionTitle={learnWithUsHeaderSection.sectionTitle}
        sectionDescription={learnWithUsHeaderSection.sectionDescription}
        headerImage={learnWithUsHeaderSection.headerImage}
        headerImageAlt={learnWithUsHeaderSection.headerImageAlt}
      />

      {/* What we offer */}
      <WhatWeOffer
        sectionTitle={whatWeOfferSection.sectionTitle}
        offers={whatWeOfferSection.offers}
        paddingY="py-20 md:py-48"
      />

      {/* Who we are looking for */}
      <WhoWeAreLookingFor
        sectionTitle={whoWeAreLookingForSection.sectionTitle}
        criteria={whoWeAreLookingForSection.criteria}
        image={whoWeAreLookingForSection.image}
        imageAlt={whoWeAreLookingForSection.imageAlt}
        applyButtonText={whoWeAreLookingForSection.applyButtonText}
        paddingY="py-20 md:py-48"
      />
    </>
  );
}
