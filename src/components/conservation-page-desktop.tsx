"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  FileText,
  Calendar,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ProgressBar } from "@/components/progress-bar";

const sections = [
  {
    id: "badania",
    title: "Badania Konserwatorskie i Ekspertyzy",
    description:
      "Prowadzimy kompleksowe badania konserwatorskie wspierające ochronę zabytków. Nasze działania obejmują:",
    subsections: [
      {
        id: "ocena",
        title: "Ocena stanu zabytku",
        content:
          "Badania in situ w celu oceny stopnia zniszczenia, dokumentacja fotograficzna i opisowa, badania zasolenia i zawilgocenia oraz współpraca z ekspertami w zakresie analiz mikrobiologicznych.",
      },
      {
        id: "analiza",
        title: "Analiza materiałowa",
        content:
          "Ocenianie budowy, składu i właściwości oryginalnych i wtórnych materiałów, w tym technik użytych w dekoracjach wnętrz i stolarki architektonicznej.",
      },
      {
        id: "historia",
        title: "Badania historyczne",
        content:
          "Analiza materiałów archiwalnych i literatury w celu pełnego rozpoznania historii i funkcji zabytku.",
      },
    ],
    images: [
      {
        src: "/placeholder.svg?height=400&width=600",
        caption: "Detailed analysis of historical artifacts",
      },
      {
        src: "/placeholder.svg?height=400&width=600",
        caption: "On-site conservation assessment",
      },
      {
        src: "/placeholder.svg?height=400&width=600",
        caption: "Advanced imaging techniques for artifact study",
      },
    ],
  },
  {
    id: "programy",
    title: "Programy Prac Konserwatorskich",
    description:
      "Nasze programy konserwatorskie i restauratorskie zapewniają ochronę oraz przywrócenie estetyki obiektom zabytkowym. Skupiamy się na:",
    subsections: [
      {
        id: "tworzenie",
        title: "Tworzenie programów konserwatorskich",
        content:
          "Opracowywanie planów działań na podstawie badań, zgodnie z wytycznymi Narodowego Instytutu Dziedzictwa.",
      },
      {
        id: "planowanie",
        title: "Planowanie realizacji projektów",
        content:
          "Określanie priorytetów, etapów prac i dobór odpowiednich materiałów oraz technik.",
      },
      {
        id: "ocena-ryzyka",
        title: "Ocena ryzyka i monitorowanie",
        content:
          "Identyfikacja potencjalnych zagrożeń oraz monitorowanie stanu technicznego obiektów w trakcie i po zakończeniu prac.",
      },
    ],
    images: [
      {
        src: "/placeholder.svg?height=400&width=600",
        caption: "Comprehensive conservation planning process",
      },
    ],
  },
];

function ImageCarousel({
  images,
}: {
  images: { src: string; caption: string }[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCaption, setShowCaption] = useState(false);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentIndex(emblaApi.selectedScrollSnap());
        setShowCaption(false);
      });
    }
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="relative mb-6">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div
              className="relative aspect-video min-w-0 flex-[0_0_100%]"
              key={index}
            >
              <Image
                src={image.src}
                alt={image.caption}
                fill
                className="object-cover"
                loading="lazy"
              />
              <AnimatePresence>
                {showCaption && currentIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-sm text-white"
                  >
                    {image.caption}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 transform"
            onClick={scrollPrev}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 transform"
            onClick={scrollNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform space-x-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full",
                  index === currentIndex ? "bg-white" : "bg-white/50",
                )}
              />
            ))}
          </div>
        </>
      )}
      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-2 right-2"
        onClick={() => setShowCaption(!showCaption)}
        aria-label={showCaption ? "Hide caption" : "Show caption"}
      >
        <Info className="h-4 w-4" />
      </Button>
    </div>
  );
}

function FadeInSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ConservationPageDesktop() {
  const [currentSection, setCurrentSection] = useState(sections[0].title);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedHeight, setExpandedHeight] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const section of sections) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120) {
            current = section.title;
          } else {
            break;
          }
        }
      }
      if (current !== currentSection) {
        setCurrentSection(current);
      }
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection]);

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
    setIsExpanded(false);
    setExpandedHeight(0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <ProgressBar />
      {/* Top Navigation */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="text-2xl font-semibold">Logo</div>
          <nav className="hidden space-x-4 lg:flex">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                onClick={() => scrollToSection(section.id)}
              >
                {section.title}
              </Button>
            ))}
          </nav>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </header>

      {/* Secondary Navigation (Mobile Only) */}
      <div
        className="fixed left-0 right-0 top-16 z-40 overflow-hidden bg-black text-white transition-[height] duration-300 ease-in-out lg:hidden"
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
          style={{ height: expandedHeight }}
          ref={(el) => {
            if (el && isExpanded) {
              setExpandedHeight(el.scrollHeight);
            } else if (el && !isExpanded) {
              setExpandedHeight(0);
            }
          }}
        >
          {sections.map((section) => (
            <div
              key={section.id}
              className={cn(
                "cursor-pointer px-4 py-2 hover:bg-gray-700",
                currentSection === section.title && "bg-gray-700",
              )}
              onClick={() => scrollToSection(section.id)}
            >
              {section.title}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-16 lg:pt-24">
        <div className="container mx-auto px-4">
          {sections.map((section, index) => (
            <section
              key={section.id}
              ref={(el) => (sectionRefs.current[section.id] = el)}
              className="mb-24"
            >
              <div
                className={cn(
                  "lg:flex lg:items-center lg:gap-12",
                  index % 2 === 1 && "flex-row-reverse",
                )}
              >
                <FadeInSection className="lg:w-1/2">
                  <div className="mb-4 flex gap-4">
                    <div className="rounded-full bg-black p-2">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="rounded-full bg-black p-2">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h2 className="mb-6 text-4xl font-bold">{section.title}</h2>
                  <p className="mb-8 text-xl text-gray-700">
                    {section.description}
                  </p>
                  <Accordion type="single" collapsible className="w-full">
                    {section.subsections.map((subsection) => (
                      <AccordionItem key={subsection.id} value={subsection.id}>
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
                  <ImageCarousel images={section.images} />
                </FadeInSection>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          className="fixed bottom-4 right-4 rounded-full p-2"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
