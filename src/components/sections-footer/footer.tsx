// cSpell:disable
"use client";

import { Link } from "@/i18n/routing";
import NextLink from "next/link";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MaxWidthWrapper from "../max-width-wrapper";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "./socials";
import { footerLinks } from "@/lib/footerLinks";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { StaticRoutePaths } from "@/lib/routes";

interface FooterProps {
  variant?: "light" | "dark";
}

export default function Footer({ variant = "dark" }: FooterProps) {
  const t = useTranslations("footer");
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();
  const darkClasses = "text-white bg-zinc-950";
  const lightClasses = "text-black bg-white";

  return (
    <footer
      className={clsx(
        "mt-10",
        variant === "light" ? lightClasses : darkClasses,
      )}
    >
      <MaxWidthWrapper>
        <div className="py-16 pt-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerLinks.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-bolder text-xl">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href as StaticRoutePaths}
                        className="text-base text-zinc-50 decoration-white/80 decoration-1 underline-offset-8 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator
            className={clsx(
              "mb-6 mt-12 md:mt-24",
              variant === "light" ? "bg-black/40" : "bg-white/40",
            )}
          />
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-4">
            <div
              className={clsx(
                "flex flex-col items-center gap-4 sm:flex-row sm:gap-4",
                variant === "light" ? lightClasses : darkClasses,
              )}
            >
              <p className="text-center text-sm">
                {t("copyright", { year: currentYear })}
              </p>
            </div>
            <div className="flex items-center space-x-8">
              <Link
                href={"/polityka-prywatnosci" as StaticRoutePaths}
                className="text-sm text-white/90 decoration-white/80 decoration-1 underline-offset-8 hover:underline"
              >
                {t("privacyPolicy")}
              </Link>
              <div className="flex space-x-4">
                <NextLink href="https://linkedin.com" aria-label="LinkedIn">
                  <LinkedInIcon
                    className={clsx(
                      "h-5 w-5 fill-white",
                      variant === "light" ? "fill-black" : "fill-white",
                    )}
                  />
                </NextLink>
                <NextLink href="https://facebook.com" aria-label="Facebook">
                  <FacebookIcon
                    className={clsx(
                      "h-5 w-5 fill-white",
                      variant === "light" ? "fill-black" : "fill-white",
                    )}
                  />
                </NextLink>
                <NextLink href="https://instagram.com" aria-label="Instagram">
                  <InstagramIcon
                    className={clsx(
                      "h-5 w-5 fill-white",
                      variant === "light" ? "fill-black" : "fill-white",
                    )}
                  />
                </NextLink>
              </div>

              <Button
                variant="outline"
                size="icon"
                className={clsx(
                  "ml-5",
                  variant === "light" ? "fill-red-500" : "fill-blue-500",
                  variant === "light" ? lightClasses : darkClasses,
                )}
                onClick={scrollToTop}
                aria-label={t("scrollToTop")}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
