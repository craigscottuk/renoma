import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, ChevronDown, ChevronUp } from "lucide-react";

interface BibliographyItem {
  author: string;
  title: string;
  publication?: string;
  year: string;
  additionalInfo?: string;
  url?: string;
}

const bibliographyData: BibliographyItem[] = [
  {
    author: "von Quast, Ferdinand",
    title: "Denkmale der Baukunst im Ermland",
    publication: "Berlin",
    year: "1852",
    url: "https://example.com/von-quast",
  },
  {
    author: "Bötticher, Adolf",
    title: "Die Bau- und Kunstdenkmäler der Provinz Ostpreußen, H. 4, Ermland",
    year: "1894",
    url: "https://example.com/botticher",
  },
  {
    author: "K.S.",
    title: "Frombork - mury obronne wzgórza katedralnego",
    publication: "Ochrona Zabytków, t. 16, z. 2",
    year: "1963",
    url: "https://example.com/ks",
  },
  {
    author: "Kruppe, Jerzy",
    title:
      "Problematyka i wyniki dotychczasowych badań archeologicznych na Wzgórzu Katedralnym",
    publication: "Komentarze Fromborskie, nr 2",
    year: "1968",
    additionalInfo: "s. 57-84",
    url: "https://example.com/kruppe",
  },
  {
    author: "Czubiel, Lucjan and Domagała, Tadeusz",
    title: "Zabytkowe ośrodki miejskie Warmii i Mazur",
    publication: "Olsztyn",
    year: "1969",
    url: "https://example.com/czubiel-domagala",
  },
  {
    author: "Zagrodzki, Tadeusz",
    title: "Warownia we Fromborku jako katedralne założenie obronne",
    publication: "Kwartalnik Architektury i Urbanistyki, t. 3-4",
    year: "1969",
    additionalInfo: "s. 181-267",
    url: "https://example.com/zagrodzki",
  },
  {
    author: "Piaskowski, Tadeusz and Sikorski, Jerzy",
    title: "Frombork",
    publication: "Olsztyn",
    year: "1971",
    url: "https://example.com/piaskowski-sikorski",
  },
  {
    author: "Arszyński, Marian and Kutzner, Marian (eds.)",
    title:
      "Katalog Zabytków Sztuki w Polsce, Seria Nowa, t. 2, Województwo elbląskie, z. 1, Braniewo, Frombork, Orneta i Okolice",
    publication: "Warszawa",
    year: "1980",
    url: "https://example.com/arszynski-kutzner",
  },
  {
    author: "Piaskowski, Tadeusz and Szkop, Henryk",
    title: "Zabytki Fromborka",
    publication: "Frombork",
    year: "2003",
    url: "https://example.com/piaskowski-szkop",
  },
  {
    author: "Czernik, Zbigniew",
    title:
      "Wzgórze katedralne we Fromborku. Dzieje architektury, jej przemiany i funkcje XIII-XX w.",
    publication: "Olsztyn",
    year: "2020",
    url: "https://example.com/czernik",
  },
];

export default function Bibliography() {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 6;

  const displayedData = showAll
    ? bibliographyData
    : bibliographyData.slice(0, initialDisplayCount);

  return (
    <Card className="mx-auto w-full max-w-7xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">
          Selected Bibliography
        </CardTitle>
        <Book className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {displayedData.map((item, index) => (
            <div
              key={index}
              className="flex min-h-[140px] flex-col rounded-lg bg-muted/30 p-4"
            >
              <div className="flex-grow">
                <p className="text-sm font-semibold">
                  {item.author} ({item.year})
                </p>
                <p className="mt-1 text-sm italic">{item.title}</p>
                {(item.publication || item.additionalInfo) && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.publication}
                    {item.additionalInfo && ` ${item.additionalInfo}`}
                  </p>
                )}
              </div>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-primary hover:underline"
                >
                  View Source
                </a>
              )}
            </div>
          ))}
        </div>
        {bibliographyData.length > initialDisplayCount && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              aria-expanded={showAll}
              aria-controls="bibliography-list"
            >
              {showAll ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Show More
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
