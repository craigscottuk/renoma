// cSpell:disable
import { defineType, defineField } from "sanity";

export const realizacje = defineType({
  name: "realizacje",
  title: "Realizacje",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) =>
        rule
          .required()
          .error("A slug is required to generate a page on the website"),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule.max(200).warning("Summary should be less than 200 characters"),
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Content",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
        },
      ],
    }),

    defineField({
      name: "language",
      type: "string",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      language: "language",
      media: "image",
    },
    prepare(select) {
      const { title, language, media } = select;

      return {
        title,
        subtitle: language.toUpperCase(),
        media,
      };
    },
  },
});
