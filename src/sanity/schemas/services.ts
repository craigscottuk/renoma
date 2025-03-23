// cSpell:disable
import { defineType, defineField } from "sanity";
import { seoFields } from "../fields/seoFields";

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
    {
      name: "kolorSekcji",
      title: "Kolor sekcji",
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
      description: "Obraz wyświetlany w nagłówku strony.",
      type: "image",

      group: "obrazSekcji",
      hidden: ({ parent }) => parent?.imageLayout === "noImage",
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
          { title: "Portret po prawej (ratio 4:3)", value: "portraitRight" },
          { title: "Krajobraz po prawej", value: "landscapeRight" },
          { title: "Brak obrazu", value: "noImage" },
        ],
        layout: "radio",
      },
      group: "obrazSekcji",
      initialValue: "fullWidthAbove",
    }),

    defineField({
      name: "aspectRatio",
      title: "Proporcje obrazu",
      description: "Określ proporcje obrazu w nagłówku.",
      type: "string",
      options: {
        list: [
          { title: "4:3", value: "standard" },
          { title: "16:10", value: "wide" },
        ],
        layout: "radio",
      },
      group: "obrazSekcji",
      initialValue: "wide",
      hidden: ({ parent }) => parent?.imageLayout !== "landscapeRight",
    }),

    defineField({
      name: "landscapeMobileForPortraitRight",
      title: "Obraz krajobrazowy dla małych i średnich urządzeń",
      description:
        "Obraz krajobrazowy 16:10, który będzie wyświetlany w nagłówku na małych i średnich urządzeniach (telefony i tablety).",
      type: "image",
      group: "obrazSekcji",
      hidden: ({ parent }) => parent?.imageLayout !== "portraitRight",
    }),

    defineField({
      name: "mobileImage",
      title: "Obraz krajobrazowy dla małych i średnich urządzeń",
      description:
        "Obraz krajobrazowy 16:10, który będzie wyświetlany w nagłówku na małych i średnich urządzeniach (telefony i tablety).",
      type: "image",
      group: "obrazSekcji",
      hidden: ({ parent }) =>
        parent?.imageLayout !== "fullWidthAbove" &&
        parent?.imageLayout !== "fullWidthBelow",
    }),

    defineField({
      name: "imageAlt",
      title: "Alternatywny tekst obrazu nagłówka",
      description:
        "Krótki tekst opisujący obraz, aby uzupełnić kontekst i poprawić SEO",
      type: "internationalizedArrayString",
      group: "obrazSekcji",
      hidden: ({ parent }) => parent?.imageLayout === "noImage",
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
      group: "kolorSekcji",
      initialValue: "white",
    }),
  ],
});

export const serviceItem = defineType({
  name: "serviceItem",
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
                defineField({
                  name: "aspectRatio",
                  title: "Proporcje obrazu",
                  description: "Określ proporcje obrazu w nagłówku.",
                  type: "string",
                  options: {
                    list: [
                      { title: "4:3", value: "standard" },
                      { title: "16:10", value: "wide" },
                    ],
                    layout: "radio",
                  },
                  initialValue: "wide",
                }),
              ],
            }),
          ],
          description:
            "Obrazy ilustrujące usługę. Dodanie więcej niż jednego obrazu utworzy galerię lub karuzelę obrazów.",
        }),
        defineField({
          name: "addLinkToRenomaLab",
          title: "Dodaj link do RenomaLab",
          type: "boolean",
          description: "Czy dodać link do RenomaLab w tej sekcji usługi?",
          initialValue: false,
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
// 01. Badania, programy i ekspertyzy
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
      title: "01. Badania, programy i ekspertyzy",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Tytuł Sekcji",
          type: "string",
          initialValue: "Badania, programy i ekspertyzy",
        }),
        defineField({
          name: "services",
          title: "Lista Usług",
          type: "serviceItem",
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
          type: "serviceItem",
        }),
      ],
    }),

    // ================================
    // 03. Wsparcie administracyjne
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
          type: "serviceItem",
        }),
      ],
    }),
  ],
});

export const servicesPageMeta = defineType({
  name: "servicesPageMeta",
  title: "SEO & Ustawienia Meta – Usługi",
  type: "document",
  options: { singleton: true },
  fields: [...seoFields],
});
