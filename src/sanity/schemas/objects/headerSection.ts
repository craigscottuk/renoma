// cSpell:disable
import { defineType, defineField } from "sanity";

// Definicja wielokrotnego użycia sekcji nagłówka
export const headerSection = defineType({
  name: "headerSection",
  title: "Sekcja Nagłówka",
  type: "object",
  groups: [
    { name: "etykietaSekcji", title: "Etykieta sekcji" },
    { name: "tytulSekcji", title: "Tytuł sekcji" },
    { name: "opisSekcji", title: "Opis sekcji" },
  ],
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Etykieta sekcji",
      description:
        "Krótki tekst wyświetlany nad tytułem, np. 'WITAMY' lub 'KONTAKT'.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      title: "Tytuł sekcji",
      description:
        "Główny tytuł dla sekcji, np. 'Skontaktuj się z nami' lub 'Nasze usługi'.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionDescription",
      title: "Opis sekcji",
      description: "Krótki opis wprowadzający treść sekcji.",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "headerImage",
      title: "Obraz nagłówka",
      description:
        "Obraz wyświetlany na górze strony, związany z treścią sekcji.",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "headerImageAlt",
      title: "Alternatywny tekst obrazu nagłówka",
      description:
        "Tekst alternatywny dla obrazu nagłówka, opisujący jego treść dla dostępności.",
      type: "internationalizedArrayString",
    }),
  ],
});
