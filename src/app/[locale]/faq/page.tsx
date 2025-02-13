// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { client } from "@/sanity/client";
import { getTranslations } from "next-intl/server";
import CTA from "@/components/cta";
import FaqAccordion from "./faq";

const QUERY = `
{
  "faqHeader": *[_type == "faqHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image, 
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor
  },

  "faqList": *[_type == "faqList"][0]{
    "faqItems": faqItems[]{
      "question": coalesce(question[_key == $locale][0].value, "Brak tłumaczenia"),
      "answer": coalesce(answer[_key == $locale][0].value, "Brak tłumaczenia")
    }
  },

  "ctaContent": *[_type == "ctaContent"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "buttonText": coalesce(buttonLabel[_key == $locale][0].value, "Brak tłumaczenia")
  }
}
`;

const OPTIONS = { next: { revalidate: 30 } };
// 86400

type Props = {
  params: { locale: string };
};

interface Content {
  faqHeader: {
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
  };

  faqList: {
    faqItems: {
      question: string;
      answer: string;
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
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("faq.title"),
    description: t("faq.description"),
    openGraph: {
      title: t("faq.title"),
      description: t("faq.description"),
    },
    twitter: {
      title: t("faq.title"),
      description: t("faq.description"),
    },
  };
}

export default async function Faq({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { faqHeader, faqList, ctaContent } = content;

  return (
    <>
      {/* Conditionally render Page Header Section */}
      {faqHeader && (
        <PageHeader
          label={faqHeader.label}
          title={faqHeader.title}
          description={faqHeader.description}
          image={faqHeader.image}
          imageAlt={faqHeader.imageAlt}
          imageLayout={faqHeader.imageLayout}
          backgroundColor={faqHeader.backgroundColor}
        />
      )}

      {/* FAQ Section */}
      {faqList && <FaqAccordion faqItems={faqList.faqItems} />}

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
