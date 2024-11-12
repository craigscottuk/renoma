TO DO!

- useTranslations for the contact form fields and validations
- is it possible to have the headings in the dane contact to be updated server side form a json object without the useTranslations hook?
- add correct heading tags to kontakt from and header component... finalize margins and spacing
  -blur animations to hero and header components

- meta stuff in the layout
- we need to get portable text installed and the document
- do something with this: "const OPTIONS = { next: { revalidate: 30 } };"
  c

servicesHeaderSection
aboutHeaderSection
privacyHeaderSection
workWithUsHeaderSection
businessCasesHeaderSection
renomaLabHeaderSection
learnWithUsHeaderSection

// const QUERY = `

// _[_type == "realizacje" && language == $locale]{
// title,
// slug,
// content,
// language,
// // Get the translations metadata
// // And resolve the 'value' reference field in each array item
// "\_translations": _[_type == "translation.metadata" && references(^._id)].translations[].value->{
// title,
// slug,
// language,
// content
// },
// }
// `;
