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

// Explore service section
export const exploreServicesSection = defineType({
  name: "exploreServicesSection",
  title: "Nagłówek strony usług",
  type: "document",
  options: { singleton: true },
  fields: [
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        defineField({
          name: "service",
          title: "Service",
          type: "object",
          fields: [
            // Title field using internationalizedArrayString
            defineField({
              name: "title",
              title: "Service Title",
              type: "internationalizedArrayString",
            }),
            // Description field with fixed language-specific keys
            defineField({
              name: "description",
              title: "Description",
              type: "object",
              fields: [
                { name: "pl", title: "Polish Description", type: "basicText" },
                { name: "en", title: "English Description", type: "basicText" },
                { name: "de", title: "German Description", type: "basicText" },
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
