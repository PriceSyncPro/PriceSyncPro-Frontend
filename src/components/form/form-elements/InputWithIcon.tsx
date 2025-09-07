// components/form/input/InputWithIcon.tsx
import { memo, ReactNode, useCallback } from 'react';
import Input from '../input/InputField';

interface InputWithIconProps {
  icon: ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  required?: boolean;
  error?: string;
  rightElement?: ReactNode;
  maxLength?: number;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputWithIcon = memo(function InputWithIcon({
  icon,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  name,
  required = false,
  error,
  rightElement,
  maxLength,
  onFocus,
  onKeyDown
}: InputWithIconProps) {
  return (
    <>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <div className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors">
          {icon}
        </div>
      </div>
      <Input
        className={`w-full h-12 pl-12 ${rightElement ? 'pr-12' : 'pr-4'} bg-gray-50 border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:bg-white transition-all font-medium ${
          error ? 'border-red-500 focus:border-red-500' : 'border-gray-200'
        }`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        maxLength={maxLength}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      />
      {rightElement && (
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          {rightElement}
        </div>
      )}
    </>
  );
});

export default InputWithIcon;