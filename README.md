TO DO!

- meta stuff in the layout
- do something with this: "const OPTIONS = { next: { revalidate: 30 } };"

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

### Freeze of the [slug] page for the video tutorial:

```js
// cSpell:disable
// app/[locale]/realizacje/[slug]/page.tsx
import { client } from "@/sanity/client";
import { setRequestLocale } from "next-intl/server";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { redirect } from "@/i18n/routing";

//TD: coalesce all values

const QUERY = `
*[_type == "caseStudyEntry" && slug.current == $slug][0]{
  title,
  slug,
  language,
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    language
  }
}
`;

type Translation = {
  title: string;
  slug: { current: string };
  language: string;
};

type Project = {
  title: string;
  slug: { current: string };
  language: string;
  _translations: Translation[];
};

type Props = {
  params: { slug: string; locale: string };
};

export default async function ProjectPage({ params: { slug, locale } }: Props) {
  // Set the locale for the page rendering
  setRequestLocale(locale);

  // Define options for ISR revalidation
  const OPTIONS = { next: { revalidate: 30 } };

  // Fetch the project data with the revalidate option
  const project: Project = await client.fetch(QUERY, { slug }, OPTIONS);

  // Determine the translation for the selected locale or fallback to the original language if unavailable
  const translation =
    project._translations.find((t) => t.language === locale) || project;

  // If the URL slug does not match the translation's slug, redirect
  if (translation.slug.current !== slug) {
    redirect({
      href: {
        pathname: "/realizacje/[slug]",
        params: { slug: translation.slug.current },
      },
      locale,
    });
  }

  return (
    <>
      <section className="mt-48">
        <MaxWidthWrapper>
          <h2>{translation.title}</h2>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
```

```js


const timelineData = [
  {
    year: 2012,
    content: [
      "Data założenia firmy (pierwotnie elementy ruchome wyposażenia kościołów: ramy, obrazy, ołtarze, rzeźba drewniana polichromowana)",
    ],
  },
  {
    year: 2015,
    content: ["Powstała pracownia konserwatorsko-restauratorska"],
  },
  {
    year: 2016,
    content: [
      "Konserwacja i restauracja neogotyckiego ołtarza w kościele Św. Jana Nepomucena w Biskupcu Pomorskim",
    ],
  },
  {
    year: 2017,
    content: [
      "Rozbudowa firmy w zakresie prac przy elewacjach i detalu architektonicznym",
      "Prace konserwatorsko-restauratorskie oraz odsłonięcie polichromii w kościele Niepokalanego Poczęcia w Żydowie",
    ],
  },
  {
    year: 2018,
    content: [
      "Malowanie/renowacja ścian kościoła Św. Mikołaja w Dąbrówce Malborskiej",
      "Prace konserwatorsko-restauratorskie ołtarza Św. Józefa w kościele Trójcy Przenajświętszej w Dzierzgoniu",
    ],
  },
  {
    year: 2019,
    content: ["Budowanie marki własnej jako podwykonawcy"],
  },
  {
    year: 2021,
    content: [
      "Prace nad elewacją Bazyliki Św. Mikołaja w Grudziądzu jako generalny wykonawca",
      "Prace konserwatorsko-restauratorskie w kościele Św. Wawrzyńca w Dobrzejowicach",
      "Nadzór konserwatorski w Kościele gotyckim w Chojnej (elewacja Kaplicy Mariackiej)",
      "Prace konserwatorsko-restauratorskie ołtarza głównego autorstwa M.J. Klahr'a w kościele w Różance",
    ],
  },
  {
    year: 2022,
    content: [
      "Konserwacja i restauracja ołtarza głównego z warsztatu Herman Hana w kościele Wniebowzięcia Matki Bożej i Św. Michała w Wieleniu",
      "Prace konserwatorskie elewacji transeptu w pocysterskim zespole klasztornym w Kołbaczu",
      "Konserwacja i restauracja murów obronnych Wzgórza Katedralnego we Fromborku",
      "Prace przy elewacji południowej kościoła pod wezwaniem Niepokalanego Poczęcia Najświętszej Maryi Panny w Grudziądzu",
    ],
  },
  {
    year: 2023,
    content: [
      "Konserwacja i restauracja gotyckich polichromii w Bazylice Św. Mikołaja w Grudziądzu",
      "Prace nad elewacją kamienicy w Chełmży",
      "Konserwacja i restauracja ołtarza głównego w kościele Wniebowzięcia Najświętszej Maryi Panny w Nowym Warpnie",
      "Prace przy ścianach ceglanych we wnętrzu kościoła pod wezwaniem Św. Mikołaja we Fromborku",
    ],
  },
  {
    year: 2024,
    content: [
      "Konserwacja murów obronnych wraz z odbudowaniem krużganków na Wzgórzu Katedralnym we Fromborku",
      "Wybudowanie nowoczesnego obiektu w kompleksie obiektów zabytkowych- Centrum edukacyjno-turystyczne na Wzgórzu Katedralnym we Fromborku z uwzględnieniem potrzeb osób niepełnosprawnych (pomnik historii)",
      "Rewitalizacja kapitularza we Fromborku w budynku kapituły z zachowaniem walorów historycznych",
      "Prace ciesielsko-dekarskie w kościele Wniebowzięcia Matki Bożej i Św. Michała w Wieleniu",
      "Prace konserwatorsko-restauratorskie w kościele Podwyższenia Krzyża Świętego w Rogowie",
    ],
    ],
  },
];

export default timelineData;



```
