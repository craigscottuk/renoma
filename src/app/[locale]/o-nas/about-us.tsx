"use client";
import clsx from "clsx";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { portableTextComponents } from "@/lib/portableTextComponents";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { FadeInSection } from "@/components/fade-in-section";

interface AboutUsProps {
  title: string;
  text: PortableTextBlock[];
  paddingY: string;
}

export function AboutUs({ title, text, paddingY }: AboutUsProps) {
  return (
    <section className={clsx("mx-auto bg-zinc-900 text-zinc-100/90", paddingY)}>
      <MaxWidthWrapper>
        <FadeInSection>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-24">
            <SectionTitle title={title} textColor="white" />
            <div className="lg:col-span-2 lg:col-start-2 lg:columns-2 lg:gap-8">
              <PortableText value={text} components={portableTextComponents} />
            </div>
          </div>
        </FadeInSection>
      </MaxWidthWrapper>
    </section>
  );
}
