// cSpell:disable
import OurHistory from "@/app/[locale]/o-nas/our-history";
import { client } from "@/sanity/client";
import { PortableTextBlock } from "next-sanity";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

const QUERY = `
{
 "aboutHeader": *[_type == "aboutHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image,
"imageAlt": coalesce(imageAlt[_key == $locale][0].value, "Header image"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor
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
}
`;

const OPTIONS = { next: { revalidate: 10 } };
//86400

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
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: "Oś czasu",
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

export default async function OsCzasu({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const {
    //  aboutHeader,
    //  aboutUs,
    ourHistory,
  } = content;

  return (
    <>
      {/* Page Header for About Us */}
      {/* {aboutHeader && (
        <PageHeader
          label={aboutHeader.label}
          title={aboutHeader.title}
          description={aboutHeader.description}
          image={aboutHeader.image}
          imageAlt={aboutHeader.imageAlt}
          imageLayout={aboutHeader.imageLayout}
          backgroundColor={aboutHeader.backgroundColor}
        />
      )} */}

      {/* About Us, Our Values section */}
      {/* {aboutUs && (
        <AboutUs
          title={aboutUs.title}
          text={aboutUs.text}
          paddingY="py-20 md:py-48"
        />
      )} */}

      {/* Interactive Timeline component */}
      {ourHistory && (
        <OurHistory
          title={ourHistory.title}
          text={ourHistory.text}
          events={ourHistory.timeline}
          paddingY="pt-20 md:pt-48"
        />
      )}

      {/* <CTA
        title={ctaContent.title}
        description={ctaContent.description}
        buttonText={ctaContent.buttonText}
      /> */}
    </>
  );
}
