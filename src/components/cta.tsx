export default function CTA() {
  return (
    <section
      className="relative flex min-h-[400px] items-center px-8 py-16"
      style={{
        background: `linear-gradient(90deg, 
          #CD940E 0%,
          #D2982D 27%,
          #E8BD69 59%,
          #B57B21 87%
        )`,
      }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="items-center lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h1 className="mb-8 text-5xl font-light text-white md:text-6xl">
              Skonsultuj Swój Projekt
            </h1>
            <p className="mb-12 text-lg leading-relaxed text-white/90 lg:mb-0">
              Nasza firma oferuje kompleksową konsultację dla projektów
              renowacyjnych i konserwatorskich. Skontaktuj się z nami, aby
              omówić swoje potrzeby i uzyskać spersonalizowane wsparcie na
              każdym etapie realizacji projektu.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <button className="group flex items-center gap-2 border border-white/20 px-6 py-3 text-white transition-all hover:border-white/40">
              <span>ZACZNIJ SWÓJ PROJEKT</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
