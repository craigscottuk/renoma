"use client";
// cSpell:disable
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
import { PortableText, PortableTextComponents } from "@portabletext/react";

// Define types
interface Service {
  title: string;
  description: any;
}

interface SectionServicesProps {
  services: Service[];
}

const portableTextComponents: PortableTextComponents = {
  block: {
    // Handle default text blocks (e.g., paragraphs)
    normal: ({ children }) => <p className="mb-4 text-[1.1rem]">{children}</p>,
    h3: ({ children }) => <h3 className="text-xl font-bold">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-square pl-4">{children}</ul>, // Use list-square for square bullets
    number: ({ children }) => <ol className="list-decimal pl-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bolder">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const target = value?.href?.startsWith("http") ? "_blank" : "_self";
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-blue-600 underline"
        >
          {children}
        </a>
      );
    },
  },
};

export default function EnhancedServiceCarousel({
  services,
}: SectionServicesProps) {
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
                    {services[currentIndex]?.title}
                  </h3>
                  <div className="mb-4 whitespace-pre-line text-muted-foreground">
                    <PortableText
                      value={services[currentIndex]?.description}
                      components={portableTextComponents}
                    />
                  </div>
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
