// cSpell:disable
import { defineType, defineField } from "sanity";

export const oNas = defineType({
  name: "oNas",
  title: "O Nas",
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

// About page header section with imported hedaerSection object
// export const aboutHeaderSection = defineType({
//   name: "aboutHeaderSection",
//   title: "Nagłówek strony kontaktowej",
//   type: "document",
//   options: { singleton: true },
//   fields: [
//     defineField({
//       name: "headerSection",
//       title: "Nagłówek Strony",
//       type: "headerSection", // Reference the reusable object type here
//     }),
//   ],
// });
export const aboutHeaderSection = defineType({
  name: "aboutHeaderSection",
  title: "Nagłówek strony kontaktowej",
  type: "document",
  options: { singleton: true },
  fields: [
    defineField({
      name: "headerSection",
      title: "Nagłówek Strony",
      type: "headerSection", // Reference the reusable object type here
    }),
  ],
});
