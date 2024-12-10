// cSpell:disable
import clsx from "clsx";
import JobOfferCard from "./job-offer";
import { PortableTextBlock } from "next-sanity";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/max-width-wrapper";

interface SectionJobOfferProps {
  title: string;
  paddingY?: string;
  jobOffers: {
    jobTitle: string;
    jobDescription: string;
    jobLocation: string;
    jobType: string;
    responsibilities: PortableTextBlock[];
    requirements: PortableTextBlock[];
    benefits: PortableTextBlock[];
  }[];
}

export default function SectionJobOffer({
  title,
  paddingY = "py-16 md:py-44",
  jobOffers,
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

        <div className="container mx-auto px-4 py-8">
          {jobOffers.map((job, index) => (
            <JobOfferCard key={index} job={job} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
