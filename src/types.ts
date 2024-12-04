import { PortableTextBlock } from "@portabletext/react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type CaseStudySectionContent = {
  _type: string;
  text?: PortableTextBlock[];
  images?: Array<{ asset: SanityImageSource | string; caption: string }>;
  text1?: PortableTextBlock[];
  text2?: PortableTextBlock[];
  images1?: Array<{ asset: SanityImageSource | string; caption: string }>;
  images2?: Array<{ asset: SanityImageSource | string; caption: string }>;
  image?: { asset: SanityImageSource | string; caption: string };
  aspectRatio?: "none" | "landscape" | "portrait" | "square";
  aspectRatio1?: "none" | "landscape" | "portrait" | "square";
  aspectRatio2?: "none" | "landscape" | "portrait" | "square";
};
