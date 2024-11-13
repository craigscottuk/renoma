import MaxWidthWrapper from "@/components/max-width-wrapper";

type Translation = {
  title: string;
  slug: { current: string };
  language: string;
};

const messages: { [key: string]: string } = {
  en: "Sorry, this document hasn't been translated into {locale} yet. You can read it in {languages}.",
  de: "Entschuldigung, dieses Dokument wurde noch nicht in {locale} übersetzt. Sie können es in {languages} lesen.",
  pl: "Przepraszamy, ten dokument nie został jeszcze przetłumaczony na {locale}. Możesz go przeczytać w {languages}.",
  // Add more translations as needed
};

const languageNames: { [key: string]: string } = {
  en: "English",
  de: "Deutsch",
  pl: "Polski",
  // Add more language names as needed
};

function getMessage(locale: string, translations: Translation[]): string {
  const messageTemplate = messages[locale] || messages.en;
  const languages = translations
    .map(
      (t) =>
        `<a href="/${t.language}/realizacje/${t.slug.current}">${languageNames[t.language] || t.language}</a>`,
    )
    .join(" or ");
  return messageTemplate
    .replace("{locale}", languageNames[locale] || locale)
    .replace("{languages}", languages);
}

export default function NoTranslationMessage({
  locale,
  translations,
}: {
  locale: string;
  translations: Translation[];
}) {
  const message = getMessage(locale, translations);

  return (
    <section className="mt-48">
      <MaxWidthWrapper>
        <h2 dangerouslySetInnerHTML={{ __html: message }} />
      </MaxWidthWrapper>
    </section>
  );
}
