// cSpell:disable
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Upload } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "application/zip",
  "application/x-rar-compressed",
];

interface JobApplicationFormProps {
  onSuccess: () => void;
  onError: () => void;
  formSource: "jobOffer" | "whoWeAre";
}

export function JobApplicationForm({
  onSuccess,
  onError,
  formSource,
}: JobApplicationFormProps) {
  const t = useTranslations("jobOfferForm");

  const [files, setFiles] = useState<File[]>([]);

  const formSchema = z.object({
    fullName: z.string().min(2, {
      message: t("validation.fullNameMin"),
    }),
    email: z.string().email({
      message: t("validation.emailInvalid"),
    }),
    phone: z.string().regex(/^[0-9+\s-]{9,}$/, {
      message: t("validation.phoneInvalid"),
    }),
    motivationLetter: z.string().max(1500, {
      message: t("validation.motivationLetterMax"),
    }),
    consent: z.boolean().refine((val) => val === true, {
      message: t("validation.consentRequired"),
    }),
    files: z.any().optional(),
  });

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) =>
        ACCEPTED_FILE_TYPES.includes(file.type) || file.name.endsWith(".rar"),
    );

    if (validFiles.length !== selectedFiles.length) {
      alert(t("alertInvalidFiletype"));
    }

    const oversizedFiles = validFiles.filter(
      (file) => file.size > MAX_FILE_SIZE,
    );
    if (oversizedFiles.length > 0) {
      alert(t("alertFileTooLarge"));
      return;
    }

    if (validFiles.length + files.length > 5) {
      alert(t("alertMaxFiles"));
      return;
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("motivationLetter", values.motivationLetter);
      formData.append("consent", values.consent.toString());

      // Append files
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/application-form", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      onError();
    }
  }

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
                  placeholder={t("fullNamePlaceholder")}
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
                    placeholder={t("emailPlaceholder")}
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
                    placeholder={t("phonePlaceholder")}
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
                  placeholder={
                    formSource === "jobOffer"
                      ? t("motivationLetterPlaceholder")
                      : t("whyUsPlaceholder")
                  }
                  className="min-h-[150px] rounded-none border-zinc-700 bg-zinc-800 text-white"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-zinc-400">
                {t("motivationLetterMaxHint")}
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
                      <Upload className="mb-3 h-8 w-8 text-[#737373]" />
                      <p className="mb-2 text-[1.1rem] text-[#737373]">
                        <span>{t("uploadHint")}</span>
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
                    {t("uploadFormatsHint")} (max 25MB)
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
                  // Updated to add a hover background color
                  className="mt-1 rounded-none border border-white hover:bg-zinc-700 data-[state=checked]:bg-zinc-50 data-[state=checked]:text-zinc-900"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm text-zinc-400">
                  {t("consentText")}
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full rounded-none bg-zinc-700 hover:bg-zinc-100 hover:text-zinc-800 md:w-auto"
        >
          {t("submit")}
        </Button>
      </form>
      <style jsx global>{`
        /* Disable Chrome autofill styles while preserving focus styles */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus,
        select:-webkit-autofill,
        select:-webkit-autofill:hover,
        select:-webkit-autofill:focus {
          -webkit-text-fill-color: white;
          -webkit-box-shadow: 0 0 0px 1000px #27272a inset;
          transition: background-color 5000s ease-in-out 0s;
          font-size: 17.6px;
        }

        /* Preserve shadcn input focus styles */
        .bg-zinc-800:focus-within {
          outline: 2px solid hsl(var(--ring));
          outline-offset: -2px;
        }

        /* Scroll bar styles */
        .myDialog::-webkit-scrollbar {
          width: 6px;
        }
        .myDialog::-webkit-scrollbar-track {
          background: #18181b;
        }
        .myDialog::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 9999px;
        }
        .myDialog::-webkit-scrollbar-thumb:hover {
          background: #27272a;
        }

        /* For Firefox */
        .myDialog {
          scrollbar-width: auto;
          scrollbar-color: #27272a #18181b;
        }
      `}</style>
    </Form>
  );
}
