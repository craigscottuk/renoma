// src/app/[locale]/pracuj-z-nami/page.tsx
// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { sanityFetch } from "@/sanity/client";
import { PortableTextBlock } from "next-sanity";
import SectionJobOffer from "./job-openings";
import CTA from "@/components/cta";

const QUERY = `
{
  "workWithUsHeader": *[_type == "workWithUsHeader"][0]{
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
  "workWithUsPageMeta": *[_type == "workWithUsPageMeta"][0]{
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
  workWithUsHeader: {
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

// Metadata from translations and generateMetadata function
export async function generateMetadata({ params: { locale } }: Props) {
  const { workWithUsPageMeta } = await sanityFetch<{
    workWithUsPageMeta: {
      pageTitle: string;
      metaDescription: string;
      ogTitle: string;
      ogDescription: string;
      ogImage: { asset: { url: string } };
    };
  }>({
    query: QUERY,
    params: { locale },
    tags: ["workWithUs"],
    revalidate: 10, // 604800
  });

  return {
    title: workWithUsPageMeta?.pageTitle,
    description: workWithUsPageMeta?.metaDescription,
    openGraph: {
      title: workWithUsPageMeta?.ogTitle,
      description: workWithUsPageMeta?.ogDescription,
      images: workWithUsPageMeta?.ogImage
        ? [{ url: workWithUsPageMeta.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: workWithUsPageMeta?.ogTitle,
      description: workWithUsPageMeta?.ogDescription,
    },
  };
}

export default async function PracujZNami({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await sanityFetch<Content>({
    query: QUERY,
    params: { locale },
    tags: ["workWithUs"],
    revalidate: 10, // 604800
  });

  const { workWithUsHeader, jobOffers, ctaContent } = content;

  return (
    <>
      {/* Page Header */}
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

      {/* Job Openings */}
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
