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

// List of Services section
export const timelineSection = defineType({
  name: "timelineSection",
  title: "Sekcja osi czasu",
  type: "document",
  options: { singleton: true },
  description:
    "Sekcja osi czasu przedstawia najważniejsze wydarzenia lub osiągnięcia w porządku chronologicznym.",
  fields: [
    defineField({
      name: "timeline",
      title: "Oś czasu",
      type: "array",
      description:
        "Dodaj kluczowe wydarzenia na osi czasu, aby przedstawić historię lub osiągnięcia w logicznym porządku.",
      of: [
        defineField({
          name: "timelineItem",
          title: "Element osi czasu",
          type: "object",
          fields: [
            defineField({
              name: "year",
              title: "Rok",
              type: "number",
              description: "Dodaj rok dla tego wydarzenia.",
              validation: (Rule) =>
                Rule.required()
                  .min(1900)
                  .max(new Date().getFullYear())
                  .integer()
                  .error(
                    "Rok musi być w formacie YYYY i pomiędzy 1900 a bieżącym rokiem.",
                  ),
            }),
            defineField({
              name: "content",
              title: "Treść",
              type: "object",
              description: "Dodaj treść wydarzenia w wybranych językach.",
              fields: [
                { name: "pl", title: "PL", type: "basicText" },
                { name: "en", title: "EN", type: "basicText" },
                { name: "de", title: "DE", type: "basicText" },
              ],
            }),
            defineField({
              name: "images",
              title: "Obrazy",
              type: "array",
              description:
                "Dodaj obrazy ilustrujące wydarzenie wraz z podpisami.",
              of: [
                defineField({
                  name: "imageItem",
                  title: "Obraz z podpisem",
                  type: "object",
                  fields: [
                    defineField({
                      name: "src",
                      title: "Źródło obrazu",
                      type: "image",
                      description: "Dodaj obraz ilustrujący to wydarzenie.",
                      options: {
                        hotspot: true,
                      },
                    }),
                    defineField({
                      name: "caption",
                      title: "Podpis",
                      type: "internationalizedArrayString",
                      description: "Dodaj podpis do obrazu.",
                    }),
                  ],
                  preview: {
                    select: {
                      title: "caption.0.value",
                      media: "src",
                    },
                    prepare({ title, media }) {
                      return {
                        title: title || "Brak podpisu",
                        media,
                      };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "year",
            },
            prepare({ title }) {
              return {
                title: title || "Brak tytułu",
              };
            },
          },
        }),
      ],
    }),
  ],
});
