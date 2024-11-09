// cSpell:disable

import { defineType, defineField } from "sanity";

export const kontakt = defineType({
  name: "kontakt",
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

// Contact page header section

export const kontaktHeaderSection = defineType({
  name: "kontaktHeaderSection",
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
  ],
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Etykieta sekcji",
      description: "Krótki tekst nad tytułem, np. 'KONTAKT'.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      title: "Tytuł sekcji",
      description: "Główny tytuł sekcji, np. 'Skontaktuj się z nami'.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionDescription",
      title: "Opis sekcji",
      description: "Tekst zachęcający do kontaktu.",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
  ],
});

// Contact form section

// Zapytania ogólne
// Usługi konserwatorskie
// Prace budowlane i rewitalizacja
// Dotacje i wsparcie administracyjne
// Zapytanie ofertowe
// Praca i współpraca
// Reklamacje i uwagi
// Media i PR

export const contactFormSection = defineType({
  name: "contactFormSection",
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
              title: "label.0.value", // Shows the first language entry as a preview
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

// Contact details section
export const contactDetailsSection = defineType({
  name: "contactDetailsSection",
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
      type: "internationalizedArrayString",
      group: "biuro",
    }),
    defineField({
      name: "nazwaFirmy",
      title: "Nazwa firmy",
      type: "string",
      group: "daneDoFaktur",
    }),
    defineField({
      name: "adresFaktur",
      title: "Adres do faktur",
      type: "internationalizedArrayString",
      group: "daneDoFaktur",
    }),
    defineField({
      name: "numerNip",
      title: "NIP",
      type: "internationalizedArrayString",
      group: "daneDoFaktur",
    }),
    defineField({
      name: "numerRegon",
      title: "REGON",
      type: "number",
      group: "daneDoFaktur",
    }),
  ],
});
