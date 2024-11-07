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

// about section
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
