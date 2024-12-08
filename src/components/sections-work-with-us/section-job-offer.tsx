// cSpell:disable
import MaxWidthWrapper from "@/components/max-width-wrapper";
import SectionTitle from "@/components/section-title";
import clsx from "clsx";
import JobOffer from "./job-offer";

interface SectionJobOfferProps {
  title: string;
  paddingY?: string;
}

export default function SectionJobOffer({
  title,
  paddingY = "py-16 md:py-44", // Default padding values
}: SectionJobOfferProps) {
  return (
    <section className={clsx("mx-auto bg-white", paddingY)}>
      <MaxWidthWrapper>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-24">
          {/* Left Column */}
          <SectionTitle
            title={title}
            as="h2"
            motionPreset="blur-left"
            textColor="black"
            textAlign="left"
          />
        </div>

        <JobOffer />
      </MaxWidthWrapper>
    </section>
  );
}
