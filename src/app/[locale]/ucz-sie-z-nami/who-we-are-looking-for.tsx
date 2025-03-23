"use client";

// cSpell:disable
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

  // Transform PortableText blocks to fix Polish orphans of each line before rendering.
  const newCriteria = transformPortableTextBlocks(criteria);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={clsx("mx-auto bg-white text-zinc-950/90", paddingY)}>
      <MaxWidthWrapper className="p-0 xl:px-12">
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
          <Card className="space-y-4 border-none bg-zinc-100 px-1 py-7 md:p-8 lg:py-12 xl:px-10">
            <CardHeader>
              <SectionTitle title={title} textColor="black" as="h2" />
            </CardHeader>
            <CardContent className="">
              <div className="grid items-start lg:grid-cols-2 lg:gap-10 xl:gap-24">
                <div className="h-full space-y-10 lg:flex lg:flex-col lg:justify-between lg:space-y-0">
                  <div className="list-indented max-w-prose">
                    <PortableText
                      value={newCriteria}
                      components={portableTextComponents}
                    />
                  </div>

                  <Button
                    className="w-full bg-zinc-50 text-zinc-950 hover:bg-zinc-800 hover:text-zinc-100 lg:w-fit"
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
