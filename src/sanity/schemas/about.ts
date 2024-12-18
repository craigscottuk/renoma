// cSpell:disable
import { defineType, defineField } from "sanity";

export const about = defineType({
  name: "about",
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
export const aboutUsHeader = defineType({
  name: "aboutUsHeader",
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
      name: "label",
      title: "Etykieta sekcji",
      description: "Krótki tekst nad tytułem, np. 'O NAS'.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Główny tytuł sekcji na stronie o nas, np. 'Poznaj nas'.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis sekcji",
      description:
        "Tekst opisujący firmę lub zespół, umieszczony na stronie o nas.",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "image",
      title: "Obraz nagłówka",
      description: "Obraz wyświetlany w nagłówku strony o nas.",
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
        "Wybierz między pełną szerokością obrazu a portretem po prawej stronie. Dla pełnej szerokości wybierz pozycję obrazu względem treści.",
      type: "string",
      options: {
        list: [
          { title: "Pełna szerokość powyżej", value: "fullWidthAbove" },
          { title: "Pełna szerokość poniżej", value: "fullWidthBelow" },
          { title: "Portret po prawej", value: "portraitRight" },
        ],
        layout: "radio",
      },
      group: "obrazSekcji",
      initialValue: "fullWidthAbove",
    }),

    defineField({
      name: "backgroundColor",
      title: "Kolor tła",
      description:
        "Wybierz kolor tła dla nagłówka strony. Jeśli wybierzesz biały, tekst będzie czarny, a jeśli wybierzesz czarny, tekst będzie biały.",
      type: "string",
      options: {
        list: [
          { title: "Biały", value: "white" },
          { title: "Czarny", value: "black" },
        ],
        layout: "radio",
      },
      group: "obrazSekcji",
      initialValue: "white",
    }),
    defineField({
      name: "imageAlt",
      title: "Alternatywny tekst obrazu nagłówka",
      description:
        "Tekst alternatywny dla obrazu nagłówka, np. 'Zdjęcie przedstawiające zespół firmy'.",
      type: "internationalizedArrayString",
      group: "obrazSekcji",
    }),
  ],
});

// About Us / Our Valuessection
export const aboutUs = defineType({
  name: "aboutUs",
  title: "Sekcja 'O nas i nasza wartości'",
  type: "document",
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Tytuł sekcji, np. 'O nas'.",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "text",
      title: "Tekst sekcji",
      type: "object",
      description: "Treść opisująca firmę, jej misję i wartości.",
      validation: (Rule) => Rule.required(),
      fields: [
        { name: "pl", title: "PL", type: "portableTextWithHeadings" },
        { name: "en", title: "EN", type: "portableTextWithHeadings" },
        { name: "de", title: "DE", type: "portableTextWithHeadings" },
      ],
    }),
  ],
});

// Our History section
export const ourHistory = defineType({
  name: "ourHistory",
  title: "Sekcja osi czasu",
  type: "document",
  options: { singleton: true },
  description:
    "Sekcja osi czasu przedstawia najważniejsze wydarzenia lub osiągnięcia w porządku chronologicznym.",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Tytuł sekcji, np. 'Nasza historia'.",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "text",
      title: "Tekst sekcji",
      description:
        "Tekst sekcji, np. 'Nasza historia to lata wyzwań i sukcesów....'.",
      type: "internationalizedArrayText",
      validation: (Rule) => Rule.required(),
    }),

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
                    defineField({
                      name: "aspectRatio",
                      title: "Proporcje Obrazu",
                      type: "string",
                      options: {
                        list: [
                          { title: "Brak", value: "none" },
                          { title: "Krajobraz", value: "landscape" },
                          { title: "Portret", value: "portrait" },
                          { title: "Kwadrat", value: "square" },
                        ],
                        layout: "radio",
                      },
                      initialValue: "none",
                      description: "Wybierz proporcje obrazów w tej galerii.",
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
