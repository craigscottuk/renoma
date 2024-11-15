// cSpell:disable
"use client";

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

interface TimelineItem {
  year: number;
  content: string[];
  images: {
    src: string;
    caption: string;
  }[];
}

export default function Component({ data = [] }: { data?: TimelineItem[] }) {
  const timelineData = data.length
    ? data
    : [
        {
          year: 2012,
          content: [
            "Data założenia firmy (pierwotnie elementy ruchome wyposażenia kościołów: ramy, obrazy, ołtarze, rzeźba drewniana polichromowana)",
          ],
          images: [
            {
              src: "/placeholder.svg?height=400&width=600",
              caption: "Założenie firmy",
            },
            {
              src: "/placeholder.svg?height=400&width=600",
              caption: "Pierwsze projekty",
            },
          ],
        },
        {
          year: 2015,
          content: ["Powstała pracownia konserwatorsko-restauratorska"],
          images: [
            {
              src: "/placeholder.svg?height=400&width=600",
              caption: "Nowa pracownia",
            },
          ],
        },
        {
          year: 2016,
          content: [
            "Konserwacja i restauracja neogotyckiego ołtarza w kościele Św. Jana Nepomucena w Biskupcu Pomorskim",
          ],
          images: [
            {
              src: "/placeholder.svg?height=400&width=600",
              caption: "Ołtarz przed renowacją",
            },
            {
              src: "/placeholder.svg?height=400&width=600",
              caption: "Proces renowacji",
            },
            {
              src: "/placeholder.svg?height=400&width=600",
              caption: "Ołtarz po renowacji",
            },
          ],
        },
        {
          year: 2020,
          content: [
            "Rozszerzenie działalności o prace konserwatorskie przy zabytkach nieruchomych",
          ],
          images: [
            {
              src: "/placeholder.svg?height=400&width=600",
              caption: "Nowe projekty",
            },
          ],
        },
        {
          year: 2024,
          content: [
            "Konserwacja murów obronnych wraz z odbudowaniem krużganków na Wzgórzu Katedralnym we Fromborku",
            "Wybudowanie nowoczesnego obiektu w kompleksie obiektów zabytkowych- Centrum edukacyjno-turystyczne na Wzgórzu Katedralnym we Fromborku z uwzględnieniem potrzeb osób niepełnosprawnych (pomnik historii)",
            "Rewitalizacja kapitularza we Fromborku w budynku kapituły z zachowaniem walorów historycznych",
            "Prace ciesielsko-dekarskie w kościele Wniebowzięcia Matki Bożej i Św. Michała w Wieleniu",
            "Prace konserwatorsko-restauratorskie w kościele Podwyższenia Krzyża Świętego w Rogowie",
          ],
          images: [
            {
              src: "/placeholder.svg?height=400&width=600",
              caption: "Mury i krużganki we Fromborku",
            },
            {
              src: "/placeholder.svg?height=400&width=600",
              caption: "Centrum edukacyjno-turystyczne",
            },
            {
              src: "/placeholder.svg?height=400&width=600",
              caption: "Kapitularz we Fromborku",
            },
            {
              src: "/placeholder.svg?height=400&width=600",
              caption: "Kościół w Wieleniu",
            },
            {
              src: "/placeholder.svg?height=400&width=600",
              caption: "Kościół w Rogowie",
            },
          ],
        },
      ];

  const [activeYear, setActiveYear] = React.useState(
    timelineData[timelineData.length - 1].year,
  );
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const activeItem = timelineData.find((item) => item.year === activeYear);

  const handlePrevYear = () => {
    const currentIndex = timelineData.findIndex((t) => t.year === activeYear);
    if (currentIndex > 0) {
      setActiveYear(timelineData[currentIndex - 1].year);
      setCurrentImageIndex(0);
    }
  };

  const handleNextYear = () => {
    const currentIndex = timelineData.findIndex((t) => t.year === activeYear);
    if (currentIndex < timelineData.length - 1) {
      setActiveYear(timelineData[currentIndex + 1].year);
      setCurrentImageIndex(0);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12">
      {/* Timeline Navigation */}
      <div className="relative mb-16">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-muted" />
        <div className="relative flex justify-between">
          {timelineData.map((item) => (
            <button
              key={item.year}
              onClick={() => setActiveYear(item.year)}
              className={cn(
                "relative z-10 flex flex-col items-center",
                activeYear === item.year
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
              aria-label={`View events from ${item.year}`}
            >
              <div
                className={cn(
                  "mb-1 h-4 w-4 rounded-full",
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
              {activeItem?.content.map((text, i) => (
                <p key={i} className="text-muted-foreground">
                  {text}
                </p>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            {activeYear !== timelineData[0].year ? (
              <Button variant="outline" onClick={handlePrevYear}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                {
                  timelineData[
                    timelineData.findIndex((t) => t.year === activeYear) - 1
                  ].year
                }
              </Button>
            ) : (
              <div></div>
            )}
            {activeYear !== timelineData[timelineData.length - 1].year ? (
              <Button onClick={handleNextYear}>
                {
                  timelineData[
                    timelineData.findIndex((t) => t.year === activeYear) + 1
                  ].year
                }
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <Card className="overflow-hidden">
          <Carousel className="w-full">
            <CarouselContent
              selectedIndex={currentImageIndex}
              setSelectedIndex={setCurrentImageIndex}
            >
              {activeItem?.images.map((image, i) => (
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
                        {i + 1} / {activeItem.images.length}
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
      </div>
    </div>
  );
}
