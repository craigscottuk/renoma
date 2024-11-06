// cSpell:disable

import { useTranslations } from "next-intl";
import LocaleSwitcher from "./locale-switcher";
import NavigationLinkItem from "./navigation-link-item";
import MaxWidhthWrapper from "./max-width-wrapper";
import { Link } from "@/i18n/routing";

type NavItem = {
  label: string;
  link:
    | "/o-nas"
    | "/uslugi"
    | "/realizacje"
    | "/renoma-lab"
    | "/ucz-sie-z-nami"
    | "/pracuj-z-nami"
    | "/kontakt";
};

export default function MainNavigation() {
  const t = useTranslations("main-navigation");

  const navItems: NavItem[] = [
    {
      label: t("oNas.label"),
      link: "/o-nas" as const,
    },
    {
      label: t("uslugi.label"),
      link: "/uslugi" as const,
    },
    {
      label: t("realizacje.label"),
      link: "/realizacje" as const,
    },
    {
      label: t("renomaLab.label"),
      link: "/renoma-lab" as const,
    },
    {
      label: t("uczSieZNami.label"),
      link: "/ucz-sie-z-nami" as const,
    },
    {
      label: t("pracujZNami.label"),
      link: "/pracuj-z-nami" as const,
    },
    {
      label: t("kontakt.label"),
      link: "/kontakt" as const,
    },
  ];

  return (
    <MaxWidhthWrapper>
      <header className="flex h-24 w-full items-end justify-between py-4">
        {/* Logo */}
        <div className="">
          <Link href="/">
            <img
              className="h-[70px] w-auto"
              src="/renoma-logo.svg"
              alt="Renoma PKZ"
            />
          </Link>
        </div>

        {/* Nav Items */}
        <div className="ml-auto">
          <nav className="flex items-end">
            {navItems.map((item, index) => (
              <NavigationLinkItem key={index} href={item.link}>
                {item.label}
              </NavigationLinkItem>
            ))}

            {/* Locale Switcher */}
            <LocaleSwitcher />
          </nav>
        </div>
      </header>
    </MaxWidhthWrapper>
  );
}
