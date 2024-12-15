// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { client } from "@/sanity/client";
import ServicesList from "@/app/[locale]/uslugi/services-list";

const QUERY = `
{
  "servicesHeader": *[_type == "servicesHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image, 
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor
  },
  
  "servicesGroup": *[_type == "servicesGroup"][0]{
    "serviceGroupOne": {
      "title": coalesce(serviceGroupOne.title, "Brak tłumaczenia"),
      "services": serviceGroupOne.services[]{
        "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
        "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
        "actions": actions[]{
          "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
          "content": coalesce(content[_key == $locale][0].value, "Brak tłumaczenia")
        },
        "images": images
      }
    },
    "serviceGroupTwo": {
      "title": coalesce(serviceGroupTwo.title, "Brak tłumaczenia"),
      "services": serviceGroupTwo.services[]{
        "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
        "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
        "actions": actions[]{
          "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
          "content": coalesce(content[_key == $locale][0].value, "Brak tłumaczenia")
        },
        "images": images
      }
    },
    "serviceGroupThree": {
      "title": coalesce(serviceGroupThree.title, "Brak tłumaczenia"),
      "services": serviceGroupThree.services[]{
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
    imageLayout?: "fullWidth" | "portraitRight";
    backgroundColor?: "black" | "white";
  };
  servicesGroup: {
    serviceGroupOne: {
      title: string;
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
    serviceGroupTwo: {
      title: string;
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
    serviceGroupThree: {
      title: string;
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
  };
}

export default async function ONas({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  console.log("Fetched content:", content);

  const { servicesHeader, servicesGroup } = content;

  console.log("Services Header:", servicesHeader);
  console.log("Services Group:", servicesGroup);

  return (
    <>
      {/* Conditionally render Page Header Section */}
      {servicesHeader && (
        <PageHeader
          label={servicesHeader.label}
          title={servicesHeader.title}
          description={servicesHeader.description}
          image={servicesHeader.image}
          imageAlt={servicesHeader.imageAlt}
          imageLayout={servicesHeader.imageLayout}
          backgroundColor={servicesHeader.backgroundColor}
        />
      )}
      {/* Conditionally render Services Group Sections */}
      {servicesGroup && (
        <ServicesList
          serviceGroups={[
            servicesGroup.serviceGroupOne,
            servicesGroup.serviceGroupTwo,
            servicesGroup.serviceGroupThree,
          ]}
          paddingY="pb-20 "
        />
      )}
    </>
  );
}
