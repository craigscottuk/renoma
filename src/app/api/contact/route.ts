// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/contact-schema";
import sanitizeHtml from "sanitize-html";

/** Safely convert a form field to string. */
function asString(value: FormDataEntryValue | null): string {
  return value instanceof File || !value ? "" : value;
}

export async function POST(req: NextRequest) {
  try {
    // 1) Read the request body as FormData
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

    // Comment out file handling
    /*
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
    */

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
      from: `"Strona PKZ Renoma" <${process.env.HOMEPL_USER}>`,
      to: "biuro@pkzrenoma.com",
      // to: "craig@craigscott.me",
      cc: email, // Send a copy to the user
      bcc: "craig@craigscott.me", // Send a blind copy to the developer
      subject: `Nowa wiadomość z formularza kontaktowego: ${topic}`,
      text: `
Nowa wiadomość została złożona w formularzu kontaktowym:

Imię i nazwisko: ${firstName} ${lastName}
Telefon: ${phone}
Adres email: ${email}
Temat: ${topic}

Wiadomość:
${message}

Zgoda na przetwarzanie danych: ${privacy}
      `,
      // Remove attachments from mailOptions
      // attachments,
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
