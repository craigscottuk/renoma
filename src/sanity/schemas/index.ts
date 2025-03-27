// cSpell:disable
import { type SchemaTypeDefinition } from "sanity";
// Import schema types
import {
  home,
  heroSection,
  aboutSection,
  servicesSection,
  cooperationSection,
  homePageMeta,
} from "./home";
import {
  about,
  aboutHeader,
  ourHistory,
  aboutUs,
  aboutPageMeta,
} from "./about";
import {
  services,
  servicesHeader,
  serviceItem,
  servicesGroup,
  servicesPageMeta,
} from "./services";
import { caseStudyEntry } from "./project-entry";
import { projectsHeader, projects, projectsPageMeta } from "./projects";
import {
  // aboutLab,
  labOffer,
  renomaLab,
  renomaLabHeader,
  renomaLabPageMeta,
} from "./renomaLab";
import {
  learnWithUsHeader,
  learnWithUs,
  whatWeOffer,
  whoWeAreLookingFor,
  learnWithUsPageMeta,
} from "./learn-with-us";
import {
  jobOffers,
  workWithUs,
  workWithUsHeader,
  workWithUsPageMeta,
} from "./work-with-us";
import {
  contact,
  contactHeader,
  contactForm,
  contactDetails,
  contactPageMeta,
} from "./contact";
import {
  privacy,
  privacyHeader,
  privacyContent,
  privacyPageMeta,
} from "./privacy";
import {
  basicText,
  portableTextWithHeadings,
  portableTextWithImage,
} from "./portableText";
import { sectionContent } from "./sectionContent";
import { cta, ctaContent } from "./cta";
import { socialMedia, socialMediaLinks } from "./socialMedia";
import { faq, faqHeader, faqList, faqPageMeta } from "./faq";

// Export schema configuration
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // home
    home,
    heroSection,
    aboutSection,
    servicesSection,
    cooperationSection,
    homePageMeta,

    // O nas
    about,
    aboutHeader,
    aboutUs,
    ourHistory,
    aboutPageMeta,

    // Usługi
    services,
    servicesHeader,
    servicesGroup,
    serviceItem,
    servicesPageMeta,

    // Realizacje
    projects,
    projectsHeader,
    projectsPageMeta,

    // Wpis realizacji
    caseStudyEntry,

    // Renoma Lab
    renomaLab,
    renomaLabHeader,
    // aboutLab,
    labOffer,
    renomaLabPageMeta,

    // Ucz się z nami
    learnWithUs,
    learnWithUsHeader,
    whatWeOffer,
    whoWeAreLookingFor,
    learnWithUsPageMeta,

    // Pracuj z nami
    workWithUs,
    workWithUsHeader,
    jobOffers,
    workWithUsPageMeta,

    // FAQ
    faq,
    faqHeader,
    faqList,
    faqPageMeta,

    // Kontakt
    contact,
    contactHeader,
    contactForm,
    contactDetails,
    contactPageMeta,

    // CTA
    cta,
    ctaContent,

    // Polityka prywatności
    privacy,
    privacyHeader,

    privacyContent,
    privacyPageMeta,

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
