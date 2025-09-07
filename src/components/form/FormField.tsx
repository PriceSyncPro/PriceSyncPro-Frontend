// components/form/FormField.tsx
import { memo, ReactNode } from 'react';
import Label from './Label';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  showError?: boolean; // Error gösterilip gösterilmeyeceğini kontrol eder
}

const FormField = memo(function FormField({
  label,
  error,
  required = false,
  children,
  className = "",
  showError = true
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-gray-900 font-semibold text-sm">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="relative group">
        {children}
      </div>
      {showError && error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
});

export default FormField;