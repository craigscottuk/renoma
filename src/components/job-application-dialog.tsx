// src/components/job-application-dialog.tsx
// cSpell:disable
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { JobApplicationForm } from "./job-application-form";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Send } from "lucide-react";

interface JobApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle: string;
  formSource: "jobOffer" | "whoWeAre";
}

export function JobApplicationDialog({
  open,
  onOpenChange,
  jobTitle,
  formSource,
}: JobApplicationDialogProps) {
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const t = useTranslations("jobOfferForm");

  const handleClose = () => onOpenChange(false);

  if (submissionStatus === "success") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="scrollable-area h-[90vh] max-w-3xl overflow-hidden border-none bg-zinc-900 px-16 py-12 text-zinc-50">
          <div className="pt- flex min-h-screen w-full items-center">
            <Card className="mx-auto max-w-md border-none bg-zinc-900 shadow-none">
              <CardHeader>
                <CardTitle className="text-center font-bolder text-[1.7rem] text-zinc-50">
                  <div className="flex items-center justify-center">
                    <Send className="mr-4 h-6 w-6 text-zinc-50" />
                    {t("thankYouTitle")}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pretty text-center text-[1.1rem] text-zinc-200">
                  {t("thankYouBody")}
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  className="mt-4 bg-zinc-200 text-[1.1rem] text-zinc-900 hover:bg-zinc-50"
                  onClick={handleClose}
                >
                  {t("closeButton")}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (submissionStatus === "error") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="scrollable-area h-[90vh] max-w-3xl overflow-y-auto bg-zinc-900 px-16 py-12 text-zinc-50">
          <div className="space-y-4 text-center">
            <h2 className="mb-8 text-2xl font-bold text-red-400">
              {t("errorTitle")}
            </h2>
            <p className="text-[1.1rem] text-zinc-300">{t("errorBody")}</p>
            <div className="flex items-center justify-center space-x-4">
              <Button
                className="rounded-none bg-zinc-700 hover:bg-zinc-100 hover:text-zinc-800"
                onClick={() => setSubmissionStatus("idle")}
              >
                {t("tryAgain")}
              </Button>
              <Button onClick={handleClose}>{t("closeButton")}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="scrollable-area h-[90vh] max-w-3xl overflow-y-auto border-none bg-zinc-900 px-16 py-12 text-zinc-50">
        <DialogHeader>
          <DialogTitle className="mb-5 text-xl tracking-[-0.015em] marker:leading-tight lg:text-[1.75rem]">
            {formSource === "jobOffer"
              ? t("applyPosition", { jobTitle })
              : t("applyInternship")}
          </DialogTitle>
        </DialogHeader>
        <JobApplicationForm
          onSuccess={() => setSubmissionStatus("success")}
          onError={() => setSubmissionStatus("error")}
          formSource={formSource}
        />
      </DialogContent>
    </Dialog>
  );
}
