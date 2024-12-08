// cSpell:disable

import { setRequestLocale } from "next-intl/server";
import { client } from "@/sanity/client";
import HeroSection from "@/components/sections-home/section-hero";
import SectionAbout from "@/components/sections-home/section-about-home";
import SectionUslugiHome from "@/components/sections-home/section-uslugi-home";
import SectionFaqHome from "@/components/sections-home/section-faq-home";

const QUERY = `
{
  "heroSection": *[_type == "heroSection"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionCTA": coalesce(sectionCTA[_key == $locale][0].value, "Brak tłumaczenia")
  },

  "aboutSection": *[_type == "aboutSection"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionCTA": coalesce(sectionCTA[_key == $locale][0].value, "Brak tłumaczenia")
  },

  "servicesSection": *[_type == "servicesSection"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionCTA": coalesce(sectionCTA[_key == $locale][0].value, "Brak tłumaczenia")
  },

  "faqSectionHome": *[_type == "faqSectionHome"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionCTA": coalesce(sectionCTA[_key == $locale][0].value, "Brak tłumaczenia"),
    "faqItems": faqItems[]{
      "question": coalesce(question[_key == $locale][0].value, "Brak tłumaczenia"),
      "answer": coalesce(answer[_key == $locale][0].value, "Brak tłumaczenia")
    }
  }
}
`;

const options = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  heroSection: {
    title: string;
    sectionCTA: string;
  };
  aboutSection: {
    label: string;
    title: string;
    description: string;
    sectionCTA: string;
  };
  servicesSection: {
    label: string;
    title: string;
    description: string;
    sectionCTA: string;
  };
  faqSectionHome: {
    label: string;
    title: string;
    description: string;
    sectionCTA: string;
    faqItems: {
      question: string;
      answer: string;
    }[];
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
          title={content.heroSection.title}
          sectionCTA={content.heroSection.sectionCTA}
        />
      )}

      {/* About Section */}
      {content.aboutSection && (
        <SectionAbout
          label={content.aboutSection.label}
          title={content.aboutSection.title}
          description={content.aboutSection.description}
          sectionCTA={content.aboutSection.sectionCTA}
          paddingY="py-20 md:py-48"
        />
      )}

      {/* Services Section */}
      {content.servicesSection && (
        <SectionUslugiHome
          label={content.servicesSection.label}
          title={content.servicesSection.title}
          description={content.servicesSection.description}
          sectionCTA={content.servicesSection.sectionCTA}
        />
      )}

      {/* FAQ Section */}
      {content.faqSectionHome && (
        <SectionFaqHome
          label={content.faqSectionHome.label}
          title={content.faqSectionHome.title}
          description={content.faqSectionHome.description}
          sectionCTA={content.faqSectionHome.sectionCTA}
          faqItems={content.faqSectionHome.faqItems}
        />
      )}
    </>
  );
}
