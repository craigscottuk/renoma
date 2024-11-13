// cSpell:disable
import { type SchemaTypeDefinition } from "sanity";

// Import each schema file
import { dom, heroSection, aboutSectionHome, servicesSectionHome } from "./dom";
import { oNas, aboutHeaderSection } from "./oNas";
import { servicesHeaderSection, uslugi } from "./uslugi";
import { wpisRealizacji } from "./wpisRealizacji";
import { realizacje, realizacjeHeaderSection } from "./realizacje";
import { renomaLab, renomaLabHeaderSection } from "./renomaLab";
import { learnWithUsHeaderSection, uczSieZNami } from "./uczSieZNami";
import { pracujZNami, workWithUsHeaderSection } from "./pracujZNami";
import {
  kontakt,
  kontaktHeaderSection,
  contactFormSection,
  contactDetailsSection,
} from "./kontakt";
import { ustawienia } from "./ustawienia";
import { privacy, privacyHeaderSection } from "./privacy";
import { portableText } from "./portableText";

// Export schema configuration
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // dom
    dom,
    heroSection,
    aboutSectionHome,
    servicesSectionHome,

    // O nas
    oNas,
    aboutHeaderSection,

    // Usługi
    uslugi,
    servicesHeaderSection,

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

    // Kontakt
    kontakt,
    kontaktHeaderSection,
    contactFormSection,
    contactDetailsSection,

    ustawienia,

    privacy,
    privacyHeaderSection,
    portableText,
  ],
};
