import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

import NoteBg from '@/assets/images/note-bg.svg';
import NoteEnd from '@/assets/images/note-end.svg';
import NoteEndMidium from '@/assets/images/note-end-medium.svg';
import NoteEndSmall from '@/assets/images/note-end-small.svg';

import NoteTop from '@/assets/images/note-top.svg';
import NoteTopMidium from '@/assets/images/note-top-medium.svg';
import NoteTopSmall from '@/assets/images/note-top-small.svg';
import DobuleArrow from '@/assets/icon/dobule-arrow.svg';
import landing1 from '@/assets/images/img_Desktop_landing01.svg';
import landing2 from '@/assets/images/img_Desktop_landing02.svg';
import landing3 from '@/assets/images/img_Desktop_landing03.svg';
import landing4 from '@/assets/images/img_Desktop_landing04.svg';
import Button from '@/components/Button';
import Link from 'next/link';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'ko', ['home'])),
  },
});

const Home = () => {
  const { ref: firstRef, inView: firstInView } = useInView({ threshold: 0.3 });
  const { ref: secondRef, inView: secondInView } = useInView({
    threshold: 0.3,
  });
  const { ref: thirdRef, inView: thirdInView } = useInView({ threshold: 0.3 });
  const { t } = useTranslation('home');

  return (
    <div className="bg-backgorund-100">
      <>
        <div
          className="flex flex-col items-center"
          style={{
            backgroundImage: `url(${NoteBg.src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="pt-[200px] lg:pt-[320px] pb-[168px] lg:pb-[214px] px-6">
            <div className="max-w-[250px] md:max-w-[332px] lg:max-w-[415px] text-center">
              <h1 className="text-2xl-m md:text-3xl-m lg:text-4xl-m font-iro leading-snug mb-2 md:mb-6 lg:mb-10 text-black-500">
                {t('title')}
              </h1>
              <p className="text-md-m md:text-xl-m font-iro text-black-300 mb-6 md:mb-8 lg:mb-12">
                {t('sub-title')}
              </p>
              <Link href="/login">
                <Button size="md">{t('start')}</Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center mb-[58px] animate-bounce">
            <p className="text-lg-sb text-blue-400 mb-1">{t('more')}</p>
            <Image src={DobuleArrow} alt={t('more')} width={24} height={24} />
          </div>
        </div>
        <div
          className="w-screen h-[20px] block md:hidden mb-[124px]"
          style={{
            backgroundImage: `url(${NoteEndSmall.src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat',
          }}
        />
        <div
          className="w-screen h-[20px] hidden md:block lg:hidden mb-[124px]"
          style={{
            backgroundImage: `url(${NoteEndMidium.src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat',
          }}
        />
        <div
          className="w-screen h-[10px] hidden lg:block mb-[240px]"
          style={{
            backgroundImage: `url(${NoteEnd.src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat',
          }}
        />
      </>
      <div className="px-6 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center xl:items-end xl:flex-row mb-[196px] md:mb-[220px] xl:mb-[380px]">
          <Image
            ref={firstRef}
            src={landing1}
            alt="랜딩 첫 번째 이미지"
            width={312}
            height={209}
            className={`
              w-full mb-10 xl:mb-0 xl:mr-[80px] md:h-[240px] xl:h-[388px] 
              transform transition-all duration-500 ease-out 
              ${firstInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}
            `}
          />

          <div className="flex flex-col w-full text-left">
            <h2 className="text-2xl-b xl:text-3xl-b mb-4 md:mb-5 xl:mb-10">
              {t('section1-title')}
            </h2>
            <span className="text-lg-r text-blue-600 xl:text-2xl-m">{t('section1-sub-title')}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center xl:items-end xl:flex-row-reverse mb-[196px] md:mb-[220px] xl:mb-[380px]">
          <Image
            ref={secondRef}
            src={landing2}
            alt="랜딩 두 번째 이미지"
            width={312}
            height={209}
            className={`
              w-full mb-10 xl:mb-0 xl:ml-[80px] md:h-[240px] xl:h-[388px]
              transform transition-all duration-500 ease-out 
              ${secondInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}
            `}
          />

          <div className="flex flex-col justify-end items-end w-full text-right">
            <h2 className="text-2xl-b xl:text-3xl-b mb-4 md:mb-5 xl:mb-10">
              {t('section2-title')}
            </h2>
            <span className="text-lg-r text-blue-600 xl:text-2xl-m">{t('section2-sub-title')}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center xl:items-end xl:flex-row mb-[196px] md:mb-[220px] xl:mb-[380px]">
          <Image
            ref={thirdRef}
            src={landing3}
            alt="랜딩 세 번째 이미지"
            width={312}
            height={209}
            className={`
              w-full mb-10 xl:mb-0 xl:mr-[80px] md:h-[240px] xl:h-[388px] 
              transform transition-all duration-500 ease-out 
              ${thirdInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}
            `}
          />

          <div className="flex flex-col w-full text-left">
            <h2 className="text-2xl-b xl:text-3xl-b mb-4 md:mb-5 xl:mb-10">
              {t('section3-title')}
            </h2>
            <span className="text-lg-r text-blue-600 xl:text-2xl-m">{t('section3-sub-title')}</span>
          </div>
        </div>

        <h2 className="text-2xl-b xl:text-3xl-b mb-10 md:mb-[100px] text-center">
          {t('quotation')}
        </h2>
        <Image
          src={landing4}
          alt="랜딩 네 번째 이미지"
          width={312}
          height={576}
          className="w-full mb-5 md:mb-[30px] xl:mb-[60px] md:h-[688px] xl:h-[864px]"
        />
      </div>

      <div
        className="w-screen h-[25px] -mb-[10px] block md:hidden"
        style={{
          backgroundImage: `url(${NoteTopSmall.src})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
        }}
      />
      <div
        className="w-screen h-[20px] -mb-[4px] hidden md:block lg:hidden"
        style={{
          backgroundImage: `url(${NoteTopMidium.src})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
        }}
      />
      <div
        className="w-screen h-[15px] -mb-[4px] hidden lg:block"
        style={{
          backgroundImage: `url(${NoteTop.src})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
        }}
      />
      <div
        className="flex flex-col items-center pt-[180px] pb-[270px] xl:pt-[420px] xl:pb-[403px]"
        style={{
          backgroundImage: `url(${NoteBg.src})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <p className="text-black-600 mb-8 text-3xl-m text-center font-bold font-iro">
          날마다
          <br />
          에피그램
        </p>
        <Link href="/login">
          <Button size="md">{t('start')}</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
