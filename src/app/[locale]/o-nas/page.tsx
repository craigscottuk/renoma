// cSpell:disable
// src/app/[locale]/o-nas/page.tsx
import { AboutUs } from "./about-us";
// j
import { client } from "@/sanity/client";
import { PortableTextBlock } from "next-sanity";
import PageHeader from "@/components/page-header";
import { setRequestLocale } from "next-intl/server";
import CTA from "@/components/cta";

const QUERY = `
{
 "aboutUsHeader": *[_type == "aboutUsHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image,
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia"),
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

  "aboutPageSeo": *[_type == "aboutPageSeo"][0]{
    "pageTitle": coalesce(pageTitle[_key == $locale][0].value, "Default SEO Title"),
    "metaDescription": coalesce(metaDescription[_key == $locale][0].value, "Default SEO Description"),
    "ogTitle": coalesce(ogTitle[_key == $locale][0].value, "Default OG Title"),
    "ogDescription": coalesce(ogDescription[_key == $locale][0].value, "Default OG Description"),
    "ogImage": ogImage
  }
}
`;

const OPTIONS = { next: { revalidate: 604800 } };
//86400

type Props = {
  params: { locale: string };
};

interface Content {
  aboutUsHeader: {
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
  aboutPageSeo: {
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

export async function generateMetadata({ params: { locale } }: Props) {
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);
  const { aboutPageSeo } = content;

  return {
    title: aboutPageSeo?.pageTitle,
    description: aboutPageSeo?.metaDescription,
    openGraph: {
      title: aboutPageSeo?.ogTitle,
      description: aboutPageSeo?.ogDescription,
      images: aboutPageSeo?.ogImage
        ? [{ url: aboutPageSeo.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: aboutPageSeo?.ogTitle,
      description: aboutPageSeo?.ogDescription,
    },
  };
}

export default async function About({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const {
    aboutUsHeader,
    aboutUs,
    // ourHistory,
    ctaContent,
  } = content;

  return (
    <>
      {/* Page Header for About Us */}
      {aboutUsHeader && (
        <PageHeader
          label={aboutUsHeader.label}
          title={aboutUsHeader.title}
          description={aboutUsHeader.description}
          image={aboutUsHeader.image}
          imageAlt={aboutUsHeader.imageAlt}
          imageLayout={aboutUsHeader.imageLayout}
          backgroundColor={aboutUsHeader.backgroundColor}
          aspectRatio={aboutUsHeader.aspectRatio}
          landscapeMobileForPortraitRight={
            aboutUsHeader.landscapeMobileForPortraitRight
          }
          paddingY="py-20 md:pb-24 lg:pt-24 lg:pb-36"
        />
      )}

      {/* About Us, Our Values section */}
      {aboutUs && (
        <AboutUs
          title={aboutUs.title}
          text={aboutUs.text}
          paddingY="py-20 lg:py-36"
        />
      )}

      {/* Interactive Timeline component */}
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
