// cSpell:disable
// src/app/[locale]/ucz-sie-z-nami/page.tsx
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { sanityFetch } from "@/sanity/client";
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
"imageAlt": coalesce(imageAlt[_key == $locale][0].value, "Header image"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor,
    "aspectRatio": coalesce(aspectRatio, "wide"),
    "landscapeMobileForPortraitRight": landscapeMobileForPortraitRight
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
"imageAlt": coalesce(imageAlt[_key == $locale][0].value, "Header image"),
    "applyButtonText": coalesce(applyButtonText[_key == $locale][0].value, "Brak tłumaczenia")
  },
  "ctaContent": *[_type == "ctaContent"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "buttonText": coalesce(buttonLabel[_key == $locale][0].value, "Brak tłumaczenia")
  },
  "learnWithUsPageMeta": *[_type == "learnWithUsPageMeta"][0]{
    "pageTitle": coalesce(pageTitle[_key == $locale][0].value, "Default SEO Title"),
    "metaDescription": coalesce(metaDescription[_key == $locale][0].value, "Default SEO Description"),
    "ogTitle": coalesce(ogTitle[_key == $locale][0].value, "Default OG Title"),
    "ogDescription": coalesce(ogDescription[_key == $locale][0].value, "Default OG Description"),
    "ogImage": ogImage
  }
}
`;

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
      | "portraitRight"
      | "landscapeRight"
      | "noImage";
    backgroundColor?: "white" | "black";
    aspectRatio?: "standard" | "wide";
    landscapeMobileForPortraitRight?: string;
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

// Metadata from translations and generateMetadata function
export async function generateMetadata({ params: { locale } }: Props) {
  const { learnWithUsPageMeta } = await sanityFetch<{
    learnWithUsPageMeta: {
      pageTitle: string;
      metaDescription: string;
      ogTitle: string;
      ogDescription: string;
      ogImage: { asset: { url: string } };
    };
  }>({
    query: QUERY,
    params: { locale },
    tags: ["learnWithUs"],
    revalidate: 10, // 604800
  });

  return {
    title: learnWithUsPageMeta?.pageTitle,
    description: learnWithUsPageMeta?.metaDescription,
    openGraph: {
      title: learnWithUsPageMeta?.ogTitle,
      description: learnWithUsPageMeta?.ogDescription,
      images: learnWithUsPageMeta?.ogImage
        ? [{ url: learnWithUsPageMeta.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: learnWithUsPageMeta?.ogTitle,
      description: learnWithUsPageMeta?.ogDescription,
    },
  };
}

export default async function UczSieZNami({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await sanityFetch<Content>({
    query: QUERY,
    params: { locale },
    tags: ["learnWithUs"],
    revalidate: 10, // 604800
  });
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
          landscapeMobileForPortraitRight={
            learnWithUsHeader.landscapeMobileForPortraitRight
          }
          paddingY="py-20 md:pb-24 lg:pt-24 lg:pb-36"
        />
      )}

      {/* What we offer */}
      {whatWeOffer && (
        <WhatWeOffer
          title={whatWeOffer.title}
          offers={whatWeOffer.offers}
          paddingY="py-20 md:py-20 lg:py-28"
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
          paddingY="py-0 md:py-20 lg:py-24 "
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
