"use client";

import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CaseStudy {
  title: string;
  slug: string;
  imageUrl: string;
}

interface CaseStudyNavigationProps {
  previousCaseStudy?: CaseStudy | null;
  nextCaseStudy?: CaseStudy | null;
}

export function CaseStudyNavigation({
  previousCaseStudy,
  nextCaseStudy,
}: CaseStudyNavigationProps) {
  const locale = useLocale();
  const t = useTranslations("caseStudyNavigation");

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="border-none bg-gray-50">
        <CardContent className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
          {previousCaseStudy ? (
            <Link
              href={{
                pathname: "/realizacje/[slug]",
                params: { slug: previousCaseStudy.slug },
              }}
              locale={locale}
              className="w-full sm:w-auto"
            >
              <Button
                variant="ghost"
                className="group flex w-full items-center gap-2 transition-all hover:bg-white hover:shadow-sm"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <div className="flex flex-col items-start">
                  <span className="text-sm text-muted-foreground">
                    {t("previousCaseStudy")}
                  </span>
                  <span className="font-medium">{previousCaseStudy.title}</span>
                </div>
              </Button>
            </Link>
          ) : (
            <div className="w-full sm:w-auto" />
          )}

          {nextCaseStudy ? (
            <Link
              href={{
                pathname: "/realizacje/[slug]",
                params: { slug: nextCaseStudy.slug },
              }}
              locale={locale}
              className="w-full sm:w-auto"
            >
              <Button
                variant="ghost"
                className="group flex w-full items-center gap-2 transition-all hover:bg-white hover:shadow-sm"
              >
                <div className="flex flex-col items-end">
                  <span className="text-sm text-muted-foreground">
                    {t("nextCaseStudy")}
                  </span>
                  <span className="font-medium">{nextCaseStudy.title}</span>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <div className="w-full sm:w-auto" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
