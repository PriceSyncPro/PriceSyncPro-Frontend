import { ValidationRules } from '@/hooks/useFormValidation';

export const signUpValidationRules: ValidationRules = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
    custom: (value: string) => {
      if (value.trim().length < 2) return 'En az 2 karakter olmalıdır';
      if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(value)) return 'Sadece harf girebilirsiniz';
      return true;
    }
  },

  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
    custom: (value: string) => {
      if (value.trim().length < 2) return 'En az 2 karakter olmalıdır';
      if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(value)) return 'Sadece harf girebilirsiniz';
      return true;
    }
  },

  userName: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
    custom: (value: string) => {
      if (value.length < 3) return 'En az 3 karakter olmalıdır';
      if (value.length > 20) return 'En fazla 20 karakter olmalıdır';
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Sadece harf, rakam ve alt çizgi kullanabilirsiniz';
      if (value.startsWith('_') || value.endsWith('_')) return 'Alt çizgi ile başlayamaz veya bitemez';
      if (value.includes('__')) return 'Ardışık alt çizgi kullanılamaz';
      return true;
    }
  },

  email: {
    required: true,
    email: true,
    maxLength: 255,
    custom: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Geçerli bir e-posta adresi giriniz';
      if (value.length > 255) return 'E-posta adresi çok uzun';
      return true;
    }
  },

  phoneNumber: {
    required: true,
    custom: (value: string) => {
      const cleanNumber = value.replace(/\D/g, '');
      if (cleanNumber.length !== 11) return 'Telefon numarası 11 haneli olmalıdır';
      if (!cleanNumber.startsWith('05')) return 'Geçerli bir cep telefonu numarası giriniz (05xx xxx xx xx)';
      return true;
    }
  },

  password: {
    required: true,
    minLength: 8,
    maxLength: 100,
    custom: (value: string) => {
      if (value.length < 8) return 'En az 8 karakter olmalıdır';
      if (!/(?=.*[a-z])/.test(value)) return 'En az bir küçük harf içermelidir';
      if (!/(?=.*[A-Z])/.test(value)) return 'En az bir büyük harf içermelidir';
      if (!/(?=.*\d)/.test(value)) return 'En az bir rakam içermelidir';
      if (!/(?=.*[!@#$%^&*])/.test(value)) return 'En az bir özel karakter içermelidir (!@#$%^&*)';
      return true;
    }
  }
};