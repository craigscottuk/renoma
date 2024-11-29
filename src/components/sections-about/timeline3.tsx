"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUp, Plus, Minus, ArrowUp } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "../../lib/portableTextComponents";

interface TimelineEvent {
  year: string;
  content: string[];
  images?: Array<{
    src: string;
    caption?: string;
  }>;
}

interface TimelineProps {
  events: TimelineEvent[];
}

function ImageCarousel({
  images,
}: {
  images: Array<{ src: string; caption?: string }>;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCaptions, setShowCaptions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setShowCaptions(window.innerWidth >= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const toggleCaptions = () => {
    setShowCaptions((prev) => !prev);
  };

  const currentCaption = images[currentIndex]?.caption;
  const hasCurrentCaption = Boolean(currentCaption);

  return (
    <div className="relative">
      <div className="relative">
        <div className="embla overflow-hidden rounded-t-lg" ref={emblaRef}>
          <div className="embla__container flex">
            {images.map((image, index) => (
              <div key={index} className="embla__slide flex-[0_0_100%]">
                <div className="embla__slide__inner relative">
                  <div className="relative aspect-video">
                    <Image
                      src={image.src}
                      alt={image.caption || `Timeline image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isMobile && hasCurrentCaption && (
          <button
            onClick={toggleCaptions}
            className="absolute bottom-3 right-3 z-10 rounded-full bg-white/80 p-2 transition-colors hover:bg-white/90"
            aria-label={
              showCaptions ? "Hide image caption" : "Show image caption"
            }
          >
            {showCaptions ? (
              <Minus className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </button>
        )}

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {isMobile && showCaptions && currentCaption && (
        <div className="rounded-b-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <ArrowUp className="mt-1 h-4 w-4 flex-shrink-0" />
            <span>{currentCaption}</span>
          </div>
        </div>
      )}

      {!isMobile && currentCaption && (
        <div className="rounded-b-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <ArrowUp className="mt-1 h-4 w-4 flex-shrink-0" />
            <span>{currentCaption}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Timeline({ events }: TimelineProps) {
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
  const [visibleEventCount, setVisibleEventCount] = useState(() => {
    return typeof window !== "undefined" && window.innerWidth < 768
      ? 2
      : events.length;
  });
  const [isMobile, setIsMobile] = useState(false);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sort events chronologically (earliest to latest)
  const sortedEvents = [...events].sort(
    (a, b) => parseInt(a.year) - parseInt(b.year),
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        setVisibleEventCount(sortedEvents.length);
        setExpandedIndexes([]);
      } else {
        setExpandedIndexes([]); // All events collapsed by default on mobile
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sortedEvents.length]);

  useEffect(() => {
    if (!isMobile) {
      setVisibleIndexes(
        Array.from({ length: sortedEvents.length }, (_, i) => i),
      );
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = eventRefs.current.findIndex(
              (ref) => ref === entry.target,
            );
            if (entry.isIntersecting) {
              setVisibleIndexes((prev) => [...new Set([...prev, index])]);
            } else {
              setVisibleIndexes((prev) => prev.filter((i) => i !== index));
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
      );

      eventRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      return () => observer.disconnect();
    }
  }, [isMobile, sortedEvents.length]);

  const toggleExpand = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const showEarlierEvents = () => {
    setVisibleEventCount((prev) => Math.min(prev + 2, sortedEvents.length));
  };

  // For mobile view, split the events into preview and active sections
  const getMobileEvents = () => {
    if (!isMobile) return sortedEvents;

    const previewEvents = sortedEvents.slice(
      Math.max(0, sortedEvents.length - visibleEventCount - 2),
      sortedEvents.length - visibleEventCount,
    );
    const activeEvents = sortedEvents.slice(
      sortedEvents.length - visibleEventCount,
    );

    return [...previewEvents, ...activeEvents];
  };

  const visibleEvents = getMobileEvents();

  return (
    <div className="relative mx-auto">
      <div className="absolute left-[9px] top-0 h-full w-0.5 bg-gray-300 lg:left-1/2" />

      <div className="relative">
        {/* Preview Events and Floating Button */}
        {isMobile && visibleEventCount < sortedEvents.length && (
          <div className="relative mb-12">
            {/* Preview Events */}
            {visibleEvents.slice(0, 2).map((event, index) => {
              const actualIndex =
                sortedEvents.length - visibleEventCount - 2 + index;
              const isEven = actualIndex % 2 === 0;

              return (
                <div
                  key={event.year}
                  className="pointer-events-none relative mb-12 opacity-50"
                >
                  <div
                    className={`relative flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} lg:gap-8`}
                  >
                    <div className="mb-4 flex items-center lg:mb-0 lg:w-1/2 lg:items-start">
                      <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2">
                        <div className="h-[18px] w-[18px] rounded-full border-4 border-white bg-blue-500 opacity-50" />
                      </div>
                      <div className="ml-8 flex items-center text-xl font-semibold text-blue-600">
                        <span>{event.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Floating Button with gradient */}
            <div className="pointer-events-none absolute inset-0">
              <div className="h-full bg-gradient-to-b from-white via-transparent to-transparent" />
            </div>
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
              <button
                onClick={showEarlierEvents}
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <ChevronUp className="mr-2 h-4 w-4" />
                Show Earlier Events
              </button>
            </div>
          </div>
        )}

        {/* Active Events */}
        {visibleEvents.slice(isMobile ? 2 : 0).map((event, index) => {
          const actualIndex = isMobile
            ? sortedEvents.length - visibleEventCount + index
            : index;
          const isEven = actualIndex % 2 === 0;
          const isVisible = isMobile || visibleIndexes.includes(actualIndex);
          const isExpanded = expandedIndexes.includes(actualIndex);

          return (
            <div
              key={event.year}
              ref={(el) => (eventRefs.current[actualIndex] = el)}
              className={`mb-12 ${
                isMobile
                  ? "opacity-100"
                  : `transition-all duration-500 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`
              } relative`}
            >
              <div
                className={`relative flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} lg:gap-8`}
              >
                <div className="mb-4 flex items-center lg:mb-0 lg:w-1/2 lg:items-start">
                  <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2">
                    <div className="h-[18px] w-[18px] rounded-full border-4 border-white bg-blue-500" />
                  </div>
                  <button
                    onClick={() => toggleExpand(actualIndex)}
                    className={`ml-8 flex items-center text-xl font-semibold text-blue-600 hover:text-blue-800 ${isEven ? "lg:ml-auto" : ""}`}
                    aria-expanded={isExpanded}
                    aria-controls={`content-${actualIndex}`}
                  >
                    <span>{event.year}</span>
                    <span
                      className={`ml-2 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </span>
                  </button>
                </div>

                <div
                  id={`content-${actualIndex}`}
                  className={`ml-8 overflow-hidden transition-all duration-500 lg:ml-0 lg:w-1/2 ${
                    isExpanded
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {event.images && event.images.length > 0 && (
                    <div className="mb-6 mt-4">
                      <ImageCarousel images={event.images} />
                    </div>
                  )}

                  <div className={`space-y-3 text-gray-700`}>
                    <PortableText
                      value={event.content}
                      components={portableTextComponents}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
