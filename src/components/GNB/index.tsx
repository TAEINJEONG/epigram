import Image from 'next/image';
import Link from 'next/link';
import LocaleSwitcher from '@/components/localeSwitcher';

import logo from '@/assets/images/logo-sm.svg';
import menu from '@/assets/icon/gnb-menu.svg';
import userIcon from '@/assets/icon/user-icon.svg';
import close from '@/assets/icon/close-icon.svg';
import { useState } from 'react';

const GlobalNavagationBar = () => {
  const [menuBar, setMenuBar] = useState<boolean>(false);

  const handleMenu = () => {
    setMenuBar((menuBar) => !menuBar);
  };

  return (
    <div
      className="
      flex fixed inset-x-0 top-0 w-full
      px-[24px] md:px-[72px] lg:px-[120px]
      h-[52px] py-[13px] md:h-[60px] md:py-[18px] lg:py-[22px]
      border-b border-[#D7D7D7] bg-[#ffffff] z-999"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Image
            src={menu}
            alt="메뉴 아이콘"
            className="block md:hidden mr-3 cursor-pointer"
            onClick={handleMenu}
          />

          <Link href="/">
            <Image
              src={logo}
              alt="로고"
              className="w-[101px] h-[26] lg:w-[131px] lg:h-[36px] md:mr-6 lg:mr-9"
            />
          </Link>

          <div className="hidden md:flex items-center text-md-sb lg:text-lg-sb text-black-600">
            <Link href="/feed">
              <p className=" mr-6">피드</p>
            </Link>
            <Link href="/search">
              <p>검색</p>
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <div className="mr-6">
            <LocaleSwitcher />
          </div>
          <div className="flex items-center">
            <Image src={userIcon} alt="사용자 아이콘" className="mr-[6px]" />
            <p className="text-md-sb lg:text-lg-sb text-black-600">사용자</p>
          </div>
        </div>
      </div>

      <div
        className={`
          block md:hidden
          max-w-[220px] w-full h-screen absolute top-0 left-0 bg-white 
          transform transition-transform duration-300 ease-in-out
          ${menuBar ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="py-[15px] px-[16px] h-[54px] flex justify-end border-b border-b-line-100">
          <Image
            src={close}
            alt="닫기 버튼"
            width="24"
            height="24"
            className="cursor-pointer"
            onClick={handleMenu}
          />
        </div>
        <div className="text-lg-m text-black-600">
          <ul>
            <li className="py-6 px-5">
              <Link href="/feed">
                <p onClick={handleMenu}>피드</p>
              </Link>
            </li>
            <li className="py-6 px-5">
              <Link href="/search">
                <p onClick={handleMenu}>검색</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GlobalNavagationBar;
