'use client';

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { internationalizedArray } from 'sanity-plugin-internationalized-array';

import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schema } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),

    internationalizedArray({
      languages: [
        { id: 'pl', title: 'Polish' },
        { id: 'en', title: 'English' },
        { id: 'de', title: 'German' },
      ],
      // defaultLanguages: ['pl'], // Default to Polish for new documents
      fieldTypes: ['string', 'text'],
      // buttonLocations: ['field'],
      // buttonAddAll: false,
    }),
  ],
});
