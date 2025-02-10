// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { client } from "@/sanity/client";
import ServicesList from "@/app/[locale]/uslugi/services-list";
import { getTranslations } from "next-intl/server";
import CTA from "@/components/cta";
import { ctaContent } from "@/lib/ctaContent";
// import SectionFaqHome from "../faq/faq";

const QUERY = `
{
  "servicesHeader": *[_type == "servicesHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image, 
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor
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
        "images": images
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
        "images": images
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
        "images": images
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
}

// Metadata from translations and generateMetadata function
export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("services.title"),
    description: t("services.description"),
    openGraph: {
      title: t("services.title"),
      description: t("services.description"),
    },
    twitter: {
      title: t("services.title"),
      description: t("services.description"),
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
    //  faqSectionHome
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
        />
      )}

      {/* FAQ Section */}
      {/* {faqSectionHome && (
        <SectionFaqHome
          label={faqSectionHome.label}
          title={faqSectionHome.title}
          description={faqSectionHome.description}
          sectionCTA={faqSectionHome.sectionCTA}
          faqItems={faqSectionHome.faqItems}
          paddingY="py-20 md:py-48"
        />
      )} */}

      <CTA
        title={ctaContent.title}
        description={ctaContent.description}
        buttonText={ctaContent.buttonText}
      />
    </>
  );
}
