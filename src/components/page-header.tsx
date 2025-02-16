// cSpell:disable
import clsx from "clsx";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import CustomButton from "./ui/custom-button";
import MaxWidthWrapper from "./max-width-wrapper";
import SectionTitle from "@/components/section-title";
import SectionDescription from "@/components/section-description";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { portableTextComponents } from "@/lib/portableTextComponents";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { transformPortableTextBlocks } from "@/utils/transformPortableTextBlocks";

interface PageHeaderProps {
  label: string;
  title: string;
  description: string;
  sectionButton?: string;
  image?: SanityImageSource | string;
  imageAlt?: string;
  imageLayout?:
    | "fullWidthAbove"
    | "fullWidthBelow"
    | "portraitRight"
    | "landscapeRight"
    | "noImage";
  backgroundColor?: "white" | "black";
  twoColumnText?: boolean;
  portableTextBlock?: PortableTextBlock[];
}

export default function PageHeader({
  label,
  title,
  description,
  sectionButton,
  image,
  imageAlt,
  imageLayout = "fullWidthAbove",
  backgroundColor = "white",
  twoColumnText = false,
  portableTextBlock,
}: PageHeaderProps) {
  // Generate the header image URL from Sanity or use the raw string URL
  const imageUrl =
    typeof image === "string"
      ? image
      : image
        ? urlFor(
            image,
            imageLayout === "fullWidthAbove" || imageLayout === "fullWidthBelow"
              ? 2500
              : 1200,
          )
        : "/fallback-image.svg";

  const headerFullWidth = twoColumnText || imageLayout.startsWith("fullWidth");
  const imagePosition = imageLayout === "fullWidthBelow" ? "below" : "above";
  const textColor = backgroundColor === "black" ? "white" : "black";
  const showImage = imageLayout !== "noImage";

  // Apply transformPortableTextBlocks to portableTextBlock before rendering to fix Polish orphans on the end of each line.
  if (portableTextBlock) {
    portableTextBlock = transformPortableTextBlocks(portableTextBlock);
  }

  return (
    <>
      {/* Full-width header image */}
      {headerFullWidth &&
        imageUrl &&
        imagePosition === "above" &&
        showImage && (
          <div className="relative mt-24 h-96 w-full lg:min-h-[22rem]">
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

      {/* Modified layout when twoColumnText is true */}
      {twoColumnText ? (
        <section
          className={clsx(
            "relative mx-auto py-12 lg:py-20",
            backgroundColor === "black" ? "bg-zinc-900" : "bg-white",
            imageLayout === "noImage" || imageLayout === "fullWidthBelow"
              ? "mt-24"
              : "",
          )}
        >
          <MaxWidthWrapper>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-24">
              <SectionTitle
                label={label}
                title={title}
                as="h1"
                motionPreset="blur-left"
                textColor={textColor}
                animateOnView={true}
                animationDirection="left"
              />
              <div
                className={clsx(
                  "motion-preset-blur-up lg:col-span-2 lg:col-start-2 lg:columns-2 lg:gap-8",
                  textColor === "white" ? "text-white" : "text-black",
                )}
              >
                {portableTextBlock && (
                  <PortableText
                    value={portableTextBlock}
                    components={portableTextComponents}
                  />
                )}
              </div>
            </div>
          </MaxWidthWrapper>
        </section>
      ) : (
        <>
          {/* Text - Section title and description */}
          <section
            className={clsx(
              "relative mx-auto py-12 lg:py-20",
              headerFullWidth && imagePosition === "above" && showImage
                ? "mt-24 lg:mt-0"
                : "",
              headerFullWidth && imagePosition === "below" && showImage
                ? "mt-24"
                : "",
              imageLayout === "portraitRight" ||
                imageLayout === "landscapeRight"
                ? "mt-24"
                : "",
              imageLayout === "noImage" ? "lg:mt-24 lg:min-h-[22rem]" : "",
              backgroundColor === "black" ? "bg-zinc-900" : "bg-white",
            )}
          >
            {/* Small-screen header image strip */}
            {!headerFullWidth && imageUrl && showImage && (
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
                "space-x-8 lg:flex-row lg:items-start":
                  imageUrl && !headerFullWidth,
                "lg:flex-row lg:gap-8": !imageUrl || headerFullWidth,
              })}
            >
              {imageUrl && !headerFullWidth && showImage ? (
                // Stacked layout for content with an image on the right on large screens
                <div className="flex-1">
                  <SectionTitle
                    label={label}
                    title={title}
                    as="h1"
                    motionPreset="blur-up"
                    textColor={textColor}
                  />
                  <SectionDescription
                    description={description}
                    marginTop={true}
                    textStyle="text-balance"
                    textColor={textColor}
                    motionPreset="blur-right"
                  />
                  {sectionButton && (
                    <CustomButton animateOnView={false}>
                      {sectionButton}
                    </CustomButton>
                  )}
                </div>
              ) : (
                // Two-column layout for large screens with a full-width image or without.
                <>
                  <div className="flex-1">
                    <SectionTitle
                      label={label}
                      title={title}
                      as="h1"
                      motionPreset="blur-up"
                      textColor={textColor}
                    />
                  </div>
                  <div className="flex flex-col items-end md:max-w-[29rem]">
                    <SectionDescription
                      description={description}
                      marginTop={true}
                      textStyle="text-balance"
                      textColor={textColor}
                      motionPreset="blur-up"
                    />
                  </div>
                </>
              )}

              {/* Large-screen layout with image on the right */}
              {imageUrl && !headerFullWidth && showImage && (
                <div
                  className={clsx(
                    "relative hidden lg:block",
                    imageLayout === "portraitRight"
                      ? "lg:-mb-80 lg:-mt-12 lg:ml-auto lg:h-[530px] lg:w-[450px]"
                      : "",
                    imageLayout === "landscapeRight"
                      ? "lg:mx-auto lg:aspect-[16/10] lg:w-1/2 lg:self-center"
                      : "",
                  )}
                >
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
      )}

      {/* Full-width header image below content */}
      {headerFullWidth &&
        imageUrl &&
        imagePosition === "below" &&
        showImage && (
          <div className="relative h-96 w-full lg:min-h-72">
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
    </>
  );
}
