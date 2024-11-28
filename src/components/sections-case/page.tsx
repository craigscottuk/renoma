import { CaseStudyGallery } from "@/components/case-study-gallery"

export default function CaseStudiesPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Studia przypadków - Baszta Ferbera</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Efekty prac konserwatorskich i restauratorskich oraz budowlanych</h2>
        <p className="mb-4">
          Realizacja projektu konserwatorskiego skutecznie ustabilizowała Basztę Ferbera. W wyniku przeprowadzonych prac przywrócono integralność struktury zabytku zachowując jednocześnie jego historyczny charakter. Dzięki starannej selekcji materiałów i technik renowacyjnych budynek odzyskał dawny wygląd oraz parametry techniczne umożliwiające jego użytkowanie.
        </p>
        <CaseStudyGallery />
      </section>
    </div>
  )
}

