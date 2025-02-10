"use client";
import clsx from "clsx";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { portableTextComponents } from "@/lib/portableTextComponents";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { FadeInSection } from "@/components/fade-in-section";
import fixPolishOrphans from "@/utils/fixPolishOrphans";

interface AboutUsProps {
  title: string;
  text: PortableTextBlock[];
  paddingY: string;
}

export function AboutUs({ title, text, paddingY }: AboutUsProps) {
  const newText = text.map((block) => {
    if (block._type === "block") {
      return {
        ...block,
        children: block.children?.map((child) => {
          if (child._type === "span" && typeof child.text === "string") {
            return { ...child, text: fixPolishOrphans(child.text) };
          }
          return child;
        }),
      };
    }
    return block;
  });

  return (
    <section className={clsx("mx-auto bg-zinc-900 text-zinc-100/90", paddingY)}>
      <MaxWidthWrapper>
        <FadeInSection>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-28">
            <SectionTitle title={title} textColor="white" />
            <div className="lg:col-span-2 lg:col-start-2 lg:columns-2 lg:gap-8">
              <PortableText
                // apply 'text' to bypass the fixPolishOrphans function
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
