import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Separator } from "@/components/ui/separator";
import { CarouselComparison } from "./carousel-comparison";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";

interface ComparisonSectionProps {
  title: string;
  content: PortableTextBlock[];
  comparisons: {
    title: string;
    imageBefore: string;
    imageAfter: string;
  }[];
}

export default function ComparisonSection({
  title,
  content,
  comparisons,
}: ComparisonSectionProps) {
  return (
    <section className="mb-16">
      <MaxWidthWrapper>
        <Separator className="mb-16" />

        <h2 className="mb-8 w-full max-w-[43rem] font-bolder text-[2rem] text-zinc-800">
          {title}
        </h2>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div className={`mb-20 flex flex-col lg:gap-24`}>
          {content?.length > 0 && (
            <div className="flex-1">
              <div className="text-pretty text-[1.1rem] leading-[1.75] lg:max-w-[30rem]">
                <PortableText
                  value={content || []}
                  components={portableTextComponents}
                />
              </div>
            </div>
          )}
          {comparisons?.length > 0 && (
            <div className="flex flex-col lg:w-4/5 lg:items-start">
              <div className="w-full">
                <CarouselComparison comparisons={comparisons} />
              </div>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
