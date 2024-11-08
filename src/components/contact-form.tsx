"use client";
// cSpell:disable

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { RoutePaths } from "@/lib/types";
import { Link } from "@/i18n/routing";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Define schema for form validation
const formSchema = z.object({
  firstName: z.string().min(2, "Imię musi mieć co najmniej 2 znaki"),
  lastName: z.string().min(2, "Nazwisko musi mieć co najmniej 2 znaki"),
  email: z.string().email("Nieprawidłowy adres email"),
  phone: z.string().regex(/^\+?[0-9\s-]{9,}$/, "Nieprawidłowy numer telefonu"),
  topic: z.string().min(1, "Wybierz temat"),
  message: z
    .string()
    .min(10, "Wiadomość musi mieć co najmniej 10 znaków")
    .max(1500, "Wiadomość nie może przekraczać 1500 znaków"),
  privacy: z
    .boolean()
    .refine((val) => val === true, "Musisz zaakceptować politykę prywatności"),
});

// Define TypeScript type based on the schema
type FormData = z.infer<typeof formSchema>;

const darkInputClassNames =
  "border-none bg-zinc-800 text-white ring-offset-black focus-visible:ring-white";
const darkSelectContentClassNames = "border-zinc-900 bg-zinc-700 text-white";
const darkCheckboxClassNames = "border-white";

interface ContactFormProps {
  theme?: "light" | "dark";
}

export default function ContactForm({ theme = "light" }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      topic: "",
      message: "",
      privacy: false,
    },
  });

  const inputClassNames = theme === "dark" ? darkInputClassNames : "";
  const selectContentClassNames =
    theme === "dark" ? darkSelectContentClassNames : "";
  const checkboxContentClassNames =
    theme === "dark" ? darkCheckboxClassNames : "";

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    // Simulate a form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      {isSubmitted ? (
        <div className="text-green-600">Dziękujemy za kontakt!</div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Imię"
                      aria-label="Imię"
                      className={inputClassNames}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage aria-live="assertive" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Nazwisko"
                      aria-label="Nazwisko"
                      className={inputClassNames}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage aria-live="assertive" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Adres email"
                      aria-label="Adres email"
                      className={inputClassNames}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage aria-live="assertive" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Numer telefonu"
                      className={inputClassNames}
                      aria-label="Numer telefonu"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage aria-live="assertive" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className={inputClassNames}
                      aria-label="Wybierz temat"
                    >
                      <SelectValue placeholder="Wybierz temat..." />
                    </SelectTrigger>
                    <SelectContent className={clsx(selectContentClassNames)}>
                      <SelectItem value="general">Zapytanie ogólne</SelectItem>
                      <SelectItem value="support">
                        Wsparcie techniczne
                      </SelectItem>
                      <SelectItem value="billing">Rozliczenia</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage aria-live="assertive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Wiadomość"
                    className={clsx("min-h-[150px]", inputClassNames)}
                    {...field}
                    aria-label="Wiadomość"
                  />
                </FormControl>
                <FormMessage aria-live="assertive" />
                <p className="text-xs text-zinc-400">Maksymalnie 1500 znaków</p>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="privacy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    className={clsx(checkboxContentClassNames)}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-label="Zgoda na politykę prywatności"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Wyrażam zgodę na przetwarzanie moich danych osobowych
                    zgodnie z{" "}
                    <Link
                      href={"/polityka-prywatnosci" as RoutePaths}
                      target="_blank"
                      className="underline"
                    >
                      Polityką Prywatności
                    </Link>{" "}
                    w celu odpowiedzi na moje zapytanie.
                  </FormLabel>
                  <FormMessage aria-live="assertive" />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-auto">
            {isLoading ? "Wysyłanie..." : "WYŚLIJ"}
          </Button>
        </form>
      )}
    </Form>
  );
}
