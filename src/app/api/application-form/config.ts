// src/app/api/application-form

// Run on Node.js runtime (not Edge) to handle file streams + Node packages
export const runtime = "nodejs";

// Disable the default JSON body parser
export const api = {
  bodyParser: false,
};
