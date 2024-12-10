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
export const renomaLabHeader = defineType({
  name: "renomaLabHeader",
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
      name: "label",
      title: "Etykieta sekcji",
      description: "Krótki tekst nad tytułem, np. 'RENOMA LAB'.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description:
        "Główny tytuł sekcji na stronie Renoma LAB, np. 'Laboratorium badań materiałów budowlanych'.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis sekcji",
      description:
        "Tekst opisujący działalność laboratorium Renoma LAB, specjalizującego się w testach materiałów budowlanych i badaniach konserwatorskich.",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "image",
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
      name: "imageLayout",
      title: "Układ obrazu na dużych urządzeniach",
      description:
        "Wybierz między pełną szerokością obrazu a portretem po prawej stronie.",
      type: "string",
      options: {
        list: [
          { title: "Pełna szerokość", value: "fullWidth" },
          { title: "Portret po prawej", value: "portraitRight" },
        ],
        layout: "radio",
      },
      group: "obrazSekcji",
    }),

    defineField({
      name: "imageAlt",
      title: "Alternatywny tekst obrazu nagłówka",
      description:
        "Tekst alternatywny dla obrazu nagłówka, np. 'Zdjęcie sprzętu laboratoryjnego do badań materiałów budowlanych'.",
      type: "internationalizedArrayString",
      group: "obrazSekcji",
    }),
  ],
});
