// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

module.exports = {
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
  reloadOnPrerender: true,
  localePath: path.resolve('./public/locales'), // 절대 경로 사용
};
