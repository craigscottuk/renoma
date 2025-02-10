"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUp, Plus, Minus } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useLocale } from "next-intl";
import AnimatedLink from "./animated-link";

interface ImageCarouselProps {
  images: Array<{
    src: string;
    caption?: string;
    aspectRatio?: "none" | "landscape" | "portrait" | "square";
  }>;
  onCaptionHeightChange?: (height: number) => void;
}

export default function ImageCarousel({
  images,
  onCaptionHeightChange,
}: ImageCarouselProps) {
  const locale = useLocale();

  // Log the aspectRatio data
  // console.log("ImageCarousel images", images);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCaptions, setShowCaptions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [captionHeight, setCaptionHeight] = useState(0);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setShowCaptions(window.innerWidth >= 768); // Always show captions on mobile
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

  useEffect(() => {
    if (captionRef.current) {
      const height = showCaptions ? captionRef.current.clientHeight : 0;
      setCaptionHeight(height);
      if (onCaptionHeightChange) {
        onCaptionHeightChange(height);
      }
    }
  }, [currentIndex, showCaptions, isMobile, onCaptionHeightChange]);

  const toggleCaptions = () => {
    setShowCaptions((prev) => {
      const newShowCaptions = !prev;
      if (captionRef.current) {
        const height = newShowCaptions ? captionRef.current.clientHeight : 0;
        setCaptionHeight(height);
        if (onCaptionHeightChange) {
          onCaptionHeightChange(height);
        }
      }
      return newShowCaptions;
    });
  };

  // const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const currentCaption = images[currentIndex]?.caption;
  const hasCurrentCaption = Boolean(currentCaption);

  if (!images || images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    const image = images[0];
    // const sizeClass =
    //   {
    //     none: "h-auto w-auto",
    //     landscape: "h-64 md:h-80 aspect-video",
    //     portrait: "h-64 md:h-80 aspect-[4/3]",
    //     square: "h-64 md:h-80 aspect-square",
    //   }[image.aspectRatio || "landscape"] || "h-64 w-full";
    const objectPositionClass =
      {
        none: "object-center",
        landscape: "object-center",
        portrait: "object-top",
        square: "object-center",
      }[image.aspectRatio || "landscape"] || "object-center";

    return (
      <div className={`aspect-square relative h-96`}>
        {/* Ensure spacing around the carousel */}
        <div className="relative h-full w-full">
          <Image
            src={image.src}
            alt={image.caption || "Image"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`rounded-[4px] object-cover ${objectPositionClass}`}
          />
        </div>
        {hasCurrentCaption && (
          <div className="relative z-10 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
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
    <div className="relative" style={{ marginBottom: captionHeight }}>
      {/* Added bottom margin to prevent overlap */}
      <div className="relative h-full w-full">
        <div
          className="embla h-full w-full overflow-hidden rounded-lg"
          ref={emblaRef}
        >
          <div className="embla__container flex h-full w-full">
            {images.map((image, index) => {
              // const sizeClass =
              //   {
              //     none: "h-auto w-auto",
              //     landscape: "h-64 md:h-80 aspect-video",
              //     portrait: "h-64 md:h-80 aspect-[4/3]",
              //     square: "h-64 md:h-80 aspect-square",
              //   }[image.aspectRatio || "landscape"] || "h-64 w-full";
              const objectPositionClass =
                {
                  none: "object-center",
                  landscape: "object-center",
                  portrait: "object-top",
                  square: "object-center",
                }[image.aspectRatio || "landscape"] || "object-center";

              return (
                <div
                  key={index}
                  className={`embla__slide aspect-square relative h-96 flex-[0_0_100%]`}
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
              );
            })}
          </div>
        </div>

        {/* Next/Prev Buttons */}
        {!isMobile && (
          <>
            {/* <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-zinc-900/50 p-2 text-zinc-100 hover:bg-zinc-900"
              aria-label="Previous image"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-zinc-900/50 p-2 text-zinc-100 hover:bg-zinc-900"
              aria-label="Next image"
            >
              <ArrowRight className="h-6 w-6" />
            </button> */}
          </>
        )}

        {/* Indicator Circles */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 w-2 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-zinc-400"
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
            className="absolute bottom-4 right-4 z-10 rounded-[4px] border border-white/50 bg-zinc-900/50 p-2 text-zinc-100"
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
      {isMobile && (
        <div
          ref={captionRef}
          className={`relative z-10 bg-zinc-50 px-4 py-3 text-sm text-zinc-950 ${
            showCaptions ? "block" : "hidden"
          }`}
        >
          {showCaptions && currentCaption && (
            <div className="flex items-start gap-2">
              <ArrowUp className="mt-1 h-4 w-4 flex-shrink-0" />
              <span>{currentCaption}</span>
            </div>
          )}
        </div>
      )}

      {!isMobile && currentCaption && images.length > 1 && (
        <div
          ref={captionRef}
          className="text-zin-950 relative z-10 flex justify-between bg-zinc-50 px-3 py-3 text-sm"
        >
          <div className="flex items-start gap-2 text-pretty">
            <ArrowUp className="mr-1 mt-1 h-4 w-4 flex-shrink-0" />
            <span>{currentCaption}</span>
            {/* Removed the animated PREV/NEXT links from here */}
          </div>
        </div>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-0 right-0 z-10 flex items-center space-x-2 bg-white p-2">
          {/* <AnimatedLink
            className="hover:text-gold text-sm"
            onClick={scrollPrev}
            showArrow={false}
          >
            {locale === "en" ? "PREV" : locale === "pl" ? "POP" : "VOR"}
          </AnimatedLink> */}
          <AnimatedLink
            className="text-sm hover:text-zinc-950"
            onClick={scrollNext}
            showArrow={false}
          >
            {locale === "en" ? "NEXT" : locale === "pl" ? "DALEJ" : "WEITER"}
          </AnimatedLink>
        </div>
      )}

      {!isMobile && currentCaption && images.length <= 1 && (
        <div className="relative z-10 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
          <div className="flex items-start gap-2">
            <ArrowUp className="mt-1 h-4 w-4 flex-shrink-0" />
            <span>{currentCaption}</span>
          </div>
        </div>
      )}
    </div>
  );
}
