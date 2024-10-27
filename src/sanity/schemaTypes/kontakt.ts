import { defineType, defineField } from 'sanity';

export const kontakt = defineType({
  name: 'kontakt',
  title: 'Kontakt',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'telefon',
      title: 'Telefon',
      type: 'string',
    }),
  ],
});
