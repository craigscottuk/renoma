// cSpell:disable

import { setRequestLocale } from "next-intl/server";
import { client } from "@/sanity/client";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CustomButton from "@/components/ui/custom-button";
import Image from "next/image";

const QUERY = `
{
  "heroSection": *[_type == "heroSection"][0]{
    "sectionTitle": coalesce(sectionTitle[_key == $locale][0].value, "Missing translation"),
    "sectionCTA": coalesce(sectionCTA[_key == $locale][0].value, "Missing translation")
  },
  "aboutSection": *[_type == "aboutSection"][0]{
    "sectionLabel": coalesce(sectionLabel[_key == $locale][0].value, "Missing translation"),
    "sectionTitle": coalesce(sectionTitle[_key == $locale][0].value, "Missing translation"),
    "sectionDescription": coalesce(sectionDescription[_key == $locale][0].value, "Missing translation"),
    "sectionCTA": coalesce(sectionCTA[_key == $locale][0].value, "Missing translation")
  },
  "servicesSection": *[_type == "servicesSection"][0]{
    "sectionLabel": coalesce(sectionLabel[_key == $locale][0].value, "Missing translation"),
    "sectionTitle": coalesce(sectionTitle[_key == $locale][0].value, "Missing translation"),
    "sectionDescription": coalesce(sectionDescription[_key == $locale][0].value, "Missing translation"),
    "sectionCTA": coalesce(sectionCTA[_key == $locale][0].value, "Missing translation")
  }
}
`;

const options = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  heroSection: {
    sectionTitle: string;
    sectionCTA: string;
  };
  aboutSection: {
    sectionLabel: string;
    sectionTitle: string;
    sectionDescription: string;
    sectionCTA: string;
  };
  servicesSection: {
    sectionLabel: string;
    sectionTitle: string;
    sectionDescription: string;
    sectionCTA: string;
  };
}

export default async function IndexPage({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, options);

  console.log("content: ", content.heroSection);

  return (
    <>
      {content.heroSection && (
        <div className="relative min-h-[calc(100vh-96px)]">
          {/* Background Image */}
          <Image
            src="/cover-img.png"
            alt="Cover Image"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <MaxWidthWrapper>
              <div className="grid items-center gap-12 md:grid-cols-2 md:gap-24">
                {/* Left Column */}
                <div className="space-y-4 md:space-y-8">
                  <h2 className="motion-preset-blur-right text-4xl font-light leading-tight md:text-6xl">
                    {content.heroSection.sectionTitle}
                  </h2>
                  <div>
                    <CustomButton variant="dark" href="/uslugi">
                      {content.heroSection.sectionCTA}
                    </CustomButton>
                  </div>
                </div>
              </div>
            </MaxWidthWrapper>
          </div>
        </div>
      )}

      {/* About Section */}
      {content.aboutSection && (
        <section className="mx-auto bg-white py-16 md:py-44">
          <MaxWidthWrapper>
            <div className="grid gap-12 md:grid-cols-2 md:gap-24">
              {/* Right Column (Heading and Title) for Mobile, Hidden on Desktop */}
              <div className="space-y-4 md:hidden">
                <p className="text-left text-sm tracking-wide">
                  {content.aboutSection.sectionLabel}
                </p>
                <h2 className="text-6xl font-light leading-tight">
                  {content.aboutSection.sectionTitle}
                </h2>
              </div>

              {/* Left Column (Text Content) */}
              <div className="flex h-full flex-col justify-center space-y-6">
                <p className="max-w-md text-base leading-relaxed">
                  {content.aboutSection.sectionDescription}
                </p>
              </div>

              {/* Right Column (Heading, Title, and Button) for Desktop */}
              <div className="hidden space-y-8 md:flex md:flex-col md:items-end">
                <p className="text-sm uppercase tracking-wide">
                  {content.aboutSection.sectionLabel}
                </p>
                <h2 className="text-right text-4xl font-light leading-tight md:text-6xl">
                  {content.aboutSection.sectionTitle}
                </h2>
                <div>
                  <CustomButton variant="light" href="/o-nas">
                    {content.aboutSection.sectionCTA}
                  </CustomButton>
                </div>
              </div>

              {/* Button for Mobile, Hidden on Desktop */}
              <div className="text-left md:hidden">
                <CustomButton variant="light" href="/o-nas">
                  {content.aboutSection.sectionCTA}
                </CustomButton>
              </div>
            </div>
          </MaxWidthWrapper>
        </section>
      )}

      {/* Services Section */}
      {content.servicesSection && (
        <section className="mx-auto bg-black py-16 text-white md:py-44">
          <MaxWidthWrapper>
            <div className="grid items-center gap-12 md:grid-cols-2 md:gap-24">
              {/* Left Column */}
              <div className="space-y-4 md:space-y-8">
                <p className="text-sm uppercase tracking-wide">
                  {content.servicesSection.sectionLabel}
                </p>
                <h2 className="text-4xl font-light leading-tight md:text-6xl">
                  {content.servicesSection.sectionTitle}
                </h2>
              </div>

              {/* Right Column */}
              <div className="max-w-lg space-y-6 md:text-left">
                <p className="max-w-prose text-base leading-relaxed">
                  {content.servicesSection.sectionDescription}
                </p>
                <div>
                  <CustomButton variant="dark" href="/uslugi">
                    {content.servicesSection.sectionCTA}
                  </CustomButton>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </section>
      )}
    </>
  );
}
