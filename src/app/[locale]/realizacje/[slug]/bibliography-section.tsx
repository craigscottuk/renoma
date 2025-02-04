"use client";
// cSpell:disable
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Separator } from "@/components/ui/separator";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";
import { FadeInSection } from "@/components/fade-in-section";

interface BibliographySectionProps {
  title: string;
  content: PortableTextBlock[];
}

export default function BibliographySection({
  title,
  content,
}: BibliographySectionProps) {
  return (
    <FadeInSection>
      <section className="mb-16">
        <MaxWidthWrapper>
          <Separator className="mb-16" />

          <h2 className="mb-8 w-full max-w-[43rem] font-bolder text-[2rem] text-zinc-800">
            {title}
          </h2>
        </MaxWidthWrapper>

        <MaxWidthWrapper>
          <div className="flex flex-col lg:w-4/5 lg:items-start">
            <PortableText
              value={content || []}
              components={portableTextComponents}
            />
          </div>
        </MaxWidthWrapper>
      </section>
    </FadeInSection>
  );
}
