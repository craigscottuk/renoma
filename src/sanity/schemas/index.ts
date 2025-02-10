// cSpell:disable
import { type SchemaTypeDefinition } from "sanity";
// Import schema types
import {
  home,
  heroSection,
  aboutSectionHome,
  servicesSectionHome,
  logoSectionHome,
} from "./home";
import {
  about,
  aboutUsHeader,
  ourHistory,
  aboutUs,
  aboutPageMetadata,
} from "./about";
import {
  servicesList,
  servicesHeader,
  services,
  servicesGroup,
} from "./services";
import { caseStudyEntry } from "./case-study-entry";
import { caseStudyHeader, caseStudies } from "./case-studies";
import { aboutLab, labOffer, renomaLab, renomaLabHeader } from "./renomaLab";
import {
  learnWithUsHeader,
  learnWithUs,
  whatWeOffer,
  whoWeAreLookingFor,
} from "./learn-with-us";
import { jobOffers, workWithUs, workWithUsHeader } from "./work-with-us";
import { contact, contactHeader, contactForm, contactDetails } from "./contact";
import { settings } from "./settings";
import { privacy, privacyHeader, privacyText } from "./privacy";
import {
  basicText,
  portableTextWithHeadings,
  portableTextWithImage,
} from "./portableText";
import { sectionContent } from "./sectionContent";
import { cta, ctaContent } from "./cta";
import { socialMedia, socialMediaLinks } from "./socialMedia";
import { faq, faqHeader, faqList } from "./faq";

// Export schema configuration
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // home
    home,
    heroSection,
    aboutSectionHome,
    servicesSectionHome,
    logoSectionHome,

    // O nas
    about,
    aboutUsHeader,
    aboutUs,
    ourHistory,
    aboutPageMetadata,

    // Usługi
    services,
    servicesHeader,
    servicesGroup,
    servicesList,

    // Realizacje
    caseStudies,
    caseStudyHeader,

    // Wpis realizacji
    caseStudyEntry,

    // Renoma Lab
    renomaLab,
    renomaLabHeader,
    aboutLab,
    labOffer,

    // Ucz się z nami
    learnWithUs,
    learnWithUsHeader,
    whatWeOffer,
    whoWeAreLookingFor,

    // Pracuj z nami
    workWithUs,
    workWithUsHeader,
    jobOffers,

    // FAQ
    faq,
    faqHeader,
    faqList,

    // Kontakt
    contact,
    contactHeader,
    contactForm,
    contactDetails,

    // CTA

    cta,
    ctaContent,

    // Polityka prywatności
    privacy,
    privacyHeader,
    privacyText,

    // Ustawienia
    settings,

    // Social Media
    socialMedia,
    socialMediaLinks,

    // Portable Text
    basicText,
    portableTextWithImage,
    portableTextWithHeadings,

    // Objects
    sectionContent,
  ],
};
