// cSpell:disable

import MaxWidthWrapper from "@/components/max-width-wrapper";
import CustomButton from "@/components/ui/custom-button";

interface SectionUslugiHomeProps {
  sectionLabel: string;
  sectionTitle: string;
  sectionDescription: string;
  sectionCTA: string;
}

export default function SectionUslugiHome({
  sectionLabel,
  sectionTitle,
  sectionDescription,
  sectionCTA,
}: SectionUslugiHomeProps) {
  return (
    <section className="mx-auto bg-black py-16 text-white md:py-44">
      <MaxWidthWrapper>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-24">
          {/* Left Column */}
          <div className="space-y-4 md:space-y-8">
            <p className="text-sm uppercase tracking-wide">{sectionLabel}</p>
            <h2 className="text-4xl font-light leading-tight md:text-6xl">
              {sectionTitle}
            </h2>
          </div>

          {/* Right Column */}
          <div className="max-w-lg space-y-6 md:text-left">
            <p className="max-w-prose text-base leading-relaxed">
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
