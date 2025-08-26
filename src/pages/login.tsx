import { useLogin } from '@/hooks/useLogin';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import Button from '@/components/Button';
import Input from '@/components/Input';
import logo from '@/assets/images/logo-lg.svg';
import Link from 'next/link';
import nextI18NextConfig from '../../next-i18next.config';

type LoginForm = {
  email: string;
  password: string;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'ko', ['login'], nextI18NextConfig)),
  },
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const loginMutation = useLogin();
  const { t } = useTranslation('login');

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate({ email: data.email, password: data.password });
  };

  return (
    <div className="py-[58px] px-6 md:py-[80px] flex flex-col justify-center items-center w-full">
      <div className="max-w-[640px] w-full flex flex-col items-center">
        <Image src={logo} alt="로고 이미지" className="mb-[50px] lg:mb-[80px]" />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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

          <div className="mb-4">
            <Input
              type="password"
              placeholder={t('password')}
              {...register('password', {
                required: t('requiredPassword'),
                minLength: { value: 8, message: t('passwordMinLength') },
              })}
              errorMessage={errors?.password?.message}
            />
          </div>

          <div className="w-full">
            <Button disabled={!isValid || loginMutation.isPending} size="lg" className="w-full">
              {loginMutation.isPending ? t('logging in') : t('login')}
            </Button>
          </div>

          <div className="text-right pt-[10px]">
            <p className="text-md-m text-blue-400 md:text-lg-m lg:text-xl-m">
              {t('notMember')}{' '}
              <Link href="/signup" className="underline text-black-500">
                {t('signup')}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
