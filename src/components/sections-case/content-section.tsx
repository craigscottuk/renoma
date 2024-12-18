import React from "react";
import MaxWidthWrapper from "../max-width-wrapper";
import ImageCarousel from "../ImageCarousel";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "../../lib/portableTextComponents";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { CaseStudySectionContent } from "@/types";
import { Separator } from "../ui/separator";

export default function ContentSection({
  title,
  content,
}: {
  title: string;
  content: CaseStudySectionContent[];
}) {
  return (
    <div className="mb-20">
      <MaxWidthWrapper>
        <Separator className="mb-16" />

        <h2 className="mb-12 w-full font-bolder text-4xl text-zinc-950">
          {title}
        </h2>
      </MaxWidthWrapper>
      {content?.map((section: CaseStudySectionContent, index: number) => {
        switch (section._type) {
          case "textAndImageGallery":
            const isTextLeft = section.layout !== "imageLeftTextRight";
            return (
              <MaxWidthWrapper
                key={index}
                className={`flex flex-col lg:flex-row lg:gap-24`}
              >
                {isTextLeft ? (
                  <>
                    <div className="flex-1 lg:w-1/2">
                      <PortableText
                        value={section.text || []}
                        components={portableTextComponents}
                      />
                    </div>
                    <div className="flex flex-col lg:w-1/2 lg:items-start">
                      <div className="w-full">
                        <ImageCarousel
                          images={
                            section.images?.map(
                              (img: {
                                asset: SanityImageSource | string;
                                caption: string;
                              }) => ({
                                src:
                                  typeof img.asset === "string"
                                    ? img.asset
                                    : urlFor(img.asset),
                                caption: img.caption,
                              }),
                            ) || []
                          }
                          // aspectRatio={section.aspectRatio}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col lg:w-1/2 lg:items-start">
                      <div className="w-full">
                        <ImageCarousel
                          images={
                            section.images?.map(
                              (img: {
                                asset: SanityImageSource | string;
                                caption: string;
                              }) => ({
                                src:
                                  typeof img.asset === "string"
                                    ? img.asset
                                    : urlFor(img.asset),
                                caption: img.caption,
                              }),
                            ) || []
                          }
                          // aspectRatio={section.aspectRatio}
                        />
                      </div>
                    </div>
                    <div className="flex-1 lg:w-1/2">
                      <PortableText
                        value={section.text || []}
                        components={portableTextComponents}
                      />
                    </div>
                  </>
                )}
              </MaxWidthWrapper>
            );
          case "textAndText":
            return (
              <MaxWidthWrapper
                key={index}
                className={`columns-1 gap-8 lg:columns-2`}
              >
                <PortableText
                  value={section.text || []}
                  components={portableTextComponents}
                />
              </MaxWidthWrapper>
            );
          case "imageGalleryAndImageGallery":
            return (
              <MaxWidthWrapper
                key={index}
                className={`flex flex-col lg:flex-row lg:gap-24`}
              >
                <div className="flex-1 lg:w-1/2">
                  <ImageCarousel
                    images={
                      section.images1?.map(
                        (img: {
                          asset: SanityImageSource | string;
                          caption: string;
                        }) => ({
                          src:
                            typeof img.asset === "string"
                              ? img.asset
                              : urlFor(img.asset),
                          caption: img.caption,
                        }),
                      ) || []
                    }
                    // aspectRatio={section.aspectRatio1}
                  />
                </div>
                <div className="flex flex-col lg:w-1/2 lg:items-start">
                  <ImageCarousel
                    images={
                      section.images2?.map(
                        (img: {
                          asset: SanityImageSource | string;
                          caption: string;
                        }) => ({
                          src:
                            typeof img.asset === "string"
                              ? img.asset
                              : urlFor(img.asset),
                          caption: img.caption,
                        }),
                      ) || []
                    }
                    // aspectRatio={section.aspectRatio2}
                  />
                </div>
              </MaxWidthWrapper>
            );
          case "fullWidthImage":
            const imageUrl =
              typeof section.image?.asset === "string"
                ? section.image.asset
                : section.image?.asset
                  ? urlFor(section.image.asset)
                  : undefined;

            return (
              <MaxWidthWrapper
                key={index}
                className={`flex flex-col lg:flex-row lg:gap-24`}
              >
                <div className="flex-1 lg:w-full">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={section.image?.caption || ""}
                      className="w-full"
                      width={1200}
                      height={1200}
                    />
                  )}
                </div>
              </MaxWidthWrapper>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
