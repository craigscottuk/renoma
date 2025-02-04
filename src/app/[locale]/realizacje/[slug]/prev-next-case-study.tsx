"use client";

import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MaxWidthWrapper from "@/components/max-width-wrapper";

interface CaseStudy {
  title: string;
  slug: string;
  imageUrl: string;
}

interface PrevNextCaseStudyProps {
  previousCaseStudy?: CaseStudy | null;
  nextCaseStudy?: CaseStudy | null;
}

const containerClasses = "w-full sm:w-auto";
const buttonClasses =
  "group flex w-full items-center gap-2 transition-all hover:bg-zinc-200 hover:shadow-none";
const titleClasses =
  "text-base text-zinc-800 decoration-zinc-800 decoration-1 underline-offset-8 hover:text-zinc-900 hover:underline";
const subtitleClasses = "text-base text-zinc-500";

export function PrevNextCaseStudy({
  previousCaseStudy,
  nextCaseStudy,
}: PrevNextCaseStudyProps) {
  const locale = useLocale();
  const t = useTranslations("PrevNextCaseStudy");

  return (
    <div className="bg-zinc-200">
      <MaxWidthWrapper className="container mx-auto px-4 py-12">
        <Card className="border-none bg-zinc-200 shadow-none">
          <CardContent className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
            {previousCaseStudy ? (
              <Link
                href={{
                  pathname: "/realizacje/[slug]",
                  params: { slug: previousCaseStudy.slug },
                }}
                locale={locale}
                className={containerClasses}
              >
                <Button variant="ghost" className={buttonClasses}>
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1.5" />
                  <div className="flex flex-col items-start">
                    <span className={subtitleClasses}>
                      {t("previousCaseStudy")}
                    </span>
                    <span className={titleClasses}>
                      {previousCaseStudy.title}
                    </span>
                  </div>
                </Button>
              </Link>
            ) : (
              <div className={containerClasses} />
            )}

            {nextCaseStudy ? (
              <Link
                href={{
                  pathname: "/realizacje/[slug]",
                  params: { slug: nextCaseStudy.slug },
                }}
                locale={locale}
                className={containerClasses}
              >
                <Button variant="ghost" className={buttonClasses}>
                  <div className="flex flex-col items-end">
                    <span className={subtitleClasses}>
                      {t("nextCaseStudy")}
                    </span>

                    <span className={titleClasses}>{nextCaseStudy.title}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                </Button>
              </Link>
            ) : (
              <div className={containerClasses} />
            )}
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </div>
  );
}
