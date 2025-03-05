// cSpell:disable
// src/app/[locale]/uslugi/page.tsx
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { client } from "@/sanity/client";
import ServicesList from "@/app/[locale]/uslugi/services-list";
import CTA from "@/components/cta";

const QUERY = `
{
  "servicesHeader": *[_type == "servicesHeader"][0]{
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
  
  "servicesGroup": *[_type == "servicesGroup"][0]{
    "serviceGroupOne": {
      "title": coalesce(serviceGroupOne.title, "Brak tłumaczenia"),
      "services": serviceGroupOne.services[]{
        "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
        "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
        "actions": actions[]{
          "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
          "content": coalesce(content[_key == $locale][0].value, "Brak tłumaczenia")
        },
        "images": images,
        "addLinkToRenomaLab": addLinkToRenomaLab
      }
    },
    "serviceGroupTwo": {
      "title": coalesce(serviceGroupTwo.title, "Brak tłumaczenia"),
      "services": serviceGroupTwo.services[]{
        "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
        "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
        "actions": actions[]{
          "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
          "content": coalesce(content[_key == $locale][0].value, "Brak tłumaczenia")
        },
        "images": images,
        "addLinkToRenomaLab": addLinkToRenomaLab
      }
    },
    "serviceGroupThree": {
      "title": coalesce(serviceGroupThree.title, "Brak tłumaczenia"),
      "services": serviceGroupThree.services[]{
        "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
        "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
        "actions": actions[]{
          "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
          "content": coalesce(content[_key == $locale][0].value, "Brak tłumaczenia")
        },
        "images": images,
        "addLinkToRenomaLab": addLinkToRenomaLab
      }
    }
  },

  "faqSectionHome": *[_type == "faqSectionHome"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionCTA": coalesce(sectionCTA[_key == $locale][0].value, "Brak tłumaczenia"),
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
  "servicesPageSeo": *[_type == "servicesPageSeo"][0]{
    "pageTitle": coalesce(pageTitle[_key == $locale][0].value, "Default SEO Title"),
    "metaDescription": coalesce(metaDescription[_key == $locale][0].value, "Default SEO Description"),
    "ogTitle": coalesce(ogTitle[_key == $locale][0].value, "Default OG Title"),
    "ogDescription": coalesce(ogDescription[_key == $locale][0].value, "Default OG Description"),
    "ogImage": ogImage
  }
}
`;

const OPTIONS = { next: { revalidate: 86400 } };
// 86400

type Props = {
  params: { locale: string };
};

interface Content {
  servicesHeader: {
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
  servicesGroup: {
    serviceGroupOne: {
      title: string;
      services: {
        title: string;
        description: string;
        actions: {
          title: string;
          content: string;
        }[];
        images?: {
          asset: string;
          caption?: string;
        }[];
        addLinkToRenomaLab?: boolean;
      }[];
    };
    serviceGroupTwo: {
      title: string;
      services: {
        title: string;
        description: string;
        actions: {
          title: string;
          content: string;
        }[];
        images?: {
          asset: string;
          caption?: string;
        }[];
        addLinkToRenomaLab?: boolean;
      }[];
    };
    serviceGroupThree: {
      title: string;
      services: {
        title: string;
        description: string;
        actions: {
          title: string;
          content: string;
        }[];
        images?: {
          asset: string;
          caption?: string;
        }[];
        addLinkToRenomaLab?: boolean;
      }[];
    };
  };
  faqSectionHome: {
    label: string;
    title: string;
    description: string;
    sectionCTA: string;
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
  servicesPageSeo: {
    pageTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    ogImage?: {
      asset: {
        url: string;
      };
    };
  };
}

// Metadata from translations and generateMetadata function
export async function generateMetadata({ params: { locale } }: Props) {
  const { servicesPageSeo } = await client.fetch(QUERY, { locale }, OPTIONS);

  return {
    title: servicesPageSeo?.pageTitle,
    description: servicesPageSeo?.metaDescription,
    openGraph: {
      title: servicesPageSeo?.ogTitle,
      description: servicesPageSeo?.ogDescription,
      images: servicesPageSeo?.ogImage
        ? [{ url: servicesPageSeo.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: servicesPageSeo?.ogTitle,
      description: servicesPageSeo?.ogDescription,
    },
  };
}

export default async function ONas({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const {
    servicesHeader,
    servicesGroup,
    //  faqSectionHome,
    ctaContent,
  } = content;

  return (
    <>
      {/* Conditionally render Page Header Section */}
      {servicesHeader && (
        <PageHeader
          label={servicesHeader.label}
          title={servicesHeader.title}
          description={servicesHeader.description}
          image={servicesHeader.image}
          imageAlt={servicesHeader.imageAlt}
          imageLayout={servicesHeader.imageLayout}
          backgroundColor={servicesHeader.backgroundColor}
          aspectRatio={servicesHeader.aspectRatio}
          landscapeMobileForPortraitRight={
            servicesHeader.landscapeMobileForPortraitRight
          }
          paddingY="py-20 md:pb-24 lg:pt-24 lg:pb-36"
          mobileSubMenu={true}
        />
      )}
      {/* Conditionally render Services Group Sections */}
      {servicesGroup && (
        <ServicesList
          serviceGroups={[
            servicesGroup.serviceGroupOne,
            servicesGroup.serviceGroupTwo,
            servicesGroup.serviceGroupThree,
          ]}
          paddingY="py-0 md:pt-5 lg:pb-32"
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
