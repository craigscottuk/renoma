// cSpell:disable
import { defineType, defineField } from "sanity";

export const sectionContent = defineType({
  name: "sectionContent",
  title: "Treść Sekcji",
  type: "array",
  of: [
    {
      name: "textAndImageGallery",
      title: "Tekst i Obraz/Galeria Obrazów",
      type: "object",
      fields: [
        defineField({
          name: "contentBlock",
          title: "Nazwa Bloku Treści",
          type: "string",
          description: "Opcjonalna nazwa bloku treści do odniesienia.",
        }),
        defineField({
          name: "heading3",
          title: "Nagłówek H3",
          type: "string",
          description: "Opcjonalny nagłówek H3 dla tej sekcji.",
        }),
        defineField({
          name: "text",
          title: "Tekst",
          type: "portableTextWithHeadings",
        }),
        defineField({
          name: "images",
          title: "Galeria Obrazów",
          description:
            "Wybór więcej niż jednego obrazu wyświetli karuzelę obrazów.",
          type: "array",
          of: [
            {
              type: "image",
              fields: [
                defineField({
                  name: "caption",
                  type: "string",
                  title: "Podpis Obrazu",
                  description:
                    "Opcjonalny podpis dla obrazu. Ułatwia zrozumienie kontekstu obrazu i poprawia SEO.",
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
              preview: {
                select: {
                  title: "caption ",
                  media: "image",
                },
                prepare({ title, media }) {
                  return {
                    title: title || "Brak podpisu pod obrazem",
                    media,
                  };
                },
              },
            },
          ],
        }),

        defineField({
          name: "layout",
          title: "Układ",
          type: "string",
          options: {
            list: [
              {
                title: "Tekst po lewej, obraz po prawej",
                value: "textLeftImageRight",
              },
              {
                title: "Obraz po lewej, tekst po prawej",
                value: "imageLeftTextRight",
              },
            ],
            layout: "radio",
          },
          initialValue: "textLeftImageRight",
          description: "Wybierz układ dla tej sekcji.",
        }),
      ],
      preview: {
        select: {
          title: "contentBlock",
          media: "images.0",
        },
        prepare({ title, media }) {
          return {
            title: title || "Blok Treści Bez Nazwy",
            media,
          };
        },
      },
    },
    // ================================
    // text wrap two coluns
    // ================================

    {
      name: "textWrap",
      title: "Tekst Zawijany",
      type: "object",
      fields: [
        defineField({
          name: "contentBlock",
          title: "Nazwa Bloku Treści",
          type: "string",
          description: "Opcjonalna nazwa bloku treści do odniesienia.",
        }),
        defineField({
          name: "heading3",
          title: "Nagłówek H3",
          type: "string",
          description: "Opcjonalny nagłówek H3 dla tej sekcji.",
        }),
        defineField({
          name: "text",
          description:
            "Tekst zostanie rozłożony na 2 kolumny na dużych urządzeniach.",
          title: "Tekst",
          type: "portableTextWithHeadings",
        }),
      ],
      preview: {
        select: {
          title: "contentBlock",
        },
        prepare({ title }) {
          return {
            title: title || "Blok Treści Bez Nazwy",
          };
        },
      },
    },

    // ================================
    // textAndText
    // ================================

    {
      name: "textAndText",
      title: "Tekst",
      type: "object",
      fields: [
        defineField({
          name: "contentBlock",
          title: "Nazwa Bloku Treści",
          type: "string",
          description: "Opcjonalna nazwa bloku treści do odniesienia.",
        }),
        defineField({
          name: "heading3",
          title: "Nagłówek H3",
          type: "string",
          description: "Opcjonalny nagłówek H3 dla tej sekcji.",
        }),
        defineField({
          name: "text1",
          title: "Tekst (Lewa Kolumna)",
          description:
            "Tekst w lewej kolumnie. Na dużych ekranach ten tekst będzie po lewej stronie.",
          type: "portableTextWithHeadings",
        }),
        defineField({
          name: "text2",
          title: "Tekst (Prawa Kolumna)",
          description:
            "Tekst w prawej kolumnie. Na dużych ekranach ten tekst będzie po prawej stronie.",
          type: "portableTextWithHeadings",
        }),
      ],
      preview: {
        select: {
          title: "contentBlock",
        },
        prepare({ title }) {
          return {
            title: title || "Blok Treści Bez Nazwy",
          };
        },
      },
    },

    // ================================
    // imageGalleryAndImageGallery
    // ================================

    {
      name: "imageGalleryAndImageGallery",
      title: "Galeria Obrazów i Galeria Obrazów",
      type: "object",
      fields: [
        defineField({
          name: "contentBlock",
          title: "Nazwa Bloku Treści",
          type: "string",
          description: "Opcjonalna nazwa bloku treści do odniesienia.",
        }),
        defineField({
          name: "heading3",
          title: "Nagłówek H3",
          type: "string",
          description: "Opcjonalny nagłówek H3 dla tej sekcji.",
        }),
        defineField({
          name: "images1",
          title: "Galeria Obrazów 1",
          type: "array",
          of: [
            {
              type: "image",
              fields: [
                defineField({
                  name: "caption",
                  type: "string",
                  title: "Podpis Obrazu",
                  description:
                    "Opcjonalny podpis dla obrazu. Ułatwia zrozumienie kontekstu obrazu i poprawia SEO.",
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
              preview: {
                select: {
                  title: "caption ",
                  media: "image",
                },
                prepare({ title, media }) {
                  return {
                    title: title || "Brak podpisu pod obrazem",
                    media,
                  };
                },
              },
            },
          ],
        }),
        defineField({
          name: "images2",
          title: "Galeria Obrazów 2",
          type: "array",
          of: [
            {
              type: "image",
              fields: [
                defineField({
                  name: "caption",
                  type: "string",
                  title: "Podpis Obrazu",
                  description:
                    "Opcjonalny podpis dla obrazu. Ułatwia zrozumienie kontekstu obrazu i poprawia SEO.",
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
              preview: {
                select: {
                  title: "caption ",
                  media: "image",
                },
                prepare({ title, media }) {
                  return {
                    title: title || "Brak podpisu pod obrazem",
                    media,
                  };
                },
              },
            },
          ],
        }),
      ],
      preview: {
        select: {
          title: "contentBlock",
          media: "images1.0",
        },
        prepare({ title, media }) {
          return {
            title: title || "Blok Treści Bez Nazwy",
            media,
          };
        },
      },
    },

    // ================================
    // fullWidthImage
    // ================================

    {
      name: "fullWidthImage",
      title: "Obraz Na Całą Szerokość",
      type: "object",
      fields: [
        defineField({
          name: "contentBlock",
          title: "Nazwa Bloku Treści",
          type: "string",
          description: "Opcjonalna nazwa bloku treści do odniesienia.",
        }),
        defineField({
          name: "heading3",
          title: "Nagłówek H3",
          type: "string",
          description: "Opcjonalny nagłówek H3 dla tej sekcji.",
        }),
        defineField({
          name: "image",
          title: "Obraz",
          type: "image",
          fields: [
            defineField({
              name: "caption",
              type: "string",
              title: "Podpis Obrazu",
              description:
                "Opcjonalnie dodaj podpis pod obrazem, aby dodać więcej kontekstu i poprawić SEO.",
            }),
          ],
          preview: {
            select: {
              title: "caption ",
              media: "image",
            },
            prepare({ title, media }) {
              return {
                title: title || "Brak podpisu pod obrazem",
                media,
              };
            },
          },
        }),
      ],
      preview: {
        select: {
          title: "contentBlock",
          media: "image",
        },
        prepare({ title, media }) {
          return {
            title: title || "Blok Treści Bez Nazwy",
            media,
          };
        },
      },
    },

    // ================================
    // standardImage
    // ================================

    {
      name: "standardImage",
      title: "Obraz Standardowy",
      type: "object",
      fields: [
        defineField({
          name: "contentBlock",
          title: "Nazwa Bloku Treści",
          type: "string",
          description: "Opcjonalna nazwa bloku treści do odniesienia.",
        }),
        defineField({
          name: "heading3",
          title: "Nagłówek H3",
          type: "string",
          description: "Opcjonalny nagłówek H3 dla tej sekcji.",
        }),
        defineField({
          name: "image",
          title: "Obraz",
          type: "image",
          fields: [
            defineField({
              name: "caption",
              type: "string",
              title: "Podpis Obrazu",
              description:
                "Opcjonalnie dodaj podpis pod obrazem, aby dodać więcej kontekstu i poprawić SEO.",
            }),
          ],
          preview: {
            select: {
              title: "caption ",
              media: "image",
            },
            prepare({ title, media }) {
              return {
                title: title || "Brak podpisu pod obrazem",
                media,
              };
            },
          },
        }),
      ],
      preview: {
        select: {
          title: "contentBlock ",
          media: "image",
        },
        prepare({ title, media }) {
          return {
            title: title || "Blok Treści Bez Nazwy",
            media,
          };
        },
      },
    },
  ],
});
