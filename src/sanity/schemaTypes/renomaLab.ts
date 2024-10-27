import { defineType, defineField } from 'sanity';

export const renomaLab = defineType({
  name: 'renomaLab',
  title: 'Renoma LAB',
  type: 'document',
  fields: [
    defineField({
      name: 'opis',
      title: 'Opis',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eksperymenty',
      title: 'Eksperymenty',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
