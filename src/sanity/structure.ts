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
      S.listItem()
        .title('Home')
        .icon(Home)
        .child(S.document().schemaType('home').documentId('singletonHome')),

      // Singleton entry for "About Us"
      S.listItem()
        .title('About Us')
        .icon(Info)
        .child(
          S.document().schemaType('aboutUs').documentId('singletonAboutUs')
        ),

      // Singleton entry for "Services"
      S.listItem()
        .title('Services')
        .icon(Briefcase)
        .child(
          S.document().schemaType('services').documentId('singletonServices')
        ),

      // Singleton entry for "Projects"
      S.listItem()
        .title('Projects')
        .icon(FolderOpen)
        .child(
          S.document().schemaType('projects').documentId('singletonProjects')
        ),

      // Singleton entry for "Renomal Lab"
      S.listItem()
        .title('Renomal Lab')
        .icon(Beaker)
        .child(
          S.document()
            .schemaType('renomalLab')
            .documentId('singletonRenomalLab')
        ),

      // Singleton entry for "Learn With Us"
      S.listItem()
        .title('Learn With Us')
        .icon(GraduationCap)
        .child(
          S.document()
            .schemaType('learnWithUs')
            .documentId('singletonLearnWithUs')
        ),

      // Singleton entry for "Work With Us"
      S.listItem()
        .title('Work With Us')
        .icon(Users)
        .child(
          S.document()
            .schemaType('workWithUs')
            .documentId('singletonWorkWithUs')
        ),

      // Singleton entry for "Contact"
      S.listItem()
        .title('Contact')
        .icon(Mail)
        .child(
          S.document().schemaType('contact').documentId('singletonContact')
        ),

      // All other document types (excluding singletons) will appear in the main list
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            'home',
            'aboutUs',
            'services',
            'projects',
            'renomalLab',
            'learnWithUs',
            'workWithUs',
            'contact',
          ].includes(item.getId() as string)
      ),
    ]);

// https://www.sanity.io/docs/structure-builder-cheat-sheet
