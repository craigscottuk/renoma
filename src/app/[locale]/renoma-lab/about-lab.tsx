import clsx from "clsx";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { portableTextComponents } from "@/lib/portableTextComponents";
import { PortableText, PortableTextBlock } from "@portabletext/react";

interface AboutLabProps {
  title: string;
  text: PortableTextBlock[];
  paddingY: string;
}

export function AboutLab({ title, text, paddingY }: AboutLabProps) {
  return (
    <section className={clsx("mx-auto bg-white text-zinc-950/90", paddingY)}>
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-24">
          <SectionTitle title={title} textColor="black" />
          <div className="lg:col-span-2 lg:col-start-2 lg:columns-2 lg:gap-8">
            <PortableText value={text} components={portableTextComponents} />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
