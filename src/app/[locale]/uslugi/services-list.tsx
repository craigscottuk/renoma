"use client";

import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { urlFor } from "@/sanity/lib/image";
import { ChevronDown, ChevronUp, Text } from "lucide-react";
import SectionTitle from "@/components/section-title";
import ImageCarousel from "@/components/ImageCarousel";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { FadeInSection } from "@/components/fade-in-section";
import fixPolishOrphans from "@/utils/fixPolishOrphans";
import { Separator } from "@/components/ui/separator";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CustomButton from "@/components/ui/custom-button";

// -------------------------------------------------------
// A simple hook to detect if the screen is < 1024px wide
// (i.e., below Tailwind's "lg" breakpoint).
// -------------------------------------------------------
function useIsMobileOrTablet() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobileOrTablet;
}

// -------------------------------------------------------
// Type Definitions
// -------------------------------------------------------
type ImageType = {
  asset: SanityImageSource | string;
  caption?: string;
  aspectRatio?: "standard" | "wide";
};

interface Service {
  title: string;
  description: string;
  actions: { title: string; content: string }[];
  images?: ImageType[];
  addLinkToRenomaLab?: boolean;
}

interface ServiceGroup {
  title: string;
  services: Service[];
}

// -------------------------------------------------------
// Main Component
// -------------------------------------------------------
export default function ServicesList({
  serviceGroups,
  paddingY = "py-12 lg:py-32",
}: {
  serviceGroups: ServiceGroup[];
  paddingY?: string;
}) {
  const [currentGroup, setCurrentGroup] = useState(
    serviceGroups?.[0]?.title ?? "",
  );
  const [currentService, setCurrentService] = useState(
    serviceGroups?.[0]?.services?.[0]?.title ?? "",
  );

  const [menuOpen, setMenuOpen] = useState(false);

  // Replace single expandedGroup with a Set for multiple groups
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // IntersectionObserver refs
  const serviceRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Detect if on mobile or tablet
  const isMobileOrTablet = useIsMobileOrTablet();

  // Add new state for tracking scroll transition
  const [isScrollingToService, setIsScrollingToService] = useState(false);

  // Add state to track if ServicesList is in viewport
  const [isComponentInView, setIsComponentInView] = useState(false);
  const componentRef = useRef<HTMLElement>(null);

  // Track when ServicesList enters/leaves viewport with more precision
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsComponentInView(entry.isIntersecting);

        // If we're leaving the component view, reset current service
        if (!entry.isIntersecting) {
          setCurrentService("");
        }
      },
      {
        rootMargin: "-10% 0px -70% 0px", // Adjusted margins to better detect component visibility
        threshold: [0, 0.1, 0.2], // Multiple thresholds for better detection
      },
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Separate effect to handle service detection when component becomes visible
  useEffect(() => {
    if (isComponentInView) {
      // Find the currently visible service
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const serviceTitle =
                entry.target.getAttribute("data-service-title");
              const groupTitle = entry.target.getAttribute("data-group-title");
              if (serviceTitle && groupTitle) {
                setCurrentService(serviceTitle);
                setCurrentGroup(groupTitle);
              }
            }
          });
        },
        {
          rootMargin: "-20% 0px -80% 0px",
          threshold: 0,
        },
      );

      Object.values(serviceRefs.current).forEach((el) => {
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, [isComponentInView]); // Re-run when component visibility changes

  // Update menuDisplayText logic to properly handle component visibility
  const menuDisplayText = (() => {
    if (menuOpen || isScrollingToService) {
      return "Nasze usługi";
    }
    if (!isComponentInView) {
      return "Nasze usługi";
    }
    return currentService || "Nasze usługi";
  })();

  // -------------------------------------------------------
  // IntersectionObserver for Scrollspy
  // -------------------------------------------------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const serviceTitle =
              entry.target.getAttribute("data-service-title");
            const groupTitle = entry.target.getAttribute("data-group-title");
            if (serviceTitle && groupTitle) {
              setCurrentService(serviceTitle);
              setCurrentGroup(groupTitle);
            }
          }
        });
      },
      {
        // Tweak rootMargin as desired
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0,
      },
    );

    Object.values(serviceRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // -------------------------------------------------------
  // Clear expanded groups when menu closes, set current group when menu opens
  // -------------------------------------------------------
  useEffect(() => {
    if (!menuOpen) {
      setExpandedGroups(new Set());
    } else if (currentGroup) {
      setExpandedGroups(new Set([currentGroup]));
    }
  }, [menuOpen, currentGroup]);

  const toggleGroup = (title: string, forceState?: boolean) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (forceState !== undefined) {
        if (forceState) {
          newSet.add(title);
        } else {
          newSet.delete(title);
        }
      } else {
        if (newSet.has(title)) {
          newSet.delete(title);
        } else {
          newSet.add(title);
        }
      }
      return newSet;
    });
  };

  // -------------------------------------------------------
  // Scroll to a service heading
  // -------------------------------------------------------
  const scrollToService = (groupTitle: string, serviceTitle?: string) => {
    setExpandedGroups(new Set([groupTitle]));
    setIsScrollingToService(true);
    setMenuOpen(false); // Close menu immediately

    if (serviceTitle) {
      const id = serviceTitle.toLowerCase().replace(/\s+/g, "-");
      const heading = document.getElementById(id);
      if (heading) {
        heading.scrollIntoView({ behavior: "smooth" });

        // Wait for scroll to complete before showing new service name
        setTimeout(() => {
          setIsScrollingToService(false);
        }, 500);
      }
    }
  };

  // Remove the unused openGroup function

  // -------------------------------------------------------
  // When an accordion trigger is clicked on mobile/tablet:
  // 1) Let the accordion open,
  // 2) Then scroll the item into view with some offset.
  // -------------------------------------------------------
  const handleAccordionTriggerClick = (accordionId: string) => {
    // If not on mobile/tablet, do nothing extra
    if (!isMobileOrTablet) return;

    // Wait a tiny bit for the accordion to open, then scroll
    setTimeout(() => {
      const el = document.getElementById(accordionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <section ref={componentRef} className="relative mx-auto">
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[20] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Sub Menu */}
      <div
        className={cn(
          "fixed left-0 right-0 top-20 z-[21] overflow-hidden bg-zinc-900 text-zinc-100 shadow-lg transition-all duration-300 ease-in-out md:top-24 lg:hidden",
          menuOpen ? "max-h-[80vh] bg-black" : "max-h-14",
        )}
      >
        <div
          className="flex h-14 cursor-pointer items-center justify-between pl-3 pr-5"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <div className="flex items-center overflow-hidden text-[0.95rem] text-zinc-50">
            <Text className="h-5 w-5" />
            <span className="ml-3 mt-1 max-w-[95%] truncate">
              {menuDisplayText}
            </span>
          </div>
          {menuOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>

        {/* Dropdown Menu (scrollable) */}
        <div className="scrollable-area max-h-[calc(80vh-3.5rem)] overflow-y-auto bg-black">
          {serviceGroups?.map((group) => {
            const isGroupExpanded = expandedGroups.has(group.title);

            return (
              <div key={group.title}>
                {/* Group heading */}
                <div
                  className={cn(
                    "flex cursor-pointer items-center justify-between border-b border-t border-zinc-800 py-4 pl-4 pr-5 text-[0.95rem] hover:bg-zinc-900",
                    currentGroup === group.title && "bg-zinc-900",
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleGroup(group.title);
                  }}
                >
                  <span>{group.title}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isGroupExpanded && "rotate-180",
                    )}
                  />
                </div>

                {/* Services in group */}
                {isGroupExpanded && (
                  <div className="bg-zinc-900 text-[0.95rem] text-zinc-300">
                    {group.services.map((service) => (
                      <div
                        key={service.title}
                        className={cn(
                          "cursor-pointer py-3 pl-8 pr-6 hover:bg-black md:text-[0.95rem]",
                          currentService === service.title &&
                            "bg-gradient-to-r from-gold-800 to-gold-900 pl-10 font-regular text-zinc-950",
                        )}
                        onClick={() =>
                          scrollToService(group.title, service.title)
                        }
                      >
                        {service.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className={paddingY}>
        {serviceGroups?.map((group) => (
          <section key={group.title}>
            <MaxWidthWrapper>
              <div className="mb-8 mt-16 flex items-center md:mb-12 lg:mb-10 lg:mt-24">
                <div className="lg:w-1/2">
                  <SectionTitle
                    title={fixPolishOrphans(group.title)}
                    textColor="black"
                    className=""
                    label="Usługi"
                  />
                </div>
                <div className="w-1/2 text-right text-xl font-bold">
                  {/* e.g. "Group #": {groupIndex + 1} */}
                </div>
              </div>
              <Separator className="mb-8 md:mb-12 lg:mb-16" />
            </MaxWidthWrapper>

            {group.services.map((service, serviceIndex) => {
              return (
                <div
                  key={service.title}
                  data-service-title={service.title}
                  data-group-title={group.title}
                  ref={(el) => {
                    serviceRefs.current[service.title] = el;
                  }}
                  className={clsx(
                    serviceIndex % 2 === 0 ? "bg-zinc-100" : "bg-zinc-50",
                    "py-12 md:py-16 lg:py-24",
                  )}
                >
                  <MaxWidthWrapper>
                    <div
                      className={cn(
                        "lg:flex lg:items-start lg:gap-16 xl:gap-36",
                        serviceIndex % 2 === 1 && "flex-row-reverse",
                      )}
                    >
                      <FadeInSection className="lg:w-1/2" translateY>
                        {/* Button-wrapped heading */}
                        <button
                          onClick={() =>
                            scrollToService(group.title, service.title)
                          }
                          className="mb-6 cursor-pointer border-none bg-transparent p-0 text-left font-bolder text-[2rem] leading-tight tracking-[-0.015em]"
                        >
                          <h3
                            className="scroll-mt-48 lg:scroll-mt-40"
                            id={service.title
                              .toLowerCase()
                              .replace(/\s+/g, "-")}
                          >
                            {fixPolishOrphans(service.title)}
                          </h3>
                        </button>

                        <p className="mb-8 text-[1.1rem] text-zinc-700">
                          {fixPolishOrphans(service.description)}
                        </p>

                        {/* Accordion */}
                        <Accordion type="single" collapsible className="w-full">
                          {service.actions.map((action) => {
                            // Give each action a unique ID for scrolling:
                            const actionId = `action-${service.title
                              .toLowerCase()
                              .replace(/\s+/g, "-")}-${action.title
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`;

                            return (
                              <FadeInSection translateY>
                                <AccordionItem
                                  key={action.title}
                                  value={action.title}
                                  // So we can apply scroll-mt offset:
                                  id={actionId}
                                  className="scroll-mt-36 md:scroll-mt-40"
                                >
                                  <AccordionTrigger
                                    className="text-[1.3rem] leading-snug"
                                    onClick={() =>
                                      handleAccordionTriggerClick(actionId)
                                    }
                                  >
                                    {fixPolishOrphans(action.title)}
                                  </AccordionTrigger>
                                  <AccordionContent className="mb-4 pr-5">
                                    <p className="text-zinc-700">
                                      {fixPolishOrphans(action.content)}
                                    </p>
                                  </AccordionContent>
                                </AccordionItem>
                              </FadeInSection>
                            );
                          })}
                        </Accordion>
                      </FadeInSection>

                      <FadeInSection
                        translateY
                        className="mt-8 pt-5 lg:mt-0 lg:w-1/2"
                      >
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
                              aspectRatio: img.aspectRatio || "wide",
                            })) || []
                          }
                          aspectRatio={
                            service.images?.[0]?.aspectRatio || "wide"
                          }
                        />
                      </FadeInSection>
                    </div>

                    {service.addLinkToRenomaLab && (
                      <CustomButton
                        animateOnView
                        animationDirection="up"
                        href="/renoma-lab"
                        className=""
                      >
                        Odwiedź stronę Renoma LAB
                      </CustomButton>
                    )}
                  </MaxWidthWrapper>
                </div>
              );
            })}
          </section>
        ))}
      </div>
    </section>
  );
}
