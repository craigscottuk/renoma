import clsx from "clsx";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";
import fixPolishOrphans from "@/utils/fixPolishOrphans";

interface PrivacyProps {
  content: PortableTextBlock[];
  paddingY?: string;
}

export default function Privacy({ content, paddingY }: PrivacyProps) {
  const newContent = content.map((block) => {
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
    <section className={clsx("mx-auto bg-white text-zinc-950/90", paddingY)}>
      <MaxWidthWrapper>
        <div className="mx-auto max-w-2xl text-pretty text-[1.1rem]">
          <PortableText
            value={newContent}
            components={portableTextComponents}
          />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
