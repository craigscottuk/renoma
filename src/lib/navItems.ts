// cSpell:disable
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/lib/routes";

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
      // link: "/",
    },
    {
      label: t("renomaLab.label"),
      // link: "/",
      link: "/renoma-lab",
    },
    {
      label: t("uczSieZNami.label"),
      link: "/ucz-sie-z-nami",
    },
    {
      label: t("pracujZNami.label"),
      // link: "/pracuj-z-nami",
      link: "/",
    },
    {
      label: t("kontakt.label"),
      link: "/",
      // link: "/kontakt",
    },
  ];
}
