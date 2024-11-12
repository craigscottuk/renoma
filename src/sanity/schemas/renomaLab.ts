import { defineType, defineField } from "sanity";

export const renomaLab = defineType({
  name: "renomaLab",
  title: "Renoma LAB",
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

// Renoma Lab page header section
export const renomaLabHeaderSection = defineType({
  name: "renomaLabHeaderSection",
  title: "Nagłówek strony Renoma LAB",
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
      description: "Krótki tekst nad tytułem, np. 'RENOMA LAB'.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      title: "Tytuł sekcji",
      description:
        "Główny tytuł sekcji na stronie Renoma LAB, np. 'Laboratorium badań materiałów budowlanych'.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionDescription",
      title: "Opis sekcji",
      description:
        "Tekst opisujący działalność laboratorium Renoma LAB, specjalizującego się w testach materiałów budowlanych i badaniach konserwatorskich.",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "headerImage",
      title: "Obraz nagłówka",
      description:
        "Obraz wyświetlany w nagłówku strony Renoma LAB, przedstawiający laboratorium lub sprzęt badawczy.",
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
        "Tekst alternatywny dla obrazu nagłówka, np. 'Zdjęcie sprzętu laboratoryjnego do badań materiałów budowlanych'.",
      type: "internationalizedArrayString",
      group: "obrazSekcji",
    }),
  ],
});
