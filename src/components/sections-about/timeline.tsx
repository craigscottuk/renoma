"use client";
// cSpell:disable
import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";

interface TimelineImage {
  src: string;
  caption: string;
}

interface TimelineItem {
  year: number;
  content: PortableTextBlock[];
  images?: TimelineImage[];
}

interface TimelineProps {
  timeline: TimelineItem[];
}

export default function Timeline({ timeline }: TimelineProps) {
  const [activeYear, setActiveYear] = React.useState(
    timeline[timeline.length - 1]?.year || 0,
  );
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const activeItem = timeline.find((item) => item.year === activeYear);

  const handlePrevYear = () => {
    const currentIndex = timeline.findIndex((t) => t.year === activeYear);
    if (currentIndex > 0) {
      setActiveYear(timeline[currentIndex - 1].year);
      setCurrentImageIndex(0);
    }
  };

  const handleNextYear = () => {
    const currentIndex = timeline.findIndex((t) => t.year === activeYear);
    if (currentIndex < timeline.length - 1) {
      setActiveYear(timeline[currentIndex + 1].year);
      setCurrentImageIndex(0);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12">
      {/* Timeline Navigation */}
      <div className="relative mb-16">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-muted" />
        <div className="relative flex justify-between">
          {timeline.map((item, index) => (
            <button
              key={item.year}
              onClick={() => setActiveYear(item.year)}
              className={cn(
                "relative z-10 flex flex-col items-center",
                activeYear === item.year
                  ? "text-primary"
                  : "text-muted-foreground",
                index % 2 === 0 ? "translate-y-4" : "-translate-y-4",
              )}
              aria-label={`View events from ${item.year}`}
            >
              <div
                className={cn(
                  "mb-1 h-4 w-4",
                  activeYear === item.year
                    ? "bg-primary"
                    : "bg-muted-foreground",
                )}
              />
              <span className="text-sm font-medium">{item.year}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="min-h-[200px]">
            <h2 className="mb-2 text-4xl font-bold">{activeYear}</h2>
            <div className="space-y-4">
              {activeItem?.content?.length ? (
                <PortableText
                  value={activeItem.content}
                  components={portableTextComponents}
                />
              ) : (
                <p className="text-muted-foreground">
                  No content available for this event.
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            {activeYear !== timeline[0].year && (
              <Button
                variant="outline"
                onClick={handlePrevYear}
                aria-label={`View events from ${
                  timeline[timeline.findIndex((t) => t.year === activeYear) - 1]
                    .year
                }`}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                {
                  timeline[timeline.findIndex((t) => t.year === activeYear) - 1]
                    .year
                }
              </Button>
            )}
            {activeYear !== timeline[timeline.length - 1].year && (
              <Button
                onClick={handleNextYear}
                aria-label={`View events from ${
                  timeline[timeline.findIndex((t) => t.year === activeYear) + 1]
                    .year
                }`}
              >
                {
                  timeline[timeline.findIndex((t) => t.year === activeYear) + 1]
                    .year
                }
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {activeItem?.images?.length ? (
          <Card className="overflow-hidden">
            <Carousel className="w-full">
              <CarouselContent
                selectedIndex={currentImageIndex}
                setSelectedIndex={setCurrentImageIndex}
              >
                {activeItem.images.map((image, i) => (
                  <CarouselItem key={i}>
                    <CardContent className="p-0">
                      <div className="relative aspect-[3/2] w-full">
                        <Image
                          src={image.src}
                          alt={image.caption}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4">
                        <p className="text-sm text-muted-foreground">
                          {image.caption}
                        </p>
                        <span className="text-sm text-muted-foreground">
                          {i + 1} / {activeItem.images?.length}
                        </span>
                      </div>
                    </CardContent>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden lg:block">
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </Carousel>
          </Card>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            <p>No images available for this event.</p>
          </div>
        )}
      </div>
    </div>
  );
}
