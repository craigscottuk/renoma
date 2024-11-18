// cSpell:disable
import { defineType, defineField } from "sanity";

export const uslugi = defineType({
  name: "uslugi",
  title: "Usługi",
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

// Services page header section
export const servicesHeaderSection = defineType({
  name: "servicesHeaderSection",
  title: "Nagłówek strony usług",
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
      name: "sectionLabel",
      title: "Etykieta sekcji",
      description: "Krótki tekst nad tytułem, np. 'USŁUGI'.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      title: "Tytuł sekcji",
      description: "Główny tytuł sekcji na stronie usług, np. 'Nasze Usługi'.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionDescription",
      title: "Opis sekcji",
      description:
        "Tekst opisujący główne usługi firmy, przedstawiony na stronie usług.",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "headerImage",
      title: "Obraz nagłówka",
      description:
        "Obraz wyświetlany w nagłówku strony usług, przedstawiający np. procesy konserwatorskie lub sprzęt budowlany.",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "obrazSekcji",
    }),
    defineField({
      name: "headerImageAlt",
      title: "Alternatywny tekst obrazu nagłówka",
      description:
        "Tekst alternatywny dla obrazu nagłówka, np. 'Sprzęt budowlany używany podczas prac konserwatorskich'.",
      type: "internationalizedArrayString",
      group: "obrazSekcji",
    }),
  ],
});

// List of Services section
export const servicesListSection = defineType({
  name: "servicesListSection", // Updated name
  title: "Lista usług", // Updated title
  type: "document",
  options: { singleton: true },
  description:
    "W tej sekcji możesz dodawać i edytować usługi dostępne na stronie.", // Retained description
  fields: [
    defineField({
      name: "services",
      title: "Usługi",
      type: "array",
      description: "Lista usług, które można dodać, edytować lub usunąć.", // Retained description for this field
      of: [
        defineField({
          name: "service",
          title: "Usługa",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Tytuł usługi",
              type: "internationalizedArrayString",
              description: "Dodaj tytuł usługi w wybranych językach.", // Retained description
            }),
            defineField({
              name: "description",
              title: "Opis",
              type: "object",
              description: "Dodaj opis usługi w językach PL, EN lub DE.",
              fields: [
                { name: "pl", title: "PL", type: "basicText" },
                { name: "en", title: "EN", type: "basicText" },
                { name: "de", title: "DE", type: "basicText" },
              ],
            }),
          ],
          preview: {
            select: {
              title: "title.0.value", // Shows the first language entry as a preview
            },
            prepare({ title }) {
              return {
                title: title || "Brak tytułu", // Default if no title is set
              };
            },
          },
        }),
      ],
    }),
  ],
});
