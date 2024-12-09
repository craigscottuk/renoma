// cSpell:disable
import { type SchemaTypeDefinition } from "sanity";
// Import schema types
import {
  home,
  heroSection,
  aboutSectionHome,
  servicesSectionHome,
  faqSectionHome,
} from "./home";
import { about, aboutUsHeader, ourHistory, aboutUs } from "./about";
import { servicesList, servicesHeader, services } from "./services";
import { caseStudyEntry } from "./case-study-entry";
import { caseStudyHeader, caseStudies } from "./case-studies";
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
import { settings } from "./settings";
import { privacy, privacyHeader, privacyText } from "./privacy";
import {
  basicText,
  portableTextWithHeadings,
  portableTextWithImage,
} from "./portableText";
import { sectionContent } from "./sectionContent";

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
    ourHistory,

    // Usługi
    services,
    servicesHeader,
    servicesList,

    // Realizacje
    caseStudies,
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

    privacy,
    privacyHeader,
    privacyText,

    settings,

    // Portable Text
    basicText,
    portableTextWithImage,
    portableTextWithHeadings,

    // Objects
    sectionContent,
  ],
};
