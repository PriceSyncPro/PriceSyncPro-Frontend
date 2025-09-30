// utils/validationRules.ts

// Yaygın kullanılan validation kuralları
export const commonValidations = {
  email: {
    required: true,
    email: true,
    maxLength: 255
  },
  
  password: {
    required: true,
    minLength: 6,
    maxLength: 100,
    custom: (value: string) => {
      if (!/(?=.*[a-z])/.test(value)) return 'En az bir küçük harf içermelidir';
      if (!/(?=.*[A-Z])/.test(value)) return 'En az bir büyük harf içermelidir';
      if (!/(?=.*\d)/.test(value)) return 'En az bir rakam içermelidir';
      return true;
    }
  },

  confirmPassword: (passwordField: string) => ({
    required: true,
    match: passwordField
  }),

  username: {
    required: true,
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9_]+$/,
    custom: (value: string) => {
      if (value.startsWith('_') || value.endsWith('_')) {
        return 'Alt çizgi ile başlayamaz veya bitemez';
      }
      return true;
    }
  },

  phone: {
    required: true,
    pattern: /^(\+90|0)?[5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/,
    custom: (value: string) => {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length !== 11 && cleaned.length !== 13) {
        return 'Geçerli bir telefon numarası giriniz';
      }
      return true;
    }
  },

  fullName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/
  },

  age: {
    required: true,
    custom: (value: string) => {
      const age = parseInt(value);
      if (isNaN(age)) return 'Geçerli bir yaş giriniz';
      if (age < 18) return 'En az 18 yaşında olmalısınız';
      if (age > 120) return 'Geçerli bir yaş giriniz';
      return true;
    }
  }
};
