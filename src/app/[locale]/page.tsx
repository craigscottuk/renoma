// cSpell:disable

import { setRequestLocale } from "next-intl/server";
import { client } from "@/sanity/client";
import HeroSection from "@/components/sections-home/section-hero";
import SectionAbout from "@/components/sections-home/section-about";
import SectionUslugiHome from "@/components/sections-home/section-uslugi-home";

const QUERY = `
{
  "heroSection": *[_type == "heroSection"][0]{
    "sectionTitle": coalesce(sectionTitle[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionCTA": coalesce(sectionCTA[_key == $locale][0].value, "Brak tłumaczenia")
  },

  "aboutSection": *[_type == "aboutSection"][0]{
    "sectionLabel": coalesce(sectionLabel[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionTitle": coalesce(sectionTitle[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionDescription": coalesce(sectionDescription[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionCTA": coalesce(sectionCTA[_key == $locale][0].value, "Brak tłumaczenia")
  },

  "servicesSection": *[_type == "servicesSection"][0]{
    "sectionLabel": coalesce(sectionLabel[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionTitle": coalesce(sectionTitle[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionDescription": coalesce(sectionDescription[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionCTA": coalesce(sectionCTA[_key == $locale][0].value, "Brak tłumaczenia")
  }
}
`;

const options = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  heroSection: {
    sectionTitle: string;
    sectionCTA: string;
  };
  aboutSection: {
    sectionLabel: string;
    sectionTitle: string;
    sectionDescription: string;
    sectionCTA: string;
  };
  servicesSection: {
    sectionLabel: string;
    sectionTitle: string;
    sectionDescription: string;
    sectionCTA: string;
  };
}

export default async function HomePage({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, options);

  return (
    <>
      {/* About Section */}
      {content.heroSection && (
        <HeroSection
          sectionTitle={content.heroSection.sectionTitle}
          sectionCTA={content.heroSection.sectionCTA}
        />
      )}

      {/* About Section */}
      {content.aboutSection && (
        <SectionAbout
          sectionLabel={content.aboutSection.sectionLabel}
          sectionTitle={content.aboutSection.sectionTitle}
          sectionDescription={content.aboutSection.sectionDescription}
          sectionCTA={content.aboutSection.sectionCTA}
          paddingY="py-20 md:py-48"
        />
      )}

      {/* Services Section */}
      {content.servicesSection && (
        <SectionUslugiHome
          sectionLabel={content.servicesSection.sectionLabel}
          sectionTitle={content.servicesSection.sectionTitle}
          sectionDescription={content.servicesSection.sectionDescription}
          sectionCTA={content.servicesSection.sectionCTA}
        />
      )}
    </>
  );
}
