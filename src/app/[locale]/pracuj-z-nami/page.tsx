// src/app/[locale]/pracuj-z-nami/page.tsx
// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { client } from "@/sanity/client";
import { PortableTextBlock } from "next-sanity";
import SectionJobOffer from "./section-job-offer";
import CTA from "@/components/cta";

const QUERY = `
{
  "workWithUsHeader": *[_type == "workWithUsHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image,
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor,
    "aspectRatio": coalesce(aspectRatio, "wide"),
    "landscapeMobileForPortraitRight": landscapeMobileForPortraitRight
  },
  "jobOffers": *[_type == "jobOffers"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "jobOffer": jobOffer[]{
      "jobTitle": coalesce(jobTitle[_key == $locale][0].value, "Brak tłumaczenia"),
      "jobDescription": coalesce(jobDescription[_key == $locale][0].value, "Brak tłumaczenia"),
      "jobLocation": coalesce(jobLocation[_key == $locale][0].value, "Brak tłumaczenia"),
      "jobType": coalesce(jobType[_key == $locale][0].value, "Brak tłumaczenia"),
      "responsibilities": coalesce(responsibilities[$locale], []),
      "requirements": coalesce(requirements[$locale], []),
      "benefits": coalesce(benefits[$locale], []),
      "colorScheme": "zincLight" // Add this line
    }
  },
  "ctaContent": *[_type == "ctaContent"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "buttonText": coalesce(buttonLabel[_key == $locale][0].value, "Brak tłumaczenia")
  },
  "workWithUsPageSeo": *[_type == "workWithUsPageSeo"][0]{
    "pageTitle": coalesce(pageTitle[_key == $locale][0].value, "Default SEO Title"),
    "metaDescription": coalesce(metaDescription[_key == $locale][0].value, "Default SEO Description"),
    "ogTitle": coalesce(ogTitle[_key == $locale][0].value, "Default OG Title"),
    "ogDescription": coalesce(ogDescription[_key == $locale][0].value, "Default OG Description"),
    "ogImage": ogImage
  }
}
`;

const OPTIONS = { next: { revalidate: 604800 } };
// 86400

type Props = {
  params: { locale: string };
};

interface Content {
  workWithUsHeader: {
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
    backgroundColor?: "black" | "white";
    aspectRatio?: "standard" | "wide";
    landscapeMobileForPortraitRight?: string;
  };
  jobOffers: {
    title: string;
    jobOffer: {
      jobTitle: string;
      jobDescription: string;
      jobLocation: string;
      jobType: string;
      responsibilities: PortableTextBlock[];
      requirements: PortableTextBlock[];
      benefits: PortableTextBlock[];
    }[];
  };
  ctaContent: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props) {
  const { workWithUsPageSeo } = await client.fetch(QUERY, { locale }, OPTIONS);

  return {
    title: workWithUsPageSeo?.pageTitle,
    description: workWithUsPageSeo?.metaDescription,
    openGraph: {
      title: workWithUsPageSeo?.ogTitle,
      description: workWithUsPageSeo?.ogDescription,
      images: workWithUsPageSeo?.ogImage
        ? [{ url: workWithUsPageSeo.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: workWithUsPageSeo?.ogTitle,
      description: workWithUsPageSeo?.ogDescription,
    },
  };
}

export default async function PracujZNami({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { workWithUsHeader, jobOffers, ctaContent } = content;

  return (
    <>
      {/* Header Section */}
      {workWithUsHeader && (
        <PageHeader
          label={workWithUsHeader.label}
          title={workWithUsHeader.title}
          description={workWithUsHeader.description}
          image={workWithUsHeader.image}
          imageAlt={workWithUsHeader.imageAlt}
          imageLayout={workWithUsHeader.imageLayout}
          backgroundColor={workWithUsHeader.backgroundColor}
          aspectRatio={workWithUsHeader.aspectRatio}
          landscapeMobileForPortraitRight={
            workWithUsHeader.landscapeMobileForPortraitRight
          }
          paddingY="py-20 md:pb-24 lg:pt-24 lg:pb-36"
        />
      )}

      {/* Job Offer Section */}
      {jobOffers && (
        <SectionJobOffer
          title={jobOffers.title}
          jobOffers={jobOffers.jobOffer}
          paddingY="py-16 md:py-20 lg:py-24"
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
