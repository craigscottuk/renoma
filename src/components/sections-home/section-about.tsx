// cSpell:disable

import MaxWidthWrapper from "@/components/max-width-wrapper";
import CustomButton from "@/components/ui/custom-button";

interface SectionAboutProps {
  sectionLabel: string;
  sectionTitle: string;
  sectionDescription: string;
  sectionCTA: string;
}

function SectionAbout({
  sectionLabel,
  sectionTitle,
  sectionDescription,
  sectionCTA,
}: SectionAboutProps) {
  return (
    <section className="mx-auto bg-white py-16 md:py-44">
      <MaxWidthWrapper>
        <div className="grid gap-12 md:grid-cols-2 md:gap-24">
          {/* Right Column (Heading and Title) for Mobile, Hidden on Desktop */}
          <div className="space-y-4 md:hidden">
            <p className="text-left text-sm tracking-wide">{sectionLabel}</p>
            <h2 className="text-6xl font-light leading-tight">
              {sectionTitle}
            </h2>
          </div>

          {/* Left Column (Text Content) */}
          <div className="flex h-full flex-col justify-center space-y-6">
            <p className="max-w-md text-base leading-relaxed">
              {sectionDescription}
            </p>
          </div>

          {/* Right Column (Heading, Title, and Button) for Desktop */}
          <div className="hidden space-y-8 md:flex md:flex-col md:items-end">
            <p className="text-sm uppercase tracking-wide">{sectionLabel}</p>
            <h2 className="text-right text-4xl font-light leading-tight md:text-6xl">
              {sectionTitle}
            </h2>
            <div>
              <CustomButton variant="light" href="/o-nas">
                {sectionCTA}
              </CustomButton>
            </div>
          </div>

          {/* Button for Mobile, Hidden on Desktop */}
          <div className="text-left md:hidden">
            <CustomButton variant="light" href="/o-nas">
              {sectionCTA}
            </CustomButton>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default SectionAbout;
