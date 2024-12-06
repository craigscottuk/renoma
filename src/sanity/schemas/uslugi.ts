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

export const servicesListSection = defineType({
  name: "servicesListSection",
  title: "Lista usług",
  type: "document",
  description:
    "Lista wszystkich usług, które znajdują się w ramach tego wpisu. Te usługi będą również wyświetlane na stronie głównej oraz w stopce.",
  fields: [
    defineField({
      name: "services",
      title: "Lista Usług",
      type: "array",
      validation: (Rule) =>
        Rule.required().min(1).error("Dodaj przynajmniej jedną usługę."),
      of: [
        defineField({
          name: "service",
          type: "object",
          title: "Usługa",
          fields: [
            defineField({
              name: "title",
              title: "Tytuł Usługi",
              type: "internationalizedArrayString",
              description:
                "Tytuł indywidualnej usługi, np. 'Badania Konserwatorskie i Ekspertyzy'.",
              validation: (Rule) =>
                Rule.required().error("Pole tytułu usługi jest wymagane."),
            }),
            defineField({
              name: "description",
              title: "Opis Usługi",
              type: "internationalizedArrayText",
              description:
                "Krótki opis wprowadzający dla danej usługi, np. 'Prowadzimy kompleksowe badania konserwatorskie wspierające ochronę zabytków.'.",
              validation: (Rule) =>
                Rule.required().error("Pole opisu usługi jest wymagane."),
            }),
            defineField({
              name: "actions",
              title: "Działania",
              description:
                "Lista działań realizowanych w ramach danej usługi, np. 'Ocena stanu zabytku', 'Analiza materiałowa', 'Badania historyczne'.",
              type: "array",
              validation: (Rule) =>
                Rule.required()
                  .min(1)
                  .error("Dodaj przynajmniej jedno działanie."),
              of: [
                defineField({
                  name: "action",
                  type: "object",
                  title: "Akcja",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Tytuł Akcji",
                      type: "internationalizedArrayString",
                      description:
                        "Tytuł działania, np. 'Ocena stanu zabytku'.",
                      validation: (Rule) =>
                        Rule.required().error(
                          "Pole tytułu akcji jest wymagane.",
                        ),
                    }),
                    defineField({
                      name: "content",
                      title: "Treść Akcji",
                      type: "internationalizedArrayText",
                      description:
                        "Treść lub szczegóły działania, np. 'Badania in situ w celu oceny stopnia zniszczenia...'.",
                      validation: (Rule) =>
                        Rule.required().error(
                          "Pole treści akcji jest wymagane.",
                        ),
                    }),
                  ],
                  preview: {
                    select: {
                      title: "title.0.value",
                    },
                    prepare({ title }) {
                      return {
                        title: title || "Brak tytułu",
                      };
                    },
                  },
                }),
              ],
            }),
            defineField({
              name: "images",
              title: "Obrazy Usługi",
              type: "array",
              of: [
                defineField({
                  name: "image",
                  type: "image",
                  title: "Obraz",
                  fields: [
                    defineField({
                      name: "caption",
                      type: "string",
                      title: "Podpis Obrazu",
                      description:
                        "Opcjonalny podpis do obrazu, np. 'Widok przed konserwacją'.",
                    }),
                  ],
                  options: {
                    hotspot: true,
                  },
                }),
              ],
              description:
                "Dodaj obrazy związane z tą usługą. Jeśli dodasz więcej niż jeden obraz, zostanie utworzony komponent karuzeli obrazów lub galerii.",
            }),
          ],
          preview: {
            select: {
              title: "title.0.value", // Assumes the first localized title is accessible
              media: "images.0", // Uses the first image as a preview thumbnail
            },
            prepare({ title, media }) {
              return {
                title: title || "Brak tytułu", // Fallback if no title exists
                media, // Displays the first image in the preview
              };
            },
          },
        }),
      ],
    }),
  ],
});

// ==========================================================
// ServicesListSection with internationalized portableText
// ==========================================================

// // List of Services section
// export const servicesListSection = defineType({
//   name: "servicesListSection",
//   title: "Lista usług",
//   type: "document",
//   options: { singleton: true },
//   description:
//     "W tej sekcji możesz dodawać i edytować usługi dostępne na stronie.",
//   fields: [
//     defineField({
//       name: "services",
//       title: "Usługi",
//       type: "array",
//       description: "Lista usług, które można dodać, edytować lub usunąć.",
//       of: [
//         defineField({
//           name: "service",
//           title: "Usługa",
//           type: "object",
//           fields: [
//             defineField({
//               name: "title",
//               title: "Tytuł usługi",
//               type: "internationalizedArrayString",
//               description: "Dodaj tytuł usługi w wybranych językach.",
//             }),
//             defineField({
//               name: "description",
//               title: "Opis",
//               type: "object",
//               description: "Dodaj opis usługi w językach PL, EN lub DE.",
//               fields: [
//                 { name: "pl", title: "PL", type: "basicText" },
//                 { name: "en", title: "EN", type: "basicText" },
//                 { name: "de", title: "DE", type: "basicText" },
//               ],
//             }),
//           ],
//           preview: {
//             select: {
//               title: "title.0.value", // Shows the first language entry as a preview
//             },
//             prepare({ title }) {
//               return {
//                 title: title || "Brak tytułu", // Default if no title is set
//               };
//             },
//           },
//         }),
//       ],
//     }),
//   ],
// });
