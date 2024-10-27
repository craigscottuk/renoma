import { type SchemaTypeDefinition } from 'sanity';
// import { homeSchema } from './homeSchema';
import { stronaGlowna } from './strona-glowna';
import { settings } from './settings';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [stronaGlowna, settings],
};
