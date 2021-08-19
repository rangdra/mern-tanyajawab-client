import { ReactNode, FC } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface IProps {
  children: ReactNode | string;
  type: 'button' | 'submit';
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button: FC<IProps> = ({ children, type, disabled, isLoading }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${
        disabled && 'disabled:opacity-50'
      } w-full py-2 mt-4 font-semibold text-white transform transition-duration bg-gradient-to-br from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-500 active:translate-y-1`}
    >
      {isLoading && (
        <AiOutlineLoading3Quarters className="text-white animate-spin" />
      )}{' '}
      {children}
    </button>
  );
};

export default Button;
