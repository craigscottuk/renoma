import { useTranslations } from 'next-intl';
import LocaleSwitcher from './locale-switcher';
import NavigationLink from './navigation-link';

export default function Navigation() {
  const t = useTranslations('navigation');

  return (
    <div className='bg-slate-850'>
      <nav className='container flex justify-between p-2 text-white'>
        <div>
          <NavigationLink href='/'>{t('home')}</NavigationLink>
          <NavigationLink href='/pathnames'>{t('about-link')}</NavigationLink>
        </div>
        <LocaleSwitcher />
      </nav>
    </div>
  );
}
