// cSpell:disable

import { Mail, MapPin, Phone, FileText } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import PageHeaderSection from "@/components/page-header-section";
import ContactForm from "@/components/sections-contact/contact-form";
import { client } from "@/sanity/client";
import Link from "next/link";
import clsx from "clsx";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useTranslations } from "next-intl";
import SectionContactFormDetails from "@/components/sections-contact/section-contact-form-details";

const QUERY = `
{
  "kontaktHeaderSection": *[_type == "kontaktHeaderSection"][0]{
    "sectionLabel": coalesce(sectionLabel[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionTitle": coalesce(sectionTitle[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionDescription": coalesce(sectionDescription[_key == $locale][0].value, "Brak tłumaczenia"),
    "headerImage": headerImage, // Fetch full image object with asset._ref
    "headerImageAlt": coalesce(headerImage.alt[_key == $locale][0].value, "Brak tłumaczenia")
  },
  "contactFormSection": *[_type == "contactFormSection"][0]{
    "contactFormSubjects": contactFormSubjects[].label[_key == $locale][0].value
  },
  "contactDetailsSection": *[_type == "contactDetailsSection"][0]{
    "numerTelefonu": coalesce(numerTelefonu, "Brak tłumaczenia"),
    "adresEmail": coalesce(adresEmail, "Brak tłumaczenia"),
    "adresBiuraLineOne": coalesce(adresBiuraLineOne[_key == $locale][0].value, "Brak tłumaczenia"),
    "adresBiuraLineTwo": coalesce(adresBiuraLineTwo[_key == $locale][0].value, "Brak tłumaczenia"),
    "nazwaFirmy": coalesce(nazwaFirmy, "Brak tłumaczenia"),
    "adresFakturLineOne": coalesce(adresFakturLineOne[_key == $locale][0].value, "Brak tłumaczenia"),
    "adresFakturLineTwo": coalesce(adresFakturLineTwo[_key == $locale][0].value, "Brak tłumaczenia"),
    "numerNip": coalesce(numerNip[_key == $locale][0].value, "Brak tłumaczenia"),
    "numerRegon": coalesce(numerRegon[_key == $locale][0].value, "Brak tłumaczenia")
  }
}
`;

const OPTIONS = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  powitanie: string;
  wiadomosc: string;
  kontaktHeaderSection: {
    sectionLabel: string;
    sectionTitle: string;
    sectionDescription: string;
    headerImage?: string;
    headerImageAlt?: string;
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
        sectionLabel={kontaktHeaderSection.sectionLabel}
        sectionTitle={kontaktHeaderSection.sectionTitle}
        sectionDescription={kontaktHeaderSection.sectionDescription}
        headerImage={kontaktHeaderSection.headerImage}
        headerImageAlt={kontaktHeaderSection.headerImageAlt}
      />

      {/* Black/White Contact Form Section */}
      <SectionContactFormDetails
        contactFormSection={contactFormSection}
        contactDetailsSection={contactDetailsSection}
      />
    </>
  );
}
