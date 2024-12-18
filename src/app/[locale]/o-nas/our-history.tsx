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
    <section className={clsx("mx-auto bg-white text-zinc-950/90", paddingY)}>
      <MaxWidthWrapper>
        <SectionTitle
          title={title}
          as="h2"
          motionPreset="blur-left"
          textColor="black"
          textAlign="center"
        />
        <div className="mx-auto mt-6 max-w-[46rem] text-center text-lg text-zinc-700">
          Od skromnych początków do pozycji lidera w konserwacji zabytków –
          nasza historia to lata wyzwań i sukcesów, które ukształtowały Renomę.
          Zapraszamy do poznania kluczowych momentów, które zbudowały nasze
          doświadczenie i zaufanie klientów.
        </div>
      </MaxWidthWrapper>

      <div className="mt-12 bg-zinc-100 p-16">
        <MaxWidthWrapper>
          <Timeline events={events} />
        </MaxWidthWrapper>
      </div>
    </section>
  );
}
