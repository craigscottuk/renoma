// cSpell:disable
import { defineType, defineField } from "sanity";
import { seoFields } from "../fields/seoFields";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
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

// ================================
// Services page header section
// ================================

export const faqHeader = defineType({
  name: "faqHeader",
  title: "Nagłówek strony FAQ",
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
      description: "Krótki tekst nad tytułem, np. 'FAQ'.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Tytuł wyświetlany na stronie FAQ.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis sekcji",
      description:
        "Tekst opisujący główne usługi firmy, przedstawiony na stronie usług.",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "image",
      title: "Obraz nagłówka",
      description: "Obraz wyświetlany w nagłówku strony.",
      type: "image",
      options: {
        hotspot: true,
      },
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
          { title: "Portret po prawej (ratio 3:4)", value: "portraitRight" },
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
      name: "imageAlt",
      title: "Alternatywny tekst obrazu nagłówka",
      description:
        "Tekst alternatywny dla obrazu nagłówka, np. 'Zdjęcie młodych profesjonalistów współpracujących przy projekcie'.",
      type: "internationalizedArrayString",
      group: "obrazSekcji",
      hidden: ({ parent }) => parent?.imageLayout === "noImage",
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
      group: "kolorSekcji",
      initialValue: "white",
    }),
  ],
});

// FAQ section
export const faqList = defineType({
  name: "faqList",
  title: "Sekcja FAQ",
  type: "document",
  options: { singleton: true },

  fields: [
    defineField({
      name: "faqItems",
      title: "Elementy FAQ",
      type: "array",
      description:
        "Dodaj pytania i odpowiedzi, które mają pojawić się w sekcji FAQ.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Pytanie",
              type: "internationalizedArrayString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Odpowiedź",
              type: "internationalizedArrayText",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "question.0.value",
            },
            prepare({ title }) {
              return {
                title: title || "Brak tytułu", // Default if no title is set
              };
            },
          },
        },
      ],
    }),
  ],
});

export const faqPageSeo = defineType({
  name: "faqPageSeo",
  title: "SEO & Ustawienia Meta – FAQ",
  type: "document",
  options: { singleton: true },
  fields: [...seoFields],
});
