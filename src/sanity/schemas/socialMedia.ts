// /schemas/footer.ts
import { defineType, defineField } from "sanity";

export const socialMedia = defineType({
  name: "socialMedia",
  title: "",
  type: "document",
  options: {
    singleton: true,
  },
  fields: [
    {
      name: "placeholder",
      title: "Zastępczy tekst",
      type: "string",
    },
  ],
});

export const socialMediaLinks = defineType({
  name: "socialMediaLinks",
  title: "Linki Społecznościowe",
  type: "document",
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
    }),
    defineField({
      name: "linkedIn",
      title: "LinkedIn",
      type: "url",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Linki Społecznościowe",
        subtitle: "Ustawienia linków społecznościowych",
      };
    },
  },
});
