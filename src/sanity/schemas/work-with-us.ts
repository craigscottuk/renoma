// cSpell:disable
import { defineType, defineField } from "sanity";

export const workWithUs = defineType({
  name: "workWithUs",
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
export const workWithUsHeader = defineType({
  name: "workWithUsHeader",
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
      name: "label",
      title: "Etykieta sekcji",
      description: "Krótki tekst nad tytułem, np. 'PRACUJ Z NAMI'.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description:
        "Główny tytuł sekcji na stronie Pracuj z Nami, np. 'Dołącz do naszego zespołu'.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis sekcji",
      description:
        "Tekst wprowadzający do strony Pracuj z Nami, zachęcający do aplikowania do zespołu.",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "image",
      title: "Obraz nagłówka",
      description: "Obraz wyświetlany w nagłówku strony Pracuj z Nami.",
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
          { title: "Krajobraz po prawej", value: "landscapeRight" },
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
        "Tekst alternatywny dla obrazu nagłówka, np. 'Zdjęcie przedstawiające pracowników firmy'.",
      type: "internationalizedArrayString",
      group: "obrazSekcji",
    }),
  ],
});

// Job offer section
export const jobOffers = defineType({
  name: "jobOffers",
  title: "Oferty Pracy",
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
      name: "title",
      title: "Tytuł Sekcji",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "jobOffer",
      title: "Oferty Pracy",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "jobTitle",
              title: "Tytuł Oferty",
              description: "Tytuł oferty pracy, np. 'Konserwator Zabytków'.",
              type: "internationalizedArrayString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "jobDescription",
              title: "Opis Oferty",
              description:
                "Opis stanowiska, jego zakres obowiązków i wymagania.",
              type: "internationalizedArrayText",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "jobLocation",
              title: "Lokalizacja",
              description: "Lokalizacja pracy, np. 'Polska'.",
              type: "internationalizedArrayString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "jobType",
              title: "Typ pracy",
              description: "Rodzaj umowy, np. 'Pełny etat'.",
              type: "internationalizedArrayString",
            }),
            defineField({
              name: "responsibilities",
              title: "Zakres Obowiązków",
              type: "object",
              description: "Lista obowiązków na tym stanowisku",
              fields: [
                { name: "pl", title: "PL", type: "portableTextWithHeadings" },
                { name: "en", title: "EN", type: "portableTextWithHeadings" },
                { name: "de", title: "DE", type: "portableTextWithHeadings" },
              ],
            }),
            defineField({
              name: "requirements",
              title: "Wymagania",
              type: "object",
              description: "Lista wymagań dla kandydata na to stanowisko.",
              fields: [
                { name: "pl", title: "PL", type: "portableTextWithHeadings" },
                { name: "en", title: "EN", type: "portableTextWithHeadings" },
                { name: "de", title: "DE", type: "portableTextWithHeadings" },
              ],
            }),
            defineField({
              name: "benefits",
              title: "Oferujemy",
              type: "object",
              description: "Lista benefitów oferowanych na tym stanowisku.",
              fields: [
                { name: "pl", title: "PL", type: "portableTextWithHeadings" },
                { name: "en", title: "EN", type: "portableTextWithHeadings" },
                { name: "de", title: "DE", type: "portableTextWithHeadings" },
              ],
              preview: {
                select: {
                  title: "jobTitle.0.value",
                },
                prepare({ title }) {
                  return {
                    title: title || "Brak tytułu",
                  };
                },
              },
            }),
          ],
          preview: {
            select: {
              title: "jobTitle.0.value",
            },
            prepare({ title }) {
              return {
                title: title || "Brak tytułu",
              };
            },
          },
        },
      ],
    }),
  ],
});
