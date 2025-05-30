// cSpell:disable
import clsx from "clsx";
import SectionTitle from "@/components/section-title";
import CustomButton from "@/components/ui/custom-button";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import SectionDescription from "@/components/section-description";

export interface ServicesSectionProps {
  label: string;
  title: string;
  description: string;
  sectionCTA: string;
  paddingY?: string;
  servicesGroup: {
    serviceGroupOne: {
      title: string;
      services: {
        title: string;
        shortDescription: string;
      }[];
    };
    serviceGroupTwo: {
      title: string;
      services: {
        title: string;
        shortDescription: string;
      }[];
    };
    serviceGroupThree: {
      title: string;
      services: {
        title: string;
        shortDescription: string;
      }[];
    };
  };
}

export default function ServicesSection({
  label,
  title,
  description,
  sectionCTA,
  paddingY = "py-16 md:py-44",
}: ServicesSectionProps) {
  return (
    <section className={clsx("mx-auto bg-zinc-900 text-zinc-100", paddingY)}>
      <MaxWidthWrapper>
        <div className="relative grid items-center gap-6 pr-5 md:grid-cols-2 md:gap-24">
          {/* Left Column */}
          <SectionTitle
            label={label}
            title={title}
            as="h2"
            motionPreset="blur-left"
            textColor="white"
            textAlign="left"
            animateOnView={true}
            animationDirection="left"
          />

          {/* Right Column */}
          <div className="flex flex-col md:items-end">
            <div className="md:max-w-[38rem] md:pt-5">
              <SectionDescription
                description={description}
                textAlign="left"
                textColor="white"
                animateOnView={true}
                animationDirection="right"
                animationDirectionMobile="left"
              />
              <div className="w-full text-left">
                <CustomButton
                  animateOnView={true}
                  animationDirection="left"
                  variant="dark"
                  href="/uslugi"
                >
                  {sectionCTA}
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
