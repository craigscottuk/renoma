// cSpell:disable
import { defineType, defineField } from "sanity";
import { seoFields } from "./seoFields";

export const contact = defineType({
  name: "contact",
  title: "Kontakt",
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

export const contactHeader = defineType({
  name: "contactHeader",
  title: "Nagłówek strony kontaktowej",
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
      description: "Krótki tekst nad tytułem.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Główny tytuł sekcji.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis sekcji",
      description: "Tekst zachęcający do kontaktu.",
      type: "internationalizedArrayText",
      options: { rows: 3 },
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
      hidden: ({ parent }) => parent?.imageLayout !== "fullWidthAbove",
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

export const contactForm = defineType({
  name: "contactForm",
  title: "Sekcja formularza kontaktowego",
  type: "document",
  options: { singleton: true },
  fields: [
    defineField({
      name: "contactFormSubjects",
      title: "Tematy formularza kontaktowego",
      description:
        "Dodaj lub usuń tematy, które pojawią się w rozwijanym menu formularza kontaktowego. Użytkownicy będą mogli wybrać temat zapytania.",
      type: "array",
      of: [
        defineField({
          type: "object",
          name: "subject",
          title: "Temat",
          fields: [
            {
              name: "label",
              title: "Etykieta tematu",
              description:
                "Wpisz nazwę tematu, która będzie widoczna w rozwijanym menu (możliwość dodania w różnych językach).",
              type: "internationalizedArrayString",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "label.0.value",
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
  ],
});

export const contactDetails = defineType({
  name: "contactDetails",
  title: "Sekcja danych kontaktowych",
  type: "document",
  options: { singleton: true },
  groups: [
    {
      name: "telefon",
      title: "Telefon",
    },
    {
      name: "email",
      title: "Email",
    },
    {
      name: "biuro",
      title: "Biuro",
    },
    {
      name: "adresKorespondencyjny",
      title: "Adres korespondencyjny",
    },
    {
      name: "daneDoFaktur",
      title: "Dane do faktur",
    },
  ],
  fields: [
    defineField({
      name: "numerTelefonu",
      title: "Numer telefonu",
      type: "string",
      group: "telefon",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "adresEmail",
      title: "Adres email",
      type: "string",
      group: "email",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "adresBiuraLineOne",
      title: "Adres biura, linia 1",
      type: "internationalizedArrayString",
      group: "biuro",
    }),
    defineField({
      name: "adresBiuraLineTwo",
      title: "Adres biura, linia 2",
      type: "string",
      group: "biuro",
    }),
    defineField({
      name: "adresKorespondencyjnyLineOne",
      title: "Adres korespondencyjny, linia 1",
      type: "internationalizedArrayString",
      group: "adresKorespondencyjny",
    }),
    defineField({
      name: "adresKorespondencyjnyLineTwo",
      title: "Adres korespondencyjny, linia 2",
      type: "string",
      group: "adresKorespondencyjny",
    }),
    defineField({
      name: "nazwaFirmyOne",
      title: "Nazwa firmy 1",
      type: "string",
      group: "daneDoFaktur",
    }),
    defineField({
      name: "nazwaFirmyTwo",
      title: "Nazwa firmy 2",
      type: "string",
      group: "daneDoFaktur",
    }),
    defineField({
      name: "adresFakturLineOne",
      title: "Adres do faktur, linia 1",
      type: "internationalizedArrayString",
      group: "daneDoFaktur",
    }),
    defineField({
      name: "adresFakturLineTwo",
      title: "Adres do faktur, linia 2",
      type: "string",
      group: "daneDoFaktur",
    }),
    defineField({
      name: "numerNipOne",
      title: "NIP 1",
      type: "internationalizedArrayString",
      group: "daneDoFaktur",
    }),
    defineField({
      name: "numerNipTwo",
      title: "NIP 2",
      type: "internationalizedArrayString",
      group: "daneDoFaktur",
    }),
    defineField({
      name: "numerRegonOne",
      title: "REGON 1",
      type: "string",
      group: "daneDoFaktur",
    }),
    defineField({
      name: "numerRegonTwo",
      title: "REGON 2",
      type: "string",
      group: "daneDoFaktur",
    }),
  ],
});

export const contactPageMeta = defineType({
  name: "contactPageMeta",
  title: "SEO & Ustawienia Meta – Kontakt",
  type: "document",
  options: { singleton: true },
  fields: [...seoFields],
});
