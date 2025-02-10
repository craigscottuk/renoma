"use client";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Mail, MapPin, Phone, FileText } from "lucide-react";
import ContactForm from "@/app/[locale]/kontakt/contact-form";
import AnimatedLink from "@/components/animated-link";
import { FadeInSection } from "@/components/fade-in-section";

type ContactDetailsSectionProps = {
  contactDetails: {
    numerTelefonu: string;
    adresEmail: string;
    adresBiuraLineOne: string;
    adresBiuraLineTwo: string;
    nazwaFirmyOne: string;
    nazwaFirmyTwo: string;
    adresFakturLineOne: string;
    adresFakturLineTwo: string;
    numerNipOne: string;
    numerRegonOne: string;
    numerNipTwo: string;
    numerRegonTwo: string;
  };
  contactForm: {
    contactFormSubjects: string[];
  };
  paddingY?: string;
};

const paragraphClass = "text-zinc-900 text-[1rem] leading-relaxed";
const headingClass =
  "mb-3 font-regular text-[1.5rem] leading-tight tracking-[-0.015em] text-zinc-800";

export default function ContactFormAndDetails({
  contactDetails,
  contactForm,
  paddingY = "py-16 md:py-44",
}: ContactDetailsSectionProps) {
  const t = useTranslations("kontakt-page");

  return (
    <section className={clsx("bg-zinc-200", paddingY)}>
      <MaxWidthWrapper>
        <div className="grid gap-24 lg:grid-cols-2">
          {/* Contact Information in 2x2 Grid */}
          <FadeInSection className="grid grid-cols-2 py-10">
            {/* Phone Section */}
            <div className="bg-zinc flex max-w-60 items-start gap-4">
              <Phone className="h-6 w-6" aria-hidden="true" />
              <div>
                <h3 className={headingClass}>{t("phone")}</h3>
                <p className={paragraphClass}>{contactDetails.numerTelefonu}</p>
              </div>
            </div>

            {/* Email Section */}
            <div className="flex max-w-60 items-start gap-4">
              <Mail className="h-6 w-6" aria-hidden="true" />
              <div>
                <h3 className={headingClass}>{t("email")}</h3>
                <p className={paragraphClass}>
                  <a
                    href={`mailto:${contactDetails.adresEmail}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {contactDetails.adresEmail}
                  </a>
                </p>
              </div>
            </div>

            {/* Address Section */}
            <div className="flex max-w-60 items-start gap-4">
              <MapPin className="h-7 w-7" aria-hidden="true" />
              <div>
                <h3 className={headingClass}>{t("office")}</h3>
                <p className={paragraphClass}>
                  {contactDetails.adresBiuraLineOne}
                </p>
                <p className={paragraphClass}>
                  {contactDetails.adresBiuraLineTwo}
                </p>
                <AnimatedLink
                  href="https://maps.app.goo.gl/jeWnz8HYg3yHwUdE7"
                  external={true}
                  className="mt-4 text-base"
                >
                  Zobacz na mapie
                </AnimatedLink>
              </div>
            </div>

            {/* Invoice Information Section */}
            <div className="flex max-w-60 flex-col items-start gap-4">
              <FileText className="max-h-10 max-w-10" aria-hidden="true" />
              <div>
                <h3 className={headingClass}>{t("invoice-info")}</h3>
                <p className={paragraphClass}>
                  <strong>{contactDetails.nazwaFirmyOne}</strong>
                </p>
                <p className={paragraphClass}>
                  {contactDetails.adresFakturLineOne}
                </p>
                <p className={paragraphClass}>
                  {contactDetails.adresFakturLineTwo}
                </p>
                <p className={paragraphClass}>
                  <span>NIP:</span> {contactDetails.numerNipOne}
                </p>
                <p className={paragraphClass}>
                  <span>REGON:</span> {contactDetails.numerRegonOne}
                </p>
              </div>
              <div className="mt-1">
                <p className={paragraphClass}>
                  <strong>{contactDetails.nazwaFirmyTwo}</strong>
                </p>
                <p className={paragraphClass}>
                  {contactDetails.adresFakturLineOne}
                </p>
                <p className={paragraphClass}>
                  {contactDetails.adresFakturLineTwo}
                </p>
                <p className={paragraphClass}>
                  <span>NIP:</span> {contactDetails.numerNipTwo}
                </p>
                <p className={paragraphClass}>
                  <span>REGON:</span> {contactDetails.numerRegonTwo}
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* Contact Form */}
          <FadeInSection className="max-w-xl">
            <ContactForm
              color={"light"}
              contactFormSubjects={contactForm.contactFormSubjects.map(
                (subject) => ({ label: subject }),
              )}
            />
          </FadeInSection>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
