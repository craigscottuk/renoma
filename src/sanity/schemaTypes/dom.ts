// cSpell:disable

import { defineType, defineField } from 'sanity';

export const dom = defineType({
  name: 'dom',
  title: 'Dom',
  type: 'document',
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: 'powitanie',
      title: 'Powitanie',
      type: 'internationalizedArrayString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wiadomosc',
      title: 'Wiadomość',
      type: 'internationalizedArrayText',
    }),
  ],
});
