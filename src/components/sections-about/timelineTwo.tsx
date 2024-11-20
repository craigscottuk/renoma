"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

// Timeline data structure
type TimelineData = {
  [key: number]: string[];
};

export default function TimelineTwo() {
  // Timeline data from 2012 to 2024
  const timelineData: TimelineData = {
    2012: [
      "Data założenia firmy (pierwotnie elementy ruchome wyposażenia kościołów: ramy, obrazy, ołtarze, rzeźba drewniana polichromowana)",
    ],
    2015: ["Powstała pracownia konserwatorsko-restauratorska"],
    2016: [
      "Konserwacja i restauracja neogotyckiego ołtarza w kościele Św. Jana Nepomucena w Biskupcu Pomorskim",
    ],
    2017: [
      "Rozbudowa firmy w zakresie prac przy elewacjach i detalu architektonicznym",
      "Prace konserwatorsko-restauratorskie oraz odsłonięcie polichromii w kościele Niepokalanego Poczęcia w Żydowie",
    ],
    2018: [
      "Malowanie/renowacja ścian kościoła Św. Mikołaja w Dąbrówce Malborskiej",
      "Prace konserwatorsko-restauratorskie ołtarza Św. Józefa w kościele Trójcy Przenajświętszej w Dzierzgoniu",
    ],
    2019: ["Budowanie marki własnej jako podwykonawcy"],
    2021: [
      "Prace nad elewacją Bazyliki Św. Mikołaja w Grudziądzu jako generalny wykonawca",
      "Prace konserwatorsko-restauratorskie w kościele Św. Wawrzyńca w Dobrzejowicach",
      "Nadzór konserwatorski w Kościele gotyckim w Chojnej (elewacja Kaplicy Mariackiej)",
      "Prace konserwatorsko-restauratorskie ołtarza głównego autorstwa M.J. Klahr'a w kościele w Różance",
    ],
    2022: [
      "Konserwacja i restauracja ołtarza głównego z warsztatu Herman Hana w kościele Wniebowzięcia Matki Bożej i Św. Michała w Wieleniu",
      "Prace konserwatorskie elewacji transeptu w pocysterskim zespole klasztornym w Kołbaczu",
      "Konserwacja i restauracja murów obronnych Wzgórza Katedralnego we Fromborku",
      "Prace przy elewacji południowej kościoła pod wezwaniem Niepokalanego Poczęcia Najświętszej Maryi Panny w Grudziądzu",
    ],
    2023: [
      "Konserwacja i restauracja gotyckich polichromii w Bazylice Św. Mikołaja w Grudziądzu",
      "Prace nad elewacją kamienicy w Chełmży",
      "Konserwacja i restauracja ołtarza głównego w kościele Wniebowzięcia Najświętszej Maryi Panny w Nowym Warpnie",
      "Prace przy ścianach ceglanych we wnętrzu kościoła pod wezwaniem Św. Mikołaja we Fromborku",
    ],
    2024: [
      "Konserwacja murów obronnych wraz z odbudowaniem krużganków na Wzgórzu Katedralnym we Fromborku",
      "Wybudowanie nowoczesnego obiektu w kompleksie obiektów zabytkowych - Centrum edukacyjno-turystyczne na Wzgórzu Katedralnym we Fromborku z uwzględnieniem potrzeb osób niepełnosprawnych (pomnik historii)",
      "Rewitalizacja kapitularza we Fromborku w budynku kapituły z zachowaniem walorów historycznych",
      "Prace ciesielsko-dekarskie w kościele Wniebowzięcia Matki Bożej i Św. Michała w Wieleniu",
      "Prace konserwatorsko-restauratorskie w kościele Podwyższenia Krzyża Świętego w Rogowie",
    ],
  };

  const years = Object.keys(timelineData).map(Number);
  const [currentYear, setCurrentYear] = useState(2022);

  const getYearWindow = () => {
    const currentIndex = years.indexOf(currentYear);
    const start = Math.max(0, Math.min(years.length - 5, currentIndex - 2));
    return years.slice(start, start + 5);
  };

  const handlePrevious = () => {
    const currentIndex = years.indexOf(currentYear);
    if (currentIndex > 0) {
      setCurrentYear(years[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = years.indexOf(currentYear);
    if (currentIndex < years.length - 1) {
      setCurrentYear(years[currentIndex + 1]);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      {/* Years display */}
      <div className="flex h-16 items-center justify-center gap-4">
        {getYearWindow().map((year) => (
          <span
            key={year}
            className={`transition-all ${
              year === currentYear
                ? "text-3xl font-bold text-primary"
                : "text-xl text-muted-foreground"
            } flex items-center`}
          >
            {year}
          </span>
        ))}
      </div>

      {/* Content area */}
      <div className="border-t border-gray-200" />
      <div className="mb-8 min-h-[300px] w-full">
        <ul className="list-disc space-y-4 pl-6">
          {timelineData[currentYear].map((item, index) => (
            <li key={index} className="text-base leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="my-4 border-t border-gray-200" />

      {/* Navigation buttons */}
      <div className="flex w-full justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentYear === years[0]}
          className="w-32"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {currentYear - 1}
        </Button>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentYear === years[years.length - 1]}
          className="w-32"
        >
          {currentYear + 1}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
