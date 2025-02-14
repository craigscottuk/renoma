"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { PortableText, PortableTextBlock } from "next-sanity";
import { MapPin, Clock, ChevronDown, ChevronUp, Upload } from "lucide-react";
import { portableTextComponents } from "@/lib/portableTextComponents";
import clsx from "clsx";
import { FadeInSection } from "@/components/fade-in-section";
import { transformPortableTextBlocks } from "@/utils/transformPortableTextBlocks";
import fixPolishOrphans from "@/utils/fixPolishOrphans";

// --- Imports for your new form ---
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import "./job-offer.css";

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

// ------ Add new job application form schema ------
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "application/zip",
  "application/x-rar-compressed",
];

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Imię i nazwisko musi mieć co najmniej 2 znaki.",
  }),
  email: z.string().email({
    message: "Nieprawidłowy adres email.",
  }),
  phone: z.string().regex(/^[0-9+\s-]{9,}$/, {
    message: "Nieprawidłowy numer telefonu.",
  }),
  motivationLetter: z.string().max(1500, {
    message: "List motywacyjny nie może przekraczać 1500 znaków.",
  }),
  consent: z.boolean().refine((val) => val === true, {
    message: "Musisz wyrazić zgodę na przetwarzanie danych osobowych.",
  }),
  files: z.any().optional(),
});
// --------------------------------------------------

