import Link from 'next/link';
import { useRouter } from 'next/router';

const LocaleSwitcher = () => {
  const { locale, locales, pathname, query } = useRouter();
  const supported = locales ?? ['ko', 'en'];
  const nextLocale = supported.find((l) => l !== locale) ?? supported[0];

  return (
    <Link href={{ pathname, query }} locale={nextLocale}>
      <button className="py-1 px-2 bg-blue-400 text-white rounded-lg">
        {nextLocale.toUpperCase()}
      </button>
    </Link>
  );
};

export default LocaleSwitcher;
