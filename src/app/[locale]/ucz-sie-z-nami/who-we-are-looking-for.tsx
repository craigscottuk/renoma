"use client";

// cSpell:disable
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";
import SectionTitle from "@/components/section-title";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { FadeInSection } from "@/components/fade-in-section";
import { transformPortableTextBlocks } from "@/utils/transformPortableTextBlocks";
import { useState } from "react";
import { JobApplicationDialog } from "@/components/job-application-dialog";
import { Button } from "@/components/ui/button";

interface WhoWeAreLookingForProps {
  title: string;
  criteria: PortableTextBlock[];
  image: SanityImageSource | string;
  imageAlt: string;
  applyButtonText: string;
  paddingY: string;
}

export default function WhoWeAreLookingFor({
  title,
  criteria,
  image,
  imageAlt,
  applyButtonText,
  paddingY,
}: WhoWeAreLookingForProps) {
  // Generate the header image URL from Sanity or use the raw string URL
  const imageUrl =
    typeof image === "string" ? image : image ? urlFor(image, 1200) : "";

  // Apply transformPortableTextBlocks to portableTextBlock before rendering to fix Polish orphans on the end of each line.
  const newCriteria = transformPortableTextBlocks(criteria);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={clsx("mx-auto bg-white text-zinc-950/90", paddingY)}>
      <MaxWidthWrapper className="p-0">
        <FadeInSection translateY>
          <div className="relative aspect-[4/4] w-full lg:hidden">
            <Image
              src={imageUrl}
              alt={imageAlt || "Header image"}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
          <Card className="border-none bg-zinc-100">
            <CardContent className="p-12 md:p-16 lg:p-12 xl:p-14">
              <div className="grid items-center gap-14 lg:grid-cols-2">
                <div className="">
                  <SectionTitle
                    title={title}
                    textColor="black"
                    as="h2"
                    className="mb-8 md:mb-10 lg:mb-20"
                  />
                  <div className="list-indented mb-10 max-w-prose">
                    <PortableText
                      value={newCriteria}
                      components={portableTextComponents}
                    />
                  </div>

                  <Button
                    className="hover:bg-zinc-800 hover:text-zinc-100"
                    variant="outline"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    {applyButtonText}
                  </Button>
                </div>
                <div className="relative hidden aspect-[4/4] min-h-[300px] w-full lg:block">
                  <Image
                    src={imageUrl}
                    alt={imageAlt || "Header image"}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInSection>
        <JobApplicationDialog
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          jobTitle={"Generic Position"}
          formSource="whoWeAre"
        />
      </MaxWidthWrapper>
    </section>
  );
}
