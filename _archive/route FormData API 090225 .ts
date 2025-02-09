// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/** Safely convert a form field to string. */
function asString(value: FormDataEntryValue | null): string {
  return value instanceof File || !value ? "" : value;
}

export async function POST(req: NextRequest) {
  try {
    // 1) Read the request body as FormData
    //    This is a Web standard API (no Node stream).
    const formData = await req.formData();

    // 2) Extract text fields (returning "" if not provided)
    const firstName = asString(formData.get("firstName"));
    const lastName = asString(formData.get("lastName"));
    const email = asString(formData.get("email"));
    const phone = asString(formData.get("phone"));
    const topic = asString(formData.get("topic"));
    const message = asString(formData.get("message"));
    const privacy = asString(formData.get("privacy"));

    // 3) Extract the files if present
    const fileEntries = formData.getAll("attachment");
    let attachments: {
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
