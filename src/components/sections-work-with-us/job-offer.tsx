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
import { PortableText, PortableTextBlock } from "next-sanity";
import { portableTextComponents } from "@/lib/portableTextComponents";
import SectionTitle from "../section-title";

interface JobOffer {
  jobTitle: string;
  jobDescription: string;
  jobLocation: string;
  jobType: string;
  responsibilities: PortableTextBlock[];
  requirements: PortableTextBlock[];
  benefits: PortableTextBlock[];
}

function JobOfferCard({ job }: { job: JobOffer }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="mb-2 text-xl font-bold">
              {job.jobTitle}
            </CardTitle>
            <CardDescription className="mb-2 text-sm text-gray-500">
              {job.jobDescription}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="px-2 py-1 text-xs">
            {job.jobType}
          </Badge>
        </div>
        <div className="flex space-x-4 text-sm text-gray-500">
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
          className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[1000px]" : "max-h-0"}`}
        >
          <h3 className="mb-2 font-semibold">Obowiązki:</h3>
          <PortableText
            value={job.responsibilities}
            components={portableTextComponents}
          />
          <h3 className="mb-2 font-semibold">Wymagania:</h3>
          <PortableText
            value={job.requirements}
            components={portableTextComponents}
          />
          <h3 className="mb-2 font-semibold">Oferujemy:</h3>
          <PortableText
            value={job.benefits}
            components={portableTextComponents}
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Aplikuj teraz</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Aplikuj na stanowisko: {job.jobTitle}</DialogTitle>
            </DialogHeader>
            <ApplicationForm
              jobTitle={job.jobTitle}
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

export default function JobOfferSection({
  title,
  jobOffers,
}: {
  title: string;
  jobOffers: JobOffer[];
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle title={title} />
      {jobOffers.map((job, index) => (
        <JobOfferCard key={index} job={job} />
      ))}
    </div>
  );
}
