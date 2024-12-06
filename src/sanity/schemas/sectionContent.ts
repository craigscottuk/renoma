// cSpell:disable
import { defineType, defineField } from "sanity";

export const sectionContent = defineType({
  name: "sectionContent",
  title: "Treść Sekcji",
  type: "array",
  of: [
    {
      name: "textAndImageGallery",
      title: "Tekst i Galeria Obrazów",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Nazwa Sekcji",
          type: "string",
          description: "Opcjonalna nazwa sekcji do odniesienia.",
        },
        {
          name: "text",
          title: "Tekst",
          type: "portableTextWithHeadings",
        },
        {
          name: "images",
          title: "Galeria Obrazów",
          type: "array",
          of: [
            {
              type: "image",
              fields: [
                {
                  name: "caption",
                  type: "string",
                  title: "Opis",
                  description:
                    "Opcjonalnie dodaj podpis pod obrazem, aby dodać więcej kontekstu i zwiększyć słowa kluczowe SEO.",
                },
              ],
            },
          ],
        },
        {
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
        },
        {
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
        },
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
      title: "Tekst i Tekst",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Nazwa Sekcji",
          type: "string",
          description: "Opcjonalna nazwa sekcji do odniesienia.",
        },
        {
          name: "text1",
          title: "Tekst 1",
          type: "portableTextWithHeadings",
        },
        {
          name: "text2",
          title: "Tekst 2",
          type: "portableTextWithHeadings",
        },
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
        {
          name: "name",
          title: "Nazwa Sekcji",
          type: "string",
          description: "Opcjonalna nazwa sekcji do odniesienia.",
        },
        {
          name: "images1",
          title: "Galeria Obrazów 1",
          type: "array",
          of: [
            {
              type: "image",
              fields: [
                {
                  name: "caption",
                  type: "string",
                  title: "Opis",
                  description:
                    "Opcjonalnie dodaj podpis pod obrazem, aby dodać więcej kontekstu i zwiększyć słowa kluczowe SEO.",
                },
              ],
            },
          ],
        },
        {
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
        },
        {
          name: "images2",
          title: "Galeria Obrazów 2",
          type: "array",
          of: [
            {
              type: "image",
              fields: [
                {
                  name: "caption",
                  type: "string",
                  title: "Opis",
                  description:
                    "Opcjonalnie dodaj podpis pod obrazem, aby dodać więcej kontekstu i zwiększyć słowa kluczowe SEO.",
                },
              ],
            },
          ],
        },
        {
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
        },
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
        {
          name: "name",
          title: "Nazwa Sekcji",
          type: "string",
          description: "Opcjonalna nazwa sekcji do odniesienia.",
        },
        {
          name: "image",
          title: "Obraz",
          type: "image",
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Opis",
              description:
                "Opcjonalnie dodaj podpis pod obrazem, aby dodać więcej kontekstu i zwiększyć słowa kluczowe SEO.",
            },
          ],
        },
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
        {
          name: "name",
          title: "Nazwa Sekcji",
          type: "string",
          description: "Opcjonalna nazwa sekcji do odniesienia.",
        },
        {
          name: "image",
          title: "Obraz",
          type: "image",
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Opis",
              description:
                "Opcjonalnie dodaj podpis pod obrazem, aby dodać więcej kontekstu i zwiększyć słowa kluczowe SEO.",
            },
          ],
        },
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
