// cSpell:disable

import { defineType, defineField } from 'sanity';

export const realizacje = defineType({
  name: 'realizacje',
  title: 'Realizacje',
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
    defineField({
      name: 'data',
      title: 'Data',
      type: 'date',
    }),
  ],
});
