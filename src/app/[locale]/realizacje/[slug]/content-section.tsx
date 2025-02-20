"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import ImageCarousel from "@/components/ImageCarousel";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { CaseStudySectionContent } from "@/types";
import { Separator } from "@/components/ui/separator";
import { FadeInSection } from "@/components/fade-in-section";
import { transformPortableTextBlocks } from "@/utils/transformPortableTextBlocks";

function parseAspectRatio(ratio: string | undefined): "standard" | "wide" {
  return ratio === "wide" ? "wide" : "standard";
}

export default function ContentSection({
  title,
  content,
}: {
  title: string;
  content: CaseStudySectionContent[];
}) {
  // Apply transformPortableTextBlocks to portableTextBlock before rendering to fix Polish orphans on the end of each line.
  const transformedContent = content?.map((section) => {
    const newSection = { ...section };

    if (section.text) {
      const newText = transformPortableTextBlocks(section.text);
      newSection.text = newText;
    }

    if (section.text1) {
      const newText1 = transformPortableTextBlocks(section.text1);
      newSection.text1 = newText1;
    }

    if (section.text2) {
      const newText2 = transformPortableTextBlocks(section.text2);
      newSection.text2 = newText2;
    }

    return newSection;
  });

  return (
    <FadeInSection>
      <section className="mb-16">
        <MaxWidthWrapper>
          <Separator className="mb-16" />

          <h2 className="mb-8 w-full max-w-[43rem] font-bolder text-[2rem] text-zinc-800">
            {title}
          </h2>
        </MaxWidthWrapper>
        {transformedContent?.map(
          (section: CaseStudySectionContent, index: number) => {
            switch (section._type) {
              case "textAndImageGallery":
                const isTextLeft = section.layout !== "imageLeftTextRight";
                return (
                  <MaxWidthWrapper key={index}>
                    <div
                      className={`lg:w-full ${!isTextLeft ? "lg:flex lg:justify-end lg:pl-48" : ""}`}
                    >
                      <div className={`lg-w-1/2 flex w-full lg:w-1/2`}>
                        <h3 className="mb-8 max-w-[43rem] font-bolder text-[1.45rem] text-dullGold">
                          {section.heading3}
                        </h3>
                      </div>
                    </div>

                    {isTextLeft ? (
                      <>
                        <div
                          className={`mb-20 flex flex-col lg:flex-row lg:gap-24`}
                        >
                          <div className="flex-1 lg:w-1/2">
                            <div className="text-pretty leading-[1.75] lg:max-w-[30rem]">
                              <PortableText
                                value={section.text || []}
                                components={portableTextComponents}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col lg:w-1/2 lg:items-start">
                            <div className="w-full">
                              <ImageCarousel
                                aspectRatio={parseAspectRatio(
                                  section.images?.[0]?.aspectRatio,
                                )}
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
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className={`mb-20 flex flex-col lg:flex-row lg:gap-24`}
                        >
                          <div className="flex flex-col lg:w-1/2 lg:items-start">
                            <div className="w-full">
                              <ImageCarousel
                                aspectRatio={parseAspectRatio(
                                  section.images?.[0]?.aspectRatio,
                                )}
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
                              />
                            </div>
                          </div>
                          <div className="flex-1 lg:w-1/2">
                            <div className="text-pretty leading-[1.75] lg:max-w-[30rem]">
                              <PortableText
                                value={section.text || []}
                                components={portableTextComponents}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </MaxWidthWrapper>
                );
              case "textWrap":
                return (
                  <MaxWidthWrapper key={index}>
                    <h3 className="mb-5 block w-full font-bolder text-[1.4rem] text-dullGold">
                      {section.heading3}
                    </h3>

                    <div className={`mb-20 columns-1 gap-8 lg:columns-2`}>
                      <div className="text-pretty leading-[1.75] lg:max-w-[30rem]">
                        <PortableText
                          value={section.text || []}
                          components={portableTextComponents}
                        />
                      </div>
                    </div>
                  </MaxWidthWrapper>
                );
              case "textAndText":
                return (
                  <MaxWidthWrapper key={index}>
                    <h3 className="mb-5 block w-full font-bolder text-[1.4rem] text-dullGold">
                      {section.heading3}
                    </h3>
                    <div className="mb-20 flex flex-col gap-8 lg:flex-row">
                      <div className="flex-1">
                        <div className="text-pretty lg:max-w-[30rem]">
                          <PortableText
                            value={section.text1 || []}
                            components={portableTextComponents}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-pretty lg:max-w-[30rem]">
                          <PortableText
                            value={section.text2 || []}
                            components={portableTextComponents}
                          />
                        </div>
                      </div>
                    </div>
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
                        aspectRatio={parseAspectRatio(
                          section.images1?.[0]?.aspectRatio,
                        )}
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
                      />
                    </div>
                    <div className="flex flex-col lg:w-1/2 lg:items-start">
                      <ImageCarousel
                        aspectRatio={parseAspectRatio(
                          section.images2?.[0]?.aspectRatio,
                        )}
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
          },
        )}
      </section>
    </FadeInSection>
  );
}
