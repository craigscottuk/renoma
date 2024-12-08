import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "../env";

// Initialize the image URL builder with project ID and dataset
const builder = createImageUrlBuilder({ projectId, dataset });

// Helper function to generate optimized image URLs with dynamic longest edge capping
export const urlFor = (source: SanityImageSource, maxSize = 1200) => {
  return builder
    .image(source)
    .auto("format") // Serve WebP format if supported by the browser
    .fit("max") // Maintain aspect ratio within specified dimensions
    .width(maxSize) // Cap to limit the longest edge while preserving aspect ratio
    .url();
};

// Helper function to generate Open Graph (OG) images with recommended dimensions
export function resolveOpenGraphImage(
  image: SanityImageSource | undefined,
  width = 1200,
  height = 627,
) {
  if (!image) return undefined;

  // Build the Open Graph URL with crop fitting and specified dimensions
  const url = builder
    .image(image)
    .auto("format")
    .width(width)
    .height(height)
    .fit("crop")
    .url();

  return url
    ? { url, alt: (image as any)?.alt || "Open Graph Image", width, height }
    : undefined;
}

// Usage Example in a Next.js Page
// https://github.com/vercel/next.js/blob/canary/examples/cms-sanity/sanity/lib/utils.ts

// import Head from "next/head";
// import { resolveOpenGraphImage } from "@/sanity/lib/image";

// const ogImage = resolveOpenGraphImage(image); // Pass your OG image source here

// <Head>
//   <meta property="og:image" content={ogImage?.url} />
//   <meta property="og:image:width" content={ogImage?.width.toString()} />
//   <meta property="og:image:height" content={ogImage?.height.toString()} />
//   <meta property="og:image:alt" content={ogImage?.alt} />
// </Head>