export default function JobOfferCard({ job }: { job: JobOffer }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const selectedColorScheme = cardColorSchemes.zincLight;

  // Apply transformPortableTextBlocks to fix Polish orphans
  const newResponsibilities = transformPortableTextBlocks(job.responsibilities);
  const newRequirements = transformPortableTextBlocks(job.requirements);
  const newBenefits = transformPortableTextBlocks(job.benefits);

  return (
    <FadeInSection translateY>
      <Card
        ref={cardRef}
        className={clsx(
          "mb-6 cursor-pointer scroll-mt-28",
          selectedColorScheme.card,
        )}
        onClick={() => {
          // Expand when clicking the card
          if (!isExpanded) {
            setIsExpanded(true);
            cardRef.current?.scrollIntoView({ behavior: "smooth" });
          }
        }}
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
            className={`max-w-[52rem] overflow-hidden text-pretty transition-all duration-300 ${
              isExpanded ? "max-h-[1000px]" : "max-h-0"
            }`}
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
            <DialogContent className="myDialog h-[90vh] max-w-3xl overflow-y-auto border-none bg-zinc-900 px-16 py-12 text-zinc-50">
              <DialogHeader>
                <DialogTitle className="mb-5 text-[1.6rem] tracking-[-0.015em] marker:leading-tight">
                  Aplikuj na stanowisko: {job.jobTitle}
                </DialogTitle>
              </DialogHeader>

              {/* Our new integrated form with success/error states */}
              <JobApplicationForm onClose={() => setIsModalOpen(false)} />
            </DialogContent>
          </Dialog>
          <Button
            variant="link"
            className="text-zinc-800 hover:text-zinc-900"
            onClick={(e) => {
              e.stopPropagation();
              cardRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              setTimeout(() => {
                setIsExpanded(!isExpanded);
              }, 700);
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

// ------ REPLACE OLD FORM WITH THIS NEW ONE ------
function JobApplicationForm({ onClose }: { onClose: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      motivationLetter: "",
      consent: false,
      files: undefined,
    },
  });

  // Handle form submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmissionStatus("idle");

    try {
      // ----- SEND TO BACKEND OR DO ANY ASYNC ACTION HERE -----
      // Example: await sendApplicationToApi(values, files);

      // If everything is good:
      setSubmissionStatus("success");
    } catch (error) {
      console.error(error);
      setSubmissionStatus("error");
    }
  }

  // Handle file changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) =>
        ACCEPTED_FILE_TYPES.includes(file.type) || file.name.endsWith(".rar"), // allow .rar
    );

    if (validFiles.length !== selectedFiles.length) {
      alert(
        "Niektóre pliki zostały odrzucone. Dozwolone formaty: PDF, DOC, DOCX, JPG, PNG, ZIP, RAR.",
      );
    }

    if (validFiles.length + files.length > 5) {
      alert("Możesz załączyć maksymalnie 5 plików.");
      return;
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  // If submission succeeds, show confirmation (without closing immediately)
  if (submissionStatus === "success") {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-bold text-white">
          Dziękujemy za przesłanie aplikacji!
        </h2>
        <p className="text-sm text-zinc-300">
          Otrzymaliśmy Twoje zgłoszenie. Wkrótce się z Tobą skontaktujemy.
          <br />
          Wysłaliśmy również kopię Twojej aplikacji na podany adres email.
        </p>
        <Button
          onClick={onClose}
          className="mt-4 rounded-none bg-zinc-800 hover:bg-zinc-100 hover:text-zinc-800"
        >
          Zamknij okno
        </Button>
      </div>
    );
  }

  // If there was an error submitting, show error message with a retry or cancel
  if (submissionStatus === "error") {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-bold text-red-400">
          Wystąpił błąd podczas wysyłania aplikacji.
        </h2>
        <p className="text-sm text-zinc-300">
          Prosimy spróbować ponownie później lub skontaktować się z nami
          telefonicznie.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setSubmissionStatus("idle")}
            className="border-zinc-600 text-zinc-100"
          >
            Spróbuj ponownie
          </Button>
          <Button
            className="rounded-none bg-zinc-800 hover:bg-zinc-100 hover:text-zinc-800"
            onClick={onClose}
          >
            Zamknij
          </Button>
        </div>
      </div>
    );
  }

  // Otherwise, render the form ("idle" state)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className="text-zinc-50">Imię i Nazwisko</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Imię i Nazwisko"
                  className="rounded-none border-zinc-700 bg-zinc-800 text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email & Phone */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel className="text-zinc-50">Adres email</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="Adres email"
                    className="rounded-none border-zinc-700 bg-zinc-800 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel className="text-zinc-50">Numer telefonu</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="Numer telefonu"
                    className="rounded-none border-zinc-700 bg-zinc-800 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Motivation Letter */}
        <FormField
          control={form.control}
          name="motivationLetter"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className="text-zinc-50">Krótki list motywacyjny</FormLabel> */}
              <FormControl>
                <Textarea
                  placeholder="Krótki list motywacyjny"
                  className="min-h-[150px] rounded-none border-zinc-700 bg-zinc-800 text-white"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-zinc-400">
                Maksymalnie 1500 znaków (około 200-300 słów)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File Uploads */}
        <FormField
          control={form.control}
          name="files"
          render={() => (
            <FormItem className="space-y-4">
              {/* <FormLabel className="text-zinc-50">Załącz plik (CV/Portfolio, max 5)</FormLabel> */}
              <FormControl>
                <div className="flex w-full flex-col items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-none border-2 border-dashed border-zinc-700 bg-zinc-800 hover:bg-zinc-700">
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <Upload className="mb-3 h-8 w-8 text-zinc-400" />
                      <p className="mb-2 text-sm text-zinc-400">
                        <span>
                          Kliknij, aby przesłać lub przeciągnij i upuść
                        </span>
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.rar"
                      multiple
                    />
                  </label>
                  <FormDescription className="mt-2 text-sm text-zinc-400">
                    Obsługiwane formaty: PDF, DOC, DOCX, PNG, JPG, ZIP, RAR (max
                    5 plików)
                  </FormDescription>
                </div>
              </FormControl>
              {/* Show list of attached files */}
              {files.length > 0 && (
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="text-sm text-zinc-400">
                      {file.name}
                    </li>
                  ))}
                </ul>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Consent */}
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="rounded-none border border-white data-[state=checked]:bg-zinc-50 data-[state=checked]:text-zinc-900"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm text-zinc-400">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych przez
                  firmę Renoma w celach rekrutacyjnych, zgodnie z ustawą o
                  ochronie danych osobowych. Przyjmuję do wiadomości, że mam
                  prawo do wglądu w swoje dane, ich poprawiania oraz żądania ich
                  usunięcia w każdej chwili.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full rounded-none hover:bg-zinc-100 hover:text-zinc-800 md:w-auto"
        >
          WYŚLIJ APLIKACJĘ
        </Button>
      </form>
    </Form>
  );
}
