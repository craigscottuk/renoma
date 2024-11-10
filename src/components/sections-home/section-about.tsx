// cSpell:disable
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CustomButton from "@/components/ui/custom-button";
import SectionTitle from "@/components/section-title";
import clsx from "clsx";

interface SectionAboutProps {
  sectionLabel: string;
  sectionTitle: string;
  sectionDescription: string;
  sectionCTA: string;
  paddingY?: string;
}

export default function SectionAbout({
  sectionLabel,
  sectionTitle,
  sectionDescription,
  sectionCTA,
  paddingY = "py-16 md:py-44", // Default padding values
}: SectionAboutProps) {
  return (
    <section className={clsx("mx-auto bg-white", paddingY)}>
      <MaxWidthWrapper>
        <div className="grid gap-12 md:grid-cols-2 md:gap-24">
          {/* Right Column (Heading and Title) for Mobile, Hidden on Desktop */}
          <div className="md:hidden">
            <SectionTitle
              label={sectionLabel}
              title={sectionTitle}
              as="h2"
              motionPreset="blur-left"
              textColor="black"
            />
          </div>

          {/* Left Column (Text Content) */}
          <div className="flex h-full flex-col justify-center space-y-6">
            <p className="max-w-sm text-base leading-relaxed md:max-w-md">
              {sectionDescription}
            </p>
          </div>

          {/* Right Column (Heading, Title, and Button) for Desktop */}
          <div className="hidden md:flex md:flex-col md:items-end">
            <SectionTitle
              label={sectionLabel}
              title={sectionTitle}
              as="h2"
              motionPreset="blur-left"
              textColor="black"
              textAlign="right"
            />
            <CustomButton variant="light" href="/o-nas">
              {sectionCTA}
            </CustomButton>
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
