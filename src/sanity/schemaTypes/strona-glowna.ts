import { defineField, defineType } from 'sanity';

export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',

  fields: [
    defineField({
      name: 'greeting',
      type: 'internationalizedArrayString',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: 'message',
      type: 'internationalizedArrayText',
    }),
  ],

  preview: {
    select: {
      title: 'greeting.0.value', // Grabs the first language in the array
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title || 'Home', // Fallback to "Home" if title is undefined
      };
    },
  },
});
