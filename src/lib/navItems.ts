// cSpell:disable
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/lib/types";

type NavItem = {
  label: string;
  link: RoutePaths;
};

export function useNavItems(): NavItem[] {
  const t = useTranslations("main-navigation");

  return [
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
}
