// app/api/revalidate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";

// Map each doc._type to the tag(s) you want to revalidate
function getTagsToRevalidate(doc: any): string[] {
  const tags: string[] = [];

  switch (doc._type) {
    // Example singletons for the "about" page
    case "aboutUsHeader":
    case "aboutUs":
    case "ourHistory":
    case "aboutPageMetadata":
      tags.push("about");
      break;

    // Example for the "faq" page
    case "faqHeader":
    case "faqList":
      tags.push("faq");
      break;

    // Example for "home" singletons
    case "heroSection":
    case "aboutSectionHome":
    case "servicesSectionHome":
    case "logoSectionHome":
      tags.push("home");
      break;

    // Example: "uslugi" page
    case "servicesHeader":
    case "servicesGroup":
      tags.push("services");
      break;

    // "realizacje" listing page
    case "caseStudyHeader":
      tags.push("projectsList");
      break;

    // Document-level translation docs (caseStudyEntry),
    // but we are ignoring language. Just do the same tags every time.
    case "caseStudyEntry":
      // 1) The listing page
      tags.push("projectsList");
      // 2) The detail route
      tags.push("caseStudyEntry");
      break;

    // CTA used across multiple pages
    case "ctaContent":
      tags.push("cta");
      break;

    // Footer examples
    case "socialMediaLinks":
      tags.push("footer");
      break;

    // If you have other doc types that also appear in the footer:
    // case "servicesGroup": // possibly also used in the footer
    //   tags.push("services");
    //   tags.push("footer");
    //   break;

    default:
      console.log(`No revalidation rule for type: ${doc._type}`);
  }

  return tags;
}

export async function POST(req: NextRequest) {
  try {
    // 1) Ensure secret is configured
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Missing SANITY_REVALIDATE_SECRET" },
        { status: 500 },
      );
    }

    // 2) Validate signature with next-sanity
    const { isValidSignature, body } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
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
  } catch (err: any) {
    console.error(err);
    return new NextResponse(err.message || "Something went wrong", {
      status: 500,
    });
  }
}
