// cSpell:disable
import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header-section";
import { client } from "@/sanity/client";
import SectionJobOffer from "@/components/sections-work-with-us/section-job-offer";
import { PortableTextBlock } from "next-sanity";
import JobOffer from "@/components/sections-work-with-us/job-offer";
import JobOfferSection from "@/components/sections-work-with-us/job-offer";

const QUERY = `
{
  "workWithUsHeader": *[_type == "workWithUsHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image,
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia")
  },
  "jobOffers": *[_type == "jobOffers"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "jobOffers": jobOffers[]{
      "jobTitle": coalesce(jobTitle[_key == $locale][0].value, "Brak tłumaczenia"),
      "jobDescription": coalesce(jobDescription[_key == $locale][0].value, "Brak tłumaczenia"),
      "jobLocation": coalesce(jobLocation[_key == $locale][0].value, "Brak tłumaczenia"),
      "jobType": coalesce(jobType[_key == $locale][0].value, "Brak tłumaczenia"),
    "responsibilities": select(
      defined(responsibilities[$locale]) => responsibilities[$locale],
      "Brak tłumaczenia"
    ),
      "requirements": select(
      defined(requirements[$locale]) => requirements[$locale],
      "Brak tłumaczenia"
    ),
      "benefits": select(
      defined(benefits[$locale]) => benefits[$locale],
      "Brak tłumaczenia"
    ),
    }
  },
}
`;

const OPTIONS = { next: { revalidate: 30 } };

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
  };
  jobOffers: {
    title: string;
    jobOffers: {
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
      <PageHeader
        label={workWithUsHeader.label}
        title={workWithUsHeader.title}
        description={workWithUsHeader.description}
        image={workWithUsHeader.image}
        imageAlt={workWithUsHeader.imageAlt}
      />

      {/* Job Offer Section */}
      <JobOfferSection
        title={jobOffers.title}
        jobOffers={jobOffers.jobOffers}
      />
    </>
  );
}
