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
  language?: string;
  // add more fields if needed...
}

function getTagsToRevalidate(doc: WebhookBody): string[] {
  const tags: string[] = [];

  switch (doc._type) {
    case "aboutUsHeader":
    case "aboutUs":
    case "ourHistory":
    case "aboutPageMetadata":
      tags.push("about");
      break;

    case "faqHeader":
    case "faqList":
      tags.push("faq");
      break;

    case "heroSection":
    case "aboutSectionHome":
    case "servicesSectionHome":
    case "logoSectionHome":
      tags.push("home");
      break;

    case "servicesHeader":
    case "servicesGroup":
      tags.push("services");
      break;

    case "caseStudyHeader":
      tags.push("projectsList");
      break;

    case "caseStudyEntry":
      tags.push("projectsList");
      tags.push("caseStudyEntry");
      break;

    case "ctaContent":
      tags.push("cta");
      break;

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
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Missing SANITY_REVALIDATE_SECRET" },
        { status: 500 },
      );
    }

    // parseBody can return { body: WebhookBody | null }
    const { isValidSignature, body } = await parseBody<WebhookBody>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

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
