// cSpell:disable
import { defineType, defineField } from "sanity";

export const oNas = defineType({
  name: "oNas",
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

// About page header section
export const aboutHeaderSection = defineType({
  name: "aboutHeaderSection",
  title: "Nagłówek strony o nas",
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
      description: "Krótki tekst nad tytułem, np. 'O NAS'.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      title: "Tytuł sekcji",
      description: "Główny tytuł sekcji na stronie o nas, np. 'Poznaj nas'.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionDescription",
      title: "Opis sekcji",
      description:
        "Tekst opisujący firmę lub zespół, umieszczony na stronie o nas.",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "headerImage",
      title: "Obraz nagłówka",
      description: "Obraz wyświetlany w nagłówku strony o nas.",
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
        "Tekst alternatywny dla obrazu nagłówka, np. 'Zdjęcie przedstawiające zespół firmy'.",
      type: "internationalizedArrayString",
      group: "obrazSekcji",
    }),
  ],
});
