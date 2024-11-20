import { setRequestLocale } from "next-intl/server";
import PageHeaderSection from "@/components/page-header-section";
import { client } from "@/sanity/client";
import Timeline from "@/components/sections-about/timeline";
import { PortableTextBlock } from "next-sanity";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import TimelineTwo from "@/components/sections-about/timelineTwo";
const QUERY = `
{
 "aboutHeaderSection": *[_type == "aboutHeaderSection"][0]{
    "sectionLabel": coalesce(sectionLabel[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionTitle": coalesce(sectionTitle[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionDescription": coalesce(sectionDescription[_key == $locale][0].value, "Brak tłumaczenia"),
    "headerImage": headerImage,
    "headerImageAlt": coalesce(headerImage.alt[_key == $locale][0].value, "Brak tłumaczenia")
  },

  "timeline": *[_type == "timelineSection"][0].timeline[]{
    "year": year,
    "content": select(
      defined(content[$locale]) => content[$locale],
      "Brak tłumaczenia"
    ),
    "images": images[]{
      "src": src.asset->url,
      "caption": caption
    }
  }
}
`;

const OPTIONS = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  aboutHeaderSection: {
    sectionLabel: string;
    sectionTitle: string;
    sectionDescription: string;
    headerImage?: string;
    headerImageAlt?: string;
  };
  timeline: TimelineItem[];
}

interface TimelineItem {
  year: number;
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

  const { aboutHeaderSection, timeline } = content;

  console.log(content);

  return (
    <>
      <PageHeaderSection
        sectionLabel={aboutHeaderSection.sectionLabel}
        sectionTitle={aboutHeaderSection.sectionTitle}
        sectionDescription={aboutHeaderSection.sectionDescription}
        headerImage={aboutHeaderSection.headerImage}
        headerImageAlt={aboutHeaderSection.headerImageAlt}
      />

      <section>
        <MaxWidthWrapper>
          <SectionTitle
            title="Nasza historia i doświadczenie"
            as="h2"
            motionPreset="blur-left"
            textColor="black"
            textAlign="left"
          />
          <Timeline timeline={timeline} />
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper>
          <SectionTitle
            title="Nasza historia i doświadczenie"
            as="h2"
            motionPreset="blur-left"
            textColor="black"
            textAlign="left"
          />
          <TimelineTwo />
        </MaxWidthWrapper>
      </section>
    </>
  );
}
