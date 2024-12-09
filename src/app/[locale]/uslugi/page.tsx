// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header-section";
import { client } from "@/sanity/client";
import ServicesList from "@/components/sections-services/services-list";

const QUERY = `
{
  "servicesHeader": *[_type == "servicesHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image, 
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia")
  },
  
  "servicesList": *[_type == "servicesList"][0]{
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
  servicesHeader: {
    label: string;
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
  };
  servicesList: {
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

  const { servicesHeader, servicesList } = content;

  return (
    <>
      {/* Page Header Section */}
      <PageHeader
        label={servicesHeader.label}
        title={servicesHeader.title}
        description={servicesHeader.description}
        image={servicesHeader.image}
        imageAlt={servicesHeader.imageAlt}
      />
      {/* Services Listed Section */}
      <ServicesList services={servicesList.services} />
    </>
  );
}
