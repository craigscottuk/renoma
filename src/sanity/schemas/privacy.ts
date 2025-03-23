// cSpell:disable
import { defineType, defineField } from "sanity";
import { seoFields } from "../fields/seoFields";

export const privacy = defineType({
  name: "privacy",
  title: "Polityka Prywatności",
  type: "document",
  options: {
    singleton: true,
  },
  fields: [
    {
      name: "placeholder",
      title: "Zastępczy tekst",
      description: "Tekst zastępczy używany jako wypełnienie.",
      type: "string",
    },
  ],
});

// Privacy Policy page header section
export const privacyHeader = defineType({
  name: "privacyHeader",
  title: "Nagłówek strony polityki prywatności",
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
      description: "Krótki tekst nad tytułem",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Główny tytuł sekcji na stronie polityki prywatności.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
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
      group: "obrazSekcji",
      initialValue: "white",
    }),
  ],
});

// Privacy Policy text section
export const privacyBody = defineType({
  name: "privacyBody",
  title: "Treść strony polityki prywatności",
  type: "document",
  options: { singleton: true },
  fields: [
    defineField({
      name: "content",
      title: "Treść polityki prywatności",
      type: "object",
      description:
        "Treść tekstowa strony polityki prywatności w wielu językach.",
      validation: (Rule) => Rule.required(),
      fields: [
        { name: "pl", title: "PL", type: "portableTextWithHeadings" },
        { name: "en", title: "EN", type: "portableTextWithHeadings" },
        { name: "de", title: "DE", type: "portableTextWithHeadings" },
      ],
    }),
  ],
});

export const privacyPageMeta = defineType({
  name: "privacyPageMeta",
  title: "SEO & Ustawienia Meta – Polityka Prywatności",
  type: "document",
  options: { singleton: true },
  fields: [...seoFields],
});
