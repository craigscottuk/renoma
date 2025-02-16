// cSpell:disable
import { type SchemaTypeDefinition } from "sanity";
// Import schema types
import {
  home,
  heroSection,
  aboutSectionHome,
  servicesSectionHome,
  logoSectionHome,
  homePageSeo,
} from "./home";
import {
  about,
  aboutUsHeader,
  ourHistory,
  aboutUs,
  aboutPageSeo,
} from "./about";
import {
  servicesList,
  servicesHeader,
  services,
  servicesGroup,
  servicesPageSeo,
} from "./services";
import { caseStudyEntry } from "./case-study-entry";
import {
  caseStudyHeader,
  caseStudies,
  caseStudiesPageSeo,
} from "./case-studies";
import {
  aboutLab,
  labOffer,
  renomaLab,
  renomaLabHeader,
  renomaLabPageSeo,
} from "./renomaLab";
import {
  learnWithUsHeader,
  learnWithUs,
  whatWeOffer,
  whoWeAreLookingFor,
  learnWithUsPageSeo,
} from "./learn-with-us";
import {
  jobOffers,
  workWithUs,
  workWithUsHeader,
  workWithUsPageSeo,
} from "./work-with-us";
import {
  contact,
  contactHeader,
  contactForm,
  contactDetails,
  contactPageSeo,
} from "./contact";
import { settings } from "./settings";
import { privacy, privacyHeader, privacyText, privacyPageSeo } from "./privacy";
import {
  basicText,
  portableTextWithHeadings,
  portableTextWithImage,
} from "./portableText";
import { sectionContent } from "./sectionContent";
import { cta, ctaContent } from "./cta";
import { socialMedia, socialMediaLinks } from "./socialMedia";
import { faq, faqHeader, faqList, faqPageSeo } from "./faq";

// Export schema configuration
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // home
    home,
    heroSection,
    aboutSectionHome,
    servicesSectionHome,
    logoSectionHome,
    homePageSeo,

    // O nas
    about,
    aboutUsHeader,
    aboutUs,
    ourHistory,
    aboutPageSeo,

    // Usługi
    services,
    servicesHeader,
    servicesGroup,
    servicesList,
    servicesPageSeo,

    // Realizacje
    caseStudies,
    caseStudyHeader,
    caseStudiesPageSeo,

    // Wpis realizacji
    caseStudyEntry,

    // Renoma Lab
    renomaLab,
    renomaLabHeader,
    aboutLab,
    labOffer,
    renomaLabPageSeo,

    // Ucz się z nami
    learnWithUs,
    learnWithUsHeader,
    whatWeOffer,
    whoWeAreLookingFor,
    learnWithUsPageSeo,

    // Pracuj z nami
    workWithUs,
    workWithUsHeader,
    jobOffers,
    workWithUsPageSeo,

    // FAQ
    faq,
    faqHeader,
    faqList,
    faqPageSeo,

    // Kontakt
    contact,
    contactHeader,
    contactForm,
    contactDetails,
    contactPageSeo,

    // CTA
    cta,
    ctaContent,

    // Polityka prywatności
    privacy,
    privacyHeader,
    privacyText,
    privacyPageSeo,

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
