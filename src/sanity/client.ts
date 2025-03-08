//src/sanity/client.ts
// cSpell:disable

import { createClient, type QueryParams } from "next-sanity";

export const client = createClient({
  projectId: "6ivsfkzi",
  dataset: "renoma",
  apiVersion: "2024-01-01",
  useCdn: false,
});

/**
 * The helper function that merges time-based + tag-based revalidation
 *
 * If you pass `tags: []`, it uses time-based revalidation (defaults to 60s).
 * If you pass `tags: ["someTag"]`, it sets revalidate=false and uses the tag-based approach.
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 86400, // 86400
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      // If tags are present, we override time-based revalidation
      // and rely purely on on-demand revalidation for those tags.
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });
}
