// cSpell:disable

import { defineType, defineField } from 'sanity';

export const uslugi = defineType({
  name: 'uslugi',
  title: 'Usługi',
  type: 'document',
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: 'nazwa',
      title: 'Nazwa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'opis',
      title: 'Opis',
      type: 'text',
    }),
  ],
});
