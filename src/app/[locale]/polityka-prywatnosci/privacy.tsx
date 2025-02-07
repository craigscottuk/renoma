import clsx from "clsx";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";

interface PrivacyProps {
  content: PortableTextBlock[];
  paddingY?: string;
}

export default function Privacy({ content, paddingY }: PrivacyProps) {
  return (
    <section className={clsx("mx-auto bg-white text-zinc-950/90", paddingY)}>
      <MaxWidthWrapper>
        <div className="mx-auto max-w-2xl text-pretty text-[1.1rem]">
          <PortableText value={content} components={portableTextComponents} />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
