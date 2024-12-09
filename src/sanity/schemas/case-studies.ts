// cSpell:disable
import { defineType, defineField } from "sanity";

export const realizacje = defineType({
  name: "realizacje",
  title: "Realizacje",
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

// Realizacje page header section
export const caseStudyHeader = defineType({
  name: "caseStudyHeader",
  title: "Nagłówek strony Realizacje",
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
      name: "label",
      title: "Etykieta sekcji",
      description: "Krótki tekst nad tytułem, np. 'Nasze Projekty'.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description:
        "Główny tytuł sekcji na stronie Realizacje, np. 'Zrealizowane Projekty'.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis sekcji",
      description:
        "Krótki opis prezentujący zakończone projekty firmy w branży budowlanej, np. 'Przegląd naszych zrealizowanych projektów budowlanych, które odzwierciedlają naszą wiedzę i jakość wykonania.'",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "image",
      title: "Obraz nagłówka",
      description:
        "Obraz wyświetlany w nagłówku strony Realizacje, przedstawiający zakończone projekty lub procesy budowlane.",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "obrazSekcji",
    }),
    defineField({
      name: "imageAlt",
      title: "Alternatywny tekst obrazu nagłówka",
      description:
        "Tekst alternatywny dla obrazu nagłówka, np. 'Zdjęcie ukończonego budynku zaprojektowanego i zrealizowanego przez firmę.'",
      type: "internationalizedArrayString",
      group: "obrazSekcji",
    }),
  ],
});
