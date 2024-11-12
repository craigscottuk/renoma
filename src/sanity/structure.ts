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
      // Grouped Singleton for "Dom" with Sections
      S.listItem()
        .title("Dom")
        .icon(Home)
        .child(
          S.list()
            .title("Sekcje Domu") // pane title
            .items([
              // Hero Section Singleton
              singletonDocumentListItem({
                S,
                context,
                type: "heroSection",
                title: "Sekcja 1: Powitalna",
                id: "singletonHeroSection",
              }),
              // About Section for the Home Singleton
              singletonDocumentListItem({
                S,
                context,
                type: "aboutSectionHome",
                title: "Sekcja 2: O Nas",
                id: "singletonAboutSectionHome",
              }),

              // services Section for the Home Singleton
              singletonDocumentListItem({
                S,
                context,
                type: "servicesSectionHome",
                title: "Sekcja 3: Usługi",
                id: "singletonServicesSectionHome",
              }),
            ]),
        ),

      // Singleton entry for "O Nas" (About Us)
      S.listItem()
        .title("O Nas")
        .icon(Info)
        .child(
          S.list()
            .title("Sekcje o nas") // tytuł panelu
            .items([
              // Sekcja Nagłówka Singleton
              singletonDocumentListItem({
                S,
                context,
                type: "aboutHeaderSection",
                title: "Sekcja 1: Nagłówek",
                id: "singletonAboutHeaderSection",
              }),
            ]),
        ),

      // Singleton entry for "Usługi" (Services)
      singletonDocumentListItem({
        S,
        context,
        type: "uslugi",
        title: "Usługi",
        icon: Briefcase,
        id: "singletonUslugi",
      }),

      // Regular document list for "Realizacje" (Projects)
      S.documentTypeListItem("realizacje").title("Realizacje").icon(FolderOpen),

      // Singleton entry for "Renoma LAB" (Lab)
      singletonDocumentListItem({
        S,
        context,
        type: "renomaLab",
        title: "Renoma LAB",
        icon: Beaker,
        id: "singletonRenomaLab",
      }),

      // Singleton entry for "Ucz Się z Nami" (Learn With Us)
      singletonDocumentListItem({
        S,
        context,
        type: "uczSieZNami",
        title: "Ucz Się z Nami",
        icon: GraduationCap,
        id: "singletonUczSieZNami",
      }),

      // Singleton entry for "Pracuj z Nami" (Work With Us)
      singletonDocumentListItem({
        S,
        context,
        type: "pracujZNami",
        title: "Pracuj z Nami",
        icon: Users,
        id: "singletonPracujZNami",
      }),

      // Grouped Singleton entry for "Kontakt" (Contact) with Sections
      S.listItem()
        .title("Kontakt")
        .icon(Mail)
        .child(
          S.list()
            .title("Sekcje Kontaktu") // tytuł panelu
            .items([
              // Sekcja Nagłówka Singleton
              singletonDocumentListItem({
                S,
                context,
                type: "kontaktHeaderSectionTest",
                title: "Sekcja 1: Nagłówek Test",
                id: "singletonKontaktHeaderSectionTest",
              }),
              // Sekcja Nagłówka Singleton
              singletonDocumentListItem({
                S,
                context,
                type: "kontaktHeaderSection",
                title: "Sekcja 1: Nagłówek",
                id: "singletonKontaktHeaderSection",
              }),
              // Sekcja Formularza Kontaktowego Singleton
              singletonDocumentListItem({
                S,
                context,
                type: "contactFormSection",
                title: "Sekcja 2: Formularz Kontaktowy",
                id: "singletonContactFormSection",
              }),

              // Contact Details Section Singleton
              singletonDocumentListItem({
                S,
                context,
                type: "contactDetailsSection",
                title: "Sekcja 3: Dane Kontaktowe",
                id: "singletonContactDetailsSection",
              }),
            ]),
        ),

      // Divider
      S.divider(),

      // Singleton entry for "Ustawienia" (Settings)
      singletonDocumentListItem({
        S,
        context,
        type: "ustawienia",
        title: "Ustawienia",
        icon: Settings,
        id: "singletonUstawienia",
      }),

      // Filtered list of non-singleton items (excluding singletons and "realizacje")
      ...filteredDocumentListItems({ S, context }).filter(
        (item) => item.getId() !== "realizacje",
      ),
    ]);
