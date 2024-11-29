import React from "react";
import MaxWidthWrapper from "../max-width-wrapper";
import ProjectDetails from "./details";
import SectionTitle from "../section-title";

export default function CaseContentOne() {
  return (
    <>
      {/* Header */}
      <div
        className="mt-24 h-96 bg-cover bg-center"
        style={{ backgroundImage: 'url("/basteja.jpg")' }}
      ></div>

      <section className="mx-auto bg-gray-100 py-12 lg:py-24">
        <MaxWidthWrapper>
          <SectionTitle title="Konserwacja Baszty Ferbera" />
          <ProjectDetails />
        </MaxWidthWrapper>
      </section>
      {/* Specs */}

      {/* Body */}
    </>
  );
}
