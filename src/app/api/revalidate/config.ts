// app/api/revalidate/config.ts
export const runtime = "nodejs";

export const api = {
  bodyParser: false, // needed for next-sanity/webhook signature validation
};
