// cSpell:disable
import { defineType, defineField } from "sanity";

export const pracujZNami = defineType({
  name: "pracujZNami",
  title: "Pracuj z Nami",
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

// Work With Us page header section
export const workWithUsHeaderSection = defineType({
  name: "workWithUsHeaderSection",
  title: "Nagłówek strony Pracuj z Nami",
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
      description: "Krótki tekst nad tytułem, np. 'PRACUJ Z NAMI'.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      title: "Tytuł sekcji",
      description:
        "Główny tytuł sekcji na stronie Pracuj z Nami, np. 'Dołącz do naszego zespołu'.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionDescription",
      title: "Opis sekcji",
      description:
        "Tekst wprowadzający do strony Pracuj z Nami, zachęcający do aplikowania do zespołu.",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "headerImage",
      title: "Obraz nagłówka",
      description: "Obraz wyświetlany w nagłówku strony Pracuj z Nami.",
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
        "Tekst alternatywny dla obrazu nagłówka, np. 'Zdjęcie przedstawiające pracowników firmy'.",
      type: "internationalizedArrayString",
      group: "obrazSekcji",
    }),
  ],
});

// FAQ section
export const jobOfferSection = defineType({
  name: "jobOfferSection",
  title: "Sekcja FAQ",
  type: "document",
  options: { singleton: true },
  groups: [
    {
      name: "tytulSekcji",
      title: "Tytuł Sekcji",
    },
  ],
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Tytuł Sekcji",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
