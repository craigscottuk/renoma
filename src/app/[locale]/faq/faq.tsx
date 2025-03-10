// src/app/[locale]/faq/faq.tsx
// cSpell:disable
"use client";
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

function FadeInSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, controls } = useIntersectionObserver({
    animateOnView: true,
    threshold: 0.3,
    once: true, // Animate only once
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function SectionFaqHome({ faqItems }: SectionFaqHomeProps) {
  return (
    <section className="mx-auto bg-zinc-200 py-16">
      <MaxWidthWrapper>
        <FadeInSection>
          <FaqAccordion faqItems={faqItems} />
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
          <AccordionItem
            className={clsx("border-zinc-950/40", {
              "border-b-0": index === faqItems.length - 1,
            })}
            key={index}
            value={`item-${index}`}
          >
            <AccordionTrigger className="text-[1.4rem] text-zinc-950">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="max-w-[90%] text-pretty pb-6 text-[1.1rem] text-zinc-900">
              <div>{fixPolishOrphans(item.answer)}</div>
              <AnimatedLink
                className="text-`zinc-900 mt-5 text-base"
                href={"/uslugi"}
              >
                Sprawdź nasze usługi
              </AnimatedLink>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
