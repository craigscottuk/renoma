// cSpell:disable
"use client";

import { Link } from "@/i18n/routing";
import NextLink from "next/link";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MaxWidthWrapper from "./max-width-wrapper";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "./socials";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { StaticRoutePaths } from "@/lib/routes";
import AnimatedLink from "@/components/animated-link";
import { FadeInSection } from "@/components/fade-in-section";
import fixPolishOrphans from "@/utils/fixPolishOrphans";

interface FooterProps {
  variant?: "light" | "dark";
  locale: string;
  serviceGroups: ServiceGroup[];
  socialMediaLinks: SocialMediaLinks;
}

interface ServiceGroup {
  title: string;
  services: { title: string }[];
}

interface SocialMediaLinks {
  facebook: string;
  instagram: string;
  linkedIn: string;
}

const linkClasses =
  "text-base text-zinc-300 decoration-zinc-200 decoration-1 underline-offset-8 hover:text-zinc-50 hover:underline";

export default function Footer({
  variant = "dark",
  serviceGroups,
  socialMediaLinks,
}: FooterProps) {
  const t = useTranslations("footer");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();
  const darkClasses = "text-zinc-100 bg-zinc-900";
  const lightClasses = "text-zinc-950 bg-white";

  return (
    <footer
      className={clsx("", variant === "light" ? lightClasses : darkClasses)}
    >
      <MaxWidthWrapper>
        <div className="py-16 pt-16 lg:pt-24">
          <FadeInSection>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {serviceGroups.map((group, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="font-bolder text-xl">
                    {fixPolishOrphans(group.title)}
                  </h4>
                  <ul className="space-y-2">
                    {group.services.map((service, index) => (
                      <li key={index}>
                        <AnimatedLink
                          showArrow={false}
                          underline={false}
                          href={`/uslugi#${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                          className={linkClasses}
                        >
                          {fixPolishOrphans(service.title)}
                        </AnimatedLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="space-y-4">
                <h4 className="font-bolder text-xl">{t("contact")}</h4>
                <ul className="space-y-2">
                  <li>
                    <AnimatedLink
                      showArrow={false}
                      underline={false}
                      href={t("contactLink")}
                      className={linkClasses}
                    >
                      {t("contactUs")}
                    </AnimatedLink>
                  </li>
                </ul>
              </div>
            </div>
          </FadeInSection>
          <Separator
            className={clsx(
              "mb-6 mt-12 md:mt-24",
              variant === "light" ? "bg-zinc-900/40" : "bg-zinc-200/40",
            )}
          />
          <FadeInSection>
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-4">
              <div
                className={clsx(
                  "order-2 flex flex-col items-center gap-4 sm:order-1 sm:flex-row sm:gap-4",
                  variant === "light" ? lightClasses : darkClasses,
                )}
              >
                <p className="mt-4 text-center text-sm text-zinc-200 md:mt-0">
                  {t("copyright", { year: currentYear })}
                </p>
              </div>
              <div className="order-1 flex items-center space-x-10 sm:order-2 md:space-x-8">
                <Link
                  href={"/polityka-prywatnosci" as StaticRoutePaths}
                  className={clsx(linkClasses, "text-sm")}
                >
                  {t("privacyPolicy")}
                </Link>
                <div className="flex space-x-4">
                  <NextLink
                    href={socialMediaLinks.linkedIn}
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon
                      className={clsx(
                        "h-5 w-5 fill-zinc-200",
                        variant === "light" ? "fill-zinc-950" : "fill-zinc-200",
                      )}
                    />
                  </NextLink>
                  <NextLink
                    href={socialMediaLinks.facebook}
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon
                      className={clsx(
                        "h-5 w-5 fill-zinc-200",
                        variant === "light" ? "fill-zinc-950" : "fill-zinc-200",
                      )}
                    />
                  </NextLink>
                  <NextLink
                    href={socialMediaLinks.instagram}
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon
                      className={clsx(
                        "h-5 w-5 fill-zinc-200",
                        variant === "light" ? "fill-zinc-950" : "fill-zinc-200",
                      )}
                    />
                  </NextLink>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className={clsx(
                    "ml-5 h-8 w-8 lg:h-9 lg:w-8",
                    variant === "light" ? lightClasses : darkClasses,
                  )}
                  onClick={scrollToTop}
                  aria-label={t("scrollToTop")}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </FadeInSection>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
