"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, Plus, Minus } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface ImageCarouselProps {
  images: Array<{ src: string; caption?: string }>;
  aspectRatio?: "none" | "landscape" | "portrait" | "square";
}

export default function ImageCarousel({
  images,
  aspectRatio = "landscape",
}: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCaptions, setShowCaptions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // const aspectRatioClass =
  //   {
  //     none: "aspect-auto",
  //     landscape: "aspect-w-16 aspect-h-9",
  //     portrait: "aspect-[4/3]",
  //     square: "aspect-square",
  //   }[aspectRatio] || "aspect-video";

  const sizeClass =
    {
      none: "h-64 w-full",
      landscape: "h-64 md:h-80 aspect-video",
      portrait: "h-96 w-64",
      square: "h-96 w-96",
    }[aspectRatio] || "h-64 w-full";

  const objectPositionClass =
    {
      none: "object-center",
      landscape: "object-center", // Adjusted for landscape
      portrait: "object-top",
      square: "object-center",
    }[aspectRatio] || "object-center";

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

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const currentCaption = images[currentIndex]?.caption;
  const hasCurrentCaption = Boolean(currentCaption);

  if (!images || images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <div className={`relative ${sizeClass} mb-16`}>
        {/* Ensure spacing around the carousel */}
        <div className="relative h-full w-full">
          <Image
            src={images[0].src}
            alt={images[0].caption || "Image"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`rounded-[4px] object-cover ${objectPositionClass}`}
          />
        </div>
        {hasCurrentCaption && (
          <div className="relative z-10 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <ArrowUp className="mt-1 h-4 w-4 flex-shrink-0" />
              <span>{currentCaption}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${sizeClass} mb-16`}>
      {/* Added bottom margin to prevent overlap */}
      <div className="relative h-full w-full">
        <div
          className="embla h-full w-full overflow-hidden rounded-lg"
          ref={emblaRef}
        >
          <div className="embla__container flex h-full w-full">
            {images.map((image, index) => (
              <div
                key={index}
                className="embla__slide h-full w-full flex-[0_0_100%]"
              >
                <div className="embla__slide__inner relative h-full w-full">
                  <Image
                    src={image.src}
                    alt={image.caption || `Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`rounded-[4px] object-cover ${objectPositionClass}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next/Prev Buttons */}
        {!isMobile && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white hover:bg-black"
              aria-label="Previous image"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white hover:bg-black"
              aria-label="Next image"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Indicator Circles */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 w-2 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Caption Toggle for Mobile */}
        {isMobile && hasCurrentCaption && (
          <Button
            variant="outline"
            onClick={toggleCaptions}
            className="absolute bottom-4 right-4 z-10 rounded-[4px] border border-white/50 bg-black/50 p-2 text-white"
            aria-label={
              showCaptions ? "Hide image caption" : "Show image caption"
            }
          >
            {showCaptions ? (
              <Minus className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </Button>
        )}
      </div>

      {/* Caption Section */}
      {isMobile && showCaptions && currentCaption && (
        <div className="relative z-10 bg-gray-50 px-4 py-3 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <ArrowUp className="mt-1 h-4 w-4 flex-shrink-0" />
            <span>{currentCaption}</span>
          </div>
        </div>
      )}

      {!isMobile && currentCaption && images.length > 1 && (
        <div className="relative z-10 flex justify-between bg-gray-50 px-4 py-3 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <ArrowUp className="mt-1 h-4 w-4 flex-shrink-0" />
            <span>{currentCaption}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              className="rounded-[4px] border border-gray-300 bg-white px-3 py-1 text-gray-600 hover:bg-gray-100"
              aria-label="Previous image"
            >
              PREV
            </button>
            <button
              onClick={scrollNext}
              className="rounded-[4px] border border-gray-300 bg-white px-3 py-1 text-gray-600 hover:bg-gray-100"
              aria-label="Next image"
            >
              NEXT
            </button>
          </div>
        </div>
      )}

      {!isMobile && currentCaption && images.length <= 1 && (
        <div className="relative z-10 bg-gray-50 px-4 py-3 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <ArrowUp className="mt-1 h-4 w-4 flex-shrink-0" />
            <span>{currentCaption}</span>
          </div>
        </div>
      )}
    </div>
  );
}
