import { defineType, defineField } from "sanity";
import { seoFields } from "../fields/seoFields";

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
    {
      name: "kolorSekcji",
      title: "Kolor sekcji",
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
      name: "descriptionTwoColumns",
      title: "Opis sekcji w dwóch kolumnach",
      type: "object",
      description:
        "Tekst opisujący działalność laboratorium Renoma LAB w dwóch kolumnach.",
      validation: (Rule) => Rule.required(),
      fields: [
        { name: "pl", title: "PL", type: "portableTextWithHeadings" },
        { name: "en", title: "EN", type: "portableTextWithHeadings" },
        { name: "de", title: "DE", type: "portableTextWithHeadings" },
      ],
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
          { title: "Pełna szerokość poniżej", value: "fullWidthBelow" },
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
      hidden: ({ parent }) =>
        parent?.imageLayout !== "fullWidthAbove" &&
        parent?.imageLayout !== "fullWidthBelow",
    }),

    defineField({
      name: "imageAlt",
      title: "Alternatywny tekst obrazu nagłówka",
      description:
        "Krótki tekst opisujący obraz, aby uzupełnić kontekst i poprawić SEO",
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

// About RenomaLab section
export const aboutLab = defineType({
  name: "aboutLab",
  title: "Sekcja 'O RenomaLAB'",
  type: "document",
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Tytuł sekcji, np. 'O RenomaLAB'.",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "text",
      title: "Tekst sekcji",
      type: "object",
      description: "Treść opisująca RenomaLAB.",
      validation: (Rule) => Rule.required(),
      fields: [
        { name: "pl", title: "PL", type: "portableTextWithHeadings" },
        { name: "en", title: "EN", type: "portableTextWithHeadings" },
        { name: "de", title: "DE", type: "portableTextWithHeadings" },
      ],
    }),
  ],
});

export const labOffer = defineType({
  name: "labOffer",
  title: "Oferta Renoma LAB",
  type: "document",
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Tytuł sekcji, np. 'Oferta'.",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "offers",
      title: "Lista Ofert",
      type: "array",
      of: [
        defineField({
          name: "offer",
          title: "Oferta",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Ikona",
              type: "string",
              options: {
                list: [
                  { title: "Microscope", value: "Microscope" },
                  { title: "Layers", value: "Layers" },
                  { title: "Flask", value: "Flask" },
                  { title: "Droplets", value: "Droplets" },
                  { title: "Lightbulb", value: "Lightbulb" },
                  { title: "Users", value: "Users" },
                ],
                layout: "dropdown",
              },
            }),
            defineField({
              name: "title",
              title: "Tytuł",
              type: "internationalizedArrayString",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "content",
              title: "Zawartość",
              type: "object",
              description: "Opis zawartości oferty",
              validation: (Rule) => Rule.required(),
              fields: [
                { name: "pl", title: "PL", type: "portableTextWithHeadings" },
                { name: "en", title: "EN", type: "portableTextWithHeadings" },
                { name: "de", title: "DE", type: "portableTextWithHeadings" },
              ],
            }),
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
        }),
      ],
    }),
    defineField({
      name: "collaborationDescription",
      title: "Opis współpracy",
      description:
        "Opis współpracy z zewnętrznymi specjalistami przeprowadzającymi badania instrumentalne.",
      type: "internationalizedArrayText",
    }),
  ],
});

export const renomaLabPageMeta = defineType({
  name: "renomaLabPageMeta",
  title: "SEO & Ustawienia Meta – Renoma LAB",
  type: "document",
  options: { singleton: true },
  fields: [...seoFields],
});
