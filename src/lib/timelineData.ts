export type TimelineItem = {
  year: number;
  content: string[];
  images: string[];
};

const timelineData: TimelineItem[] = [
  {
    year: 2012,
    content: [
      "Data założenia firmy (pierwotnie elementy ruchome wyposażenia kościołów: ramy, obrazy, ołtarze, rzeźba drewniana polichromowana)",
    ],
    images: ["/test-image.png", "/test-image.png"],
  },
  {
    year: 2015,
    content: ["Powstała pracownia konserwatorsko-restauratorska"],
    images: ["/test-image.png"],
  },
  {
    year: 2016,
    content: [
      "Konserwacja i restauracja neogotyckiego ołtarza w kościele Św. Jana Nepomucena w Biskupcu Pomorskim",
    ],
    images: ["/test-image.png", "/test-image.png", "/test-image.png"],
  },
  {
    year: 2017,
    content: [
      "Rozbudowa firmy w zakresie prac przy elewacjach i detalu architektonicznym",
      "Prace konserwatorsko-restauratorskie oraz odsłonięcie polichromii w kościele Niepokalanego Poczęcia w Żydowie",
    ],
    images: ["/test-image.png"],
  },
  {
    year: 2018,
    content: [
      "Malowanie/renowacja ścian kościoła Św. Mikołaja w Dąbrówce Malborskiej",
      "Prace konserwatorsko-restauratorskie ołtarza Św. Józefa w kościele Trójcy Przenajświętszej w Dzierzgoniu",
    ],
    images: ["/test-image.png", "/test-image.png"],
  },
  {
    year: 2019,
    content: ["Budowanie marki własnej jako podwykonawcy"],
    images: ["/test-image.png"],
  },
  {
    year: 2021,
    content: [
      "Prace nad elewacją Bazyliki Św. Mikołaja w Grudziądzu jako generalny wykonawca",
      "Prace konserwatorsko-restauratorskie w kościele Św. Wawrzyńca w Dobrzejowicach",
      "Nadzór konserwatorski w Kościele gotyckim w Chojnej (elewacja Kaplicy Mariackiej)",
      "Prace konserwatorsko-restauratorskie ołtarza głównego autorstwa M.J. Klahr'a w kościele w Różance",
    ],
    images: ["/test-image.png", "/test-image.png"],
  },
  {
    year: 2022,
    content: [
      "Konserwacja i restauracja ołtarza głównego z warsztatu Herman Hana w kościele Wniebowzięcia Matki Bożej i Św. Michała w Wieleniu",
      "Prace konserwatorskie elewacji transeptu w pocysterskim zespole klasztornym w Kołbaczu",
      "Konserwacja i restauracja murów obronnych Wzgórza Katedralnego we Fromborku",
      "Prace przy elewacji południowej kościoła pod wezwaniem Niepokalanego Poczęcia Najświętszej Maryi Panny w Grudziądzu",
    ],
    images: ["/test-image.png", "/test-image.png", "/test-image.png"],
  },
  {
    year: 2023,
    content: [
      "Konserwacja i restauracja gotyckich polichromii w Bazylice Św. Mikołaja w Grudziądzu",
      "Prace nad elewacją kamienicy w Chełmży",
      "Konserwacja i restauracja ołtarza głównego w kościele Wniebowzięcia Najświętszej Maryi Panny w Nowym Warpnie",
      "Prace przy ścianach ceglanych we wnętrzu kościoła pod wezwaniem Św. Mikołaja we Fromborku",
    ],
    images: ["/test-image.png", "/test-image.png"],
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
    images: [
      "/test-image.png",
      "/test-image.png",
      "/test-image.png",
      "/test-image.png",
    ],
  },
];

export default timelineData;
