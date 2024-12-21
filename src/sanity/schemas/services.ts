// cSpell:disable
import { defineType, defineField } from "sanity";

export const services = defineType({
  name: "services",
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

// ================================
// Services page header section
// ================================

export const servicesHeader = defineType({
  name: "servicesHeader",
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
      name: "label",
      title: "Etykieta sekcji",
      description: "Krótki tekst nad tytułem, np. 'USŁUGI'.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Główny tytuł sekcji na stronie usług, np. 'Nasze Usługi'.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis sekcji",
      description:
        "Tekst opisujący główne usługi firmy, przedstawiony na stronie usług.",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "image",
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
      name: "imageLayout",
      title: "Układ obrazu na dużych urządzeniach",
      description:
        "Wybierz między pełną szerokością obrazu a portretem po prawej stronie. Dla pełnej szerokości wybierz pozycję obrazu względem treści.",
      type: "string",
      options: {
        list: [
          { title: "Pełna szerokość powyżej", value: "fullWidthAbove" },
          { title: "Pełna szerokość poniżej", value: "fullWidthBelow" },
          { title: "Portret po prawej", value: "portraitRight" },
        ],
        layout: "radio",
      },
      group: "obrazSekcji",
      initialValue: "fullWidthAbove",
    }),

    defineField({
      name: "backgroundColor",
      title: "Kolor tła",
      description:
        "Wybierz kolor tła dla nagłówka strony. Jeśli wybierzesz biały, tekst będzie czarny, a jeśli wybierzesz czarny, tekst będzie biały.",
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
    defineField({
      name: "imageAlt",
      title: "Alternatywny tekst obrazu nagłówka",
      description:
        "Tekst alternatywny dla obrazu nagłówka, np. 'Sprzęt budowlany używany podczas prac konserwatorskich'.",
      type: "internationalizedArrayString",
      group: "obrazSekcji",
    }),
  ],
});

// ================================
// Services List Entries
// ================================

export const servicesList = defineType({
  name: "servicesList",
  title: "Lista usług",

  description:
    "Lista wszystkich usług, które znajdują się w ramach tego wpisu. Te usługi będą również wyświetlane na stronie głównej oraz w stopce.",
  type: "array",
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
            "Nazwa usługi, np. 'Badania konserwatorskie i ekspertyzy'.",
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
            Rule.required().min(1).error("Dodaj przynajmniej jedno działanie."),
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
                  description: "Nazwa działania, np. 'Ocena stanu zabytku'.",
                  validation: (Rule) =>
                    Rule.required().error("Pole tytułu akcji jest wymagane."),
                }),
                defineField({
                  name: "content",
                  title: "Treść Akcji",
                  type: "internationalizedArrayText",
                  description:
                    "Szczegóły dotyczące działania, np. 'Badania in situ w celu oceny stopnia zniszczenia...'.",
                  validation: (Rule) =>
                    Rule.required().error("Pole treści akcji jest wymagane."),
                }),
              ],
              preview: {
                select: {
                  title: "title.0.value",
                },
                prepare({ title }) {
                  return {
                    title: title || "Brak tytułu akcji",
                  };
                },
              },
            }),
          ],
        }),

        defineField({
          name: "shortDescription",
          title: "Krótki Opis Usługi na stronie głównej",
          type: "internationalizedArrayText",
          description:
            "Skrócony opis usługi wyświetlany w sekcji usług na stronie głównej, np. 'Zapewniamy kompleksowe badania w celu ochrony zabytków.'.",
          validation: (Rule) =>
            Rule.required().error("Pole krótkiego opisu usługi jest wymagane."),
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
            "Obrazy ilustrujące usługę. Dodanie więcej niż jednego obrazu utworzy galerię lub karuzelę obrazów.",
        }),
      ],
      preview: {
        select: {
          title: "title.0.value",
          media: "images.0",
        },
        prepare({ title, media }) {
          return {
            title: title || "Brak tytułu usługi",
            media,
          };
        },
      },
    }),
  ],
});

// ================================
// 01. Badania, Planowanie i Ekspertyzy
// ================================

export const servicesGroup = defineType({
  name: "servicesGroup",
  title: "Grupa usług",
  type: "document",
  options: { singleton: true },
  description: "Zarządzaj grupami usług, np. sekcjami na stronie głównej.",
  fields: [
    // Group 1
    defineField({
      name: "serviceGroupOne",
      title: "01. Badania, Planowanie i Ekspertyzy",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Tytuł Sekcji",
          type: "string",
          initialValue: "Badania, Planowanie i Ekspertyzy",
        }),
        defineField({
          name: "services",
          title: "Lista Usług",
          type: "servicesList",
        }),
      ],
    }),

    // ================================
    // 02. Realizacja i Nadzór
    // ================================

    defineField({
      name: "serviceGroupTwo",
      title: "02. Realizacja i Nadzór",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Tytuł Sekcji",
          type: "string",
          initialValue: "Realizacja i Nadzór",
        }),
        defineField({
          name: "services",
          title: "Lista Usług",
          type: "servicesList",
        }),
      ],
    }),

    // ================================
    // 03. Rewaloryzacja i Wsparcie
    // ================================

    defineField({
      name: "serviceGroupThree",
      title: "Rewaloryzacja i Wsparcie",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Tytuł Sekcji",
          type: "string",
          initialValue: "Rewaloryzacja i Wsparcie",
        }),
        defineField({
          name: "services",
          title: "Lista Usług",
          type: "servicesList",
        }),
      ],
    }),
  ],
});

// ==========================================================
// ServicesListSection with internationalized portableText
// ==========================================================

// // List of Services section
// export const servicesList = defineType({
//   name: "servicesList",
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
