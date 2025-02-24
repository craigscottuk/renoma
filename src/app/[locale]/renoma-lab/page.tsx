// cSpell:disable
//src/app/[locale]/renoma-lab/page.tsx
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { client } from "@/sanity/client";
import LabOffer from "./lab-offer";
// import { AboutLab } from "./about-lab";
import { PortableTextBlock } from "next-sanity";
import CTA from "@/components/cta";

const QUERY = `
{
  "renomaLabHeader": *[_type == "renomaLabHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image,
    "mobileImage": mobileImage,
    "imageAlt": coalesce(imageAlt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor,
    "descriptionTwoColumns": coalesce(descriptionTwoColumns[$locale], []),
    "aspectRatio": coalesce(aspectRatio, "wide"),
  },
  "aboutLab": *[_type == "aboutLab"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "text": coalesce(text[$locale], []),
  },
  "labOffer": *[_type == "labOffer"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "offers": offers[]{
      "icon": icon,
      "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
      "content": coalesce(content[$locale], []),
    },
    "collaborationDescription": coalesce(collaborationDescription[_key == $locale][0].value, "Brak tłumaczenia")
  },
  "ctaContent": *[_type == "ctaContent"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "buttonText": coalesce(buttonLabel[_key == $locale][0].value, "Brak tłumaczenia")
  },
  "renomaLabPageSeo": *[_type == "renomaLabPageSeo"][0]{
    "pageTitle": coalesce(pageTitle[_key == $locale][0].value, "Default SEO Title"),
    "metaDescription": coalesce(metaDescription[_key == $locale][0].value, "Default SEO Description"),
    "ogTitle": coalesce(ogTitle[_key == $locale][0].value, "Default OG Title"),
    "ogDescription": coalesce(ogDescription[_key == $locale][0].value, "Default OG Description"),
    "ogImage": ogImage
  }
}
`;

const OPTIONS = { next: { revalidate: 60 } };
// 86400

type Props = {
  params: { locale: string };
};

interface Content {
  renomaLabHeader: {
    label: string;
    title: string;
    description: string;
    image?: string;
    mobileImage?: string; // Add this to your interface
    imageAlt?: string;
    imageLayout?:
      | "fullWidthAbove"
      | "fullWidthBelow"
      | "portraitRight"
      | "landscapeRight"
      | "noImage";
    backgroundColor?: "white" | "black";
    descriptionTwoColumns: PortableTextBlock[];
    aspectRatio?: "standard" | "wide";
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
  ctaContent: {
    title: string;
    description: string;
    buttonText: string;
  };
}

// Metadata from translations and generateMetadata function
export async function generateMetadata({ params: { locale } }: Props) {
  const { renomaLabPageSeo } = await client.fetch(QUERY, { locale }, OPTIONS);

  return {
    title: renomaLabPageSeo?.pageTitle,
    description: renomaLabPageSeo?.metaDescription,
    openGraph: {
      title: renomaLabPageSeo?.ogTitle,
      description: renomaLabPageSeo?.ogDescription,
      images: renomaLabPageSeo?.ogImage
        ? [{ url: renomaLabPageSeo.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: renomaLabPageSeo?.ogTitle,
      description: renomaLabPageSeo?.ogDescription,
    },
  };
}

export default async function RenomaLab({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const {
    renomaLabHeader,
    // aboutLab,
    labOffer,
    ctaContent,
  } = content;

  return (
    <>
      {/* Page Header */}
      {renomaLabHeader && (
        <PageHeader
          label={renomaLabHeader.label}
          title={renomaLabHeader.title}
          description={renomaLabHeader.description}
          image={renomaLabHeader.image}
          mobileImage={renomaLabHeader.mobileImage}
          imageAlt={renomaLabHeader.imageAlt}
          imageLayout={renomaLabHeader.imageLayout}
          backgroundColor={renomaLabHeader.backgroundColor}
          aspectRatio={renomaLabHeader.aspectRatio}
          twoColumnText={true}
          portableTextBlock={renomaLabHeader.descriptionTwoColumns}
        />
      )}

      {/* About Lab */}
      {/* {!renomaLabHeader.descriptionTwoColumns && (
        <AboutLab
          title={aboutLab.title}
          text={aboutLab.text}
          paddingY="py-36"
        />
      )} */}

      {/* Lab Offer */}
      {labOffer && (
        <LabOffer
          title={labOffer.title}
          offers={labOffer.offers}
          collaborationDescription={labOffer.collaborationDescription}
          paddingY="py-24"
          colorScheme="zincLight"
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
