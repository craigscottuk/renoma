// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header";
import { client } from "@/sanity/client";
import { PortableTextBlock } from "next-sanity";
import SectionJobOffer from "./section-job-offer";
// import { type SanityDocument } from "next-sanity";

const QUERY = `
{
  "workWithUsHeader": *[_type == "workWithUsHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image,
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia"),
    "imageLayout": imageLayout,
    "backgroundColor": backgroundColor
  },
  "jobOffers": *[_type == "jobOffers"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "jobOffer": jobOffer[]{
      "jobTitle": coalesce(jobTitle[_key == $locale][0].value, "Brak tłumaczenia"),
      "jobDescription": coalesce(jobDescription[_key == $locale][0].value, "Brak tłumaczenia"),
      "jobLocation": coalesce(jobLocation[_key == $locale][0].value, "Brak tłumaczenia"),
      "jobType": coalesce(jobType[_key == $locale][0].value, "Brak tłumaczenia"),
    "responsibilities": coalesce(responsibilities[$locale], []),
    "requirements": coalesce(requirements[$locale], []),
    "benefits": coalesce(benefits[$locale], []),
    }
  },
}
`;

// const OPTIONS = { next: { revalidate: false } };
// const OPTIONS = { cache: "force-cache" };
const OPTIONS = { next: { revalidate: 86400 } }; // Persistent caching

type Props = {
  params: { locale: string };
};

interface Content {
  workWithUsHeader: {
    label: string;
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    imageLayout?: "fullWidthAbove" | "fullWidthBelow" | "portraitRight";
    backgroundColor?: "black" | "white";
  };
  jobOffers: {
    title: string;
    jobOffer: {
      jobTitle: string;
      jobDescription: string;
      jobLocation: string;
      jobType: string;
      responsibilities: PortableTextBlock[];
      requirements: PortableTextBlock[];
      benefits: PortableTextBlock[];
    }[];
  };
}

export default async function PracujZNami({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { workWithUsHeader, jobOffers } = content;

  return (
    <>
      {/* Header Section */}
      {workWithUsHeader && (
        <PageHeader
          label={workWithUsHeader.label}
          title={workWithUsHeader.title}
          description={workWithUsHeader.description}
          image={workWithUsHeader.image}
          imageAlt={workWithUsHeader.imageAlt}
          imageLayout={workWithUsHeader.imageLayout}
          backgroundColor={workWithUsHeader.backgroundColor}
        />
      )}

      {/* Job Offer Section */}
      {jobOffers && (
        <SectionJobOffer
          title={jobOffers.title}
          jobOffers={jobOffers.jobOffer}
          paddingY="py-20 md:py-48"
        />
      )}
    </>
  );
}
