// cSpell:disable
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CustomButton from "@/components/ui/custom-button";
import SectionTitle from "@/components/section-title";
import clsx from "clsx";
import SectionDescription from "@/components/section-description";
import FaqAccordion from "@/components/sections-home/faq-accordion";

interface SectionFaqHomeProps {
  label: string;
  title: string;
  description: string;
  sectionCTA: string;
  paddingY?: string;
  faqItems: {
    question: string;
    answer: string;
  }[];
}

export default function SectionFaqHome({
  label,
  title,
  description,
  sectionCTA,
  paddingY = "py-16 md:py-44", // Default padding values
  faqItems,
}: SectionFaqHomeProps) {
  return (
    <section className={clsx("mx-auto bg-white", paddingY)}>
      <MaxWidthWrapper>
        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-24">
          {/* Left Column */}
          <SectionTitle
            label={label}
            title={title}
            as="h2"
            motionPreset="blur-left"
            textColor="black"
            textAlign="left"
          />

          {/* Right Column */}
          <div className="flex flex-col items-end">
            <div className="md:max-w-[38rem]">
              <SectionDescription
                description={description}
                textAlign="left"
                textColor="black"
              />
            </div>
          </div>
        </div>
        <div className="mt-7 bg-black p-8 md:mt-12 md:p-16">
          <FaqAccordion faqItems={faqItems} />
          <div className="w-full text-left">
            <CustomButton variant="dark" href="/uslugi">
              {sectionCTA}
            </CustomButton>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
