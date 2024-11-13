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
            .title("Sekcje strony głównej")
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
                title: "Sekcja 2: O Nas",
                id: "singletonAboutSectionHome",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "servicesSectionHome",
                title: "Sekcja 3: Usługi",
                id: "singletonServicesSectionHome",
              }),
            ]),
        ),
      S.listItem()
        .title("O Nas")
        .icon(Info)
        .child(
          S.list()
            .title("Sekcje strony o nas")
            .items([
              singletonDocumentListItem({
                S,
                context,
                type: "aboutHeaderSection",
                title: "Sekcja 1: Nagłówek",
                id: "singletonAboutHeaderSection",
              }),
            ]),
        ),

      S.listItem()
        .title("Usługi")
        .icon(Briefcase)
        .child(
          S.list()
            .title("Sekcje strony usług")
            .items([
              singletonDocumentListItem({
                S,
                context,
                type: "servicesHeaderSection",
                title: "Sekcja 1: Nagłówek",
                id: "singletonServicesHeaderSection",
              }),
            ]),
        ),

      S.listItem()
        .title("Realizacje")
        .icon(FolderOpen)
        .child(
          S.list()
            .title("Sekcje strony realizacje")
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
        .title("Wpis Realizacji")
        .icon(FileText),

      S.listItem()
        .title("Renoma LAB")
        .icon(Beaker)
        .child(
          S.list()
            .title("Sekcje strony Renoma LAB")
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
        .title("Ucz Się z Nami")
        .icon(GraduationCap)
        .child(
          S.list()
            .title("Sekcje strony Ucz się z nami")
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
        .title("Pracuj z Nami")
        .icon(Users)
        .child(
          S.list()
            .title("Sekcje strony Pracuj z nami")
            .items([
              singletonDocumentListItem({
                S,
                context,
                type: "workWithUsHeaderSection",
                title: "Sekcja 1: Nagłówek",
                id: "singletonWorkWithUsHeaderSection",
              }),
            ]),
        ),
      S.listItem()
        .title("Kontakt")
        .icon(Mail)
        .child(
          S.list()
            .title("Sekcje strony kontaktowej")
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
                title: "Sekcja 2: Formularz Kontaktowy",
                id: "singletonContactFormSection",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "contactDetailsSection",
                title: "Sekcja 3: Dane Kontaktowe",
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
