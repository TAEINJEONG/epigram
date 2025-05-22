// src/components/LocaleSwitcher.tsx
import { useRouter } from 'next/router';

export function LocaleSwitcher() {
  const { locale, locales, asPath, pathname, query, push } = useRouter();
  const supported = locales ?? ['ko', 'en'];
  const nextLocale = supported.find((l) => l !== locale) ?? supported[0];

  const handleClick = () => {
    // pathname, query → 동적 세그먼트와 쿼리스트링을 안전하게 유지
    push({ pathname, query }, asPath, { locale: nextLocale });
  };

  return <button onClick={handleClick}>{nextLocale.toUpperCase()}</button>;
}
