"use client";
// cSpell:disable
import clsx from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedLink from "@/components/animated-link";
import { useLocale } from "next-intl";
import { SectionUslugiHomeProps } from "./uslugi"; // Adjust the import path if necessary
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  FolderOpen,
  ClipboardList,
  Microscope,
  HardHat,
  BrickWall,
  Brush,
  Landmark,
  // FileCheck,
  HandCoins,
} from "lucide-react";

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

function ServicesCards({
  servicesGroup,
}: {
  servicesGroup: SectionUslugiHomeProps["servicesGroup"];
}) {
  const locale = useLocale();

  const serviceGroups = [
    servicesGroup.serviceGroupOne,
    servicesGroup.serviceGroupTwo,
    servicesGroup.serviceGroupThree,
  ];

  const icons = [
    [FolderOpen, ClipboardList, Microscope],
    [HardHat, BrickWall, Brush],
    [Landmark, HandCoins],
  ];

  return (
    <FadeInSection className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3">
      {serviceGroups.map((group, index) => (
        <Card key={index} className="border-zinc-700 bg-zinc-800 text-zinc-100">
          <CardHeader>
            <div className="mb-5 flex space-x-4">
              {icons[index].map((Icon, iconIndex) => (
                <Icon key={iconIndex} className="h-6 w-6 text-gold-900" />
              ))}
            </div>
            <CardTitle className="font-regular text-[1.7rem] leading-tight tracking-[-0.015em]">
              {group.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text flex flex-col space-y-4 text-[1.1rem] text-zinc-200">
            <Accordion type="multiple" className="w-full">
              {group.services.map((item, itemIndex) => (
                <AccordionItem
                  className={clsx("border-zinc-700", {
                    "border-none": itemIndex === group.services.length - 1,
                  })}
                  key={itemIndex}
                  value={`item-${itemIndex}`}
                >
                  <AccordionTrigger className="text-left text-[1.2rem]">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-balance text-[1.1rem]">
                    <p className="mb-6">{item.shortDescription}</p>
                    <AnimatedLink
                      showArrow={true}
                      href={`/uslugi#${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      variant="dark"
                      className="text-base"
                    >
                      {locale === "pl"
                        ? "Więcej"
                        : locale === "en"
                          ? "More"
                          : "Mehr"}
                    </AnimatedLink>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </FadeInSection>
  );
}

export default ServicesCards;
