// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/shared/validation/contact-schema";
import sanitizeHtml from "sanitize-html";

/** Safely convert a form field to string. */
function asString(value: FormDataEntryValue | null): string {
  return value instanceof File || !value ? "" : value;
}

export async function POST(req: NextRequest) {
  try {
    // 1) Read the request body as FormData
    //    This is a Web standard API (no Node stream).
    const formData = await req.formData();

    function sanitize(str: string) {
      return sanitizeHtml(str, { allowedTags: [] });
    }

    // 2) Extract text fields (returning "" if not provided)
    const firstName = sanitize(asString(formData.get("firstName")));
    const lastName = sanitize(asString(formData.get("lastName")));
    const email = sanitize(asString(formData.get("email")));
    const phone = sanitize(asString(formData.get("phone")));
    const topic = sanitize(asString(formData.get("topic")));
    const message = sanitize(asString(formData.get("message")));
    const privacy = asString(formData.get("privacy"));

    // Server-side validation
    const parseResult = contactSchema.safeParse({
      firstName,
      lastName,
      email,
      phone,
      topic,
      message,
      privacy: privacy === "true",
    });
    if (!parseResult.success) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }

    // 3) Extract the files if present
    const fileEntries = formData.getAll("attachment");
    const MAX_SIZE = 25 * 1024 * 1024;
    let totalSize = 0;

    for (const entry of fileEntries) {
      if (entry instanceof File) {
        totalSize += entry.size;
      }
    }

    if (totalSize > MAX_SIZE) {
      return NextResponse.json(
        { error: "Total file size exceeds 25 MB" },
        { status: 400 },
      );
    }

    const attachments: {
      filename: string;
      content: Buffer;
      contentType?: string;
    }[] = [];

    // 4) If files are uploaded (FormDataEntryValue is a File)
    //    We'll read them into Buffers and attach to Nodemailer
    for (const entry of fileEntries) {
      if (entry instanceof File && entry.size > 0) {
        const arrayBuffer = await entry.arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);

        attachments.push({
          filename: entry.name || "attachment",
          content: fileBuffer,
          contentType: entry.type || undefined,
        });
      }
    }

    // 5) Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: "serwer2490491.home.pl",
      port: 465,
      secure: true,
      auth: {
        user: process.env.HOMEPL_USER,
        pass: process.env.HOMEPL_PASS,
      },
    });

    // 6) Prepare the email
    const mailOptions = {
      from: `"PKZ Renoma Website" <${process.env.HOMEPL_USER}>`,
      to: "craig@craigscott.me", // or admin@pkzrenoma.com
      subject: `New Form Submission: ${topic}`,
      text: `
A new contact form was submitted:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Topic: ${topic}
Message: ${message}

Privacy accepted: ${privacy}
      `,
      attachments,
    };

    // 7) Send
    await transporter.sendMail(mailOptions);

    // 8) Return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return new NextResponse("Error", { status: 500 });
  }
}
