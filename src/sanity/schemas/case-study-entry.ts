// cSpell:disable
import { defineType, defineField } from "sanity";

export const caseStudyEntry = defineType({
  name: "caseStudyEntry",
  title: "Wpis Realizacji",
  type: "document",
  groups: [
    {
      name: "caseStudyHeader",
      title: "Nagłówek",
    },
    {
      name: "projectDetails",
      title: "Szczegóły Projektu",
    },
    {
      name: "contentSection",
      title: "Sekcja Treści",
    },
    {
      name: "bibliography",
      title: "Bibliografia",
    },
  ],
  fields: [
    defineField({
      name: "language",
      type: "string",
      title: "Język",
      description:
        "To pole jest tylko do odczytu i przypisuje język do dokumentu. Służy jako odniesienie do języka dokumentu.",
      readOnly: true,
    }),

    defineField({
      name: "title",
      title: "Tytuł Realizacji",
      description: "Tytuł realizacji, np. 'Konserwacja Baszty Ferbera'.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "Unikalny identyfikator URL projektu, generowany na podstawie tytułu, np. 'konserwacja-baszty'.",
      options: {
        source: "title",
      },
      validation: (rule) =>
        rule
          .required()
          .error("Slug jest wymagany do wygenerowania strony projektu."),
    }),

    defineField({
      name: "summary",
      title: "Podsumowanie",
      description:
        "Krótki opis projektu, maksymalnie 500 znaków. Używane jako wprowadzenie do studium przypadku w sekcji nagłówkowej strony.",
      type: "text",
      rows: 8,
      validation: (rule) =>
        rule.required().error("Podsumowanie jest wymagane."),
    }),

    defineField({
      name: "image",
      title: "Obraz nagłówka",
      description: "Obraz wyświetlany w nagłówku strony kontaktowej.",
      type: "image",
      options: {
        hotspot: true,
      },
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
          { title: "Krajobraz po prawej", value: "landscapeRight" },
        ],
        layout: "radio",
      },

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

      initialValue: "white",
    }),

    // ================================
    // Szczegóły Projektu
    // ================================

    defineField({
      name: "details",
      title: "Szczegóły Projektu",
      type: "object",
      description:
        "Zawiera szczegółowe informacje o projekcie, takie jak lokalizacja, status, czas trwania, typ obiektu, role oraz zakres prac.",
      group: "projectDetails",
      fields: [
        {
          name: "lokalizacja",
          title: "Lokalizacja",
          type: "string",
          description:
            "Podaj lokalizację projektu, np. 'Wzgórze Katedralne we Fromborku'.",
        },
        {
          name: "status",
          title: "Status",
          type: "string",
          description:
            "Podaj aktualny status projektu, np. 'W trakcie realizacji' lub 'Zakończony'.",
        },
        {
          name: "czasTrwania",
          title: "Czas trwania",
          type: "string",
          description:
            "Podaj czas trwania projektu, np. '12 miesięcy (styczeń 2024 - grudzień 2024)'.",
        },
        {
          name: "typObiektu",
          title: "Typ Obiektu",
          type: "string",
          description:
            "Podaj typ obiektu, np. 'Zabytek architektury obronnej'.",
        },
        {
          name: "rola",
          title: "Rola",
          type: "array",
          of: [{ type: "string" }],
          description:
            "Podaj role w projekcie, np. 'Autor programu prac konserwatorskich.', 'Generalny wykonawca prac konserwatorskich i restauratorskich oraz budowlanych'.",
        },
        {
          name: "zakresPrac",
          title: "Zakres Prac",
          type: "array",
          of: [{ type: "string" }],
          description:
            "Podaj zakres prac, np. 'Stabilizacja konstrukcji budynku.', 'Remont więźby dachowej.', 'Wymiana pokrycia dachowego.'.",
        },
      ],
    }),

    // ================================
    // 01. Rys Historyczny
    // ================================

    defineField({
      name: "sectionOne",
      title: "01. Rys Historyczny (lub własny)",
      type: "object",
      group: "contentSection",
      fields: [
        {
          name: "title",
          title: "Tytuł Sekcji",
          type: "string",
          initialValue: "Rys historyczny",
          description: "Domyślny tytuł sekcji, który można zmienić na własny.",
        },
        {
          name: "content",
          title: "Treść Sekcji",
          type: "sectionContent",
        },
      ],
    }),

    // ================================
    // 02. Stan zachowania
    // ================================

    defineField({
      name: "sectionTwo",
      title: "02. Stan zachowania (lub własny)",
      type: "object",
      group: "contentSection",
      fields: [
        {
          name: "title",
          title: "Tytuł Sekcji",
          type: "string",
          initialValue: "Stan zachowania",
          description: "Domyślny tytuł sekcji, który można zmienić na własny.",
        },
        {
          name: "content",
          title: "Treść Sekcji",
          type: "sectionContent",
        },
      ],
    }),

    // ================================
    // 03. Założenia konserwatorskie
    // ================================

    defineField({
      name: "sectionThree",
      title: "03. Założenia konserwatorskie (lub własny)",
      type: "object",
      group: "contentSection",
      fields: [
        {
          name: "title",
          title: "Tytuł Sekcji",
          type: "string",
          initialValue: "Założenia konserwatorskie",
          description: "Domyślny tytuł sekcji, który można zmienić na własny.",
        },
        {
          name: "content",
          title: "Treść Sekcji",
          type: "sectionContent",
        },
      ],
    }),

    // ================================
    // 04. Przebieg prac konserwatorskich i restauratorskich oraz budowlanych
    // ================================

    defineField({
      name: "sectionFour",
      title:
        "04. Przebieg prac konserwatorskich i restauratorskich oraz budowlanych",
      type: "object",
      group: "contentSection",
      fields: [
        {
          name: "title",
          title: "Tytuł Sekcji",
          type: "string",
          initialValue:
            "Przebieg prac konserwatorskich i restauratorskich oraz budowlanych",
          description: "Domyślny tytuł sekcji, który można zmienić na własny.",
        },
        {
          name: "content",
          title: "Treść Sekcji",
          type: "sectionContent",
        },
      ],
    }),

    // ================================
    // 05. Efekty prac konserwatorskich i restauratorskich oraz budowlanych

    // ================================

    defineField({
      name: "sectionFive",
      title:
        "05. Efekty prac konserwatorskich i restauratorskich oraz budowlanych",
      type: "object",
      group: "contentSection",
      fields: [
        {
          name: "title",
          title: "Tytuł Sekcji",
          type: "string",
          initialValue:
            "Efekty prac konserwatorskich i restauratorskich oraz budowlanych",
          description: "Domyślny tytuł sekcji, który można zmienić na własny.",
        },
        {
          name: "content",
          title: "Treść Sekcji",
          type: "portableTextWithHeadings",
        },
        {
          name: "comparisons",
          title: "Porównania",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Tytuł",
                  type: "string",
                  description: "Tytuł porównania, np. 'Elewacja zewnętrzna'.",
                },
                {
                  name: "imageBefore",
                  title: "Obraz przed",
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                },
                {
                  name: "imageAfter",
                  title: "Obraz po",
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    }),

    defineField({
      name: "sectionSix",
      title: "06. Wybrana bibliografia",
      type: "object",
      group: "contentSection",
      fields: [
        {
          name: "title",
          title: "Tytuł Sekcji",
          type: "string",
          initialValue: "Wybrana bibliografia",
          description: "Domyślny tytuł sekcji, który można zmienić na własny.",
        },
        {
          name: "content",
          title: "Treść Sekcji",
          type: "sectionContent",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      language: "language",
      media: "image",
    },
    prepare(select) {
      const { title, language, media } = select;

      return {
        title,
        subtitle: language.toUpperCase(),
        media,
      };
    },
  },
});
