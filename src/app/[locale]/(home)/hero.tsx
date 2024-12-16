// cSpell:disable
import Image from "next/image";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CustomButton from "@/components/ui/custom-button";
import SectionTitle from "@/components/section-title";

interface HeroSectionProps {
  title: string;
  sectionCTA: string;
}

export default function HeroSection({ title, sectionCTA }: HeroSectionProps) {
  return (
    <div className="relative mt-20 min-h-[calc(100vh-96px)] md:mt-24">
      {/* Background Image */}
      <Image
        src="/cover-img.webp"
        alt="Cover Image"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center">
        <MaxWidthWrapper>
          {/* Hero Title */}
          <SectionTitle
            title={title}
            as="h1"
            className="custom-class"
            motionPreset="blur-right"
            textColor="white"
          />
          {/* CTA Button */}
          <CustomButton
            className="motion-preset-blur-right delay-300"
            variant="dark"
            href="/uslugi"
          >
            {sectionCTA}
          </CustomButton>
        </MaxWidthWrapper>
      </div>
    </div>
  );
}
