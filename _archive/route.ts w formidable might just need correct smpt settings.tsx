// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import formidable, { Fields, Files } from "formidable";
import nodemailer from "nodemailer";
import { Readable } from "stream";

// A helper to ensure each field is a single string
function asSingleString(value: string | string[] | undefined): string {
  if (!value) return "";
  return Array.isArray(value) ? value[0] : value;
}

export async function POST(req: NextRequest) {
  try {
    // 1) Convert the request body to a Node Buffer
    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2) Create Formidable instance
    const form = formidable({ keepExtensions: true });

    // 3) Create a Readable stream containing the converted buffer
    const readStream = new Readable();
    readStream.push(buffer);
    readStream.push(null);
    (readStream as any).headers = {
      "content-type": req.headers.get("content-type") ?? "",
      "content-length": buffer.length,
    };

    // 4) Parse the Readable stream
    //    We'll cast parse(...) to 'any' because type definitions
    //    don't match this usage.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (form.parse as any)(readStream);

    // The returned result is a tuple: [fields, files]
    const [fields, files] = result as [Fields, Files];

    // 5) Convert fields to single-string values
    const firstName = asSingleString(fields.firstName);
    const lastName = asSingleString(fields.lastName);
    const email = asSingleString(fields.email);
    const phone = asSingleString(fields.phone);
    const topic = asSingleString(fields.topic);
    const message = asSingleString(fields.message);
    const privacy = asSingleString(fields.privacy);

    // 6) Handle optional attachment
    const attachmentFile = files.attachment;
    const attachments = [];
    if (attachmentFile) {
      const file = Array.isArray(attachmentFile)
        ? attachmentFile[0]
        : attachmentFile;
      attachments.push({
        filename: file.originalFilename || "attachment",
        path: file.filepath,
      });
    }

    // 7) Send email with Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.home.pl",
      port: 587,
      secure: false,
      auth: {
        user: process.env.HOMEPL_USER,
        pass: process.env.HOMEPL_PASS,
      },
    });

    const mailOptions = {
      from: `"PKZ Renoma Website" <${process.env.HOMEPL_USER}>`,
      to: "craig@craigscott.me",
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

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return new NextResponse("Error", { status: 500 });
  }
}
