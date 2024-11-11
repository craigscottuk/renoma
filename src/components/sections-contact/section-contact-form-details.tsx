import { Mail, MapPin, Phone, FileText } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useTranslations } from "next-intl";
import ContactForm from "@/components/sections-contact/contact-form";
import ExternalLink from "@/components/external-link";

type ContactDetailsSectionProps = {
  contactDetailsSection: {
    numerTelefonu: string;
    adresEmail: string;
    adresBiuraLineOne: string;
    adresBiuraLineTwo: string;
    nazwaFirmy: string;
    adresFakturLineOne: string;
    adresFakturLineTwo: string;
    numerNip: string;
    numerRegon: string;
  };
  contactFormSection: {
    contactFormSubjects: string[];
  };
};

export default function SectionContactFormDetails({
  contactDetailsSection,
  contactFormSection,
}: ContactDetailsSectionProps) {
  const t = useTranslations("kontakt-page");

  // Define contact form color scheme
  // as either 'light' or 'dark'
  const color = "dark";

  return (
    <section
      className={clsx("py-12 text-[1.1rem] leading-relaxed lg:pb-24 lg:pt-24", {
        "bg-black text-white/90": color === "dark",
        "bg-white text-black/90": color !== "dark",
      })}
    >
      <MaxWidthWrapper>
        <div className="grid gap-36 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="max-w-xl">
            <ContactForm
              color={color}
              contactFormSubjects={contactFormSection.contactFormSubjects.map(
                (subject) => ({ label: subject }),
              )}
            />
          </div>

          {/* Contact Information in 2x2 Grid */}
          <div className="grid w-[520px] grid-cols-2 gap-8 xl:place-self-end">
            {/* Phone Section */}
            <div className="flex max-w-60 items-start gap-4">
              <Phone className="h-6 w-6" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">{t("phone")}</h3>
                <p>{contactDetailsSection.numerTelefonu}</p>
              </div>
            </div>

            {/* Email Section */}
            <div className="flex max-w-60 items-start gap-4">
              <Mail className="h-6 w-6" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">{t("email")}</h3>
                <p>{contactDetailsSection.adresEmail}</p>
              </div>
            </div>

            {/* Address Section */}
            <div className="flex max-w-60 items-start gap-4">
              <MapPin className="h-7 w-7" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">{t("office")}</h3>
                <p>{contactDetailsSection.adresBiuraLineOne}</p>
                <p>{contactDetailsSection.adresBiuraLineTwo}</p>
                <ExternalLink
                  href="https://maps.app.goo.gl/SjucgxZNh6JacWfr7"
                  title="Zobacz na mapie"
                />
              </div>
            </div>

            {/* Invoice Information Section */}
            <div className="flex max-w-60 items-start gap-4">
              <FileText className="max-h-10 max-w-10" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">{t("invoice-info")}</h3>
                <p>{contactDetailsSection.nazwaFirmy}</p>
                <p>{contactDetailsSection.adresFakturLineOne}</p>
                <p>{contactDetailsSection.adresFakturLineTwo}</p>
                <p>{contactDetailsSection.numerNip}</p>
                <p>{contactDetailsSection.numerRegon}</p>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
