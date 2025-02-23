// src/app/api/application-form/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import sanitizeHtml from "sanitize-html";
import * as z from "zod";

/** Safely convert a form field to string. */
function asString(value: FormDataEntryValue | null): string {
  return value instanceof File || !value ? "" : value;
}

// Define a schema for server-side validation
const jobApplicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^[0-9+\s-]{9,}$/)
    .optional()
    .or(z.literal("")),
  motivationLetter: z.string().max(1500),
  consent: z.string(), // Expecting "true" or "false"
  formSource: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // 1) Read the request body as FormData
    const formData = await req.formData();

    function sanitize(str: string) {
      return sanitizeHtml(str, { allowedTags: [] });
    }

    // 2) Extract text fields
    const fullName = sanitize(asString(formData.get("fullName")));
    const email = sanitize(asString(formData.get("email")));
    const phone = sanitize(asString(formData.get("phone")));
    const motivationLetter = sanitize(
      asString(formData.get("motivationLetter")),
    );
    const consent = asString(formData.get("consent"));
    const formSource = asString(formData.get("formSource"));

    // 3) Server-side validation
    const parseResult = jobApplicationSchema.safeParse({
      fullName,
      email,
      phone,
      motivationLetter,
      consent,
      formSource,
    });

    if (!parseResult.success) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }

    let subjectLine = "Nowe zgłoszenie rekrutacyjne";
    let firstLine = "Otrzymano nowe zgłoszenie rekrutacyjne:";

    if (parseResult.data.formSource === "whoWeAre") {
      subjectLine = "Nowe zgłoszenie do Programu Staży i Praktyk";
      firstLine = "Otrzymano nowe zgłoszenie do Programu Staży i Praktyk:";
    }

    // 4) Extract the files if present
    const fileEntries = formData.getAll("files");
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

    // 5) Process uploaded files
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

    // 6) Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: "serwer2490491.home.pl",
      port: 465,
      secure: true,
      auth: {
        user: process.env.HOMEPL_USER,
        pass: process.env.HOMEPL_PASS,
      },
    });

    // 7) Prepare and send email
    const mailOptions = {
      from: `"Strona PKZ Renoma" <${process.env.HOMEPL_USER}>`,
      to: "craig@craigscott.me", // or your target email
      cc: email, // Send a copy to the user
      subject: subjectLine,
      text: `
${firstLine}

Imię i nazwisko: ${fullName}
Email: ${email}
Telefon: ${phone}

List motywacyjny:
${motivationLetter}

Zgoda na przetwarzanie danych: ${consent}
`,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing job application:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
