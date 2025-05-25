import classNames from 'classnames';

type ButtonVariant = 'solid' | 'outlined';
type ButtonSize = 'xs' | 'sm' | 'md' | 'md2' | 'lg' | 'xl' | '2xl' | '3xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  solid: 'bg-[#454545] hover:bg-[#373737] active:bg-[#2B2B2B]',
  outlined: 'border border-[#454545] hover:border-[#373737] active:border-[#2B2B2B]',
};

const paddingStyles: Record<'xs' | 'sm' | 'md' | 'md2', string> = {
  xs: 'py-[6px] px-4 text-xs',
  sm: 'py-[9px] px-4 text-base',
  md: 'py-[11px] px-7 text-base',
  md2: 'py-3 px-[33px] text-xl',
};

const widthStyles: Record<'lg' | 'xl' | '2xl' | '3xl', string> = {
  lg: 'py-4 w-[286px] text-xl',
  xl: 'py-[9px] w-[312px] text-base',
  '2xl': 'py-[9px] w-[384px] text-base',
  '3xl': 'py-4 w-[640px] text-xl',
};

const Button = ({
  children,
  variant = 'solid',
  size = 'md',
  className,
  disabled,
  ...rest
}: ButtonProps) => {
  const sizeClass =
    (paddingStyles as Record<string, string>)[size] ??
    (widthStyles as Record<string, string>)[size];

  return (
    <button
      className={classNames(
        'rounded-[12px] cursor-pointer text-white font-semibold',
        sizeClass,
        className,

        disabled ? 'bg-[#CBD3E1]' : variantStyles[variant],
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
