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
                type: "aboutUsHeader",
                title: "Sekcja 1: Nagłówek",
                id: "singletonAboutUsHeader",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "aboutUs",
                title: "Sekcja 2: O nas",
                id: "singletonAboutUs",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "timelineSection",
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
                type: "servicesList",
                title: "Sekcja 2: Lista usług",
                id: "singletonServicesList",
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
                id: "singletonProjectsHeaderSection",
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
            .title("Sekcje strony „Renoma LAB”")
            .items([
              singletonDocumentListItem({
                S,
                context,
                type: "renomaLabHeader",
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
                type: "learnWithUsHeader",
                title: "Sekcja 1: Nagłówek",
                id: "singletonLearnWithUsHeaderSection",
              }),

              singletonDocumentListItem({
                S,
                context,
                type: "whatWeOffer",
                title: "Sekcja 2: Co oferujemy?",
                id: "singletonWhatWeOfferSection",
              }),

              singletonDocumentListItem({
                S,
                context,
                type: "whoWeAreLookingFor",
                title: "Sekcja 3: Kogo szukamy?",
                id: "singletonWhoWeAreLookingForSection",
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
                id: "singletonWorkWithUsHeaderSection",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "jobOffers",
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
                type: "contactHeader",
                title: "Sekcja 1: Nagłówek",
                id: "singletonKontaktHeaderSection",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "contactForm",
                title: "Sekcja 2: Formularz kontaktowy",
                id: "singletonContactFormSection",
              }),
              singletonDocumentListItem({
                S,
                context,
                type: "contactDetails",
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
        (item) => item.getId() !== "caseStudyEntry",
      ),
    ]);
