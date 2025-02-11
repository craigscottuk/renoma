import clsx from "clsx";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";
import { transformPortableTextBlocks } from "@/utils/transformPortableTextBlocks";

interface PrivacyProps {
  content: PortableTextBlock[];
  paddingY?: string;
}

export default function Privacy({ content, paddingY }: PrivacyProps) {
  // Apply transformPortableTextBlocks to portableTextBlock before rendering to fix Polish orphans on the end of each line.
  const newContent = transformPortableTextBlocks(content);

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
