// cSpell:disable
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";
import SectionTitle from "@/components/section-title";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import CustomButton from "@/components/ui/custom-button";
import MaxWidthWrapper from "@/components/max-width-wrapper";

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

  return (
    <section className={clsx("mx-auto bg-white text-black/90", paddingY)}>
      <MaxWidthWrapper>
        <Card className="border-none bg-gray-100">
          <CardContent className="p-0">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <SectionTitle
                  title={title}
                  textColor="black"
                  as="h2"
                  className="mb-20"
                />

                <div className="space-y-6">
                  {/* <p className="mb-6 text-lg text-muted-foreground">
                  Poszukujemy osób:
                </p>
                <ul className="space-y-4">
                  {criteria.map((requirement, index) => (
                    <li
                      key={index}
                      className="flex gap-2 text-muted-foreground"
                    >
                      <span className="text-primary">•</span>
                      <span>{requirement.text}</span>
                    </li>
                  ))}
                </ul> */}
                  <PortableText
                    value={criteria}
                    components={portableTextComponents}
                  />

                  <CustomButton animateOnView={false}>
                    {applyButtonText}
                  </CustomButton>
                </div>
              </div>
              <div className="relative m-6 h-[400px] lg:h-auto">
                <Image
                  src={imageUrl}
                  alt={imageAlt || "Header image"}
                  fill
                  style={{
                    objectFit: "cover", //
                    objectPosition: "center",
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </section>
  );
}
