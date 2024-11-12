// cSpell:disable
import { defineType, defineField } from "sanity";

export const uczSieZNami = defineType({
  name: "Ucz Się z Nami",
  title: "O Nas",
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

// Graduate Program page header section
export const learnWithUsHeaderSection = defineType({
  name: "learnWithUsHeaderSection",
  title: "Nagłówek strony programu absolwenckiego",
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
      description: "Krótki tekst nad tytułem, np. 'PROGRAM ABSOLWENCKI'.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      title: "Tytuł sekcji",
      description:
        "Główny tytuł sekcji na stronie programu absolwenckiego, np. 'Dołącz do naszego programu absolwenckiego'.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionDescription",
      title: "Opis sekcji",
      description:
        "Tekst wprowadzający do programu absolwenckiego, który zachęca do zgłoszenia się do programu firmy.",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "headerImage",
      title: "Obraz nagłówka",
      description:
        "Obraz wyświetlany w nagłówku strony programu absolwenckiego, przedstawiający np. młodych profesjonalistów w trakcie pracy.",
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
        "Tekst alternatywny dla obrazu nagłówka, np. 'Zdjęcie młodych profesjonalistów współpracujących przy projekcie'.",
      type: "internationalizedArrayString",
      group: "obrazSekcji",
    }),
  ],
});
