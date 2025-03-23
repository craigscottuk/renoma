import fixPolishOrphans from "./fixPolishOrphans";
import { PortableTextBlock } from "@portabletext/react";

interface BlockChild {
  _type: string;
  text?: string;
}

// Transforms Portable Text blocks by fixing Polish orphans in text spans.
export function transformPortableTextBlocks(blocks: PortableTextBlock[]) {
  return blocks.map((block) => {
    if (block._type === "block") {
      return {
        ...block,
        children: block.children?.map((child: BlockChild) => {
          if (child._type === "span" && typeof child.text === "string") {
            return { ...child, text: fixPolishOrphans(child.text) };
          }
          return child;
        }),
      };
    }
    return block;
  });
}
