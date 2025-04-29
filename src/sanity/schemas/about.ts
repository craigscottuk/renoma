// cSpell:disable
import { defineType, defineField } from "sanity";
import { seoFields } from "./seoFields";

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

export const aboutHeader = defineType({
  name: "aboutHeader",
  title: "Nagłówek strony „O nas”",
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
    {
      name: "kolorSekcji",
      title: "Kolor sekcji",
    },
  ],
  fields: [
    defineField({
      name: "label",
      title: "Etykieta sekcji",
      description: "Krótki tekst nad tytułem.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Główny tytuł sekcji na stronie „O nas”.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis sekcji",
      description: "Krótki opis sekcji, który pojawia się pod tytułem.",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "image",
      title: "Obraz nagłówka",
      description: "Obraz wyświetlany w nagłówku strony.",
      type: "image",
      group: "obrazSekcji",
      hidden: ({ parent }) => parent?.imageLayout === "noImage",
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
          { title: "Portret po prawej (ratio 4:3)", value: "portraitRight" },
          { title: "Krajobraz po prawej", value: "landscapeRight" },
          { title: "Brak obrazu", value: "noImage" },
        ],
        layout: "radio",
      },
      group: "obrazSekcji",
      initialValue: "fullWidthAbove",
    }),
    defineField({
      name: "aspectRatio",
      title: "Proporcje obrazu",
      description: "Określ proporcje obrazu w nagłówku.",
      type: "string",
      options: {
        list: [
          { title: "4:3", value: "standard" },
          { title: "16:10", value: "wide" },
        ],
        layout: "radio",
      },
      group: "obrazSekcji",
      initialValue: "wide",
      hidden: ({ parent }) => parent?.imageLayout !== "landscapeRight",
    }),
    defineField({
      name: "landscapeMobileForPortraitRight",
      title: "Obraz krajobrazowy dla małych i średnich urządzeń",
      description:
        "Obraz krajobrazowy 16:10, który będzie wyświetlany w nagłówku na małych i średnich urządzeniach (telefony i tablety).",
      type: "image",
      group: "obrazSekcji",
      hidden: ({ parent }) => parent?.imageLayout !== "portraitRight",
    }),
    defineField({
      name: "mobileImage",
      title: "Obraz krajobrazowy dla małych i średnich urządzeń",
      description:
        "Obraz krajobrazowy 16:10, który będzie wyświetlany w nagłówku na małych i średnich urządzeniach (telefony i tablety).",
      type: "image",
      group: "obrazSekcji",
      hidden: ({ parent }) => parent?.imageLayout !== "fullWidthAbove",
    }),
    defineField({
      name: "imageAlt",
      title: "Alternatywny tekst obrazu nagłówka",
      description:
        "Krótki tekst opisujący obraz, aby uzupełnić kontekst i poprawić SEO.",
      type: "internationalizedArrayString",
      group: "obrazSekcji",
      hidden: ({ parent }) => parent?.imageLayout === "noImage",
    }),
    defineField({
      name: "backgroundColor",
      title: "Kolor tła",
      description: "Wybierz kolor tła dla nagłówka strony.",
      type: "string",
      options: {
        list: [
          { title: "Biały", value: "white" },
          { title: "Czarny", value: "black" },
        ],
        layout: "radio",
      },
      group: "kolorSekcji",
      initialValue: "white",
    }),
  ],
});

export const aboutUs = defineType({
  name: "aboutUs",
  title: "Sekcja „O nas”",
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
  title: "Sekcja „Nasza historia”",
  type: "document",
  options: { singleton: true },
  description:
    "Sekcja osi czasu przedstawia najważniejsze wydarzenia lub osiągnięcia w porządku chronologicznym.",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Główny tytuł sekcji, np. „Nasza historia”.",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Tekst sekcji",
      description:
        "Treść wprowadzająca do sekcji, np. „Nasza historia to lata wyzwań i sukcesów.”.",
      type: "internationalizedArrayText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "timeline",
      title: "Oś czasu",
      type: "array",
      description:
        "Lista kluczowych wydarzeń w kolejności chronologicznej, przedstawiająca historię lub osiągnięcia.",
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
              description: "Rok, w którym wydarzenie miało miejsce.",
              validation: (Rule) =>
                Rule.required()
                  .min(1900)
                  .max(new Date().getFullYear())
                  .integer()
                  .error(
                    "Rok musi być w formacie YYYY i znajdować się pomiędzy 1900 a bieżącym rokiem.",
                  ),
            }),
            defineField({
              name: "content",
              title: "Treść wydarzenia",
              type: "object",
              description: "Opis wydarzenia w dostępnych językach.",
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
                "Obrazy ilustrujące wydarzenie. Dodaj podpisy, aby uzupełnić kontekst.",
              of: [
                defineField({
                  name: "imageItem",
                  title: "Obraz",
                  type: "object",
                  fields: [
                    defineField({
                      name: "src",
                      title: "Obraz",
                      type: "image",
                      description: "Obraz ilustrujący wydarzenie.",
                    }),
                    defineField({
                      name: "altText",
                      title: "Alternatywny tekst obrazu",
                      type: "internationalizedArrayString",
                      description:
                        "Krótki tekst opisujący obraz, aby uzupełnić kontekst i poprawić SEO.",
                    }),
                    defineField({
                      name: "aspectRatio",
                      title: "Proporcje obrazu",
                      description: "Określ proporcje obrazu w nagłówku.",
                      type: "string",
                      options: {
                        list: [
                          { title: "4:3", value: "standard" },
                          { title: "16:10", value: "wide" },
                        ],
                        layout: "radio",
                      },
                      initialValue: "wide",
                    }),
                  ],

                  preview: {
                    select: {
                      title: "altText.0.value",
                      media: "src",
                    },
                    prepare({ title, media }) {
                      return {
                        title: title || "Brak alternatywnego tekstu obrazu",
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
                title: title ? `Rok: ${title}` : "Brak roku",
              };
            },
          },
        }),
      ],
    }),
  ],
});

export const aboutPageMeta = defineType({
  name: "aboutPageMeta",
  title: "SEO & Ustawienia Meta – O Nas",
  type: "document",
  options: { singleton: true },
  fields: [...seoFields],
});
