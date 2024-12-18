"use client";
// cSpell:disable
import clsx from "clsx";
import SectionTitle from "@/components/section-title";
import CustomButton from "@/components/ui/custom-button";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import SectionDescription from "@/components/section-description";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface FaqAccordionProps {
  faqItems: {
    question: string;
    answer: string;
  }[];
}
interface SectionFaqHomeProps {
  label: string;
  title: string;
  description: string;
  sectionCTA: string;
  paddingY?: string;
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

export default function SectionFaqHome({
  label,
  title,
  description,
  sectionCTA,
  paddingY = "py-16 md:py-44", // Default padding values
  faqItems,
}: SectionFaqHomeProps) {
  return (
    <section className={clsx("mx-auto bg-zinc-200", paddingY)}>
      <MaxWidthWrapper>
        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-24">
          {/* Left Column */}
          <SectionTitle
            label={label}
            title={title}
            as="h2"
            motionPreset="blur-left"
            textColor="black"
            textAlign="left"
            animateOnView={true}
            animationDirection="left"
          />

          {/* Right Column */}
          <div className="flex flex-col items-end">
            <div className="md:max-w-[38rem]">
              <SectionDescription
                description={description}
                textAlign="left"
                textColor="black"
                animateOnView={true}
                animationDirection="right"
              />
            </div>
          </div>
        </div>
        <div className="mt-7 bg-zinc-900 p-8 md:mt-16 md:px-12 md:pb-20 md:pt-8">
          <FadeInSection>
            <FaqAccordion faqItems={faqItems} />
          </FadeInSection>
          <div className="w-full text-left">
            <CustomButton
              animateOnView={true}
              animationDirection="left"
              variant="dark"
              href="/uslugi"
            >
              {sectionCTA}
            </CustomButton>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

// ====================
// FAQ Accordion Component
// ====================

function FaqAccordion({ faqItems }: FaqAccordionProps) {
  return (
    <div className="mx-auto w-full bg-zinc-900">
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem
            className={clsx("border-zinc-200/40", {
              "border-b-0": index === faqItems.length - 1,
            })}
            key={index}
            value={`item-${index}`}
          >
            <AccordionTrigger className="text-[1.4rem] text-zinc-100">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="max-w-[95%] text-pretty pb-6 text-[1.1rem] text-zinc-300">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
