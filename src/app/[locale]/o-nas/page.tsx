import { setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/page-header-section";
import { client } from "@/sanity/client";
import { PortableTextBlock } from "next-sanity";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Timeline from "@/components/sections-about/timeline";
import { AboutUs } from "@/components/sections-about/about-us";

const QUERY = `
{
 "aboutUsHeader": *[_type == "aboutUsHeader"][0]{
    "label": coalesce(label[_key == $locale][0].value, "Brak tłumaczenia"),
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "description": coalesce(description[_key == $locale][0].value, "Brak tłumaczenia"),
    "image": image,
    "imageAlt": coalesce(image.alt[_key == $locale][0].value, "Brak tłumaczenia")
  },

  "aboutUs": *[_type == "aboutUs"][0]{
    "title": coalesce(title[_key == $locale][0].value, "Brak tłumaczenia"),
    "text": select(
      defined(text[$locale]) => text[$locale],
      "Brak tłumaczenia"
    )
  },

  "timeline": *[_type == "timelineSection"][0].timeline[]{
    "year": year,
    "content": select(
      defined(content[$locale]) => content[$locale],
      "Brak tłumaczenia"
    ),
    "images": images[]{
      "src": src.asset->url,
      "caption": coalesce(caption[_key == $locale][0].value, "Brak tłumaczenia")
    }
  }
}
`;

const OPTIONS = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  aboutUsHeader: {
    label: string;
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
  };
  aboutUs: {
    title: string;
    text: PortableTextBlock[];
  };
  timeline: TimelineItem[];
}

interface TimelineItem {
  year: string;
  content: PortableTextBlock[];
  images?: TimelineImage[];
}

interface TimelineImage {
  src: string;
  caption: string;
}

export default async function ONas({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { aboutUsHeader, aboutUs, timeline } = content;

  console.log(" content", aboutUsHeader);

  return (
    <>
      <PageHeader
        label={aboutUsHeader.label}
        title={aboutUsHeader.title}
        description={aboutUsHeader.description}
        image={aboutUsHeader.image}
        imageAlt={aboutUsHeader.imageAlt}
      />

      <AboutUs
        title={aboutUs.title}
        text={aboutUs.text}
        paddingY="py-20 md:py-48"
      />

      <section className="mt-24">
        <MaxWidthWrapper>
          <SectionTitle
            title="Nasza historia"
            as="h2"
            motionPreset="blur-left"
            textColor="black"
            textAlign="center"
          />

          <div className="mt-10 px-4 py-20">
            <Timeline events={timeline} />
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
