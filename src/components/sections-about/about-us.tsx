import MaxWidthWrapper from "../max-width-wrapper";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "../../lib/portableTextComponents";
import SectionTitle from "../section-title";
import clsx from "clsx";

interface AboutUsProps {
  title: string;
  text: PortableTextBlock[];
  paddingY: string;
}

export function AboutUs({ title, text, paddingY }: AboutUsProps) {
  return (
    <section className={clsx("mx-auto bg-black text-white/90", paddingY)}>
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-24">
          <SectionTitle title={title} textColor="white" />
          <div className="lg:col-span-2 lg:col-start-2 lg:columns-2 lg:gap-8">
            <PortableText value={text} components={portableTextComponents} />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
