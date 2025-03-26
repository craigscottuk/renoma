// cSpell:disable
// src/app/[locale]/kontakt/page.tsx

import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import ContactFormAndDetails from "./contact-form-and-details";
import { sanityFetch } from "@/sanity/client";

const QUERY = `
{
  "contactHeader": *[_type == "contactHeader"][0]{
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
  "contactForm": *[_type == "contactForm"][0]{
    "contactFormSubjects": contactFormSubjects[].label[_key == $locale][0].value
  },
  "contactDetails": *[_type == "contactDetails"][0]{
    "numerTelefonu": coalesce(numerTelefonu, "Brak tłumaczenia"),
    "adresEmail": coalesce(adresEmail, "Brak tłumaczenia"),
    "adresBiuraLineOne": coalesce(adresBiuraLineOne[_key == $locale][0].value, "Brak tłumaczenia"),
    "adresBiuraLineTwo": coalesce(adresBiuraLineTwo, "Brak tłumaczenia"),
    "adresKorespondencyjnyLineOne": coalesce(adresKorespondencyjnyLineOne[_key == $locale][0].value, "Brak tłumaczenia"),
    "adresKorespondencyjnyLineTwo": coalesce(adresKorespondencyjnyLineTwo, "Brak tłumaczenia"),
    "nazwaFirmyOne": coalesce(nazwaFirmyOne, "Brak tłumaczenia"),
    "nazwaFirmyTwo": coalesce(nazwaFirmyTwo, "Brak tłumaczenia"),
    "adresFakturLineOne": coalesce(adresFakturLineOne[_key == $locale][0].value, "Brak tłumaczenia"),
    "adresFakturLineTwo": coalesce(adresFakturLineTwo, "Brak tłumaczenia"),
    "numerNipOne": coalesce(numerNipOne[_key == $locale][0].value, "Brak tłumaczenia"),
    "numerRegonOne": coalesce(numerRegonOne, "Brak tłumaczenia"),
    "numerNipTwo": coalesce(numerNipTwo[_key == $locale][0].value, "Brak tłumaczenia"),
    "numerRegonTwo": coalesce(numerRegonTwo, "Brak tłumaczenia")
  },
  "contactPageMeta": *[_type == "contactPageMeta"][0]{
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
  contactHeader: {
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
  contactForm: {
    contactFormSubjects: string[];
  };
  contactDetails: {
    numerTelefonu: string;
    adresEmail: string;
    adresBiuraLineOne: string;
    adresBiuraLineTwo: string;
    adresKorespondencyjnyLineOne: string;
    adresKorespondencyjnyLineTwo: string;
    nazwaFirmyOne: string;
    nazwaFirmyTwo: string;
    adresFakturLineOne: string;
    adresFakturLineTwo: string;
    numerNipOne: string;
    numerRegonOne: string;
    numerNipTwo: string;
    numerRegonTwo: string;
  };
  contactPageMeta?: {
    pageTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: {
      asset?: {
        url?: string;
      };
    };
  };
}

// Metadata from translations and generateMetadata function
export async function generateMetadata({ params: { locale } }: Props) {
  const { contactPageMeta } = await sanityFetch<{
    contactPageMeta: Content["contactPageMeta"];
  }>({
    query: QUERY,
    params: { locale },
    tags: ["contact"],
    revalidate: 10, // 604800 // 604800 seconds = 1 week
  });

  return {
    title: contactPageMeta?.pageTitle,
    description: contactPageMeta?.metaDescription,
    openGraph: {
      title: contactPageMeta?.ogTitle,
      description: contactPageMeta?.ogDescription,
      images: contactPageMeta?.ogImage
        ? [{ url: contactPageMeta.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: contactPageMeta?.ogTitle,
      description: contactPageMeta?.ogDescription,
    },
  };
}

export default async function Kontakt({ params: { locale } }: Props) {
  // Tell next-intl the current locale for translations
  setRequestLocale(locale);

  // Use the tag-based revalidation approach with "contact"
  const content = await sanityFetch<Content>({
    query: QUERY,
    params: { locale },
    tags: ["contact"], // On-demand revalidation triggered by revalidateTag("contact")
    revalidate: 10, // 604800 // 604800
  });

  const { contactHeader, contactForm, contactDetails } = content;

  return (
    <>
      {/* Page Header Section */}
      {contactHeader && (
        <PageHeader
          label={contactHeader.label}
          title={contactHeader.title}
          description={contactHeader.description}
          image={contactHeader.image}
          imageAlt={contactHeader.imageAlt}
          imageLayout={contactHeader.imageLayout}
          backgroundColor={contactHeader.backgroundColor}
          aspectRatio={contactHeader.aspectRatio}
          landscapeMobileForPortraitRight={
            contactHeader.landscapeMobileForPortraitRight
          }
          paddingY="py-20 md:pb-24 lg:pt-24 lg:pb-36"
        />
      )}

      {/* Contact Form & Details Section */}
      {contactForm && contactDetails && (
        <ContactFormAndDetails
          contactForm={contactForm}
          contactDetails={contactDetails}
          paddingY="pt-6 pb-12 md:py-16 lg:pt-32 lg:pb-36"
        />
      )}
    </>
  );
}
