// cSpell:disable
import { type SchemaTypeDefinition } from "sanity";

// Import each schema file
import { dom, heroSection, aboutSectionHome, servicesSectionHome } from "./dom";
import { oNas, aboutHeaderSection } from "./oNas";
import { uslugi } from "./uslugi";
import { realizacje } from "./realizacje";
import { renomaLab } from "./renomaLab";
import { uczSieZNami } from "./uczSieZNami";
import { pracujZNami } from "./pracujZNami";
import {
  kontakt,
  kontaktHeaderSectionTest,
  kontaktHeaderSection,
  contactFormSection,
  contactDetailsSection,
} from "./kontakt";
import { ustawienia } from "./ustawienia";
import { headerSection } from "./objects/headerSection";

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

    uslugi,
    realizacje,
    renomaLab,
    uczSieZNami,
    pracujZNami,

    // Kontakt
    kontakt,
    kontaktHeaderSectionTest,
    kontaktHeaderSection,
    contactFormSection,
    contactDetailsSection,

    ustawienia,

    //Objects
    headerSection,
  ],
};
