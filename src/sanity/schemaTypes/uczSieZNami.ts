// cSpell:disable

import { defineType, defineField } from 'sanity';

export const uczSieZNami = defineType({
  name: 'uczSieZNami',
  title: 'Ucz Się z Nami',
  type: 'document',
  fields: [
    defineField({
      name: 'tytul',
      title: 'Tytuł',
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
