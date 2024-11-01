// cSpell:disable

import { type SchemaTypeDefinition } from 'sanity';

// Import each schema file
import { dom } from './dom';
import { oNas } from './oNas';
import { uslugi } from './uslugi';
import { realizacje } from './realizacje';
import { renomaLab } from './renomaLab';
import { uczSieZNami } from './uczSieZNami';
import { pracujZNami } from './pracujZNami';
import { kontakt } from './kontakt';
import { ustawienia } from './ustawienia';

// Export schema configuration
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    dom,
    oNas,
    uslugi,
    realizacje,
    renomaLab,
    uczSieZNami,
    pracujZNami,
    kontakt,
    ustawienia,
  ],
};
