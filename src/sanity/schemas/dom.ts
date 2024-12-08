// cSpell:disable
import { defineType, defineField } from "sanity";

export const dom = defineType({
  name: "dom",
  title: "Dom",
  type: "document",
  options: {
    singleton: true,
  },
  fields: [
    {
      name: "placeholder",
      title: "Placeholder",
      type: "string",
    },
  ],
});

// Hero section
export const heroSection = defineType({
  name: "heroSection",
  title: "Sekcja Powitalny",
  type: "document",
  options: { singleton: true },
  groups: [
    {
      name: "tytulSekcji",
      title: "Tytuł Sekcji",
    },
    {
      name: "przyciskSekcji",
      title: "Przycisk Sekcji",
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
      name: "sectionCTA",
      title: "Przycisk Sekcji",
      type: "internationalizedArrayString",
      group: "przyciskSekcji",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

// about section
export const aboutSectionHome = defineType({
  name: "aboutSectionHome",
  title: "Sekcja O Nas",
  type: "document",
  options: { singleton: true },
  groups: [
    {
      name: "etykietaSekcji",
      title: "Etykieta Sekcji",
    },
    {
      name: "tytulSekcji",
      title: "Tytuł Sekcji",
    },
    {
      name: "opisSekcji",
      title: "Opis Sekcji",
    },
    {
      name: "przyciskSekcji",
      title: "Przycisk Sekcji",
    },
  ],
  fields: [
    defineField({
      name: "label",
      title: "Etykieta Sekcji",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł Sekcji",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis Sekcji",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "sectionCTA",
      title: "Przycisk Sekcji",
      type: "internationalizedArrayString",
      group: "przyciskSekcji",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

// services section
export const servicesSectionHome = defineType({
  name: "servicesSectionHome",
  title: "Sekcja Usług",
  type: "document",
  options: { singleton: true },
  groups: [
    {
      name: "etykietaSekcji",
      title: "Etykieta Sekcji",
    },
    {
      name: "tytulSekcji",
      title: "Tytuł Sekcji",
    },
    {
      name: "opisSekcji",
      title: "Opis Sekcji",
    },
    {
      name: "przyciskSekcji",
      title: "Przycisk Sekcji",
    },
  ],
  fields: [
    defineField({
      name: "label",
      title: "Etykieta Sekcji",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł Sekcji",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis Sekcji",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "sectionCTA",
      title: "Przycisk Sekcji",
      type: "internationalizedArrayString",
      group: "przyciskSekcji",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

// FAQ section
// FAQ section
export const faqSectionHome = defineType({
  name: "faqSectionHome",
  title: "Sekcja FAQ",
  type: "document",
  options: { singleton: true },
  groups: [
    { name: "etykietaSekcji", title: "Etykieta Sekcji" },
    { name: "tytulSekcji", title: "Tytuł Sekcji" },
    { name: "opisSekcji", title: "Opis Sekcji" },
    { name: "przyciskSekcji", title: "Przycisk Sekcji" },
    { name: "faqItems", title: "Elementy FAQ" },
  ],
  fields: [
    defineField({
      name: "label",
      title: "Etykieta Sekcji",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł Sekcji",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis Sekcji",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "sectionCTA",
      title: "Przycisk Sekcji",
      type: "internationalizedArrayString",
      group: "przyciskSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "faqItems",
      title: "Elementy FAQ",
      group: "faqItems",
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
