import { ChangeEventHandler } from 'react';
import { FC } from 'react';

interface IProps {
  margin: string;
  type: 'text' | 'password';
  name: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder: string;
}

const Input: FC<IProps> = ({
  margin,
  type,
  name,
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className={margin}>
      <label htmlFor={name} className="block text-lg">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="border border-gray-300 h-[40px] pl-2 outline-none w-full"
      />
    </div>
  );
};

export default Input;
