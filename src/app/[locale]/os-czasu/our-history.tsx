"use client";
// cSpell:disable
import clsx from "clsx";
import Timeline, { TimelineEvent } from "./timeline";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { FadeInSection } from "@/components/fade-in-section";

interface OurHistoryProps {
  title: string;
  text: string;
  events: TimelineEvent[];
  paddingY: string;
}

export default function OurHistory({
  events,
  title,
  text,
  paddingY,
}: OurHistoryProps) {
  return (
    <section className={clsx("mx-auto bg-white text-zinc-950/90", paddingY)}>
      <MaxWidthWrapper>
        <FadeInSection>
          <SectionTitle
            title={title}
            as="h2"
            motionPreset="blur-left"
            textColor="black"
            textAlign="center"
          />
          <div className="mx-auto mt-6 max-w-[46rem] text-center text-lg text-zinc-700">
            {text}
          </div>
        </FadeInSection>
      </MaxWidthWrapper>

      <div className="mt-12 bg-zinc-100 p-16 pb-48">
        <MaxWidthWrapper>
          <Timeline events={events} />
        </MaxWidthWrapper>
      </div>
    </section>
  );
}
