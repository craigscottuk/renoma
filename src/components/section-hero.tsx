// cSpell:disable

import Image from "next/image";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CustomButton from "@/components/ui/custom-button";

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
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-24">
            {/* Left Column */}
            <div className="space-y-4 md:space-y-8">
              <h2 className="motion-preset-blur-right text-4xl font-light leading-tight md:text-6xl">
                {sectionTitle}
              </h2>
              <div>
                <CustomButton
                  className="motion-preset-blur-right"
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
