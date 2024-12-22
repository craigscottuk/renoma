"use client";
// cSpell:disable
import clsx from "clsx";
import * as z from "zod";
import { useState } from "react";
// import { Link } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
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
import AnimatedLink from "@/components/animated-link";
import { useLocale } from "next-intl";

interface ContactFormProps {
  color?: "light" | "dark";
  contactFormSubjects: { label: string }[];
}

export default function ContactForm({
  color = "light",
  contactFormSubjects,
}: ContactFormProps) {
  const darkInputClassNames =
    "border-none bg-zinc-800 text-zinc-100 ring-offset-black focus-visible:ring-white";
  const darkSelectContentClassNames =
    "border-zinc-800 bg-zinc-800 text-zinc-100/90";
  const darkCheckboxClassNames = "border-white";
  const darkButtonClassNames = " bg-zinc-900 hover:text-zinc-950 px-6 py-5";

  const lightInputClassNames =
    "border-zinc-200 bg-zinc-100 text-zinc-800 ring-offset-zinc-200 focus-visible:ring-zinc-800 text-[1.1rem]";
  const lightSelectContentClassNames =
    "border-zinc-300 bg-zinc-100 text-zinc-800 text-[1.1rem]";
  const lightButtonClassNames =
    " bg-zinc-100 hover:text-zinc-950 px-6 py-5 text-[1.1rem]";
  const lightCheckboxClassNames = "border-zinc-900 text-[1.1rem]";

  const t = useTranslations();
  const locale = useLocale();

  // Define schema for form validation
  const formSchema = z.object({
    firstName: z.string().min(2, t("contact-form.validation.firstName")),
    lastName: z.string().min(2, t("contact-form.validation.lastName")),
    email: z.string().email(t("contact-form.validation.email")),
    phone: z
      .string()
      .regex(/^\+?[0-9\s-]{9,}$/, t("contact-form.validation.phone")),
    topic: z.string().min(1, t("contact-form.validation.topic")),
    message: z
      .string()
      .min(10, t("contact-form.validation.messageMin"))
      .max(1500, t("contact-form.validation.messageMax")),
    privacy: z
      .boolean()
      .refine((val) => val === true, t("contact-form.validation.privacy")),
  });

  // Define TypeScript type based on the schema
  type FormData = z.infer<typeof formSchema>;

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

  const inputClassNames =
    color === "dark" ? darkInputClassNames : lightInputClassNames;
  const selectContentClassNames =
    color === "dark"
      ? darkSelectContentClassNames
      : lightSelectContentClassNames;
  const checkboxContentClassNames =
    color === "dark" ? darkCheckboxClassNames : lightCheckboxClassNames;
  const buttonClassNames =
    color === "dark" ? darkButtonClassNames : lightButtonClassNames;

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    console.log(values);

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
        <div className="text-green-600">{t("contact-form.success")}</div>
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
                      placeholder={t("contact-form.firstName")}
                      aria-label={t("contact-form.firstName")}
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
                      placeholder={t("contact-form.lastName")}
                      aria-label={t("contact-form.lastName")}
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
                      placeholder={t("contact-form.email")}
                      aria-label={t("contact-form.email")}
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
                      placeholder={t("contact-form.phone")}
                      className={inputClassNames}
                      aria-label={t("contact-form.phone")}
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
                      aria-label={t("contact-form.topic")}
                    >
                      <SelectValue placeholder={t("contact-form.topic")} />
                    </SelectTrigger>
                    <SelectContent className={clsx(selectContentClassNames)}>
                      {contactFormSubjects.map((subject, index) => (
                        <SelectItem key={index} value={subject.label}>
                          {subject.label}
                        </SelectItem>
                      ))}
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
                    placeholder={t("contact-form.message")}
                    className={clsx("min-h-[150px]", inputClassNames)}
                    {...field}
                    aria-label={t("contact-form.message")}
                  />
                </FormControl>
                <FormMessage aria-live="assertive" />
                <p className="text-xs text-zinc-600">
                  {t("contact-form.validation.messageMax")}
                </p>
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
                    className={clsx(checkboxContentClassNames, "mt-1.5")}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-label={t("contact-form.privacy")}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-balance text-[1rem] leading-relaxed md:text-[1rem]">
                    {locale === "de" ? (
                      <>
                        Durch die Angabe Ihrer persönlichen Daten akzeptieren
                        Sie unsere DSGVO-Richtlinie und die Art und Weise, wie
                        Ihre Daten in unserer{" "}
                        <AnimatedLink
                          href="/polityka-prywatnosci"
                          target="_blank"
                          className="text-base"
                          showArrow={false}
                        >
                          Datenschutzerklärung
                        </AnimatedLink>{" "}
                        verarbeitet werden.
                      </>
                    ) : locale === "en" ? (
                      <>
                        By providing your personal data, you accept our GDPR
                        policy and the way your data is processed as described
                        in our{" "}
                        <AnimatedLink
                          href="/polityka-prywatnosci"
                          target="_blank"
                          className="text-base"
                          showArrow={false}
                        >
                          privacy policy
                        </AnimatedLink>
                        .
                      </>
                    ) : (
                      <>
                        Podając swoje dane osobowe, akceptujesz naszą politykę
                        RODO oraz sposób przetwarzania Twoich danych opisany w
                        naszej{" "}
                        <AnimatedLink
                          href="/polityka-prywatnosci"
                          target="_blank"
                          className="text-base"
                          showArrow={false}
                        >
                          polityce prywatności
                        </AnimatedLink>
                        .
                      </>
                    )}
                  </FormLabel>
                  <FormMessage aria-live="assertive" />
                </div>
              </FormItem>
            )}
          />

          <Button
            variant="outline"
            type="submit"
            disabled={isLoading}
            className={clsx("w-auto", buttonClassNames)}
          >
            {isLoading ? t("contact-form.sending") : t("contact-form.submit")}
          </Button>
        </form>
      )}
    </Form>
  );
}
