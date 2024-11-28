"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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

function Timeline({ events }: TimelineProps) {
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
  const [showAllEvents, setShowAllEvents] = useState(false);
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
        setShowAllEvents(true);
        setExpandedIndexes(sortedEvents.map((_, i) => i)); // Show all on desktop
        setVisibleIndexes(sortedEvents.map((_, i) => i)); // All visible on desktop
      } else {
        setShowAllEvents(false);
        // On mobile, only show the last two events initially
        const lastTwoIndexes = sortedEvents
          .slice(-2)
          .map((_, i) => sortedEvents.length - 2 + i);
        setExpandedIndexes(lastTwoIndexes);
        setVisibleIndexes(lastTwoIndexes);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sortedEvents.length]);

  useEffect(() => {
    // Skip applying the observer for mobile devices
    if (isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = eventRefs.current.findIndex(
            (ref) => ref === entry.target,
          );
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );

    eventRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  const toggleShowAllEvents = () => {
    setShowAllEvents((prev) => !prev);

    if (!showAllEvents) {
      // Show all events (collapsed) when "Show More" is clicked
      setExpandedIndexes([]);
      setVisibleIndexes(sortedEvents.map((_, i) => i)); // Make all visible
    } else {
      // Collapse back to the last two events
      const lastTwoIndexes = sortedEvents
        .slice(-2)
        .map((_, i) => sortedEvents.length - 2 + i);
      setExpandedIndexes(lastTwoIndexes);
      setVisibleIndexes(lastTwoIndexes);
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="relative mx-auto">
      {isMobile && events.length > 2 && (
        <div className="mb-8 text-center">
          <button
            onClick={toggleShowAllEvents}
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {showAllEvents ? (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Show More
              </>
            )}
          </button>
        </div>
      )}

      <div className="absolute left-[9px] top-0 h-full w-0.5 bg-gray-300 lg:left-1/2" />

      <div className="relative">
        {sortedEvents.map((event, index) => {
          const isEven = index % 2 === 0;
          const isVisible = visibleIndexes.includes(index);
          const isExpanded = expandedIndexes.includes(index);

          // Apply staggered animation when "Show More" is clicked
          const mobileStyle =
            isMobile && showAllEvents
              ? {
                  opacity: 1,
                  transform: "translateY(0)",
                  transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
                }
              : {};

          return (
            <div
              key={event.year}
              ref={(el) => (eventRefs.current[index] = el)}
              className={`mb-12 transition-all duration-500 ${
                isMobile
                  ? ""
                  : isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
              }`}
              style={mobileStyle}
            >
              <div
                className={`relative flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } lg:gap-8`}
              >
                <div className="mb-4 flex items-center lg:mb-0 lg:w-1/2 lg:items-start">
                  <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2">
                    <div className="h-[18px] w-[18px] rounded-full border-4 border-white bg-blue-500" />
                  </div>
                  <button
                    onClick={() => toggleExpand(index)}
                    className={`ml-8 flex items-center text-xl font-semibold text-blue-600 hover:text-blue-800 ${
                      isEven ? "lg:ml-auto" : ""
                    }`}
                    aria-expanded={isExpanded}
                    aria-controls={`content-${index}`}
                  >
                    <span>{event.year}</span>
                    <span
                      className={`ml-2 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                </div>

                <div
                  id={`content-${index}`}
                  className={`ml-8 overflow-hidden transition-all duration-500 lg:ml-0 lg:w-1/2 ${
                    isExpanded
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
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

export default Timeline;
