"use client";

import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComparisonBeforeAfter } from "./comparison-before-after";

interface CarouselComparisonProps {
  comparisons: {
    title: string;
    imageBefore: string;
    imageAfter: string;
  }[];
}

export function CarouselComparison({ comparisons }: CarouselComparisonProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {comparisons.map((comparison, index) => (
            <div key={index} className="min-w-0 flex-[0_0_100%]">
              <h3 className="mb-8 font-bolder text-[1.45rem] text-dullGold">
                {comparison.title}
              </h3>
              <ComparisonBeforeAfter
                imageBefore={comparison.imageBefore}
                imageAfter={comparison.imageAfter}
                labelBefore="Przed renowacją"
                labelAfter="Po renowacji"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <Button
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
          size="icon"
          variant="outline"
          className="rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Poprzednie porównanie</span>
        </Button>
        <div className="text-sm text-zinc-500">
          {selectedIndex + 1} / {comparisons.length}
        </div>
        <Button
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
          size="icon"
          variant="outline"
          className="rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Następne porównanie</span>
        </Button>
      </div>
    </div>
  );
}
