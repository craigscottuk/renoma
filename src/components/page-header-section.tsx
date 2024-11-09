// cSpell:disable
import Image from "next/image";

export default function PageHeaderSection(
  etykietaSekcji,
  tytulSekcji,
  opisSekcji,
  przyciskSekcji,
) {
  return (
    <section className="relative mt-24 bg-white py-12 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-xl">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-wider text-muted-foreground">
                KONTAKT
              </p>
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                Skontaktuj się z nami
              </h1>
              <p className="text-lg text-muted-foreground">
                W razie pytań lub potrzeby uzyskania pomocy, Renoma pozostaje do
                pełnej dyspozycji. Chętnie udzielimy wszelkich informacji.
                Zachęcamy do kontaktu.
              </p>
            </div>
          </div>
          <div className="relative z-10 h-[680px] w-[560px] lg:absolute lg:right-[5%] lg:top-0">
            <div className="relative mt-24 h-full w-full">
              <Image
                src="/test-image.png"
                alt="Building exterior with technical equipment"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
