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
  const headerImageUrl =
    typeof headerImage === "string"
      ? headerImage
      : headerImage
        ? urlFor(headerImage, 1200)
        : undefined;

  return (
    <section className="relative mx-auto mt-24 bg-white py-12 lg:py-24">
      <MaxWidthWrapper className="flex flex-col lg:flex-row lg:items-start">
        <div className="flex-1">
          <SectionTitle
            label={sectionLabel}
            title={sectionTitle}
            as="h1"
            motionPreset="blur-left"
            textColor="black"
          />
          <SectionDescription description={sectionDescription} />
        </div>

        {headerImageUrl && (
          <div className="relative z-20 mt-12 lg:-mb-80 lg:-mt-12 lg:ml-auto lg:h-[620px] lg:w-[520px]">
            <Image
              src={headerImageUrl}
              alt={headerImageAlt || "Header image"}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        )}
      </MaxWidthWrapper>
    </section>
  );
}
