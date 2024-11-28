"use client"

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function FerberTowerCaseStudy() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-4xl font-bold mb-6">Konserwacja Baszty Ferbera</h1>
        <ProjectDetails />
        <Separator className="my-12" />
        {/* Other sections would go here */}
      </div>
    </div>
  )
}

function ProjectDetails() {
  const [isExpanded, setIsExpanded] = useState(false)

  const details = [
    {
      label: "Lokalizacja",
      value: "Wzgórze Katedralne we Fromborku"
    },
    {
      label: "Status",
      value: "W trakcie realizacji"
    },
    {
      label: "Czas trwania",
      value: "12 miesięcy (styczeń 2024 - grudzień 2024)"
    },
    {
      label: "Typ obiektu",
      value: "Zabytek architektury obronnej"
    },
    {
      label: "Rola",
      value: [
        "Autor programu prac konserwatorskich i restauratorskich",
        "Generalny wykonawca prac konserwatorskich i restauratorskich oraz budowlanych"
      ]
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
        "Konserwacja i restauracja wątku ceglanego oraz detalu kamiennego"
      ]
    }
  ]

  const visibleDetails = isExpanded ? details : details.slice(0, 4)

  return (
    <section className="mt-12">
      <h2 className="text-sm mb-6 font-medium text-muted-foreground">⊙ Szczegóły projektu</h2>
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
    </section>
  )
}

