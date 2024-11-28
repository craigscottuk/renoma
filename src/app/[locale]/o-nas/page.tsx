import { setRequestLocale } from "next-intl/server";
import PageHeaderSection from "@/components/page-header-section";
import { client } from "@/sanity/client";
import { PortableTextBlock } from "next-sanity";
import SectionTitle from "@/components/section-title";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Timeline from "@/components/sections-about/timeline3";

const QUERY = `
{
 "aboutHeaderSection": *[_type == "aboutHeaderSection"][0]{
    "sectionLabel": coalesce(sectionLabel[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionTitle": coalesce(sectionTitle[_key == $locale][0].value, "Brak tłumaczenia"),
    "sectionDescription": coalesce(sectionDescription[_key == $locale][0].value, "Brak tłumaczenia"),
    "headerImage": headerImage,
    "headerImageAlt": coalesce(headerImage.alt[_key == $locale][0].value, "Brak tłumaczenia")
  },

  "timeline": *[_type == "timelineSection"][0].timeline[]{
    "year": year,
    "content": select(
      defined(content[$locale]) => content[$locale],
      "Brak tłumaczenia"
    ),
    
    "images": images[]{
      "src": src.asset->url,
      "caption": caption
    }
  }
}
`;

const OPTIONS = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

interface Content {
  aboutHeaderSection: {
    sectionLabel: string;
    sectionTitle: string;
    sectionDescription: string;
    headerImage?: string;
    headerImageAlt?: string;
  };
  timeline: TimelineItem[];
}

interface TimelineItem {
  year: number;
  content: PortableTextBlock[];
  images?: TimelineImage[];
}

interface TimelineImage {
  src: string;
  caption: string;
}

export default async function ONas({ params: { locale } }: Props) {
  // Set the locale for static generation
  setRequestLocale(locale);

  // Fetch localized content from Sanity using locale from params
  const content = await client.fetch<Content>(QUERY, { locale }, OPTIONS);

  const { aboutHeaderSection, timeline } = content;

  // console.log(content);

  return (
    <>
      <PageHeaderSection
        sectionLabel={aboutHeaderSection.sectionLabel}
        sectionTitle={aboutHeaderSection.sectionTitle}
        sectionDescription={aboutHeaderSection.sectionDescription}
        headerImage={aboutHeaderSection.headerImage}
        headerImageAlt={aboutHeaderSection.headerImageAlt}
      />

      <AboutSection />

      <section className="mt-24">
        <MaxWidthWrapper>
          <SectionTitle
            title="Nasza historia i doświadczenie"
            as="h2"
            motionPreset="blur-left"
            textColor="black"
            textAlign="center"
          />

          <div className="mt-10 px-4 py-20">
            <Timeline events={timeline} />
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}

export function AboutSection() {
  return (
    <section className="mx-auto bg-black py-16 text-white/90 md:py-32">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,2fr] lg:gap-24">
          <h2 className="text-5xl font-light lg:text-6xl">O nas</h2>

          <div className="columns-1 gap-10 space-y-7 hyphens-auto text-[1.1rem] md:columns-2">
            <p className="text-balance">
              Firma Renoma, założona w 2012 roku, rozpoczęła swoją działalność
              jako małe przedsiębiorstwo specjalizujące się w renowacji
              ruchomego wyposażenia kościołów, takich jak ramy, obrazy, ołtarze
              oraz polichromowane rzeźby drewniane. Z biegiem lat rozwijaliśmy
              się, stając się wiodącą firmą w dziedzinie konserwacji i
              restauracji, poszerzając swoją wiedzę i umiejętności o detale
              architektoniczne, prace elewacyjne oraz kompleksowe projekty
              ochrony dziedzictwa historycznego.
            </p>

            <p className="">
              W Renomie łączymy głęboką wiedzę, dbałość o najwyższą jakość,
              rygorystyczne przestrzeganie terminów oraz niezłomne zaangażowanie
              w każdym realizowanym projekcie. Nasze usługi obejmują wszystko,
              od szczegółowych badań konserwatorskich i precyzyjnego planowania
              restauracji, po nadzór konserwatorski i prace techniczne.
              Specjalizujemy się w rewitalizacji obiektów zabytkowych,
              zapewniając ich stabilność oraz estetyczną integralność, z
              poszanowaniem ich historycznej wartości.
            </p>

            <p className="">
              Nasze wartości—Wiedza, Jakość, Terminy, i Zaangażowanie—kierują
              nami w procesie ochrony dziedzictwa kulturowego przeszłości,
              jednocześnie wprowadzając nowoczesne techniki, które spełniają
              współczesne potrzeby. Niezależnie od tego, czy zajmujemy się
              staranną restauracją kilkusetletniego ołtarza, czy rewitalizacją
              zabytkowego budynku, podchodzimy do każdego projektu z takim samym
              poziomem precyzji i troski.
            </p>

            <p className="">
              Zespół naszych ekspertów oraz nowoczesne laboratorium Renoma są
              gotowe sprostać najbardziej skomplikowanym wyzwaniom
              konserwatorskim. Od analizy materiałowej po wdrażanie
              zaawansowanych technik restauracyjnych, dbamy o to, aby każdy
              projekt był realizowany zgodnie z najwyższymi standardami,
              zabezpieczając inwestycje naszych klientów w dziedzictwo
              kulturowe.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
