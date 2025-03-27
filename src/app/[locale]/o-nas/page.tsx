// cSpell:disable
// src/app/[locale]/o-nas/page.tsx
import { AboutUs } from "./about-us";
import { sanityFetch } from "@/sanity/client";
import { PortableTextBlock } from "next-sanity";
import PageHeader from "@/components/page-header";
import { setRequestLocale } from "next-intl/server";
import CTA from "@/components/cta";

const QUERY = `
{
 "aboutHeader": *[_type == "aboutHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image,
"imageAlt": coalesce(imageAlt[_key == $locale][0].value, "Header image"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor,
    "aspectRatio": aspectRatio,
    "landscapeMobileForPortraitRight": landscapeMobileForPortraitRight
  },
  "aboutUs": *[_type == "aboutUs"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
     "text": coalesce(text[$locale], []),
  },
  "ourHistory": *[_type == "ourHistory"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
     "text": coalesce(text[_key == $locale][0].value, "Brak tłumaczenia"),
    "timeline": timeline[]{
      "year": year,
      "content": coalesce(content[$locale], []),
      "images": images[]{
        "src": src.asset->url,
        "caption": coalesce(caption[_key == $locale][0].value, ""),
        "aspectRatio": aspectRatio // Ensure aspectRatio is queried
      }
    }
  },
  "ctaContent": *[_type == "ctaContent"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "buttonText": coalesce(buttonLabel[_key == $locale][0].value, "Brak tłumaczenia")
  },
  "aboutPageMeta": *[_type == "aboutPageMeta"][0]{
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
  aboutHeader: {
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
  aboutUs: {
    title: string;
    text: PortableTextBlock[];
  };
  ourHistory: {
    title: string;
    text: string;
    timeline: TimelineItem[];
  };
  ctaContent: {
    title: string;
    description: string;
    buttonText: string;
  };
  aboutPageMeta: {
    pageTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    ogImage?: {
      asset?: {
        url: string;
      };
    };
  };
}

interface TimelineItem {
  title: string;
  year: string;
  content: PortableTextBlock[];
  images?: TimelineImage[];
}

interface TimelineImage {
  src: string;
  caption: string;
  aspectRatio?: "wide" | "standard";
}

// Metadata from translations and generateMetadata function
export async function generateMetadata({ params: { locale } }: Props) {
  const content = await sanityFetch<Content>({
    query: QUERY,
    params: { locale },
    tags: ["about"],
    revalidate: 604800, // 604800
  });
  const { aboutPageMeta } = content;

  return {
    title: aboutPageMeta?.pageTitle,
    description: aboutPageMeta?.metaDescription,
    openGraph: {
      title: aboutPageMeta?.ogTitle,
      description: aboutPageMeta?.ogDescription,
      images: aboutPageMeta?.ogImage
        ? [{ url: aboutPageMeta.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: aboutPageMeta?.ogTitle,
      description: aboutPageMeta?.ogDescription,
    },
  };
}

export default async function About({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await sanityFetch<Content>({
    query: QUERY,
    params: { locale },
    tags: ["about"],
    revalidate: 604800, // 604800
  });

  const {
    aboutHeader,
    aboutUs,
    // ourHistory,
    ctaContent,
  } = content;

  return (
    <>
      {/* Page Header */}
      {aboutHeader && (
        <PageHeader
          label={aboutHeader.label}
          title={aboutHeader.title}
          description={aboutHeader.description}
          image={aboutHeader.image}
          imageAlt={aboutHeader.imageAlt}
          imageLayout={aboutHeader.imageLayout}
          backgroundColor={aboutHeader.backgroundColor}
          aspectRatio={aboutHeader.aspectRatio}
          landscapeMobileForPortraitRight={
            aboutHeader.landscapeMobileForPortraitRight
          }
          paddingY="py-20 md:pb-24 lg:pt-24 lg:pb-36"
        />
      )}

      {/* About Us */}
      {aboutUs && (
        <AboutUs
          title={aboutUs.title}
          text={aboutUs.text}
          paddingY="py-20 lg:py-36"
        />
      )}

      {/* Our History and Timeline */}
      {/* {ourHistory && (
        <OurHistory
          title={ourHistory.title}
          text={ourHistory.text}
          events={ourHistory.timeline}
          paddingY="pt-20 md:pt-48"
        />
      )} */}

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
