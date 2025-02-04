// Expand year event on mouse hover
"use client";
import { ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ImageCarousel from "@/components/ImageCarousel";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";

export interface TimelineEvent {
  year: string;
  content: PortableTextBlock[];
  images?: Array<{
    src: string;
    caption?: string;
    aspectRatio?: "none" | "landscape" | "portrait" | "square";
  }>;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
  const [visibleEventCount, setVisibleEventCount] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const [captionHeight, setCaptionHeight] = useState(0);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverTimeouts = useRef<(ReturnType<typeof setTimeout> | null)[]>([]);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setVisibleEventCount(mobile ? 2 : events.length);
  }, [events.length]);

  const sortedEvents = [...events].sort(
    (a, b) => parseInt(a.year) - parseInt(b.year),
  );

  // Handle resize logic without debouncing
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisibleEventCount(mobile ? 2 : sortedEvents.length);
      setExpandedIndexes([]); // Reset expanded state
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sortedEvents.length]);

  useEffect(() => {
    eventRefs.current.forEach((el, index) => {
      if (el) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => [...new Set([...prev, index])]);
            observer.unobserve(entry.target); // Animate only once
          } else {
            setVisibleIndexes((prev) => prev.filter((i) => i !== index));
          }
        });

        observer.observe(el);
        return () => observer.disconnect();
      }
    });
  }, [sortedEvents.length]);

  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const handleMouseEnter = (index: number) => {
    if (isMobile || expandedIndexes.includes(index)) return;
    hoverTimeouts.current[index] = setTimeout(() => {
      setExpandedIndexes((prev) => [...prev, index]);
    }, 500);
  };

  const handleMouseLeave = (index: number) => {
    if (isMobile || !hoverTimeouts.current[index]) return;
    clearTimeout(hoverTimeouts.current[index]!);
    hoverTimeouts.current[index] = null;
  };

  const showEarlierEvents = () => {
    setVisibleEventCount((prev) => Math.min(prev + 2, sortedEvents.length));
  };

  const scrollToEvent = (index: number, year: string) => {
    if (!expandedIndexes.includes(index)) {
      const id = year.toString().toLowerCase().replace(/\s+/g, "-");
      const event = document.getElementById(id);
      if (event) {
        event.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const visibleEvents = isMobile
    ? sortedEvents.slice(sortedEvents.length - visibleEventCount)
    : sortedEvents;

  return (
    <div className="relative mx-auto" style={{ marginBottom: captionHeight }}>
      {/* Timeline Line */}
      <div className="absolute left-[8px] top-0 h-full w-0.5 bg-zinc-900/20 md:left-1/2" />
      <div className="relative">
        {isMobile && visibleEventCount < sortedEvents.length && (
          <div className="relative mb-12">
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
              <button
                onClick={showEarlierEvents}
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-zinc-100 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#AC8400] focus:ring-offset-2"
              >
                <ChevronUp className="mr-2 h-4 w-4" />
                Show Earlier Events
              </button>
            </div>
          </div>
        )}

        {visibleEvents.map((event, index) => {
          const isEven = index % 2 === 0;
          const isVisible = isMobile || visibleIndexes.includes(index);
          const isExpanded = expandedIndexes.includes(index);

          return (
            <div
              key={event.year}
              ref={(el) => {
                eventRefs.current[index] = el;
              }}
              id={event.year.toString().toLowerCase().replace(/\s+/g, "-")}
              className={`mb-12 scroll-mt-28 ${
                isMobile
                  ? "opacity-100"
                  : `transition-all duration-500 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`
              } relative`}
            >
              <div className="relative flex flex-col md:gap-0">
                {/* Year event for Desktop */}
                <div
                  className={`group mb-4 flex items-center md:mb-0 md:w-1/2 md:items-center ${
                    !isMobile && isEven
                      ? "md:ml-auto md:pl-10"
                      : "md:mr-auto md:justify-end md:pr-10"
                  }`}
                >
                  {/* Year event marker */}
                  <div
                    onClick={() => {
                      toggleExpand(index);
                      scrollToEvent(index, event.year);
                    }}
                    className="absolute left-0 h-[24px] w-[24px] cursor-pointer scroll-mt-40 rounded-full border-4 border-zinc-100 bg-zinc-600 group-hover:bg-gold-800 md:left-1/2 md:-translate-x-1/2 md:pt-2 xl:pt-2"
                  />
                  {/* Year event title */}
                  <button
                    onClick={() => {
                      toggleExpand(index);
                      scrollToEvent(index, event.year);
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    className="flex items-center font-bolder text-2xl text-zinc-600 group-hover:text-gold-800"
                    aria-expanded={isExpanded}
                    aria-controls={`content-${index}`}
                  >
                    <h3 className="">{event.year}</h3>
                  </button>
                </div>

                <div
                  id={`content-${index}`}
                  className={`ml-8 overflow-hidden rounded-sm transition-all duration-500 md:ml-0 ${
                    isExpanded
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                  } ${
                    !isMobile && isEven
                      ? "md:ml-auto md:pl-10"
                      : "md:mr-auto md:pr-10"
                  } md:w-1/2`}
                >
                  {/* Affects the whole div. Could add bg-color */}
                  <div className="px-5 pt-6">
                    {event.images && event.images.length > 0 && (
                      <div className="mb-0">
                        <ImageCarousel
                          images={event.images}
                          onCaptionHeightChange={setCaptionHeight}
                        />
                      </div>
                    )}
                    <div
                      className={`md:max-w-[38rem] ${
                        !isMobile && !isEven ? "md:ml-auto" : ""
                      }`}
                      style={{ marginTop: 0 }}
                    >
                      <div className="-mt-16 text-pretty">
                        <PortableText
                          value={event.content}
                          components={portableTextComponents}
                        />
                      </div>

                      {/* <Separator /> */}
                    </div>
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
