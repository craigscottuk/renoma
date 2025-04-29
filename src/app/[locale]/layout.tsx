import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { ReactNode } from "react";
import BaseLayout from "@/components/base-layout";
import { routing } from "@/i18n/routing";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  // TO RESTORE OTHER LANGUAGES: Change type to "pl" | "en" | "de"
  if (!routing.locales.includes(locale as "pl" | "en" | "de")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
