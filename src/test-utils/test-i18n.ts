import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'ko',
  fallbackLng: 'ko',
  ns: ['join'],
  defaultNS: 'join',
  resources: {
    ko: {
      join: {
        email: '이메일',
        password: '비밀번호',
        passwordConfirm: '비밀번호 확인',
        nickName: '닉네임',
        signUp: '회원가입',
        passwordNotMatch: '비밀번호가 일치하지 않습니다.',
      },
    },
  },
});

export default i18n;
