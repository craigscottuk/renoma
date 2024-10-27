// cSpell:disable

import { defineType, defineField } from 'sanity';

export const pracujZNami = defineType({
  name: 'pracujZNami',
  title: 'Pracuj z Nami',
  type: 'document',
  fields: [
    defineField({
      name: 'tytul',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ofertyPracy',
      title: 'Oferty Pracy',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
