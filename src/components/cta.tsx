"use client";

import MaxWidthWrapper from "./max-width-wrapper";
import SectionDescription from "./section-description";
import SectionTitle from "./section-title";
import CustomButton from "./ui/custom-button";

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
}

export default function CTA({ title, description, buttonText }: CTAProps) {
  return (
    <section
      className="relative flex min-h-[400px] items-center bg-cover bg-center px-8 py-32"
      style={{
        background: `radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
                     radial-gradient(ellipse farthest-corner at left top, #FFFFAC 0%, #FFFFAC 6%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)`,
      }}
    >
      <MaxWidthWrapper>
        <div className="items-center lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="flex-1">
            <SectionTitle
              title={title}
              as="h2"
              motionPreset="blur-left"
              textColor="white"
              className="w-[45rem]"
              animateOnView={true}
              animationDirection="left"
            />
            <SectionDescription
              description={description}
              marginTop={true}
              textStyle="text-balance"
              textColor="white"
              animateOnView={true}
              animationDirection="left"
            />
          </div>
          <div className="flex justify-start lg:justify-end lg:self-end">
            <CustomButton
              variant="dark"
              animateOnView={true}
              animationDirection="left"
              href={"/kontakt"}
            >
              {buttonText}
            </CustomButton>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
