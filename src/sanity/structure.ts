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
                type: "faqSectionHome",
                title: "Sekcja 4: FAQ",
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
                type: "aboutHeaderSection",
                title: "Sekcja 1: Nagłówek",
                id: "singletonAboutHeaderSection",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "timelineSection",
                title: "Sekcja 2: Oś czasu",
                id: "singletonTimelineSection",
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
                type: "servicesHeaderSection",
                title: "Sekcja 1: Nagłówek",
                id: "singletonServicesHeaderSection",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "servicesListSection",
                title: "Sekcja 2: Lista usług",
                id: "singletonServicesListSection",
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
                type: "realizacjeHeaderSection",
                title: "Sekcja 1: Nagłówek",
                id: "singletonProjectsHeaderSection",
              }),
            ]),
        ),
      S.documentTypeListItem("wpisRealizacji")
        .title("Wpis realizacji")
        .icon(FileText),
      S.listItem()
        .title("Renoma LAB")
        .icon(Beaker)
        .child(
          S.list()
            .title("Sekcje strony „Renoma LAB”")
            .items([
              singletonDocumentListItem({
                S,
                context,
                type: "renomaLabHeaderSection",
                title: "Sekcja 1: Nagłówek",
                id: "singletonRenomaLabHeaderSection",
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
                type: "learnWithUsHeaderSection",
                title: "Sekcja 1: Nagłówek",
                id: "singletonLearnWithUsHeaderSection",
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
                type: "workWithUsHeaderSection",
                title: "Sekcja 1: Nagłówek",
                id: "singletonWorkWithUsHeaderSection",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "jobOfferSection",
                title: "Sekcja 2: Oferty pracy",
                id: "singletonJobOfferSection",
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
                type: "kontaktHeaderSection",
                title: "Sekcja 1: Nagłówek",
                id: "singletonKontaktHeaderSection",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "contactFormSection",
                title: "Sekcja 2: Formularz kontaktowy",
                id: "singletonContactFormSection",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "contactDetailsSection",
                title: "Sekcja 3: Dane kontaktowe",
                id: "singletonContactDetailsSection",
              }),
            ]),
        ),
      S.divider(),
      singletonDocumentListItem({
        S,
        context,
        type: "ustawienia",
        title: "Ustawienia",
        icon: Settings,
        id: "singletonUstawienia",
      }),
      ...filteredDocumentListItems({ S, context }).filter(
        (item) => item.getId() !== "wpisRealizacji",
      ),
    ]);
