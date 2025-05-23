"use client";
import clsx from "clsx";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { portableTextComponents } from "@/lib/portableTextComponents";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { FadeInSection } from "@/components/fade-in-section";
import { transformPortableTextBlocks } from "@/utils/transformPortableTextBlocks";

interface AboutUsProps {
  title: string;
  text: PortableTextBlock[];
  paddingY: string;
}

export function AboutUs({ title, text, paddingY }: AboutUsProps) {
  // Transform PortableText blocks to fix Polish orphans of each line before rendering.
  const newText = transformPortableTextBlocks(text);

  return (
    <section className={clsx("mx-auto bg-zinc-200 text-zinc-950/90", paddingY)}>
      <MaxWidthWrapper>
        <FadeInSection>
          <div className="mr-10 grid grid-cols-1 gap-8 md:mr-20 lg:mr-0 lg:grid-cols-3 lg:gap-20 xl:gap-20">
            <SectionTitle title={title} textColor="black" />
            <div className="lg:col-span-2 lg:col-start-2 lg:columns-2 lg:gap-8 xl:gap-20">
              <PortableText
                value={newText}
                components={portableTextComponents}
              />
            </div>
          </div>
        </FadeInSection>
      </MaxWidthWrapper>
    </section>
  );
}
