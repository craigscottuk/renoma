// cSpell:disable
import clsx from "clsx";
import Timeline, { TimelineEvent } from "./timeline";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/max-width-wrapper";

interface OurHistoryProps {
  title: string;
  events: TimelineEvent[];
  paddingY: string;
}

export default function OurHistory({
  events,
  title,
  paddingY,
}: OurHistoryProps) {
  return (
    <section className={clsx("mx-auto bg-black text-white/90", paddingY)}>
      <MaxWidthWrapper>
        <SectionTitle
          title={title}
          as="h2"
          motionPreset="blur-left"
          textColor="black"
          textAlign="center"
        />

        <div className="mt-10 px-4 py-20">
          <Timeline events={events} />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
