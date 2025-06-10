import { useRouter } from 'next/router';

const LocaleSwitcher = () => {
  const { locale, locales, asPath, pathname, query, push } = useRouter();
  const supported = locales ?? ['ko', 'en'];
  const nextLocale = supported.find((l) => l !== locale) ?? supported[0];

  const handleClick = () => {
    push({ pathname, query }, asPath, { locale: nextLocale });
  };

  return (
    <button
      className="py-1 px-2 cursor-pointer bg-blue-400 text-white rounded-lg"
      onClick={handleClick}
    >
      {nextLocale.toUpperCase()}
    </button>
  );
};

export default LocaleSwitcher;
