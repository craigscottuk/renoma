// cSpell:disable
import { defineType, defineField } from "sanity";

export const about = defineType({
  name: "about",
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

// About page header section
export const aboutUsHeader = defineType({
  name: "aboutUsHeader",
  title: "Nagłówek strony o nas",
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
      description: "Krótki tekst nad tytułem, np. 'O NAS'.",
      type: "internationalizedArrayString",
      group: "etykietaSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Główny tytuł sekcji na stronie o nas, np. 'Poznaj nas'.",
      type: "internationalizedArrayString",
      group: "tytulSekcji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis sekcji",
      description:
        "Tekst opisujący firmę lub zespół, umieszczony na stronie o nas.",
      type: "internationalizedArrayText",
      group: "opisSekcji",
    }),
    defineField({
      name: "image",
      title: "Obraz nagłówka",
      description: "Obraz wyświetlany w nagłówku strony o nas.",
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
          { title: "Krajobraz po prawej", value: "landscapeRight" },
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
        "Tekst alternatywny dla obrazu nagłówka, np. 'Zdjęcie przedstawiające zespół firmy'.",
      type: "internationalizedArrayString",
      group: "obrazSekcji",
    }),
  ],
});

// About Us / Our Valuessection
export const aboutUs = defineType({
  name: "aboutUs",
  title: "Sekcja 'O nas i nasza wartości'",
  type: "document",
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Tytuł sekcji, np. 'O nas'.",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "text",
      title: "Tekst sekcji",
      type: "object",
      description: "Treść opisująca firmę, jej misję i wartości.",
      validation: (Rule) => Rule.required(),
      fields: [
        { name: "pl", title: "PL", type: "portableTextWithHeadings" },
        { name: "en", title: "EN", type: "portableTextWithHeadings" },
        { name: "de", title: "DE", type: "portableTextWithHeadings" },
      ],
    }),
  ],
});

// Our History section
export const ourHistory = defineType({
  name: "ourHistory",
  title: "Sekcja osi czasu",
  type: "document",
  options: { singleton: true },
  description:
    "Sekcja osi czasu przedstawia najważniejsze wydarzenia lub osiągnięcia w porządku chronologicznym.",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      description: "Główny tytuł sekcji, np. 'Nasza historia'.",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "text",
      title: "Tekst sekcji",
      description:
        "Treść wprowadzająca do sekcji, np. 'Nasza historia to lata wyzwań i sukcesów.'.",
      type: "internationalizedArrayText",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "timeline",
      title: "Oś czasu",
      type: "array",
      description:
        "Lista kluczowych wydarzeń w kolejności chronologicznej, przedstawiająca historię lub osiągnięcia.",
      of: [
        defineField({
          name: "timelineItem",
          title: "Element osi czasu",
          type: "object",
          fields: [
            defineField({
              name: "year",
              title: "Rok",
              type: "number",
              description: "Rok, w którym wydarzenie miało miejsce.",
              validation: (Rule) =>
                Rule.required()
                  .min(1900)
                  .max(new Date().getFullYear())
                  .integer()
                  .error(
                    "Rok musi być w formacie YYYY i znajdować się pomiędzy 1900 a bieżącym rokiem.",
                  ),
            }),
            defineField({
              name: "content",
              title: "Treść wydarzenia",
              type: "object",
              description: "Opis wydarzenia w dostępnych językach.",
              fields: [
                { name: "pl", title: "Polski", type: "basicText" },
                { name: "en", title: "Angielski", type: "basicText" },
                { name: "de", title: "Niemiecki", type: "basicText" },
              ],
            }),
            defineField({
              name: "images",
              title: "Obrazy",
              type: "array",
              description:
                "Obrazy ilustrujące wydarzenie. Dodaj podpisy, aby uzupełnić kontekst.",
              of: [
                defineField({
                  name: "imageItem",
                  title: "Obraz z podpisem",
                  type: "object",
                  fields: [
                    defineField({
                      name: "src",
                      title: "Obraz",
                      type: "image",
                      description: "Obraz ilustrujący wydarzenie.",
                      options: {
                        hotspot: true,
                      },
                    }),
                    defineField({
                      name: "caption",
                      title: "Podpis obrazu",
                      type: "internationalizedArrayString",
                      description:
                        "Krótki tekst opisujący obraz, aby uzupełnić kontekst i poprawić SEO.",
                    }),
                    defineField({
                      name: "aspectRatio",
                      title: "Proporcje obrazu",
                      type: "string",
                      options: {
                        list: [
                          { title: "Brak", value: "none" },
                          { title: "Krajobraz", value: "landscape" },
                          { title: "Portret", value: "portrait" },
                          { title: "Kwadrat", value: "square" },
                        ],
                        layout: "radio",
                      },
                      initialValue: "none",
                      description: "Określ proporcje obrazu w galerii.",
                    }),
                  ],
                  preview: {
                    select: {
                      title: "caption.0.value",
                      media: "src",
                    },
                    prepare({ title, media }) {
                      return {
                        title: title || "Brak podpisu obrazu",
                        media,
                      };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "year",
            },
            prepare({ title }) {
              return {
                title: title ? `Rok: ${title}` : "Brak roku",
              };
            },
          },
        }),
      ],
    }),
  ],
});

export const aboutPageMetadata = defineType({
  name: "aboutPageMetadata",
  title: "SEO & Meta – O Nas",
  type: "document",
  options: { singleton: true },
  fields: [
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
    defineField({
      name: "canonicalUrl",
      title: "Kanoniczny URL",
      description: "Jeśli ta strona ma wersję główną, podaj jej adres URL.",
      type: "url",
    }),
    defineField({
      name: "robots",
      title: "Meta robots",
      description: "Zarządzaj indeksowaniem tej strony przez wyszukiwarki.",
      type: "string",
      options: {
        list: [
          { title: "Index, Follow (Domyślne)", value: "index, follow" },
          { title: "No Index, Follow", value: "noindex, follow" },
          { title: "No Index, No Follow", value: "noindex, nofollow" },
        ],
        layout: "radio",
      },
      initialValue: "index, follow",
    }),
  ],
});
