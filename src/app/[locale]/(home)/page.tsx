// src/app/[locale]/home/page.tsx;
// cSpell:disable
import HeroSection from "./hero";
import SectionAbout from "./about";
import SectionUslugiHome from "./uslugi";
import { client } from "@/sanity/client";
import { setRequestLocale } from "next-intl/server";
import LogoShowcase from "./cooperation";
import CTA from "../../../components/cta";
import Script from "next/script";

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

  "logoSectionHome": *[_type == "logoSectionHome"][0]{
    "label": coalesce(label[_key == $locale][0].value, ""),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "skzDescription": coalesce(skzDescription[_key == $locale][0].value, ""),
    "skzLogo": skzLogo.asset->url,
    "link": link,
    logos[]{
      company,
      "src": src.asset->url,
      link
    }
  },

  "ctaContent": *[_type == "ctaContent"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "buttonText": coalesce(buttonLabel[_key == $locale][0].value, "Brak tłumaczenia")
  },

  "homePageSeo": *[_type == "homePageSeo"][0]{
    "pageTitle": coalesce(pageTitle[_key == $locale][0].value, "Default SEO Title"),
    "metaDescription": coalesce(metaDescription[_key == $locale][0].value, "Default SEO Description"),
    "ogTitle": coalesce(ogTitle[_key == $locale][0].value, "Default OG Title"),
    "ogDescription": coalesce(ogDescription[_key == $locale][0].value, "Default OG Description"),
    "ogImage": ogImage
  }
}
`;

const OPTIONS = { next: { revalidate: 604800 } };
// 86400

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
      }[];
    };
    serviceGroupTwo: {
      title: string;
      services: {
        title: string;
        shortDescription: string;
      }[];
    };
    serviceGroupThree: {
      title: string;
      services: {
        title: string;
        shortDescription: string;
      }[];
    };
  };
  logoSectionHome: {
    label: string;
    title: string;
    skzDescription: string;
    skzLogo: string;
    link: string;
    logos: {
      company: string;
      src: string;
      link: string;
    }[];
  };
  ctaContent: {
    title: string;
    description: string;
    buttonText: string;
  };
  homePageSeo: {
    pageTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: {
      asset: {
        url: string;
      };
    };
  };
}

// Metadata from translations and generateMetadata function
export async function generateMetadata({ params: { locale } }: Props) {
  const { homePageSeo } = await client.fetch(QUERY, { locale }, OPTIONS);

  return {
    title: homePageSeo?.pageTitle,
    description: homePageSeo?.metaDescription,
    openGraph: {
      title: homePageSeo?.ogTitle,
      description: homePageSeo?.ogDescription,
      images: homePageSeo?.ogImage
        ? [{ url: homePageSeo.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: homePageSeo?.ogTitle,
      description: homePageSeo?.ogDescription,
    },
  };
}

export default async function HomePage({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const {
    heroSection,
    aboutSectionHome,
    servicesSectionHome,
    servicesGroup,
    logoSectionHome,
    ctaContent,
    homePageSeo,
  } = content;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: homePageSeo?.pageTitle, // Use fetched SEO data
    legalName: "Pracownie Konserwacji Zabytków RENOMA",
    url: "https://www.pkzrenoma.com",
    logo: "https://www.pkzrenoma.com/renoma-logo.svg",
    description: homePageSeo?.metaDescription, // Use fetched SEO data
    foundingDate: "2012-08-01",
    founder: [
      {
        "@type": "Person",
        name: " Igor Góźdź",
        jobTitle:
          locale === "pl"
            ? "Współzałożyciel"
            : locale === "de"
              ? "Mitgründer"
              : "Co-Founder",
      },
      {
        "@type": "Person",
        name: "Hanna Rubnikowicz-Góźdź",
        jobTitle:
          locale === "pl"
            ? "Współzałożycielka"
            : locale === "de"
              ? "Mitgründerin"
              : "Co-Founder",
        sameAs: ["https://www.linkedin.com/in/hanna-rubnikowicz-a5556083/"],
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+48 514 360 051",
        contactType: "customer service",
        email: "biuro@pkzrenoma.com",
        areaServed: ["PL"],
        availableLanguage: ["Polish", "English", "German"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/people/Renoma/61567069006693/",
      "https://www.instagram.com/pkzrenoma/",
      "https://www.linkedin.com/company/pracownie-konserwacji-zabytkow-renoma/",
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

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
          paddingY="py-28 lg:py-48"
        />
      )}

      {/* Services Section */}
      {servicesSectionHome && (
        <SectionUslugiHome
          label={servicesSectionHome.label}
          title={servicesSectionHome.title}
          description={servicesSectionHome.description}
          sectionCTA={servicesSectionHome.sectionCTA}
          paddingY="py-28 lg:py-48"
          servicesGroup={servicesGroup}
        />
      )}

      {/* Partnership */}
      {logoSectionHome && (
        <LogoShowcase
          label={logoSectionHome.label}
          title={logoSectionHome.title}
          logos={logoSectionHome.logos}
          skzLogo={logoSectionHome.skzLogo}
          skzDescription={logoSectionHome.skzDescription}
          link={logoSectionHome.link}
          paddingY="py-28 lg:py-48"
        />
      )}

      {/* CTA */}
      {ctaContent && (
        <CTA
          title={ctaContent.title}
          description={ctaContent.description}
          buttonText={ctaContent.buttonText}
        />
      )}
    </>
  );
}
