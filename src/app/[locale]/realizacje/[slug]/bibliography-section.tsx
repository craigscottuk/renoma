// cSpell:disable
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Separator } from "@/components/ui/separator";
// import { PortableText } from "@portabletext/react";
// import { portableTextComponents } from "@/lib/portableTextComponents";

interface ComparisonSectionProps {
  title: string;
}

export default function ComparisonSection({ title }: ComparisonSectionProps) {
  return (
    <section className="mb-16">
      <MaxWidthWrapper>
        <Separator className="mb-16" />

        <h2 className="mb-8 w-full max-w-[43rem] font-bolder text-[2rem] text-zinc-800">
          {title}
        </h2>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div className="flex flex-col lg:w-4/5 lg:items-start">
          {/* <PortableText
            value={section.text || []}
            components={portableTextComponents}
          /> */}
          <ul className="max-w-5xl list-disc text-pretty pl-5 text-[1.1rem]">
            <li className="mb-2">
              Ferdinand von Quast, <em>Denkmale der Baukunst im Ermland</em>,
              Berlin 1852.
            </li>
            <li className="mb-2">
              Adolf Bötticher,{" "}
              <em>Die Bau- und Kunstdenkmäler der Provinz Ostpreußen</em>, H. 4,{" "}
              <em>Ermland</em> (1894).
            </li>
            <li className="mb-2">
              K.S., <em>Frombork - mury obronne wzgórza katedralnego</em>,{" "}
              <em>Ochrona Zabytków</em>, t. 16, z. 2 (1963).
            </li>
            <li className="mb-2">
              Jerzy Kruppe,{" "}
              <em>
                Problematyka i wyniki dotychczasowych badań archeologicznych na
                Wzgórzu Katedralnym
              </em>
              , <em>Komentarze Fromborskie</em>, nr 2 (1968), s. 57–84.
            </li>
            <li className="mb-2">
              Lucjan Czubiel, Tadeusz Domagała,{" "}
              <em>Zabytkowe ośrodki miejskie Warmii i Mazur</em>, Olsztyn 1969.
            </li>
            <li className="mb-2">
              Tadeusz Zagrodzki,{" "}
              <em>Warownia we Fromborku jako katedralne założenie obronne</em>,{" "}
              <em>Kwartalnik Architektury i Urbanistyki</em>, t. 3–4 (1969), s.
              181–267.
            </li>
            <li className="mb-2">
              Tadeusz Piaskowski, Jerzy Sikorski, <em>Frombork</em>, Olsztyn
              1971.
            </li>
            <li className="mb-2">
              <em>Katalog Zabytków Sztuki w Polsce, Seria Nowa</em>, red. Marian
              Arszyński, Marian Kutzner, t. 2, <em>Województwo elbląskie</em>,
              z. 1, <em>Braniewo, Frombork, Orneta i Okolice</em>, Warszawa
              1980.
            </li>
            <li className="mb-2">
              Tadeusz Piaskowski, Henryk Szkop, <em>Zabytki Fromborka</em>,
              Frombork 2003.
            </li>
            <li className="mb-2">
              Zbigniew Czernik,{" "}
              <em>
                Wzgórze katedralne we Fromborku. Dzieje architektury, jej
                przemiany i funkcje XIII–XX w.
              </em>
              , Olsztyn 2020.
            </li>
          </ul>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
