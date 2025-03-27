// cSpell:disable
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CustomButton from "@/components/ui/custom-button";
import SectionTitle from "@/components/section-title";
import MuxPlayer from "@mux/mux-player-react";

interface HeroSectionProps {
  title: string;
  sectionCTA: string;
}

export default function HeroSection({ title, sectionCTA }: HeroSectionProps) {
  return (
    <div className="relative mt-20 min-h-[calc(40vh)] md:mt-24 md:min-h-[calc(60vh)] lg:min-h-[calc(100vh-96px)]">
      {/* Background Video */}

      <MuxPlayer
        streamType="on-demand"
        playbackId="xgOUTdWiGS2xzXqzdu02003z2Q01ILmhBPPk802mW21t2JM"
        metadataVideoTitle="Renoma"
        metadataViewerUserId="Renoma"
        thumbnailTime={0}
        loop={true}
        muted={true}
        autoPlay={true}
      />

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-zinc-900 bg-opacity-25"></div>

      {/* HeroSection Content */}
      <div className="absolute inset-0 flex items-center">
        <MaxWidthWrapper>
          {/* HeroSection Title */}
          <SectionTitle
            title={title}
            as="h1"
            className="custom-class"
            motionPreset="blur-right"
            textColor="white"
          />
          {/* CTA Button */}
          <CustomButton
            className="motion-preset-blur-right-lg motion-delay-2000"
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
