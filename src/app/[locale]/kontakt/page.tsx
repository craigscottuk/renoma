// cSpell:disable
import { client } from "@/sanity/client";
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import ContactFormAndDetails from "./contact-form-and-details";
import { getTranslations } from "next-intl/server";

const QUERY = `
{
  "contactHeader": *[_type == "contactHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image, 
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor
  },
  "contactForm": *[_type == "contactForm"][0]{
    "contactFormSubjects": contactFormSubjects[].label[_key == $locale][0].value
  },
  "contactDetails": *[_type == "contactDetails"][0]{
    "numerTelefonu": coalesce(numerTelefonu, "Brak tłumaczenia"),
    "adresEmail": coalesce(adresEmail, "Brak tłumaczenia"),
    "adresBiuraLineOne": coalesce(adresBiuraLineOne[_key == $locale][0].value, "Brak tłumaczenia"),
    "adresBiuraLineTwo": coalesce(adresBiuraLineTwo, "Brak tłumaczenia"),
    "nazwaFirmyOne": coalesce(nazwaFirmyOne, "Brak tłumaczenia"),
    "nazwaFirmyTwo": coalesce(nazwaFirmyTwo, "Brak tłumaczenia"),
    "adresFakturLineOne": coalesce(adresFakturLineOne[_key == $locale][0].value, "Brak tłumaczenia"),
    "adresFakturLineTwo": coalesce(adresFakturLineTwo, "Brak tłumaczenia"),
    
    "numerNipOne": coalesce(numerNipOne[_key == $locale][0].value, "Brak tłumaczenia"),
    "numerRegonOne": coalesce(numerRegonOne, "Brak tłumaczenia"),
    "numerNipTwo": coalesce(numerNipTwo[_key == $locale][0].value, "Brak tłumaczenia"),
    "numerRegonTwo": coalesce(numerRegonTwo, "Brak tłumaczenia")
  },
  "contactPageSeo": *[_type == "contactPageSeo"][0]{
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
  };
  contactForm: {
    contactFormSubjects: string[];
  };
  contactDetails: {
    numerTelefonu: string;
    adresEmail: string;
    adresBiuraLineOne: string;
    adresBiuraLineTwo: string;
    nazwaFirmyOne: string;
    nazwaFirmyTwo: string;
    adresFakturLineOne: string;
    adresFakturLineTwo: string;
    numerNipOne: string;
    numerRegonOne: string;
    numerNipTwo: string;
    numerRegonTwo: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const { contactPageSeo } = await client.fetch(QUERY, { locale }, OPTIONS);

  return {
    title: contactPageSeo?.pageTitle,
    description: contactPageSeo?.metaDescription,
    openGraph: {
      title: contactPageSeo?.ogTitle,
      description: contactPageSeo?.ogDescription,
      images: contactPageSeo?.ogImage
        ? [{ url: contactPageSeo.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: contactPageSeo?.ogTitle,
      description: contactPageSeo?.ogDescription,
    },
  };
}

export default async function Kontakt({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { contactHeader, contactDetails, contactForm } = content;

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
        />
      )}

      {/* Black/White Contact Form Section */}
      {contactForm && contactDetails && (
        <ContactFormAndDetails
          contactForm={contactForm}
          contactDetails={contactDetails}
          paddingY="py-16 md:py-28"
        />
      )}
    </>
  );
}
