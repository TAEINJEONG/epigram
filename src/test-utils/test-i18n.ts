import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'ko',
  fallbackLng: 'ko',
  ns: ['join', 'login'],
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
        requiredEmail: '이메일을 입력해주세요.',
        requiredPassword: '비밀번호를 입력해주세요.',
        passwordMinLength: '비밀번호는 최소 8자 이상이어야 합니다.',
        emailValid: '유효한 이메일 주소를 입력해주세요.',
      },
      login: {
        email: '이메일',
        password: '비밀번호',
        login: '로그인',
        'logging in': '로그인 중...',
        notMember: '회원이 아니신가요?',
        signup: '회원가입',
        requiredEmail: '이메일을 입력해주세요.',
        requiredPassword: '비밀번호를 입력해주세요.',
        passwordMinLength: '비밀번호는 최소 8자 이상이어야 합니다.',
        emailValid: '유효한 이메일 주소를 입력해주세요.',
      },
    },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
