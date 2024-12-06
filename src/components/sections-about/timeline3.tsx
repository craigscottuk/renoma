"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import ImageCarousel from "./../ImageCarousel";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "../../lib/portableTextComponents";
import { Separator } from "../ui/separator";

interface TimelineEvent {
  year: string;
  content: PortableTextBlock[];
  images?: Array<{
    src: string;
    caption?: string;
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
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setVisibleEventCount(mobile ? 2 : events.length);
  }, [events.length]);

  const sortedEvents = [...events].sort(
    (a, b) => parseInt(a.year) - parseInt(b.year),
  );

  // Handle resize logic with debouncing
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisibleEventCount(mobile ? 2 : sortedEvents.length);
      setExpandedIndexes([]); // Reset expanded state
    };

    const debouncedResize = debounce(handleResize, 100);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
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

  const toggleExpand = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const showEarlierEvents = () => {
    setVisibleEventCount((prev) => Math.min(prev + 2, sortedEvents.length));
  };

  const visibleEvents = isMobile
    ? sortedEvents.slice(sortedEvents.length - visibleEventCount)
    : sortedEvents;

  return (
    <div className="relative mx-auto">
      {/* Timeline Line */}
      <div className="absolute left-[8px] top-0 h-full w-0.5 bg-gray-400 lg:left-1/2" />
      <div className="relative lg:pl-8 lg:pr-8">
        {isMobile && visibleEventCount < sortedEvents.length && (
          <div className="relative mb-12">
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
              <button
                onClick={showEarlierEvents}
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#AC8400] focus:ring-offset-2"
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
              <div className="relative flex flex-col lg:gap-4">
                <div
                  className={`group mb-4 flex items-center lg:mb-0 lg:w-1/2 lg:items-start ${
                    !isMobile && isEven
                      ? "lg:ml-auto lg:pl-8"
                      : "lg:mr-auto lg:justify-end lg:pr-8"
                  }`}
                >
                  <div
                    onClick={() => toggleExpand(index)}
                    className="absolute left-0 h-[24px] w-[24px] cursor-pointer rounded-full border-4 border-white bg-[#AC8400] group-hover:bg-[#B88D00] lg:left-1/2 lg:-translate-x-1/2 lg:pt-2 xl:pt-2"
                  />
                  <button
                    onClick={() => toggleExpand(index)}
                    className="ml-8 flex items-center font-bolder text-3xl text-[#A37D00] group-hover:text-[#B88D00]"
                    aria-expanded={isExpanded}
                    aria-controls={`content-${index}`}
                  >
                    <span>{event.year}</span>
                  </button>
                </div>
                <div
                  id={`content-${index}`}
                  className={`ml-8 overflow-hidden rounded-sm transition-all duration-500 lg:ml-0 ${
                    isExpanded
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                  } ${
                    !isMobile && isEven
                      ? "lg:ml-auto lg:px-8"
                      : "lg:mr-auto lg:px-8"
                  } lg:w-1/2`}
                >
                  {event.images && event.images.length > 0 && (
                    <div className="mb-6 mt-4">
                      <ImageCarousel images={event.images} />
                    </div>
                  )}
                  <div
                    className={`space-y-3 text-pretty lg:max-w-[38rem] ${
                      !isMobile && !isEven ? "lg:ml-auto" : ""
                    }`}
                  >
                    <Separator />
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

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
