// cSpell:disable

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
  Settings,
} from 'lucide-react';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Zawartość')
    .items([
      // Singleton entry for "Home" (Dom)
      S.listItem()
        .title('Dom')
        .icon(Home)
        .child(S.document().schemaType('dom').documentId('singletonDom')),

      // Singleton entry for "About Us" (O Nas)
      S.listItem()
        .title('O Nas')
        .icon(Info)
        .child(S.document().schemaType('oNas').documentId('singletonONas')),

      // Singleton entry for "Services" (Usługi)
      S.listItem()
        .title('Usługi')
        .icon(Briefcase)
        .child(S.document().schemaType('uslugi').documentId('singletonUslugi')),

      // Realizacje (regular document type)
      S.documentTypeListItem('realizacje').title('Realizacje').icon(FolderOpen),

      // Singleton entry for "Renoma LAB" (Renoma LAB)
      S.listItem()
        .title('Renoma LAB')
        .icon(Beaker)
        .child(
          S.document().schemaType('renomaLab').documentId('singletonRenomaLab')
        ),

      // Singleton entry for "Learn With Us" (Ucz Się z Nami)
      S.listItem()
        .title('Ucz Się z Nami')
        .icon(GraduationCap)
        .child(
          S.document()
            .schemaType('uczSieZNami')
            .documentId('singletonUczSieZNami')
        ),

      // Singleton entry for "Work With Us" (Pracuj z Nami)
      S.listItem()
        .title('Pracuj z Nami')
        .icon(Users)
        .child(
          S.document()
            .schemaType('pracujZNami')
            .documentId('singletonPracujZNami')
        ),

      // Singleton entry for "Contact" (Kontakt)
      S.listItem()
        .title('Kontakt')
        .icon(Mail)
        .child(
          S.document().schemaType('kontakt').documentId('singletonKontakt')
        ),

      // Singleton entry for "Ustawienia" (Settings)
      S.listItem()
        .title('Ustawienia')
        .icon(Settings)
        .child(
          S.document()
            .schemaType('ustawienia')
            .documentId('singletonUstawienia')
        ),

      // All other document types (excluding singletons) will appear in the main list
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && // Type guard to ensure `getId()` is not undefined
          ![
            'dom',
            'oNas',
            'uslugi',
            'realizacje', // Add "realizacje" here
            'renomaLab',
            'uczSieZNami',
            'pracujZNami',
            'kontakt',
            'ustawienia',
          ].includes(item.getId() as string)
      ),
    ]);
