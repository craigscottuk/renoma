"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Define types
interface Service {
  title: string;
  description: string;
  details: string[];
}

const services: Service[] = [
  {
    title: "Conservation Research & Expertise",
    description:
      "Comprehensive research to support historical monument preservation.",
    details: [
      "Monument Condition Assessment",
      "Material Analysis",
      "Historical Research",
    ],
  },
  {
    title: "Conservation Work Programs",
    description:
      "Preservation and aesthetic restoration of historical objects.",
    details: [
      "Development of Conservation Plans",
      "Project Execution Planning",
      "Risk Assessment and Monitoring",
    ],
  },
  {
    title: "Conservation Supervision & Consultancy",
    description:
      "Expert supervision to ensure high-standard conservation work.",
    details: [
      "On-Site Supervision",
      "Compliance with Conservation Plans",
      "Consultation & Problem Solving",
    ],
  },
  {
    title: "Conservation & Restoration Work",
    description:
      "Halting degradation and restoring aesthetic beauty of historic objects.",
    details: ["Architectural Monuments", "Movable Monuments", "Artistic Craft"],
  },
  {
    title: "Construction Work on Historical Buildings",
    description: "Specialized construction services for historical structures.",
    details: [
      "Structural Reinforcement",
      "Period-Appropriate Renovations",
      "Integration of Modern Systems",
    ],
  },
  {
    title: "Administrative Support & Grant Acquisition",
    description:
      "Assistance with project management and funding opportunities.",
    details: [
      "Grant Writing and Application",
      "Budget Management",
      "Regulatory Compliance",
    ],
  },
  {
    title: "RenomaLAB",
    description:
      "Innovative research and development in conservation techniques.",
    details: [
      "New Material Testing",
      "Conservation Technology Development",
      "Collaborative Research Projects",
    ],
  },
  {
    title: "Revitalization of Historical Buildings",
    description:
      "Breathing new life into historical structures for modern use.",
    details: [
      "Adaptive Reuse Planning",
      "Sustainable Modernization",
      "Cultural Heritage Integration",
    ],
  },
];

export default function EnhancedServiceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const nextService = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevService = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + services.length) % services.length,
    );
  };

  const goToService = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current && tabsRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const tabsHeight = tabsRef.current.scrollHeight;
        setContentHeight(Math.max(contentHeight, tabsHeight));
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [currentIndex]);

  return (
    <div className="mx-auto w-full max-w-6xl p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Our Services
          </CardTitle>
          <CardDescription className="text-center">
            Explore our comprehensive conservation services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Progress
              value={((currentIndex + 1) / services.length) * 100}
              className="w-full"
            />
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Service {currentIndex + 1} of {services.length}
            </p>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="order-1 lg:order-2 lg:col-span-2">
              <div
                ref={contentRef}
                style={{ minHeight: `${contentHeight}px` }}
                className="flex flex-col justify-between"
              >
                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {services[currentIndex].title}
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    {services[currentIndex].description}
                  </p>
                  <ul className="mb-4 list-disc space-y-1 pl-5">
                    {services[currentIndex].details.map((detail, index) => (
                      <li key={index} className="text-sm">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" onClick={prevService}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  <Button variant="outline" onClick={nextService}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div
              ref={tabsRef}
              className="order-2 lg:order-1 lg:col-span-1"
              style={{ minHeight: `${contentHeight}px` }}
            >
              <div className="grid h-full grid-cols-1 gap-2">
                {services.map((service, index) => (
                  <Button
                    key={index}
                    variant={index === currentIndex ? "default" : "outline"}
                    className="h-auto w-full justify-start px-3 py-2 text-left"
                    onClick={() => goToService(index)}
                  >
                    <span className="text-sm">{service.title}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
