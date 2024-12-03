"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp, Plus, Minus } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface ImageCarouselProps {
  images: Array<{ src: string; caption?: string }>;
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
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

  if (images.length === 1) {
    return (
      <div className="relative">
        <div className="relative aspect-video">
          <Image
            src={images[0].src}
            alt={images[0].caption || "Timeline image"}
            fill
            className="rounded-[4px] object-cover"
          />
        </div>
        {hasCurrentCaption && (
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

  return (
    <div className="relative">
      <div className="relative">
        <div
          className="embla overflow-hidden rounded-lg rounded-t-lg"
          ref={emblaRef}
        >
          <div className="embla__container flex">
            {images.map((image, index) => (
              <div key={index} className="embla__slide flex-[0_0_100%]">
                <div className="embla__slide__inner relative">
                  <div className="relative aspect-video">
                    <Image
                      src={image.src}
                      alt={image.caption || `Timeline image ${index + 1}`}
                      fill
                      className="rounded-[4px] object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
