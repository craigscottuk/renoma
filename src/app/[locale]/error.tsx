"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({ error, reset }: Props) {
  const t = useTranslations("error-page");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <MaxWidthWrapper>
      <div className="mt-40 min-h-[50Vh] text-center">
        <h1 className="text-4xl font-bold text-black">{t("title")}</h1>
        <div className="mt-8">
          {t.rich("description", {
            p: (chunks) => <p className="mt-4 text-lg">{chunks}</p>,
            retry: (chunks) => (
              <a
                className="mt-6 cursor-pointer text-black underline underline-offset-2"
                onClick={reset}
              >
                {chunks}
              </a>
            ),
          })}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
