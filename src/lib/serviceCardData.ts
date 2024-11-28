export interface ServiceItem {
  title: string;
  content: string;
  href: string;
}

export interface ServiceCard {
  title: string;
  items: ServiceItem[];
  moreLink: string;
}

export const services: ServiceCard[] = [
  {
    title: "Badania, Planowanie i Ekspertyzy",
    items: [
      {
        title: "Badania konserwatorskie i ekspertyzy",
        content:
          "Przeprowadzamy kompleksowe badania wspierające ochronę materialnego dziedzictwa.",
        href: "/services/research",
      },
      {
        title: "Programy prac konserwatorskich",
        content:
          "Tworzymy programy konserwatorskie i opracowujemy plany ich prawidłowej realizacji w zgodzie z najwyższymi standardami.",
        href: "/services/programs",
      },
      {
        title: "RenomaLAB – laboratorium konserwatorskie",
        content:
          "Nasze laboratorium specjalizuje się m. in. w badaniach konserwatorskich materiałów budowlanych, warstw barwnych oraz analizie wilgotności i zasolenia.",
        href: "/services/lab",
      },
    ],
    moreLink: "/services/research-planning",
  },
  {
    title: "Realizacja i Nadzór",
    items: [
      {
        title: "Nadzór konserwatorski, doradztwo i konsultacje",
        content:
          "Zapewniamy nadzór na miejscu i doradztwo eksperckie, aby prace konserwatorskie i restauratorskie prowadzone były zgodnie z najwyższymi standardami oraz założeniami programów konserwatorskich.",
        href: "/services/supervision",
      },
      {
        title: "Prace konserwatorskie i restauratorskie",
        content:
          "Prowadzimy prace konserwatorskie i restauratorskie przy obiektach architektonicznych i zabytkach ruchomych przywracając im walory estetyczne oraz użytkowe z poszanowaniem substancji oryginalnej.",
        href: "/services/conservation",
      },
      {
        title: "Prace budowlane w obiektach zabytkowych",
        content:
          "Przeprowadzamy kompleksowe prace budowlane poprawiające stan techniczny zabytkowych budynków przywracając im pierwotne funkcje lub adaptując je do nowych.",
        href: "/services/construction",
      },
    ],
    moreLink: "/services/implementation",
  },
  {
    title: "Rewitalizacja i Wsparcie",
    items: [
      {
        title: "Rewaloryzacja obiektów zabytkowych",
        content:
          "Modernizujemy i adaptujemy zabytkowe budynki z maksymalnym zachowaniem ich wartości dostosowując je do współczesnych potrzeb uwzględniając aspekty techniczne oraz kulturowe.",
        href: "/services/revitalization",
      },
      {
        title: "Wsparcie administracyjne i pozyskiwanie dotacji",
        content:
          "Pomagamy w pozyskiwaniu pozwoleń i funduszy oraz zarządzaniu dotacjami na projekty konserwatorskie i restauratorskie zapewniając zgodność z wymogami formalnymi.",
        href: "/services/support",
      },
    ],
    moreLink: "/services/revitalization-support",
  },
];
