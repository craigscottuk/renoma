"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  MapPin,
  Briefcase,
  Clock,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react";

interface JobOffer {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  experience: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  isArchived?: boolean;
  archivedDate?: string;
}

const jobOffers: JobOffer[] = [
  {
    id: "1",
    title: "Młodszy Specjalista ds. Prawnych i Administracyjnych",
    description:
      "Poszukujemy Młodszego Specjalisty ds. Prawnych i Administracyjnych, który będzie wspierał dział prawny w analizie umów, wniosków, zapytań ofertowych i przetargowych związanych z działalnością konserwatorsko-budowlaną firmy.",
    location: "Warszawa",
    type: "Pełny etat",
    experience: "1-3 lata",
    responsibilities: [
      "Składanie ofert w postępowaniach przetargowych i innych zamówieniach publicznych.",
      "Analiza dokumentacji, w tym zawieranych umów, pod kątem formalnym i prawnym.",
      "Dostosowywanie ofert do wymogów formalnych.",
      "Udział w tworzeniu wniosków o dotacje na prace konserwatorskie, restauratorskie i budowlane.",
      "Kompletowanie i prowadzenie dokumentacji wniosków dotacyjnych.",
      "Rozliczanie pozyskanych dotacji.",
      "Administrowanie umowami oraz dokumentacją kadrową.",
      "Wsparcie działu prawnego w bieżących obowiązkach.",
      "Współpraca z innymi działami i raportowanie do kierownika działu.",
    ],
    requirements: [
      "Wykształcenie wyższe (preferowane kierunki: prawo, administracja).",
      "Doświadczenie w pracy administracyjnej, prawno-administracyjnej, biurowej, dziale zakupów, przetargowym lub obiegu dokumentów będzie mile widziane.",
      "Samodzielność i umiejętność pracy w zespole.",
      "Skrupulatność i dobra organizacja pracy.",
      "Znajomość programów Excel i Word (znajomość dodatkowych narzędzi będzie atutem).",
      "Dostępność do rozpoczęcia pracy w ciągu miesiąca.",
    ],
    benefits: [
      "Stabilne zatrudnienie na umowę o pracę (3-miesięczny okres próbny).",
      "Możliwość rozwoju zawodowego i udziału w ciekawych projektach konserwatorskich.",
      "Atrakcyjne wynagrodzenie.",
      "2-etapowy proces rekrutacyjny.",
    ],
  },
  {
    id: "2",
    title: "Starszy Inżynier Budowy",
    description:
      "Poszukujemy doświadczonego Starszego Inżyniera Budowy do nadzorowania projektów budowlanych i zarządzania zespołem.",
    location: "Kraków",
    type: "Pełny etat",
    experience: "5+ lat",
    responsibilities: [
      "Nadzór nad realizacją projektów budowlanych.",
      "Zarządzanie zespołem inżynierów i pracowników budowlanych.",
      "Koordynacja prac z podwykonawcami i dostawcami.",
      "Zapewnienie zgodności z przepisami BHP i normami budowlanymi.",
      "Raportowanie postępów prac do kierownictwa.",
    ],
    requirements: [
      "Wykształcenie wyższe techniczne (budownictwo).",
      "Minimum 5 lat doświadczenia na podobnym stanowisku.",
      "Uprawnienia budowlane bez ograniczeń.",
      "Bardzo dobra znajomość procesów budowlanych i norm technicznych.",
      "Umiejętność zarządzania zespołem i rozwiązywania problemów.",
    ],
    benefits: [
      "Atrakcyjne wynagrodzenie adekwatne do doświadczenia.",
      "Możliwość rozwoju i udziału w innowacyjnych projektach.",
      "Prywatna opieka medyczna i karta sportowa.",
      "Szkolenia branżowe i kursy językowe.",
    ],
    isArchived: true,
    archivedDate: "03/2023",
  },
  {
    id: "3",
    title: "Specjalista ds. Marketingu",
    description:
      "Poszukujemy kreatywnego Specjalisty ds. Marketingu do prowadzenia kampanii promocyjnych i zarządzania obecnością firmy w mediach społecznościowych.",
    location: "Warszawa",
    type: "Pełny etat",
    experience: "2-4 lata",
    responsibilities: [
      "Planowanie i realizacja kampanii marketingowych.",
      "Zarządzanie profilami firmy w mediach społecznościowych.",
      "Tworzenie treści marketingowych (teksty, grafiki, wideo).",
      "Analiza efektywności działań marketingowych.",
      "Współpraca z działem sprzedaży w zakresie generowania leadów.",
    ],
    requirements: [
      "Wykształcenie wyższe (marketing, zarządzanie lub pokrewne).",
      "Minimum 2 lata doświadczenia w marketingu.",
      "Bardzo dobra znajomość narzędzi marketingu internetowego.",
      "Kreatywność i umiejętność pracy pod presją czasu.",
      "Znajomość języka angielskiego na poziomie B2.",
    ],
    benefits: [
      "Konkurencyjne wynagrodzenie.",
      "Możliwość pracy zdalnej 2 dni w tygodniu.",
      "Budżet szkoleniowy na rozwój umiejętności.",
      "Przyjazna atmosfera pracy w młodym zespole.",
    ],
    isArchived: true,
    archivedDate: "11/2023",
  },
  {
    id: "4",
    title: "Kierownik Projektu IT",
    description:
      "Poszukujemy doświadczonego Kierownika Projektu IT do zarządzania złożonymi projektami informatycznymi dla naszych klientów.",
    location: "Wrocław",
    type: "Pełny etat",
    experience: "5+ lat",
    responsibilities: [
      "Zarządzanie projektami IT od koncepcji do wdrożenia.",
      "Koordynacja pracy zespołów deweloperskich i testerów.",
      "Komunikacja z klientami i interesariuszami projektu.",
      "Zarządzanie budżetem i harmonogramem projektu.",
      "Identyfikacja i zarządzanie ryzykiem w projektach.",
    ],
    requirements: [
      "Wykształcenie wyższe (informatyka, zarządzanie lub pokrewne).",
      "Minimum 5 lat doświadczenia w zarządzaniu projektami IT.",
      "Certyfikat Prince2, PMP lub Scrum Master.",
      "Doskonałe umiejętności komunikacyjne i przywódcze.",
      "Znajomość metodyk zwinnych i klasycznych w zarządzaniu projektami.",
    ],
    benefits: [
      "Atrakcyjne wynagrodzenie plus premie za realizację projektów.",
      "Elastyczne godziny pracy i możliwość pracy zdalnej.",
      "Prywatna opieka medyczna i karta sportowa.",
      "Możliwość rozwoju i awansu w strukturach firmy.",
    ],
    isArchived: true,
    archivedDate: "01/2024",
  },
];

