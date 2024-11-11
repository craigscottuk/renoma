// cSpell:disable

import { Mail, MapPin, Phone, FileText } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import PageHeaderSection from "@/components/page-header-section";
import ContactForm from "@/components/sections-contact/contact-form";
import { client } from "@/sanity/client";
import Link from "next/link";
import clsx from "clsx";
import MaxWidthWrapper from "@/components/max-width-wrapper";

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

  // Define contact form color scheme
  // as either 'light' or 'dark'
  const color = "dark";

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

      <section
        className={clsx(
          "py-12 text-[1.1rem] leading-relaxed lg:pb-24 lg:pt-24",
          {
            "bg-black text-white/90": color === "dark",
            "bg-white text-black/90": color !== "dark",
          },
        )}
      >
        <MaxWidthWrapper>
          <div className="grid gap-36 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="max-w-xl">
              <ContactForm
                color={color}
                contactFormSubjects={contactFormSection.contactFormSubjects.map(
                  (subject) => ({ label: subject }),
                )}
              />
            </div>

            {/* Contact Information in 2x2 Grid */}
            <div className="grid w-[520px] grid-cols-2 gap-8 xl:place-self-end">
              {/* Phone Section */}
              <div className="flex max-w-60 items-start gap-4">
                <Phone className="h-6 w-6" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">Telefon</h3>
                  <p>{contactDetailsSection.numerTelefonu}</p>
                </div>
              </div>

              {/* Email Section */}
              <div className="flex max-w-60 items-start gap-4">
                <Mail className="h-6 w-6" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p>{contactDetailsSection.adresEmail}</p>
                </div>
              </div>

              {/* Address Section */}
              <div className="flex max-w-60 items-start gap-4">
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
              <div className="flex max-w-60 items-start gap-4">
                <FileText className="max-h-10 max-w-10" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">Dane do faktur</h3>
                  <p>{contactDetailsSection.nazwaFirmy}</p>
                  <p>{contactDetailsSection.adresFakturLineOne}</p>
                  <p>{contactDetailsSection.adresFakturLineTwo}</p>
                  <p>{contactDetailsSection.numerNip}</p>
                  <p>{contactDetailsSection.numerRegon}</p>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
