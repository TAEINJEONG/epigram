import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { LocaleSwitcher } from './localeSwitcher';

// SSR 방식
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'ko', ['common'])),
  },
});

const Test = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <h1>{t('hello')}</h1>
      <LocaleSwitcher />
    </>
  );
};

export default Test;
