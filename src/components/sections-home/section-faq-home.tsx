// cSpell:disable
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CustomButton from "@/components/ui/custom-button";
import SectionTitle from "@/components/section-title";
import clsx from "clsx";
import SectionDescription from "@/components/section-description";
import FaqAccordion from "@/components/sections-home/faq-accordion";

interface SectionFaqHomeProps {
  sectionLabel: string;
  sectionTitle: string;
  sectionDescription: string;
  sectionCTA: string;
  paddingY?: string;
}

export default function SectionFaqHome({
  sectionLabel,
  sectionTitle,
  sectionDescription,
  sectionCTA,
  paddingY = "py-16 md:py-44", // Default padding values
}: SectionFaqHomeProps) {
  return (
    <section className={clsx("mx-auto bg-white", paddingY)}>
      <MaxWidthWrapper>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-24">
          {/* Left Column */}
          <SectionTitle
            label={sectionLabel}
            title={sectionTitle}
            as="h2"
            motionPreset="blur-left"
            textColor="black"
            textAlign="left"
          />

          {/* Right Column */}
          <div className="flex flex-col items-end">
            <div className="md:max-w-[38rem]">
              <SectionDescription
                description={sectionDescription}
                textAlign="left"
                textColor="black"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div className="mt-20 bg-black px-2 py-12 md:px-24">
          <FaqAccordion />

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
