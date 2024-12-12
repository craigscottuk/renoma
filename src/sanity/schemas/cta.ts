// cSpell:disable
import { defineType, defineField } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "CTA",
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

// CTA section
export const ctaContent = defineType({
  name: "ctaContent",
  title: "CTA Sekcja",
  type: "document",
  options: { singleton: true },

  fields: [
    defineField({
      name: "title",
      title: "Tytuł CTA",
      description: "Główny tytuł sekcji CTA, np. 'Skonsultuj Swój Projekt'.",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis CTA",
      description:
        "Krótki opis sekcji CTA, który zachęca użytkowników do skontaktowania się lub podjęcia akcji.",
      type: "internationalizedArrayText",
    }),
    defineField({
      name: "buttonLabel",
      title: "Etykieta Przycisku",
      description:
        "Tekst widoczny na przycisku CTA, np. 'ZACZNIJ SWÓJ PROJEKT'.",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
