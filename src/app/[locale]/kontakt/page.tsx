// cSpell:disable
import { client } from "@/sanity/client";
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import ContactFormAndDetails from "./contact-form-and-details";

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
    "nazwaFirmy": coalesce(nazwaFirmy, "Brak tłumaczenia"),
    "adresFakturLineOne": coalesce(adresFakturLineOne[_key == $locale][0].value, "Brak tłumaczenia"),
    "adresFakturLineTwo": coalesce(adresFakturLineTwo, "Brak tłumaczenia"),
    
    "numerNip": coalesce(numerNip[_key == $locale][0].value, "Brak tłumaczenia"),
    "numerRegon": coalesce(numerRegon, "Brak tłumaczenia")
  }
}
`;

const OPTIONS = { next: { revalidate: 86400 } }; // Persistent caching

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
    imageLayout?: "fullWidthAbove" | "fullWidthBelow" | "portraitRight";
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
    nazwaFirmy: string;
    adresFakturLineOne: string;
    adresFakturLineTwo: string;
    numerNip: string;
    numerRegon: string;
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
          paddingY="py-16 md:py-44"
        />
      )}
    </>
  );
}
