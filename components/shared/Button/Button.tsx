import { FC } from 'react';
import { ButtonProps } from './types';
import { useButton } from './useButton';

const Button: FC<ButtonProps> = ({
  children,
  typeButton,
  text,
  className,
  style,
  onClick,
  disabled = false,
}) => {
  const { buttonRed } = useButton();
  return (
    <button
      type={typeButton ? 'button' : 'submit'}
      onClick={onClick}
      className={`${className} ${
        disabled ? 'pointer-events-none bg-[#EC4C57] select-none' : ''
      } px-4 lg:px-6 py-2 rounded font-normal text-base leading-6 text-white border transition ${
        style === 'buttonRed'
          ? buttonRed
          : 'active:border-white active:ring-1 active:ring-white'
      }`}
    >
      {children}
      {text}
    </button>
  );
};

export default Button;
