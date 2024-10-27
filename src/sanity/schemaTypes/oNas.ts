import { defineType, defineField } from 'sanity';

export const oNas = defineType({
  name: 'oNas',
  title: 'O Nas',
  type: 'document',
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: 'opis',
      title: 'Opis',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'misja',
      title: 'Misja',
      type: 'text',
    }),
  ],
});
