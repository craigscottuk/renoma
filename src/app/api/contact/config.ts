// src/app/api/contact/config.ts

/**
 * By exporting these at the top level, Next.js
 * will automatically use them for this route segment.
 */

// We must run on Node.js runtime (not Edge) to handle file streams + Node packages
export const runtime = "nodejs";

// For disabling the default JSON body parser,
// so we can handle multipart/form-data ourselves (formidable, etc.)
export const api = {
  bodyParser: false,
};
