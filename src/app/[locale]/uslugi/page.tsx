// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeaderSection from "@/components/page-header-section";
import { client } from "@/sanity/client";
import SectionServices from "@/components/sections-services/section-services";
import { PortableTextBlock } from "@portabletext/types";

const QUERY = `
{
  "servicesHeaderSection": *[_type == "servicesHeaderSection"][0]{
    "sectionLabel": coalesce(sectionLabel[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionTitle": coalesce(sectionTitle[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionDescription": coalesce(sectionDescription[_key == $locale][0].value, "Brak tłumaczenia"),
    "headerImage": headerImage, // Fetch full image object with asset._ref
    "headerImageAlt": coalesce(headerImage.alt[_key == $locale][0].value, "Brak tłumaczenia")
  },
  "servicesListSection": *[_type == "servicesListSection"][0]{
    "services": services[]{
      "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
      "description": coalesce(description[$locale], "Brak tłumaczenia")
    }
  }
}
`;

const OPTIONS = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  servicesHeaderSection: {
    sectionLabel: string;
    sectionTitle: string;
    sectionDescription: string;
    headerImage?: string;
    headerImageAlt?: string;
  };
  services: {
    title: string;
    description: PortableTextBlock[];
  }[];
  servicesListSection: {
    services: {
      title: string;
      description: PortableTextBlock[];
    }[];
  };
}

export default async function ONas({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { servicesHeaderSection, servicesListSection } = content;

  return (
    <>
      {/* Page Header Section */}
      <PageHeaderSection
        sectionLabel={servicesHeaderSection.sectionLabel}
        sectionTitle={servicesHeaderSection.sectionTitle}
        sectionDescription={servicesHeaderSection.sectionDescription}
        headerImage={servicesHeaderSection.headerImage}
        headerImageAlt={servicesHeaderSection.headerImageAlt}
      />

      {/* Explore Services Section */}
      <SectionServices services={servicesListSection.services} />
    </>
  );
}
