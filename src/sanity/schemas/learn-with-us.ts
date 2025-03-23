// cSpell:disable
import { defineType, defineField } from "sanity";
import { seoFields } from "../fields/seoFields";

export const learnWithUs = defineType({
  name: "learnWithUs",
  title: "Ucz się z nami",
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

export const learnWithUsHeader = defineType({
  name: "learnWithUsHeader",
  title: "Nagłówek strony Ucz się z Nami",
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
      description: "Krótki tekst nad tytułem, np. „PROGRAM ABSOLWENCKI”.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description:
        "Główny tytuł sekcji na stronie programu absolwenckiego, np. „Dołącz do naszego programu absolwenckiego”.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis sekcji",
      description:
        "Tekst wprowadzający do programu absolwenckiego, który zachęca do zgłoszenia się do programu firmy.",
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

export const whatWeOffer = defineType({
  name: "whatWeOffer",
  title: "Co oferujemy?",
  type: "document",
  options: { singleton: true },
  fields: [
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Główny tytuł sekcji",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "offers",
      title: "Lista ofert",
      description: "Dodaj punkty oferty z tytułem i opisem.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Tytuł",
              description: "Krótki tytuł oferty.",
              type: "internationalizedArrayString",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Opis",
              description: "Opis oferty'",
              type: "internationalizedArrayText",
            },
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
        },
      ],
    }),
  ],
});

export const whoWeAreLookingFor = defineType({
  name: "whoWeAreLookingFor",
  title: "Kogo szukamy?",
  type: "document",
  options: { singleton: true },
  fields: [
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Główny tytuł sekcji, np. „Kogo szukamy?”.",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "criteria",
      title: "Profil i Kryteria",
      type: "object",
      description:
        "Tekst opisujący profil poszukiwanych osób oraz listę wymagań lub cech, które powinny one spełniać.",
      validation: (Rule) => Rule.required(),
      fields: [
        { name: "pl", title: "PL", type: "portableTextWithHeadings" },
        { name: "en", title: "EN", type: "portableTextWithHeadings" },
        { name: "de", title: "DE", type: "portableTextWithHeadings" },
      ],
    }),

    defineField({
      name: "image",
      title: "Obraz",
      description:
        "Obrazek reprezentujący sekcję, np. zdjęcie osoby na budowie.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageAlt",
      title: "Alternatywny tekst obrazu",
      description: "Alternatywny tekst dla obrazu sekcji.",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "applyButtonText",
      title: "Tekst przycisku aplikacji",
      description:
        "Tekst na przycisku zachęcającym do aplikowania, np. „Aplikuj teraz”.",
      type: "internationalizedArrayString",
    }),
  ],
});

export const learnWithUsPageMeta = defineType({
  name: "learnWithUsPageMeta",
  title: "SEO & Ustawienia Meta – Ucz się z Nami",
  type: "document",
  options: { singleton: true },
  fields: [...seoFields],
});
