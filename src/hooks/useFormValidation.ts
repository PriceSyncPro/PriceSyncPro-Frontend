// hooks/useFormValidation.ts
import { useState, useCallback, useMemo } from 'react';

export interface ValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    email?: boolean;
    pattern?: RegExp;
    custom?: (value: string) => true | string;
  };
}

interface ValidationState {
  [key: string]: string | undefined;
}

interface TouchedState {
  [key: string]: boolean;
}

export const useFormValidation = <T extends Record<string, string>>(
  formData: T, 
  rules: ValidationRules
) => {
  const [errors, setErrors] = useState<ValidationState>({});
  const [touched, setTouched] = useState<TouchedState>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // Tek bir field'ı validate et - artık keyof T kabul ediyor
  const validateField = useCallback((fieldName: keyof T, value: string) => {
    const rule = rules[fieldName as string];
    if (!rule) return undefined;

    // Required kontrolü
    if (rule.required && (!value || value.trim() === '')) {
      return 'Bu alan zorunludur';
    }

    // Eğer boşsa ve required değilse, diğer kontrolleri yapma
    if (!value || value.trim() === '') {
      return undefined;
    }

    // MinLength kontrolü
    if (rule.minLength && value.length < rule.minLength) {
      return `En az ${rule.minLength} karakter olmalıdır`;
    }

    // MaxLength kontrolü
    if (rule.maxLength && value.length > rule.maxLength) {
      return `En fazla ${rule.maxLength} karakter olmalıdır`;
    }

    // Email kontrolü
    if (rule.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Geçerli bir e-posta adresi giriniz';
      }
    }

    // Pattern kontrolü
    if (rule.pattern && !rule.pattern.test(value)) {
      return 'Geçersiz format';
    }

    // Custom validation
    if (rule.custom) {
      const result = rule.custom(value);
      if (result !== true) {
        return result;
      }
    }

    return undefined;
  }, [rules]);

  // Tüm formu validate et
  const validateForm = useCallback(() => {
    const newErrors: ValidationState = {};
    let isFormValid = true;

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName as keyof T, formData[fieldName] || '');
      if (error) {
        newErrors[fieldName] = error;
        isFormValid = false;
      }
    });

    setErrors(newErrors);
    return isFormValid;
  }, [formData, rules, validateField]);

  // touchField fonksiyonu string | keyof T kabul etsin
  const touchField = useCallback((fieldName: string | keyof T) => {
    setTouched(prev => ({ ...prev, [fieldName as string]: true }));
  }, []);

  // validateAndSetFieldError fonksiyonu string | keyof T kabul etsin
  const validateAndSetFieldError = useCallback((fieldName: string | keyof T, value: string) => {
    const error = validateField(fieldName as string, value);
    setErrors(prev => ({
      ...prev,
      [fieldName as string]: error
    }));
    return !error;
  }, [validateField]);

  // Submit attempt'i işaretle
  const markSubmitAttempted = useCallback(() => {
    setAttemptedSubmit(true);
    // Submit denemesinde tüm fieldları touched olarak işaretle
    const allTouched: TouchedState = {};
    Object.keys(rules).forEach(fieldName => {
      allTouched[fieldName] = true;
    });
    setTouched(allTouched);
  }, [rules]);

  // Gösterilecek errors (sadece touched olanlar veya submit denendiyse)
  const displayErrors = useMemo(() => {
    const displayErrs: ValidationState = {};
    Object.keys(errors).forEach(fieldName => {
      if (touched[fieldName] || attemptedSubmit) {
        displayErrs[fieldName] = errors[fieldName];
      }
    });
    return displayErrs;
  }, [errors, touched, attemptedSubmit]);

  // Form geçerli mi kontrolü
  const isValid = useMemo(() => {
    return Object.keys(rules).every(fieldName => {
      const error = validateField(fieldName as keyof T, formData[fieldName] || '');
      return !error;
    });
  }, [formData, rules, validateField]);

  // Reset fonksiyonu
  const resetValidation = useCallback(() => {
    setErrors({});
    setTouched({});
    setAttemptedSubmit(false);
  }, []);

  return {
    errors: displayErrors,
    isValid,
    validateForm,
    touchField,
    validateAndSetFieldError,
    markSubmitAttempted,
    resetValidation,
    touched,
    attemptedSubmit
  };
};
