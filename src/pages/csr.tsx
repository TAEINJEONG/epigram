// pages/test.tsx
import { useEffect, useState } from 'react';
// i18n 초기화(../src/i18n.ts) — initReactI18next 포함
import '../i18n';
import { useTranslation } from 'react-i18next'; // react-i18next 훅
import { useRouter } from 'next/router';

export default function TestPage() {
  const [mounted, setMounted] = useState(false);
  const { t, i18n } = useTranslation('common');
  const { locale, locales, asPath, pathname, query, push } = useRouter();

  // 1) CSR guard: 서버에선 아무것도 렌더링하지 않고
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2) router.locale가 바뀔 때마다 i18n 언어도 변경
  useEffect(() => {
    if (mounted && locale) {
      i18n.changeLanguage(locale);
    }
  }, [mounted, locale, i18n]);

  if (!mounted) {
    return null;
  }

  // Next.js 라우팅용 언어 토글
  const supported = locales ?? ['ko', 'en'];
  const nextLocale = supported.find((l) => l !== locale) ?? locale;
  const switchLocale = () => {
    push({ pathname, query }, asPath, { locale: nextLocale });
  };

  return (
    <>
      <h1>{t('hello')}</h1>
      <button onClick={switchLocale}>{nextLocale?.toUpperCase()}</button>
    </>
  );
}
