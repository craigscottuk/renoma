// cSpell:disable
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import SectionTitle from "@/components/section-title";
import SectionDescription from "@/components/section-description";
import MaxWidthWrapper from "./../max-width-wrapper";
import { Separator } from "@/components/ui/separator";

interface CaseStudyHeaderSectionProps {
  sectionLabel: string;
  sectionTitle: string;
  sectionDescription: string;
  headerImage?: SanityImageSource | string;
  headerImageAlt?: string;
  headerFullWidth?: boolean;
}

export default function CaseStudyHeaderSection({
  sectionLabel,
  sectionTitle,
  sectionDescription,
  headerImage,
  headerImageAlt,
  headerFullWidth = true, // Default to full-width image
}: CaseStudyHeaderSectionProps) {
  // Generate the URL for the header image from Sanity or use the provided string URL
  const headerImageUrl =
    typeof headerImage === "string"
      ? headerImage
      : headerImage
        ? urlFor(headerImage, 1200)
        : undefined;

  return (
    <>
      {/* Render the header image if available and full-width is enabled */}
      {headerImageUrl && headerFullWidth && (
        <div className="relative mt-24 h-80 w-full">
          <Image
            src={headerImageUrl}
            alt={headerImageAlt || "Case study header image"}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      )}

      <section className="relative mx-auto bg-white py-12 lg:py-24">
        {/* Main content layout */}
        <MaxWidthWrapper
          className={`flex flex-col ${
            headerImageUrl && !headerFullWidth
              ? "lg:flex-row lg:items-start"
              : "lg:flex-row lg:gap-8"
          }`}
        >
          {headerImageUrl && !headerFullWidth ? (
            // Stacked layout for title and description without a full-width header image on large screens
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
            // Two-column layout for large screens, with or without a full-width header image
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
              <div className="flex flex-col md:max-w-[29rem] lg:items-end">
                <SectionDescription
                  description={sectionDescription}
                  marginTop={true}
                  textStyle="text-balance"
                />
              </div>
            </>
          )}

          {/* Render the image on the right side for large screens if not full-width */}
          {headerImageUrl && !headerFullWidth && (
            <div className="relative hidden lg:-mb-80 lg:-mt-12 lg:ml-auto lg:block lg:h-[620px] lg:w-[520px]">
              <Image
                src={headerImageUrl}
                alt={headerImageAlt || "Header image"}
                fill
                style={{
                  objectFit: "cover", // Maintain image proportions
                  objectPosition: "center", // Center the image content
                }}
              />
            </div>
          )}
        </MaxWidthWrapper>

        <MaxWidthWrapper>
          <Separator />
        </MaxWidthWrapper>
      </section>
    </>
  );
}
