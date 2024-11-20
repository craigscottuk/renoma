// cSpell:disable
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import SectionTitle from "@/components/section-title";
import SectionDescription from "@/components/section-description";
import MaxWidthWrapper from "./max-width-wrapper";

interface PageHeaderSectionProps {
  sectionLabel: string;
  sectionTitle: string;
  sectionDescription: string;
  sectionButton?: string;
  headerImage?: SanityImageSource | string;
  headerImageAlt?: string;
}

export default function PageHeaderSection({
  sectionLabel,
  sectionTitle,
  sectionDescription,
  sectionButton,
  headerImage,
  headerImageAlt,
}: PageHeaderSectionProps) {
  // Generate the header image URL from Sanity or use the raw string URL
  const headerImageUrl =
    typeof headerImage === "string"
      ? headerImage
      : headerImage
        ? urlFor(headerImage, 1200)
        : undefined;

  return (
    <section className="relative mx-auto mt-24 bg-white py-12 lg:py-24">
      {/* Render a top image strip for small screens */}
      {headerImageUrl && (
        <MaxWidthWrapper className="relative -mt-12 mb-4 block h-44 w-full lg:hidden">
          <Image
            src={headerImageUrl}
            alt={headerImageAlt || "Header image"} // Use alt text or fallback
            fill
            style={{
              objectFit: "cover", // Ensures the image covers the area
              objectPosition: "center", // Centers the visible part of the image
            }}
          />
        </MaxWidthWrapper>
      )}

      {/* Main content layout */}
      <MaxWidthWrapper
        className={`flex flex-col ${
          headerImageUrl ? "lg:flex-row lg:items-start" : "lg:flex-row lg:gap-8"
        }`}
      >
        {headerImageUrl ? (
          // Stacked layout for content with an image on large screens
          <div className="flex-1">
            <SectionTitle
              label={sectionLabel}
              title={sectionTitle}
              as="h1"
              motionPreset="blur-left"
              textColor="black"
            />
            <SectionDescription
              description={sectionDescription}
              marginTop={true}
              textStyle="text-balance"
            />
          </div>
        ) : (
          // Two-column layout for large screens without an image
          <>
            <div className="flex-1">
              <SectionTitle
                label={sectionLabel}
                title={sectionTitle}
                as="h1"
                motionPreset="blur-left"
                textColor="black"
              />
            </div>
            <div className="flex flex-col items-end md:max-w-[29rem]">
              <SectionDescription
                description={sectionDescription}
                marginTop={true}
                textStyle="text-balance"
              />
            </div>
          </>
        )}

        {/* Large-screen image rendering */}
        {headerImageUrl && (
          <div className="relative hidden lg:-mb-80 lg:-mt-12 lg:ml-auto lg:block lg:h-[620px] lg:w-[520px]">
            <Image
              src={headerImageUrl}
              alt={headerImageAlt || "Header image"}
              fill
              style={{
                objectFit: "cover", // Ensures the image maintains proportions
                objectPosition: "center", // Centers the image content
              }}
            />
          </div>
        )}
      </MaxWidthWrapper>
    </section>
  );
}
