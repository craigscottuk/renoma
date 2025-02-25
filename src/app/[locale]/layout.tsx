import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { ReactNode } from "react";
import BaseLayout from "@/components/base-layout";
// import { routing } from "@/i18n/routing";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

// TODO: To restore multi-language support:
// 1. Change this back to: return routing.locales.map((locale) => ({ locale }));
// TODO: To restore multi-language support:
// 1) Change generateStaticParams back to: return routing.locales.map((locale) => ({ locale }));
// 2) Modify the if statement to include all locales (de|en|pl)
export function generateStaticParams() {
  // Temporarily only generate Polish
  return [{ locale: "pl" }];
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  // TODO: To restore multi-language support:
  // 1. Change this back to: if (!routing.locales.includes(locale as "pl" | "en" | "de"))
  // Temporarily only allow Polish
  if (locale !== "pl") {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
