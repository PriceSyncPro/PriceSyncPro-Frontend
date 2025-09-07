// components/form/input/PhoneInput.tsx
import { memo, useCallback } from 'react';
import Input from './InputField';
import { usePhoneValidation } from '@/hooks/useTelephoneValidation';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void; // onBlur prop'unu ekle
  className?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const PhoneInput = memo(function PhoneInput({
  value,
  onChange,
  onBlur, // onBlur prop'unu al
  className,
  placeholder = "0 (5xx) xxx xx xx",
  required = false,
  error
}: PhoneInputProps) {
  const { formatPhoneForDisplay } = usePhoneValidation();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanValue = inputValue.replace(/\D/g, '');
    
    if (cleanValue.length <= 11) {
      const formattedPhone = formatPhoneForDisplay(inputValue);
      onChange(formattedPhone);
    }
  }, [formatPhoneForDisplay, onChange]);

  const handleFocus = useCallback(() => {
    if (!value) {
      onChange("0 (5");
    }
  }, [value, onChange]);

  const handleBlur = useCallback(() => {
    if (value === "0 (" || value === "0 (5") {
      onChange("");
    }
    
    // External onBlur callback'ini çağır
    if (onBlur) {
      onBlur();
    }
  }, [value, onChange, onBlur]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (value === "0 (" || value === "0 (5" || value === "0") {
        e.preventDefault();
        onChange("");
      }
    }
  }, [value, onChange]);

  return (
    <>
      <Input
        className={`${className} ${error ? 'border-red-500 focus:border-red-500' : ''}`}
        type="tel"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur} // handleBlur'u kullan
        onKeyDown={handleKeyDown}
        maxLength={18}
        required={required}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1 block">{error}</span>
      )}
    </>
  );
});

export default PhoneInput;