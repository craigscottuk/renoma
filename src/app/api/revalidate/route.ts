// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";

// For code clarity, you might have a helper function or a lookup table
// that maps doc._type => array of tags.
function getTagsToRevalidate(doc: any) {
  const tags: string[] = [];

  switch (doc._type) {
    // Example: homepage singletons
    case "heroSection":
    case "aboutSectionHome":
    case "servicesSectionHome":
    case "logoSectionHome":
      // All these docs feed the homepage. We'll just revalidate one tag: "home".
      tags.push("home");
      break;

    // The "about" page
    case "aboutUsHeader":
    case "aboutUs":
    case "ourHistory":
    case "aboutPageMetadata":
      tags.push("about");
      break;

    // The "faq" page
    case "faqHeader":
    case "faqList":
      tags.push("faq");
      break;

    // The "contact" page
    case "contactHeader":
    case "contactForm":
    case "contactDetails":
      tags.push("contact");
      break;

    // The "privacy" page
    case "privacyHeader":
    case "privacyText":
      tags.push("privacy");
      break;

    // The "pracuj-z-nami" page
    case "workWithUsHeader":
    case "jobOffers":
      tags.push("workWithUs");
      break;

    // The "renoma-lab" page
    case "renomaLabHeader":
    case "aboutLab":
    case "labOffer":
      tags.push("renomaLab");
      break;

    // The "ucz-sie-z-nami" page
    case "learnWithUsHeader":
    case "whatWeOffer":
    case "whoWeAreLookingFor":
      tags.push("learnWithUs");
      break;

    // The "uslugi" page
    case "servicesHeader":
    case "servicesGroup":
      tags.push("services");
      break;

    // The "realizacje" listing page: "caseStudyHeader"
    case "caseStudyHeader":
      tags.push("projectsList"); // maybe we call this "projectsList"
      break;

    // The dynamic route documents (document-level i18n)
    // => revalidate *both* the listing (projectsList-{language})
    //    and the detail (caseStudyEntry-{language})
    case "caseStudyEntry":
      // if doc has doc.language
      if (doc.language) {
        tags.push(`caseStudyEntry-${doc.language}`);
        tags.push(`projectsList-${doc.language}`);
      } else {
        // fallback if no language found
        tags.push("caseStudyEntry-unknown");
        tags.push("projectsList-unknown");
      }
      break;

    // CTA doc is used across multiple pages
    case "ctaContent":
      // Option 1: Revalidate a single "cta" tag
      // Then any page that queries the CTA doc also uses next: { tags: ["cta"] }
      tags.push("cta");
      break;

    // The footer doc(s)
    case "socialMediaLinks":
    case "servicesGroup":
      // If 'servicesGroup' is used in the footer as well,
      // push "footer" so that the footer is revalidated
      tags.push("footer");
      break;

    default:
      console.log(`No revalidation rule for _type: ${doc._type}`);
  }

  return tags;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Validate signature
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Missing SANITY_REVALIDATE_SECRET" },
        { status: 500 },
      );
    }
    const { isValidSignature, body } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    // 2. Determine which tags to revalidate
    const tags = getTagsToRevalidate(body);

    // 3. Invalidate them
    tags.forEach((tag) => {
      revalidateTag(tag);
    });

    // 4. Return
    return NextResponse.json({
      revalidated: true,
      tags,
      body, // for debugging
    });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(err.message || "Something went wrong", {
      status: 500,
    });
  }
}
