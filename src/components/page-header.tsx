"use client";
// cSpell:disable
import clsx from "clsx";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import CustomButton from "./ui/custom-button";
import MaxWidthWrapper from "./max-width-wrapper";
import SectionTitle from "@/components/section-title";
import { FadeInSection } from "@/components/fade-in-section";
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
  mobileImage?: SanityImageSource | string;
  imageAlt?: string;
  imageLayout?:
    | "fullWidthAbove"
    | "portraitRight"
    | "landscapeRight"
    | "noImage";
  backgroundColor?: "white" | "black";
  twoColumnText?: boolean;
  portableTextBlock?: PortableTextBlock[];
  aspectRatio?: "standard" | "wide";
  paddingY?: string;
  mobileSubMenu?: boolean;
  landscapeMobileForPortraitRight?: SanityImageSource | string;
}

export default function PageHeader({
  label,
  title,
  description,
  sectionButton,
  image,
  mobileImage,
  imageAlt,
  imageLayout = "fullWidthAbove",
  backgroundColor = "white",
  twoColumnText = false,
  portableTextBlock,
  aspectRatio = "wide", // default to wide (16:9)
  paddingY = "py-12 lg:py-32",
  mobileSubMenu,
  landscapeMobileForPortraitRight,
}: PageHeaderProps) {
  // Generate URLs for both desktop and mobile images
  const imageUrl =
    typeof image === "string"
      ? image
      : image
        ? urlFor(image, imageLayout === "fullWidthAbove" ? 2500 : 1200)
        : "/fallback-image.svg";

  const mobileImageUrl =
    typeof mobileImage === "string"
      ? mobileImage
      : mobileImage
        ? urlFor(mobileImage, 1000)
        : landscapeMobileForPortraitRight
          ? urlFor(landscapeMobileForPortraitRight, 1000)
          : imageUrl;

  const smallScreenImageUrl =
    imageLayout === "portraitRight" && landscapeMobileForPortraitRight
      ? urlFor(landscapeMobileForPortraitRight, 1000)
      : imageUrl;

  const headerFullWidth = twoColumnText || imageLayout === "fullWidthAbove";
  const imagePosition = "above";
  const textColor = backgroundColor === "black" ? "white" : "black";
  const showImage = imageLayout !== "noImage";

  // Transform PortableText blocks to fix Polish orphans of each line before rendering.
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
          <div
            className={`relative mt-20 aspect-[16/10] h-auto w-full md:aspect-[16/10] md:min-h-[22rem] lg:mt-24 lg:h-96`}
          >
            {/* Mobile Image */}
            <Image
              src={mobileImageUrl}
              alt={imageAlt || "Obraz nagłówka"}
              fill
              loading="lazy"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              className="lg:hidden"
            />

            {/* Desktop Image */}
            <Image
              src={imageUrl}
              alt={imageAlt || "Obraz nagłówka"}
              fill
              loading="lazy"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              className="hidden lg:block"
            />
          </div>
        )}

      {/* Modified layout when twoColumnText is true */}
      {twoColumnText ? (
        <section
          className={clsx(
            "relative mx-auto py-12 lg:py-32",
            backgroundColor === "black" ? "bg-zinc-900" : "bg-white",
            imageLayout === "noImage" ? "mt-20 md:mt-24" : "",
          )}
        >
          <MaxWidthWrapper>
            <div className="mr-10 grid grid-cols-1 gap-8 md:mr-20 lg:mr-0 lg:grid-cols-3 lg:gap-20 xl:gap-20">
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
                  "motion-preset-blur-up lg:col-span-2 lg:col-start-2 lg:columns-2 lg:gap-8 xl:gap-20",
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
              "relative mx-auto",
              paddingY,
              headerFullWidth && imagePosition === "above" && showImage
                ? "mt-0 lg:mt-0"
                : "",
              imageLayout === "portraitRight" ||
                imageLayout === "landscapeRight"
                ? "lg:mt-24"
                : "",
              imageLayout === "noImage"
                ? "mt-20 lg:mt-24 lg:min-h-[22rem]"
                : "",
              backgroundColor === "black" ? "bg-zinc-900" : "bg-white",
            )}
          >
            {/* Small-screen header image strip */}
            {!headerFullWidth && showImage && (
              <MaxWidthWrapper
                className={clsx(
                  "relative mb-16 block aspect-[16/10] w-full lg:hidden",
                  mobileSubMenu ? "mt-14 lg:mt-0" : "",
                )}
              >
                <Image
                  src={smallScreenImageUrl}
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
              className={clsx("flex h-auto flex-col lg:min-h-96", {
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
                    animateOnView={true}
                    animationDirection="left"
                    animationDirectionMobile="up"
                  />
                  {sectionButton && (
                    <CustomButton animateOnView={false}>
                      {sectionButton}
                    </CustomButton>
                  )}
                </div>
              ) : (
                // Two-column layout for large screens with a full-width image or without.
                <div>
                  <div className="flex-1">
                    <SectionTitle
                      label={label}
                      title={title}
                      as="h1"
                      motionPreset="blur-up"
                      textColor={textColor}
                    />
                  </div>
                  <div className="flex flex-col items-start md:max-w-[29rem] lg:items-end">
                    <SectionDescription
                      description={description}
                      marginTop={true}
                      textStyle="text-balance"
                      textColor={textColor}
                      motionPreset="blur-up"
                    />
                  </div>
                </div>
              )}

              {/* Large-screen layout with image on the right */}
              {imageUrl && !headerFullWidth && showImage && (
                <div
                  className={clsx(
                    "relative hidden lg:block",
                    imageLayout === "portraitRight"
                      ? "lg:-mb-80 lg:-mt-16 lg:aspect-[3/4] lg:h-auto lg:w-[420px]"
                      : "",
                    imageLayout === "landscapeRight"
                      ? clsx(
                          "lg:mx-auto lg:mt-[38px] lg:w-1/2 lg:self-start",
                          aspectRatio === "standard"
                            ? "lg:aspect-[4/3]"
                            : "lg:aspect-[16/10]",
                        )
                      : "",
                  )}
                >
                  <FadeInSection>
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
                  </FadeInSection>
                </div>
              )}
            </MaxWidthWrapper>
          </section>
        </>
      )}
    </>
  );
}
