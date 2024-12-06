// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeaderSection from "@/components/page-header-section";
import { client } from "@/sanity/client";
import ServicesListed from "@/components/sections-services/services-listed";

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
      "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
      "actions": actions[]{
        "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
        "content": coalesce(content[_key == $locale][0].value, "Brak tłumaczenia")
      },
      "images": images
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
  servicesListSection: {
    services: {
      title: string;
      description: string;
      actions: {
        title: string;
        content: string;
      }[];
      images?: {
        asset: string;
        caption?: string;
      }[];
    }[];
  };
}

export default async function ONas({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { servicesHeaderSection, servicesListSection } = content;
  // Log the fetched content to check if image data is being fetched
  console.log("Fetched content:", servicesListSection);
  // Log the images inside the servicesListSection
  servicesListSection.services.forEach((service) => {
    console.log("Service images:", service.images);
  });

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
      {/* Services Listed Section */}
      <ServicesListed services={servicesListSection.services} />
    </>
  );
}
