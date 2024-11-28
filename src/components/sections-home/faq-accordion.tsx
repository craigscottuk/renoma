import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqAccordionProps {
  faqItems: {
    question: string;
    answer: string;
  }[];
}

export default function FaqAccordion({ faqItems }: FaqAccordionProps) {
  return (
    <div className="mx-auto w-full bg-black text-white">
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem
            className="border-white/40"
            key={index}
            value={`item-${index}`}
          >
            <AccordionTrigger className="text-2xl">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
