// cSpell:disable
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
import { Button } from "@/components/ui/button";
import { PortableText, PortableTextBlock } from "next-sanity";
import { MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { portableTextComponents } from "@/lib/portableTextComponents";
import clsx from "clsx";
import { FadeInSection } from "@/components/fade-in-section";
import { transformPortableTextBlocks } from "@/utils/transformPortableTextBlocks";
import fixPolishOrphans from "@/utils/fixPolishOrphans";
import { useTranslations } from "next-intl";
import { JobApplicationDialog } from "@/components/job-application-dialog";

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
  const cardRef = useRef<HTMLDivElement>(null);

  const selectedColorScheme = cardColorSchemes.zincLight;

  // Apply transformPortableTextBlocks to fix Polish orphans
  const newResponsibilities = transformPortableTextBlocks(job.responsibilities);
  const newRequirements = transformPortableTextBlocks(job.requirements);
  const newBenefits = transformPortableTextBlocks(job.benefits);

  const t = useTranslations("jobOfferForm");

  return (
    <FadeInSection translateY>
      <Card
        ref={cardRef}
        className={clsx(
          "scroll-mt-28 px-0 py-1 md:px-3 md:py-5 lg:px-10 lg:py-6",
          selectedColorScheme.card,
          {
            "cursor-pointer": !isExpanded,
          },
        )}
        onClick={() => {
          // Prevent expanding when modal is open
          if (!isExpanded && !isModalOpen) {
            setIsExpanded(true);
            cardRef.current?.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle
                className="mb-6 cursor-pointer p-0 text-left font-bolder text-[1.7rem] leading-tight tracking-[-0.015em] text-zinc-900 md:text-[2rem]"
                onClick={(e) => {
                  e.stopPropagation();
                  cardRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {job.jobTitle}
              </CardTitle>
              <CardDescription
                className={clsx(
                  "mb-5 max-w-[75ch] text-[1.1rem]",
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
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? "max-h-[2000px]" : "max-h-0"
            }`}
          >
            <div className="list-indented my-10 max-w-[70ch] space-y-10 text-pretty">
              {newResponsibilities.length > 0 && (
                <div className="space-y-5">
                  <h3 className="mb-2 font-bolder text-xl text-zinc-800">
                    {t("responsibilitiesTitle")}
                  </h3>
                  <PortableText
                    value={newResponsibilities}
                    components={portableTextComponents}
                  />
                </div>
              )}
              {newRequirements.length > 0 && (
                <div className="space-y-5">
                  <h3 className="mb-2 font-bolder text-xl text-zinc-800">
                    {t("requirementsTitle")}
                  </h3>
                  <PortableText
                    value={newRequirements}
                    components={portableTextComponents}
                  />
                </div>
              )}
              {newBenefits.length > 0 && (
                <div className="space-y-5">
                  <h3 className="mb-2 font-bolder text-xl text-zinc-800">
                    {t("benefitsTitle")}
                  </h3>
                  <PortableText
                    value={newBenefits}
                    components={portableTextComponents}
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button
            className="bg-zinc-50 text-zinc-950 hover:bg-zinc-800 hover:text-zinc-100"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            {t("applyNow")}
          </Button>

          <JobApplicationDialog
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            jobTitle={job.jobTitle}
            formSource="jobOffer"
          />

          <Button
            variant="link"
            className="text-zinc-800 hover:text-zinc-900"
            onClick={(e) => {
              e.stopPropagation();
              // Prevent expanding/collapsing when modal is open
              if (!isModalOpen) {
                cardRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                const delay = isExpanded ? 300 : 700;
                setTimeout(() => {
                  setIsExpanded(!isExpanded);
                }, delay);
              }
            }}
          >
            {isExpanded ? (
              <>
                {t("lessDetails")} <ChevronUp className="inline h-4 w-4" />
              </>
            ) : (
              <>
                {t("moreDetails")} <ChevronDown className="inline h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </FadeInSection>
  );
}
