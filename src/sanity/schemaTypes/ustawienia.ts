import { defineType, defineField } from 'sanity';

export const ustawienia = defineType({
  name: 'ustawienia',
  title: 'Ustawienia',
  type: 'document',
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: 'nazwaStrony',
      title: 'Nazwa Strony', // Site Name
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'opisStrony',
      title: 'Opis Strony', // Site Description
      type: 'text',
    }),
    defineField({
      name: 'kontaktEmail',
      title: 'Kontaktowy Email', // Contact Email
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'socialMedia',
      title: 'Linki do Mediów Społecznościowych', // Social Media Links
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platforma',
              title: 'Platforma', // Platform
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'nazwaStrony',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title || 'Ustawienia',
      };
    },
  },
});
