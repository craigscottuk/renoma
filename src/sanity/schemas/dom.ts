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
      name: "sectionTitle",
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
      name: "sectionLabel",
      title: "Etykieta Sekcji",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      title: "Tytuł Sekcji",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionDescription",
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
      name: "sectionLabel",
      title: "Etykieta Sekcji",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      title: "Tytuł Sekcji",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionDescription",
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
export const faqSectionHome = defineType({
  name: "faqSectionHome",
  title: "Sekcja FAQ",
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
    {
      name: "faqItems",
      title: "Elementy FAQ",
    },
  ],
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Etykieta Sekcji",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      title: "Tytuł Sekcji",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionDescription",
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
      type: "array",
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
              title: "question",
            },
            prepare(selection) {
              const question =
                selection.title?.[0]?.value || "No question available";
              return {
                title: question,
              };
            },
          },
        },
      ],
      group: "faqItems",
    }),
  ],
  preview: {
    select: {
      title: "sectionTitle",
      subtitle: "sectionDescription",
      firstQuestion: "faqItems.0.question.0.value", // Fetches the first question in plain text
    },
    prepare(selection) {
      const { title, subtitle, firstQuestion } = selection;
      return {
        title: title || "FAQ Section",
        subtitle: `${subtitle ? subtitle.slice(0, 50) + "..." : ""} - First Question: ${firstQuestion || "No questions"}`,
      };
    },
  },
});
