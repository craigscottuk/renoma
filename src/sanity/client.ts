import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'lmj8kwzs',
  dataset: 'renoma',
  apiVersion: '2024-01-01',
  useCdn: false,
});