function JobOfferCard({ job }: { job: JobOffer }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="mb-2 text-xl font-bold">
              {job.title}
            </CardTitle>
            <CardDescription className="mb-2 text-sm text-gray-500">
              {job.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="px-2 py-1 text-xs">
            {job.type}
          </Badge>
        </div>
        <div className="flex space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            {job.location}
          </div>
          <div className="flex items-center">
            <Briefcase className="mr-1 h-4 w-4" />
            {job.experience}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {job.type}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[1000px]" : "max-h-0"}`}
        >
          <h3 className="mb-2 font-semibold">Obowiązki:</h3>
          <ul className="mb-4 list-disc pl-5">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
          <h3 className="mb-2 font-semibold">Wymagania:</h3>
          <ul className="mb-4 list-disc pl-5">
            {job.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
          <h3 className="mb-2 font-semibold">Oferujemy:</h3>
          <ul className="list-disc pl-5">
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Aplikuj teraz</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Aplikuj na stanowisko: {job.title}</DialogTitle>
            </DialogHeader>
            <ApplicationForm
              jobTitle={job.title}
              onClose={() => setIsModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
        <Button
          variant="link"
          className="text-blue-600 hover:text-blue-800"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              Mniej szczegółów <ChevronUp className="ml-1 inline h-4 w-4" />
            </>
          ) : (
            <>
              Więcej szczegółów <ChevronDown className="ml-1 inline h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

function ArchivedJobCard({ job }: { job: JobOffer }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="mb-1 text-lg font-semibold">
              {job.title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {job.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="px-2 py-1 text-xs">
            Archiwum
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            {job.location}
          </div>
          <div className="flex items-center">
            <Briefcase className="mr-1 h-4 w-4" />
            {job.experience}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {job.type}
          </div>
          {job.archivedDate && (
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              Zarchiwizowano: {job.archivedDate}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ApplicationForm({
  jobTitle,
  onClose,
}: {
  jobTitle: string;
  onClose: () => void;
}) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (files.length + selectedFiles.length <= 5) {
      setFiles([...files, ...selectedFiles]);
    } else {
      alert("Możesz przesłać maksymalnie 5 plików.");
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically send the form data and files to your backend
    console.log("Application submitted with files:", files);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Imię i Nazwisko</Label>
        <Input id="name" required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="phone">Numer telefonu</Label>
        <Input id="phone" type="tel" />
      </div>
      <div>
        <Label htmlFor="coverLetter">List motywacyjny</Label>
        <Textarea id="coverLetter" rows={4} />
      </div>
      <div>
        <Label htmlFor="fileUpload">Załącz pliki (max. 5)</Label>
        <Input
          id="fileUpload"
          type="file"
          onChange={handleFileChange}
          multiple
          accept=".pdf,.doc,.docx,.txt"
          className="mb-2"
        />
        {files.length > 0 && (
          <ul className="list-disc pl-6">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFile(index)}
                >
                  Usuń
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button type="submit">Wyślij aplikację</Button>
    </form>
  );
}

export default function JobOffer() {
  const activeJobs = jobOffers.filter((job) => !job.isArchived);
  const archivedJobs = jobOffers.filter((job) => job.isArchived);
  const [showAllArchived, setShowAllArchived] = useState(false);

  const visibleArchivedJobs = showAllArchived
    ? archivedJobs
    : archivedJobs.slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Oferty pracy</h1>
      {activeJobs.map((job) => (
        <JobOfferCard key={job.id} job={job} />
      ))}

      {archivedJobs.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">Archiwum ofert pracy</h2>
          {visibleArchivedJobs.map((job) => (
            <ArchivedJobCard key={job.id} job={job} />
          ))}
          {archivedJobs.length > 2 && (
            <Button
              variant="outline"
              onClick={() => setShowAllArchived(!showAllArchived)}
              className="mt-4"
            >
              {showAllArchived
                ? "Pokaż mniej"
                : `Pokaż więcej (${archivedJobs.length - 2})`}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
