import classNames from 'classnames';
import Image from 'next/image';
import visibleIcon from '@/assets/icon/visibility_on.svg';
import inVisibleIcon from '@/assets/icon/visibility_off.svg';
import { useState } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  errorMessage?: string;
}

const Input = ({
  placeholder,
  type = 'text',
  className,
  disabled,
  errorMessage,
  ...rest
}: InputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="relative">
        <input
          className={classNames(
            'rounded-[12px] bg-backgorund-100 outline-none w-full border border-blue-300',
            'placeholder-blue-400 text-black-950 caret-blue-400',
            'py-[9px] px-[16px] text-lg-r',
            'lg:py-[16px] lg:text-xl-m',
            {
              'border-error': errorMessage,
              'hover:border hover:border-blue-500': !errorMessage && !disabled,
              'focus:border focus:border-blue-500': !errorMessage,
            },
            className,
          )}
          disabled={disabled}
          placeholder={placeholder}
          type={type === 'password' && visible ? 'text' : type}
          {...rest}
        />

        {type === 'password' && (
          <Image
            src={!visible ? visibleIcon : inVisibleIcon}
            width={24}
            height={24}
            alt="보기 아이콘"
            onClick={() => setVisible((prev) => !prev)}
            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
          />
        )}
      </div>
      {errorMessage && <p className="text-sm text-error">{errorMessage}</p>}
    </>
  );
};

export default Input;
