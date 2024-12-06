// cSpell:disable
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import SectionTitle from "@/components/section-title";
import SectionDescription from "@/components/section-description";
import MaxWidthWrapper from "./../max-width-wrapper";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { Separator } from "@/components/ui/separator";

interface CaseStudyHeaderSectionProps {
  label?: string;
  title?: string;
  summary?: string;
  image?: SanityImageSource | string;
  imageAlt?: string;
  headerFullWidth?: boolean;
  className?: string;
}

export default function CaseStudyHeaderSection({
  label,
  title = "Domyślny Tytuł",
  summary = "Domyślne Podsumowanie",
  image,
  imageAlt,
  headerFullWidth = true,
  className,
}: CaseStudyHeaderSectionProps) {
  // Get the locale
  const locale = useLocale();

  // Function to determine label based on locale
  const getLabel = (locale: string) => {
    switch (locale) {
      case "en":
        return "Case Study";
      case "pl":
        return "Realizacje";
      case "de":
        return "Fallstudie";
    }
  };

  // Generate the URL for the header image from Sanity or use the provided string URL
  const imageUrl =
    typeof image === "string" ? image : image ? urlFor(image, 1200) : undefined;

  return (
    <>
      {/* Render the header image if available and full-width is enabled */}
      {headerFullWidth && (
        <div className="relative mb-12 mt-24 h-80 w-full">
          <Image
            src={imageUrl || "/fallback-image.svg"}
            alt={imageAlt || "Obraz nagłówka studium przypadku"}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            loading="lazy"
          />
        </div>
      )}

      <section
        className={clsx("relative mx-auto bg-white py-12 lg:py-12", className)}
      >
        {/* Main content layout */}
        <MaxWidthWrapper
          className={clsx(
            "flex flex-col",
            imageUrl && !headerFullWidth
              ? "lg:flex-row lg:items-start"
              : "lg:flex-row lg:gap-8",
          )}
        >
          {/* Render the title and description */}
          <div className="flex-1">
            <SectionTitle
              label={label || getLabel(locale)} // Use dynamic label if not provided
              title={title}
              as="h1"
              motionPreset="blur-left"
              textColor="black"
            />
          </div>
          <div className="flex flex-col md:max-w-[29rem] lg:items-end">
            <SectionDescription
              description={summary}
              marginTop
              textStyle="text-balance"
            />
          </div>

          {/* Render the image on the right side for large screens if not full-width */}
          {imageUrl && !headerFullWidth && (
            <div className="relative hidden lg:-mb-80 lg:-mt-12 lg:ml-auto lg:block lg:h-[620px] lg:w-[520px]">
              <Image
                src={imageUrl || "/fallback-image.svg"}
                alt={imageAlt || "Obraz nagłówka"}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                loading="lazy"
              />
            </div>
          )}
        </MaxWidthWrapper>
        <MaxWidthWrapper>
          <Separator className="mt-12" />
        </MaxWidthWrapper>
      </section>
    </>
  );
}
