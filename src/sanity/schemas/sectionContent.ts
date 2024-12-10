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
          name: "name",
          title: "Nazwa Sekcji",
          type: "string",
          description: "Opcjonalna nazwa sekcji do odniesienia.",
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
                  title: "Opis",
                  description:
                    "Opcjonalnie dodaj podpis pod obrazem, aby dodać więcej kontekstu i poprawić SEO.",
                }),
              ],
            },
          ],
        }),
        defineField({
          name: "aspectRatio",
          title: "Proporcje Obrazu",
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
          description: "Wybierz proporcje obrazów w tej galerii.",
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
          title: "name",
          media: "images.0",
        },
        prepare({ title, media }) {
          return {
            title: title || "Sekcja Bez Nazwy",
            media,
          };
        },
      },
    },
    {
      name: "textAndText",
      title: "Tekst",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Nazwa Sekcji",
          type: "string",
          description: "Opcjonalna nazwa sekcji do odniesienia.",
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
          title: "name",
        },
        prepare({ title }) {
          return {
            title: title || "Sekcja Bez Nazwy",
          };
        },
      },
    },
    {
      name: "imageGalleryAndImageGallery",
      title: "Galeria Obrazów i Galeria Obrazów",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Nazwa Sekcji",
          type: "string",
          description: "Opcjonalna nazwa sekcji do odniesienia.",
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
                  title: "Opis",
                  description:
                    "Opcjonalnie dodaj podpis pod obrazem, aby dodać więcej kontekstu i poprawić SEO.",
                }),
              ],
            },
          ],
        }),
        defineField({
          name: "aspectRatio1",
          title: "Proporcje Obrazu",
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
          description: "Wybierz proporcje obrazów w tej galerii.",
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
                  title: "Opis",
                  description:
                    "Opcjonalnie dodaj podpis pod obrazem, aby dodać więcej kontekstu i poprawić SEO.",
                }),
              ],
            },
          ],
        }),
        defineField({
          name: "aspectRatio2",
          title: "Proporcje Obrazu",
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
          description: "Wybierz proporcje obrazów w tej galerii.",
        }),
      ],
      preview: {
        select: {
          title: "name",
          media: "images1.0",
        },
        prepare({ title, media }) {
          return {
            title: title || "Sekcja Bez Nazwy",
            media,
          };
        },
      },
    },
    {
      name: "fullWidthImage",
      title: "Obraz Na Całą Szerokość",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Nazwa Sekcji",
          type: "string",
          description: "Opcjonalna nazwa sekcji do odniesienia.",
        }),
        defineField({
          name: "image",
          title: "Obraz",
          type: "image",
          fields: [
            defineField({
              name: "caption",
              type: "string",
              title: "Opis",
              description:
                "Opcjonalnie dodaj podpis pod obrazem, aby dodać więcej kontekstu i poprawić SEO.",
            }),
          ],
        }),
      ],
      preview: {
        select: {
          title: "name",
          media: "image",
        },
        prepare({ title, media }) {
          return {
            title: title || "Sekcja Bez Nazwy",
            media,
          };
        },
      },
    },
    {
      name: "standardImage",
      title: "Obraz Standardowy",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Nazwa Sekcji",
          type: "string",
          description: "Opcjonalna nazwa sekcji do odniesienia.",
        }),
        defineField({
          name: "image",
          title: "Obraz",
          type: "image",
          fields: [
            defineField({
              name: "caption",
              type: "string",
              title: "Opis",
              description:
                "Opcjonalnie dodaj podpis pod obrazem, aby dodać więcej kontekstu i poprawić SEO.",
            }),
          ],
        }),
      ],
      preview: {
        select: {
          title: "name",
          media: "image",
        },
        prepare({ title, media }) {
          return {
            title: title || "Sekcja Bez Nazwy",
            media,
          };
        },
      },
    },
  ],
});
