"use client";
import clsx from "clsx";
import JobOfferCard from "./job-offer";
import { PortableTextBlock } from "next-sanity";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { FadeInSection } from "@/components/fade-in-section";

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
  paddingY = "py-16 md:py-32",
  jobOffers,
}: SectionJobOfferProps) {
  return (
    <section className={clsx("mx-auto bg-zinc-200", paddingY)}>
      <MaxWidthWrapper>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-24">
          {/* Left Column */}
          <FadeInSection>
            <SectionTitle
              title={title}
              as="h2"
              motionPreset="blur-left"
              textColor="black"
              textAlign="left"
            />
          </FadeInSection>
        </div>

        <div className="mx-auto px-4 py-12">
          {jobOffers.map((job, index) => (
            <JobOfferCard key={index} job={job} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
