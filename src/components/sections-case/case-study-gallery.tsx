import { BeforeAfter } from "./before-after"

const caseStudies = [
  {
    id: 1,
    title: "Renowacja elewacji",
    beforeImage: "/images/baszta-ferbera-before-1.jpg",
    afterImage: "/images/baszta-ferbera-after-1.jpg",
    beforeAlt: "Baszta Ferbera przed renowacją elewacji",
    afterAlt: "Baszta Ferbera po renowacji elewacji",
  },
  {
    id: 2,
    title: "Odbudowa dachu",
    beforeImage: "/images/baszta-ferbera-before-2.jpg",
    afterImage: "/images/baszta-ferbera-after-2.jpg",
    beforeAlt: "Baszta Ferbera przed odbudową dachu",
    afterAlt: "Baszta Ferbera po odbudowie dachu",
  },
  // Add more case studies as needed
]

export function CaseStudyGallery() {
  return (
    <div className="space-y-12 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Efekty prac konserwatorskich i restauratorskich</h2>
      {caseStudies.map((study) => (
        <BeforeAfter
          key={study.id}
          title={study.title}
          beforeImage={study.beforeImage}
          afterImage={study.afterImage}
          beforeAlt={study.beforeAlt}
          afterAlt={study.afterAlt}
        />
      ))}
    </div>
  )
}

