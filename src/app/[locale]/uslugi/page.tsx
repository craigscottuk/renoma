// cSpell:disable
// src/app/[locale]/uslugi/page.tsx
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { sanityFetch } from "@/sanity/client";
import ServicesList from "@/app/[locale]/uslugi/services-list";
import CTA from "@/components/cta";

const QUERY = `
{
  "servicesHeader": *[_type == "servicesHeader"][0]{
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
  "ctaContent": *[_type == "ctaContent"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "buttonText": coalesce(buttonLabel[_key == $locale][0].value, "Brak tłumaczenia")
  },
  "servicesPageMeta": *[_type == "servicesPageMeta"][0]{
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
  servicesHeader: {
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
  servicesPageMeta: {
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
  const { servicesPageMeta } = await sanityFetch<{
    servicesPageMeta: {
      pageTitle: string;
      metaDescription: string;
      ogTitle: string;
      ogDescription: string;
      ogImage: { asset: { url: string } };
    };
  }>({
    query: QUERY,
    params: { locale },
    tags: ["services"],
    revalidate: 60, // 604800
  });

  return {
    title: servicesPageMeta?.pageTitle,
    description: servicesPageMeta?.metaDescription,
    openGraph: {
      title: servicesPageMeta?.ogTitle,
      description: servicesPageMeta?.ogDescription,
      images: servicesPageMeta?.ogImage
        ? [{ url: servicesPageMeta.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: servicesPageMeta?.ogTitle,
      description: servicesPageMeta?.ogDescription,
    },
  };
}

export default async function ONas({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await sanityFetch<Content>({
    query: QUERY,
    params: { locale },
    tags: ["services"],
    revalidate: 60, // 604800
  });

  const { servicesHeader, servicesGroup, ctaContent } = content;

  return (
    <>
      {/* Page Header Section */}
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
      {/* Services Group */}
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
