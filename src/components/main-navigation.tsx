// cSpell:disable

import { useTranslations } from "next-intl";
import LocaleSwitcher from "./locale-switcher";
import NavigationLinkItem from "./navigation-link-item";
import MaxWidthWrapper from "./max-width-wrapper";
import { Link } from "@/i18n/routing";
import SideNavigation from "./side-navigation";
import { RoutePaths } from "@/lib/types";

type NavItem = {
  label: string;
  link: RoutePaths;
};

export default function MainNavigation() {
  const t = useTranslations("main-navigation");

  const navItems: NavItem[] = [
    {
      label: t("oNas.label"),
      link: "/o-nas",
    },
    {
      label: t("uslugi.label"),
      link: "/uslugi",
    },
    {
      label: t("realizacje.label"),
      link: "/realizacje",
    },
    {
      label: t("renomaLab.label"),
      link: "/renoma-lab",
    },
    {
      label: t("uczSieZNami.label"),
      link: "/ucz-sie-z-nami",
    },
    {
      label: t("pracujZNami.label"),
      link: "/pracuj-z-nami",
    },
    {
      label: t("kontakt.label"),
      link: "/kontakt",
    },
  ];

  return (
    <MaxWidthWrapper>
      <header className="main-header flex h-24 w-full items-end justify-between py-4">
        {/* Logo */}
        <div className="">
          <Link href="/">
            <img
              className="h-[70px] w-auto"
              src="/renoma-logo.png"
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

        {/* Side Navigation */}
        <SideNavigation navItems={navItems} />
      </header>
    </MaxWidthWrapper>
  );
}
