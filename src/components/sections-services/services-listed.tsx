"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import ImageCarousel from "@/components/ImageCarousel";
import { urlFor } from "@/sanity/lib/image";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type ImageType = {
  asset: SanityImageSource | string;
  caption?: string;
};

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

export default function ServicesListed({
  services,
}: {
  services: {
    title: string;
    description: string;
    actions: { title: string; content: string }[];
    images?: ImageType[];
  }[];
}) {
  const [currentSection, setCurrentSection] = useState(services[0].title);
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
  }, [services]);

  useEffect(() => {
    if (dropdownRef.current) {
      setExpandedHeight(isExpanded ? dropdownRef.current.scrollHeight : 0);
    }
  }, [isExpanded]);

  const scrollToSection = (title: string) => {
    sectionRefs.current[title]?.scrollIntoView({ behavior: "smooth" });
    setIsExpanded(false);
    setExpandedHeight(0);
  };

  return (
    <section>
      {/* Secondary Navigation */}
      <div
        className="fixed left-0 right-0 top-20 z-40 overflow-hidden bg-black/90 text-white transition-[height] duration-300 ease-in-out lg:hidden"
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
          {services.map((section) => (
            <div
              key={section.title}
              className={cn(
                "cursor-pointer px-4 py-2 hover:bg-gray-700",
                currentSection === section.title && "bg-gray-700",
              )}
              onClick={() => scrollToSection(section.title)}
            >
              {section.title}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-16 lg:pt-24">
        <div className="container mx-auto px-4">
          {services.map((section, index) => (
            <section
              key={section.title}
              ref={(el) => (sectionRefs.current[section.title] = el)}
              data-title={section.title}
              className="mb-24"
            >
              <div
                className={cn(
                  "lg:flex lg:items-center lg:gap-12",
                  index % 2 === 1 && "flex-row-reverse",
                )}
              >
                <FadeInSection className="lg:w-1/2">
                  <h2 className="mb-6 font-bolder text-3xl">{section.title}</h2>
                  <p className="mb-8 text-xl text-gray-700">
                    {section.description}
                  </p>
                  <Accordion type="single" collapsible className="w-full">
                    {section.actions.map((subsection) => (
                      <AccordionItem
                        key={subsection.title}
                        value={subsection.title}
                      >
                        <AccordionTrigger>{subsection.title}</AccordionTrigger>
                        <AccordionContent>
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-gray-700">
                              {subsection.content}
                            </p>
                          </motion.div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </FadeInSection>
                <FadeInSection className="mt-8 lg:mt-0 lg:w-1/2">
                  <ImageCarousel
                    images={
                      section.images?.map((img) => ({
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
            </section>
          ))}
        </div>
      </main>
    </section>
  );
}
