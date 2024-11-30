"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MaxWidthWrapper from "../max-width-wrapper";

export default function ProjectDetailsSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const details = [
    {
      label: "Lokalizacja",
      value: "Wzgórze Katedralne we Fromborku",
    },
    {
      label: "Status",
      value: "W trakcie realizacji",
    },
    {
      label: "Czas trwania",
      value: "12 miesięcy (styczeń 2024 - grudzień 2024)",
    },
    {
      label: "Typ obiektu",
      value: "Zabytek architektury obronnej",
    },
    {
      label: "Rola",
      value: [
        "Autor programu prac konserwatorskich i restauratorskich",
        "Generalny wykonawca prac konserwatorskich i restauratorskich oraz budowlanych",
      ],
    },
    {
      label: "Zakres prac",
      value: [
        "Stabilizacja konstrukcji budynku",
        "Remont więźby dachowej",
        "Wymiana pokrycia dachowego",
        "Odbudowa drewnianych stropów oraz schodów",
        "Wprowadzenie nowej stolarki okiennej",
        "Instalacja elektryczna i przeciwpożarowa",
        "Usunięcie przyczyn zawilgocenia",
        "Konserwacja i restauracja wątku ceglanego oraz detalu kamiennego",
      ],
    },
  ];

  const visibleDetails = isExpanded ? details : details.slice(0, 4);

  return (
    <section className="relative mx-auto bg-white py-12 lg:py-24">
      <MaxWidthWrapper className={`flex flex-col lg:flex-row lg:gap-8`}>
        {/* Empty column */}
        <div className="flex-1"></div>
        {/* Details column */}
        <div className="flex flex-col md:max-w-[29rem] lg:items-end">
          <p className="mb-6 text-sm font-medium text-muted-foreground">
            ⊙ Szczegóły projektu
          </p>
          <div className="grid grid-cols-1 gap-6">
            {visibleDetails.map((detail, index) => (
              <div key={index} className="grid grid-cols-[200px_1fr] gap-6">
                <div className="text-sm font-medium">{detail.label}</div>
                <div className="text-sm">
                  {Array.isArray(detail.value) ? (
                    <ul className="list-none space-y-1">
                      {detail.value.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    detail.value
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            className="mt-6 text-sm font-medium"
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
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
