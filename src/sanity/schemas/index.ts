// cSpell:disable
import { type SchemaTypeDefinition } from "sanity";

// Import each schema file
import {
  dom,
  heroSection,
  aboutSectionHome,
  servicesSectionHome,
  faqSectionHome,
} from "./dom";
import { oNas, aboutHeaderSection, timelineSection } from "./oNas";
import { servicesListSection, servicesHeaderSection, uslugi } from "./uslugi";
import { wpisRealizacji } from "./wpisRealizacji";
import { realizacje, realizacjeHeaderSection } from "./realizacje";
import { renomaLab, renomaLabHeaderSection } from "./renomaLab";
import { learnWithUsHeaderSection, uczSieZNami } from "./uczSieZNami";
import {
  jobOfferSection,
  pracujZNami,
  workWithUsHeaderSection,
} from "./pracujZNami";
import {
  kontakt,
  kontaktHeaderSection,
  contactFormSection,
  contactDetailsSection,
} from "./kontakt";
import { ustawienia } from "./ustawienia";
import { privacy, privacyHeaderSection } from "./privacy";
import {
  basicText,
  portableTextWithHeadings,
  portableTextWithImage,
} from "./portableText";
import { sectionContent } from "./sectionContent";
import { time } from "console";

// Export schema configuration
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // dom
    dom,
    heroSection,
    aboutSectionHome,
    servicesSectionHome,
    faqSectionHome,

    // O nas
    oNas,
    aboutHeaderSection,
    timelineSection,

    // Usługi
    uslugi,
    servicesHeaderSection,
    servicesListSection,

    // Realizacje
    realizacje,
    realizacjeHeaderSection,

    // Wpis realizacji
    wpisRealizacji,

    // Renoma Lab
    renomaLab,
    renomaLabHeaderSection,

    // Ucz się z nami
    uczSieZNami,
    learnWithUsHeaderSection,

    // Pracuj z nami
    pracujZNami,
    workWithUsHeaderSection,
    jobOfferSection,

    // Kontakt
    kontakt,
    kontaktHeaderSection,
    contactFormSection,
    contactDetailsSection,

    ustawienia,

    privacy,
    privacyHeaderSection,

    // Portable Text
    basicText,
    portableTextWithImage,
    portableTextWithHeadings,

    sectionContent,
  ],
};
