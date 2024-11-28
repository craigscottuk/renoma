"use client";
// cSpell:disable
import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "../../lib/portableTextComponents";

interface TimelineEvent {
  year: number;
  content: string[];
  images?: string[];
}

interface TimelineProps {
  events: TimelineEvent[];
}

function ImageCarousel({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="embla overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="embla__container flex">
          {images.map((src, index) => (
            <div key={index} className="embla__slide flex-[0_0_100%]">
              <div className="embla__slide__inner relative aspect-video">
                <Image
                  src={typeof src === "string" ? src : src.src}
                  alt={`Timeline image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 hidden -translate-y-1/2 transform rounded-full bg-white/80 p-2 hover:bg-white/90 lg:block"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-2 top-1/2 hidden -translate-y-1/2 transform rounded-full bg-white/80 p-2 hover:bg-white/90 lg:block"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
}

export default function Timeline({ events }: TimelineProps) {
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([
    events.length - 1,
  ]);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="relative mx-auto">
      {/* Timeline line */}
      <div className="absolute left-[9px] top-0 h-full w-0.5 bg-gray-300 lg:left-1/2" />

      <div className="relative">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          const isExpanded = expandedIndexes.includes(index);

          return (
            <div
              key={index}
              ref={(el) => (eventRefs.current[index] = el)}
              className="mb-12 transition-opacity duration-1000"
            >
              <div
                className={`relative flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } lg:gap-24`}
              >
                {/* Year marker */}
                <div className="absolute left-0 flex items-center lg:left-1/2 lg:-translate-x-1/2">
                  <div className="h-[18px] w-[18px] rounded-full border-4 border-white bg-[#765911] md:h-7 md:w-7" />
                </div>

                {/* Year button */}
                <div
                  className={`hidden text-3xl font-semibold text-[#765911] lg:block ${
                    isEven ? "lg:pr-8 lg:text-right" : "lg:pl-8 lg:text-left"
                  } lg:w-1/2`}
                >
                  <button
                    onClick={() => toggleExpand(index)}
                    className="flex items-center justify-end text-xl font-semibold text-[#765911] hover:text-blue-800"
                    aria-expanded={isExpanded}
                    aria-controls={`content-${index}`}
                  >
                    {event.year}
                    {isExpanded ? (
                      <ChevronUp className="ml-2 h-6 w-6" />
                    ) : (
                      <ChevronDown className="ml-2 h-6 w-6" />
                    )}
                  </button>
                </div>

                {/* Content container */}
                <div
                  id={`content-${index}`}
                  className={`ml-8 transition-all duration-500 lg:ml-0 lg:w-1/2 ${
                    isExpanded
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 overflow-hidden opacity-0 lg:max-h-none lg:overflow-visible lg:opacity-100"
                  }`}
                >
                  {/* Images */}
                  {event.images && event.images.length > 0 && (
                    <div className="mb-6 mt-4">
                      <ImageCarousel images={event.images} />
                    </div>
                  )}

                  {/* Portable Text content */}
                  <div className="space-y-3 text-gray-700">
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
