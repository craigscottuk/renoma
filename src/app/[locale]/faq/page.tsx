// src/app/[locale]/faq/page.tsx
// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { sanityFetch } from "@/sanity/client";
import CTA from "@/components/cta";
import FaqAccordion from "./faq";
import Script from "next/script";

const QUERY = `
{
  "faqHeader": *[_type == "faqHeader"][0]{
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
  },

  "faqPageMeta": *[_type == "faqPageMeta"][0]{
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
  faqHeader: {
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
  const { faqPageMeta } = await sanityFetch<{
    faqPageMeta: {
      pageTitle?: string;
      metaDescription?: string;
      ogTitle?: string;
      ogDescription?: string;
      ogImage?: { asset?: { url?: string } };
    };
  }>({
    query: QUERY,
    params: { locale },
    tags: ["faq"],
    revalidate: 604800, // 604800
  });

  return {
    title: faqPageMeta?.pageTitle,
    description: faqPageMeta?.metaDescription,
    openGraph: {
      title: faqPageMeta?.ogTitle,
      description: faqPageMeta?.ogDescription,
      images: faqPageMeta?.ogImage
        ? [{ url: faqPageMeta.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: faqPageMeta?.ogTitle,
      description: faqPageMeta?.ogDescription,
    },
  };
}

export default async function Faq({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await sanityFetch<Content>({
    query: QUERY,
    params: { locale },
    tags: ["faq"],
    revalidate: 604800, // 604800
  });

  const { faqHeader, faqList, ctaContent } = content;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faqList.faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
        inLanguage: locale,
      },
    })),
  };

  return (
    <>
      {/* Inject the FAQ JSON-LD */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
          aspectRatio={faqHeader.aspectRatio}
          landscapeMobileForPortraitRight={
            faqHeader.landscapeMobileForPortraitRight
          }
          paddingY="py-20 md:pb-24 lg:pt-24 lg:pb-36"
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
