import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "../../lib/portableTextComponents";
import MaxWidthWrapper from "../max-width-wrapper";
import clsx from "clsx";

interface PrivacyProps {
  content: PortableTextBlock[];
  paddingY?: string;
}

export default function Privacy({ content, paddingY }: PrivacyProps) {
  return (
    <section className={clsx("mx-auto bg-white text-black/90", paddingY)}>
      <MaxWidthWrapper>
        <PortableText value={content} components={portableTextComponents} />
      </MaxWidthWrapper>
    </section>
  );
}
