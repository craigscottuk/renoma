// cSpell:disable
import { defineType, defineField } from "sanity";

export const uczSieZNami = defineType({
  name: "Ucz Się z Nami",
  title: "O Nas",
  type: "document",
  options: {
    singleton: true,
  },
  fields: [
    {
      name: "placeholder",
      title: "Zastępczy tekst",
      type: "string",
    },
  ],
});

// Graduate Program page header section
export const learnWithUsHeaderSection = defineType({
  name: "learnWithUsHeaderSection",
  title: "Nagłówek strony programu absolwenckiego",
  type: "document",
  options: { singleton: true },
  groups: [
    {
      name: "etykietaSekcji",
      title: "Etykieta sekcji",
    },
    {
      name: "tytulSekcji",
      title: "Tytuł sekcji",
    },
    {
      name: "opisSekcji",
      title: "Opis sekcji",
    },
    {
      name: "obrazSekcji",
      title: "Obraz sekcji",
    },
  ],
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Etykieta sekcji",
      description: "Krótki tekst nad tytułem, np. 'PROGRAM ABSOLWENCKI'.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      title: "Tytuł sekcji",
      description:
        "Główny tytuł sekcji na stronie programu absolwenckiego, np. 'Dołącz do naszego programu absolwenckiego'.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionDescription",
      title: "Opis sekcji",
      description:
        "Tekst wprowadzający do programu absolwenckiego, który zachęca do zgłoszenia się do programu firmy.",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "headerImage",
      title: "Obraz nagłówka",
      description:
        "Obraz wyświetlany w nagłówku strony programu absolwenckiego, przedstawiający np. młodych profesjonalistów w trakcie pracy.",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "obrazSekcji",
    }),
    defineField({
      name: "headerImageAlt",
      title: "Alternatywny tekst obrazu nagłówka",
      description:
        "Tekst alternatywny dla obrazu nagłówka, np. 'Zdjęcie młodych profesjonalistów współpracujących przy projekcie'.",
      type: "internationalizedArrayString",
      group: "obrazSekcji",
    }),
  ],
});

// What We Offer section
export const whatWeOfferSection = defineType({
  name: "whatWeOfferSection",
  title: "Co oferujemy?",
  type: "document",
  options: { singleton: true },
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Tytuł sekcji",
      description: "Główny tytuł sekcji, np. 'Co oferujemy?'",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "offers",
      title: "Lista ofert",
      description: "Dodaj punkty oferty z tytułem i opisem.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Tytuł",
              description:
                "Krótki tytuł oferty, np. 'Praktyczne doświadczenie'.",
              type: "internationalizedArrayString",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Opis",
              description:
                "Opis oferty, np. 'Uczestnicy będą mieli możliwość...'",
              type: "internationalizedArrayText",
            },
          ],
          preview: {
            select: {
              title: "title.0.value",
            },
            prepare({ title }) {
              return {
                title: title || "Brak tytułu",
              };
            },
          },
        },
      ],
    }),
  ],
});

// Who We Are Looking For section
export const whoWeAreLookingForSection = defineType({
  name: "whoWeAreLookingForSection",
  title: "Kogo szukamy?",
  type: "document",
  options: { singleton: true },
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Tytuł sekcji",
      description: "Główny tytuł sekcji, np. 'Kogo szukamy?'.",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "criteria",
      title: "Profil i Kryteria",
      type: "object",
      description:
        "Tekst opisujący profil poszukiwanych osób oraz listę wymagań lub cech, które powinny one spełniać.",
      fields: [
        { name: "pl", title: "PL", type: "portableTextWithHeadings" },
        { name: "en", title: "EN", type: "portableTextWithHeadings" },
        { name: "de", title: "DE", type: "portableTextWithHeadings" },
      ],
    }),

    defineField({
      name: "image",
      title: "Obraz",
      description:
        "Obrazek reprezentujący sekcję, np. zdjęcie osoby na budowie.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageAlt",
      title: "Alternatywny tekst obrazu",
      description: "Alternatywny tekst dla obrazu sekcji.",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "applyButtonText",
      title: "Tekst przycisku aplikacji",
      description:
        "Tekst na przycisku zachęcającym do aplikowania, np. 'Aplikuj teraz'.",
      type: "internationalizedArrayString",
    }),
  ],
});
