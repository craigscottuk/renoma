"use client";
// cSpell:disable
import clsx from "clsx";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import fixPolishOrphans from "@/utils/fixPolishOrphans";
import AnimatedLink from "@/components/animated-link";
import SectionTitle from "@/components/section-title";

import { FadeInSection } from "@/components/fade-in-section";
import { Separator } from "@/components/ui/separator";

interface FaqAccordionProps {
  faqItems: {
    question: string;
    answer: string;
  }[];
}
interface SectionFaqHomeProps {
  faqItems: {
    question: string;
    answer: string;
  }[];
}

// ====================
// FAQ Section
// ====================

export default function SectionFaqHome({ faqItems }: SectionFaqHomeProps) {
  return (
    <section className="mx-auto bg-zinc-200 py-16">
      <MaxWidthWrapper>
        <FadeInSection translateY>
          <SectionTitle title={"FAQ"} className="mb-7" textColor="black" />
        </FadeInSection>
        <FadeInSection translateY>
          <Separator className="mb-10" />
        </FadeInSection>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <FadeInSection translateY>
          <div className="mx-auto w-full bg-zinc-100 px-5 py-1 md:px-6 md:py-3 lg:px-8 lg:py-6">
            <FaqAccordion faqItems={faqItems} />
          </div>
        </FadeInSection>
      </MaxWidthWrapper>
    </section>
  );
}

// ====================
// FAQ Accordion Component
// ====================

function FaqAccordion({ faqItems }: FaqAccordionProps) {
  return (
    <div className="mx-auto w-full">
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <FadeInSection translateY>
            <AccordionItem
              className={clsx("py-3", {
                "border-b-0": index === faqItems.length - 1,
              })}
              key={index}
              value={`item-${index}`}
            >
              <AccordionTrigger className="text-[1.3rem] leading-snug text-zinc-900 lg:text-[1.4rem]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-pretty pb-6 text-[1.1rem] text-zinc-900 md:max-w-[95%] lg:max-w-[90%]">
                <div>{fixPolishOrphans(item.answer)}</div>
                <AnimatedLink
                  className="mt-10 text-[1.1rem] text-zinc-950"
                  href={"/uslugi"}
                >
                  Sprawdź nasze usługi
                </AnimatedLink>
              </AccordionContent>
            </AccordionItem>
          </FadeInSection>
        ))}
      </Accordion>
    </div>
  );
}
