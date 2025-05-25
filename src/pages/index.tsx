import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { LocaleSwitcher } from './localeSwitcher';
import Link from 'next/link';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'ko', ['common'])),
  },
});

export default function Home() {
  const { t } = useTranslation('common');
  return (
    <>
      <h1>{t('hello')}</h1>
      <LocaleSwitcher />

      <Link href="/about">About</Link>
    </>
  );
}
