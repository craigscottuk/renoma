import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqAccordion() {
  const faqItems = [
    {
      question: "Czym są badania konserwatorskie i dlaczego są ważne?",
      answer:
        "Badania konserwatorskie to proces oceny stanu zachowania zabytku, analizy materiałów oraz badania historyczne. Są kluczowe dla zapobiegania dalszym zniszczeniom i wyznaczania najlepszych metod restauracji.",
    },
    {
      question: "Jak długo trwa opracowanie programu prac konserwatorskich?",
      answer:
        "Czas opracowania programu prac konserwatorskich zależy od złożoności projektu i może trwać od kilku tygodni do kilku miesięcy.",
    },
    {
      question:
        "Czy Renoma zajmuje się konserwacją zabytków ruchomych, takich jak obrazy i rzeźby?",
      answer:
        "Tak, Renoma specjalizuje się w konserwacji różnych typów zabytków ruchomych, w tym obrazów i rzeźb.",
    },
    {
      question:
        "Czy możecie pomóc w pozyskiwaniu funduszy na prace konserwatorskie?",
      answer:
        "Tak, oferujemy wsparcie w procesie pozyskiwania funduszy na prace konserwatorskie, w tym pomoc w przygotowaniu wniosków o dotacje.",
    },
    {
      question: "Jakie rodzaje obiektów konserwujecie?",
      answer:
        "Konserwujemy szeroki zakres obiektów, w tym zabytki architektury, malarstwa, rzeźby, tkaniny, metale, ceramikę i wiele innych.",
    },
    {
      question: "Czy Renoma prowadzi nadzór nad pracami konserwatorskimi?",
      answer:
        "Tak, Renoma oferuje usługi nadzoru konserwatorskiego, zapewniając, że wszystkie prace są wykonywane zgodnie z najwyższymi standardami i wymogami konserwatorskimi.",
    },
    {
      question:
        "Czy możecie zająć się rewitalizacją obiektów zabytkowych, aby dostosować je do nowoczesnych potrzeb?",
      answer:
        "Tak, specjalizujemy się w rewitalizacji obiektów zabytkowych, łącząc zachowanie ich historycznej wartości z adaptacją do współczesnych funkcji i standardów.",
    },
    {
      question: "Jakie badania przeprowadzacie w RenomaLAB?",
      answer:
        "W RenomaLAB przeprowadzamy szereg specjalistycznych badań, w tym analizy materiałowe, badania stratygraficzne, analizy pigmentów i spoiw, oraz wiele innych zaawansowanych badań konserwatorskich.",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl bg-background p-6 text-foreground">
      <h2 className="mb-6 text-2xl font-bold">Często Zadawane Pytania</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
