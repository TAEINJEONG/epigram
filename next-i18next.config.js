module.exports = {
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath: './public/locales',
};
