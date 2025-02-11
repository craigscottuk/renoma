"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PortableText, PortableTextBlock } from "next-sanity";
import { MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { portableTextComponents } from "@/lib/portableTextComponents";
import clsx from "clsx";
import { FadeInSection } from "@/components/fade-in-section";
import { transformPortableTextBlocks } from "@/utils/transformPortableTextBlocks";
import fixPolishOrphans from "@/utils/fixPolishOrphans";

export interface JobOffer {
  jobTitle: string;
  jobDescription: string;
  jobLocation: string;
  jobType: string;
  responsibilities: PortableTextBlock[];
  requirements: PortableTextBlock[];
  benefits: PortableTextBlock[];
}

const cardColorSchemes: Record<
  string,
  {
    section: string;
    card: string;
    cardContent: string;
    sectionTitle: "white" | "black";
  }
> = {
  zincDark: {
    section: "bg-zinc-900 text-zinc-50",
    card: "border-zinc-700 bg-zinc-900 text-zinc-50",
    cardContent: "text-zinc-100",
    sectionTitle: "white",
  },
  zincLight: {
    section: "text-zinc-950 bg-zinc-200",
    card: "border-zinc-300 bg-zinc-100",
    cardContent: "text-zinc-700",
    sectionTitle: "black",
  },
  goldDark: {
    section: "bg-gold-950 text-gold-50",
    card: "border-gold-700 bg-gold-900 text-gold-50",
    cardContent: "text-gold-200",
    sectionTitle: "white",
  },
};

export default function JobOfferCard({ job }: { job: JobOffer }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedColorScheme = cardColorSchemes.zincLight;

  // Apply transformPortableTextBlocks to portableTextBlock before rendering to fix Polish orphans on the end of each line.
  const newResponsibilities = transformPortableTextBlocks(job.responsibilities);
  const newRequirements = transformPortableTextBlocks(job.requirements);
  const newBenefits = transformPortableTextBlocks(job.benefits);

  return (
    <FadeInSection translateY>
      <Card
        className={clsx("mb-6 cursor-pointer", selectedColorScheme.card)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="mb-5 text-[1.6rem] tracking-[-0.015em] marker:leading-tight">
                {job.jobTitle}
              </CardTitle>
              <CardDescription
                className={clsx(
                  "mb-5 max-w-[55rem] text-[1.1rem]",
                  selectedColorScheme.cardContent,
                )}
              >
                {fixPolishOrphans(job.jobDescription)}
              </CardDescription>
            </div>
          </div>
          <div
            className={clsx(
              "flex space-x-4 text-[1.1rem]",
              selectedColorScheme.cardContent,
            )}
          >
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              {job.jobLocation}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {job.jobType}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={`max-w-[52rem] overflow-hidden text-pretty transition-all duration-300 ${isExpanded ? "max-h-[1000px]" : "max-h-0"}`}
          >
            <h3 className="mb-2 text-lg font-semibold">Obowiązki:</h3>
            <PortableText
              value={newResponsibilities}
              components={portableTextComponents}
            />
            <h3 className="mb-2 text-lg font-semibold">Wymagania:</h3>
            <PortableText
              value={newRequirements}
              components={portableTextComponents}
            />
            <h3 className="mb-2 text-lg font-semibold">Oferujemy:</h3>
            <PortableText
              value={newBenefits}
              components={portableTextComponents}
            />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="hover:bg-zinc-800 hover:text-zinc-100"
                variant="outline"
                onClick={(e) => e.stopPropagation()}
              >
                Aplikuj teraz
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="mb-5 text-[1.6rem] tracking-[-0.015em] marker:leading-tight">
                  Aplikuj na stanowisko: {job.jobTitle}
                </DialogTitle>
              </DialogHeader>
              <ApplicationForm
                jobTitle={job.jobTitle}
                onClose={() => setIsModalOpen(false)}
              />
            </DialogContent>
          </Dialog>
          <Button
            variant="link"
            className="text-zinc-800 hover:text-zinc-900"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <>
                Mniej szczegółów <ChevronUp className="ml-1 inline h-4 w-4" />
              </>
            ) : (
              <>
                Więcej szczegółów{" "}
                <ChevronDown className="ml-1 inline h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </FadeInSection>
  );
}

function ApplicationForm({
  // jobTitle,
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
          className="mb-2 h-16 md:text-sm"
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
      <Button
        className="bg-zinc-800 hover:bg-zinc-100 hover:text-zinc-800"
        type="submit"
      >
        Wyślij aplikację
      </Button>
    </form>
  );
}
