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
  headerImage?: SanityImageSource | string; // Allows both Sanity image object and URL string
}

export default function PageHeaderSection({
  sectionLabel,
  sectionTitle,
  sectionDescription,
  sectionButton,
  headerImage,
}: PageHeaderSectionProps) {
  // Determine the URL for the header image, with a 1200px cap on the longest edge
  const headerImageUrl =
    typeof headerImage === "string"
      ? headerImage
      : headerImage
        ? urlFor(headerImage, 1200)
        : undefined;

  return (
    <section className="relative mx-auto mt-24 bg-white py-12 lg:py-24">
      <MaxWidthWrapper>
        <SectionTitle
          label={sectionLabel}
          title={sectionTitle}
          as="h1"
          motionPreset="blur-left"
          textColor="black"
        />
        <SectionDescription description={sectionDescription} />
        {headerImageUrl && (
          <div className="relative z-10 h-[620px] w-[520px] lg:absolute lg:right-[5%] lg:top-0">
            <div className="relative mt-12 h-full w-full">
              <Image
                src={headerImageUrl}
                alt="Header Image"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </section>
  );
}
