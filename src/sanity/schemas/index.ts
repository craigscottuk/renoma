// cSpell:disable
import { type SchemaTypeDefinition } from "sanity";

// Import each schema file
import {
  home,
  heroSection,
  aboutSectionHome,
  servicesSectionHome,
  faqSectionHome,
} from "./home";
import { about, aboutUsHeader, timelineSection, aboutUs } from "./about";
import { servicesList, servicesHeader, uslugi } from "./uslugi";
import { caseStudyEntry } from "./case-study-entry";
import { realizacje, caseStudyHeader } from "./case-studies";
import { renomaLab, renomaLabHeader } from "./renomaLab";
import {
  learnWithUsHeader,
  learnWithUs,
  whatWeOffer,
  whoWeAreLookingFor,
} from "./learn-with-us";
import { jobOffers, workWithUs, workWithUsHeader } from "./work-with-us";
import {
  contact,
  contactHeaderSection,
  contactForm,
  contactDetails,
} from "./contact";
import { ustawienia } from "./ustawienia";
import { privacy, privacyHeader } from "./privacy";
import {
  basicText,
  portableTextWithHeadings,
  portableTextWithImage,
} from "./portableText";
import { sectionContent } from "./sectionContent";
import { time } from "console";
import WhatWeOffer from "@/components/sections-learn-with-us/what-we-offer";

// Export schema configuration
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // home
    home,
    heroSection,
    aboutSectionHome,
    servicesSectionHome,
    faqSectionHome,

    // O nas
    about,
    aboutUsHeader,
    aboutUs,
    timelineSection,

    // Usługi
    uslugi,
    servicesHeader,
    servicesList,

    // Realizacje
    realizacje,
    caseStudyHeader,

    // Wpis realizacji
    caseStudyEntry,

    // Renoma Lab
    renomaLab,
    renomaLabHeader,

    // Ucz się z nami
    learnWithUs,
    learnWithUsHeader,
    whatWeOffer,
    whoWeAreLookingFor,

    // Pracuj z nami
    workWithUs,
    workWithUsHeader,
    jobOffers,

    // Kontakt
    contact,
    contactHeaderSection,
    contactForm,
    contactDetails,

    ustawienia,

    privacy,
    privacyHeader,

    // Portable Text
    basicText,
    portableTextWithImage,
    portableTextWithHeadings,

    sectionContent,
  ],
};
