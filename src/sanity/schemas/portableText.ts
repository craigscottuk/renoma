import { defineType, defineField } from "sanity";

export const basicText = defineType({
  name: "basicText",
  title: "Basic Text",
  type: "array",
  of: [
    defineField({
      name: "block",
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],

        annotations: [
          defineField({
            name: "link",
            type: "object",
            title: "URL",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          }),
        ],
      },
    }),
  ],
});

export const portableTextWithImage = defineType({
  name: "portableTextWithImage",
  title: "Portable Text with Image",
  type: "array",
  of: [
    defineField({
      name: "block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          defineField({
            name: "link",
            type: "object",
            title: "URL",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          }),
        ],
      },
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for accessibility and SEO.",
        },
      ],
    }),
  ],
});

export const portableTextWithHeadings = defineType({
  name: "portableTextWithHeadings",
  title: "Portable Text with Image",
  type: "array",
  of: [
    defineField({
      name: "block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],

        annotations: [
          defineField({
            name: "link",
            type: "object",
            title: "URL",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          }),
        ],
      },
    }),
    defineField({
      name: "separator",
      type: "object",
      title: "Separator",
      fields: [
        {
          name: "label",
          type: "string",
          title: "Label",
          initialValue: "Separator",
        },
      ],
    }),
  ],
});
