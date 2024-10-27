can we add more singleton pages using the icons I've added in the import as a reference:

The singleton docs are:

About Us
Services
Projects
Renomal Lab
Learn With Us
Work With Us
Contact

here are the icons for each:

Info, // About Us
Briefcase, // Services
FolderOpen, // Projects
Beaker, // Renomal Lab
GraduationCap, // Learn With Us
Users, // Work With Us
Mail, // Contact

This is the structure.ts file so far:

```js

import type { StructureResolver } from 'sanity/structure';
import {
Home,
Info,
Briefcase,
FolderOpen,
Beaker,
GraduationCap,
Users,
Mail,
} from 'lucide-react';

export const structure: StructureResolver = (S) =>
S.list()
  .title('Content')
  .items([
    // Singleton entry for "Home"
    S.listItem().title('Home').icon(Home).child(
      S.document().schemaType('home').documentId('singletonHome') // Fixed ID to make it a singleton
    ),

    // All other document types (excluding 'home') will appear in the main list
    ...S.documentTypeListItems().filter((item) => item.getId() !== 'home'),
  ]);

```
