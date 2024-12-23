"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import clsx from "clsx";

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

  const nonNullDetails = details.filter(
    (detail: Detail) => detail.value !== null,
  );
  const visibleDetails = isExpanded
    ? nonNullDetails
    : nonNullDetails.slice(0, 4);

  if (nonNullDetails.length === 0) {
    return null;
  }

  return (
    <section
      className={clsx("relative mx-auto bg-white py-12 text-base", className)}
    >
      <MaxWidthWrapper className={`flex flex-col lg:flex-row lg:gap-8`}>
        {/* Empty column */}
        <div className="flex-1 lg:w-1/2"></div>
        {/* Details column */}
        <div className="flex flex-col lg:w-1/2 lg:items-start">
          <div className="grid w-full grid-cols-1 gap-6">
            {visibleDetails.map((detail: Detail, index: number) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 gap-12 text-[1.1rem]">
                    <div className="font-bolder">{detail.label}</div>
                    <div>
                      {Array.isArray(detail.value) ? (
                        detail.value.length > 1 ? (
                          <ul className="list-disc space-y-1">
                            {detail.value.map((item: string, i: number) => (
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
                </div>
                <Separator className="my-0" />
              </div>
            ))}
          </div>
          {nonNullDetails.length > 4 && (
            <Button
              variant="link"
              className="mt-6 p-0 px-0 font-bolder text-sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  Pokaż mniej
                  <ChevronUp className="h-6 w-6" />
                </>
              ) : (
                <>
                  Pokaż więcej
                  <ChevronDown className="h-6 w-6" />
                </>
              )}
            </Button>
          )}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
