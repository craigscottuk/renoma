// app/api/revalidate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";

/**
 * The shape of the doc body we expect from the webhook.
 */
interface WebhookBody {
  _type: string;
  slug?: string;
}

function getTagsToRevalidate(doc: WebhookBody): string[] {
  const tags: string[] = [];

  switch (doc._type) {
    // homepage
    case "heroSection":
    case "aboutSection":
    case "servicesSection":
    case "cooperationSection":
    case "homePageMeta":
    case "ctaContent":
      tags.push("home");
      break;

    // about page
    case "aboutHeader":
    case "aboutUs":
    case "ourHistory":
    case "aboutPageMetadata":
      tags.push("about");
      break;

    // services page
    case "servicesHeader":
    case "servicesGroup":
    case "servicesPageMeta":
    case "ctaContent":
      tags.push("services");
      tags.push("footer");
      break;

    // projects page
    case "projectsHeader":
    case "ctaContent":
      tags.push("projects");
      tags.push("projectsPageMeta");
      break;

    case "caseStudyEntry":
      tags.push("projectsList");
      tags.push("caseStudyEntry");

      break;

    // RenomaLab page
    case "renomaLabHeader":
    case "labOffer":
    case "renomaLabPageMeta":
    case "ctaContent":
      tags.push("renomaLab");
      break;

    // learn with us page
    case "learnWithUsHeader":
    case "whatWeOffer":
    case "whoWeAreLookingFor":
    case "learnWithUsPageMeta":
    case "ctaContent":
      tags.push("learnWithUs");
      break;

    // work with us page
    case "workWithUsHeader":
    case "jobOffers":
    case "workWithUsPageMeta":
    case "ctaContent":
      tags.push("workWithUs");
      break;

    // faq page
    case "faqHeader":
    case "faqList":
    case "faqPageMeta":
    case "ctaContent":
      tags.push("faq");
      break;

    // contact page
    case "contactHeader":
    case "contactForm":
    case "contactDetails":
    case "contactPageMeta":
      tags.push("contact");
      break;

    // privacy page
    case "privacyHeader":
    case "privacyBody":
    case "privacyPageMeta":
      tags.push("privacy");
      break;

    // CTA
    case "ctaContent":
      tags.push("cta");
      break;

    // footer
    case "servicesGroup":
    case "socialMediaLinks":
      tags.push("footer");
      break;

    default:
      console.log(`No revalidation rule for type: ${doc._type}`);
  }

  return tags;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET) {
      return NextResponse.json(
        { message: "Missing NEXT_PUBLIC_SANITY_HOOK_SECRET" },
        { status: 500 },
      );
    }

    // parseBody can return { body: WebhookBody | null }
    const { isValidSignature, body } = await parseBody<WebhookBody>(
      req,
      process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET,
    );

    // Log the webhook body for debugging
    // console.log("Webhook body:", body);

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }
    if (!body) {
      return NextResponse.json(
        { message: "No valid body found in request" },
        { status: 400 },
      );
    }

    // 3) For this doc, figure out which tags to revalidate
    const tags = getTagsToRevalidate(body);

    // 4) Revalidate each tag
    tags.forEach((tag) => revalidateTag(tag));

    return NextResponse.json({
      revalidated: true,
      tags,
      body, // for debugging
    });
  } catch (err: unknown) {
    console.error(err);

    if (err instanceof Error) {
      return new NextResponse(err.message, { status: 500 });
    }
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
