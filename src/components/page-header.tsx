// cSpell:disable
import clsx from "clsx";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import CustomButton from "./ui/custom-button";
import MaxWidthWrapper from "./max-width-wrapper";
import SectionTitle from "@/components/section-title";
import SectionDescription from "@/components/section-description";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface PageHeaderProps {
  label: string;
  title: string;
  description: string;
  sectionButton?: string;
  image?: SanityImageSource | string;
  imageAlt?: string;
  imageLayout?: "fullWidth" | "portraitRight";
  backgroundColor?: "white" | "black"; // Add this line
}

export default function PageHeader({
  label,
  title,
  description,
  sectionButton,
  image,
  imageAlt,
  imageLayout = "fullWidth",
  backgroundColor = "black", // Add this line
}: PageHeaderProps) {
  // Generate the header image URL from Sanity or use the raw string URL
  const imageUrl =
    typeof image === "string"
      ? image
      : image
        ? urlFor(image, 1200)
        : "/fallback-image.svg";

  const headerFullWidth = imageLayout === "fullWidth";
  const textColor = backgroundColor === "black" ? "white" : "black"; // Add this line

  return (
    <>
      {/* Full-width header image */}
      {headerFullWidth && imageUrl && (
        <div className="relative mt-24 h-80 w-full">
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

      {/* Text - Section title and description */}
      <section
        className={clsx(
          "relative mx-auto mt-24 py-12 lg:py-16",
          headerFullWidth ? "lg:mt-0 lg:pt-10" : "min-h-[500px]",
          backgroundColor === "black" ? "bg-black" : "bg-white", // Add this line
        )}
      >
        {/* Small-screen header image strip */}
        {!headerFullWidth && imageUrl && (
          <MaxWidthWrapper className="relative -mt-12 mb-4 block h-44 w-full lg:hidden">
            <Image
              src={imageUrl}
              alt={imageAlt || "Header image"}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </MaxWidthWrapper>
        )}

        {/* Section content */}
        <MaxWidthWrapper
          className={clsx("flex flex-col", {
            "lg:flex-row lg:items-start": imageUrl && !headerFullWidth,
            "lg:flex-row lg:gap-8": !imageUrl || headerFullWidth,
          })}
        >
          {imageUrl && !headerFullWidth ? (
            // Stacked layout for content with an image on the right on large screens
            <div className="flex-1">
              <SectionTitle
                label={label}
                title={title}
                as="h1"
                motionPreset="blur-left"
                textColor={textColor} // Modify this line
              />
              <SectionDescription
                description={description}
                marginTop={true}
                textStyle="text-balance"
                textColor={textColor} // Add this line
              />
              {sectionButton && (
                <CustomButton animateOnView={false}>
                  {sectionButton}
                </CustomButton>
              )}
            </div>
          ) : (
            // Two-column layout for large screens without an image
            <>
              <div className="flex-1">
                <SectionTitle
                  label={label}
                  title={title}
                  as="h1"
                  motionPreset="blur-left"
                  textColor={textColor} // Modify this line
                />
              </div>
              <div className="flex flex-col items-end md:max-w-[29rem]">
                <SectionDescription
                  description={description}
                  marginTop={true}
                  textStyle="text-balance"
                  textColor={textColor} // Add this line
                />
              </div>
            </>
          )}

          {/* Large-screen layout with image on the right */}
          {imageUrl && !headerFullWidth && (
            <div className="relative hidden lg:-mb-80 lg:-mt-12 lg:ml-auto lg:block lg:h-[530px] lg:w-[450px]">
              <Image
                src={imageUrl}
                alt={imageAlt || "Obraz nagłówka"}
                fill
                unoptimized
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          )}
        </MaxWidthWrapper>
      </section>
    </>
  );
}
