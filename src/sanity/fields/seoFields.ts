import { defineField } from "sanity";

export const seoFields = [
  defineField({
    name: "pageTitle",
    title: "Tytuł strony",
    description:
      "Tytuł, który pojawi się w zakładce przeglądarki i wynikach wyszukiwania.",
    type: "internationalizedArrayString",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "metaDescription",
    title: "Meta opis",
    description:
      "Krótki opis strony dla wyników wyszukiwania (maks. 160 znaków).",
    type: "internationalizedArrayString",
    validation: (Rule) =>
      Rule.max(160).warning("Optymalna długość to maks. 160 znaków."),
  }),
  defineField({
    name: "metaKeywords",
    title: "Meta słowa kluczowe",
    description: "Lista słów kluczowych związanych z tą stroną.",
    type: "array",
    of: [{ type: "string" }],
    options: { layout: "tags" },
  }),
  defineField({
    name: "ogTitle",
    title: "Open Graph tytuł",
    description:
      "Tytuł strony widoczny w podglądzie na Facebooku, Twitterze itp.",
    type: "internationalizedArrayString",
  }),
  defineField({
    name: "ogDescription",
    title: "Open Graph opis",
    description:
      "Opis strony używany przy udostępnianiu na mediach społecznościowych.",
    type: "internationalizedArrayString",
  }),
  defineField({
    name: "ogImage",
    title: "Open Graph obraz",
    description:
      "Obraz widoczny przy udostępnianiu strony w mediach społecznościowych.",
    type: "image",
    options: { hotspot: true },
  }),
];
