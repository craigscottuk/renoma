// cSpell:disable
import { defineType, defineField } from "sanity";
import { seoFields } from "./seoFields";

export const home = defineType({
  name: "home",
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

export const aboutSection = defineType({
  name: "aboutSection",
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

export const servicesSection = defineType({
  name: "servicesSection",
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

      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł Sekcji",
      type: "internationalizedArrayString",

      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis Sekcji",
      type: "internationalizedArrayText",
    }),
    defineField({
      name: "sectionCTA",
      title: "Przycisk Sekcji",
      type: "internationalizedArrayString",

      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const cooperationSection = defineType({
  name: "cooperationSection",
  title: "Sekcja Zaufali nam",
  type: "document",
  options: { singleton: true },

  fields: [
    defineField({
      name: "label",
      title: "Etykieta Sekcji",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "title",
      title: "Tytuł Sekcji",
      type: "internationalizedArrayString",

      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis Sekcji",
      type: "internationalizedArrayText",
    }),

    defineField({
      name: "logos",
      title: "Loga",
      type: "array",
      description: "Dodaj loga firm, które nam zaufały.",
      of: [
        defineField({
          name: "logoItem",
          title: "Logo",
          type: "object",
          fields: [
            defineField({
              name: "company",
              title: "Nazwa firmy",
              type: "string",
              description: "Dodaj nazwę firmy, która nam zaufała.",
            }),
            defineField({
              name: "src",
              title: "Źródło logo",
              type: "image",
              description: "Dodaj logo firmy, która nam zaufała.",
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "string",
              description: "Dodaj link do strony firmy, która nam zaufała.",
            }),
          ],
          preview: {
            select: {
              title: "company",
              media: "src",
            },
            prepare({ title, media }) {
              return {
                title: title || "Brak nazwy firmy",
                media,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "skzLogo",
      title: "Logo SKZ",
      type: "image",
      description: "Logo Stowarzyszenia Konserwatorów Zabytków",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "skzDescription",
      title: "Opis SKZ",
      type: "internationalizedArrayString",
      description:
        "Opis przynależności do Stowarzyszenia Konserwatorów Zabytków",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
      description: "Dodaj link do strony SKZ.",
    }),
  ],
});

export const homePageMeta = defineType({
  name: "homePageMeta",
  title: "SEO & Ustawienia Meta – Strona Główna",
  type: "document",
  options: { singleton: true },
  fields: [...seoFields],
});
