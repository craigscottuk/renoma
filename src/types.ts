import { PortableTextBlock } from "@portabletext/react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type CaseStudySectionContent = {
  _type: string;
  heading3?: string;
  text?: PortableTextBlock[];

  images?: Array<{
    asset: SanityImageSource | string;
    caption: string;
    alt: string;
    aspectRatio?: string;
  }>;

  text1?: PortableTextBlock[];
  text2?: PortableTextBlock[];
  images1?: Array<{
    asset: SanityImageSource | string;
    caption: string;
    alt: string;
    aspectRatio?: string;
  }>;
  images2?: Array<{
    asset: SanityImageSource | string;
    caption: string;
    alt: string;
    aspectRatio?: string;
  }>;
  image?: {
    asset: SanityImageSource | string;
    caption: string;
    alt: string;
    aspectRatio?: string;
  };
  aspectRatio?: "none" | "landscape" | "portrait" | "square";
  aspectRatio1?: "none" | "landscape" | "portrait" | "square";
  aspectRatio2?: "none" | "landscape" | "portrait" | "square";
  text3?: PortableTextBlock[];
  images3?: Array<{
    asset: SanityImageSource | string;
    caption: string;
    alt: string;
    aspectRatio?: string;
  }>;
  aspectRatio3?: "none" | "landscape" | "portrait" | "square";
  layout?: "textLeftImageRight" | "imageLeftTextRight" | "textTopImageBottom";
};
