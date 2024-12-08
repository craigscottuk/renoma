// cSpell:disable
import SectionContactFormDetails from "@/components/sections-contact/section-contact-form-details";
import { setRequestLocale } from "next-intl/server";
import PageHeaderSection from "@/components/page-header-section";
import { client } from "@/sanity/client";

const QUERY = `
{
  "kontaktHeaderSection": *[_type == "kontaktHeaderSection"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image, 
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia")
  },
  "contactFormSection": *[_type == "contactFormSection"][0]{
    "contactFormSubjects": contactFormSubjects[].label[_key == $locale][0].value
  },
  "contactDetailsSection": *[_type == "contactDetailsSection"][0]{
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

const OPTIONS = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  kontaktHeaderSection: {
    label: string;
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
  };
  contactFormSection: {
    contactFormSubjects: string[];
  };
  contactDetailsSection: {
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

  const { kontaktHeaderSection, contactDetailsSection, contactFormSection } =
    content;

  return (
    <>
      {/* Page Header Section */}
      <PageHeaderSection
        label={kontaktHeaderSection.label}
        title={kontaktHeaderSection.title}
        description={kontaktHeaderSection.description}
        image={kontaktHeaderSection.image}
        imageAlt={kontaktHeaderSection.imageAlt}
      />

      {/* Black/White Contact Form Section */}
      <SectionContactFormDetails
        contactFormSection={contactFormSection}
        contactDetailsSection={contactDetailsSection}
      />
    </>
  );
}
