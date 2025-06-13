import Button from '@/components/Button';
import Input from '@/components/Input';
import logo from '@/assets/images/logo-lg.svg';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import axios from 'axios';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

type SignupForm = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'ko', ['join'])),
  },
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupForm>({
    mode: 'onChange', // onChange를 사용하여 필수 필드가 비어 있거나, 유효성 검사에 걸리면 자동으로 false가 됨
    reValidateMode: 'onChange', // 변경 시 다시 검사하도록하는 구문
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  // useMution으로 /auth/signUp api 응답 상태 정의
  const signUpMutation = useMutation({
    mutationFn: async (data: SignupForm) => {
      const { data: result } = await axiosInstance.post('/auth/signUp', data);
      return result;
    },

    onSuccess: () => {
      alert('회원가입이 완료되었습니다!');
    },

    onError: (error) => {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : '회원가입에 실패했습니다.';
      alert(`회원가입 실패: ${message}`);
    },
  });

  const onSubmit = async (data: SignupForm) => {
    signUpMutation.mutate(data);
  };

  const password = watch('password');
  const { t } = useTranslation('join');

  return (
    <div className="py-[58px] px-6 md:py-[80px] flex flex-col justify-center items-center w-full">
      <div className="max-w-[640px] w-full flex flex-col items-center">
        <Image src={logo} alt="로고 이미지" className="mb-[50px] lg:mb-[80px]" />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <p className="text-md-m lg:text-xl-m mb-4 lg:mb-5 text-blue-900">{t('email')}</p>
          <div className="mb-5">
            <Input
              type="text"
              placeholder={t('email')}
              {...register('email', {
                required: t('requiredEmail'),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t('emailValid'),
                },
              })}
              errorMessage={errors?.email?.message}
            />
          </div>

          <p className="text-md-m lg:text-xl-m mb-4 lg:mb-5 text-blue-900">{t('password')}</p>
          <div className="mb-4">
            <Input
              type="password"
              placeholder={t('password')}
              {...register('password', {
                required: t('requiredPassword'),
                minLength: { value: 8, message: t('passwordminLength') },
              })}
              errorMessage={errors?.password?.message}
            />
          </div>
          <div className="mb-10">
            <Input
              type="password"
              placeholder={t('passwordConfirm')}
              {...register('passwordConfirmation', {
                required: t('requiredPassword'),
                validate: (value) => value === password || t('passwordNotMatch'),
              })}
              errorMessage={errors?.passwordConfirmation?.message}
            />
          </div>

          <p className="text-md-m lg:text-xl-m mb-4 lg:mb-5 text-blue-900">{t('nickName')}</p>
          <div className="mb-10">
            <Input
              type="text"
              placeholder={t('nickName')}
              {...register('nickname', {
                required: t('requiredNickName'),
                maxLength: { value: 30, message: t('nickNameMaxLength') },
              })}
              errorMessage={errors?.nickname?.message}
            />
          </div>

          <div className="w-full">
            <Button disabled={!isValid || signUpMutation.isPending} size="lg" className="w-full">
              {signUpMutation.isPending ? t('signingup') : t('signUp')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
