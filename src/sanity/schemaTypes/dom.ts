// cSpell:disable
import { defineType, defineField } from "sanity";

export const dom = defineType({
  name: "dom",
  title: "Dom",
  type: "document",
  options: {
    singleton: true,
  },
  groups: [
    {
      name: "hero",
      title: "Sekcja Powitalna",
    },
    {
      name: "about",
      title: "O Nas",
    },
    {
      name: "services",
      title: "Usługi",
    },
  ],
  fields: [
    defineField({
      name: "powitanie",
      title: "Powitanie",
      group: "hero",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "wiadomosc",
      title: "Wiadomość",
      group: "hero",
      type: "internationalizedArrayText",
    }),

    // O Nas
    defineField({
      name: "oNasSectionLabel",
      title: "Etykieta Sekcji O Nas",
      group: "about",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "oNasSectionTitle",
      title: "Tytuł Sekcji O Nas",
      group: "about",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "oNasSectionDescription",
      title: "Opis Sekcji O Nas",
      group: "about",
      type: "internationalizedArrayText",
    }),
    defineField({
      name: "oNasSectionCTA",
      title: "Przycisk Sekcji O Nas",
      group: "about",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
