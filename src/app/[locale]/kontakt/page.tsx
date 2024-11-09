// cSpell:disable

import { setRequestLocale } from "next-intl/server";
import { Mail, MapPin, Phone, FileText } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/contact-form";
import Image from "next/image";
import { client } from "@/sanity/client";
import PageHeaderSection from "@/components/page-header-section";

const QUERY = `
{
  "kontaktHeaderSection": *[_type == "kontaktHeaderSection"][0]{
    "sectionLabel": coalesce(sectionLabel[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionTitle": coalesce(sectionTitle[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionDescription": coalesce(sectionDescription[_key == $locale][0].value, "Brak tłumaczenia"),
    "headerImage": headerImage.asset->url
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
    "adresFaktur": coalesce(adresFaktur[_key == $locale][0].value, "Brak tłumaczenia"),
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
    adresFaktur: string;
    numerNip: string;
    numerRegon: string;
  };
}

export default async function Kontakt({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  console.log(content);

  const { kontaktHeaderSection, contactDetailsSection, contactFormSection } =
    content;

  // Define contact form color scheme as either 'light' or 'dark'
  const color = "dark";

  return (
    <>
      {/* White Page Header Section */}
      <PageHeaderSection
        sectionLabel={kontaktHeaderSection.sectionLabel}
        sectionTitle={kontaktHeaderSection.sectionTitle}
        sectionDescription={kontaktHeaderSection.sectionDescription}
        headerImage={kontaktHeaderSection.headerImage}
      />

      {/* Black/White Contact Form Section */}
      <section
        className={`min-h-screen p-6 md:p-8 lg:p-12 ${
          color === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="mx-auto grid max-w-7xl gap-36 lg:grid-cols-2">
          <div className="space-y-8">
            <ContactForm
              color={color}
              contactFormSubjects={contactFormSection.contactFormSubjects.map(
                (subject) => ({ label: subject }),
              )}
            />
          </div>

          {/* Contact Information in 2x2 Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-1 lg:gap-12 xl:grid-cols-2 xl:gap-x-1 xl:gap-y-10 xl:place-self-end">
            {/* Phone Section */}
            <div className="flex max-w-48 items-start gap-4">
              <Phone className="h-6 w-6" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Telefon</h3>
                <p>{contactDetailsSection.numerTelefonu}</p>
              </div>
            </div>

            {/* Email Section */}
            <div className="flex max-w-48 items-start gap-4">
              <Mail className="h-6 w-6" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>{contactDetailsSection.adresEmail}</p>
              </div>
            </div>

            {/* Address Section */}
            <div className="flex max-w-48 items-start gap-4">
              <MapPin className="h-7 w-7" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Biuro</h3>
                <p>{contactDetailsSection.adresBiuraLineOne}</p>
                <p>{contactDetailsSection.adresBiuraLineTwo}</p>
                <Link href="#" className="text-sm underline">
                  Zobacz na mapie
                </Link>
              </div>
            </div>

            {/* Invoice Information Section */}
            <div className="flex max-w-48 items-start gap-4">
              <FileText className="h-10 w-10" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Dane do faktur</h3>
                <p>{contactDetailsSection.nazwaFirmy}</p>
                <p>{contactDetailsSection.adresFaktur}</p>
                <p>{contactDetailsSection.numerNip}</p>
                <p>{contactDetailsSection.numerRegon}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
