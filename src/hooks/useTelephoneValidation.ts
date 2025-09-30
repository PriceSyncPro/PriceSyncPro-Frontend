// hooks/usePhoneValidation.ts
import { useCallback } from 'react';

export const usePhoneValidation = () => {
  // Kullanıcı için görsel formatlama
  const formatPhoneForDisplay = useCallback((value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    
    if (!cleanValue) return '';
    
    let phoneNumber = cleanValue;
    if (phoneNumber.startsWith('5') && phoneNumber.length >= 10) {
      phoneNumber = '0' + phoneNumber;
    }
    
    if (phoneNumber.startsWith('00')) {
      phoneNumber = phoneNumber.substring(1);
    }
    
    if (phoneNumber.length <= 1) return phoneNumber;
    
    if (phoneNumber.length <= 4) {
      if (phoneNumber.startsWith('0')) {
        return phoneNumber.length > 1 ? 
          `${phoneNumber.substring(0, 1)} (${phoneNumber.substring(1)}` : 
          phoneNumber;
      }
      return phoneNumber;
    }
    
    if (phoneNumber.length <= 7) {
      if (phoneNumber.startsWith('0')) {
        return `${phoneNumber.substring(0, 1)} (${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(4)}`;
      }
      return phoneNumber;
    }
    
    if (phoneNumber.length <= 9) {
      if (phoneNumber.startsWith('0')) {
        return `${phoneNumber.substring(0, 1)} (${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(4, 7)} ${phoneNumber.substring(7)}`;
      }
      return phoneNumber;
    }
    
    if (phoneNumber.startsWith('0') && phoneNumber.length >= 10) {
      const maxLength = Math.min(phoneNumber.length, 11);
      const limitedNumber = phoneNumber.substring(0, maxLength);
      return `${limitedNumber.substring(0, 1)} (${limitedNumber.substring(1, 4)}) ${limitedNumber.substring(4, 7)} ${limitedNumber.substring(7, 9)} ${limitedNumber.substring(9, 11)}`;
    }
    
    return phoneNumber;
  }, []);

  // API için temizle
  const cleanPhoneForAPI = useCallback((phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    return cleanNumber.startsWith('0') ? cleanNumber.substring(1) : cleanNumber;
  }, []);

  // Telefon numarası validasyonu
  const validatePhoneNumber = useCallback((phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    return cleanNumber.length === 11 && cleanNumber.startsWith('0') && cleanNumber.startsWith('05');
  }, []);

  return {
    formatPhoneForDisplay,
    cleanPhoneForAPI,
    validatePhoneNumber
  };
};
