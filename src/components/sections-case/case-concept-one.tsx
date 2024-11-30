import React from "react";
import MaxWidthWrapper from "../max-width-wrapper";
import ProjectDetails from "./details";
import CaseStudyHeaderSection from "./case-study-header-section";
import ProjectDetailsSection from "./details";

export default function CaseContentOne() {
  return (
    <>
      {/* Header */}

      <CaseStudyHeaderSection
        sectionLabel={`Studium Przypadku`}
        sectionTitle={`Konserwacja Baszty Ferbera`}
        sectionDescription={`Wybudowana w pierwszej połowie XVI wieku basteja (Baszta Ferbera) stanowi ważny element wschodniego odcinka obwarowań Wzgórza Katedralnego we Fromborku. Projekt konserwatorski przewidywał między innymi stabilizację konstrukcji budynku oraz usunięcie przyczyn osłabienia i destrukcji materii zabytkowej. W ciągu 12 miesięcy zrealizowano wszystkie cele i założenia projektu zapobiegając dalszemu niszczeniu budowli, utrwalając jej wartość historyczną i doprowadzając do stanu technicznego umożliwiającego jej użytkowanie.`}
        headerImage={"/basteja.jpg"}
      />

      <ProjectDetailsSection />

      {/* Specs */}

      {/* Body */}
    </>
  );
}
