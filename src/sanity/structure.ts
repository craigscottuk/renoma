// cSpell:disable
import type { StructureResolver } from "sanity/structure";
import {
  singletonDocumentListItem,
  filteredDocumentListItems,
} from "sanity-plugin-singleton-tools";
import {
  Home,
  Info,
  Briefcase,
  FolderOpen,
  FileText,
  Beaker,
  GraduationCap,
  Users,
  Mail,
  Settings,
  Cookie,
  MousePointerClick,
} from "lucide-react";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Zawartość")
    .items([
      S.listItem()
        .title("Dom")
        .icon(Home)
        .child(
          S.list()
            .title("Sekcje strony „Dom”")
            .items([
              singletonDocumentListItem({
                S,
                context,
                type: "heroSection",
                title: "Sekcja 1: Powitanie",
                id: "singletonHeroSection",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "aboutSectionHome",
                title: "Sekcja 2: O nas",
                id: "singletonAboutSectionHome",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "servicesSectionHome",
                title: "Sekcja 3: Usługi",
                id: "singletonServicesSectionHome",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "logoSectionHome",
                title: "Sekcja 4: Zaufali nam",
                id: "singletonLogoSectionHome",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "faqSectionHome",
                title: "Sekcja 5: FAQ",
                id: "singletonFaqSectionHome",
              }),
            ]),
        ),
      S.listItem()
        .title("O nas")
        .icon(Info)
        .child(
          S.list()
            .title("Sekcje strony „O nas”")
            .items([
              singletonDocumentListItem({
                S,
                context,
                type: "aboutUsHeader",
                title: "Sekcja 1: Nagłówek",
                id: "singletonAboutUsHeader",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "aboutUs",
                title: "Sekcja 2: O nas i nasza wartości",
                id: "singletonAboutUs",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "ourHistory",
                title: "Sekcja 3: Oś czasu",
                id: "singletonTimeline",
              }),
            ]),
        ),
      S.listItem()
        .title("Usługi")
        .icon(Briefcase)
        .child(
          S.list()
            .title("Sekcje strony „Usługi”")
            .items([
              singletonDocumentListItem({
                S,
                context,
                type: "servicesHeader",
                title: "Sekcja 1: Nagłówek",
                id: "singletonServicesHeader",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "servicesGroup",
                title: "Sekcja 2: Usługi",
                id: "singletonServicesGroup",
              }),
            ]),
        ),
      S.listItem()
        .title("Realizacje")
        .icon(FolderOpen)
        .child(
          S.list()
            .title("Sekcje strony „Realizacje”")
            .items([
              singletonDocumentListItem({
                S,
                context,
                type: "caseStudyHeader",
                title: "Sekcja 1: Nagłówek",
                id: "singletonProjectsHeader",
              }),
            ]),
        ),
      S.documentTypeListItem("caseStudyEntry")
        .title("Wpis realizacji")
        .icon(FileText),
      S.listItem()
        .title("Renoma LAB")
        .icon(Beaker)
        .child(
          S.list()
            .title("Sekcje strony „RenomaLAB”")
            .items([
              singletonDocumentListItem({
                S,
                context,
                type: "renomaLabHeader",
                title: "Sekcja 1: Nagłówek",
                id: "singletonRenomaLabHeader",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "aboutLab",
                title: "Sekcja 2: O RenomaLAB",
                id: "singletonAboutLab",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "labOffer",
                title: "Sekcja 3: Oferta",
                id: "singletonLabOffer",
              }),
            ]),
        ),
      S.listItem()
        .title("Ucz się z nami")
        .icon(GraduationCap)
        .child(
          S.list()
            .title("Sekcje strony „Ucz się z nami”")
            .items([
              singletonDocumentListItem({
                S,
                context,
                type: "learnWithUsHeader",
                title: "Sekcja 1: Nagłówek",
                id: "singletonLearnWithUsHeader",
              }),

              singletonDocumentListItem({
                S,
                context,
                type: "whatWeOffer",
                title: "Sekcja 2: Co oferujemy?",
                id: "singletonWhatWeOffer",
              }),

              singletonDocumentListItem({
                S,
                context,
                type: "whoWeAreLookingFor",
                title: "Sekcja 3: Kogo szukamy?",
                id: "singletonWhoWeAreLookingFor",
              }),
            ]),
        ),
      S.listItem()
        .title("Pracuj z nami")
        .icon(Users)
        .child(
          S.list()
            .title("Sekcje strony „Pracuj z nami”")
            .items([
              singletonDocumentListItem({
                S,
                context,
                type: "workWithUsHeader",
                title: "Sekcja 1: Nagłówek",
                id: "singletonWorkWithUsHeader",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "jobOffers",
                title: "Sekcja 2: Oferty pracy",
                id: "singletonJobOffer",
              }),
            ]),
        ),
      S.listItem()
        .title("Kontakt")
        .icon(Mail)
        .child(
          S.list()
            .title("Sekcje strony „Kontakt”")
            .items([
              singletonDocumentListItem({
                S,
                context,
                type: "contactHeader",
                title: "Sekcja 1: Nagłówek",
                id: "singletonContaktHeader",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "contactForm",
                title: "Sekcja 2: Formularz kontaktowy",
                id: "singletonContactForm",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "contactDetails",
                title: "Sekcja 3: Dane kontaktowe",
                id: "singletonContactDetails",
              }),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("CTA")
        .icon(MousePointerClick)
        .child(
          S.list()
            .title("CTA")
            .items([
              singletonDocumentListItem({
                S,
                context,
                type: "ctaContent",
                title: "CTA",
                id: "singletonCtaContent",
              }),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Polityka Prywatności")
        .icon(Cookie)
        .child(
          S.list()
            .title("Sekcje strony „Polityka Prywatności”")
            .items([
              singletonDocumentListItem({
                S,
                context,
                type: "privacyHeader",
                title: "Sekcja 1: Nagłówek",
                id: "singletonPrivacyHeader",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "privacyText",
                title: "Sekcja 2: Treść",
                id: "singletonPrivacyText",
              }),
            ]),
        ),
      S.divider(),
      singletonDocumentListItem({
        S,
        context,
        type: "settings",
        title: "Ustawienia",
        icon: Settings,
        id: "singletonSettings",
      }),
      S.divider(),
      ...filteredDocumentListItems({ S, context }).filter(
        (item) => item.getId() !== "caseStudyEntry",
      ),
    ]);
