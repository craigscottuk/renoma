// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { client } from "@/sanity/client";
import LabOffer from "./offer";
// import { AboutLab } from "./about-lab";
import { PortableTextBlock } from "next-sanity";
import { getTranslations } from "next-intl/server";
import CTA from "@/components/cta";
import { ctaContent } from "@/lib/ctaContent";

const QUERY = `
{
  "renomaLabHeader": *[_type == "renomaLabHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image, 
    "imageAlt": coalesce(imageAlt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor,
    "descriptionTwoColumns": coalesce(descriptionTwoColumns[$locale], []),
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
  }
}
`;

const OPTIONS = { next: { revalidate: 86400 } };
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
    imageAlt?: string;
    imageLayout?: "fullWidthAbove" | "fullWidthBelow" | "portraitRight";
    backgroundColor?: "white" | "black";
    descriptionTwoColumns: PortableTextBlock[];
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

// Metadata from translations and generateMetadata function
export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("renomaLab.title"),
    description: t("renomaLab.description"),
    openGraph: {
      title: t("renomaLab.title"),
      description: t("renomaLab.description"),
    },
    twitter: {
      title: t("renomaLab.title"),
      description: t("renomaLab.description"),
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
          imageAlt={renomaLabHeader.imageAlt}
          imageLayout={renomaLabHeader.imageLayout}
          backgroundColor={renomaLabHeader.backgroundColor}
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
          paddingY="py-36"
          colorScheme="zincLight"
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
