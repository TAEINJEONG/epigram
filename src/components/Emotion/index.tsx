import Image from 'next/image';

import moved from '@/assets/icon/emotion/moved.svg';
import happy from '@/assets/icon/emotion/happy.svg';
import anxious from '@/assets/icon/emotion/anxious.svg';
import sad from '@/assets/icon/emotion/sad.svg';
import angry from '@/assets/icon/emotion/angry.svg';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

const Emotion = () => {
  const [emotion, setEmotion] = useState<string>('');

  const handleEmotion = (selectEmotion: string) => {
    setEmotion(selectEmotion);
    console.log(selectEmotion);
  };

  const { t } = useTranslation('emotion');

  return (
    <div>
      <div>
        <ul className="flex gap-2 text-center">
          <li
            onClick={() => handleEmotion('moved')}
            className="text-[#999999] hover:text-sub-blue-1"
          >
            <div className="p-3 mb-2 md:p-4 bg-[#AFBACD26] rounded-[16px] cursor-pointer border-[3px] lg:border-[4px] border-transparent hover:border-illustration-yellow">
              <Image src={moved} alt="감동 아이콘" className="lg:w-[48px] lg:h-[48px]" />
            </div>
            <span className="text-xs-sb md:text-md-sb lg:text-xl-sb">{t('moved')}</span>
          </li>
          <li
            onClick={() => handleEmotion('happy')}
            className="text-[#999999] hover:text-sub-blue-1"
          >
            <div className="p-3 mb-2 md:p-4 bg-[#AFBACD26] rounded-[16px] cursor-pointer border-[3px] lg:border-[4px] border-transparent hover:border-illustration-green">
              <Image src={happy} alt="기쁨 아이콘" className="lg:w-[48px] lg:h-[48px]" />
            </div>
            <span className="text-xs-sb md:text-md-sb lg:text-xl-sb">{t('happy')}</span>
          </li>
          <li
            onClick={() => handleEmotion('anxious')}
            className="text-[#999999] hover:text-sub-blue-1"
          >
            <div className="p-3 mb-2 md:p-4 bg-[#AFBACD26] rounded-[16px] cursor-pointer border-[3px] lg:border-[4px] border-transparent hover:border-illustration-purple">
              <Image src={anxious} alt="고민 아이콘" className="lg:w-[48px] lg:h-[48px]" />
            </div>
            <span className="text-xs-sb md:text-md-sb lg:text-xl-sb">{t('anxious')}</span>
          </li>
          <li onClick={() => handleEmotion('sad')} className="text-[#999999] hover:text-sub-blue-1">
            <div className="p-3 mb-2 md:p-4 bg-[#AFBACD26] rounded-[16px] cursor-pointer border-[3px] lg:border-[4px] border-transparent hover:border-illustration-blue">
              <Image src={sad} alt="슬픔 아이콘" className="lg:w-[48px] lg:h-[48px]" />
            </div>
            <span className="text-xs-sb md:text-md-sb lg:text-xl-sb">{t('sad')}</span>
          </li>
          <li
            onClick={() => handleEmotion('angry')}
            className="text-[#999999] hover:text-sub-blue-1"
          >
            <div className="p-3 mb-2 md:p-4 bg-[#AFBACD26] rounded-[16px] cursor-pointer border-[3px] lg:border-[4px] border-transparent hover:border-illustration-red">
              <Image src={angry} alt="분노 아이콘" className="lg:w-[48px] lg:h-[48px]" />
            </div>
            <span className="text-xs-sb md:text-md-sb lg:text-xl-sb">{t('angry')}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Emotion;
