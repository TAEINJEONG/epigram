module.exports = {
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
  reloadOnPrerender: true,
  localePath: './public/locales',
  fallbackLng: {
    default: ['ko'],
  },
  interpolation: {
    escapeValue: false,
  },
};
