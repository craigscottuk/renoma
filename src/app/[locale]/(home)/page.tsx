// src/app/[locale]/home/page.tsx;
// cSpell:disable
import Script from "next/script";
import HeroSection from "./hero";
import AboutSection from "./about";
import ServicesSection from "./services";
import CTA from "../../../components/cta";
import { sanityFetch } from "@/sanity/client";
import CooperationSection from "./cooperation";
import { setRequestLocale } from "next-intl/server";

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
  "cooperationSection": *[_type == "cooperationSection"][0]{
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
  "homePageMeta": *[_type == "homePageMeta"][0]{
    "pageTitle": coalesce(pageTitle[_key == $locale][0].value, "Default SEO Title"),
    "metaDescription": coalesce(metaDescription[_key == $locale][0].value, "Default SEO Description"),
    "ogTitle": coalesce(ogTitle[_key == $locale][0].value, "Default OG Title"),
    "ogDescription": coalesce(ogDescription[_key == $locale][0].value, "Default OG Description"),
    "ogImage": ogImage
  }
}
`;

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
  cooperationSection: {
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
  homePageMeta: {
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
  const { homePageMeta } = await sanityFetch<{
    homePageMeta: {
      pageTitle: string;
      metaDescription: string;
      ogTitle: string;
      ogDescription: string;
      ogImage: { asset: { url: string } };
    };
  }>({
    query: QUERY,
    params: { locale },
    tags: ["home"],
    revalidate: 604800, // 604800
  });

  return {
    title: homePageMeta?.pageTitle,
    description: homePageMeta?.metaDescription,
    openGraph: {
      title: homePageMeta?.ogTitle,
      description: homePageMeta?.ogDescription,
      images: homePageMeta?.ogImage
        ? [{ url: homePageMeta.ogImage.asset?.url }]
        : undefined,
    },
    twitter: {
      title: homePageMeta?.ogTitle,
      description: homePageMeta?.ogDescription,
    },
  };
}

export default async function HomePage({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await sanityFetch<Content>({
    query: QUERY,
    params: { locale },
    tags: ["home"],
    revalidate: 604800, // 604800
  });

  const {
    heroSection,
    aboutSection,
    servicesSection,
    servicesGroup,
    cooperationSection,
    ctaContent,
    homePageMeta,
  } = content;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: homePageMeta?.pageTitle, // Use fetched SEO data
    legalName: "Pracownie Konserwacji Zabytków RENOMA",
    url: "https://www.pkzrenoma.com",
    logo: "https://www.pkzrenoma.com/renoma-logo.svg",
    description: homePageMeta?.metaDescription, // Use fetched SEO data
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
      {aboutSection && (
        <AboutSection
          label={aboutSection.label}
          title={aboutSection.title}
          description={aboutSection.description}
          sectionCTA={aboutSection.sectionCTA}
          paddingY="py-28 lg:py-48"
        />
      )}

      {/* Services Section */}
      {servicesSection && (
        <ServicesSection
          label={servicesSection.label}
          title={servicesSection.title}
          description={servicesSection.description}
          sectionCTA={servicesSection.sectionCTA}
          paddingY="py-28 lg:py-48"
          servicesGroup={servicesGroup}
        />
      )}

      {/* Cooperation Section */}
      {cooperationSection && (
        <CooperationSection
          label={cooperationSection.label}
          title={cooperationSection.title}
          logos={cooperationSection.logos}
          skzLogo={cooperationSection.skzLogo}
          skzDescription={cooperationSection.skzDescription}
          link={cooperationSection.link}
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
