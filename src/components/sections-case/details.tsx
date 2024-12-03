"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MaxWidthWrapper from "../max-width-wrapper";

type Detail = {
  label: string;
  value: string | string[];
};

export default function ProjectDetailsSection({
  className,
  details,
}: {
  className?: string;
  details: Detail[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const nonNullDetails = details.filter((detail) => detail.value);
  const visibleDetails = isExpanded
    ? nonNullDetails
    : nonNullDetails.slice(0, 4);

  if (nonNullDetails.length === 0) {
    return null;
  }

  return (
    <section className={`relative mx-auto bg-white py-12 ${className}`}>
      <MaxWidthWrapper>
        <Separator className="mb-12" />
      </MaxWidthWrapper>

      <MaxWidthWrapper className={`flex flex-col lg:flex-row lg:gap-8`}>
        {/* Empty column */}
        <div className="flex-1 lg:w-1/2"></div>
        {/* Details column */}
        <div className="flex flex-col lg:w-1/2 lg:items-start">
          <p className="mb-6 text-sm font-medium text-muted-foreground">
            ⊙ Szczegóły projektu
          </p>
          <div className="grid w-full grid-cols-1 gap-6">
            {visibleDetails.map((detail, index) => (
              <div key={index}>
                <div className="grid grid-cols-2 gap-12">
                  <div className="font-bolder text-sm">{detail.label}</div>
                  <div className="text-sm">
                    {Array.isArray(detail.value) ? (
                      detail.value.length > 1 ? (
                        <ul className="list-disc space-y-1">
                          {detail.value.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        detail.value[0]
                      )
                    ) : (
                      detail.value
                    )}
                  </div>
                </div>
                <Separator className="my-3" />
              </div>
            ))}
          </div>
          {nonNullDetails.length > 4 && (
            <Button
              variant="link"
              className="px-0 font-bolder text-sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  Pokaż mniej
                  <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Pokaż więcej
                  <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <Separator className="mt-12" />
      </MaxWidthWrapper>
    </section>
  );
}
