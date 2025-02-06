// /schemas/footer.ts
import { defineType, defineField } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Stopka",
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

export const footerLinks = defineType({
  name: "footerLinks",
  title: "Stopka",
  type: "document",
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: "groupOne",
      title: "Grupa 1: Badania, Ekspertyzy i Planowanie",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Tytuł Kolumny",
          type: "internationalizedArrayString",
          description: "Np. „Badania, ekspertyzy i planowanie”",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "services",
          title: "Lista Usług",
          type: "array",
          of: [
            defineField({
              name: "serviceItem",
              title: "Usługa",
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Nazwa Usługi",
                  type: "internationalizedArrayString",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "title.0.value",
                },
                prepare({ title }) {
                  return {
                    title: title || "Bez nazwy usługi",
                  };
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "groupTwo",
      title: "Grupa 2: Realizacja i Nadzór",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Tytuł Kolumny",
          type: "internationalizedArrayString",
          description: "Np. „Realizacja i nadzór”",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "services",
          title: "Lista Usług",
          type: "array",
          of: [
            defineField({
              name: "serviceItem",
              title: "Usługa",
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Nazwa Usługi",
                  type: "internationalizedArrayString",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "title.0.value",
                },
                prepare({ title }) {
                  return {
                    title: title || "Bez nazwy usługi",
                  };
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "groupThree",
      title: "Grupa 3: Rewaloryzacja i Wsparcie",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Tytuł Kolumny",
          type: "internationalizedArrayString",
          description: "Np. „Rewaloryzacja i wsparcie”",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "services",
          title: "Lista Usług",
          type: "array",
          of: [
            defineField({
              name: "serviceItem",
              title: "Usługa",
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Nazwa Usługi",
                  type: "internationalizedArrayString",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "title.0.value",
                },
                prepare({ title }) {
                  return {
                    title: title || "Bez nazwy usługi",
                  };
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "groupFour",
      title: "Grupa 4: Kontakt",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Tytuł Kolumny",
          type: "internationalizedArrayString",
          description: "Np. „Kontakt”",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "services",
          title: "Lista Usług lub Linków",
          type: "array",
          of: [
            defineField({
              name: "serviceItem",
              title: "Pozycja Kontaktowa",
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Tekst Linku/Kontaktu",
                  type: "internationalizedArrayString",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "title.0.value",
                },
                prepare({ title }) {
                  return {
                    title: title || "Bez nazwy pozycji",
                  };
                },
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Stopka (Footer)",
        subtitle: "Ustawienia stopki strony",
      };
    },
  },
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
