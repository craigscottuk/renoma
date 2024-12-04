// cSpell:disable
import { defineType, defineField } from "sanity";

export const wpisRealizacji = defineType({
  name: "wpisRealizacji",
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
        rule
          .required()
          .error(
            "Podsumowanie jest wymagane i powinno mieć mniej niż 500 znaków.",
          ),
    }),

    defineField({
      name: "headerImage",
      title: "Nagłówek",
      type: "object",
      group: "caseStudyHeader",
      fields: [
        {
          name: "image",
          title: "Obraz nagłówka",
          type: "image",
        },
        {
          name: "imageAlt",
          title: "Alternatywny tekst obrazu nagłówka",
          type: "string",
        },
      ],
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
    // 01. Rys Historyczny (lub inny)
    // ================================

    defineField({
      name: "sectionOne",
      title: "01. Rys Historyczny (lub inny)",
      type: "object",
      group: "contentSection",
      fields: [
        {
          name: "title",
          title: "Tytuł Sekcji",
          type: "string",
          initialValue: "Rys historyczny",
        },
        {
          name: "content",
          title: "Treść Sekcji",
          type: "sectionContent",
        },
      ],
    }),

    // ================================
    // 02. Stan zachowania (lub inny)
    // ================================

    defineField({
      name: "sectionTwo",
      title: "02. Stan zachowania (lub inny)",
      type: "object",
      group: "contentSection",
      fields: [
        {
          name: "title",
          title: "Tytuł Sekcji",
          type: "string",
          initialValue: "Stan zachowania",
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
