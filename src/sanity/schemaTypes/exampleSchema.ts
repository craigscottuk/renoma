import { Home, Info, Briefcase, FolderOpen } from 'lucide-react';

import { defineField, defineType } from 'sanity';

export const homeSchema = defineType({
  name: 'home',
  title: 'Home',
  icon: Home,
  type: 'document',
  groups: [
    {
      name: 'info',
      title: 'Info',
      icon: Info,
    },
    {
      name: 'services',
      title: 'Services',
      icon: Briefcase,
    },
    {
      name: 'projects',
      title: 'Projects',
      icon: FolderOpen,
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      group: 'info',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      group: 'info',
      hidden: ({ document }) => !document?.name,
    }),
    defineField({
      name: 'biography',
      title: 'Biography',
      type: 'internationalizedArrayText',
      group: 'services',
      hidden: ({ document }) => !document?.name,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      group: 'info',
      hidden: ({ document }) => !document?.name,
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      group: 'services',
      options: { hotspot: true },
      hidden: ({ document }) => !document?.title,
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'projects',
      hidden: ({ document }) => !document?.name,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'photo',
    },
  },
});
