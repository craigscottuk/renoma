// cSpell:disable

import { useTranslations } from "next-intl";
import LocaleSwitcher from "./locale-switcher";
import NavigationLinkItem from "./navigation-link-item";

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
    <div className="bg-slate-850">
      <nav className="container flex justify-between p-2 text-black">
        <div>
          {navItems.map((item, index) => (
            <NavigationLinkItem key={index} href={item.link}>
              {item.label}
            </NavigationLinkItem>
          ))}
        </div>
        <LocaleSwitcher />
      </nav>
    </div>
  );
}
