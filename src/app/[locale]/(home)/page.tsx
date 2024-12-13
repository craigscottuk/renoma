// cSpell:disable
import HeroSection from "./hero";
import SectionFaqHome from "./faq";
import SectionAbout from "./about";
import SectionUslugiHome from "./uslugi";
import { client } from "@/sanity/client";
import { setRequestLocale } from "next-intl/server";
import LogoShowcase from "./logos";
import CTA from "../../../components/cta";

const QUERY = `
{
  "heroSection": *[_type == "heroSection"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionCTA": coalesce(sectionCTA[_key == $locale][0].value, "Brak tłumaczenia")
  },

  "aboutSectionHome": *[_type == "aboutSectionHome"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionCTA": coalesce(sectionCTA[_key == $locale][0].value, "Brak tłumaczenia")
  },

  "servicesSectionHome": *[_type == "servicesSectionHome"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionCTA": coalesce(sectionCTA[_key == $locale][0].value, "Brak tłumaczenia")
  },

  "servicesGroup": *[_type == "servicesGroup"][0]{
    "serviceGroupOne": {
      "title": coalesce(serviceGroupOne.title, "Brak tłumaczenia"),
      "services": serviceGroupOne.services[]{
        "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
        "shortDescription": coalesce(shortDescription[_key == $locale][0].value, "Brak tłumaczenia"),
        "images": images
      }
    },
    "serviceGroupTwo": {
      "title": coalesce(serviceGroupTwo.title, "Brak tłumaczenia"),
      "services": serviceGroupTwo.services[]{
        "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
        "shortDescription": coalesce(shortDescription[_key == $locale][0].value, "Brak tłumaczenia"),
        "images": images
      }
    },
    "serviceGroupThree": {
      "title": coalesce(serviceGroupThree.title, "Brak tłumaczenia"),
      "services": serviceGroupThree.services[]{
        "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
        "shortDescription": coalesce(shortDescription[_key == $locale][0].value, "Brak tłumaczenia"),
        "images": images
      }
    }
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
  },
  "logoSectionHome": *[_type == "logoSectionHome"][0]{
  "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
  "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    logos[]{
      company,
      "src": src.asset->url,
      link
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
  aboutSectionHome: {
    label: string;
    title: string;
    description: string;
    sectionCTA: string;
  };
  servicesSectionHome: {
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
  servicesGroup: {
    serviceGroupOne: {
      title: string;
      services: {
        title: string;
        shortDescription: string;
        images: any[];
      }[];
    };
    serviceGroupTwo: {
      title: string;
      services: {
        title: string;
        shortDescription: string;
        images: any[];
      }[];
    };
    serviceGroupThree: {
      title: string;
      services: {
        title: string;
        shortDescription: string;
        images: any[];
      }[];
    };
  };
  logoSectionHome: {
    label: string;
    title: string;
    logos: {
      company: string;
      src: string;
      link: string;
    }[];
  };
}

export default async function HomePage({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, options);

  const {
    heroSection,
    aboutSectionHome,
    servicesSectionHome,
    faqSectionHome,
    servicesGroup,
    logoSectionHome,
  } = content;

  return (
    <>
      {/* Hero Section */}
      {heroSection && (
        <HeroSection
          title={heroSection.title}
          sectionCTA={heroSection.sectionCTA}
        />
      )}

      {/* About Section */}
      {aboutSectionHome && (
        <SectionAbout
          label={aboutSectionHome.label}
          title={aboutSectionHome.title}
          description={aboutSectionHome.description}
          sectionCTA={aboutSectionHome.sectionCTA}
          paddingY="py-20 md:py-48"
        />
      )}

      {/* Services Section */}
      {servicesSectionHome && (
        <SectionUslugiHome
          label={servicesSectionHome.label}
          title={servicesSectionHome.title}
          description={servicesSectionHome.description}
          sectionCTA={servicesSectionHome.sectionCTA}
          paddingY="py-20 md:py-48"
          servicesGroup={servicesGroup}
        />
      )}

      {logoSectionHome && (
        <LogoShowcase
          label={logoSectionHome.label}
          title={logoSectionHome.title}
          logos={logoSectionHome.logos}
          paddingY="py-20 md:py-48"
        />
      )}

      {/* FAQ Section */}
      {faqSectionHome && (
        <SectionFaqHome
          label={faqSectionHome.label}
          title={faqSectionHome.title}
          description={faqSectionHome.description}
          sectionCTA={faqSectionHome.sectionCTA}
          faqItems={faqSectionHome.faqItems}
          paddingY="py-20 md:py-48"
        />
      )}

      <CTA />
    </>
  );
}
