// cSpell:disable
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CustomButton from "@/components/ui/custom-button";
import SectionTitle from "@/components/section-title";
import clsx from "clsx";
import SectionDescription from "@/components/section-description";

interface SectionAboutProps {
  label: string;
  title: string;
  description: string;
  sectionCTA: string;
  paddingY?: string;
}

export default function SectionAbout({
  label,
  title,
  description,
  sectionCTA,
  paddingY = "py-16 md:py-44",
}: SectionAboutProps) {
  return (
    <section className={clsx("mx-auto bg-white", paddingY)}>
      <MaxWidthWrapper>
        <div className="grid gap-0 md:grid-cols-2 md:gap-24">
          {/* Right Column (Heading and Title) for Mobile, Hidden on Desktop */}
          <div className="mb-6 md:hidden">
            <SectionTitle
              label={label}
              title={title}
              as="h2"
              motionPreset="blur-left"
              textColor="black"
              animateOnView={true}
              animationDirection="left"
            />
          </div>

          {/* Left Column (Text Content) */}
          <div className="flex h-full flex-col justify-center space-y-6">
            <SectionDescription
              description={description}
              textAlign="left"
              textColor="black"
            />
          </div>

          {/* Right Column (Heading, Title, and Button) for Desktop */}
          <div className="hidden md:flex md:flex-col md:items-end">
            <SectionTitle
              label={label}
              title={title}
              as="h2"
              motionPreset="blur-right"
              textColor="black"
              textAlign="right"
              animateOnView={true}
              animationDirection="right"
              delay={2}
            />
            <CustomButton
              variant="light"
              animateOnView={true}
              animationDirection="right"
              href="/o-nas"
            >
              {sectionCTA}
            </CustomButton>
          </div>

          {/* Button for Mobile, Hidden on Desktop */}
          <div className="text-left md:hidden">
            <CustomButton
              variant="light"
              animateOnView={true}
              animationDirection="left"
              href="/o-nas"
            >
              {sectionCTA}
            </CustomButton>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
