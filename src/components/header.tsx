"use client";
import { Button } from "./ui/button";
import { Link } from "@/i18n/routing";
import { Menu, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import MaxWidthWrapper from "./max-width-wrapper";
import { MobileNav } from "./navigation/mobile-nav";
import MainNavigation from "./navigation/main-navigation";
// import LocaleSwitcher from "./navigation/locale-switcher";
import { useMobileNav } from "./navigation/mobile-nav-provider";

interface HeaderProps {
  socialMediaLinks: {
    facebook: string;
    instagram: string;
    linkedIn: string;
  };
}

// motion-preset-fade-lg

export default function Header({ socialMediaLinks }: HeaderProps) {
  const t = useTranslations("header");
  // Get the isOpen, openMobileNav, and closeMobileNav functions from context
  const { isOpen, openMobileNav, closeMobileNav } = useMobileNav();
  return (
    <>
      <header className="fixed left-0 z-30 h-20 w-[100vw] bg-white md:h-24">
        <MaxWidthWrapper className="motion-preset-focus-md h-full">
          <div className="flex h-full w-full items-center md:pb-0">
            {/* Logo */}
            <Link href="/">
              <img
                className="h-[45px] lg:motion-preset-blur-up-sm md:h-[55px] lg:h-[65px]"
                src="/renoma-logo.svg"
                alt="Renoma PKZ"
              />
            </Link>

            {/* Nav Items */}
            <div className="ml-auto flex h-full items-center pt-[0.8rem] md:pt-2.5 lg:pt-6">
              <MainNavigation />

              {/* Locale Switcher */}
              {/* <LocaleSwitcher className="motion-preset-blur-up-sm ml-1 lg:ml-0.5 xl:ml-4" /> */}

              {/* Contact */}
              <Link href="/kontakt">
                <Button
                  variant="ghost"
                  className="px-1.5 sm:px-2 lg:hidden"
                  aria-label={t("contactAriaLabel")}
                >
                  <Mail className="mr-0.5 min-h-5 min-w-5 stroke-1 text-zinc-950 sm:min-h-6 sm:min-w-6" />
                </Button>
              </Link>

              {/* Mobile menu */}
              <Button
                variant="ghost"
                className="px-1.5 sm:px-2 lg:hidden"
                onClick={openMobileNav}
                aria-label={t("openMenuAriaLabel")}
              >
                <Menu className="min-h-7 min-w-7 stroke-1 text-zinc-950" />
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
      <MobileNav
        isOpen={isOpen}
        onClose={closeMobileNav}
        socialMediaLinks={socialMediaLinks}
      />
    </>
  );
}
