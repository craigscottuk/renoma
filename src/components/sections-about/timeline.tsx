"use client";
// https://www.relume.io/categories/timelines

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import timelineData from "@/lib/timelineData";

export default function Timeline() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  const selectedItem =
    timelineData.find((item) => item.year === selectedYear) ||
    timelineData[timelineData.length - 1];

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMediumScreen(window.innerWidth < 1024);
    };

    updateScreenSize(); // Set initial screen size
    window.addEventListener("resize", updateScreenSize); // Update on resize

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    setCurrentImageIndex(0);
  };

  const handleCloseDialog = () => {
    setSelectedYear(null);
    setCurrentImageIndex(0);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % selectedItem.images.length,
    );
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + selectedItem.images.length) %
        selectedItem.images.length,
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % selectedItem.images.length,
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Image Section */}
        <div className="order-2 hidden lg:order-1 lg:col-span-1 lg:block">
          <div className="relative aspect-[3/2] w-full">
            <Image
              src={selectedItem.images[0]}
              alt={`Image for year ${selectedItem.year}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Timeline Section */}
        <div className="order-1 flex flex-col items-center lg:order-2 lg:col-span-1">
          <div className="relative h-[80vh] w-1 bg-gray-300 lg:h-[600px]">
            {timelineData.map((item, index) => (
              <button
                key={item.year}
                className={`absolute h-6 w-6 -translate-y-1/2 transform rounded-full focus:outline-none ${
                  item.year === selectedYear ? "bg-primary" : "bg-gray-400"
                }`}
                style={{
                  top: `${(index / (timelineData.length - 1)) * 100}%`,
                  left: "-2.5rem", // Positioning all buttons on the left
                }}
                onClick={() => handleYearClick(item.year)}
              >
                <span className="absolute -left-16 -top-2 text-sm font-medium">
                  {item.year}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="order-3 hidden lg:col-span-1 lg:block">
          <div className="h-[600px] overflow-y-auto">
            <h2 className="mb-4 text-2xl font-bold">{selectedItem.year}</h2>
            <ul className="list-disc space-y-2 pl-5">
              {selectedItem.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Dialog - Only renders on smaller screens */}
      {isMediumScreen && (
        <Dialog open={selectedYear !== null} onOpenChange={handleCloseDialog}>
          <DialogContent
            className="h-[90vh] max-h-[700px] sm:max-w-[425px]"
            onClick={handleCloseDialog}
          >
            <DialogHeader>
              <DialogTitle>{selectedItem.year}</DialogTitle>
              <DialogDescription>
                <div
                  className="relative mb-4 aspect-[3/2] w-full"
                  onClick={handleImageClick}
                >
                  <Image
                    src={selectedItem.images[currentImageIndex]}
                    alt={`Image ${currentImageIndex + 1} for year ${selectedItem.year}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  {selectedItem.images.length > 1 && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white"
                        onClick={handlePrevImage}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white"
                        onClick={handleNextImage}
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 transform rounded-full bg-black bg-opacity-50 px-2 py-1 text-sm text-white">
                    {currentImageIndex + 1} / {selectedItem.images.length}
                  </div>
                </div>
                <ScrollArea className="h-[calc(90vh-250px)] max-h-[450px] w-full">
                  <ul className="list-disc space-y-2 pl-5">
                    {selectedItem.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </ScrollArea>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
