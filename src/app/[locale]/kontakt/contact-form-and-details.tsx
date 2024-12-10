import clsx from "clsx";
import { useTranslations } from "next-intl";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Mail, MapPin, Phone, FileText } from "lucide-react";
import ContactForm from "@/app/[locale]/kontakt/contact-form";
import ExternalLink from "@/components/navigation/external-link";

type ContactDetailsSectionProps = {
  contactDetails: {
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
  contactForm: {
    contactFormSubjects: string[];
  };
};

export default function ContactFormAndDetails({
  contactDetails,
  contactForm,
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
              contactFormSubjects={contactForm.contactFormSubjects.map(
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
                <p>{contactDetails.numerTelefonu}</p>
              </div>
            </div>

            {/* Email Section */}
            <div className="flex max-w-60 items-start gap-4">
              <Mail className="h-6 w-6" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">{t("email")}</h3>
                <p>{contactDetails.adresEmail}</p>
              </div>
            </div>

            {/* Address Section */}
            <div className="flex max-w-60 items-start gap-4">
              <MapPin className="h-7 w-7" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">{t("office")}</h3>
                <p>{contactDetails.adresBiuraLineOne}</p>
                <p>{contactDetails.adresBiuraLineTwo}</p>
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
                <p>{contactDetails.nazwaFirmy}</p>
                <p>{contactDetails.adresFakturLineOne}</p>
                <p>{contactDetails.adresFakturLineTwo}</p>
                <p>{contactDetails.numerNip}</p>
                <p>{contactDetails.numerRegon}</p>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
