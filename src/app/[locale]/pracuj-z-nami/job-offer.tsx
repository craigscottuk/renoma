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
          "mb-6 cursor-pointer scroll-mt-28",
          selectedColorScheme.card,
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
                className="mb-5 text-[1.8rem] tracking-[-0.015em] marker:leading-tight"
                onClick={(e) => {
                  e.stopPropagation();
                  cardRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
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
            {newResponsibilities.length > 0 && (
              <>
                <h3 className="mb-2 text-lg font-semibold">
                  {t("responsibilitiesTitle")}
                </h3>
                <PortableText
                  value={newResponsibilities}
                  components={portableTextComponents}
                />
              </>
            )}
            {newRequirements.length > 0 && (
              <>
                <h3 className="mb-2 text-lg font-semibold">
                  {t("requirementsTitle")}
                </h3>
                <PortableText
                  value={newRequirements}
                  components={portableTextComponents}
                />
              </>
            )}
            {newBenefits.length > 0 && (
              <>
                <h3 className="mb-2 text-lg font-semibold">
                  {t("benefitsTitle")}
                </h3>
                <PortableText
                  value={newBenefits}
                  components={portableTextComponents}
                />
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button
            className="hover:bg-zinc-800 hover:text-zinc-100"
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
                {t("lessDetails")} <ChevronUp className="ml-1 inline h-4 w-4" />
              </>
            ) : (
              <>
                {t("moreDetails")}{" "}
                <ChevronDown className="ml-1 inline h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </FadeInSection>
  );
}
