import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { type SanityDocument } from 'next-sanity';
import { client } from '@/sanity/client';

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

type Props = {
  params: { locale: string };
};

export default async function IndexPage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  // Fetch posts asynchronously
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className='container mx-auto min-h-screen max-w-3xl p-8'>
      <h1 className='text-4xl font-bold mb-8'>Posts</h1>
      <ul className='flex flex-col gap-y-4'>
        {posts.map((post) => (
          <li className='hover:underline' key={post._id}>
            <h2 className='text-xl font-semibold'>{post.title}</h2>
            <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
