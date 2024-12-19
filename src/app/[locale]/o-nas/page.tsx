// cSpell:disable
import { AboutUs } from "./about-us";
import OurHistory from "./our-history";
import { client } from "@/sanity/client";
import { PortableTextBlock } from "next-sanity";
import PageHeader from "@/components/page-header";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

const QUERY = `
{
 "aboutUsHeader": *[_type == "aboutUsHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image,
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor
  },

  "aboutUs": *[_type == "aboutUs"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
     "text": coalesce(text[$locale], []),
  },

  "ourHistory": *[_type == "ourHistory"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "timeline": timeline[]{
      "year": year,
      "content": coalesce(content[$locale], []),
      "images": images[]{
        "src": src.asset->url,
        "caption": coalesce(caption[_key == $locale][0].value, "Brak tłumaczenia"),
        "aspectRatio": aspectRatio
      }
    }
  }
}
`;

const OPTIONS = { next: { revalidate: 86400 } };
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
    imageLayout?: "fullWidthAbove" | "fullWidthBelow" | "portraitRight";
    backgroundColor?: "black" | "white";
  };
  aboutUs: {
    title: string;
    text: PortableTextBlock[];
  };
  ourHistory: {
    title: string;
    timeline: TimelineItem[];
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
  aspectRatio?: "none" | "landscape" | "portrait" | "square";
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("about.title"),
    description: t("about.description"),
    openGraph: {
      title: t("about.title"),
      description: t("about.description"),
    },
    twitter: {
      title: t("about.title"),
      description: t("about.description"),
    },
  };
}

export default async function About({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { aboutUsHeader, aboutUs, ourHistory } = content;

  // console.log(" content", aboutUsHeader);

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
        />
      )}

      {/* About Us, Our Values section */}
      {aboutUs && (
        <AboutUs
          title={aboutUs.title}
          text={aboutUs.text}
          paddingY="py-20 md:py-48"
        />
      )}

      {/* Interactive Timeline component */}
      {ourHistory && (
        <OurHistory
          title={ourHistory.title}
          events={ourHistory.timeline}
          paddingY="py-20 md:py-48"
        />
      )}
    </>
  );
}
