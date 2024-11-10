// cSpell:disable
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CustomButton from "@/components/ui/custom-button";
import SectionTitle from "@/components/section-title";
import clsx from "clsx";

interface SectionUslugiHomeProps {
  sectionLabel: string;
  sectionTitle: string;
  sectionDescription: string;
  sectionCTA: string;
  paddingY?: string;
}

export default function SectionUslugiHome({
  sectionLabel,
  sectionTitle,
  sectionDescription,
  sectionCTA,
  paddingY = "py-16 md:py-44", // Default padding values
}: SectionUslugiHomeProps) {
  return (
    <section className={clsx("mx-auto bg-black text-white", paddingY)}>
      <MaxWidthWrapper>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-24">
          {/* Left Column */}
          <SectionTitle
            label={sectionLabel}
            title={sectionTitle}
            as="h2"
            motionPreset="blur-left"
            textColor="white"
            textAlign="left"
          />

          {/* Right Column */}
          <div className="max-w-lg md:text-left">
            <p className="max-w-md text-base leading-relaxed">
              {sectionDescription}
            </p>
            <div>
              <CustomButton variant="dark" href="/uslugi">
                {sectionCTA}
              </CustomButton>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
