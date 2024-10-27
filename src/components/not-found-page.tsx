import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('not-found-page');

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-8 text-center'>
      <h1 className='mb-4 text-4xl font-bold'>{t('title')}</h1>
      <p className='mb-8 text-lg'>{t('description')}</p>
      <Link href='/' className='text-blue-500 hover:underline'>
        {t('goBackHome')}
      </Link>
    </div>
  );
}
