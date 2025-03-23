// cSpell:disable
import clsx from "clsx";
import SectionTitle from "@/components/section-title";
import CustomButton from "@/components/ui/custom-button";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import SectionDescription from "@/components/section-description";

interface AboutSectionProps {
  label: string;
  title: string;
  description: string;
  sectionCTA: string;
  paddingY?: string;
}

export default function AboutSection({
  label,
  title,
  description,
  sectionCTA,
  paddingY = "py-16 md:py-44",
}: AboutSectionProps) {
  return (
    <section className={clsx("mx-auto bg-white", paddingY)}>
      <MaxWidthWrapper>
        <div className="grid pr-5 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Right Column (Heading and Title) for Mobile, Hidden on Desktop */}
          <div className="mb-7 md:hidden">
            <SectionTitle
              label={label}
              title={title}
              as="h2"
              motionPreset="blur-up"
              textColor="black"
              animateOnView={true}
              animationDirection="up"
            />
          </div>

          {/* Left Column (Text Content) */}
          <div className="flex h-full flex-col justify-center space-y-6">
            <SectionDescription
              description={description}
              textAlign="left"
              textColor="black"
              animateOnView={true}
              animationDirection="left"
              animationDirectionMobile="up"
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
            />
            <CustomButton
              variant="light"
              animateOnView={true}
              animationDirection="up"
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
