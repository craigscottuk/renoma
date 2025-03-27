// cSpell:disable
//src/app/[locale]/renoma-lab/page.tsx
import CTA from "@/components/cta";
import LabOffer from "./lab-offer";
import { sanityFetch } from "@/sanity/client";
import { PortableTextBlock } from "next-sanity";
import PageHeader from "@/components/page-header";
import { setRequestLocale } from "next-intl/server";

const QUERY = `
{
  "renomaLabHeader": *[_type == "renomaLabHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image,
    "mobileImage": mobileImage,
"imageAlt": coalesce(imageAlt[_key == $locale][0].value, "Header image"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor,
    "descriptionTwoColumns": coalesce(descriptionTwoColumns[$locale], []),
    "aspectRatio": coalesce(aspectRatio, "wide"),
    "landscapeMobileForPortraitRight": landscapeMobileForPortraitRight
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
  "renomaLabPageMeta": *[_type == "renomaLabPageMeta"][0]{
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
  renomaLabHeader: {
    label: string;
    title: string;
    description: string;
    image?: string;
    mobileImage?: string;
    imageAlt?: string;
    imageLayout?:
      | "fullWidthAbove"
      | "portraitRight"
      | "landscapeRight"
      | "noImage";
    backgroundColor?: "white" | "black";
    descriptionTwoColumns: PortableTextBlock[];
    aspectRatio?: "standard" | "wide";
    landscapeMobileForPortraitRight?: string;
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
  const { renomaLabPageMeta } = await sanityFetch<{
    renomaLabPageMeta: {
      pageTitle: string;
      metaDescription: string;
      ogTitle: string;
      ogDescription: string;
      ogImage: { asset: { url: string } };
    };
  }>({
    query: QUERY,
    params: { locale },
    tags: ["renomaLab"],
    revalidate: 10, // 604800
  });

  return {
    title: renomaLabPageMeta?.pageTitle,
    description: renomaLabPageMeta?.metaDescription,
    openGraph: {
      title: renomaLabPageMeta?.ogTitle,
      description: renomaLabPageMeta?.ogDescription,
      images: renomaLabPageMeta?.ogImage
        ? [{ url: renomaLabPageMeta.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: renomaLabPageMeta?.ogTitle,
      description: renomaLabPageMeta?.ogDescription,
    },
  };
}

export default async function RenomaLab({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await sanityFetch<Content>({
    query: QUERY,
    params: { locale },
    tags: ["renomaLab"],
    revalidate: 10, // 604800
  });

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
          landscapeMobileForPortraitRight={
            renomaLabHeader.landscapeMobileForPortraitRight
          }
        />
      )}

      {/* Lab Offer */}
      {labOffer && (
        <LabOffer
          title={labOffer.title}
          offers={labOffer.offers}
          collaborationDescription={labOffer.collaborationDescription}
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
