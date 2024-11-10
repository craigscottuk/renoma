// cSpell:disable

import Image from "next/image";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CustomButton from "@/components/ui/custom-button";
import HeroTitle from "@/components/hero-title";

interface HeroSectionProps {
  sectionTitle: string;
  sectionCTA: string;
}

export default function HeroSection({
  sectionTitle,
  sectionCTA,
}: HeroSectionProps) {
  return (
    <div className="relative mt-24 min-h-[calc(100vh-96px)]">
      {/* Background Image */}
      <Image
        src="/cover-img.png"
        alt="Cover Image"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <MaxWidthWrapper>
          <div className="items-center">
            {/* Left Column */}
            <div className="max-w-[22rem] space-y-24 text-left md:max-w-[43rem]">
              <HeroTitle
                title={sectionTitle}
                as="h1"
                className="custom-class"
                motionPreset="blur-left"
              />
              <div>
                <CustomButton
                  className="motion-preset-blur-right delay-300"
                  variant="dark"
                  href="/uslugi"
                >
                  {sectionCTA}
                </CustomButton>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
}
