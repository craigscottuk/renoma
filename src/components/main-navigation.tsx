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
    <header className="main-header fixed left-0 right-0 top-0 z-30 flex h-24 w-full items-center justify-between bg-white md:bg-blue-500 lg:bg-red-500 xl:bg-white">
      <MaxWidthWrapper className="flex h-full justify-between">
        {/* Logo */}
        <div className="my-auto flex-shrink-0">
          <Link href="/">
            <img
              className="h-16 w-auto"
              src="/renoma-logo.png"
              alt="Renoma PKZ"
            />
          </Link>
        </div>

        {/* Nav Items */}
        <div className="ml-auto flex items-end py-6">
          <nav className="flex items-end">
            {navItems.map((item, index) => (
              <NavigationLinkItem
                className="hidden text-base xl:mx-3.5 xl:flex"
                key={index}
                href={item.link}
              >
                {item.label}
              </NavigationLinkItem>
            ))}
          </nav>
          {/* Locale Switcher */}
          <LocaleSwitcher className="hidden xl:flex" />
          {/* Side Navigation */}
          <SideNavigation navItems={navItems} />
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
