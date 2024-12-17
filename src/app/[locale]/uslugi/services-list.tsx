"use client";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SectionTitle from "@/components/section-title";
import ImageCarousel from "@/components/ImageCarousel";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

import { Separator } from "@/components/ui/separator";
import MaxWidthWrapper from "@/components/max-width-wrapper";

type ImageType = {
  asset: SanityImageSource | string;
  caption?: string;
};

interface Service {
  title: string;
  description: string;
  actions: { title: string; content: string }[];
  images?: ImageType[];
}

interface ServiceGroup {
  title: string;
  services: Service[];
}

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

export default function ServicesList({
  serviceGroups,
}: {
  serviceGroups: ServiceGroup[];
  paddingY?: string;
}) {
  const [currentSection, setCurrentSection] = useState(
    serviceGroups && serviceGroups.length > 0 ? serviceGroups[0].title : "",
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedHeight, setExpandedHeight] = useState(0);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.getAttribute("data-title") || "");
          }
        });
      },
      { threshold: 0.6 },
    );

    const sections = Object.values(sectionRefs.current);
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
      observer.disconnect();
    };
  }, [serviceGroups]);

  useEffect(() => {
    if (dropdownRef.current) {
      setExpandedHeight(isExpanded ? dropdownRef.current.scrollHeight : 0);
    }
  }, [isExpanded]);

  const scrollToSection = (title: string) => {
    const id = title.toLowerCase().replace(/\s+/g, "-");
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsExpanded(false);
    setExpandedHeight(0);
  };

  return (
    <section className={clsx("mx-auto")}>
      {/* Secondary Navigation */}
      <div
        className="fixed left-0 right-0 top-20 z-40 overflow-hidden bg-zinc-950/90 text-white transition-[height] duration-300 ease-in-out lg:hidden"
        style={{ height: `${48 + expandedHeight}px` }}
      >
        <div
          className="flex h-12 cursor-pointer items-center justify-between px-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center">
            <Button variant="link" className="h-auto p-0 text-white">
              Usługi
            </Button>
            <span className="mx-2">›</span>
            <span className="max-w-[150px] truncate text-sm">
              {currentSection}
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
        <div
          className="overflow-hidden bg-gray-800 transition-[height] duration-300 ease-in-out"
          ref={dropdownRef}
        >
          {serviceGroups?.map((group) => (
            <div
              key={group.title}
              className={cn(
                "cursor-pointer px-4 py-2 hover:bg-gray-700",
                currentSection === group.title && "bg-gray-700",
              )}
              onClick={() => scrollToSection(group.title)}
            >
              {group.title}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="">
        {serviceGroups?.map((group, index) => (
          <section
            key={group.title}
            // @ts-expect-error: TypeScript cannot infer the type of the ref correctly
            ref={(el) => (sectionRefs.current[group.title] = el)}
            data-title={group.title}
            className={clsx(
              index % 2 === 0 ? "bg-gray-50" : "bg-gray-100",
              "pt-20",
            )}
          >
            <MaxWidthWrapper>
              <div className="flex-between flex">
                <div className="mb-10 w-1/2">
                  <SectionTitle
                    title={group.title}
                    textColor="black"
                    className=""
                  />
                </div>

                <div className="w-1/2">
                  <SectionTitle
                    title={`${index + 1}`}
                    textColor="black"
                    className=""
                    textAlign="right"
                  />
                </div>
              </div>

              <Separator className="mb-16" />

              {group.services.map((service, serviceIndex) => (
                <div
                  key={service.title}
                  className={cn(
                    "mb-16 lg:flex lg:items-start lg:gap-36",
                    serviceIndex % 2 === 1 && "flex-row-reverse",
                  )}
                >
                  <FadeInSection className="lg:w-1/2">
                    <button
                      onClick={() => scrollToSection(service.title)}
                      className="mb-6 cursor-pointer border-none bg-transparent p-0 text-left font-bolder text-[2rem] leading-tight tracking-[-0.015em]"
                    >
                      <h3
                        className="scroll-mt-40"
                        id={service.title.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {service.title}
                      </h3>
                    </button>
                    <p className="mb-8 text-[1.1rem] text-gray-700">
                      {service.description}
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                      {service.actions.map((action) => (
                        <AccordionItem key={action.title} value={action.title}>
                          <AccordionTrigger className="text-[1.3rem] leading-none">
                            {action.title}
                          </AccordionTrigger>
                          <AccordionContent className="mb-4">
                            <p className="text-gray-700">{action.content}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </FadeInSection>
                  <FadeInSection className="mt-8 pt-5 lg:mt-0 lg:w-1/2">
                    <ImageCarousel
                      images={
                        service.images?.map((img) => ({
                          src:
                            typeof img.asset === "string"
                              ? urlFor(img.asset)
                              : img.asset
                                ? urlFor(img.asset)
                                : "",
                          caption: img.caption || "",
                        })) || []
                      }
                      aspectRatio="landscape"
                    />
                  </FadeInSection>
                </div>
              ))}
            </MaxWidthWrapper>
          </section>
        ))}
      </div>
    </section>
  );
}
